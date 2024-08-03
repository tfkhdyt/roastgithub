module.exports = {
  apps: [
    {
      name: "roast-github",
      script: "node_modules/vite/bin/vite.js",
      args: "preview",
      exec_mode: "cluster",
      instances: "max",
    },
  ],
};
