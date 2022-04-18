import React, { useEffect, useRef } from "react";
import {
  IoIosAddCircleOutline,
  IoIosRemoveCircleOutline,
} from "react-icons/io";
import "./sidecart.scss";
const SideCart = ({
  cart,
  openCart,
  setOpenCart,
  setCart,
  handleAdd,
  handleRemove,
}) => {
  const ref = useRef(null);
  let itemsPrice = cart.reduce((a, c) => a + c.price * c.qty, 0);

  useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      if (!ref.current?.contains(e.target)) {
        ref.current.classList.remove("open");
      }
    });
  }, []);
  useEffect(() => {
    if (cart.length > 0 && openCart) {
      ref.current.classList.add("open");
    } else {
      ref.current.classList.remove("open");
      setOpenCart(!openCart);
    }
  }, [openCart, cart, setOpenCart]);
  const removeFromCart = (item) => {
    setCart(cart.filter((x) => x.id !== item.id));
  };
  return (
    <div ref={ref} className="sidecart">
      {cart.map((i, index) => (
        <div key={index} className="sidecart__position">
          <img src={i.image} alt="" />
          <div className="sidecart__position--container">
            <h3>{i.title}</h3>
            <p onClick={() => removeFromCart(i)}>&times;</p>
            <h4>{i.price * i.qty}</h4>
            <h5>{i.qty}</h5>
            <div className="sidecart__position--addrem">
              <IoIosRemoveCircleOutline onClick={() => handleRemove(i)} />
              <IoIosAddCircleOutline onClick={() => handleAdd(i)} />
            </div>
          </div>
        </div>
      ))}
      <h5>{itemsPrice}</h5>
    </div>
  );
};

export default SideCart;
