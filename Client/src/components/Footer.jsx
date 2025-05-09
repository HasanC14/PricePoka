import { FaSquareGithub, FaSquareFacebook, FaLinkedin } from "react-icons/fa6";
export default function Footer() {
  return (
    <footer class="bg-gray-100 rounded-lg shadow-sm text-black">
      <div class="w-full max-w-7xl mx-auto p-4 md:py-8">
        <div class="flex items-center md:flex-row flex-col sm:justify-between">
          <ul class="flex flex-wrap items-center  mb-6 text-xl font-medium text-gray-500 sm:mb-0 ">
            <li>
              <span class="block text-sm  sm:text-center me-4">
                Made with ❤️ by {""}
                <a
                  href="https://hasan-chowdhury.netlify.app/"
                  class="text-blue-600 hover:underline"
                  target="_blank"
                >
                  Hasan Chowdhury
                </a>
              </span>
            </li>
          </ul>
          <ul class="flex flex-wrap items-center  md:mb-6 mb-0 text-2xl font-medium text-gray-500 ">
            <li>
              <a
                href="https://github.com/HasanC14/PricePoka"
                class="hover:text-blue-600 me-2 flex items-center"
              >
                <FaSquareGithub />
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/dev.hasanchowdhury"
                class="hover:text-blue-600 me-2 flex items-center"
              >
                <FaSquareFacebook />
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/dev1hasanchowdhury/"
                class="hover:text-blue-600 flex items-center"
              >
                <FaLinkedin />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
