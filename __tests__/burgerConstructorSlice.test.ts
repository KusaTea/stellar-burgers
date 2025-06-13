import { describe, test, expect, beforeEach } from '@jest/globals';
import {
    addIngredient,
    removeIngredient,
    moveIngredientUp,
    moveIngredientDown,
    burgerConstructorReducer,
    TConstructorState,
    initialState
} from '@slices/burgerConstructorSlice';

function getIngredientsWithoutId(ingredients: Object[]): Object[] {
    const newIngredients: Object[] = [];
    ingredients.forEach(ingredient => {
        const newIngredient = {...ingredient} as Record<string, any>;
        delete newIngredient['id'];
        newIngredients.push(newIngredient); 
    });
    return newIngredients;
};

describe('burger constructor reducer', () => {
    
    const bunToAdd = {
            _id: "11",
            name: "black bun",
            type: "bun",
            proteins: 2,
            fat: 1,
            carbohydrates: 3,
            calories: 120,
            price: 12,
            image: "https://code.s3.yandex.net/react/code/bun-02.png",
            image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
            __v: 0
        };
    const ingredientsToAdd = [
        {
            _id: "21",
            name: "bbq",
            type: "sauce",
            proteins: 0,
            fat: 3,
            carbohydrates: 5,
            calories: 117,
            price: 5,
            image: "https://res.cloudinary.com/kraft-heinz-whats-cooking-ca/image/upload/f_auto/q_auto/c_limit,w_3840/f_auto/q_auto/v1/dxp-images/brands/products/00068100078589-chicken--rib-bbq-sauce/marketing-view-color-front_content-hub-10624057_2fe71e9176a4fe916d830bee03a7fbf4?_a=BAVAfVDW0",
            image_large: "https://res.cloudinary.com/kraft-heinz-whats-cooking-ca/image/upload/f_auto/q_auto/c_limit,w_3840/f_auto/q_auto/v1/dxp-images/brands/products/00068100078589-chicken--rib-bbq-sauce/marketing-view-color-front_content-hub-10624057_2fe71e9176a4fe916d830bee03a7fbf4?_a=BAVAfVDW0",
            image_mobile: "https://res.cloudinary.com/kraft-heinz-whats-cooking-ca/image/upload/f_auto/q_auto/c_limit,w_3840/f_auto/q_auto/v1/dxp-images/brands/products/00068100078589-chicken--rib-bbq-sauce/marketing-view-color-front_content-hub-10624057_2fe71e9176a4fe916d830bee03a7fbf4?_a=BAVAfVDW0",
            __v: 0
        },
        {
            _id: "31",
            name: "beef",
            type: "main",
            proteins: 20,
            fat: 10,
            carbohydrates: 5,
            calories: 200,
            price: 18,
            image: "https://voskresnayayarmarka.ru/files/recipes/42.jpg",
            image_large: "https://voskresnayayarmarka.ru/files/recipes/42.jpg",
            image_mobile: "https://voskresnayayarmarka.ru/files/recipes/42.jpg",
            __v: 0
        }
    ];

    const requiredState = {
            bun: bunToAdd,
            ingredients: ingredientsToAdd
        };

    const newState: {state: TConstructorState} = {
        state: initialState
    };

    beforeEach(() => {
        newState.state = burgerConstructorReducer(initialState, addIngredient(bunToAdd));
        newState.state = burgerConstructorReducer(newState.state, addIngredient(ingredientsToAdd[0]));
        newState.state = burgerConstructorReducer(newState.state, addIngredient(ingredientsToAdd[1]));
    })

    test('add ingredients', () => {
        const newBun = {...newState.state.bun} as Record<string, any>;
        delete newBun['id'];
        expect(newBun).toEqual(requiredState.bun);

        const newIngredients: Object[] = getIngredientsWithoutId(newState.state.ingredients);
        expect(newIngredients).toEqual(requiredState.ingredients);
    });

    test('delete ingredients', () => {
        const ingredientId: string = newState.state.ingredients[0].id;
        newState.state = burgerConstructorReducer(newState.state, removeIngredient(ingredientId));

        expect(newState.state.ingredients).toHaveLength(1);
    });

    test('move ingredients', () => {
        newState.state = burgerConstructorReducer(newState.state, moveIngredientUp(1));
        expect(getIngredientsWithoutId(newState.state.ingredients)).toEqual([requiredState.ingredients[1], requiredState.ingredients[0]]);

        newState.state = burgerConstructorReducer(newState.state, moveIngredientDown(0));
        expect(getIngredientsWithoutId(newState.state.ingredients)).toEqual(requiredState.ingredients);
    });
});