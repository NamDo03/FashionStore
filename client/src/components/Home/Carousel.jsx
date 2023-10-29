import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { RxDotFilled } from "react-icons/rx";
import { BsArrowRight } from "react-icons/bs";
import useWindowSize from "../../hook/useWindowSize";
import { slides } from "../../MyLinks";

const Carousel = () => {
 
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isButtonAnimating, setIsButtonAnimating] = useState(false);
  const windowSize = useWindowSize();

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setIsButtonAnimating(true);
    setCurrentIndex(newIndex);
    setTimeout(() => {
      setIsButtonAnimating(false);
    }, 500);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setIsButtonAnimating(true);
    setCurrentIndex(newIndex);
    setTimeout(() => {
      setIsButtonAnimating(false);
    }, 500);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  const backgroundImage =
    windowSize.width >= 768
      ? slides[currentIndex].img
      : slides[currentIndex].imgRes;

  return (
    <div
      className="pt-28 max-w-[1220px] h-[650px] w-full m-auto relative group"
      data-aos="fade-down"
    >
      <div
        style={{ backgroundImage: `url(${backgroundImage})` }}
        className="w-full h-full rounded-lg bg-top bg-cover duration-500 bg-no-repeat relative flex flex-col gap-16 justify-center items-center"
      >
        <div
          className={`text-center max-w-xl slide-up ${
            isButtonAnimating
              ? "translate-y-full opacity-0"
              : "translate-y-0 opacity-100"
          }`}
        >
          <h1 className="font-semibold lg:text-3xl text-xl text-white pb-8 drop-shadow-md">
            {slides[currentIndex].title}
          </h1>
          <p className="text-sm lg:text-lg text-white drop-shadow-md">{slides[currentIndex].decs}</p>
        </div>
        <button
        onClick={() => navigate(slides[currentIndex].path)}
          className={`group/btn cta slide-up ${
            isButtonAnimating
              ? "translate-y-full opacity-0"
              : "translate-y-0 opacity-100"
          }`}
        >
          <span className="hover-underline-animation">Shopping now</span>
          <span className="lg:block hidden ease-in duration-300 translate-x-0 group-hover/btn:translate-x-3">
            <BsArrowRight size={24} />
          </span>
        </button>
        <div className="flex justify-center items-center py-2 absolute bottom-0 left-[47%]">
          {slides.map((slide, slideIndex) => (
            <div
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className={`text-3xl cursor-pointer ${
                slideIndex === currentIndex
                  ? "text-white text-4xl"
                  : "text-hover"
              }`}
            >
              <RxDotFilled />
            </div>
          ))}
        </div>
      </div>
      {/* Left Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] left-5 text-2xl rounded-lg p-2 bg-white text-primary cursor-pointer">
        <FiChevronLeft onClick={prevSlide} size={30} />
      </div>
      {/* Right Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] right-5 text-2xl rounded-lg p-2 bg-white text-primary cursor-pointer">
        <FiChevronRight onClick={nextSlide} size={30} />
      </div>
    </div>
  );
};

export default Carousel;
