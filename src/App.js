import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Nav, Home, Greet } from "./components";
import { useParams } from "react-router";

const App = () => {
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState([]);
  const [openCart, setOpenCart] = useState(false);
  const [data, setData] = useState([]);
  const params = useParams();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((json) => setCategories(json));
  }, []);

  let route = "";
  switch (params.id) {
    case "elect":
      route = "category/electronics";
      break;
    case "jewel":
      route = "category/jewelery";
      break;
    case "men's":
      route = "category/men's%20clothing";
      break;
    case "women":
      route = "category/women's%20clothing";
      break;
    case "all":
      route = "";
      break;

    default:
      break;
  }

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${route}`)
      .then((res) => res.json())
      .then((json) => setData(json));
  }, [route]);

  return (
    <div>
      <BrowserRouter>
        <Nav cart={cart} setOpenCart={setOpenCart} categories={categories} />
        <Routes>
          <Route path="/" element={<Greet categories={categories} />} />
          <Route
            path="/shop/:id"
            element={
              <Home
                data={data}
                cart={cart}
                setCart={setCart}
                openCart={openCart}
                setOpenCart={setOpenCart}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
