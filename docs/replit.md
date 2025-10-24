# Premium Photo Gallery

## Overview

A premium interactive photo gallery web application featuring a masonry layout, category filtering, search functionality, and full-screen lightbox viewing. Built with React, TypeScript, Express, and styled with Tailwind CSS and shadcn/ui components. The application emphasizes visual content presentation with minimal UI interference, inspired by Pinterest's masonry layouts and Unsplash's photography-first aesthetic.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- **Framework**: React with TypeScript
- **Routing**: Wouter (lightweight client-side routing)
- **State Management**: React hooks (useState, useEffect) with TanStack React Query for server state
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui (Radix UI primitives with custom styling)

**Key Design Decisions:**
- **Component-based architecture**: Modular components for gallery header, category filters, search bar, masonry grid, image cards, and lightbox
- **Client-side only application**: No server-side rendering, pure SPA approach
- **Dark mode first**: Default dark theme optimized for photo presentation with light mode support via ThemeProvider context
- **Responsive masonry layout**: CSS columns-based masonry grid that adapts from 1 to 4 columns based on viewport size
- **Lazy loading**: Intersection Observer API for progressive image loading with 200px root margin for performance

**Component Structure:**
- `GalleryHeader`: Sticky header with branding and theme toggle
- `CategoryFilter`: Horizontal scrollable category filter buttons
- `SearchBar`: Search input with clear functionality
- `MasonryGallery`: Main grid container using CSS columns
- `ImageCard`: Individual image cards with hover effects and favorite toggle
- `Lightbox`: Full-screen image viewer with keyboard navigation
- `ThemeProvider`: Global theme state management

### Backend Architecture

**Technology Stack:**
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Build Tool**: Vite for frontend, esbuild for backend bundling
- **Development**: tsx for TypeScript execution in development

**Key Design Decisions:**
- **Minimal backend**: Currently configured with basic Express server setup and route registration pattern
- **Storage abstraction**: Interface-based storage layer (IStorage) with in-memory implementation (MemStorage) for user data
- **API-ready structure**: Routes prefixed with `/api` for future backend integration
- **Development middleware**: Request logging with duration tracking for API routes
- **Error handling**: Centralized error middleware catching all unhandled errors

**Server Structure:**
- `server/index.ts`: Main Express application setup with middleware and error handling
- `server/routes.ts`: Route registration with HTTP server creation
- `server/storage.ts`: Storage interface and in-memory implementation
- `server/vite.ts`: Vite dev server integration for HMR in development

### Data Storage

**Current Implementation:**
- **In-memory storage**: MemStorage class using Map for user data
- **User schema**: Basic user model with id, username, password fields
- **UUID generation**: crypto.randomUUID() for user IDs

**Database Configuration (Prepared but not actively used):**
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Provider**: Neon Database serverless driver (@neondatabase/serverless)
- **Schema location**: shared/schema.ts with pgTable definitions
- **Migrations**: Configured to output to ./migrations directory
- **Schema validation**: Zod integration via drizzle-zod for runtime type safety

**Storage Interface Design:**
- Async methods for future database integration
- CRUD operations: getUser, getUserByUsername, createUser
- Extensible interface pattern for adding new storage methods

### External Dependencies

**UI & Component Libraries:**
- **Radix UI**: Headless UI components (@radix-ui/react-*) for accessible primitives
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **shadcn/ui**: Pre-built component library using Radix primitives
- **Lucide React**: Icon library for consistent iconography
- **class-variance-authority**: Type-safe variant styling for components
- **cmdk**: Command palette component (available but not currently used)

**State & Data Management:**
- **TanStack React Query**: Server state management with query client configuration
- **React Hook Form**: Form handling with @hookform/resolvers for validation
- **Zod**: Runtime type validation and schema definition

**Development Tools:**
- **Vite**: Frontend build tool with React plugin and HMR
- **esbuild**: Fast backend bundling for production
- **tsx**: TypeScript execution for development
- **Replit plugins**: Runtime error modal, cartographer, and dev banner for Replit environment

**Local Storage:**
- **Favorites system**: Browser localStorage for persisting user favorites (gallery-favorites key)
- **Theme persistence**: localStorage for theme preference (theme key)

**Fonts:**
- **Google Fonts**: Inter font family (weights: 400, 500, 600, 700)

**Image Source:**
- Currently using placeholder images (likely Lorem Picsum or similar) generated in the Gallery component
- Images generated with deterministic seeds for category-specific content
- Aspect ratios calculated and stored with each image for masonry layout