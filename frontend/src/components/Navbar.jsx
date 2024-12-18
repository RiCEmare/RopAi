import React from "react";
import { useContext } from "react";
import { GlobalContext } from '../GlobalState';
import logo from "../assets/RopAi_logo.png";

const Navbar = () => {
  const { scrollToSection } = useContext(GlobalContext);

  return (
    <nav>
      <div className="container mx-auto my-8 px-24 flex justify-between items-center">
        <div className="text-xl font-bold">
        <span onClick={() => scrollToSection(0)}>
            <img
              src={logo}
              alt="RopAi"
              className="max-h-16"
            />
          </span>
        </div>
        <ul className="flex space-x-16 text-white font-zain font-regular text-2xl">
          <li>
          <span className="hover:text-green px-3 py-2" onClick={() => scrollToSection(0)}>
              Home
            </span>
          </li>
          <li>
          <span className="hover:text-green px-3 py-2" onClick={() => scrollToSection(1)}>
              Buy Kit
            </span>
          </li>
          <li>
          <span className="hover:text-green px-3 py-2" onClick={() => scrollToSection(2)}>
              Predict
            </span>
          </li>
        </ul>
      </div>
      <hr className="h-0.5 border-t-0 bg-grey opacity-100 mx-20"/>
    </nav>
  );
}

export default Navbar;
