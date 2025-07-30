<table width="100%">
  <tr>
    <td align="left" width="120">
      <img src="app/favicon.ico" alt="Boardroom FC Logo" width="100" />
    </td>
    <td align="right">
      <h1>Boardroom Football Club</h1>
      <h3 style="margin-top: -10px;">A fully open-source, AI-powered football management sim playable in your browser.</h3>
    </td>
  </tr>
</table>

## Why?

* **Open and Transparent**: Built in the open — no annual cash grabs, no locked-away mechanics.
* **AI-Driven Simulation**: Every manager, player, and club acts with individual goals and motivations.
* **Frustration-Free**: We're addressing years of Football Manager gripes: broken AI, static systems, and corporate bloat.
* **Community First**: Built to be modded, forked, reshaped — whatever the community needs.

## Features (Early)

* Save and user system via Supabase
* SQLite-based game saves stored in Cloudflare buckets
* API-driven architecture connecting save logic to frontend
* Conversation UI system (e.g. job interviews, agent negotiations)
* Transparent contract negotiation system with wage/bonus editing
* Open-source trailer demos in development

## Project Structure

* `app/` – Main Next.js frontend application
* `lib/` – Shared API logic and utilities
* `data/` – SQLite and game save storage utilities
* `api/` – Server routes (in development) to interact with game state
* `public/` – Assets (favicon, etc.)

## Getting Started

1. Fork the repository
2. Clone your fork locally
3. Navigate to the app directory: `cd app`
4. Copy `.env.example` to `.env.local`

```bash
# Unix/Linux/Mac
cp .env.example .env.local

# Windows
copy .env.example .env.local
```

5. Install dependencies:

```bash
npm install  # or bun install, if using bun
```

6. Start the development server:

```bash
npm run dev  # or bun dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Contributing

We’re just getting started. Before contributing, let’s talk!

Boardroom FC is currently built as a solo project, but we’ll need more people to bring it to life. If you're interested in helping build the future of football simulation, reach out first:

👉 [Get Involved](https://www.boardroomfc.com/get-involved)

---

## License

MIT LICENSE

---
