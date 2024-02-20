import Header from "./Header";
import Testimonial from "./Testimonial";
import "./HomePg.css"
import MySpringAnim from "./React-Spring";
import Carousel from "./Carousel";
import Carousel2 from "./Carousel2";
import Carousel3 from "./Carousel3";
import ReactGesturesWithSpring from "./React-Gestures-Spring";
import TrialCarousel from "./TrialCarousel";

const HomePg = () => {
  return (
    <>
      <div className="FullHomePage">
        <Header />
        <Testimonial />
        {/* <MySpringAnim /> */}
        <Carousel3/>
        {/* <TrialCarousel/> */}
        {/* <Carousel2/>
        <Carousel/> */}
        {/* <MySpringAnim /> */}
      </div>
    </>
  );
};

export default HomePg;
