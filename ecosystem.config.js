require('dotenv').config({ path: '.env.deploy' });

const {
  DEPLOY_USER,
  DEPLOY_HOST,
  DEPLOY_PATH,
  DEPLOY_REF = 'origin/main',
} = process.env;

module.exports = {
  apps: [
    {
      name: 'mesto-project-app',
      script: './dist/app.js',
    },
  ],
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: 'https://github.com/aleoreh/nodejs-mesto-project.git',
      path: DEPLOY_PATH,
      'pre-deploy-local': `scp -Cr .env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}`,
      'post-deploy': 'npm i && npm run build && pm2 startOrRestart ecosystem.json --env production',
    },
  },
};
