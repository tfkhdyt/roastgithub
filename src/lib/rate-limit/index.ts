import { RateLimiter } from "sveltekit-rate-limiter/server";

export const limiter = new RateLimiter({
  IP: [6, "h"],
  IPUA: [3, "m"],
});
