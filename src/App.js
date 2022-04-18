import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Nav, Home, Greet } from "./components";

const App = () => {
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState([]);
  const [openCart, setOpenCart] = useState(false);
  const [data, setData] = useState([]);

  const [route, setRoute] = useState("");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((json) => setCategories(json));
  }, []);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${route}`)
      .then((res) => res.json())
      .then((json) => setData(json));
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                setRoute={setRoute}
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
