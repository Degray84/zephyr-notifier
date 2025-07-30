import { config } from 'dotenv';

config();

interface Schedule {
  cron: string;
  spread_min: number;
}

const IS_PROD = process.env.NODE_ENV! === 'production';
const BOT_TOKEN = process.env.BOT_TOKEN!;
const CHAT_ID = process.env.CHAT_ID!;
const SITE_ITALY_URL = IS_PROD
  ? process.env.SITE_ITALY_URL!
  : process.env.DEV_SITE_ITALY_URL!;
const SCHEDULES: Schedule[] = process.env.SCHEDULES
  ? JSON.parse(IS_PROD ? process.env.SCHEDULES : process.env.DEV_SCHEDULES!)
  : [];

export { BOT_TOKEN, CHAT_ID, SITE_ITALY_URL, SCHEDULES, IS_PROD };
