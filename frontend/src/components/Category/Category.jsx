import  { useRef } from 'react';
import './Category.css';
import { collections_list } from '../../assets/image'; 

const Category = ({ category, setCategory }) => {
  const collectionRef = useRef(null);

  return (
    <div className="collections" id="collections">
      <h1>Collections</h1>
      <div className="collections-container">
        <div className="collections-list" ref={collectionRef}>
          {collections_list.map((item, index) => (
            <div
              key={index}
              className={`collections-list-item ${
                category === item.category_name ? 'active' : ''
              }`}
              onClick={() =>
                setCategory(prev => (prev === item.category_name ? 'All' : item.category_name))
              }
            >
              <img src={item.category_image} alt={item.category_name} />
              <p>{item.category_name}</p>
            </div>
          ))}
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Category;
