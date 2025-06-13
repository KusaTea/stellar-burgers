import { getIngredients } from "../api/ingredients";
import { getUser } from "../api/user";
import { orderBurger } from "../api/order";


const ingredientBun = '[data-test-ingredient="bun"]:first-of-type';
const ingredientSauce = '[data-test-ingredient="sauce"]:first-of-type';
const ingredientMain = '[data-test-ingredient="main"]:first-of-type';

const constructorTopBun = '[data-test-constructor-ingredient="bun (top)"]';
const constructorSauce = '[data-test-constructor-ingredient="sauce"]';
const constructorMain = '[data-test-constructor-ingredient="main"]';
const constructorBottomBun = '[data-test-constructor-ingredient="bun (bottom)"]';

const modalCloseButton = '[data-test-modal="closeButton"]'

const constructorBottom = '[data-test-constructor="bottom"]';

const modal = '#modals';

describe('burger constructor tests', () => {
    beforeEach(() => {
        getIngredients();
        cy.visit('/');
    });

    it('add ingredients to constructor', () => {
        // Проверяем, что были добавлены все ингредиенты
        cy.get('[data-test-ingredient]').should('have.length', 9);
        // Добавляем ингридиенты в конструктор
        cy.get(ingredientBun).contains('Добавить').click();
        cy.get(ingredientSauce).contains('Добавить').click();
        cy.get(ingredientMain).contains('Добавить').click();
        
        cy.fixture('ingredients.json').then((ingredients) => {
            // Сравниваем выбранные ингредиенты с имеющимися в конструкторе
            cy.get('[data-test-constructor-ingredient]').should('have.length', 4);
            cy.get(constructorTopBun).invoke('text').should('include', ingredients.data[0].name)
            cy.get(constructorBottomBun).invoke('text').should('include', ingredients.data[0].name)
            cy.get(constructorSauce).invoke('text').should('include', ingredients.data[3].name)
            cy.get(constructorMain).invoke('text').should('include', ingredients.data[6].name)
        });
    });
});

describe("modal windows", () => {
    beforeEach(() => {
        getIngredients();
        cy.visit('/');
        cy.get(modal).as('modal');

        cy.get('@modal').should('be.empty');
        cy.get(ingredientBun).click();
        cy.get('@modal').should('not.be.empty');
    });

    it('open modal window', () => {
        // Проверяем, что в модальное окно поместилась нужная информация
        cy.fixture("ingredients.json").then((ingredients) => {
            cy.get('@modal').find('[data-test-ingredient-details="title"]').invoke('text').should('eq', ingredients.data[0].name);
        });
    });

    it('close modal window by button', () => {
        // Находим крестик и нажимаем на него
        cy.get('@modal').find(modalCloseButton).click();
        // Проверяем, что в модальное окно закрылось и все данные удалились
        cy.get('@modal').should('be.empty');
    })

    it('close modal window by escape', () => {
        // Нажимаем escape на body, так как нельзя нажать на клавишу без элемента
        cy.get('body').type('{esc}');
        // Проверяем, что в модальное окно закрылось и все данные удалились
        cy.get('@modal').should('be.empty');
    })

    it('close modal window by click out of the window', () => {
        // Кликаем вне модального окна
        cy.get('body').click(0, 0);
        // Проверяем, что в модальное окно закрылось и все данные удалились
        cy.get('@modal').should('be.empty');
    })
});

describe('order making process', () => {
    beforeEach(() => {
        getIngredients();
        getUser();
        orderBurger();
        cy.setCookie('accessToken', 'TEST_ACCESS_TOKEN');
        localStorage.setItem('refreshToken', 'TEST_REFRESH_TOKEN');
        cy.visit('/');
    });

    afterEach(() => {
        cy.clearCookie('accessToken');
        localStorage.removeItem('refreshToken');
    })

    it('order creation', () => {
        // Проверяем, что кнопка оформления заказа не работает без ингредиентов
        cy.get(modal).as('modal');
        cy.get(constructorBottom).find('button').click();
        cy.get('@modal').should('be.empty');

        // Добавляем ингредиенты
        cy.get(ingredientBun).contains('Добавить').click();
        cy.get(ingredientSauce).contains('Добавить').click();
        cy.get(ingredientMain).contains('Добавить').click();
        
        // Проверяем, что заказ оформляется
        cy.get(constructorBottom).find('button').click();
        cy.fixture("order").then((order) => {
            cy.get('@modal').find('h2').invoke('text').should('be.equal', '3701');
        });

        // Проверяем закрытие
        cy.get('@modal').find(modalCloseButton).click();
        cy.get('@modal').should('be.empty');

        // Проверяем очистку конструктора
        cy.get(constructorTopBun).should('not.exist');
        cy.get(constructorSauce).should('not.exist');
        cy.get(constructorSauce).should('not.exist');
        cy.get(constructorBottomBun).should('not.exist');
    });
});