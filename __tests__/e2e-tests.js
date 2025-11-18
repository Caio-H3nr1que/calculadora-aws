// calculator.e2e.test.js - Testes End-to-End
// Para executar com Playwright: npx playwright test

const { test, expect } = require('@playwright/test');

test.describe('Calculator E2E Tests', () => {
    test.beforeEach(async ({ page }) => {
        // Navegue para a página da calculadora
        await page.goto('http://localhost:3000'); // Ajuste a URL conforme necessário
    });

    test.describe('Operações Básicas via Interface', () => {
        test('deve realizar soma através de cliques', async ({ page }) => {
            await page.click('text=5');
            await page.click('text=+');
            await page.click('text=3');
            await page.click('text==');

            const display = await page.locator('#display');
            await expect(display).toHaveText('8');
        });

        test('deve realizar subtração através de cliques', async ({ page }) => {
            await page.click('text=9');
            await page.click('text=−');
            await page.click('text=4');
            await page.click('text==');

            const display = await page.locator('#display');
            await expect(display).toHaveText('5');
        });

        test('deve realizar multiplicação através de cliques', async ({ page }) => {
            await page.click('text=6');
            await page.click('text=×');
            await page.click('text=7');
            await page.click('text==');

            const display = await page.locator('#display');
            await expect(display).toHaveText('42');
        });

        test('deve realizar divisão através de cliques', async ({ page }) => {
            await page.click('text=8');
            await page.click('text=÷');
            await page.click('text=2');
            await page.click('text==');

            const display = await page.locator('#display');
            await expect(display).toHaveText('4');
        });
    });

    test.describe('Operações Especiais via Interface', () => {
        test('deve calcular potência através de clique', async ({ page }) => {
            await page.click('text=5');
            await page.click('text=x²');

            const display = await page.locator('#display');
            await expect(display).toHaveText('25');
        });

        test('deve calcular raiz quadrada através de clique', async ({ page }) => {
            await page.click('text=9');
            await page.click('text=√');

            const display = await page.locator('#display');
            await expect(display).toHaveText('3');
        });

        test('deve mostrar erro ao calcular raiz de número negativo', async ({ page }) => {
            await page.click('text=5');
            await page.click('text=−');
            await page.click('text=1');
            await page.click('text=0');
            await page.click('text==');
            await page.click('text=√');

            const display = await page.locator('#display');
            await expect(display).toHaveText('Erro');
        });
    });

    test.describe('Interação com Teclado', () => {
        test('deve aceitar entrada via teclado para soma', async ({ page }) => {
            await page.keyboard.press('5');
            await page.keyboard.press('+');
            await page.keyboard.press('3');
            await page.keyboard.press('Enter');

            const display = await page.locator('#display');
            await expect(display).toHaveText('8');
        });

        test('deve limpar com tecla Escape', async ({ page }) => {
            await page.keyboard.press('5');
            await page.keyboard.press('+');
            await page.keyboard.press('3');
            await page.keyboard.press('Escape');

            const display = await page.locator('#display');
            await expect(display).toHaveText('0');
        });

        test('deve calcular com tecla Enter', async ({ page }) => {
            await page.keyboard.press('7');
            await page.keyboard.press('*');
            await page.keyboard.press('8');
            await page.keyboard.press('Enter');

            const display = await page.locator('#display');
            await expect(display).toHaveText('56');
        });
    });

    test.describe('Operações Complexas', () => {
        test('deve realizar cálculo com números decimais', async ({ page }) => {
            await page.click('text=5');
            await page.click('text=.');
            await page.click('text=5');
            await page.click('text=+');
            await page.click('text=2');
            await page.click('text=.');
            await page.click('text=5');
            await page.click('text==');

            const display = await page.locator('#display');
            await expect(display).toHaveText('8');
        });

        test('deve realizar operações encadeadas', async ({ page }) => {
            // 10 + 5 = 15
            await page.click('text=1');
            await page.click('text=0');
            await page.click('text=+');
            await page.click('text=5');
            await page.click('text==');

            // 15 * 2 = 30
            await page.click('text=×');
            await page.click('text=2');
            await page.click('text==');

            // 30 - 10 = 20
            await page.click('text=−');
            await page.click('text=1');
            await page.click('text=0');
            await page.click('text==');

            const display = await page.locator('#display');
            await expect(display).toHaveText('20');
        });

        test('deve lidar com divisão por zero', async ({ page }) => {
            await page.click('text=5');
            await page.click('text=÷');
            await page.click('text=0');
            await page.click('text==');

            const display = await page.locator('#display');
            await expect(display).toHaveText('Erro');
        });
    });

    test.describe('Comportamento da Interface', () => {
        test('deve mostrar histórico durante operação', async ({ page }) => {
            await page.click('text=5');
            await page.click('text=+');

            const history = await page.locator('#history');
            await expect(history).toHaveText('5+');
        });

        test('deve limpar histórico após cálculo', async ({ page }) => {
            await page.click('text=5');
            await page.click('text=+');
            await page.click('text=3');
            await page.click('text==');

            const history = await page.locator('#history');
            await expect(history).toHaveText('');
        });

        test('deve resetar display após resultado ao digitar novo número', async ({ page }) => {
            await page.click('text=5');
            await page.click('text=+');
            await page.click('text=3');
            await page.click('text==');
            await page.click('text=7');

            const display = await page.locator('#display');
            await expect(display).toHaveText('7');
        });

        test('botão clear deve funcionar corretamente', async ({ page }) => {
            await page.click('text=5');
            await page.click('text=+');
            await page.click('text=3');
            await page.click('text=C');

            const display = await page.locator('#display');
            const history = await page.locator('#history');
            
            await expect(display).toHaveText('0');
            await expect(history).toHaveText('');
        });
    });

    test.describe('Responsividade e Acessibilidade', () => {
        test('deve ser visível em diferentes tamanhos de tela', async ({ page }) => {
            // Desktop
            await page.setViewportSize({ width: 1920, height: 1080 });
            const calculatorDesktop = await page.locator('.calculator');
            await expect(calculatorDesktop).toBeVisible();

            // Tablet
            await page.setViewportSize({ width: 768, height: 1024 });
            await expect(calculatorDesktop).toBeVisible();

            // Mobile
            await page.setViewportSize({ width: 375, height: 667 });
            await expect(calculatorDesktop).toBeVisible();
        });

        test('todos os botões devem ser clicáveis', async ({ page }) => {
            const buttons = await page.locator('button').all();
            
            for (const button of buttons) {
                await expect(button).toBeVisible();
                await expect(button).toBeEnabled();
            }
        });
    });

    test.describe('Casos Extremos', () => {
        test('deve lidar com números grandes', async ({ page }) => {
            await page.click('text=9');
            await page.click('text=9');
            await page.click('text=9');
            await page.click('text=9');
            await page.click('text=9');
            await page.click('text=×');
            await page.click('text=9');
            await page.click('text=9');
            await page.click('text=9');
            await page.click('text=9');
            await page.click('text=9');
            await page.click('text==');

            const display = await page.locator('#display');
            const text = await display.textContent();
            expect(text).not.toBe('Erro');
            expect(text).not.toBe('0');
        });

        test('deve prevenir múltiplos pontos decimais', async ({ page }) => {
            await page.click('text=5');
            await page.click('text=.');
            await page.click('text=3');
            await page.click('text=.');
            await page.click('text=2');

            const display = await page.locator('#display');
            await expect(display).toHaveText('5.32');
        });
    });
});