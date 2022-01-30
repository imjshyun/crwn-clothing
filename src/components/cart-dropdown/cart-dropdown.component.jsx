import { connect} from 'react-redux'

import CustomButton from './../custom-button/custom-button.component';
import CartItem from './../cart-item/cart-item.component';
import { selectCartItems } from '../../redux/cart/cart.selectors'

import './cart-dropdown.styles.scss'

const CartDropdown = ({cartItems}) => {
  return <div className='cart-dropdown'>
    <div className='cart-items'>
      {cartItems.map(cartItem => (
        <CartItem key={cartItem.id} item={cartItem} />
      ))}
    </div>
    <CustomButton>GO TO CHECKOUT</CustomButton>
  </div>;
};

/* 
// 문제점: 카트와 상관없는 state가 바뀌면 이 컴퍼넌트도 다시 호출된다. 죽, 이 함수도 계속 실행된다. reselect로 해결
// memoization = caching. cartItem이 바뀌지 않을때 불필요한 함수 실행을 피하게 해준다.
// mapStateToProps안의 코드를 따로 빼준다
const mapStateToProps = ({ cart: { cartItems }}) => ({
  cartItems
}) */
const mapStateToProps = (state) => ({
  cartItems: selectCartItems(state) // 이제 cart dropdown 컴퍼넌트는 관련없는 state가 업데이트되도 re-render되지 않는다
})

export default connect(mapStateToProps)(CartDropdown);
