# BlockForgeX Frontpage

A frontend application built with React.js and Vite for the BlockForgeX platform.

## 📋 Table of Contents

- [System Requirements](#system-requirements)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)

## 🖥️ System Requirements

Make sure you have installed:

- **Node.js** (version 16.x or higher)
- **Git**
- **Package Manager** (choose one):
  - npm (included with Node.js)
  - yarn
  - pnpm

## 🚀 Installation

### 1. Clone Repository

```bash
git clone https://github.com/rafliafriza12/blockforgex-frontpage.git
```

### 2. Navigate to Project Directory

```bash
cd blockforgex-frontpage
```

### 3. Install Dependencies

Choose one of the following package managers:

#### Using npm

```bash
npm install
```

#### Using yarn

```bash
yarn install
```

#### Using pnpm

```bash
pnpm install
```

## ▶️ Running the Project

### Development Mode

To run the project in development mode:

#### Using npm

```bash
npm run dev
```

#### Using yarn

```bash
yarn dev
```

#### Using pnpm

```bash
pnpm dev
```

After running the command above, open your browser and go to:

```
http://localhost:5173
```

### Production Build

To create a production build:

#### Using npm

```bash
npm run build
```

#### Using yarn

```bash
yarn build
```

#### Using pnpm

```bash
pnpm build
```

### Preview Production Build

To preview the production build:

#### Using npm

```bash
npm run preview
```

#### Using yarn

```bash
yarn preview
```

#### Using pnpm

```bash
pnpm preview
```

## 📁 Project Structure

```
blockforgex-frontpage/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/          # Images and video assets
│   ├── hooks/           # Custom React hooks
│   ├── layouts/         # Layout components
│   ├── pages/           # Application pages
│   │   └── apply/       # Application form pages
│   ├── store/           # Redux store
│   ├── utils/           # Utility functions
│   ├── App.jsx          # Main App component
│   ├── App.css          # Global styles
│   ├── main.jsx         # Entry point
│   └── index.css        # Global CSS
├── eslint.config.js     # ESLint configuration
├── vite.config.js       # Vite configuration
├── package.json         # Dependencies and scripts
└── README.md           # Project documentation
```

## 🔧 Troubleshooting

### Port already in use

If port 5173 is already in use, Vite will automatically use the next available port.

### Error during dependency installation

Make sure you are using a compatible Node.js version (16.x+).

### Clear cache if needed

```bash
# npm
npm start -- --reset-cache

# yarn
yarn start --reset-cache

# pnpm
pnpm start --reset-cache
```

**Happy Coding! 🚀**
