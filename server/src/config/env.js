import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  PORT: z.coerce.number().default(8000),
  MONGODB_URI: z.string().min(1),
  CLIENT_URL: z.url(),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  console.error("Invalid environment variables", result.error.flatten());
  process.exit(1);
}

export const env = result.data;
