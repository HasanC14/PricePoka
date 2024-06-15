import { useState } from "react";
import "./App.css";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/bundle";
import { motion } from "framer-motion";

import {
  FaCopy,
  FaFacebook,
  FaGithub,
  FaLinkedinIn,
  FaCheck,
  FaCircleXmark,
  FaEllipsis,
  FaEnvelopeOpen,
} from "react-icons/fa6";
const filters = [
  { text: "Rewrite", endpoint: "rewrite" },
  { text: "Fluency", endpoint: "fluency" },
  { text: "Natural", endpoint: "natural" },
  { text: "Formal", endpoint: "formal" },
  { text: "Academic", endpoint: "academic" },
  { text: "Simple", endpoint: "simple" },
  { text: "Creative", endpoint: "creative" },
  { text: "Expand", endpoint: "expand" },
  { text: "Concise", endpoint: "shorten" },
  { text: "Grammar", endpoint: "grammar" },
  { text: "Summarize", endpoint: "summarize" },
];
function App() {
  const [activeTab, setActiveTab] = useState("");
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [Loading, setLoading] = useState(false);
  const [Copy, setCopy] = useState(false);
  const [slidesPerView, setSlidesPerView] = useState(3);
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleTabClick = async (endpoint, text) => {
    setCopy(false);
    setLoading(true);
    setActiveTab(text);
    setOutputText("");
    if (inputText) {
      await axios
        .post(
          `https://write-right-server-p4f3-hasanc14-hasanc14s-projects.vercel.app/${endpoint}`,
          {
            inputValue: inputText,
          }
        )
        .then((response) => {
          setOutputText(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      setOutputText("Write something first 😒 ");
    }
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const HandleCopy = () => {
    navigator.clipboard.writeText(outputText);
    setCopy(true);
  };

  const handleResize = () => {
    if (window.innerWidth <= 350) {
      setSlidesPerView(2);
    } else if (window.innerWidth <= 550) {
      setSlidesPerView(3);
    } else if (window.innerWidth <= 720) {
      setSlidesPerView(5);
    } else {
      setSlidesPerView(7);
    }
  };
  window.addEventListener("resize", handleResize);
  const textAreaVariants = {
    hidden: (direction) => ({
      opacity: 0,
      x: direction === "left" ? -100 : 100,
    }),
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1.3, ease: "easeInOut" },
    },
  };
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4">
      {/* Buttons */}
      <div className="hidden lg:flex flex-wrap gap-2 mb-4 text-sm p-2 max-w-full">
        {filters.map((filter, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-lg hover:scale-110 transition-all ease-in-out duration-700 border-none ${
              activeTab === filter.text
                ? "bg-prime text-white scale-125"
                : "bg-gray-100"
            }`}
            onClick={() => handleTabClick(filter.endpoint, filter.text)}
          >
            {filter.text}
          </button>
        ))}
      </div>
      <div className="lg:hidden mb-4 text-xs p-2 max-w-full">
        <Swiper spaceBetween={10} slidesPerView={slidesPerView}>
          {filters.map((filter, index) => (
            <SwiperSlide key={index}>
              <button
                className={`px-4 py-2 rounded-lg hover:scale-110 transition-all ease-in-out duration-700 ${
                  activeTab === filter.text
                    ? "bg-prime text-white scale-125 "
                    : "bg-gray-100"
                }`}
                onClick={() => handleTabClick(filter.endpoint, filter.text)}
              >
                {filter.text}
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* Text Fields */}
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 w-full max-w-7xl relative">
        <motion.div
          className="md:w-1/2 w-full"
          custom="left"
          initial="hidden"
          animate="visible"
          variants={textAreaVariants}
        >
          <textarea
            className="flex-1 p-4 border rounded-lg resize-none h-64 md:h-96 text-sm w-full bg-gray-100 focus:outline-none focus:ring-0"
            placeholder="Write Smart, Write Right 😌"
            value={inputText}
            onChange={handleInputChange}
          />
        </motion.div>
        <motion.div
          className="md:w-1/2 w-full"
          custom="right"
          initial="hidden"
          animate="visible"
          variants={textAreaVariants}
        >
          <textarea
            className={`flex-1 p-4 md:pe-10 pe-0 pt-8 border rounded-lg resize-none h-64 md:h-96 text-sm w-full bg-gray-50  focus:outline-none focus:ring-0 ${
              Loading ? "animate-pulse" : ""
            }`}
            placeholder={
              Loading
                ? "Thinking... 🤔"
                : "Paraphrased content will appear here"
            }
            value={outputText}
            readOnly
          />
          <div className="absolute md:top-1 top-1/2 right-1">
            <button
              className="p-3 md:text-xl text-sm  text-prime rounded"
              onClick={HandleCopy}
            >
              {Copy ? (
                <div className="flex space-x-1 items-center">
                  <FaCheck />
                  <span className="text-xs">Copied</span>
                </div>
              ) : (
                <div className="flex space-x-1 items-center">
                  <FaCopy />
                  <span className="text-xs">Copy</span>
                </div>
              )}
            </button>
          </div>
        </motion.div>
      </div>
      {/* Footer */}
      <div className="text-xs mt-10 flex flex-col md:flex-row items-center">
        <div className="text-prime text-lg md:mr-2 mr-0">
          <a
            href="https://github.com/HasanC14/new-WriteRight-client"
            className="md:text-2xl text-lg  hover:underline"
            target="_blank"
          >
            WriteRight
          </a>
        </div>
        <div>
          Made with ❤️ by
          <button className="text-prime underline ml-1" onClick={toggleModal}>
            Hasan Chowdhury
          </button>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <motion.div
          custom="left"
          initial="hidden"
          animate="visible"
          variants={textAreaVariants}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className=" bg-prime max-w-screen-lg mx-auto text-second rounded-xl ">
            <div className="w-full h-12 bg-[#6a85c8] rounded-t-xl flex justify-between items-center">
              <div>
                <FaEllipsis className="text-5xl ms-4" />
              </div>
              <div>
                <FaCircleXmark
                  className="text-3xl me-2 hover:text-white cursor-pointer"
                  onClick={toggleModal}
                />
              </div>
            </div>
            <div className="grid lg:grid-cols-3 grid-cols-1 md:px-4 md:py-16 p-3 bg-base-200">
              <div className="m-auto col-span-1">
                <img
                  src="/Profile.png"
                  alt=""
                  className="size-72 rounded-full "
                />
              </div>
              <div className="col-span-2 lg:mt-0 mt-5">
                <p className="text-xl  md:px-10 p-3">
                  <span className="md:text-2xl text-lg ">
                    Hi there! I&#39;m{" "}
                    <span className="md:text-4xl text-2xl font-bold">
                      Hasan
                    </span>
                    ,{" "}
                  </span>{" "}
                  <br />a{" "}
                  <span className="font-bold">Full Stack Web Developer</span>{" "}
                  who loves to code. I created{" "}
                  <a
                    href="https://github.com/HasanC14/new-WriteRight-client"
                    className="md:text-2xl text-lg font-bold hover:underline"
                  >
                    WriteRight
                  </a>{" "}
                  , By leveraging the power of{" "}
                  <span className="font-bold">Google</span>&#39;s latest
                  language processing technology, to assist people in refining
                  their writing skills. Good writing is an essential part of
                  communication, and my goal is for WriteRight to make that
                  process simpler. If you have any queries or comments, I would
                  be delighted to hear from you!
                  <div className="flex space-x-4 md:text-3xl text-2xl mt-5">
                    <a
                      href="mailto:dev.hasanchowdhury@gmail.com?subject=Hello%20There&body=I%20wanted%20to%20get%20in%20touch%20with%20you."
                      target="_blank"
                    >
                      <FaEnvelopeOpen />
                    </a>
                    <a
                      href="https://www.facebook.com/dev.hasanchowdhury"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-white transition-all ease-in-out duration-700"
                    >
                      <FaFacebook></FaFacebook>
                    </a>
                    <a
                      href="https://github.com/HasanC14"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-white transition-all ease-in-out duration-700"
                    >
                      <FaGithub></FaGithub>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/dev1hasanchowdhury/"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-white transition-all ease-in-out duration-700"
                    >
                      <FaLinkedinIn></FaLinkedinIn>
                    </a>
                  </div>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default App;
