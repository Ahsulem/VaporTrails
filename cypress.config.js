const { defineConfig } = require('cypress');
const { initPlugin } = require('cypress-plugin-visual-regression-diff/dist/plugins');
const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

// Manually parse .env.local to populate process.env if available
try {
  const envPath = path.resolve(__dirname, '.env.local');
  if (fs.existsSync(envPath)) {
    const envFile = fs.readFileSync(envPath, 'utf-8');
    envFile.split(/\r?\n/).forEach(line => {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let value = match[2] || '';
        // Strip quotes
        if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
        if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
        process.env[key] = value;
      }
    });
  }
} catch (e) {
  console.error('Failed to parse .env.local file', e);
}

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://vapor-trails.vercel.app',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true,
    retries: {
      runMode: 2,
      openMode: 0
    },
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    projectId: 'vaportrails-lab',
    env: {
      SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
      SUPABASE_KEY: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
      TEST_EMAIL: 'testuser@vaportrails.com',
      TEST_PASSWORD: 'TestPass123!',
      INVALID_EMAIL: 'wrong@email.com',
      INVALID_PASSWORD: 'wrongpass'
    },
    setupNodeEvents(on, config) {
      // Register visual regression testing
      initPlugin(on, config);

      // Register tasks
      on('task', {
        readExcel(filePath) {
          const workbook = xlsx.readFile(filePath);
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          return xlsx.utils.sheet_to_json(worksheet);
        },
        log(message) {
          console.log(message);
          return null;
        }
      });

      return config;
    }
  }
});
