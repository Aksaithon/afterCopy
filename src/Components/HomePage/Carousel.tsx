import { useSpring, animated } from "react-spring";
import { useDrag } from "@use-gesture/react";
import React, { useState } from "react";

import "./Carousel.css";

const Carousel: React.FC = () => {
  const [springs, api] = useSpring(() => ({ from: {x: 2275, y: -65} }));
  const [springs2, api2] = useSpring(() => ({ from: {x: 2275, y: -65} }));
  //start point {x: 4170, y: -350}; center point {x: 2275, y: -65};  end point { x: 380, y: -350 }

  //TO start from--
  const [pos, setPos] = useState({xPos: springs.x.get() , yPos: springs.y.get() })
  const [pos2, setPos2] = useState({xPos: springs2.x.get() , yPos: springs2.y.get() })




  const bind = useDrag(({ down, offset: [mx, my] }) => {
    api.start({
      x: mx >= 380 ? (mx <= 4170 ? mx : 4170) : 380,
      y:
        mx <= 4170 && mx >= 380
          ? -0.00008240864567896775 * (mx * mx) +
            0.38072794303683094 * mx +
            -504.63982361658293
          : -350,
      immediate: down,
    });

    setPos({xPos: mx ,yPos: my })
  }, {from: [pos.xPos, pos.yPos]});

  const bind2 = useDrag(({ down, offset: [mx, my] }) => {
    api2.start({
      x: mx >= 380 ? (mx <= 4170 ? mx : 4170) : 380,
      y:
        mx <= 4170 && mx >= 380
          ? -0.00008240864567896775 * (mx * mx) +
            0.38072794303683094 * mx +
            -504.63982361658293
          : -350,
      immediate: down,
    });

    setPos2({xPos: mx ,yPos: my })
  }, {from: [pos2.xPos, pos2.yPos]});
  
  return (
    <>
      <div className="carousel_Component">
        <animated.div
          {...bind()}
          className={"customer_review_card"}
          style={{
            ...springs,
            backgroundColor: "#d8fff7",
            backgroundSize: "cover",
            touchAction: "none",
          }}
        >
          <div className="review_text">
            The process was so easy and the representative was knowledgeable,
            patient and kind. Definitely would recommend this company to
            everyone.
          </div>
          <div className="customer_info">
            <img
              src="Kathy_CoverPhoto.webp"
              alt="coverphoto"
              className="customer_coverphoto"
              style={{
                width: "50.67px",
                height: "50.67px",
                borderRadius: "50%",
                userSelect: "none",
              }}
            />
            <div className="customer_name">Kathy</div>
          </div>
        </animated.div>
        <animated.div
          {...bind2()}
          className={"customer_review_card"}
          style={{
            ...springs2,
            backgroundColor: "#d8ffd7",
            backgroundSize: "cover",
            touchAction: "none",
          }}
        >
          <div className="review_text">
            The process was so easy and the representative was knowledgeable,
            patient and kind. Definitely would recommend this company to
            everyone.
          </div>
          <div className="customer_info">
            <img
              src="Kathy_CoverPhoto.webp"
              alt="coverphoto"
              className="customer_coverphoto"
              style={{
                width: "50.67px",
                height: "50.67px",
                borderRadius: "50%",
                userSelect: "none",
              }}
            />
            <div className="customer_name">Kathy</div>
          </div>
        </animated.div>
      </div>
    </>
  );
};

export default Carousel;
