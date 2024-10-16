# Code Collector
A handy command-line tool to collect local JavaScript and TypeScript code files into a formatted output. This tool recursively resolves all local imports (excluding node_modules dependencies) and collects each resolved file into a structured format, making it ideal for code reviews, documentation, and preparing code snippets for Large Language Models (LLMs).

## Features

- **Supports** `.js`, `.jsx`, `.ts`, and `.tsx` files (files like styles, images, fonts will be skipped).
- **Recursively resolves** local imports in your codebase.
- **Excludes** external node_modules dependencies imports (only local code will be returned).
- **Collects** code into a clean, formatted output.
- **CLI interface** for easy usage.

## Installation

You can install the package globally using npm:

```bash
npm install -g code-collector
```

## Usage

```bash
npx code-collector <entryFile> [options]
```

#### Options

- `<entryFile>`: **Required**. The entry file, base for building the dependency tree.
- `-o, --output <outputFile>`: **Optional**. Specify the output file. Defaults to standard output (your terminal window 👀).

#### Example usage

```bash
code-collector src/components/MainComponent.tsx -o output.txt
```

This command collects the code starting from `src/components/MainComponent.tsx` and writes the formatted output to `output.txt` (in the directory where you executed the tool).


## Output format

The collected output will list each file's path (relative to the root of the repository) and its content in a code block with appropriate syntax highlighting marker.

````xml
<path_to_the_file>
```typescript
<content_of_the_file>
```
````

## License
This project is licensed under the ISC License.