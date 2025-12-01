# QR Code Generator

## Overview
This project is a JavaScript application that generates QR codes based on user input (e.g., text, URL).  
It demonstrates the use of JavaScript and Node.js, handling user input, dynamically generating QR codes, and rendering the result for download or display.

## Features
- Accepts user input (text, URL, or any string)  
- Generates a QR code image based on the input  
- Displays the QR code for preview  
- Allows users to download the generated QR code image (if implemented)  
- Command line based user interface  

## Tech Stack
- JavaScript (ES6+)
- Node.js
- QR code generation NPM module

## Installation & Setup

Clone the repository:

```bash
git clone https://github.com/Andrey-McLennan7/QR-Code-Generator.git
cd QR-Code-Generator
npm install          # if using Node.js and dependencies are defined in package.json
node index.js        # or nodemon index.js if you have the nodemon package installed
```

Then open your browser at: http://localhost:3000

## Usage
- Enter the desired text or URL in the input field
- Submit to generate a QR code
- Find the generated QR code in your downloads folder

## What I Learned / What I Implemented
Through this project, I refined skills in:
- Handling user input and validating it
- Using a QR code generation library installed and implemented from NPM
- Managing dependencies and project setup
- Developing an application using Node and JS

Additional contributions:
- Proper project structure for maintainability
- Clear code organisation and readability

## Future Improvements
Possible enhancements to expand or refine the app:
- Add support for different QR code options (size, color, error correction level)
- Provide download options in different formats (PNG, SVG, etc.)
- Add input validation and error messages for invalid content
- Add tests (unit / integration) for generation and UI logic
- Add a proper user-friendly UI without relying on the Command Line Console Interface

## Author
- Andrey McLennan
- GitHub: Andrey-McLennan7
- Origin: https://www.udemy.com/course/the-complete-web-development-bootcamp/learn/lecture/38912024#overview
