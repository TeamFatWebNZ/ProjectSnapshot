# Project Snapshot

## Overview

The Project Snapshot is a Node.js script designed to generate a comprehensive transcript of your project's structure and contents. It was created to facilitate easy sharing of project details with AI assistants or team members, providing a quick and efficient way to convey the overall structure and code of a project without sharing the entire repository.

## Features

- Interactive command-line interface
- Generates a directory structure of your project
- Compiles contents of specified file types
- Respects `.gitignore` rules and additional custom ignore patterns
- Customizable file type inclusion

## Why It Was Made

This script was developed to address the challenge of sharing project context with AI assistants or remote team members without granting access to the entire repository. It provides a snapshot of the project's structure and contents, making it easier to discuss specific parts of the codebase or get a quick overview of the project layout.

## Installation

1. Ensure you have Node.js installed on your system. You can download it from [nodejs.org](https://nodejs.org/).

2. Clone or download this repository to your local machine.

3. Navigate to the project directory in your terminal.

4. Install the required dependencies by running:
   ```
   npm install
   ```
If you get stuck, just copy the js code into your favourite LLM and ask it how to make the code work.

## Usage

1. Place the `projectsnap.js` file in the root directory of your project.

2. Open a terminal and navigate to your project's root directory.

3. Run the script using the command:
   ```
   node projectsnap.js
   ```

4. The script will prompt you with two questions:
   - "Include directory structure? (y/n): "
   - "Include file contents? (y/n): "

5. Answer each question with 'y' for yes or 'n' for no.

6. The script will generate a file named `project_snapshot_transcript.txt` in the same directory, containing the requested information.

## Default Exclusions

The script automatically excludes the following files and directories:

- `projectsnap.js` (the script itself)
- `node_modules`
- `package.json`
- `package-lock.json`
- `.git`
- `project_snapshot_transcript.txt` (the output file)

Additionally, it respects all patterns specified in your project's `.gitignore` file.

## How It Works

1. The script first reads your `.gitignore` file (if present) and combines those rules with its default exclusions.

2. If you choose to include the directory structure, it recursively traverses your project directory, generating a tree-like representation of your project's file and folder structure.

3. If you choose to include file contents, it reads the contents of files with allowed extensions (by default: .php, .js, .css, .html, .json, .txt) and includes them in the transcript.

4. The generated transcript is written to `project_transcript.txt`, which includes the directory structure (if selected) followed by the contents of included files (if selected).

## Customization

You can customize the script by modifying the following variables at the top of `compiler.js`:

- `allowedExtensions`: Add or remove file extensions to change which file types are included in the content compilation.
- `ignoreFiles`: Add or remove files or directories to the default exclusion list.

## Notes

- Large projects may take some time to process, especially if including file contents.
- Be cautious about sharing the generated transcript if your project contains sensitive information.
- Always review the generated transcript before sharing it to ensure no unintended information is included.

## Contributing

Contributions to improve Project Snapshot are welcome. Please feel free to submit pull requests or open issues to suggest improvements or report bugs.

## License

This project is open source and available under the [MIT License](LICENSE).
