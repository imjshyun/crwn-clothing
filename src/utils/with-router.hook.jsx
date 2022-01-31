import { useLocation, useNavigate, useParams } from 'react-router-dom';

// nested class 컴퍼넌트에서 history 사용이 필요할때 custom withrouter를 사용. 아니면 훅 (useLocation()/useNavigate()/userParams()) 사용
// <CustomButton onClick={() => history.push('/checkout')}>GO TO CHECKOUT</CustomButton>
// 대신 const navigate = useNavigate();를 지정하고 아래처럼 사용
// <CustomButton onClick={() => navigate('/checkout')}></CustomButton>Go to checkout</CustomButton>
export function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}
