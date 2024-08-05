import { RateLimiter } from "sveltekit-rate-limiter/server";

export const limiter = new RateLimiter({
  IP: [6, "m"],
  IPUA: [3, "m"],
});
