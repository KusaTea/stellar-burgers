import { describe, test, expect } from '@jest/globals';
import {
    getOrders,
    getAnOrder,
    sendOrder,
    resetOrderModalData,
    orderReducer
} from '@slices/orderSlice';


describe('orders reducer', () => {
    const initialState = {
        ordersLoading: false,
        anOrderLoading: false,
        orderRequest: false,
        modalData: null,
        error: null,
        data: []
    }

    const mockOrders = [
        {
            _id: "68497687c2f30c001cb2b9b6",
            ingredients: [
                "643d69a5c3f7b9001cfa093d",
                "643d69a5c3f7b9001cfa0949",
                "643d69a5c3f7b9001cfa0943",
                "643d69a5c3f7b9001cfa093d"
            ],
            status: "done",
            name: "Экзо-плантаго space флюоресцентный бургер",
            createdAt: "2025-06-11T12:28:55.210Z",
            updatedAt: "2025-06-11T12:28:55.953Z",
            number: 80955
        }
    ];

    describe('getOrders', () => {
        test('getOrders.pending', () => {
            const state = orderReducer(initialState, getOrders.pending('pending'));

            expect(state.ordersLoading).toBeTruthy();
            expect(state.error).toBeNull();
        });

        test('getOrders.fulfilled', () => {
            const state = orderReducer(initialState, getOrders.fulfilled(mockOrders, 'fulfilled'));

            expect(state.ordersLoading).toBeFalsy();
            expect(state.error).toBeNull();
            expect(state.data).toEqual(mockOrders);
        });

        test('getOrders.rejected', () => {
            const error = 'getOrders.rejected';

            const state = orderReducer(initialState, getOrders.rejected(new Error(error), 'rejected'));

            expect(state.ordersLoading).toBeFalsy();
            expect(state.error).toEqual(error);
        });
    });

    describe('getAnOrder', () => {
        test('getAnOrder.pending', () => {
            const state = orderReducer(initialState, getAnOrder.pending('pending', mockOrders[0].number));

            expect(state.anOrderLoading).toBeTruthy();
        });

        test('getAnOrder.fulfilled', () => {
            const state = orderReducer(
                initialState,
                getAnOrder.fulfilled(
                    mockOrders[0],
                    'fulfilled',
                    mockOrders[0].number
                )
            );

            expect(state.anOrderLoading).toBeFalsy();
            expect(state.modalData).toEqual(mockOrders[0]);
        });

        test('getAnOrder.rejected', () => {
            const error = 'getAnOrder.rejected';

            const state = orderReducer(initialState, getAnOrder.rejected(new Error(error), 'rejected', -1));

            expect(state.anOrderLoading).toBeFalsy();
        });
    });

    describe('sendOrder', () => {
        test('sendOrder.pending', () => {
            const state = orderReducer(initialState, sendOrder.pending('pending', mockOrders[0].ingredients));

            expect(state.orderRequest).toBeTruthy();
        });

        test('sendOrder.fulfilled', () => {
            const state = orderReducer(
                initialState,
                sendOrder.fulfilled(
                    { order: mockOrders[0], name: 'EXAMPLE' },
                    'fulfilled',
                    mockOrders[0].ingredients
                )
            );

            expect(state.orderRequest).toBeFalsy();
            expect(state.modalData).toEqual(mockOrders[0]);
        });

        test('sendOrder.rejected', () => {
            const error = 'sendOrder.rejected';

            const state = orderReducer(initialState, sendOrder.rejected(new Error(error), 'rejected', []));

            expect(state.orderRequest).toBeFalsy();
        });
    });

    test('modal data reset', () => {
        const localInitialState = {
            ordersLoading: true,
            anOrderLoading: true,
            orderRequest: false,
            modalData: mockOrders[0],
            error: null,
            data: []
        };

        const requiredState = {
            ordersLoading: true,
            anOrderLoading: true,
            orderRequest: false,
            modalData: null,
            error: null,
            data: []
        }
    
        const state = orderReducer(localInitialState, resetOrderModalData());
    
        expect(state).toEqual(requiredState);
    });
});