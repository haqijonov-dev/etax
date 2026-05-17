module.exports = {
  apps: [
    {
      name: "etax",
      script: ".next/standalone/server.js",
      cwd: "./",
      instances: "max",
      exec_mode: "cluster",
      autorestart: true,
      watch: false,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        HOSTNAME: "0.0.0.0",
      },
    },
  ],
};
