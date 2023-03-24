import Link from "next/link";
import React from "react";
import { NextSanityImage } from ".";

const Product = ({ product: { image, name, slug, price } }) => {
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <NextSanityImage
            image={image && image[0]}
            alt="product-image"
            className="product-image"
            style={{ width: "200px", height: "200px" }}
          />
          <p className="product-name">{name}</p>
          <p className="product-price">GH&#8373; {price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
