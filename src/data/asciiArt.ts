// Import the raw text from asciiArt.txt without needing any escaping
import rawAsciiArt from './asciiArt.txt?raw';

/**
 * =====================================================================
 * Fastfetch ASCII Art Configuration
 * =====================================================================
 * 
 * You have two easy ways to update your ASCII art:
 * 
 * OPTION 1 (Easiest / Recommended):
 * Simply open `src/data/asciiArt.txt` and paste your ASCII art there.
 * You don't need to escape backslashes (\), quotes, or backticks (`).
 * 
 * OPTION 2:
 * Uncomment and edit the string below to hardcode it in TypeScript:
 */

// If asciiArt.txt has content, use it; otherwise fallback to default Arch logo
export const ASCII_ART: string = rawAsciiArt.trimEnd() || `                   -\`
                  .o+\`
                 \`ooo/
                \`+oooo:
               \`+oooooo:
               -+oooooo+:
             \`/:-:++oooo+:
            \`/++++/+++++++:
           \`/++++++++++++++:
          \`/+++ooooooooooooo/\`
         ./ooosssso++osssssso+\`
        .oossssso-\`\`\`\`/ossssss+\`
       -osssssso.      :ssssssso.
      :osssssss/        osssso+++.
     /ossssssss/        +ssssooo/-
   \`/ossssso+/:-        -:/+osssso+-
  \`+sso+:-\`                 \`.-/+oso:
 \`++:.                           \`-/+/
 .\`                                 \`/`;

export default ASCII_ART;
