import "./Header.css";

const HeaderPart = () => {
  return (
    <>
      <div className="home-Page">
        <header>
          <div className="main_title_and_captions_CONTAINER">
            <div className="main_title">
              Funerals<em> have </em>a<span> new home</span>
            </div>

            <div className="captions_CONTAINER">
              Simple cremations. Upfront prices. Your way.
            </div>
          </div>

          <div className="button_CONTAINER">
            <div className="btn1">A death has occured</div>
            <div className="btn2">
              or plan for the future
              <img className="btn2img" src="arrow.svg" alt="" />
            </div>
          </div>
          <div className="imgContainer">
          </div>
        </header>
      </div>
    </>
  );
};

export default HeaderPart;
