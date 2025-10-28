**Required Packages and installation**

1. created react-app with vite "npm create vite@latest"
2. Required NPM packages:
   2.1 react-router-dom v6
   2.2 redux for state management > 2.2.1 npm install @reduxjs/toolkit react-redux
   2.3 react-bootstrap for CSS and react components > 2.3.1 npm install react-bootstrap bootstrap
   2.4 npm install --save react-bootstrap-typeahead (For Global search with categories)
3. npm install --save-dev vitest @testing-library/react @testing-library/jest-dom

package(s) for writing the test cases: (Taken the references from AI)

1. Configured the files which are required to write the test cases.
   2.1 The configurations are available in vite.config.js file.

---

## 🚀 Features

1. **Routing with React Router DOM (v6)**

   - Implemented using `createBrowserRouter` with **data loaders** to fetch product information from an API.
   - The route configuration supports nested routes with layout-level separation.

2. **Simulated API Delay with Promise (Shimmer UI)**

   - Product data is fetched via a promise with a `3000ms` delay to display **loading shimmer effects** before content loads.

3. **State Management**

   - **Custom Hooks** are used for component-level logic handling.
   - **Redux** is integrated for managing global application state.
   - This separation of logic helps maintain testability and scalability across modules.

4. **Project Setup with Vite**

   - The project is bootstrapped with **Vite** for faster builds, hot reload, and lightweight configuration.

5. **Testing Configuration (Vitest)**

   - All unit test cases are written using **Vitest**.
   - The test configuration is customized for:
     - Handling absolute imports (`@pages`, `@layouts`, etc.)
     - Excluding unwanted files/folders from coverage.
     - Async testing for delayed promise-based operations.

6. **Absolute Imports**
   - Simplified imports using aliases configured in `vite.config.js` and `jsconfig.json`.
   - Example:
     ```js
     import ProductList from "@pages/products/list";
     ```

---

## 🧠 AI Reference Notes

Since this project is my first hands-on with **Vite**, I leveraged AI assistance for:

1. **Understanding Vite test configurations** — including coverage setup and `vitest.config` customization.
2. **Referencing sample test case structures** — a few of the test cases were implemented with the help of AI guidance and then customized to fit the project.

---

## ⚙️ Tech Stack

- **Frontend:** React 18, Vite
- **Routing:** React Router DOM (v6)
- **State Management:** Redux Toolkit, Custom Hooks
- **Testing:** Vitest, React Testing Library
- **Styling:** CSS Modules, Bootstrap
- **Tooling:** ESLint, Prettier

---

## commands to run the app and for test cases:

npm run dev - to run the application
npm run test:ui - run the test cases in UI
npm run test:coverage - show the HTML formatted test cases (lcov)
