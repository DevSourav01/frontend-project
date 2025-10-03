import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import HowItWorks from "./components/HowItWorks";
import Newsletter from "./components/NewsLetter";
import ProfileSection from "./components/ProfileSection";
import Footer from "./components/Footer";
function App() {
  return (
    <>
      <Navbar/>
      <Hero/>
      <Categories/>
      <ProfileSection/>
      <HowItWorks/>
      <Newsletter/>
      <Footer/>
    </>
  );
}

export default App;
