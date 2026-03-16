/**
 * Centralized Tajweed Refiner Utility
 * Standardizes character-level precision coloring across components.
 */

export const refineTajweed = (html: string) => {
    if (!html) return html;

    // 0. Pre-processing: Standardize both <rule> and <tajweed> tags to normalized <rule class="...">
    // Also ensures quotes around classes (API often omits them)
    let processed = html
        .replace(/<(rule|tajweed) class=(?:"([^"]*)"|'([^']*)'|([^ >]*))>/g, '<rule class="$2$3$4">')
        .replace(/<\/tajweed>/g, '</rule>')
        .replace(/[\u200C\u200B]/g, ''); // Remove ZWNJ/ZWSP

    // 0.5 Handle untagged Madda marks (fallback for API omissions)
    // Wrap the base character (Alif/Waw/Ya/AlifMaksura) along with the madda mark (\u0653)
    // to ensure correct font rendering and color visibility.
    processed = processed.replace(/([\u0627\u0648\u064A\u0649])\u0653/g, '<rule class="madda_obligatory">$1\u0653</rule>');

    // 1. Merge adjacent rule tags of the *same* class (safely)
    let lastHtml;
    do {
        lastHtml = processed;
        processed = processed.replace(/<rule class="([^"]+)">([^<]*)<\/rule><rule class="\1">([^<]*)<\/rule>/g, '<rule class="$1">$2$3</rule>');
    } while (processed !== lastHtml);

    // 1.5 Squeeze trailing marks into rules (pull Shaddas/Vowels/Madda back in)
    processed = processed.replace(/(<rule class="([^"]+)">[^<]+)<\/rule>([\u0651\u064E\u064F\u0650\u064B\u064C\u064D\u0652\u0670\u0653]+)/g, '$1$3</rule>');

    // 2. Precision Rules (Character-Level)
    processed = processed.replace(/<rule class="([^"]+)">([^<]+)<\/rule>/g, (match, className, content) => {
        const isGhunnahRule = /(ghunnah|iqlab|idgham_ghunnah|idgham_with_ghunnah|idgham_shafawi)/.test(className);
        const isIdghamRule = /idgham/.test(className);
        const isIkhfaRule = /ikhfa|ikhafa/.test(className);

        // RULE 1: STRICT BLACK EXCLUSIONS (Stop signs, Superscript Ya/Waw, etc.)
        if (/[\u06D6-\u06DC\u06E5\u06E6]/.test(content)) {
            return content;
        }

        // RULE 2: IQLAB/MEEM SAKIN (\u06E2) - Mark green, base BLACK
        if (className === 'iqlab' || content.includes('\u06E2')) {
            if (content.includes('\u06E2')) {
                const base = content.replace(/\u06E2/g, '');
                const ruleMark = `<rule class="ghunnah_green">\u06E2</rule>`;
                return `${base}${ruleMark}`;
            }
            return content; // Base trigger black
        }

        // RULE 3: GHUNNAH / IKHFA / SHAFAWI - Character-level Green (N, M, W, Y only)
        if (isGhunnahRule || isIkhfaRule) {
            return [...content].map(char => {
                // Noon, Meem, Waw, Ya, and their marks -> GREEN
                if (/[\u0646\u0645\u0648\u064A\u0651\u064B-\u0650\u0652]/.test(char)) {
                    return `<rule class="ghunnah_green">${char}</rule>`;
                }
                return char; // Others (like Dhal, Zay, Alif) -> BLACK
            }).join('');
        }

        // RULE 4: IDGHAM SOURCE (Tanween/Sukun) -> GREY
        if (isIdghamRule) {
            // Noon in source position (no shadda, often followed by trigger) -> GREY
            if (/^[\u0646]/.test(content) && !/\u0651/.test(content)) {
                return [...content].map(char => {
                    if (/[\u0646\u064B\u064C\u064D\u0652]/.test(char)) return `<rule class="idgham_grey">${char}</rule>`;
                    return char;
                }).join('');
            }

            // Marks in Idgham source
            if (/[\u064B\u064C\u064D\u0652]/.test(content)) {
                const base = content.replace(/[\u064B\u064C\u064D\u0652]/g, '');
                const ruleMarks = content.match(/[\u064B\u064C\u064D\u0652]/g)?.join('') || '';
                return `${base}<rule class="idgham_grey">${ruleMarks}</rule>`;
            }

            // IDGHAM TARGETS (Waw, Ya, Noon, Meem) -> GREEN
            if (/[\u0646\u0645\u0648\u064A]/.test(content)) {
                return `<rule class="ghunnah_green">${content}</rule>`;
            }

            // Non-Ghunnah Targets (Lam, Ra) -> GREY
            if (/[\u0644\u0631]/.test(content)) return `<rule class="idgham_grey">${content}</rule>`;
            
            return match; 
        }

        // Defaults: Catch-all for confirmed markers
        if (/(ham_wasl|laam_shamsiyah|qalaqah|madda|madd)/.test(className)) return match;
        
        // Final fallback: color marks green
        if (/[\u064B-\u064D\u06E2\u0651]/.test(content)) return `<rule class="ghunnah_green">${content}</rule>`;
        
        return content; 
    });

    // Final Cleanup: Unify class names for CSS
    processed = processed.replace(/class="(idgham_ghunnah|ikhfa|ikhafa|idgham_with_ghunnah|idgham_shafawi)"/g, 'class="ghunnah_green"');
    processed = processed.replace(/class="(ghunnah|ghunnah_compulsory|iqlab)"/g, 'class="ghunnah_green"');

    return processed;
};
