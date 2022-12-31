import "./css/ProductCard.css";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="product-card" onClick={handleClick}>
      <header>
        <div className="img-container">
          <img src={product.productImgs[0]} alt="" />
          <img src={product.productImgs[1]} alt="" />
        </div>
      </header>
      <footer>
        <p>{product.title}</p>
        <small>$ {product.price}</small>
      </footer>
    </div>
  );
};

export default ProductCard;
