// playwright.config.js - Configuração Completa e Corrigida
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  // Diretório onde os testes E2E estão localizados
  testDir: './tests',
  
  // Padrão de arquivos de teste E2E
  testMatch: '**/*.e2e.test.js',
  
  // Timeout reduzido para testes mais rápidos
  timeout: 30000,
  expect: {
    timeout: 5000
  },
  
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  
  // Apenas 1 retry no CI para economizar tempo
  retries: process.env.CI ? 1 : 0,
  
  // 2 workers no CI (paralelismo)
  workers: process.env.CI ? 2 : undefined,
  
  reporter: process.env.CI ? 'list' : 'html',
  
  use: {
    baseURL: 'http://localhost:3000',
    
    // Trace apenas em falhas para economizar espaço
    trace: 'retain-on-failure',
    
    // Screenshot apenas em falhas
    screenshot: 'only-on-failure',
    
    // Vídeo apenas em falhas (economiza muito tempo)
    video: 'retain-on-failure',
    
    // Timeout de ações reduzido
    actionTimeout: 10000,
    navigationTimeout: 30000,
  },
  
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        headless: false,
      },
    },
  ],
  
  webServer: {
    command: 'npm start',
    url: 'http://localhost:3000',
    timeout: 60000,
    reuseExistingServer: !process.env.CI,
    stdout: 'ignore',
    stderr: 'pipe',
  },
});