# Shaiks Real Estate - Setup Guide

## Overview

This application includes:
- **Public Website**: Property listings and marketing pages
- **Properties Page**: Browse all available properties
- **Admin Dashboard**: Manage properties (Create, Read, Update, Delete)
- **Authentication**: Secure login system for admins
- **Database**: Neon PostgreSQL with Drizzle ORM

## Prerequisites

- Node.js 18+ and pnpm
- Vercel account with Neon integration
- Git

## Initial Setup

### 1. Environment Variables

The following environment variables are already configured through Vercel integrations:

- **DATABASE_URL**: Automatically set by Neon integration
- **BETTER_AUTH_SECRET**: Already configured (authentication secret)

No additional configuration needed for these!

### 2. Database

The database has been automatically set up with the following tables:

#### Better Auth Tables (Required for authentication):
- `user`: Admin user accounts
- `session`: User session management
- `account`: Authentication provider data
- `verification`: Email verification tokens

#### App Tables:
- `property`: Real estate properties managed by admins

All tables are already created in your Neon database.

### 3. Install Dependencies

Dependencies are already installed. If needed, run:

```bash
pnpm install
```

## Running the Application

### Development Server

```bash
pnpm dev
```

The application will start at `http://localhost:3000`

### Production Build

```bash
pnpm build
pnpm start
```

## Accessing the Admin Dashboard

### First Time Setup

1. **Sign Up**: Go to `http://localhost:3000/sign-up`
2. Enter your email and password (min 8 characters)
3. Click "Create Account"
4. You'll be redirected to the admin dashboard

### Subsequent Access

1. Go to `http://localhost:3000/sign-in`
2. Enter your credentials
3. Access the admin dashboard

## Admin Dashboard Features

### Properties Management (`/admin/properties`)

#### Add a New Property

1. Click "Add Property" button
2. Fill in the form:
   - **Property Name**: e.g., "Luxury Villa in Hyderabad"
   - **Location**: e.g., "Hyderabad, Telangana"
   - **Price**: Enter in INR (e.g., 50000000 for 5 Crore)
   - **Size**: e.g., "2500 sq.ft"
   - **Type**: Select from Villa, Apartment, Plot, Farm Land, Commercial
   - **Status**: available, sold, rented, under-construction
   - **Description**: Property details
   - **Image URL**: Direct link to property image
3. Click "Add Property"

#### Edit a Property

1. In the properties table, click the edit icon
2. Modify the desired fields
3. Click "Update Property"

#### Delete a Property

1. In the properties table, click the delete icon
2. Confirm the deletion
3. Property is removed from the system

## Public Properties Page

- **URL**: `/properties`
- Displays all available properties in a beautiful grid
- Shows property name, location, price, type, size, and description
- Filters based on property status

## File Structure

```
app/
  ├── admin/
  │   ├── page.tsx                 # Admin dashboard home
  │   └── properties/
  │       └── page.tsx              # Properties management
  ├── sign-in/
  │   └── page.tsx                  # Admin login
  ├── sign-up/
  │   └── page.tsx                  # Admin registration
  ├── properties/
  │   └── page.tsx                  # Public properties page
  ├── api/auth/[...all]/route.ts    # Auth API endpoints
  ├── actions/
  │   └── properties.ts             # Server actions for CRUD
  └── layout.tsx

components/
  ├── auth-form.tsx                # Login/signup form
  └── admin/
      ├── property-form.tsx        # Add/edit property form
      └── properties-table.tsx     # Properties list table

lib/
  ├── auth.ts                      # Better Auth configuration
  ├── auth-client.ts               # Client-side auth
  └── db/
      ├── index.ts                 # Drizzle client
      └── schema.ts                # Database schema

```

## Database Schema

### property table

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
  status TEXT NOT NULL DEFAULT 'available',
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  userId TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE
);
```

## Security Features

1. **Authentication**: All admin operations require login
2. **User Scoping**: Each admin only sees their own properties
3. **Password Security**: Minimum 8 characters, hashed with bcrypt
4. **Session Management**: Secure session tokens with automatic expiration
5. **CSRF Protection**: Built into Better Auth

## API Endpoints

### Authentication

- `POST /api/auth/sign-up`: Create new admin account
- `POST /api/auth/sign-in`: Login
- `POST /api/auth/sign-out`: Logout
- `GET /api/auth/session`: Get current session

### Properties (Server Actions)

- `getProperties()`: Fetch all properties for current admin
- `getPropertyById(id)`: Fetch specific property
- `createProperty(data)`: Create new property
- `updateProperty(id, data)`: Update existing property
- `deleteProperty(id)`: Delete property
- `getAllPublicProperties()`: Fetch all properties for public display

## Deployment to Vercel

### Steps

1. Push your code to GitHub
2. Connect repository to Vercel
3. Vercel will automatically:
   - Install dependencies
   - Set environment variables from integrations
   - Build the application
   - Deploy

### Verify Deployment

After deployment:
1. Visit your production URL
2. Test admin login at `/sign-in`
3. Create a test property in the admin dashboard
4. View properties on the public `/properties` page

## Troubleshooting

### "Unauthorized" Error

**Issue**: Getting authorization errors when accessing admin pages.

**Solution**:
1. Clear browser cookies
2. Log out and log back in
3. Check that `BETTER_AUTH_SECRET` is set in environment variables

### Database Connection Error

**Issue**: "DATABASE_URL is required" error.

**Solution**:
1. Verify Neon integration is connected
2. Check environment variables in Vercel project settings
3. Restart the dev server

### Properties Not Showing on Public Page

**Issue**: No properties appear on `/properties`.

**Solution**:
1. Verify properties are created in admin dashboard
2. Check that properties have `status: 'available'`
3. Ensure `userId` is correctly set in the database

### Form Submission Errors

**Issue**: Getting errors when adding/editing properties.

**Solution**:
1. Check browser console for detailed error messages
2. Verify all required fields are filled
3. Ensure price is a valid number
4. Check that image URL is valid (if provided)

## Database Backups

Neon automatically provides:
- Daily automated backups
- Point-in-time recovery (24 hours)
- Database branching for testing

Access backup options in your Neon dashboard.

## Performance Tips

1. **Image Optimization**: Use optimized images under 1MB
2. **Database Indexes**: Neon automatically indexes primary keys
3. **Caching**: ISR (Incremental Static Regeneration) is used for property pages
4. **Load Time**: Typical pages load in under 500ms

## Support & Resources

### Documentation
- [Neon Docs](https://neon.tech/docs)
- [Drizzle ORM](https://orm.drizzle.team)
- [Better Auth](https://www.better-auth.com)
- [Next.js](https://nextjs.org/docs)

### Common Issues & Solutions

See the Troubleshooting section above for common problems and solutions.

## Admin Dashboard Routes

| Route | Purpose |
|-------|---------|
| `/` | Public home page |
| `/properties` | Public property listings |
| `/sign-in` | Admin login |
| `/sign-up` | Admin registration |
| `/admin` | Admin dashboard |
| `/admin/properties` | Manage properties (CRUD) |

## Next Steps

1. Create your first admin account at `/sign-up`
2. Add sample properties in the admin dashboard
3. View properties on the public page at `/properties`
4. Customize branding and styling as needed
5. Deploy to production when ready

Enjoy using Shaiks Real Estate Platform!
