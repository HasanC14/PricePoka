import { useState } from "react";
import { FaArrowCircleUp } from "react-icons/fa";

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    // console.log(scrolled);
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <FaArrowCircleUp
      onClick={scrollToTop}
      style={{ opacity: visible ? "1" : "0" }}
      class="fixed bottom-4 right-4  text-white text-4xl animate-bounce z-10 transition-all ease-in-out duration-700 cursor-pointer "
    />
  );
};

export default ScrollButton;
