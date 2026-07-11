# Puzl — landing page

Next.js (App Router) landing page for [puzl.no](https://puzl.no).

## Stack

- Next.js 16 (App Router, TypeScript)
- Tailwind CSS v4
- Resend (contact form email)
- Deployed on Vercel

## Development

```bash
npm install
cp .env.example .env.local # fill in RESEND_API_KEY
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

See `.env.example`:

- `RESEND_API_KEY` — API key from [resend.com](https://resend.com)
- `CONTACT_EMAIL` — inbox that receives contact form submissions

## Build

```bash
npm run build
```
