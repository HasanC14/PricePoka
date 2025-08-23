import { LuGithub, LuFacebook, LuLinkedin } from "react-icons/lu";
export default function Footer() {
  return (
    <footer className="bg-gray-100 rounded-lg shadow-sm text-black dark:bg-[#020817] dark:border-t dark:border-[#1e293b]">
      <div className="w-full max-w-7xl mx-auto p-4 md:py-8">
        <div className="flex items-center md:flex-row flex-col sm:justify-between">
          <ul className="flex flex-wrap items-center  mb-6 text-xl font-medium text-gray-500 sm:mb-0 ">
            <li>
              <span className="block text-sm  sm:text-center me-4">
                Made with ❤️ by {""}
                <a
                  href="https://hasan-chowdhury.netlify.app/"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                >
                  Hasan Chowdhury
                </a>
              </span>
            </li>
          </ul>
          <ul className="flex flex-wrap items-center  md:mb-6 mb-0 text-2xl font-medium text-gray-500 ">
            <li>
              <a
                href="https://github.com/HasanC14/PricePoka"
                className="hover:text-blue-600 me-2 flex items-center"
                target="_blank"
              >
                <LuGithub />
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/dev.hasanchowdhury"
                className="hover:text-blue-600 me-2 flex items-center"
                target="_blank"
              >
                <LuFacebook />
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/dev1hasanchowdhury/"
                className="hover:text-blue-600 flex items-center"
                target="_blank"
              >
                <LuLinkedin />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
