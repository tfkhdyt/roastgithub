module.exports = {
  apps: [
    {
      name: "roast-github",
      script: "build",
      exec_mode: "cluster",
      instances: "max",
    },
  ],
};
