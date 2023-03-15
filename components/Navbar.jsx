import { useStateContext } from "@/context/StateContext";
import Link from "next/link";
import React from "react";
import { AiOutlineShopping } from "react-icons/ai";
import Cart from "./Cart";

const Navbar = () => {
  const { showCart, totalQuantities, setShowCartTrue } = useStateContext();

  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">Keezy Headphones</Link>
      </p>
      <button className="cart-icon" type="button" onClick={setShowCartTrue}>
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>

      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
