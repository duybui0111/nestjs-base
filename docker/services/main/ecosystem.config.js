module.exports = {
  apps: [
    {
      name: 'main',
      script: 'dist/main.js',
      instances: '1',
      exec_mode: 'fork',
    },
  ],
};
