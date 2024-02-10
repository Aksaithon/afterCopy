import Header from "./Header";
import Testimonial from "./Testimonial";
import "./HomePg.css"
import Carousel from "./Carousel";
import MySpringAnim from "./React-Spring";
import ReactGesturesWithSpring from "./React-Gestures-Spring";

const HomePg = () => {
  return (
    <>
      <div className="FullHomePage">
        <Header />
        <Testimonial />
        <MySpringAnim />
        <Carousel/>
        <ReactGesturesWithSpring />
      </div>
    </>
  );
};

export default HomePg;
