import {
  Routes,
  Route,
  Navigate,
  Outlet,
  useParams,
  useLocation,
} from 'react-router-dom';
import { connect, useSelector } from 'react-redux';

import { selectCollection } from '../../redux/shop/shop.selectors';

import './collection.styles.scss';
import CollectionItem from '../../components/collection-item/collection-item.component';

const CollectionPage = () => {
  const { collectionId } = useParams();
  const collection = useSelector(selectCollection(collectionId));
  const { title, items } = collection;

  return (
    <div className='collection-page'>
      <h2 className='title'>{title}</h2>
      <div className='items'>
        {items.map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

/* 
// react router 6부터 match 가 props으로 전달되지 않으므로 
// collectionId를 아래에서 사용할 수 없으므로 jsx에서 mapStateToProps 대신으로 useSelector 훅을 사용한다. 
// 그러면 connect()를 안해도 state를 가져와 사용 가능하다
const mapStateToProps = () => {
  return { collection: selectCollection() } 
}

export default connect(mapStateToProps)(CollectionPage); */
export default CollectionPage;
