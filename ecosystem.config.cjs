module.exports = {
  apps: [
    {
      name: "roast-github",
      script: "node -r dotenv/config build/index.js",
      exec_mode: "cluster",
      instances: "max",
    },
  ],
};
