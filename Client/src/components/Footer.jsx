import { useState } from "react";
import profile from "../assets/pp.png";
import {
  FaCircleXmark,
  FaEllipsis,
  FaEnvelopeOpen,
  FaFacebook,
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa6";
import { motion } from "framer-motion";
export default function Footer() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

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
    <div>
      {/* Footer */}
      <div className="text-xs text-prime mt-10 flex flex-col md:flex-row items-center">
        <div>
          Made with ❤️ by
          <button
            className="hover:underline ml-1 gradient-text text-lg"
            onClick={toggleModal}
          >
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
          <div className=" bg-prime max-w-screen-lg mx-auto text-prime rounded-xl ">
            <div className="w-full h-12 bg-[#092838] rounded-t-xl flex justify-between items-center">
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
                <img src={profile} alt="" className="size-72 rounded-full " />
              </div>
              <div className="col-span-2 lg:mt-0 mt-5">
                <p className="text-xl  md:px-10 p-3">
                  <span className="md:text-2xl text-lg ">
                    Hi there! I'm{" "}
                    <span className="md:text-4xl text-2xl font-bold gradient-text">
                      Hasan
                    </span>
                    ,{" "}
                  </span>{" "}
                  <br />a{" "}
                  <span className="font-bold gradient-text">
                    Full Stack Web Developer
                  </span>{" "}
                  who loves to code. I created{" "}
                  <a
                    href="https://github.com/HasanC14/new-WriteRight-client"
                    className="md:text-2xl text-lg font-bold hover:underline gradient-text"
                  >
                    PricePoka
                  </a>{" "}
                  <span className="">
                    because I was frustrated searching for the prices across
                    multiple websites. As a programmer, I don't do repetitive
                    tasks without a function — so I built this to save time and
                    make life easier. Now, you can quickly compare prices from
                    different shops, all in one place. No more endless tabs and
                    wasted clicks!
                  </span>
                  <div className="flex space-x-4 md:text-3xl text-2xl mt-5">
                    <a
                      href="mailto:dev.hasanchowdhury@gmail.com?subject=Hello%20There&body=I%20wanted%20to%20get%20in%20touch%20with%20you."
                      target="_blank"
                      className="hover:text-gray-400 transition-all ease-in-out duration-700"
                    >
                      <FaEnvelopeOpen />
                    </a>
                    <a
                      href="https://www.facebook.com/dev.hasanchowdhury"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-gray-400 transition-all ease-in-out duration-700"
                    >
                      <FaFacebook></FaFacebook>
                    </a>
                    <a
                      href="https://github.com/HasanC14"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-gray-400 transition-all ease-in-out duration-700"
                    >
                      <FaGithub></FaGithub>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/dev1hasanchowdhury/"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-gray-400 transition-all ease-in-out duration-700"
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
