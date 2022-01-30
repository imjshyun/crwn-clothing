import { Component } from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { onSnapshot } from 'firebase/firestore';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
    };
  }

  unsubscribeFromAuth = null;
  unsub = null;

  componentDidMount() {
    // subscription구독
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth); // this.setState({ currentUser: user });

        this.unsub = onSnapshot(userRef, (docSnap) => {
          this.setState(
            {
              currentUser: {
                id: docSnap.id,
                ...docSnap.data(),
              },
            },
            () => {
              // console.log(this.state); // setState()는 async라 2nd arg로 console을 실행해야 한다
            }
          );

          console.log(this.state);
        });
      } else {
        this.setState({ currentUser: userAuth }); // user가 로긴하지 않았으니 userAuth는 null임
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth(); // unsubscribe구독취소
    this.unsub(); // onSanpshot구독취소
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/shop' element={<ShopPage />} />
          <Route path='/signin' element={<SignInAndSignUpPage />} />
        </Routes>
      </div>
    );
  }
}

export default App;
