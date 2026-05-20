import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const kbDir = path.resolve(__dirname, '../knowledge_base');
const destFile = path.resolve(__dirname, '../src/lib/knowledgeBase.ts');

function run() {
  if (!fs.existsSync(kbDir)) {
    console.error(`Knowledge base directory not found at: ${kbDir}`);
    process.exit(1);
  }

  const files = fs.readdirSync(kbDir).filter(f => f.endsWith('.md'));
  const chunks = [];

  for (const file of files) {
    const filePath = path.join(kbDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');

    // Extract main title (e.g. # About Manish Kumar -> "About Manish Kumar")
    const titleMatch = content.match(/^#\s+(.+)$/m);
    const mainTitle = titleMatch ? titleMatch[1].trim() : file.replace('.md', '');

    // Split by markdown ## headings
    const sections = content.split(/\n##\s+/);

    // The first section contains the main title and text before any ##
    if (sections[0]) {
      const text = sections[0].replace(/^#\s+.+$/m, '').trim();
      if (text) {
        chunks.push({
          source: file,
          content: `Topic: ${mainTitle}\n\n${text}`
        });
      }
    }

    for (let i = 1; i < sections.length; i++) {
      const sectionContent = sections[i].trim();
      if (!sectionContent) continue;

      // Extract the section name (everything up to the first newline)
      const lines = sectionContent.split('\n');
      const sectionName = lines[0].trim();
      const sectionText = lines.slice(1).join('\n').trim();

      if (sectionText) {
        chunks.push({
          source: file,
          content: `Topic: ${mainTitle} - ${sectionName}\n\n${sectionText}`
        });
      }
    }
  }

  // Write to src/lib/knowledgeBase.ts
  const output = `// GENERATED FILE - DO NOT EDIT DIRECTLY.
// Edit the markdown files in the root knowledge_base/ directory instead,
// and run "npm run parse-kb" to update this bundle.

export interface Chunk {
  content: string;
  source: string;
}

export const KNOWLEDGE_BASE: Chunk[] = ${JSON.stringify(chunks, null, 2)};
`;

  fs.writeFileSync(destFile, output, 'utf-8');
  console.log(`Successfully compiled ${chunks.length} chunks from ${files.length} markdown files into ${destFile}`);
}

run();
