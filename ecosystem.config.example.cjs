module.exports = {
  apps: [
    {
      name: "roast-github",
      script: "build/index.js",
      exec_mode: "cluster",
      instances: "max",
      env: {
        GEMINI_API_KEY: "your-gemini-api-key",
        GITHUB_TOKEN: "your-github-token",
        ALTCHA_KEY: "your-altcha-key",
      },
      env_production: {
        NODE_ENV: "production",
        GEMINI_API_KEY: "your-gemini-api-key",
        GITHUB_TOKEN: "your-github-token",
        ALTCHA_KEY: "your-altcha-key",
        ORIGIN: "https://your-website.com",
      },
    },
  ],
  deploy: {
    production: {
      key: "/home/username/.ssh/id_ed25519.pub",
      user: "root",
      host: "your-host",
      ref: "origin/master",
      repo: "git@github.com:tfkhdyt/roastgithub.git",
      path: "/root/roastgithub",
      "post-deploy":
        "npx pnpm i && npm run build && pm2 startOrReload ecosystem.config.cjs --env production",
    },
  },
};
