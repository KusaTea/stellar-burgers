import { describe, test, expect } from '@jest/globals';
import { getIngredients, ingredientsReducer, initialState } from '@slices/ingredientsSlice';

describe('Тестирование ingredientsReducer', () => {
    
    const mockIngredients = [
        {
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
        }
    ];

    test('getIngredients.pending', () => {
        const state = ingredientsReducer(initialState, getIngredients.pending('pending'));

        expect(state.loading).toBeTruthy();
        expect(state.error).toBeNull();
    });

    test('getIngredients.fulfilled', () => {
        const state = ingredientsReducer(initialState, getIngredients.fulfilled(mockIngredients, 'fulfilled'));

        expect(state.loading).toBeFalsy();
        expect(state.error).toBeNull();
        expect(state.data).toEqual(mockIngredients);
    });

    test('getIngredients.rejected', () => {
        const error = 'getIngredients.rejected';

        const state = ingredientsReducer(initialState, getIngredients.rejected(new Error(error), 'rejected'));

        expect(state.loading).toBeFalsy();
        expect(state.error).toEqual(error);
    });
});