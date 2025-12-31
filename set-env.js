const fs = require('fs');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const targetPath = `./src/assets/config.json`;

// Config file content
const configContent = JSON.stringify({
  clientId: process.env.CLIENT_ID || ''
}, null, 2);

console.log('Generating runtime configuration file...');

fs.writeFile(targetPath, configContent, function (err) {
  if (err) {
    console.error(err);
  }
  console.log(`Output generated at ${targetPath}`);
});
