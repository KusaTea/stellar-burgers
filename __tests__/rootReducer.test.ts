import { describe, test, expect } from '@jest/globals';
import { rootReducer, store } from '@store';

describe('rootReducer initialisation', () => {
    test('initilise rottReducer with undefined state', () => {
        const initialState = store.getState();
        const newState = rootReducer(undefined, { type: 'UKNOWN_ACTION' });

        expect(newState).toEqual(initialState);
    })
});