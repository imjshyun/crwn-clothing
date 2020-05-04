import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import HomePage from './pages/homepage/HomePage';
import ShopPage from './pages/shop/ShopPage';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/SignInAndSignUpPage';
import CheckoutPage from './pages/checkout/CheckoutPage';

import Header from './components/header/Header';

import {
  auth,
  createUserProfileDocument,
  // addCollectionAndDocuments, // 사용하던 static data를 firestore에 똑같이 만들기 위해 한번만 하는 작업
} from './firebase/firebase.utils';

import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
// import { selectCollectionsForPreview } from './redux/shop/shop.selectors'; // 사용하던 static data를 firestore에 똑같이 만들기 위해 한번만 하는 작업

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userDocRef = await createUserProfileDocument(userAuth); // store user in DB

        userDocRef.onSnapshot((snapShot) => {
          setCurrentUser(
            {
              id: snapShot.id,
              ...snapShot.data(),
            }
            // () => console.log(this.state)
          );
        });
      } else {
        setCurrentUser(userAuth); // userAuth는 null이다.
        // addCollectionAndDocuments(
        //   'collections',
        //   collectionsArray.map(({ title, items }) => ({ title, items }))
        // ); // 사용하던 static data를 firestore에 똑같이 만들기 위해 한번만 하는 작업
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route
            exact
            path='/signin'
            render={(props) =>
              this.props.currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  // collectionsArray: selectCollectionsForPreview, // 사용하던 static data를 firestore에 똑같이 만들기 위해 한번만 하는 작업
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
