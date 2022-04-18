import greensm from "./greeting/green_small.mp4";
import greenmd from "./greeting/green_middle.mp4";
import greenlg from "./greeting/green_big.mp4";
import shoessm from "./greeting/shoes_small.mp4";
import shoesmd from "./greeting/shoes_middle.mp4";
import shoeslg from "./greeting/shoes_big.mp4";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import "./greet.scss";

const Greet = ({ categories }) => {
  const [breakpoints, setBreakpoints] = useState({
    sm: false,
    md: false,
    lg: false,
  });

  useEffect(() => {
    const width = window.innerWidth;
    if (width < 600) {
      setBreakpoints({ sm: true, md: false, lg: false });
    } else if (width < 1000) {
      setBreakpoints({ sm: false, md: true, lg: false });
    } else {
      setBreakpoints({ sm: false, md: false, lg: true });
    }
    window.addEventListener("resize", () => {
      const width = window.innerWidth;
      if (width < 600) {
        setBreakpoints({ sm: true, md: false, lg: false });
      } else if (width < 1000) {
        setBreakpoints({ sm: false, md: true, lg: false });
      } else {
        setBreakpoints({ sm: false, md: false, lg: true });
      }
    });
  }, []);
  return (
    <div className="greet">
      <div className="greet__top">
        <div className="greet__top--container">
          <h1>SPRING IN YOUR STEP</h1>
          <p>More styles added. 30% off selected items with coded SHOP30</p>
          <div className="greet__top--links">
            {categories?.map((i) => (
              <Link key={i} to={"/shop/" + i.slice(0, 5)}>
                {i}
              </Link>
            ))}
          </div>
        </div>
        {breakpoints.sm && <video autoPlay muted loop src={greensm}></video>}
        {breakpoints.md && <video autoPlay muted loop src={greenmd}></video>}
        {breakpoints.lg && <video autoPlay muted loop src={greenlg}></video>}
      </div>
      <div className="greet__bottom">
        <div className="greet__bottom--container">
          <h1>4DFWD. TAKE IT FORWARD.</h1>
          <p>
            Run with a 3D printed performance midsole, designed to move you
            forward.
          </p>
          <Link to="/shop/all">
            SHOP NOW
            <BsArrowRight />
          </Link>
        </div>
        {breakpoints.sm && <video autoPlay muted loop src={shoessm}></video>}
        {breakpoints.md && <video autoPlay muted loop src={shoesmd}></video>}
        {breakpoints.lg && <video autoPlay muted loop src={shoeslg}></video>}
      </div>
    </div>
  );
};

export default Greet;
