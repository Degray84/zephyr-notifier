import { config } from 'dotenv';

config();

interface Schedule {
  cron: string;
  spread_min: number;
}

const BOT_TOKEN = process.env.BOT_TOKEN!;
const CHAT_ID = process.env.CHAT_ID!;
const SITE_ITALY_URL = process.env.SITE_ITALY_URL!;
const SCHEDULES: Schedule[] = process.env.SCHEDULES
  ? JSON.parse(process.env.SCHEDULES)
  : {};

export { BOT_TOKEN, CHAT_ID, SITE_ITALY_URL, SCHEDULES };
