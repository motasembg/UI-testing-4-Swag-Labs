**📌 Overview**

This repository contains automated UI tests for the Swag Labs application, leveraging Playwright and TypeScript.

**🚀 Features**
- **Page Object Model (POM):** Encapsulates UI elements and actions per page.
- **End-to-End Testing:** Automates user interactions to verify application workflows.
- **Cross-Browser Support:** Tests across multiple browsers to ensure compatibility.
- **Parallel Execution:** Speeds up testing by running tests simultaneously.
- **Continuous Integration Ready:** Easily integrates with CI/CD pipelines.

**🛠️ Technologies Used**
- **Playwright:** A Node.js library for browser automation.
- **TypeScript:** A superset of JavaScript that adds static types.
- **Jest:** A testing framework for running and asserting tests.

**🧪 Running the Tests**
Installation:

    git clone https://github.com/motasembg/UI-testing-4-Swag-Labs.git
    
    cd UI-testing-4-Swag-Labs
    
    npm install

Running Tests:

    npx playwright test

For headless mode (no browser UI):

    npx playwright test --headless
