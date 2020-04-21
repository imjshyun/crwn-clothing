### 제목

- [Udemy][andrei neagoie, yihua zhang] - Complete React Developer in 2020 (w Redux, Hooks, GraphQL)

## 강좌 URI

## GitHub

- https://github.com/ZhangMYihua/lesson-34

## 추가 packages/modules

- npm i axios firebase node-sass react-redux react-router-dom react-stripe-checkout redux redux-logger redux-persist redux-saga redux-thunk reselect styled-components

## 폴더 구조

- components: reusable components
- pages: any page that we're not gonna use more than once

### Features

# 일반

- firebase auth/store
- scss
- redux-logger - store.js에서 process.env.NODE_ENV 값따라 보여주고 말고 참조.
- svg 를 component에서 import하여 사용
  import { ReactComponent as ShoppingIcon } from './shopping-bag.svg';
- img에 hover하면 점점커지는 css transition
- react로 dropdown menu 컴퍼넌트로 실행
- reselect
  // 현재 사용하는 state와 관련되지않은 state가 update되도 전체 state를 update하는 리덕스의 특성은 가끔 performance이슈를 발생한다  
  // 모든 mapStateToProps를 사용하는 컴퍼넌트에서 사용되었다.
  // 해결책으로 Memorization(caching slector's value) - selector가 사용하는 cached value를 저장하고 값이 바뀌지 않을시 컴퍼넌트를 re-render하지 않게한다 - reselect라이브러리 사용한다.
  // 항상 두개 이상의 다른 selectors를 사용하게 해주는 createStructuredSelector를 사용하자. 왜냐면 나중에 언제 또 다른 selector를 추가할 수 있기때문
  // 예1) 한개의 selector 사용: cart-icon.component, cart-dropdown.component and so on
  // 예2) 두개 이상의 다른 selectors 사용: header.component and so on
- UTF-8 Dingbats 에서 심볼 사용 https://www.w3schools.com/charsets/ref_utf_dingbats.asp
- session: localStorage 또는 sessionStorage를 쉽게 사용하게 해주는 redux-persist 이용. - 설정하는거 index.js, store.js, root-reducer.js 참고
- Nested Routing - shop.component 참고
- Data Normalization - 데이터가 array안에 안에 만개의 데이터가 있을때 마지막 데이터가 우리가 찾는거라면 찾는데 넘 오래걸린다. 어레이대신 obj에 데이터를 저장해 주는걸 data normalization이라고 한다. shop.data.js보면 전에는 array였는데 obj로 바꼈다
- Stripe integration (react-stripe-checkout) stripe-button.component와 checkout.component 참조

# 고급

- CSS를 JS로 render: styled-components 모듈/패키지 사용. 이렇게 하면 완전히 isolation된다. component에서 css파일 import하는건 글로벌 scope임. hopempage.component, header.component, custom-button.comopnent(복잡한 케이스) 참조
- redux async actions - user obj는 firebase 통해 asyncronously 얻지만. shop data도 db에 저장해서 async actions으로 조작
- firebase.doc('/users/:userId') 혹은 firestore.collection('/users') 이 두가지 query 종류로 데이터가 있든 말든 항상 referenceObject와 snapshotObject 이 두가지 obj를 얻는다.
  document snapShotObject는 ref.get()로 확인할 수 있다, snapShot에서는 exists와 id 정보를 얻을 수 있고 실제 데이터는 .data()로 JSON obj 형식으로 받을 수 있다.
  collection SnapShotObject에서 docs(QueryDocumentSnapshop임 고로 실제 데이터는 내부에서 .data()실행해야함), empty, size 가 있다
  doc ref은 crud operations 실행할때 사용. set() get() update() delete() - set은 sql에서 테이블에 데이터 row를 하나 더하는것과 같이 collection에 document 하나를 더하는것
  collection ref는 add()
  ref로부터 document.get() 혹은 collection.get()로 snapshot object를 얻는다.(documentRef returns documentSnapshot obj를 collectionRef returns querySnapshot object)
  documentSnapshot에서 exists로 데이터 유무, .data()로 실제 object를 JSON object 형식으로 받는다

  data field 타입들: string, number, boolean, map, array, null, timestamp, geopoint

  collection은 따로 추가 안해도 firebase.collection(이름) 으로 collection reference 만들면 자동 생성된다

  firestore은 batch 메소드는 갖는다. 이것은 만약 리퀘스트를 보내다 중간에 페일할 경우 전체를 페일하게 만들어 이상한 데이터가 생기는 것을 막는것이다.
  이 안에서 한개 이상의 documents를 생성할 수 있다.
  <pre><code>
    const batch = objectsToAdd.forEach((obj) => {
        const newDocRef = collectionRef.doc(); // 새로운 doc reference ojb를 유니크 id와 함께 만든다.
        batch.set(newDocRef, obj) // 하나 이상의 obj를 batch.set()을 이용해 추가. 중간 에러나면 전체 취소 혹은 다 성공. transaction과 비슷
      });
    
    batch.commit(); // 위처럼 한 후 commit()를 사용해 commit하면 promise를 리턴한다.
  </code></pre>

- HOC를 이용해 데이터의 유무에 따라 loading state를 이용해 Spinner 컴퍼넌트를 출력.
  HOC는 여럿 컴퍼넌트에 반복되는 패턴의 로직을 재사용하게 해주는거다.

### JS

- Falsy 값을 갖는 6 types: 0, false, undefined, null, NaN, ""
- Object 안에 objs를 Array 안에 옮기기 - Object.keys(collections).map(key => collections[key])

### Deployment

- Heroku
- create-react-app으로 만든 react application인 경우의 명령어 "heroku create \$APP_NAME --buildpack mars/create-react-app"
- Heroku 사이트 주소 복사해서(https://js-clothing.herokuapp.com/) firebase 'Authentication'에서 Authorized domains에 추가해야 login을 사용할 수 있다.
