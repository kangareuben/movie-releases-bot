# Movie Releases Bot 🎬🦋

A [Bluesky](https://bsky.app/) bot that posts the most popular movie releasing each day.

Follow it at [@movie-releases.bsky.social](https://bsky.app/profile/movie-releases.bsky.social).

Every morning it asks [The Movie Database (TMDB)](https://www.themoviedb.org/) for movies with a release date of today, picks the most popular one, and posts its title and a short synopsis:

```
Released today: Verity

Lowen Ashleigh is hired by Jeremy Crawford to ghostwrite novels for his bestselling author wife Verity, who is unable to finish following an accident. Lowen gradually uncovers Verity's disturbing truths while residin...

Retrieved via The Movie Database API (themoviedb.org).
```

On days with no releases, the bot skips posting.

## How it works

- [`src/lib/getPostText.ts`](./src/lib/getPostText.ts) queries TMDB's `/discover/movie` endpoint for today's date (UTC), sorted by popularity, and formats the top result. It trims long synopses so the post stays under Bluesky's 300-character limit.
- [`src/lib/bot.ts`](./src/lib/bot.ts) logs in to Bluesky with [`@atproto/api`](https://www.npmjs.com/package/@atproto/api) and publishes the post.
- [`.github/workflows/post.yml`](./.github/workflows/post.yml) runs the bot on a schedule with GitHub Actions, daily at 13:08 UTC.

## Running locally

You'll need [Node.js](https://nodejs.org/) 22 (see [`.nvmrc`](./.nvmrc)), a Bluesky account for the bot, and a TMDB account.

1. Install dependencies:

   ```sh
   npm install
   ```

2. Copy `.env.example` to `.env` and fill it in:

   ```sh
   cp .env.example .env
   ```

   | Variable        | What it is |
   | --------------- | ---------- |
   | `BSKY_HANDLE`   | The bot's Bluesky handle, e.g. `movie-releases.bsky.social` |
   | `BSKY_PASSWORD` | A Bluesky [App Password](https://bsky.app/settings/app-passwords) for the bot account, not the main account password |
   | `TMDB_TOKEN`    | Your TMDB **API Read Access Token** (the long one starting with `eyJ`), from [TMDB API settings](https://www.themoviedb.org/settings/api). The shorter "API Key" won't work. |

3. Build and run:

   ```sh
   npm run build
   npm run dev
   ```

> [!WARNING]
> `npm run dev` posts to Bluesky for real. To preview the post without publishing it, temporarily change the call in [`src/index.ts`](./src/index.ts) to:
>
> ```ts
> const text = await Bot.run(getPostText, { dryRun: true });
> ```

## Deploying

The bot runs entirely on GitHub Actions, so there's no server to maintain.

1. In the repo, go to **Settings → Secrets and variables → Actions** and add three repository secrets: `BSKY_HANDLE`, `BSKY_PASSWORD`, and `TMDB_TOKEN`.
2. Push to `main`. The workflow runs on its cron schedule, and you can also trigger it manually from the **Actions** tab with **Run workflow**.

To change the posting time, edit the `cron` line in [`post.yml`](./.github/workflows/post.yml). Times are in UTC, and [crontab.guru](https://crontab.guru/) is handy for checking them. Scheduled runs often start a few minutes late.

> [!NOTE]
> GitHub automatically disables scheduled workflows after 60 days with no commits to the repo, and emails you first. If the bot goes quiet, check the **Actions** tab and click **Enable workflow**.

## Credits

- This product uses the TMDB API but is not endorsed or certified by TMDB.
- Built from Phil Nash's [bsky-bot](https://github.com/philnash/bsky-bot) template.

## License

[MIT](./LICENSE)
