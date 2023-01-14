import React from "react";
import { Banner, BannerDotsUl, BannerDotsLi } from "../components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function MainBanner() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
  };
  return (
    <>
      {/* <Banner src={"/c-pos/banner1.png"} alt="banner" />
      <Banner src={"/c-pos/banner2.png"} alt="banner" />
      <BannerDotsUl>
        <BannerDotsLi>
          <button>1</button>
        </BannerDotsLi>
        <BannerDotsLi>
          <button>1</button>
        </BannerDotsLi>
      </BannerDotsUl> */}
      <Slider {...settings}>
        <Banner src={"/c-pos/banner1.png"} alt="banner" />
        <Banner src={"/c-pos/banner2.png"} alt="banner" />
      </Slider>
    </>
  );
}

export default MainBanner;
