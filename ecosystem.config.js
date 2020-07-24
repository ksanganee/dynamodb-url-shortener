module.exports = {
  apps : [{
   "name": "URL-SHORTENER",
    script: 'server.js',
   "env": {
      "PORT": "8080",
      "URLBASE": "sanganee.me",
      "AWS_ACCESS_KEY_ID": "AKIAI6FKZ3TZTWTDB5JQ",
      "AWS_SECRET_ACCESS_KEY": "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"
   }
    watch: '.'
  }, {
    script: './service-worker/',
    watch: ['./service-worker']
  }],

  deploy : {
    production : {
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
