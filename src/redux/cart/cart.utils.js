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
