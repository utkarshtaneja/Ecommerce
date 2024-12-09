import { useState } from "react";
import "./Add.css";
import assets from "../../assets/image";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({ url }) => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    longDescription: "",
    details: "",
    stock: "",
    price: "",
    category: "Laptop",
    color: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("long_description", data.longDescription);
    formData.append("details", data.details);
    formData.append("stock", data.stock);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("color", data.color);
    
    if (image) {
      formData.append("imageUrl", image); 
    }

    try {
      const response = await axios.post(`${url}/api/product/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data.message) {
        // Reset form fields after successful submission
        setData({
          name: "",
          description: "",
          longDescription: "",
          details: "",
          stock: "",
          price: "",
          category: "Laptop",
          color: "",
        });
        setImage(null); // Reset image after submission
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Add Product Error:", error.response ? error.response.data : error.message);
      toast.error(error.response ? error.response.data.message : "Error adding product");
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            id="image"
            hidden
            required
          />
        </div>

        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
            required
          />
        </div>

        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="4"
            placeholder="Write short description"
            required
          />
        </div>

        <div className="add-long-description flex-col">
          <p>Long Description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.longDescription}
            name="longDescription"
            rows="6"
            placeholder="Write detailed description"
            required
          />
        </div>

        <div className="add-category-price-stock flex">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select
              onChange={onChangeHandler}
              value={data.category}
              name="category"
              required
            >
              <option value="Laptop">Laptop</option>
              <option value="Mobile">Mobile</option>
              <option value="Camera">Camera</option>
              <option value="Headphones">Headphones</option>
              <option value="Watches">Watches</option>
              <option value="Mouse">Mouse</option>
              <option value="Microphone">Microphone</option>
              <option value="Speaker">Speaker</option>
              <option value="Monitor">Monitor</option>
            </select>
          </div>

          <div className="add-price flex-col">
            <p>Product Price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name="price"
              placeholder="Rs 60"
              required
            />
          </div>

          <div className="add-stock flex-col">
            <p>Stock</p>
            <input
              onChange={onChangeHandler}
              value={data.stock}
              type="number"
              name="stock"
              placeholder="e.g., 100"
              required
            />
          </div>
        </div>

        <div className="add-color flex-col">
          <p>Color</p>
          <input
            onChange={onChangeHandler}
            value={data.color}
            type="text"
            name="color"
            placeholder="e.g., Black, White"
            required
          />
        </div>

        <div className="add-details flex-col">
          <p>Details</p>
          <textarea
            onChange={onChangeHandler}
            value={data.details}
            name="details"
            rows="4"
            placeholder="Additional details (optional)"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;