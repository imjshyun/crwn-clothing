// 카트에 아템 추가할때 중복을 피하기
export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToAdd.id
  );

  // 중복이 존재하면 그 아이템을 찾아 quantity값을 1 추가한 새로운 array를 반환
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === cartItemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  // 중복이 존재하지 않을시 quantity가 1인 새로운 array를 반환하여 항상 react 가 rerender하여 최신 정보를 얻게한다.
  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};
