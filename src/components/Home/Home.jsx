import { Rating } from "@mui/material";
import { AiOutlineShopping } from "react-icons/ai";
import "./home.scss";
import { MdAddShoppingCart } from "react-icons/md";
import SideCart from "./SideCart";

const Home = ({ cart, setCart, openCart, setOpenCart, data }) => {
  const handleAdd = (product) => {
    const exist = cart?.find((x) => x.id === product.id);
    if (exist) {
      setCart(
        cart.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };
  const handleRemove = (product) => {
    const exist = cart.find((i) => i.id === product.id);
    if (exist.qty === 1) {
      setCart(cart.filter((i) => i.id !== product.id));
    } else {
      setCart(
        cart.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };
  return (
    <div className="home">
      <div className="home__container">
        <SideCart
          setOpenCart={setOpenCart}
          handleAdd={handleAdd}
          handleRemove={handleRemove}
          openCart={openCart}
          setCart={setCart}
          cart={cart}
        />
        {data?.map((i) => (
          <div key={i.id} className="home__container--item">
            <img src={i.image} alt="" />
            <h5>{i.title}</h5>
            <p>$ {i.price}</p>
            <div className="home__container--cart">
              <Rating name="read-only" value={i.rating.rate} readOnly />
              {cart.find((item) => item.id === i.id) ? (
                <AiOutlineShopping
                  onClick={() => setOpenCart(!openCart)}
                  className="home__container--cartitem"
                />
              ) : (
                <MdAddShoppingCart
                  onClick={() => handleAdd(i)}
                  className="home__container--cartitem"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
