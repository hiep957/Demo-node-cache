import Header from "../components/Header";
import Footer from "../components/Footer";
// import Hero from "../components/Hero";

import { useAppContext } from "../contexts/AppContext";
import Hero from "../components/Hero";
// import SearchBar from "../components/SearchBar";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      <div className="container mx-auto">
        
      </div>
      <div className="container mx-auto py-10 flex-1">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;