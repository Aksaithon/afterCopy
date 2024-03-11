import Header from "./Header";
import Testimonial from "./Testimonial";
import "./HomePg.css";
import BeforeAfterComp from "./BeforeAfterComp";

const HomePg = () => {
  return (
    <>
      <div className="FullHomePage">
        <Header />
        <Testimonial />
        <BeforeAfterComp/>
      </div>
    </>
  );
};

export default HomePg;
