// calculator.integration.test.js - Testes de Integração com Jest + JSDOM
// Para executar: npm test

/**
 * ATENÇÃO: Estes testes usam JSDOM que simula um navegador.
 * NÃO substituem testes E2E reais. Use ambos em produção.
 */

// Assumindo que você tem um arquivo HTML ou precisa criar o DOM manualmente
// Você precisará ajustar baseado na sua estrutura real

describe('Calculator Integration Tests', () => {
    let calculator;
    let display;
    let history;
    let buttons;

    beforeEach(() => {
        // Setup do DOM - AJUSTE CONFORME SUA ESTRUTURA REAL
        document.body.innerHTML = `
            <div class="calculator">
                <div id="history"></div>
                <div id="display">0</div>
                <div class="buttons">
                    <button data-action="clear">C</button>
                    <button data-action="square">x²</button>
                    <button data-action="sqrt">√</button>
                    <button data-action="divide">÷</button>
                    
                    <button data-number="7">7</button>
                    <button data-number="8">8</button>
                    <button data-number="9">9</button>
                    <button data-action="multiply">×</button>
                    
                    <button data-number="4">4</button>
                    <button data-number="5">5</button>
                    <button data-number="6">6</button>
                    <button data-action="subtract">−</button>
                    
                    <button data-number="1">1</button>
                    <button data-number="2">2</button>
                    <button data-number="3">3</button>
                    <button data-action="add">+</button>
                    
                    <button data-number="0">0</button>
                    <button data-action="decimal">.</button>
                    <button data-action="equals">=</button>
                </div>
            </div>
        `;

        // Inicialize sua calculadora aqui
        // SUBSTITUA ISSO PELA SUA LÓGICA REAL DE INICIALIZAÇÃO
        // calculator = new Calculator();
        // calculator.init();

        display = document.getElementById('display');
        history = document.getElementById('history');
        buttons = document.querySelectorAll('button');
    });

    afterEach(() => {
        document.body.innerHTML = '';
    });

    // Funções auxiliares para simular interações
    const clickButton = (selector) => {
        const button = document.querySelector(selector);
        if (!button) throw new Error(`Button not found: ${selector}`);
        button.click();
    };

    const clickNumber = (num) => clickButton(`[data-number="${num}"]`);
    const clickAction = (action) => clickButton(`[data-action="${action}"]`);
    
    const typeKeys = (keys) => {
        keys.split('').forEach(key => {
            const event = new KeyboardEvent('keydown', { 
                key, 
                bubbles: true,
                cancelable: true 
            });
            document.dispatchEvent(event);
        });
    };

    describe('Operações Básicas via Interface', () => {
        test('deve realizar soma através de cliques', () => {
            clickNumber('5');
            clickAction('add');
            clickNumber('3');
            clickAction('equals');

            expect(display.textContent).toBe('8');
        });

        test('deve realizar subtração através de cliques', () => {
            clickNumber('9');
            clickAction('subtract');
            clickNumber('4');
            clickAction('equals');

            expect(display.textContent).toBe('5');
        });

        test('deve realizar multiplicação através de cliques', () => {
            clickNumber('6');
            clickAction('multiply');
            clickNumber('7');
            clickAction('equals');

            expect(display.textContent).toBe('42');
        });

        test('deve realizar divisão através de cliques', () => {
            clickNumber('8');
            clickAction('divide');
            clickNumber('2');
            clickAction('equals');

            expect(display.textContent).toBe('4');
        });
    });

    describe('Operações Especiais via Interface', () => {
        test('deve calcular potência através de clique', () => {
            clickNumber('5');
            clickAction('square');

            expect(display.textContent).toBe('25');
        });

        test('deve calcular raiz quadrada através de clique', () => {
            clickNumber('9');
            clickAction('sqrt');

            expect(display.textContent).toBe('3');
        });

        test('deve mostrar erro ao calcular raiz de número negativo', () => {
            clickNumber('5');
            clickAction('subtract');
            clickNumber('1');
            clickNumber('0');
            clickAction('equals');
            clickAction('sqrt');

            expect(display.textContent).toBe('Erro');
        });
    });

    describe('Interação com Teclado', () => {
        test('deve aceitar entrada via teclado para soma', () => {
            typeKeys('5+3');
            
            const enterEvent = new KeyboardEvent('keydown', { 
                key: 'Enter',
                bubbles: true 
            });
            document.dispatchEvent(enterEvent);

            expect(display.textContent).toBe('8');
        });

        test('deve limpar com tecla Escape', () => {
            typeKeys('5+3');
            
            const escapeEvent = new KeyboardEvent('keydown', { 
                key: 'Escape',
                bubbles: true 
            });
            document.dispatchEvent(escapeEvent);

            expect(display.textContent).toBe('0');
        });

        test('deve calcular com tecla Enter', () => {
            typeKeys('7*8');
            
            const enterEvent = new KeyboardEvent('keydown', { 
                key: 'Enter',
                bubbles: true 
            });
            document.dispatchEvent(enterEvent);

            expect(display.textContent).toBe('56');
        });
    });

    describe('Operações Complexas', () => {
        test('deve realizar cálculo com números decimais', () => {
            clickNumber('5');
            clickAction('decimal');
            clickNumber('5');
            clickAction('add');
            clickNumber('2');
            clickAction('decimal');
            clickNumber('5');
            clickAction('equals');

            expect(display.textContent).toBe('8');
        });

        test('deve realizar operações encadeadas', () => {
            // 10 + 5 = 15
            clickNumber('1');
            clickNumber('0');
            clickAction('add');
            clickNumber('5');
            clickAction('equals');

            // 15 * 2 = 30
            clickAction('multiply');
            clickNumber('2');
            clickAction('equals');

            // 30 - 10 = 20
            clickAction('subtract');
            clickNumber('1');
            clickNumber('0');
            clickAction('equals');

            expect(display.textContent).toBe('20');
        });

        test('deve lidar com divisão por zero', () => {
            clickNumber('5');
            clickAction('divide');
            clickNumber('0');
            clickAction('equals');

            expect(display.textContent).toBe('Erro');
        });
    });

    describe('Comportamento da Interface', () => {
        test('deve mostrar histórico durante operação', () => {
            clickNumber('5');
            clickAction('add');

            expect(history.textContent).toBe('5+');
        });

        test('deve limpar histórico após cálculo', () => {
            clickNumber('5');
            clickAction('add');
            clickNumber('3');
            clickAction('equals');

            expect(history.textContent).toBe('');
        });

        test('deve resetar display após resultado ao digitar novo número', () => {
            clickNumber('5');
            clickAction('add');
            clickNumber('3');
            clickAction('equals');
            clickNumber('7');

            expect(display.textContent).toBe('7');
        });

        test('botão clear deve funcionar corretamente', () => {
            clickNumber('5');
            clickAction('add');
            clickNumber('3');
            clickAction('clear');

            expect(display.textContent).toBe('0');
            expect(history.textContent).toBe('');
        });
    });

    describe('Responsividade e Acessibilidade', () => {
        test('calculadora deve estar presente no DOM', () => {
            const calculatorElement = document.querySelector('.calculator');
            expect(calculatorElement).toBeInTheDocument();
        });

        test('todos os botões devem ser clicáveis', () => {
            buttons.forEach(button => {
                expect(button).toBeInTheDocument();
                expect(button).not.toBeDisabled();
            });
        });

        // AVISO: JSDOM não testa responsividade real
        // Teste apenas de presença de elementos
        test('elementos principais devem existir', () => {
            expect(display).toBeInTheDocument();
            expect(history).toBeInTheDocument();
            expect(buttons.length).toBeGreaterThan(0);
        });
    });

    describe('Casos Extremos', () => {
        test('deve lidar com números grandes', () => {
            clickNumber('9');
            clickNumber('9');
            clickNumber('9');
            clickNumber('9');
            clickNumber('9');
            clickAction('multiply');
            clickNumber('9');
            clickNumber('9');
            clickNumber('9');
            clickNumber('9');
            clickNumber('9');
            clickAction('equals');

            const text = display.textContent;
            expect(text).not.toBe('Erro');
            expect(text).not.toBe('0');
            expect(parseFloat(text)).toBeGreaterThan(0);
        });

        test('deve prevenir múltiplos pontos decimais', () => {
            clickNumber('5');
            clickAction('decimal');
            clickNumber('3');
            clickAction('decimal');
            clickNumber('2');

            expect(display.textContent).toBe('5.32');
        });

        test('deve lidar com sequência de operadores', () => {
            clickNumber('5');
            clickAction('add');
            clickAction('multiply'); // Trocar operador
            clickNumber('3');
            clickAction('equals');

            expect(display.textContent).toBe('15');
        });
    });
});