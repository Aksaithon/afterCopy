import { useSprings, animated } from "react-spring";
import { useDrag } from "@use-gesture/react";
import React, { useState, useRef } from "react";

import "./Carousel.css";

const Carousel3: React.FC = () => {
  const [down, setDown] = useState(false);
  const [thisIndexToDrag, whichIndexToDrag] = useState<number>(0);
  const thisIndexToDragRef = useRef(0);

  const [springs, setSprings] = useSprings(2, (index) => ({
    x: 4170,
    y: -350,
    backgroundColor: index === 0 ? "#d8fff7" : "#d8ffd7",
    immediate: true,
  }));

  function setDepth(accordingToThisX: number) {
    const depth =
      4170 >= accordingToThisX && accordingToThisX >= 2295 /* decresion zone */
        ? -0.152 * (accordingToThisX - 4170) - 350
        : 2295 >= accordingToThisX &&
          accordingToThisX >= 380 /* incresion zone */
        ? 0.1488250652741514 * (accordingToThisX - 2295) - 65
        : -350;

    return depth;
  }

  function setRight_CardPositions(
    index: number,
    currCardX_Pos: number,
    currCardIndex: number
  ): number {
    const X_pos = currCardX_Pos + (currCardIndex - index) * 376;

    if (X_pos > 4170) {
      return 4170;
    }
    if (X_pos < 380) {
      return 380;
    }

    return X_pos;
  }

  function setLeft_CardPositions(
    index: number,
    currCardX_Pos: number,
    currCardIndex: number
  ): number {
    const X_pos = currCardX_Pos - (index - currCardIndex) * 376;

    if (X_pos > 4170) {
      return 4170;
    }
    if (X_pos < 380) {
      return 380;
    }

    return X_pos;
  }

  // function whatsCardIndex(thisIndex: string) {
  //   return whichIndexToDrag(parseInt(thisIndex));
  // }

  const bindGesture = useDrag(
    ({ args: [currCardIndex], down, offset: [mx] }) => {
      console.log("fist line : ", thisIndexToDrag);

      console.log();

      const newX =
        mx >= 380 && mx <= 4170 ? mx : mx < 380 ? 380 : mx > 4170 ? 4170 : 0;
      const newY = setDepth(newX);

      console.log();

      console.log();

      setSprings((index) => {
        if (index === currCardIndex) {
          return {
            x: newX,
            y: newY,
            immediate: down,
          };
        } else {
          if (index < currCardIndex) {
            // For right cards
            const rightCardX_Pos = setRight_CardPositions(
              index,
              newX,
              currCardIndex
            );
            const rightCardY_Pos = setDepth(rightCardX_Pos);

            return {
              x: rightCardX_Pos,
              y: rightCardY_Pos,
              immediate: down,
            };
          }
          if (index > currCardIndex) {
            // For left cards
            const leftCardX_Pos = setLeft_CardPositions(
              index,
              newX,
              currCardIndex
            );
            const leftCardY_Pos = setDepth(leftCardX_Pos);

            return {
              x: leftCardX_Pos,
              y: leftCardY_Pos,
              immediate: down,
            };
          }
        }
        setDown(down);
      });
    },
    {
      from: [
        springs[thisIndexToDragRef.current].x.get(),
        springs[thisIndexToDragRef.current].y.get(),
      ],
    }
  );

  return (
    <>
      <div className="carousel_Component">
        <animated.div
          // Pass the index of the card to the gesture hook
          {...bindGesture(0)}
          id={"0"} // Make sure to provide a unique id for each item in the list
          className={"customer_review_card"}
          style={{
            ...springs[0],
            backgroundSize: "cover",
            touchAction: "none",
            cursor: down ? "grabbing" : "grab",
          }}
          onClick={(e) => {
            whichIndexToDrag(parseInt(e.currentTarget.id));
            thisIndexToDragRef.current = parseInt(e.currentTarget.id);
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
            <div className="customer_name">{`Card${0}`}</div>
          </div>
        </animated.div>
        <animated.div
          // Pass the index of the card to the gesture hook
          {...bindGesture(1)}
          id={"1"} // Make sure to provide a unique id for each item in the list
          className={"customer_review_card"}
          style={{
            ...springs[1],
            backgroundSize: "cover",
            touchAction: "none",
            cursor: down ? "grabbing" : "grab",
          }}
          onClick={(e) => {
            whichIndexToDrag(parseInt(e.currentTarget.id));
            thisIndexToDragRef.current = parseInt(e.currentTarget.id);
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
            <div className="customer_name">{`Card${1}`}</div>
          </div>
        </animated.div>
      </div>
    </>
  );
};

export default Carousel3;
