import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children, menu }) => {
  return (
    <>
      <Navbar
        links={menu?.links}
      />

      { children}

      <Footer />
    </>
  )
}

export default Layout;
