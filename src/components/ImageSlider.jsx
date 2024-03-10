import React, { useEffect, useState } from "react";
import "./style.css";
import { FaArrowCircleRight } from "react-icons/fa";
import { FaArrowCircleLeft } from "react-icons/fa";
function ImageSlider({ url, limit }) {
  const [images, setImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1);
  };

  const handlePrev = () => {
    setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1);
  };

  const handleDotClick=(currIndex)=>{
    setCurrentSlide(currIndex)
  }

  async function fetchImages(getUrl) {
    try {
      setLoading(true);
      const response = await fetch(`${getUrl}?page=1&limit=${limit}`);
      const data = await response.json();
      if (data) {
        setLoading(false);
        setImages(data);
      }
    } catch (e) {
      setLoading(false);
      setErrorMsg(e.message);
    }
  }

  useEffect(() => {
    if (url !== "") {
      fetchImages(url);
    }
  }, [url]);

  // console.log(images)

  if (loading) {
    return <div>Loading data, please wait</div>;
  }
  if (errorMsg !== null) {
    return <div>Error occurred, {errorMsg} </div>;
  }

  return (
    <div className="container">
      <FaArrowCircleLeft onClick={handlePrev} className="arrow arrow-left" />
      {images && images.length
        ? images.map((item, index) => {
            return (
              <img
                src={item.download_url}
                alt={item.download_url}
                key={item.id}
                className={
                  currentSlide === index
                    ? "current-image"
                    : "current-image hide-current-image"
                }
              />
            );
          })
        : null}
      <FaArrowCircleRight onClick={handleNext} className="arrow arrow-right" />

      <span className="circle-indicators">
        {images && images.length
          ? images.map((_, index) => {
              return (
                <button
                  key={index}
                  onClick={()=>handleDotClick(index)}
                  className={
                    currentSlide === index
                      ? "current-indicator"
                      : "current-indicator inactive-current-indicator"
                  }
                ></button>
              );
            })
          : null}
      </span>
    </div>
  );
}

export default ImageSlider;
