import Header from "./Header";
import Testimonial from "./Testimonial";
import "./HomePg.css"
import MySpringAnim from "./React-Spring";
import Carousel from "./Carousel";

const HomePg = () => {
  return (
    <>
      <div className="FullHomePage">
        <Header />
        <Testimonial />
        {/* <MySpringAnim /> */}
        <Carousel/>
        {/* <MySpringAnim /> */}
      </div>
    </>
  );
};

export default HomePg;
