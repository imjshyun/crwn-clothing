import { createSelector } from 'reselect';
/* 
// 배열안에 objs 있었을때 사용됨
const COLLECTION_ID_MAP = {
  hats: 1,
  sneakers: 2,
  jackets: 3,
  womens: 4,
  mens: 5,
}; */

const selectShop = (state) => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);

export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  (collections) => Object.keys(collections).map((key) => collections[key]) // 객체를 다시 배열로
);

export const selectCollection = (collectionUrlParam) =>
  createSelector(
    [selectCollections],
    (collections) =>
      /* 
      // 배열안에 objs 있었을때
      collections.find(
        (collection) => collection.id === COLLECTION_ID_MAP[collectionUrlParam]
      ) */
      collections[collectionUrlParam] // obj 안에 objs 있을때. collectionUrlParam은 'Hats' 같은 ojb의 key값
  );
