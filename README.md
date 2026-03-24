This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## Admin module starter

This project now includes a production-oriented admin foundation for Vercel:

- Auth.js credentials login for `/admin/login`
- Prisma schema for admin users, media assets, and gallery assignments
- Vercel Blob upload action for media files
- Protected admin pages for overview, media, gallery, and delegated admins
- Public gallery components that read database-backed gallery assignments when available and fall back to the current placeholder content when the database is not configured

### Initial setup

1. Create a Postgres database in Vercel and copy the connection string into `DATABASE_URL`.
2. Create a Blob store in Vercel and set `BLOB_READ_WRITE_TOKEN`.
3. Set `AUTH_SECRET`.
4. Run `npm install`.
5. Run `npm run db:generate`.
6. Run `npm run db:push` or your preferred migration flow.
7. Seed the owner account:

```bash
OWNER_EMAIL="owner@example.com" OWNER_PASSWORD="change-me" OWNER_NAME="Site Owner" npm run db:seed-owner
```

8. Start the app and visit `/admin/login`.
