import { createSelector } from 'reselect';

// 2가지 selector가 있다 ( input/output).

const selectCart = (state) => state.cart; // input selector. state에서 필요한 부분을 가져와. output selector에 사용.

// arg1 - input collection array
// arg2 - selector로 부터 원하는 값을 반환하는 함수. arg로는 arg1 어레이의 selector들에서 반환된 state들. 순서대로.
export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

export const selectCartHidden = createSelector(
  [selectCart],
  (cart) => cart.hidden
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce(
      (accumulatedQuantity, cartItem) =>
        accumulatedQuantity + cartItem.quantity,
      0
    )
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (accumulatedQuantity, cartItem) =>
      accumulatedQuantity + cartItem.quantity * cartItem.price,
    0
  )
);
