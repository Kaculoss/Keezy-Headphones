import { useStateContext } from "@/context/StateContext";
import { runFireworks } from "@/lib/utils";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsBagCheckFill } from "react-icons/bs";

const Success = () => {
  const [order, setOrder] = useState();
  const { resetState } = useStateContext();

  useEffect(() => {
    localStorage.clear();
    runFireworks();
  }, []);

  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order!</h2>
        <p className="email-msg">Check your email inbox for the receipt.</p>
        <p className="description">
          If you have any questions, please email
          <a href="mailto:orders@example.com" className="email">
            orders@example.com
          </a>
        </p>
        <Link href="/">
          <button
            type="button"
            width="300px"
            className="btn"
            onClick={resetState}
          >
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
