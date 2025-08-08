# Funwalk Cluster Monterrey Doorprize Application

## Overview

This is a React-based live doorprize drawing application built for the Funwalk event at Cluster Monterrey Citraland. The application features an interactive spinning wheel for conducting live prize draws, an image carousel showcasing event moments, and a sponsor section. It's designed as a single-page application with a modern, responsive interface using TypeScript and includes comprehensive UI components from shadcn/ui.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Animations**: Framer Motion for smooth UI animations
- **Form Handling**: React Hook Form with Zod validation resolvers

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Session Management**: Built-in memory storage with extensible interface
- **API Structure**: RESTful APIs with `/api` prefix
- **Development**: Hot module reloading with Vite integration

### Component Structure
- **SpinWheel**: Interactive prize wheel with customizable participant count
- **ImageCarousel**: Auto-playing image carousel with manual controls
- **SponsorSection**: Grid-based sponsor logo display
- **UI Components**: Comprehensive set of accessible components (buttons, cards, forms, etc.)

### Data Storage
- **Database**: PostgreSQL with Neon serverless configuration
- **Schema**: Drizzle schema definitions in shared directory
- **Migrations**: Automated database migrations with drizzle-kit
- **Storage Interface**: Abstracted storage layer supporting both memory and database implementations

### Development Workflow
- **Type Safety**: Shared TypeScript types between client and server
- **Path Aliases**: Configured aliases for clean imports (@/, @shared/, @assets/)
- **Code Organization**: Monorepo structure with client, server, and shared directories
- **Build Process**: Separate build processes for client (Vite) and server (esbuild)

## External Dependencies

### Database Services
- **Neon Database**: Serverless PostgreSQL database hosting
- **Connection Management**: Environment-based database URL configuration

### UI and Styling
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **Radix UI**: Accessible component primitives for complex UI elements
- **Lucide React**: Icon library for consistent iconography
- **Google Fonts**: Inter font family for typography

### Development Tools
- **Replit Integration**: Vite plugins for Replit development environment
- **PostCSS**: CSS processing with Tailwind and Autoprefixer
- **ESBuild**: Fast bundling for server-side code

### Frontend Libraries
- **Date-fns**: Date manipulation and formatting
- **Class Variance Authority**: Component variant management
- **CLSX**: Utility for conditional CSS classes
- **Embla Carousel**: Carousel functionality for image display

The application is designed to be deployed on Replit with automatic environment setup and includes comprehensive error handling and logging for production use.