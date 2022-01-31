export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToAdd.id
  ); // 찾으면 item 없으면 undefined

  // 이미 있을경우, 추가하는 아이템 찾아서 quantity 1 증가
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === cartItemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  // 없을경우, 새 아이템에 quantity: 1을 추가하고, 기존 아이템에 추가
  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  ); // 찾으면 item 없으면 undefined

  // 이미 있고 quantity값이 1일경우, 카트에서 제외
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  // 아이템을 돌며 id가 지우려는 아이템과 같을경우 quantity값을 -1 해주고, 다를경우 원래 아이템을 반환해준다
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};
