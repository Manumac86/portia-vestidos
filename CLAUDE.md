# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Install dependencies
pnpm install

# Run development server with Turbopack
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Code formatting
pnpm prettier         # Format code
pnpm prettier:check   # Check formatting

# Run tests (currently runs prettier:check)
pnpm test
```

## Architecture Overview

This is a Next.js 15 e-commerce application using the App Router, built with:

- **Framework**: Next.js 15.3 with App Router and Turbopack
- **Styling**: Tailwind CSS v4 with custom configuration
- **Commerce Backend**: Shopify Storefront API
- **State Management**: React Context (Cart)
- **Type Safety**: TypeScript
- **Package Manager**: pnpm

### Key Directories

- **`app/`**: Next.js App Router pages and layouts
  - `collections/[collection]/`: Dynamic collection pages
  - `product/[handle]/`: Dynamic product pages
  - `search/`: Search functionality with collection filtering
  - `api/revalidate/`: Webhook endpoint for Shopify revalidation
  - `flags/`: Feature flag configuration

- **`components/`**: React components organized by feature
  - `cart/`: Shopping cart components and context
  - `layout/`: Header, footer, navbar, and hero section
  - `product/`: Product gallery, descriptions, and variant selectors
  - `grid/`: Product grid layouts
  - `ui/`: Reusable UI components (buttons, cards)

- **`lib/`**: Core business logic
  - `shopify/`: Shopify API integration
    - `queries/`: GraphQL queries for products, collections, cart
    - `mutations/`: Cart operations (add, update, remove)
    - `fragments/`: Reusable GraphQL fragments
    - `types.ts`: TypeScript types for Shopify data
  - `constants.ts`: Configuration constants
  - `utils.ts`: Utility functions

### Environment Variables

Required environment variables (see `.env.example`):

```
COMPANY_NAME="Your Company"
SITE_NAME="Your Site Name"
SHOPIFY_REVALIDATION_SECRET=""
SHOPIFY_STOREFRONT_ACCESS_TOKEN=""
SHOPIFY_STORE_DOMAIN="[your-store].myshopify.com"
```

### Key Features

- **Server Components**: Uses React Server Components for optimal performance
- **Partial Prerendering (PPR)**: Experimental feature enabled
- **Image Optimization**: Configured for Shopify CDN images
- **Cart Management**: Client-side cart with server actions
- **Search & Filtering**: Product search with collection-based filtering
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### Shopify Integration

The application uses Shopify's Storefront API for:
- Product catalog management
- Cart operations
- Collections and menus
- Page content

All Shopify operations are centralized in `lib/shopify/` with proper error handling and type safety.

### Performance Optimizations

- Turbopack for faster development builds
- Inline CSS (experimental)
- Next.js caching with proper cache tags
- Vercel Speed Insights integration
- Optimized image formats (AVIF, WebP)

### Custom Fonts

The application uses two Google Fonts:
- Bona Nova SC (decorative)
- Oswald (primary text)

Both fonts are configured with CSS variables for consistent usage across components.