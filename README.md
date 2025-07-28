# zephyr-notifier

A Telegram notification bot written in TypeScript.
Supports flexible scheduling, Docker deployment, and automated versioning.

## Features

- Flexible scheduling using cron expressions (node-cron)
- Telegram notifications
- Docker-ready
- Automatic version and changelog updates via semantic-release

## Environment Variables

| Variable           | Required | Description                                                                                  |
| ------------------ | -------- | -------------------------------------------------------------------------------------------- |
| `TELEGRAM_TOKEN`   | Yes      | Telegram bot token                                                                           |
| `TELEGRAM_CHAT_ID` | Yes      | Target chat ID for notifications                                                             |
| `SCHEDULES`        | Yes      | JSON array of schedule objects. Each object: `{ "cron": "<cron>", "spread_min": <minutes> }` |
| `TZ`               | No       | Timezone for the container (e.g., `Europe/Minsk`). Defaults to UTC if unset                  |
