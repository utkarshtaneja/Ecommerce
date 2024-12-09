import React, { useState, useEffect, useContext } from 'react';
import './Home.css';
import Header from '../../components/Header/Header';
import Category from "../../components/Category/Category";
import Card from "../../components/Card/Card";
import { StoreContext } from '../../context/StoreContext';

const Home = () => {
  const [category, setCategory] = useState('All');
  const [items, setItems] = useState([]);
  const { url } = useContext(StoreContext);

  useEffect(() => {
    fetch(`${url}/api/product/list`)
      .then(response => response.json())
      .then(data => {
        if (data.success && Array.isArray(data.data)) {
          setItems(data.data);  
        } else {
          setItems([]);  
        }
      })
      .catch(() => {
        setItems([]);
      });
  }, [url]);


  const filteredItems = category === 'All' ? items : items.filter(item => item.category === category);

  return (
    <div>
      <Header />
      <div className="categories">
        <Category category={category} setCategory={setCategory} />
      </div>
      <div className="item-list">
        {filteredItems.length === 0 ? (
          <p>No items found in this category</p>
        ) : (
          filteredItems.map(item => (
            <Card
              key={item._id}
              id={item._id}
              name={item.name}
              price={item.price}
              description={item.description}
              longDescription={item.long_description}
              details={item.details}
              imageUrl={item.imageUrl}
              category={item.category}
              ratingStars={item.ratingStars}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
