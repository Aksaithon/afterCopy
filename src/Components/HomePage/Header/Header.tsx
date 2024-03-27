import { useState } from "react";
import "./Header.css";

const Header = () => {
  // const [myStyle, setMyStyle] = useState({
  //   color: "#503a3a",
  //   backgroundColor: "#ffb885",
  // });
  // const changeColor = () => {
  //   setMyStyle({
  //     color: myStyle.color == "#503a3a" ? "#ffb885" : "#503a3a",
  //     backgroundColor:
  //       myStyle.backgroundColor == "#ffb885" ? "#503a3a" : "#ffb885",
  //   });
  // };

  const [chngBtn1Color, setChngBtn1Color] = useState(false);
  const [shiftArrw, setShiftArrw] = useState(false);

  const changeBtn1Color = () => {
    setChngBtn1Color(!chngBtn1Color);
  };

  const shiftArrow = () => {
    setShiftArrw(!shiftArrw);
  };

  return (
    <>
      <header>
        <div className="main_title_and_captions_CONTAINER">
          <h1 className="main_title">
            Funerals<em> have </em>a<span> new home</span>
          </h1>

          <div className="captions_CONTAINER">
            Simple cremations. Upfront prices. Your way.
          </div>
        </div>

        <div className="buttons">
          <div className="button_CONTAINER">
            <div
              className={chngBtn1Color ? "btn1 scndClrComb" : "btn1"}
              onClick={() => changeBtn1Color()}
            >
              A death has occured
            </div>
            <div className="btn2" onClick={() => shiftArrow()}>
              or plan for the future
              <img
                className={shiftArrw ? "btn2img shiftArrow" : "btn2img"}
                src="arrow.svg"
                alt=""
              />
            </div>
          </div>
          <div className="imgContainer"></div>
        </div>
      </header>
    </>
  );
};

export default Header;
