const fs = require('fs');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const targetPath = `./src/environments/environment.ts`;
const targetPathProd = `./src/environments/environment.prod.ts`;

// Environment file content
const envConfigFile = `export const environment = {
  production: false,
  clientId: '${process.env.CLIENT_ID || ''}',
  clientSecret: '${process.env.CLIENT_SECRET || ''}'
};
`;

const envConfigFileProd = `export const environment = {
  production: true,
  clientId: '${process.env.CLIENT_ID || ''}',
  clientSecret: '${process.env.CLIENT_SECRET || ''}'
};
`;

console.log('Generating environment files...');

fs.writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    console.error(err);
  }
  console.log(`Output generated at ${targetPath}`);
});

fs.writeFile(targetPathProd, envConfigFileProd, function (err) {
  if (err) {
    console.error(err);
  }
  console.log(`Output generated at ${targetPathProd}`);
});
