import { createSelector } from 'reselect';

const selectUser = (state) => state.user;
const selectCart = (state) => state.cart; // 아래 복수의 selector를 선택하는 예제를 위해 더해주었다.

export const selectCurrentUser = createSelector(
  [selectUser, selectCart],
  (user, cart) => user.currentUser
);
