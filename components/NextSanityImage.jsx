import { client } from "@/lib/client";
import { useNextSanityImage } from "next-sanity-image";
import Image from "next/image";
import React from "react";

const NextSanityImage = ({ image, alt, ...others }) => {
  const imageProps = useNextSanityImage(client, image);

  return <Image alt={alt} {...imageProps} {...others} />;
};

export default NextSanityImage;
