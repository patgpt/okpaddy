# Next.js Starter Template

An opinionated Next.js starter template with modern tooling and best practices.

## 🚀 Tech Stack

[![Next.js](https://img.shields.io/badge/Next.js-15.4.5-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/docs)
[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/docs/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/docs)
[![DaisyUI](https://img.shields.io/badge/DaisyUI-5.0.50-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=white)](https://daisyui.com/)

### Core Technologies

- **[Next.js 15.4.5](https://nextjs.org/docs)** - React framework with App Router and Turbopack
- **[React 19.1.0](https://react.dev/)** - Latest React with concurrent features
- **[TypeScript 5.x](https://www.typescriptlang.org/docs/)** - Type-safe JavaScript
- **[Tailwind CSS 4.x](https://tailwindcss.com/docs)** - Utility-first CSS framework

### UI & Styling

- **[DaisyUI 5.0.50](https://daisyui.com/)** - Tailwind CSS component library
- **[React Aria Components](https://react-spectrum.adobe.com/react-aria/components.html)** - Accessible UI primitives
- **[Tailwind Typography](https://tailwindcss.com/docs/typography-plugin)** - Beautiful typographic defaults
- **[Motion](https://motion.dev/)** - Production-ready motion library for React

### Development Tools

- **[ESLint 9.x](https://eslint.org/docs/latest/)** - Code linting with Next.js config
- **[Prettier](https://prettier.io/docs/en/)** - Code formatting with Tailwind plugin
- **[Zod 4.x](https://zod.dev/)** - TypeScript-first schema validation
- **[Bun](https://bun.sh/docs)** - Fast JavaScript runtime and package manager

## 📋 Prerequisites

- **Node.js 18.x** or **[Bun](https://bun.sh/docs/installation)** (recommended)
- **npm**, **yarn**, **pnpm**, or **bun**

## 🛠 Getting Started

1. **Clone or use this template**

   ```bash
   git clone <repository-url>
   cd template
   ```

2. **Install dependencies**

   ```bash
   # Using bun (recommended)
   bun install

   # Or using npm
   npm install

   # Or using yarn
   yarn install

   # Or using pnpm
   pnpm install
   ```

3. **Start the development server**

   ```bash
   # Using bun
   bun dev

   # Or using npm
   npm run dev

   # Or using yarn
   yarn dev

   # Or using pnpm
   pnpm dev
   ```

4. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see your application.

## 📁 Project Structure

```
├── public/                 # Static assets
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── api/           # API routes
│   │   ├── globals.css    # Global styles
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Home page
│   └── utils/
│       └── cn.ts          # Class name utility
├── eslint.config.mjs      # ESLint configuration
├── next.config.ts         # Next.js configuration
├── package.json           # Dependencies and scripts
├── postcss.config.mjs     # PostCSS configuration
└── tsconfig.json          # TypeScript configuration
```

## 🚀 Available Scripts

- **`bun dev`** - Start development server with Turbopack
- **`bun build`** - Build production application
- **`bun start`** - Start production server
- **`bun lint`** - Run ESLint

## 🎨 Styling

This template uses **Tailwind CSS** with **DaisyUI** components and **React Aria Components** for accessibility.

### Custom Utilities

- **`cn()`** - Utility function combining `clsx` and `tailwind-merge` for conditional classes

```typescript
import { cn } from "@/utils/cn";

// Example usage
className={cn(
  "base-classes",
  {
    "conditional-class": condition,
  },
  variant === "primary" && "primary-classes"
)}
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Add your environment variables here
```

### Tailwind CSS

Tailwind configuration is handled automatically. Custom styles can be added to `src/app/globals.css`.

## 📚 Documentation Links

- **[Next.js Documentation](https://nextjs.org/docs)** - Learn about Next.js features and API
- **[React Documentation](https://react.dev/)** - Learn React concepts and patterns
- **[Tailwind CSS Documentation](https://tailwindcss.com/docs)** - Utility classes and customization
- **[DaisyUI Documentation](https://daisyui.com/)** - Component library for Tailwind
- **[React Aria Documentation](https://react-spectrum.adobe.com/react-aria/)** - Accessible components
- **[TypeScript Documentation](https://www.typescriptlang.org/docs/)** - Type system and features

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Happy coding!** 🎉
