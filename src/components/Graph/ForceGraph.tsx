import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as d3 from 'd3-force';
import type { GraphData, SkillNode, SkillLink } from '../../data/skillsGraph';
import { useTheme } from '../../context/ThemeContext';

interface ForceGraphProps {
    data: GraphData;
    width?: number;
    height?: number;
}

const getThemeColors = (theme: 'dark' | 'gruvbox') => {
    const isGruv = theme === 'gruvbox';
    return {
        system: '#e5a93b',    // warm amber
        language: '#7dd3fc',  // ice cyan
        tool: '#a1a1aa',      // machined zinc
        framework: '#c084fc', // muted violet
        concept: '#38bdf8',   // sky cyan
        text: isGruv ? '#ebdbb2' : 'rgba(244,244,245,0.8)',
        textActive: isGruv ? '#fbf1c7' : '#ffffff',
        edge: isGruv ? 'rgba(235,219,178,0.12)' : 'rgba(255,255,255,0.08)',
        edgeActive: isGruv ? 'rgba(215,153,33,0.5)' : 'rgba(229,169,59,0.5)',
    };
};

export const ForceGraph = ({ data }: ForceGraphProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { theme } = useTheme();
    const [hoveredNode, setHoveredNode] = useState<SkillNode | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const draggedNodeRef = useRef<SkillNode | null>(null);
    const simulationRef = useRef<d3.Simulation<SkillNode, SkillLink> | null>(null);
    const transformRef = useRef({ k: 1, x: 0, y: 0 });

    // Helper ref for dimensions to avoid stale closures in draw
    const dimensionsRef = useRef({ width: 0, height: 0, dpr: 1 });

    // Helper to clamp node coordinates within 54px padding of canvas bounds so nodes never clip
    const clampPositions = useCallback(() => {
        const { width, height } = dimensionsRef.current;
        if (width <= 0 || height <= 0) return;
        const padding = 54;
        data.nodes.forEach(node => {
            if (typeof node.x === 'number') {
                node.x = Math.max(padding, Math.min(width - padding, node.x));
            }
            if (typeof node.y === 'number') {
                node.y = Math.max(padding, Math.min(height - padding, node.y));
            }
        });
    }, [data.nodes]);

    // Draw Loop
    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const { width, height, dpr } = dimensionsRef.current;
        const { k, x, y } = transformRef.current;

        // Get dynamic colors
        const COLORS = getThemeColors(theme);

        // Reset
        ctx.clearRect(0, 0, width * dpr, height * dpr);
        ctx.save();

        // Apply DPI scale AND Transform (Zoom/Pan)
        ctx.scale(dpr, dpr);
        ctx.translate(x, y);
        ctx.scale(k, k);

        // Draw Links
        ctx.lineWidth = 1;
        data.links.forEach(link => {
            const source = link.source as SkillNode;
            const target = link.target as SkillNode;

            if (typeof source.x !== 'number' || typeof target.x !== 'number') return;
            if (typeof source.y !== 'number' || typeof target.y !== 'number') return;

            const isConnected = hoveredNode && (source.id === hoveredNode.id || target.id === hoveredNode.id);
            ctx.strokeStyle = isConnected ? COLORS.edgeActive : COLORS.edge;
            ctx.lineWidth = isConnected ? 1.5 : 1;
            ctx.beginPath();
            ctx.moveTo(source.x, source.y);
            ctx.lineTo(target.x, target.y);
            ctx.stroke();
        });

        // Draw Nodes
        data.nodes.forEach(node => {
            if (typeof node.x !== 'number' || typeof node.y !== 'number') return;

            const isHovered = hoveredNode?.id === node.id;
            const isNeighbor = hoveredNode && data.links.some(l =>
                ((l.source as SkillNode).id === hoveredNode.id && (l.target as SkillNode).id === node.id) ||
                ((l.target as SkillNode).id === hoveredNode.id && (l.source as SkillNode).id === node.id)
            );

            const categoryColor = COLORS[node.category] || COLORS.tool;

            // Ambient / Hover Glow
            ctx.shadowColor = categoryColor;
            if (isHovered || isNeighbor) {
                ctx.shadowBlur = 18;
            } else {
                ctx.shadowBlur = 4;
            }

            // Node Circle
            ctx.fillStyle = categoryColor;
            ctx.globalAlpha = hoveredNode && !isHovered && !isNeighbor ? 0.25 : 0.9;

            ctx.beginPath();
            const r = node.val * 0.75 * (isHovered ? 1.25 : 1);
            ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
            ctx.fill();

            ctx.globalAlpha = 1;

            // Text Label
            if (k > 0.75 || isHovered || node.val >= 8) {
                ctx.shadowBlur = 0;
                ctx.fillStyle = isHovered ? COLORS.textActive : COLORS.text;
                ctx.font = `500 ${isHovered ? 12 : 11}px "JetBrains Mono", monospace`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                const dist = r + 13;
                ctx.fillText(node.name, node.x, node.y + dist);
            }
        });

        ctx.restore();
    }, [hoveredNode, data, theme]);

    // Initial Simulation Setup
    useEffect(() => {
        const simulation = d3.forceSimulation<SkillNode, SkillLink>(data.nodes)
            .force('link', d3.forceLink<SkillNode, SkillLink>(data.links).id(d => d.id).distance(85))
            .force('charge', d3.forceManyBody().strength(-240))
            .force('center', d3.forceCenter(0, 0))
            .force('collide', d3.forceCollide<SkillNode>().radius(node => (node.val * 2) + 12).strength(0.75));

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        simulationRef.current = simulation;

        if (reducedMotion) {
            simulation.tick(300);
            clampPositions();
            draw();
            simulation.stop();
        } else {
            simulation.on('tick', () => {
                clampPositions();
                draw();
            });
        }

        return () => {
            simulation.stop();
        };
    }, [data, draw, clampPositions]);

    // Handle Resize & DPI
    useEffect(() => {
        const handleResize = () => {
            if (!canvasRef.current || !canvasRef.current.parentElement) return;

            const parent = canvasRef.current.parentElement;
            const width = parent.clientWidth;
            const height = parent.clientHeight;
            const dpr = window.devicePixelRatio || 1;

            canvasRef.current.width = width * dpr;
            canvasRef.current.height = height * dpr;
            canvasRef.current.style.width = `${width}px`;
            canvasRef.current.style.height = `${height}px`;

            if (simulationRef.current) {
                simulationRef.current.force('center', d3.forceCenter(width / 2, height / 2));
                clampPositions();
                simulationRef.current.alpha(0.3).restart();
            }

            dimensionsRef.current = { width, height, dpr };
            requestAnimationFrame(draw);
        };

        handleResize();

        const resizeObserver = new ResizeObserver(handleResize);
        if (canvasRef.current?.parentElement) {
            resizeObserver.observe(canvasRef.current.parentElement);
        }

        return () => resizeObserver.disconnect();
    }, [draw, clampPositions]);

    // Coordinate translation
    const getGraphCoordinates = (e: React.MouseEvent) => {
        if (!canvasRef.current) return { x: 0, y: 0 };
        const rect = canvasRef.current.getBoundingClientRect();
        const visualX = e.clientX - rect.left;
        const visualY = e.clientY - rect.top;

        const gx = (visualX - transformRef.current.x) / transformRef.current.k;
        const gy = (visualY - transformRef.current.y) / transformRef.current.k;

        return { x: gx, y: gy };
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        const { x, y } = getGraphCoordinates(e);

        if (isDragging && simulationRef.current && draggedNodeRef.current) {
            const { width, height } = dimensionsRef.current;
            const padding = 54;
            simulationRef.current.alphaTarget(0.3).restart();
            draggedNodeRef.current.fx = width > 0 ? Math.max(padding, Math.min(width - padding, x)) : x;
            draggedNodeRef.current.fy = height > 0 ? Math.max(padding, Math.min(height - padding, y)) : y;
            return;
        }

        let found: SkillNode | null = null;
        for (let i = data.nodes.length - 1; i >= 0; i--) {
            const node = data.nodes[i];
            if (typeof node.x !== 'number' || typeof node.y !== 'number') continue;

            const dist = Math.sqrt((x - node.x) ** 2 + (y - node.y) ** 2);
            if (dist < (node.val * 2) + 6) {
                found = node;
                break;
            }
        }

        if (found?.id !== hoveredNode?.id) {
            setHoveredNode(found);
            requestAnimationFrame(draw);
        }
    };

    const handleMouseDown = () => {
        if (hoveredNode) {
            setIsDragging(true);
            draggedNodeRef.current = hoveredNode;
        }
    };

    const handleMouseUp = () => {
        if (isDragging && simulationRef.current && draggedNodeRef.current) {
            setIsDragging(false);
            draggedNodeRef.current.fx = null;
            draggedNodeRef.current.fy = null;
            draggedNodeRef.current = null;
            simulationRef.current.alphaTarget(0).restart();
        } else if (isDragging) {
            setIsDragging(false);
        }
    };

    // Zoom via wheel
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const onWheel = (e: WheelEvent) => {
            e.preventDefault();

            const zoomFactor = -0.001 * e.deltaY;
            const { k: oldK, x: oldX, y: oldY } = transformRef.current;
            let newK = oldK * (1 + zoomFactor);
            newK = Math.max(0.3, Math.min(newK, 3.5));

            const rect = canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            const graphX = (mouseX - oldX) / oldK;
            const graphY = (mouseY - oldY) / oldK;

            const newX = mouseX - graphX * newK;
            const newY = mouseY - graphY * newK;

            transformRef.current = { k: newK, x: newX, y: newY };
            requestAnimationFrame(draw);
        };

        canvas.addEventListener('wheel', onWheel, { passive: false });
        return () => canvas.removeEventListener('wheel', onWheel);
    }, [draw]);

    return (
        <div className="relative w-full h-full">
            <canvas
                ref={canvasRef}
                className={`w-full h-full block touch-none ${hoveredNode ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'}`}
                role="img"
                aria-label="Interactive force-directed technical knowledge graph"
                onMouseMove={handleMouseMove}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            />

            {/* Hovered Node Detail Tooltip Card */}
            {hoveredNode && !isDragging && (
                <div
                    className="absolute top-4 left-4 bg-[#121216]/95 backdrop-blur-md p-3.5 rounded-lg border border-white/[0.1] border-t-white/[0.2] shadow-xl max-w-xs pointer-events-none transition-opacity duration-200"
                >
                    <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[10px] uppercase tracking-wider text-amber-400 font-mono font-medium">
                            {hoveredNode.category}
                        </span>
                        <span className="text-[9px] font-mono text-zinc-500">
                            weight: {hoveredNode.val}/10
                        </span>
                    </div>
                    <h3 className="text-base text-zinc-100 font-medium font-mono">{hoveredNode.name}</h3>
                    {hoveredNode.description && (
                        <p className="text-zinc-400 text-xs leading-relaxed mt-1 font-sans">{hoveredNode.description}</p>
                    )}
                </div>
            )}

            {/* Legend in Bottom Right */}
            <div className="absolute bottom-4 right-4 flex items-center gap-3 px-3 py-1.5 rounded-md bg-black/60 border border-white/[0.06] backdrop-blur-sm text-[10px] font-mono text-zinc-400 select-none">
                <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#e5a93b]" /> System
                </span>
                <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#7dd3fc]" /> Language
                </span>
                <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#a1a1aa]" /> Tool
                </span>
                <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#c084fc]" /> Framework
                </span>
            </div>
        </div>
    );
};
