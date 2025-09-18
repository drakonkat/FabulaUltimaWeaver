import { promises as fs } from 'fs';
import path from 'path';

// This script copies the PDF template to the public directory so Vite can process it.
async function copyPdf() {
  const sourcePath = path.resolve(process.cwd(), 'resources', 'Fabula-Ultima-Scheda-del-Personaggio.pdf');
  const publicDir = path.resolve(process.cwd(), 'public');
  const destDir = path.resolve(publicDir, 'resources');
  const destPath = path.resolve(destDir, 'Fabula-Ultima-Scheda-del-Personaggio.pdf');

  try {
    // Ensure the destination directory exists
    await fs.mkdir(destDir, { recursive: true });
    
    // Copy the file
    await fs.copyFile(sourcePath, destPath);
    console.log(`Successfully copied PDF template to ${destPath}`);
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.warn(`
        Warning: PDF template not found at ${sourcePath}.
        The PDF preview feature will not work in the built application.
        Please make sure 'Fabula-Ultima-Scheda-del-Personaggio.pdf' exists in a 'resources' folder at the project root.
      `);
    } else {
      console.error('Error copying PDF template:', error);
      process.exit(1);
    }
  }
}

copyPdf();
