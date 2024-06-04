import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    APP_ENV: z.enum(["development", "test", "production"]),
    GOOGLE_API_KEY: z.string(),
    BUCKET_NAME: z.string(),
    AUTH_TOKEN_REQ: z.string(),
    OPENAI_API_KEY: z.string(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_AUTH_TOKEN_REQ: z.string(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    APP_ENV: process.env.APP_ENV,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
    BUCKET_NAME: process.env.BUCKET_NAME,
    AUTH_TOKEN_REQ: process.env.AUTH_TOKEN_REQ,
    NEXT_PUBLIC_AUTH_TOKEN_REQ: process.env.NEXT_PUBLIC_AUTH_TOKEN_REQ,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
