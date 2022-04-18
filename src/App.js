import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Nav, Home, Greet } from "./components";
const App = () => {
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState([]);
  const [openCart, setOpenCart] = useState(false);

  fetch("https://fakestoreapi.com/products/categories")
    .then((res) => res.json())
    .then((json) => setCategories(json));

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
