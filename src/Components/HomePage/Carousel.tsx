import { useSpring, animated } from "react-spring";
import { useDrag } from "@use-gesture/react";
import React, { useState } from "react";

import "./Carousel.css";

const Carousel: React.FC = () => {
  const [springs1, api1] = useSpring(() => ({ from: { x: 4170, y: -350 } }));
  const [springs2, api2] = useSpring(() => ({ from: { x: 3834, y: -298.928 } }));
  //start point {x: 4170, y: -350}; center point {x: 2295, y: -65};  end point { x: 450, y: -350 }

  //TO start from--
  const [pos1, setPos1] = useState({
    xPos1: springs1.x.get()
  });
  const [pos2, setPos2] = useState({
    xPos2: springs2.x.get()
  });

  const bind1 = useDrag(
    ({ down, offset: [mx] }) => {
      api1.start({
        x:
          mx >= 380
            ? mx <= 4170
              ? mx
              : 4170 /*to make anim under boundery*/
            : 380 /*to make anim under boundery*/,
        y:
          4170 >= mx && mx >= 2295 /*decrease phase*/
            ? -0.152 * (mx - 4170) - 350
            : 2295 >= mx && mx >= 380 /*increase phase*/
            ? 0.1488250652741514 * (mx - 2295) - 65
            : -350,
        immediate: down,
      });

      setPos1({ xPos1: mx });
      setPos2({xPos2: mx-336})
    },
    { from: [pos1.xPos1, -350] }
  );

  const bind2 = useDrag(
    ({ down, offset: [mx] }) => {
      api2.start({
        x:
          mx >= 380
            ? mx <= 4170
              ? mx
              : 4170 /*to make anim under boundery*/
            : 380 /*to make anim under boundery*/,
        y:
          4170 >= mx && mx >= 2295 /*decrease phase*/
            ? -0.152 * (mx - 4170) - 350
            : 2295 >= mx && mx >= 380 /*increase phase*/
            ? 0.1488250652741514 * (mx - 2295) - 65
            : -350,
        immediate: down,
      });

      setPos2({ xPos2: mx });
      setPos1({xPos1: mx+336})
    },
    { from: [pos2.xPos2, -350] }
  );

  return (
    <>
      <div className="carousel_Component">
        <animated.div
          {...bind1()}
          className={"customer_review_card"}
          style={{
            ...springs1,
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
            <div className="customer_name">Card1</div>
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
            <div className="customer_name">Card2</div>
          </div>
        </animated.div>
      </div>
    </>
  );
};

export default Carousel;



