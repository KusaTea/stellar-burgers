import { describe, test, expect } from '@jest/globals';
import { getFeeds, feedReducer } from '@slices';

describe('feed reducer', () => {
    const initialState = {
        data: {
            orders: [],
            total: 0,
            totalToday: 0
        },
        error: null,
        loading: false
    };

    const mockFeeds = {
        success: true,
        orders: [
            {
                "_id": "68497687c2f30c001cb2b9b6",
                "ingredients": [
                    "643d69a5c3f7b9001cfa093d",
                    "643d69a5c3f7b9001cfa0949",
                    "643d69a5c3f7b9001cfa0943",
                    "643d69a5c3f7b9001cfa093d"
                ],
                "status": "done",
                "name": "Экзо-плантаго space флюоресцентный бургер",
                "createdAt": "2025-06-11T12:28:55.210Z",
                "updatedAt": "2025-06-11T12:28:55.953Z",
                "number": 80955
            }
        ],
    total: 1,
    totalToday: 1
    };

    test('getFeeds.pending', () => {
        const state = feedReducer(initialState, getFeeds.pending('pending'));

        expect(state.loading).toBeTruthy();
        expect(state.error).toBeNull();
    });

    test('getFeeds.fulfilled', () => {
        const state = feedReducer(
        initialState,
        getFeeds.fulfilled(mockFeeds, 'fulfilled')
        );

        expect(state.loading).toBeFalsy();
        expect(state.error).toBeNull();
        expect(state.data).toEqual(mockFeeds);
    });

    test('getFeeds.rejected', () => {
        const error = 'getFeeds.rejected';

        const state = feedReducer(
        initialState,
        getFeeds.rejected(new Error(error), 'rejected')
        );

        expect(state.loading).toBeFalsy();
        expect(state.error).toEqual(error);
    });
});