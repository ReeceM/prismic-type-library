import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children, menu }) => {
  return (
    <section className="dark:bg-cool-gray-800">
      <Navbar
        links={menu?.links}
      />

      { children}

      <Footer />
    </section>
  )
}

export default Layout;
