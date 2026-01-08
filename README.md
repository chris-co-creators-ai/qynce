# Qynce - AI Team Platform

Een SaaS platform met 8+ AI-assistenten voor slechts €12/maand.

## Features

- 8 gespecialiseerde AI agents (Order Specialist, Planning Assistent, Offerte Manager, Email Assistent, LinkedIn Creator, Klantenservice Bot, Content Schrijver, Data Analist)
- Credit-based systeem (50 credits/maand, 1 credit per interactie)
- Gebruiksvriendelijk dashboard met kaart-gebaseerde UI
- Authenticatie met NextAuth
- SQLite database met Prisma ORM

## Tech Stack

- **Frontend:** Next.js 14, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes, Prisma
- **Database:** SQLite (development), PostgreSQL ready
- **AI:** OpenAI GPT-4o-mini
- **Auth:** NextAuth.js

## Quick Start

### 1. Installeer dependencies

```bash
cd Qynce
npm install
```

### 2. Configureer environment

Open `.env` en voeg je OpenAI API key toe:

```env
OPENAI_API_KEY="sk-your-openai-api-key-here"
```

### 3. Setup database

```bash
npm run db:push
npm run db:seed
```

Dit maakt de database aan en voegt de 8 AI agents toe, plus een demo account.

### 4. Start development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Demo Account

Na het seeden is er een demo account beschikbaar:

- **Email:** demo@qynce.nl
- **Wachtwoord:** demo123
- **Credits:** 50

## Project Structuur

```
Qynce/
├── prisma/
│   ├── schema.prisma    # Database schema
│   └── seed.ts          # Seed script voor agents
├── src/
│   ├── app/
│   │   ├── api/         # API routes
│   │   ├── auth/        # Login/register pages
│   │   ├── dashboard/   # Dashboard pages
│   │   └── page.tsx     # Homepage
│   ├── components/
│   │   ├── agents/      # Agent components
│   │   ├── dashboard/   # Dashboard components
│   │   └── layout/      # Layout components
│   ├── lib/
│   │   ├── auth.ts      # NextAuth config
│   │   ├── db.ts        # Prisma client
│   │   └── openai.ts    # OpenAI client
│   └── types/           # TypeScript types
├── .env                 # Environment variables
└── package.json
```

## AI Agents

| Agent | Categorie | Beschrijving |
|-------|-----------|--------------|
| Order Specialist | Operations | Beheer en verwerk orders automatisch |
| Planning Assistent | Productivity | Optimaliseer je planning en agenda |
| Offerte Manager | Sales | Maak professionele offertes |
| Email Assistent | Communication | Schrijf perfecte emails |
| LinkedIn Creator | Marketing | Creëer virale LinkedIn posts |
| Klantenservice Bot | Support | Beantwoord klantvragen 24/7 |
| Content Schrijver | Marketing | Genereer blogs en artikelen |
| Data Analist | Analytics | Analyseer data en krijg inzichten |

## API Endpoints

- `POST /api/register` - Nieuwe gebruiker aanmaken
- `POST /api/auth/[...nextauth]` - NextAuth authenticatie
- `GET /api/user` - Huidige gebruiker ophalen
- `GET /api/agents` - Alle agents ophalen
- `POST /api/chat` - Chat met een agent (kost 1 credit)

## Credit Systeem

- Elke nieuwe gebruiker krijgt 50 credits
- Elk bericht naar een agent kost 1 credit
- Credits worden maandelijks vernieuwd (implementatie voor productie)

## Productie

Voor productie:

1. Verander `DATABASE_URL` naar een PostgreSQL URL
2. Genereer een veilige `NEXTAUTH_SECRET`
3. Update `NEXTAUTH_URL` naar je domein
4. Run `npm run build && npm start`

## License

Proprietary - All rights reserved
