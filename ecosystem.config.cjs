module.exports = {
  apps: [
    {
      name: "roast-github",
      script: "build/index.js",
      node_args: "-r dotenv/config",
      exec_mode: "cluster",
      instances: "max",
    },
  ],
};
