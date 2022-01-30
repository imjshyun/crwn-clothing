import { connect } from 'react-redux';

import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss';

const CartIcon = ({ toggleCartHidden, itemCount }) => (
  <div className='cart-icon' onClick={toggleCartHidden} >
    <ShoppingIcon className='shopping-icon' />
    <span className='item-count'>{itemCount}</span>
  </div>
);



const mapDispatchToProps = dispatch => ({
  toggleCartHidden: () => dispatch(toggleCartHidden())
});

/* 
// 문제점: 카트와 상관없는 state가 바뀌면 이 컴퍼넌트도 다시 호출된다. 죽, 이 함수도 계속 실행된다. reselect로 해결
// memoization = caching. cartItem이 바뀌지 않을때 불필요한 함수 실행을 피하게 해준다.
// mapStateToProps안의 코드를 따로 빼준다
const mapStateToProps = ({ cart: { cartItems }}) => ({
  itemCount: cartItems.reduce(
    (accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity, 0) 
}) */
const mapStateToProps = (state) => ({
  itemCount: selectCartItemsCount(state) // 이제 cart-icon 컴퍼넌트는 관련없는 state가 업데이트되도 re-render되지 않는다
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartIcon)
