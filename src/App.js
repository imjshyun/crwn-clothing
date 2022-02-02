import { Component } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { onSnapshot } from 'firebase/firestore';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';
import CollectionPage from './pages/collection/collection.component';

import Header from './components/header/header.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
class App extends Component {
  unsubscribeFromAuth = null;
  unsub = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    // subscription구독
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth); // this.setState({ currentUser: user });

        this.unsub = onSnapshot(userRef, (docSnap) => {
          setCurrentUser({
            id: docSnap.id,
            ...docSnap.data(),
          });
          // console.log(this.state);
        });
      } else {
        setCurrentUser(userAuth); // user가 로긴하지 않았으니 userAuth는 null임
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth(); // unsubscribe구독취소
    // this.unsub(); // onSanpshot구독취소
  }

  render() {
    return (
      <div>
        <Header />
        <Routes>
          <Route index element={<HomePage />} />
          <Route path='/shop' element={<ShopPage />} />
          <Route path='/shop/:collectionId' element={<CollectionPage />} />
          <Route path='/checkout' element={<CheckoutPage />} />
          <Route
            exact
            path='/signin'
            element={
              this.props.currentUser ? (
                <Navigate to='/' />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Routes>
      </div>
    );
  }
}

/* // 문제점: 카트와 상관없는 state가 바뀌면 이 컴퍼넌트도 다시 호출된다. 죽, 이 함수도 계속 실행된다. reselect로 해결
// memoization = caching. cartItem이 바뀌지 않을때 불필요한 함수 실행을 피하게 해준다.
// mapStateToProps안의 코드를 따로 빼준다
const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
}); */
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
