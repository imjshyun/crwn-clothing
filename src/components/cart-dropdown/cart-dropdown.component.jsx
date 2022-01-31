import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// import { withRouter } from '../../utils/with-router.hook'; // class 컴퍼넌트일때 custom withrouter를 사용
import { useNavigate } from 'react-router-dom';

import CustomButton from './../custom-button/custom-button.component';
import CartItem from './../cart-item/cart-item.component';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from './../../redux/cart/cart.actions';

import './cart-dropdown.styles.scss';

const CartDropdown = ({ cartItems, history, toggleCartHidden }) => {
  const navigate = useNavigate();

  return (
    <div className='cart-dropdown'>
      <div className='cart-items'>
        {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} item={cartItem} />
          ))
        ) : (
          <span className='empty-message'>Your cart is empty</span>
        )}
      </div>
      {/* <CustomButton onClick={() => history.push('/checkout')}>GO TO CHECKOUT</CustomButton> */}
      <CustomButton
        onClick={() => {
          navigate('/checkout');
          toggleCartHidden();
        }}
      >
        GO TO CHECKOUT
      </CustomButton>
    </div>
  );
};

/* 
// 문제점: 카트와 상관없는 state가 바뀌면 이 컴퍼넌트도 다시 호출된다. 죽, 이 함수도 계속 실행된다. reselect로 해결
// memoization = caching. cartItem이 바뀌지 않을때 불필요한 함수 실행을 피하게 해준다.
// mapStateToProps안의 코드를 따로 빼준다
const mapStateToProps = ({ cart: { cartItems }}) => ({
  cartItems
}) */
/* const mapStateToProps = (state) => ({
  cartItems: selectCartItems(state) // 이제 cart dropdown 컴퍼넌트는 관련없는 state가 업데이트되도 re-render되지 않는다
}) */
const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems, // createStructuredSelector를 사용해 코드를 더 줄여주었다
});

// export default withRouter(connect(mapStateToProps)(CartDropdown)); // class 컴퍼넌트일때 custom withrouter를 사용
export default connect(mapStateToProps, { toggleCartHidden })(CartDropdown); // toggleCartHidden을 여기서 안넣고 컴퍼넌트 함수에 전달되는 dispatch를 사용해도 된다 dispatch(toggleCartHidden()) 이렇게
