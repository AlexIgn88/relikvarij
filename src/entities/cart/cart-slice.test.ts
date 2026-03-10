import cartReducer, { addToCart, initialState, removeFromCart } from './cart-slice';
import { THUNK_STATUSES } from 'src/store/store-consts';

describe('cart-slice', () => {
  test('should return initial state by default', () => {
    expect(cartReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('addToCart should add new item', () => {
    const product = {
      id: '1',
      name: 'Cheese',
      photo: '',
      createdAt: '',
      price: 10,
      category: { id: 'cat-1', name: 'Test category' },
    };

    const state = cartReducer(undefined, addToCart(product));

    expect(state.items).toHaveLength(1);
    expect(state.items[0]).toMatchObject({
      product: { id: '1' },
      quantity: 1,
    });
  });

  test('addToCart should increment quantity for existing item', () => {
    const product = {
      id: '1',
      name: 'Cheese',
      photo: '',
      createdAt: '',
      price: 10,
      category: { id: 'cat-1', name: 'Test category' },
    };

    const startState = {
      loadItemsStatus: THUNK_STATUSES.DEFAULT,
      items: [{ product, quantity: 1 }],
    };

    const state = cartReducer(startState, addToCart(product));

    expect(state.items[0].quantity).toBe(2);
  });

  test('removeFromCart should remove item by id', () => {
    const product = {
      id: '1',
      name: 'Cheese',
      photo: '',
      createdAt: '',
      price: 10,
      category: { id: 'cat-1', name: 'Test category' },
    };

    const startState = {
      loadItemsStatus: THUNK_STATUSES.DEFAULT,
      items: [{ product, quantity: 1 }],
    };

    const state = cartReducer(startState, removeFromCart('1'));

    expect(state.items).toHaveLength(0);
  });
});
