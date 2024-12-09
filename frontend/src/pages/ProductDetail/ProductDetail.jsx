import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart, removeFromCart, cartItems, url } = useContext(StoreContext);

  const [zoomed, setZoomed] = useState(false);
  const [transformOrigin, setTransformOrigin] = useState("center center");

  const handleZoomToggle = () => {
    setZoomed(!zoomed);
  };

  const handleMouseMove = (e) => {
    if (!zoomed) return;
    const rect = e.target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setTransformOrigin(`${x}% ${y}%`);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${url}/api/product/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProduct({
          ...data,
          price: data.price,
          stock: data.stock,
          imageUrl: `${url}/${data.imageUrl.replace("\\", "/")}`,
        });
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <p>Loading product details...</p>;
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  const cartKey = product._id;

  return (
    <div className="product-details-page">
      <div className="product-details-container">
        <div
          className="image-container zoom-container"
          onClick={handleZoomToggle}
          onMouseMove={handleMouseMove}
        >
          <img
            src={product.imageUrl}
            alt={product.name}
            className={`product-image ${zoomed ? "zoomed-in" : ""}`}
            style={{ transformOrigin }}
          />
        </div>

        <div className="info-container">
          <h2 className="product-name">{product.name}</h2>
          <p className="product-description">{product.description}</p>

          <h4 className="product-price">₹ {product.price}</h4>

          <div className="product-long-description">
            <h4>About</h4>
            <p>{product.long_description}</p>
          </div>

          <div className="product-specs">
          <h4>Details</h4>
          {product.details.split(",").map((detail, index) => (
            <p key={index}>{detail.trim()}</p>
          ))}
        </div>


          <div className="product-buttons">
            {cartItems[cartKey] ? (
              <div className="cart-item-counter">
                <button
                  className="minus"
                  onClick={() => removeFromCart(product._id)}
                >
                  -
                </button>
                <span>{cartItems[cartKey]}</span>
                <button
                  className="plus"
                  onClick={() => addToCart(product._id)}
                >
                  +
                </button>
              </div>
            ) : (
              <button
                className="add-to-cart"
                onClick={() => addToCart(product._id)}
                disabled={product.stock === "0"}
              >
                {product.stock === "0" ? "Out of Stock" : "Add to Cart"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
