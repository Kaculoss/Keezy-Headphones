import { useStateContext } from "@/context/StateContext";
import Link from "next/link";
import React, { useRef } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import {
  AiOutlineLeft,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineShopping,
} from "react-icons/ai";
import getStripe from "@/lib/getStripe";
import { toast } from "react-hot-toast";
import axios from "axios";
import { NextSanityImage } from ".";

const Cart = () => {
  const cartRef = useRef();
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCartFalse,
    updateCartItemQty,
    removecartItem,
  } = useStateContext();

  const handleCheckout = async () => {
    try {
      const stripe = await getStripe();
      console.log("handleCheckout =>", cartItems);

      const checkoutSession = await axios.post("/api/stripe", {
        cartItems,
      });

      toast.loading("Redirecting...");
      const result = await stripe.redirectToCheckout({
        sessionId: checkoutSession.data.id,
      });

      if (result.error) {
        alert(result.error.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button
          className="cart-heading"
          type="button"
          onClick={setShowCartFalse}
        >
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>

        {cartItems.length < 1 ? (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href="/">
              <button className="btn" type="button" onClick={setShowCartFalse}>
                Continue Shopping
              </button>
            </Link>
          </div>
        ) : (
          <>
            <div className="product-container">
              {cartItems
                .sort((a, b) => {
                  if (a.name !== b.name) {
                    return a.name.localeCompare(b.name);
                  }
                  return a._id.localeCompare(b._id);
                })
                .map((item) => (
                  <div className="product" key={item._id}>
                    <NextSanityImage
                      image={item?.image[0]}
                      alt={item.name}
                      className="cart-product-image"
                    />
                    <div className="item-desc">
                      <div className="flex top">
                        <h5>{item.name}</h5>
                        <h4>GH&#8373; {item.price}</h4>
                      </div>
                      <div className="flex bottom">
                        <div>
                          <p className="quantity-desc">
                            <span
                              className="minus"
                              onClick={() => updateCartItemQty(item._id, "dec")}
                            >
                              <AiOutlineMinus />
                            </span>
                            <span className="num">{item.quantity}</span>
                            <span
                              className="plus"
                              onClick={() => updateCartItemQty(item._id, "inc")}
                            >
                              <AiOutlinePlus />
                            </span>
                          </p>
                        </div>
                        <button
                          className="remove-item"
                          type="button"
                          onClick={() => removecartItem(item._id)}
                        >
                          <TiDeleteOutline />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            <div className="cart-bottom">
              <div className="total">
                <h3>Subtotal:</h3>
                <h3>GH&#8373; {totalPrice}</h3>
              </div>
              <div className="btn-container">
                <button
                  className="btn"
                  type="button"
                  style={{ marginTop: "1rem" }}
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
