import { AiOutlineShopping } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import "./nav.scss";
import logo from "./icon-adidas-logo.svg";

const Nav = ({ categories, cart, setOpenCart }) => {
  const totalItems = cart.reduce((a, c) => a + c.qty, 0);

  return (
    <div className="nav">
      <div className="nav__left">
        <div className="nav__left--logo">
          <NavLink to="/shop/all">
            <img src={logo} alt="" />
          </NavLink>
        </div>
        <div className="nav__left--links">
          {categories?.map((i) => (
            <NavLink
              className="nav__left--item"
              key={i}
              to={"/shop/" + i.slice(0, 5)}
            >
              {i}
            </NavLink>
          ))}
        </div>
      </div>
      <div className="nav__right">
        <div onClick={() => setOpenCart(false)} className="nav__right--wrapper">
          <AiOutlineShopping className="nav__right--cart" />
          <span>{totalItems}</span>
        </div>
      </div>
    </div>
  );
};

export default Nav;
