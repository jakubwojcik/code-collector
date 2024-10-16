import esbuild from 'esbuild';
import fs from 'fs';
import path from 'path';

const collectCode = (entryFile: string, outputFile: string | null = null): void => {
  esbuild
    .build({
      entryPoints: [entryFile],
      bundle: true,
      outdir: 'dist',
      write: false,
      format: 'esm',
      platform: 'node',
      metafile: true,
      sourcemap: false,
      external: ['./node_modules/*'],
      loader: {
        '.ts': 'ts',
        '.tsx': 'tsx',
        '.js': 'js',
        '.jsx': 'jsx',
        '.scss': 'empty',
        '.less': 'empty',
        '.css': 'empty',
        '.json': 'empty',
        '.png': 'empty',
        '.jpg': 'empty',
        '.svg': 'empty',
        '.woff': 'empty',
        '.woff2': 'empty',
        '.ttf': 'empty',
      },
    })
    .then((result) => {
      const includedFiles = Object.keys(result.metafile!.inputs);

      const localFiles = includedFiles.filter(
        (filePath) => !/node_modules/.test(filePath)
      );

      const outputLines: string[] = [];

      localFiles.forEach((filePath) => {
        const ext = path.extname(filePath);

        if (!['.ts', '.tsx', '.js', '.jsx'].includes(ext)) {
          return;
        }

        const absolutePath = path.resolve(filePath);
        const fileContent = fs.readFileSync(absolutePath, 'utf8');
        const relativePath = path.relative(process.cwd(), absolutePath);


        let language = '';
        if (ext === '.ts' || ext === '.tsx') {
          language = 'typescript';
        } else if (ext === '.js' || ext === '.jsx') {
          language = 'javascript';
        }

        outputLines.push(`/${relativePath}`);
        outputLines.push('```' + language);
        outputLines.push(fileContent);
        outputLines.push('```');
        outputLines.push('');
      });

      const output = outputLines.join('\n');

      if (outputFile) {
        fs.writeFileSync(outputFile, output);
        console.log(`Output written to file: ${outputFile}`);
      } else {
        console.log(output);
      }
    })
    .catch((error) => {
      console.error('Error during code aggregation:', error.message);
      process.exit(1);
    });
}

export default collectCode;
