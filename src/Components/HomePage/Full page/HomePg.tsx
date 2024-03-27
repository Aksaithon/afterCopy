import Testimonial from "../Testimonial/Testimonial";
import "./HomePg.css";
import BeforeAfterComp from "../Before after section/BeforeAfterComp";
import Header from "../Header/Header";
import HomeServices from "../Home services/HomeServices";

const HomePg = () => {
  return (
    <>
      <div className="FullHomePage">
        <Header />
        <Testimonial/>
        <BeforeAfterComp />
        <HomeServices/>
      </div>
    </>
  );
};

export default HomePg;
