import React from "react";
import Categories from "../components/Home/Categories";
import Carousel from "../components/Home/Carousel";
import Service from "../components/Home/Service";
import FeaturedProducts from "../components/Home/FeaturedProducts";
import Banner from "../components/Home/Banner";
import { Newsletter } from "../components/Home/Newsletter";

const Home = () => {
  return (
    <div>
      <Carousel />
      <Service />
      <Categories />
      <FeaturedProducts />
      <Banner />
      <Newsletter />
    </div>
  );
};

export default Home;
