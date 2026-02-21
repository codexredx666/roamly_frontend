# Clerk Authentication Setup Guide

## Quick Fix for "Publishable key not valid" Error

The error occurs because the `.env.local` file contains placeholder keys. You need to add your actual Clerk keys.

## Step-by-Step Instructions

### 1. Create a Clerk Account
- Go to [https://clerk.com](https://clerk.com)
- Sign up for a free account (no credit card required for development)

### 2. Create an Application
- After signing in, click "Create Application"
- Choose a name (e.g., "Roamly")
- Select authentication methods (Email, Google, etc.)
- Click "Create"

### 3. Get Your API Keys
- In your Clerk dashboard, go to **"API Keys"** (in the left sidebar)
- You'll see two keys:
  - **Publishable Key** (starts with `pk_test_...`)
  - **Secret Key** (starts with `sk_test_...`)

### 4. Update `.env.local` File

Open `.env.local` in your project root and replace the placeholder values:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_YOUR_ACTUAL_PUBLISHABLE_KEY_HERE
CLERK_SECRET_KEY=sk_test_YOUR_ACTUAL_SECRET_KEY_HERE
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

**Important:**
- Replace `pk_test_YOUR_ACTUAL_PUBLISHABLE_KEY_HERE` with your actual publishable key
- Replace `sk_test_YOUR_ACTUAL_SECRET_KEY_HERE` with your actual secret key
- Keep the `NEXT_PUBLIC_` prefix for the publishable key (required for client-side)
- Do NOT add `NEXT_PUBLIC_` to the secret key (it's server-side only)

### 5. Restart the Development Server

1. Stop the current server (press `Ctrl+C` in the terminal)
2. Start it again:
   ```bash
   npm run dev
   ```

### 6. Verify It Works

- Open http://localhost:3000
- You should see the landing page without errors
- Click "Get Started" to test the sign-up flow

## Troubleshooting

### Still seeing the error?
- Make sure you copied the **entire** key (they're long strings)
- Check for extra spaces or line breaks in `.env.local`
- Ensure the file is named exactly `.env.local` (not `.env` or `.env.local.txt`)
- Restart the dev server after making changes

### Need Help?
- Clerk Documentation: https://clerk.com/docs
- Clerk Discord: https://clerk.com/discord
