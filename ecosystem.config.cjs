module.exports = {
  apps: [
    {
      name: "roast-github",
      script:
        "ORIGIN='https://roast.tfkhdyt.my.id' node -r dotenv/config build",
      exec_mode: "cluster",
      instances: "max",
    },
  ],
};
