// // playwright.config.js

// const { defineConfig, devices } = require('@playwright/test');
// const fs = require('fs');
// const path = require('path');

// // ==========================================
// // LOAD .ENV FILE FROM PROJECT ROOT
// // ==========================================

// function loadEnv() {
//     try {
//         // Get the project root directory
//         const projectRoot = path.resolve(__dirname);
//         const envPath = path.join(projectRoot, '.env');
        
//         console.log(`Looking for .env at: ${envPath}`);
        
//         // Check if .env exists
//         if (!fs.existsSync(envPath)) {
//             console.log('.env file not found at:', envPath);
//             console.log('Please create a .env file with your credentials');
//             return;
//         }

//         // Read and parse .env
//         const envContent = fs.readFileSync(envPath, 'utf8');
//         const lines = envContent.split('\n');
        
//         let loadedCount = 0;
//         for (const line of lines) {
//             const trimmed = line.trim();
            
//             // Skip comments and empty lines
//             if (trimmed.startsWith('#') || trimmed === '') {
//                 continue;
//             }

//             const equalsIndex = trimmed.indexOf('=');
//             if (equalsIndex === -1) continue;

//             const key = trimmed.substring(0, equalsIndex).trim();
//             let value = trimmed.substring(equalsIndex + 1).trim();

//             // Remove quotes if present
//             if ((value.startsWith('"') && value.endsWith('"')) || 
//                 (value.startsWith("'") && value.endsWith("'"))) {
//                 value = value.substring(1, value.length - 1);
//             }

//             // Set environment variable if not already set
//             if (key && value) {
//                 process.env[key] = value;
//                 loadedCount++;
//             }
//         }

//         console.log(`Loaded ${loadedCount} environment variables from .env`);
//         console.log('='.repeat(60));
//         console.log('ENVIRONMENT VARIABLES:');
//         console.log(`COMPANY_PORTAL_URL: ${process.env.COMPANY_PORTAL_URL || 'NOT SET'}`);
//         console.log(`COMPANY_ADMIN_EMAIL: ${process.env.COMPANY_ADMIN_EMAIL || 'NOT SET'}`);
//         console.log(`COMPANY_ADMIN_PASSWORD: ${process.env.COMPANY_ADMIN_PASSWORD ? '***' : 'NOT SET'}`);
//         console.log('='.repeat(60));
        
//     } catch (error) {
//         console.warn('Error loading .env:', error.message);
//     }
// }

// // Load .env file
// loadEnv();

// // ==========================================
// // PLAYWRIGHT CONFIGURATION
// // ==========================================

// module.exports = defineConfig({
//     testDir: './tests',
//     timeout: parseInt(process.env.DEFAULT_TIMEOUT) || 60000,
//     fullyParallel: true,
//     retries: 1,
//     workers: parseInt(process.env.WORKERS) || 4,
    
//     projects: [
//         {
//             name: 'chromium',
//             use: { ...devices['Desktop Chrome'] },
//         },
//         {
//             name: 'firefox',
//             use: { ...devices['Desktop Firefox'] },
//         },
//     ],
    
//     use: {
//         baseURL: process.env.COMPANY_PORTAL_URL || 'https://portal.mockwin.ai',
//         headless: process.env.HEADLESS === 'true',
        
//         launchOptions: {
//             slowMo: parseInt(process.env.SLOW_MO) || 0,
//         },
        
//         actionTimeout: 15000,
//         navigationTimeout: 30000,
        
//         screenshot: 'only-on-failure',
//         video: 'retain-on-failure',
//         trace: 'retain-on-failure',
//     },
    
//     reporter: [
//         ['html', { outputFolder: 'reports/html' }],
//         ['json', { outputFile: 'reports/test-results.json' }],
//         ['list']
//     ],
    
//     outputDir: 'reports/test-output/',
// });





///////////////////////////////////////////////////////////////////////////////////////




// playwright.config.js

const { defineConfig, devices } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

function loadEnv() {
    try {
        const projectRoot = path.resolve(__dirname);
        const envPath = path.join(projectRoot, '.env');
        
        console.log(`Looking for .env at: ${envPath}`);
        
        if (!fs.existsSync(envPath)) {
            console.log('.env file not found at:', envPath);
            console.log('Please create a .env file with your credentials');
            return;
        }

        const envContent = fs.readFileSync(envPath, 'utf8');
        const lines = envContent.split('\n');
        
        let loadedCount = 0;
        for (const line of lines) {
            const trimmed = line.trim();
            
            if (trimmed.startsWith('#') || trimmed === '') {
                continue;
            }

            const equalsIndex = trimmed.indexOf('=');
            if (equalsIndex === -1) continue;

            const key = trimmed.substring(0, equalsIndex).trim();
            let value = trimmed.substring(equalsIndex + 1).trim();

            if ((value.startsWith('"') && value.endsWith('"')) || 
                (value.startsWith("'") && value.endsWith("'"))) {
                value = value.substring(1, value.length - 1);
            }

            if (key && value) {
                process.env[key] = value;
                loadedCount++;
            }
        }

        console.log(`Loaded ${loadedCount} environment variables from .env`);
        console.log('='.repeat(60));
        console.log('ENVIRONMENT VARIABLES:');
        console.log(`COMPANY_PORTAL_URL: ${process.env.COMPANY_PORTAL_URL || 'NOT SET'}`);
        console.log(`COMPANY_ADMIN_EMAIL: ${process.env.COMPANY_ADMIN_EMAIL || 'NOT SET'}`);
        console.log(`COMPANY_ADMIN_PASSWORD: ${process.env.COMPANY_ADMIN_PASSWORD ? '***' : 'NOT SET'}`);
        console.log('='.repeat(60));
        
    } catch (error) {
        console.warn('Error loading .env:', error.message);
    }
}

loadEnv();

module.exports = defineConfig({
    testDir: './tests',
    timeout: parseInt(process.env.DEFAULT_TIMEOUT) || 60000,
    fullyParallel: true,
    retries: 1,
    workers: parseInt(process.env.WORKERS) || 4,
    
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },
    ],
    
    use: {
        baseURL: process.env.COMPANY_PORTAL_URL || 'https://portal.mockwin.ai',
        headless: process.env.HEADLESS === 'true',
        
        launchOptions: {
            slowMo: parseInt(process.env.SLOW_MO) || 0,
        },
        
        actionTimeout: 15000,
        navigationTimeout: 30000,
        
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
    },
    
    reporter: [
        ['html', { outputFolder: 'reports/html' }],
        ['json', { outputFile: 'reports/test-results.json' }],
        ['list']
    ],
    
    outputDir: 'reports/test-output/',
});