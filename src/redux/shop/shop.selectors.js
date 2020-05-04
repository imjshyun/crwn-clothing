import { createSelector } from 'reselect';

// const COLLECTION_ID_MAP = {
//   hats: 1,
//   sneakers: 2,
//   jackets: 3,
//   womens: 4,
//   mens: 5,
// };

const selectShop = (state) => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);

export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  (collections) =>
    collections ? Object.keys(collections).map((key) => collections[key]) : [] // obj의 key값을들 array로 받고 이 어레이를 다시 map하여 key에 매치되는 값들을 포함한 새로운 array를 반환
);

export const selectCollection = (collectionUrlParam) =>
  createSelector([selectCollections], (collections) =>
    // collections.find(
    //   (collection) => collection.id === COLLECTION_ID_MAP[collectionUrlParam]
    // )
    collections ? collections[collectionUrlParam] : null
  );
