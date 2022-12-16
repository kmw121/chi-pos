import React from "react";
import { Banner, BannerDotsUl, BannerDotsLi } from "../components";
function MainBanner() {
  return (
    <>
      <Banner>배너 자리입니다</Banner>
      <BannerDotsUl>
        <BannerDotsLi>
          <button>1</button>
        </BannerDotsLi>
        <BannerDotsLi>
          <button>1</button>
        </BannerDotsLi>
      </BannerDotsUl>
    </>
  );
}

export default MainBanner;
