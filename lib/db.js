import pg from "pg";
const { Pool } = pg;
const globalForDb = globalThis;
export const pool = globalForDb.__bingoPool || new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : undefined,
  max: 5
});
if (process.env.NODE_ENV !== "production") globalForDb.__bingoPool = pool;
let ready;
export function ensureSchema() {
  if (!ready) ready = pool.query(`
    CREATE TABLE IF NOT EXISTS rooms (
      id UUID PRIMARY KEY,
      name VARCHAR(60) NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      expires_at TIMESTAMPTZ NOT NULL,
      selected_lists JSONB NOT NULL DEFAULT '["IT","Management"]'::jsonb
    );
    CREATE TABLE IF NOT EXISTS players (
      room_id UUID NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
      player_key VARCHAR(64) NOT NULL,
      display_name VARCHAR(40) NOT NULL,
      board JSONB NOT NULL,
      marked JSONB NOT NULL DEFAULT '[]'::jsonb,
      joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      bingo_at TIMESTAMPTZ,
      PRIMARY KEY (room_id, player_key)
    );
    ALTER TABLE rooms ADD COLUMN IF NOT EXISTS selected_lists JSONB NOT NULL DEFAULT '["IT","Management"]'::jsonb;
    CREATE INDEX IF NOT EXISTS rooms_expiry_idx ON rooms(expires_at);
    CREATE INDEX IF NOT EXISTS players_bingo_idx ON players(bingo_at);
  `);
  return ready;
}
export async function cleanup() {
  await ensureSchema();
  await pool.query(`DELETE FROM rooms WHERE expires_at <= NOW()`);
}
