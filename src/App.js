import { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { onSnapshot } from 'firebase/firestore';
import { setCurrentUser } from './redux/user/user.action';

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
          <Route path='/' element={<HomePage />} />
          <Route path='/shop' element={<ShopPage />} />
          <Route path='/signin' element={<SignInAndSignUpPage />} />
        </Routes>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToProps)(App);
