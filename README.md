# Buzzword Bingo for Vercel

A link-based multiplayer bingo app. No Teams integration or SSO is required.

## What it does
- Saves a participant-selected display name and random browser token in first-party cookies.
- Lets room creators select IT, Management, HR, and Marketing word lists.
- Gives every participant 25 random terms drawn from that room’s selected lists.
- Offers Dark, Light, Halloween, and Christmas visual themes saved in a browser cookie.
- Lists all active rooms and lets anyone with a room link join.
- Gives every player a randomized 5x5 board.
- Shows a room-only leaderboard after joining.
- Shows a global leaderboard on the home page for winners in all active rooms.
- Treats rooms as closed exactly 60 minutes after creation.
- Deletes expired rooms and associated players opportunistically on API requests.
- Adds no analytics or application logging.

## Required service
Vercel functions do not share reliable in-memory state, so this project requires PostgreSQL. Connect a Postgres provider from the Vercel Marketplace and expose its connection string as `DATABASE_URL`.

## Deploy
1. Create a Git repository and add these files.
2. Import the repository into Vercel.
3. In the Vercel project, open **Storage / Marketplace**, create or connect a PostgreSQL database, and ensure `DATABASE_URL` is attached to Production, Preview, and Development as needed.
4. Redeploy. The app creates its two tables and indexes automatically on first request.
5. Open the deployment URL and create a room.

No other environment variable is required.

## Local development
1. Use Node.js 20.19 or later.
2. Copy `.env.example` to `.env.local` and set `DATABASE_URL`.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open `http://localhost:3000`.

## Retention and logs
Expired rooms are excluded immediately at the database-query level. Their rows are subsequently deleted during API requests using a cascading foreign key. No custom logs, analytics, or historical leaderboard are implemented. Vercel and the selected database provider may still produce infrastructure, access, security, or billing logs; application code cannot guarantee deletion of provider-managed logs.

## Production notes
- Names are user-entered and not verified identities.
- Anyone who has a room URL can join until expiry.
- The cookie is convenience identity, not authentication.
- For heavier traffic, add rate limiting and move schema migrations to a formal migration step.
