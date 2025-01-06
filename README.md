# Project Management App

A modern project management application built with Next.js 15, TypeScript, Ant Design, and Tailwind CSS.

## 📁 Project Structure

```
├── src/                      # Source code
│   ├── app/                  # Next.js app directory (pages & API routes)
│   ├── components/           # Reusable React components
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utility functions and types
│   ├── fixtures/             # Test data and mock fixtures
│   └── icons/                # Custom icon components
├── public/                   # Static assets
└── __tests__/                # Test files
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/loveheenavasu/project-management
cd project-management-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 🔧 Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Creates a production build
- `npm run start` - Runs the production server
- `npm run test` - Runs the test suite
- `npm run lint` - Runs ESLint to check code quality

## 🛠️ Tech Stack

- [Next.js 14](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Ant Design](https://ant.design/) - UI Framework
- [Jest](https://jestjs.io/) - Testing framework

## 🧪 Testing

The project includes a test suite using Jest. Test files are located in the `__tests__` directory and alongside the components they test.

To run tests:
```bash
npm run test
```

## 📝 Development Guidelines

- The `src/app` directory contains all pages and API routes following Next.js 14 app directory structure
- Reusable components should be placed in `src/components`
- Custom hooks should be placed in `src/hooks`
- Types and utilities should be placed in `src/lib`
- Add new icons to `src/icons`

## 🔄 API Routes

The application includes API routes for project management:

- `GET /api/projects` - List all projects
- `GET /api/projects/[id]` - Get a specific project
- Additional routes as needed
