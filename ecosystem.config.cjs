module.exports = {
  apps: [
    {
      name: "roast-github",
      script: "build/index.js",
      exec_mode: "cluster",
      instances: "max",
    },
  ],
};
