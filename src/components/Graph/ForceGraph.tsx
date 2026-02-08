import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as d3 from 'd3-force';
import type { GraphData, SkillNode, SkillLink } from '../../data/skillsGraph';
import { useTheme } from '../../context/ThemeContext';

interface ForceGraphProps {
    data: GraphData;
    width?: number;
    height?: number;
}

// Colors now adapt to theme
const getThemeColors = (theme: 'dark' | 'gruvbox') => {
    const isGruv = theme === 'gruvbox';
    return {
        system: '#ef4444',
        tool: '#3b82f6',
        language: '#10b981',
        framework: '#8b5cf6',
        concept: '#f59e0b',
        text: isGruv ? '#3c3836' : 'rgba(255,255,255,0.7)',
        textActive: isGruv ? '#000' : '#fff',
        edge: isGruv ? 'rgba(60,56,54,0.15)' : 'rgba(255,255,255,0.1)'
    };
};

export const ForceGraph = ({ data }: ForceGraphProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { theme } = useTheme();
    const [hoveredNode, setHoveredNode] = useState<SkillNode | null>(null);
    const simulationRef = useRef<d3.Simulation<SkillNode, SkillLink> | null>(null);
    const transformRef = useRef({ k: 1, x: 0, y: 0 });
    const isDragging = useRef(false);

    // Helper ref for dimensions to avoid stale closures in draw
    const dimensionsRef = useRef({ width: 0, height: 0, dpr: 1 });

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

            // Skip if positions aren't ready
            if (typeof source.x !== 'number' || typeof target.x !== 'number') return;

            const isConnected = hoveredNode && (source.id === hoveredNode.id || target.id === hoveredNode.id);
            ctx.strokeStyle = isConnected ? (theme === 'gruvbox' ? 'rgba(60,56,54,0.4)' : 'rgba(255,255,255,0.4)') : COLORS.edge;
            ctx.beginPath();
            ctx.moveTo(source.x!, source.y!);
            ctx.lineTo(target.x!, target.y!);
            ctx.stroke();
        });

        // Draw Nodes
        data.nodes.forEach(node => {
            if (typeof node.x !== 'number' || typeof node.y !== 'number') return;

            const isHovered = hoveredNode?.id === node.id;
            const isNeighbor = hoveredNode && data.links.some(l =>
                (l.source as SkillNode).id === hoveredNode.id && (l.target as SkillNode).id === node.id ||
                (l.target as SkillNode).id === hoveredNode.id && (l.source as SkillNode).id === node.id
            );

            // Shadow/Glow (Always active, stronger on hover)
            // Use specific color for glow or generic
            ctx.shadowColor = (theme === 'gruvbox') ? COLORS[node.category] : COLORS[node.category];

            if (isHovered || isNeighbor) {
                ctx.shadowBlur = 20; // Strong glow
            } else {
                ctx.shadowBlur = (theme === 'gruvbox' ? 0 : 6); // No ambient glow in gruvbox (ink style)
            }

            // Body
            ctx.fillStyle = COLORS[node.category];
            ctx.globalAlpha = (hoveredNode && !isHovered && !isNeighbor) ? 0.3 : 0.8;

            ctx.beginPath();
            const r = node.val * 0.8 * (isHovered ? 1.2 : 1);
            ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
            ctx.fill();

            ctx.globalAlpha = 1;

            // Text Label
            if (k > 0.8 || isHovered || node.val > 7) {
                ctx.fillStyle = isHovered ? COLORS.textActive : COLORS.text;
                ctx.font = `400 ${isHovered ? 12 : 10}px Inter, system-ui`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                const dist = r + 12;
                ctx.fillText(node.name, node.x, node.y + dist);
            }
        });

        ctx.restore();
    }, [hoveredNode, data, theme]);

    // Initial Setup (Moved after draw to satisfy dependencies)
    useEffect(() => {
        // Setup Simulation
        const simulation = d3.forceSimulation<SkillNode, SkillLink>(data.nodes)
            .force('link', d3.forceLink<SkillNode, SkillLink>(data.links).id(d => d.id).distance(80))
            .force('charge', d3.forceManyBody().strength(-200)) // Repulsion
            .force('center', d3.forceCenter(0, 0)) // We will re-center in render
            .force('collide', d3.forceCollide<SkillNode>().radius(node => (node.val * 2) + 10).strength(0.7));

        // Check Reduced Motion
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        simulationRef.current = simulation;

        if (reducedMotion) {
            // Fast-forward simulation to end state
            simulation.tick(300);
            draw();
            simulation.stop();
        } else {
            simulation.on('tick', () => draw());
        }

        return () => {
            simulation.stop();
        };
    }, [data, draw]);

    // Handle Resize & DPI
    useEffect(() => {
        const handleResize = () => {
            if (!canvasRef.current || !canvasRef.current.parentElement) return;

            const parent = canvasRef.current.parentElement;
            const width = parent.clientWidth;
            const height = parent.clientHeight;
            const dpr = window.devicePixelRatio || 1;

            // Set Buffer Size (High DPI)
            canvasRef.current.width = width * dpr;
            canvasRef.current.height = height * dpr;

            // Set Display Size (CSS)
            canvasRef.current.style.width = `${width}px`;
            canvasRef.current.style.height = `${height}px`;

            // Update Simulation Center
            if (simulationRef.current) {
                // We center the force at logical center
                simulationRef.current.force('center', d3.forceCenter(width / 2, height / 2));
                simulationRef.current.alpha(0.3).restart();
            }

            // Store dimensions immediately for draw loop
            dimensionsRef.current = { width, height, dpr };
            requestAnimationFrame(draw);
        };

        // Initial sizing
        handleResize();

        // Observer
        const resizeObserver = new ResizeObserver(handleResize);
        if (canvasRef.current?.parentElement) {
            resizeObserver.observe(canvasRef.current.parentElement);
        }

        return () => resizeObserver.disconnect();
    }, [draw]);

    // Interactions
    const getGraphCoordinates = (e: React.MouseEvent) => {
        if (!canvasRef.current) return { x: 0, y: 0 };
        const rect = canvasRef.current.getBoundingClientRect();
        // Mouse relative to canvas (visual)
        const visualX = e.clientX - rect.left;
        const visualY = e.clientY - rect.top;

        // Transform to Graph Space (accounting for Pan/Zoom)
        const gx = (visualX - transformRef.current.x) / transformRef.current.k;
        const gy = (visualY - transformRef.current.y) / transformRef.current.k;

        return { x: gx, y: gy };
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        const { x, y } = getGraphCoordinates(e);

        if (isDragging.current && simulationRef.current && hoveredNode) {
            // Drag Logic
            simulationRef.current.alphaTarget(0.3).restart();
            hoveredNode.fx = x;
            hoveredNode.fy = y;
            return;
        }

        // Hover Logic
        let found: SkillNode | null = null;
        // Search in reverse order (top first)
        for (let i = data.nodes.length - 1; i >= 0; i--) {
            const node = data.nodes[i];
            if (typeof node.x !== 'number' || typeof node.y !== 'number') continue;

            const dist = Math.sqrt((x - node.x) ** 2 + (y - node.y) ** 2);
            if (dist < (node.val * 2) + 5) {
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
            isDragging.current = true;
        }
    };

    const handleMouseUp = () => {
        if (isDragging.current && simulationRef.current && hoveredNode) {
            isDragging.current = false;
            hoveredNode.fx = null;
            hoveredNode.fy = null;
            simulationRef.current.alphaTarget(0).restart();
        }
    };

    // Wheel Listener (Non-passive for preventing scroll)
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const onWheel = (e: WheelEvent) => {
            e.preventDefault();

            const zoomFactor = -0.001 * e.deltaY;
            const { k: oldK, x: oldX, y: oldY } = transformRef.current;
            let newK = oldK * (1 + zoomFactor);
            newK = Math.max(0.2, Math.min(newK, 4));

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
        <div className="relative w-full h-full flex items-center justify-center p-4">
            {/* Box Container */}
            <div
                className="relative w-full h-full border border-white/10 bg-black/40 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-sm"
                role="region"
                aria-label="Interactive Skills Graph"
            >
                <canvas
                    ref={canvasRef}
                    className={`w-full h-full block touch-none ${hoveredNode ? 'cursor-pointer' : 'cursor-default'}`}
                    role="img"
                    aria-label="Force directed graph showing technical skills and their relationships"
                    onMouseMove={handleMouseMove}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                />

                {/* Legend / Info Overlay */}
                {hoveredNode && !isDragging.current && (
                    <div
                        className="absolute bg-neutral-900/90 backdrop-blur-md p-4 rounded-xl border border-white/10 max-w-xs pointer-events-none transition-opacity duration-200 shadow-xl"
                        style={{
                            top: 20,
                            left: 20
                        }}
                    >
                        <div className="text-xs uppercase tracking-widest text-emerald-400/80 mb-1 font-mono">{hoveredNode.category}</div>
                        <h3 className="text-xl text-white font-medium mb-2">{hoveredNode.name}</h3>
                        {hoveredNode.description && (
                            <p className="text-gray-400 text-sm leading-relaxed">{hoveredNode.description}</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};


