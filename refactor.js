const fs = require('fs');

let html = fs.readFileSync('d:\\Hotels web\\index.html', 'utf8');

// 1. Body tag
html = html.replace(/<body class="bg-black text-beige/g, '<body class="bg-theme-bg text-theme-text transition-colors duration-500');

// 2. Sections
html = html.replace(/bg-black relative/g, 'bg-theme-bg transition-colors duration-500 relative');
html = html.replace(/bg-accent relative/g, 'bg-theme-accent transition-colors duration-500 relative');
html = html.replace(/bg-black border-b/g, 'bg-theme-bg transition-colors duration-500 border-b');
html = html.replace(/bg-black border-t/g, 'bg-theme-bg transition-colors duration-500 border-t');
html = html.replace(/bg-accent pt-24/g, 'bg-theme-accent transition-colors duration-500 pt-24'); // Footer

// 3. Borders (Global structural borders)
html = html.replace(/border-white\/5/g, 'border-theme-border');
html = html.replace(/border-white\/10/g, 'border-theme-border');
html = html.replace(/border-white\/20/g, 'border-theme-border');

// 4. Text colors general
// We carefully target headings and paragraphs so we don't hit Hero overlay text.
html = html.replace(/text-white leading-tight/g, 'text-theme-text leading-tight');
html = html.replace(/text-gray-400/g, 'text-theme-muted');
html = html.replace(/text-white font-serif/g, 'text-theme-text font-serif');
html = html.replace(/text-gray-300 font-medium/g, 'text-theme-light font-medium');

// 5. Room Cards specifically
// .room-card bg-black
html = html.replace(/bg-black border border-theme-border overflow-hidden/g, 'bg-theme-bg border border-theme-border overflow-hidden');
html = html.replace(/bg-black border border-gold/g, 'bg-theme-bg border border-gold');

// 6. Testimonial
html = html.replace(/text-white mb-6 leading-relaxed/g, 'text-theme-text mb-6 leading-relaxed');

// 7. Footer text
html = html.replace(/text-white tracking-wider mb-6/g, 'text-theme-text tracking-wider mb-6');

// 8. Forms & Inputs inside Modal
html = html.replace(/bg-accent border border-theme-border/g, 'bg-theme-accent border border-theme-border');
html = html.replace(/text-white mb-2/g, 'text-theme-text mb-2');
html = html.replace(/bg-black border-b border-theme-border pb-2 text-white/g, 'bg-theme-bg border-b border-theme-border pb-2 text-theme-text');

// Save back
fs.writeFileSync('d:\\Hotels web\\index.html', html, 'utf8');
console.log('Refactoring complete.');
