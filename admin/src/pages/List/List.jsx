import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({ url }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/product/list`); 

      if (response.status === 200 && response.data.success) {
        setList(response.data.data);
      } else {
        toast.error(response.data.message || "Error fetching product list.");
      }
    } catch (error) {
      console.error("Error fetching product list:", error);
      toast.error("Error fetching product list.");
    }
  };

  const removeProduct = async (productId) => {
    try {
      const response = await axios.post(`${url}/api/product/remove`, { id: productId }); 

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList(); 
      } else {
        toast.error(response.data.message || "Failed to delete product.");
      }
    } catch (error) {
      console.error("Error removing product:", error);
      toast.error(error.response?.data?.message || "Error removing product.");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='list add flex-col'>
      <p>All Products List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {Array.isArray(list) && list.map((item, index) => (
          <div key={index} className="list-table-format">
            <img src={`${url}/` + item.imageUrl} alt='' />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>Rs. {item.price}</p>
            <i onClick={() => removeProduct(item._id)} className='fa-solid fa-xmark'></i>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
