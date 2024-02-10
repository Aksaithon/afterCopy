import { useSpring, animated } from "react-spring";
import { useDrag } from "@use-gesture/react";

import "./Carousel.css";

const Carousel = () => {
  const [{ x }, api] = useSpring(() => ({ x: 0 }));

  function shftRight(){

    api.start({
      to: {x: x.get() + 500},
    })

  };

  function shftLeft(){

    api.start({
      to: {x: x.get() - 500},
    })

  };
  const bind = useDrag(({ down, offset: [mx] }) => {
    api.start({
      x: mx,
      immediate: false,
    });
  });


  return (
    <>
      <div className="carousel">
        <div className="Btns">
          <div className="leftBtn" onClick={() => shftLeft()} >
            <img
              src="arrow copy.svg"
              alt="left"
              style={{
                width: "10px",
                height: "10px",
                transform: "rotateY(180deg)",
              }}
            />
          </div>
          <div className="rightBtn" onClick={() => shftRight()} >
            <img
              src="arrow copy.svg"
              alt="right"
              style={{ width: "10px", height: "10px" }}
            />
          </div>
        </div>
        <animated.div
          {...bind()}
          style={{
            x,
          }}
          className={"animDiv"}
        >
          <div className="cards_CONTAINER">
            <div
              style={{
                backgroundImage: `url('/card1.svg')`,
                backgroundSize: "cover",
              }}
              className="card card1"
            ></div>
            <div
              style={{
                backgroundImage: `url('/card2.svg')`,
                backgroundSize: "cover",
              }}
              className="card card2"
            ></div>
            <div
              style={{
                backgroundImage: `url('/card3.svg')`,
                backgroundSize: "cover",
              }}
              className="card card3"
            ></div>
            <div
              style={{
                backgroundImage: `url('/card4.svg')`,
                backgroundSize: "cover",
              }}
              className="card card4"
            ></div>
            <div
              style={{
                backgroundImage: `url('/card5.svg')`,
                backgroundSize: "cover",
              }}
              className="card card5"
            ></div>
            <div
              style={{
                backgroundImage: `url('/card6.svg')`,
                backgroundSize: "cover",
              }}
              className="card card6"
            ></div>
            <div
              style={{
                backgroundImage: `url('/card7.svg')`,
                backgroundSize: "cover",
              }}
              className="card card7"
            ></div>
            <div
              style={{
                backgroundImage: `url('/card8.svg')`,
                backgroundSize: "cover",
              }}
              className="card card8"
            ></div>
            <div
              style={{
                backgroundImage: `url('/card9.svg')`,
                backgroundSize: "cover",
              }}
              className="card card9"
            ></div>
            <div
              style={{
                backgroundImage: `url('/card10.svg')`,
                backgroundSize: "cover",
              }}
              className="card card10"
            ></div>
            <div
              style={{
                backgroundImage: `url('/card11.svg')`,
                backgroundSize: "cover",
              }}
              className="card card11"
            ></div>
            <div
              style={{
                backgroundImage: `url('/card12.svg')`,
                backgroundSize: "cover",
              }}
              className="card card12"
            ></div>
            <div
              style={{
                backgroundImage: `url('/card13.svg')`,
                backgroundSize: "cover",
              }}
              className="card card13"
            ></div>
            <div
              style={{
                backgroundImage: `url('/card14.svg')`,
                backgroundSize: "cover",
              }}
              className="card card14"
            ></div>
            <div
              style={{
                backgroundImage: `url('/card15.svg')`,
                backgroundSize: "cover",
              }}
              className="card card15"
            ></div>
          </div>
        </animated.div>
      </div>
    </>
  );
};

export default Carousel;
