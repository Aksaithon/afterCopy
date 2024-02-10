import "./Testimonial.css";

const Testimonial = () => {
  return (
    <>
      <div className="testimonial_CONTAINER">
        <h2 className="testimonial_Title">
          The feeling is <span className="testimonial_span">mutual</span>
        </h2>
        <div className="img_and_ratings">
          <img src="Star-Review_Img.svg" className="starsImg" alt="" />
          <div className="avg_ratings">4.9 average star review</div>
        </div>
      </div>
    </>
  );
};

export default Testimonial;
