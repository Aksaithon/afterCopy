import { useSprings, animated } from "react-spring";
import { useGesture } from "@use-gesture/react";
import React, { useState } from "react";

import "./Carousel.css";

const Carousel2: React.FC = () => {
  const [positions, setPositions] = useState([
    { x: 4170, y: -350 },
    { x: 3834, y: -298.928 },
  ]);

  // Create a single spring array with two elements
  // const [springs, setSprings] = useSprings(2, (index) => ({
  //   x: index === 0 ? 4170 : 3834,
  //   y: index === 0 ? -350 : -298.928,
  //   backgroundColor: index === 0 ? "#d8fff7" : "#d8ffd7",
  //   immediate: false,
  // }));

  const [springs, setSprings] = useSprings(2, (index) => ({
    x: positions[index].x,
    y: positions[index].y,
    backgroundColor: index === 0 ? "#d8fff7" : "#d8ffd7",
    immediate: (key) => key === "x" || key === "y",
  }));

  function setDepth(accordingToThisX: number) {
    const depth =
      4170 >= accordingToThisX && accordingToThisX >= 2295
        ? -0.152 * (accordingToThisX - 4170) - 350
        : 2295 >= accordingToThisX && accordingToThisX >= 380
        ? 0.1488250652741514 * (accordingToThisX - 2295) - 65
        : -350;

    return depth;
  }

  // Create a custom gesture hook that handles the drag event for each card
  const bind = useGesture(
    {
      onDrag: ({ args: [dragIndex], down, offset: [mx] }) => {
        const newX = mx >= 380 ? (mx <= 4170 ? mx : 4170) : 380;
        const newY = setDepth(newX);

        setSprings((i) => {
          if (i === dragIndex) {
            return {
              x: newX,
              y: newY,
              immediate: down,
            };
          }

          // If the current spring is the other card, return the position and style based on the distance
          const leftCardX = newX - (i - dragIndex) * 396;
          const rightCardX = newX + (i - dragIndex) * 396;

          const leftCardY = setDepth(leftCardX);
          const rightCardY = setDepth(rightCardX);

          return {
            x: i > dragIndex ? leftCardX : rightCardX,
            y: i > dragIndex ? leftCardY : rightCardY,
            immediate: down,
          };
        });

        if (!down) {
          // Store the latest positions when dragging stops
          setPositions([
            { x: springs[0].x.get(), y: springs[0].y.get() },
            { x: springs[1].x.get(), y: springs[1].y.get() },
          ]);
        }
      },
    },
    {
      drag: { from: [springs[0].x.get(), springs[0].y.get()] },
    } /*✅ but not providing updated positions*/
  );

  return (
    <>
      <div className="carousel_Component">
        {springs.map((spring, index) => (
          <animated.div
            // Pass the index of the card to the gesture hook
            {...bind(index)}
            key={index}
            className={"customer_review_card"}
            style={{
              ...spring,
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
              <div className="customer_name">{`Card${index + 1}`}</div>
            </div>
          </animated.div>
        ))}
      </div>
    </>
  );
};

export default Carousel2;
