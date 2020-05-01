import { createSelector } from 'reselect';

// 필요한 state를 선택
const selectCart = (state) => state.cart;

// 젤 위에 선택된 state에서 cartItems property를 선택
export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

// 젤 위에 선택된 state에서 hidden property를 선택
export const selectCartHidden = createSelector(
  [selectCart],
  (cart) => cart.hidden
);

// 위에 cart state에서 선택된 cartItems을 이용. interate하면서 total quantity를 계산하여 반환.
export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce(
      (accumulatedQuantity, cartItem) =>
        accumulatedQuantity + cartItem.quantity,
      0
    )
);

// 위에 cart state에서 선택된 cartItems을 이용. interate하면서 total price를 계산하여 반환.
export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (accumulatedQuantity, cartItem) =>
      accumulatedQuantity + cartItem.quantity * cartItem.price,
    0
  )
);
