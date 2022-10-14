import React, { useState } from "react";
import PropTypes from "prop-types";
import Slick from "react-slick";

import { CloseOutlined } from "@ant-design/icons";
import { Global, Indicator } from "./styles";

const ImagesZoom = ({ images, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div
      style={{
        position: "fixed",
        zIndex: 1000,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <Global />
      <header
        style={{
          height: "44px",
          backgroundColor: "white",
          position: "relative",
          padding: 0,
          textAlign: "center",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "17px",
            color: "#333",
            lineHeight: "44px",
          }}
        >
          상세 이미지
        </h1>
        <CloseOutlined
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            padding: "15px",
            lineHeight: "14px",
            cursor: "pointer",
          }}
          onClick={onClose}
        />
      </header>
      <div
        style={{
          height: "calc(100% - 44px)",
          background: "#090909",
        }}
      >
        <div>
          <Slick
            initialSlide={0}
            beforeChange={(slide) => setCurrentSlide(slide)}
            infinite
            arrows={false}
            slidesToShow={1}
            slidesToScroll={1}
          >
            {images.map((v) => (
              <div
                style={{
                  padding: "32px",
                  textAlign: "center",
                }}
                key={v.src}
              >
                <img
                  style={{ margin: "0 auto", maxHeight: "750px" }}
                  src={`http://localhost:3065/${v.src}`}
                  alt={v.src}
                />
              </div>
            ))}
          </Slick>
          <Indicator>
            <div>
              {currentSlide + 1} /{images.length}
            </div>
          </Indicator>
        </div>
      </div>
    </div>
  );
};

ImagesZoom.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClose: PropTypes.func.isRequired,
};

// {
//   textAlign: "center",
// }

// {
//   width: "75px",
//   height: "30px",
//   lineHeight: "30px",
//   backgroundRadius: "15px",
//   background: "#313131",
//   display: "inline-block",
//   textAlign: "center",
//   color: "white",
//   fontSize: "15px"
// }

// createGlobalStyle`.slick-slide {}`
export default ImagesZoom;
