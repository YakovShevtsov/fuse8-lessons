- `/src`: Contains all the source code for the project.
- `/pages`: Contains the pages (home, post) and their UI and API logic.
- `/shared`: Contains shared UI components like button, error message, and services with helper files.
- `/assets`: Contains static assets like images.
- `main.tsx`: Entry point for the app.
- `App.tsx`: Root component of the application.

## Installation

1. Clone the repository:
- git clone https://github.com/your-username/lesson2.git

2. Install dependencies. Make sure Yarn and Node.js installed, then run
- yarn install

3. Start development server
- yarn dev

- The app will be available at http://localhost:3000

## Available scripts

  dev: Starts the development server with Vite
  build: Builds the project for production
  preview: Previews the built project
  eslint: Runs ESLint for linting the code
  eslint:fix: Automatically fixes linting issues
  stylelint: Runs Stylelint for SCSS/CSS linting
  stylelint:fix: Automatically fixes stylelint issues
  type-check: Runs TypeScript type checking
  lint: Runs type-checking, ESLint, and Stylelint together