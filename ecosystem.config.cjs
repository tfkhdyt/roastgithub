module.exports = {
  apps: [
    {
      name: "roast-github",
      script: "node -r dotenv/config build",
      exec_mode: "cluster",
      instances: "max",
    },
  ],
};
