# Shaiks Real Estate - Complete Platform

A full-stack real estate management platform with public property listings and admin dashboard for managing properties. Built with Next.js 16, Neon PostgreSQL, Drizzle ORM, and Better Auth.

## Features

### 🏠 Public Site
- **Home Page** - Professional landing page showcasing the company
- **Properties Listing** - Browse all available properties in a beautiful grid layout
- **Property Details** - View detailed information about each property
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile

### 👨‍💼 Admin Dashboard
- **Secure Authentication** - Email and password login with Better Auth
- **Properties CRUD** - Create, Read, Update, and Delete properties
- **Properties Management** - View all properties in a sortable table
- **Admin Dashboard** - Central hub with quick statistics and navigation
- **Session Management** - Secure logout and session handling

## Tech Stack

### Frontend
- **Framework**: Next.js 16.2.6 with App Router
- **Language**: TypeScript
- **UI Library**: React 19
- **Styling**: Tailwind CSS v4
- **Components**: Shadcn/ui
- **Icons**: Lucide React

### Backend & Database
- **Runtime**: Node.js (Vercel Edge & Serverless)
- **API**: Next.js API Routes + Server Actions
- **Database**: Neon PostgreSQL
- **ORM**: Drizzle ORM
- **Authentication**: Better Auth v0 (email + password)
- **Database Driver**: pg (node-postgres)

## Project Structure

```
shaiks-real-estate/
├── app/
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Home page
│   ├── globals.css                # Global styles & theme tokens
│   ├── sign-in/page.tsx           # Admin login
│   ├── sign-up/page.tsx           # Admin registration
│   ├── properties/page.tsx        # Public properties listing
│   ├── admin/
│   │   ├── page.tsx               # Admin dashboard
│   │   └── properties/page.tsx    # Properties management
│   ├── api/
│   │   └── auth/[...all]/route.ts # Better Auth handler
│   └── actions/
│       └── properties.ts          # Server actions for CRUD
├── components/
│   ├── auth-form.tsx              # Login/signup form
│   └── admin/
│       ├── property-form.tsx      # Add/edit property form
│       ├── properties-table.tsx   # Properties list table
│       └── properties-page-client.tsx
├── lib/
│   ├── auth.ts                    # Better Auth configuration
│   ├── auth-client.ts             # Client-side auth utilities
│   └── db/
│       ├── index.ts               # Drizzle ORM client
│       └── schema.ts              # Database schema & relations
├── package.json
├── SETUP_GUIDE.md                 # Detailed setup guide
└── README.md                      # This file
```

## Environment Variables

Automatically configured through Vercel integrations:

| Variable | Source | Purpose |
|----------|--------|---------|
| `DATABASE_URL` | Neon Integration | PostgreSQL connection string |
| `BETTER_AUTH_SECRET` | Manual Setup | Session signing secret (32+ chars) |

To generate a secret: `openssl rand -base64 32`

## Quick Start

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Set Environment Variables
- `DATABASE_URL` - Set via Neon integration (automatic)
- `BETTER_AUTH_SECRET` - Generate and set manually

### 3. Run Development Server
```bash
pnpm dev
```
Visit `http://localhost:3000`

### 4. Create Admin Account
1. Go to `/sign-up`
2. Enter email, name, and password (min 8 chars)
3. Click "Create Account"
4. Access admin dashboard at `/admin`

### 5. Add Your First Property
1. Navigate to `/admin/properties`
2. Click "Add Property"
3. Fill in property details:
   - Name: Property title
   - Location: City/Area
   - Price: In INR
   - Size: e.g., "2500 sq.ft"
   - Type: Villa, Apartment, Plot, etc.
   - Status: Available, Sold, Rented, Under Construction
   - Description: Property details
   - Image URL: Direct link to property image
4. Click "Add Property"
5. View on public page at `/properties`

## Database Schema

### Better Auth Tables (Automatic)
- **user** - Admin user accounts
- **session** - User sessions
- **account** - OAuth provider data
- **verification** - Email verification tokens

### Application Tables
```sql
CREATE TABLE property (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  price BIGINT NOT NULL,
  size TEXT NOT NULL,
  type TEXT NOT NULL,
  description TEXT,
  imageUrl TEXT,
  status TEXT DEFAULT 'available',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  userId TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE
);
```

## Admin Routes

| Route | Purpose |
|-------|---------|
| `/` | Public home page |
| `/properties` | Browse all properties |
| `/sign-in` | Admin login |
| `/sign-up` | Admin registration |
| `/admin` | Admin dashboard |
| `/admin/properties` | Manage properties (CRUD) |

## Deployment to Vercel

### Steps
1. Push code to GitHub
2. Connect repository to Vercel
3. Vercel automatically configures:
   - Database URL from Neon
   - Builds and deploys
4. Set `BETTER_AUTH_SECRET` in Vercel environment variables
5. Deploy!

### Verify
- Visit your production URL
- Test admin login at `/sign-in`
- Create a test property
- View at `/properties`

## Security Features

- ✅ Email + password authentication
- ✅ Password hashing with bcrypt
- ✅ Secure session management
- ✅ User scoping (admins only see their properties)
- ✅ CSRF protection
- ✅ SQL injection prevention with parameterized queries
- ✅ Input validation and sanitization

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Support & Documentation

- **Detailed Setup**: See `SETUP_GUIDE.md`
- **Troubleshooting**: See `SETUP_GUIDE.md` Troubleshooting section
- **Neon Docs**: https://neon.tech/docs
- **Drizzle ORM**: https://orm.drizzle.team
- **Better Auth**: https://www.better-auth.com
- **Next.js**: https://nextjs.org/docs

## License

Built with v0 by Vercel. All rights reserved © 2026 Shaiks Real Estate.
