import Header from "./Header";
import Testimonial from "./Testimonial";
import "./HomePg.css"
import MySpringAnim from "./React-Spring";
import Carousel from "./Carousel";
import Carousel2 from "./Carousel2";

const HomePg = () => {
  return (
    <>
      <div className="FullHomePage">
        <Header />
        <Testimonial />
        {/* <MySpringAnim /> */}
        <Carousel2/>
        <Carousel/>
        {/* <MySpringAnim /> */}
      </div>
    </>
  );
};

export default HomePg;
