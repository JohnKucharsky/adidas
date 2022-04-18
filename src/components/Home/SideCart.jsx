import { useEffect, useRef } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
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
      <div className="sidecart__close">
        <AiOutlineClose onClick={() => ref.current.classList.remove("open")} />
      </div>
      <h2>Cart</h2>
      {cart.map((i, index) => (
        <div key={index} className="sidecart__position">
          <img src={i.image} alt="" />
          <div className="sidecart__position--container">
            <h4>
              {(i.price * i.qty).toString().match(/^-?\d+(?:\.\d{0,2})?/)}$
            </h4>
            <p>{i.title}</p>
            <h5 onClick={() => removeFromCart(i)}>
              <BsFillTrashFill />
            </h5>
            <h4>Qty: {i.qty}</h4>
            <div className="sidecart__position--addrem">
              <IoIosRemoveCircleOutline onClick={() => handleRemove(i)} />
              <IoIosAddCircleOutline onClick={() => handleAdd(i)} />
            </div>
          </div>
        </div>
      ))}
      <div className="sidecart__total">
        <div>
          Total <span>(VAT included)</span>
        </div>
        <div>{itemsPrice.toString().match(/^-?\d+(?:\.\d{0,2})?/)}$</div>
      </div>
    </div>
  );
};

export default SideCart;
