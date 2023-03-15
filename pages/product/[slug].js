import { NextSanityImage, Product } from "@/components";
import { useStateContext } from "@/context/StateContext";
import { client } from "@/lib/client";
import React, { useState } from "react";
import {
  AiFillStar,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineStar,
} from "react-icons/ai";

const ProductDetails = ({ product, products }) => {
  const { image, name, price, details } = product;
  const [index, setIndex] = useState(0);
  const { incQty, decQty, qty, onAdd, setShowCartTrue } = useStateContext();

  const handleBuyNow = () => {
    onAdd(product, qty);
    setShowCartTrue();
  };

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <NextSanityImage
              image={image[index]}
              alt={name}
              className="product-detail-image"
            />
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => {
              return (
                <NextSanityImage
                  image={item}
                  alt="image"
                  className={
                    i === index ? "small-image selected-image" : "small-image"
                  }
                  key={i}
                  onMouseEnter={() => setIndex(i)}
                />
              );
            })}
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">GH&#8373; {price}</p>
          <div className="quantity">
            <h3>Quantity: </h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button
              className="add-to-cart"
              type="button"
              onClick={() => onAdd(product, qty)}
            >
              Add to Cart
            </button>
            <button className="buy-now" type="button" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item) => {
              return <Product key={item._id} product={item} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
      slug {
         current
      }
   }`;
  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return { paths, fallback: "blocking" };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productQuery = '*[_type == "product"]';

  const product = await client.fetch(query);
  const products = await client.fetch(productQuery);

  return {
    props: { product, products },
  };
};

export default ProductDetails;
