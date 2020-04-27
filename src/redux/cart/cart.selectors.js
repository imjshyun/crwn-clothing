import { createSelector } from 'reselect';

// 필요한 state를 선택
const selectCart = (state) => state.cart;

// 위에 선택된 state에서 필요한 것을 선택
export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

// 위에 cart state에서 선택된 cartItems을 이용.
export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce(
      (accumulatedQuantity, cartItem) =>
        accumulatedQuantity + cartItem.quantity,
      0
    )
);
