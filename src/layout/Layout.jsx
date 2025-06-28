import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import BottomNavbar from "../components/BottomNavbar";

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen dark:bg-[#020817]">
      <Navbar />
      <div className="flex flex-grow">{children}</div>
      <Footer />
      <div>
        <BottomNavbar />
      </div>
    </div>
  );
}

export default Layout;
