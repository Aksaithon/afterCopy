import { useSprings, animated } from "react-spring";
import { useDrag } from "@use-gesture/react";
import React, { useState, useRef } from "react";

import "./Carousel.css";

const Carousel3: React.FC = () => {
  const [down, setDown] = useState(false);
  const [thisIndexToDrag, whichIndexToDrag] = useState<number>(0);
  const thisIndexToDragRef = useRef(0);

  /* start startPoint, -350  center centerPoint, -55  end endPoint, -350  */
  function setCenterPoint(): number {
    const screenWidth = window.innerWidth;
    const factor =
      screenWidth < 1400 ? 0.36678 : screenWidth < 1600 ? 0.38678 : 0.39878;
    return screenWidth * factor;
  }

  function setStart_and_End_Point(centerPoint: number): number[] {
    const startPoint = centerPoint + 1795;
    const endPoint = centerPoint - 1795;

    return [startPoint, endPoint];
  }

  const centerPoint = setCenterPoint();

  const [startPoint, endPoint] = setStart_and_End_Point(centerPoint);

  const [springs, setSprings] = useSprings(7, (index) => ({
    x: centerPoint,
    y: -55,
    backgroundColor: index === 0 ? "#d8fff7" : "#d8ffd7",
    immediate: true,
  }));

  function setDepth(accordingToThisX: number) {
    const depth =
      startPoint >= accordingToThisX &&
      accordingToThisX >= centerPoint /* decresion zone */
        ? -0.1643454038997214 * (accordingToThisX - startPoint) - 350
        : centerPoint >= accordingToThisX &&
          accordingToThisX >= endPoint /* incresion zone */
        ? 0.1643454038997214 * (accordingToThisX - centerPoint) - 55
        : -350;

    return depth;
  }

  function setRight_CardPositions(
    index: number,
    currCardX_Pos: number,
    currCardIndex: number
  ): number {
    const X_pos = currCardX_Pos + (currCardIndex - index) * 375;

    if (X_pos > startPoint) {
      return startPoint;
    }
    if (X_pos < endPoint) {
      return endPoint;
    }

    return X_pos;
  }

  function setLeft_CardPositions(
    index: number,
    currCardX_Pos: number,
    currCardIndex: number
  ): number {
    const X_pos = currCardX_Pos - (index - currCardIndex) * 375;

    if (X_pos > startPoint) {
      return startPoint;
    }
    if (X_pos < endPoint) {
      return endPoint;
    }

    return X_pos;
  }

  // function whatsCardIndex(thisIndex: string) {
  //   return whichIndexToDrag(parseInt(thisIndex))
  // }

  const bindGesture = useDrag(
    ({ args: [currCardIndex], down, offset: [mx] }) => {
      console.log("fist line : ", thisIndexToDrag);

      console.log();

      //ONE massive LOGIC of all time 😲🤯

      const newX =
        mx >= endPoint && mx <= startPoint
          ? mx >= centerPoint && mx <= centerPoint + 336 / 2 && !down
            ? centerPoint
            : mx <= centerPoint && mx >= centerPoint - 336 / 2 && !down
            ? centerPoint
            : mx >= centerPoint + 336 / 2 && mx <= centerPoint + 336 && !down
            ? centerPoint + 336
            : mx <= centerPoint - 336 / 2 && mx >= centerPoint - 336 && !down
            ? centerPoint - 336
            : mx
          : mx < endPoint
          ? endPoint
          : mx > startPoint
          ? startPoint
          : 0;
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
      });
      setDown(down);
      console.log("down =>>>>>>>>>>>>>>>>>>>>>>  ", down);
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
        <animated.div
          // Pass the index of the card to the gesture hook
          {...bindGesture(2)}
          id={"2"} // Make sure to provide a unique id for each item in the list
          className={"customer_review_card"}
          style={{
            ...springs[2],
            backgroundSize: "cover",
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
            <div className="customer_name">{`Card${2}`}</div>
          </div>
        </animated.div>
        <animated.div
          // Pass the index of the card to the gesture hook
          {...bindGesture(3)}
          id={"3"} // Make sure to provide a unique id for each item in the list
          className={"customer_review_card"}
          style={{
            ...springs[3],
            backgroundSize: "cover",
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
            <div className="customer_name">{`Card${3}`}</div>
          </div>
        </animated.div>
        <animated.div
          // Pass the index of the card to the gesture hook
          {...bindGesture(4)}
          id={"4"} // Make sure to provide a unique id for each item in the list
          className={"customer_review_card"}
          style={{
            ...springs[4],
            backgroundSize: "cover",
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
            <div className="customer_name">{`Card${4}`}</div>
          </div>
        </animated.div>
        <animated.div
          // Pass the index of the card to the gesture hook
          {...bindGesture(5)}
          id={"5"} // Make sure to provide a unique id for each item in the list
          className={"customer_review_card"}
          style={{
            ...springs[5],
            backgroundSize: "cover",
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
            <div className="customer_name">{`Card${5}`}</div>
          </div>
        </animated.div>
      </div>
    </>
  );
};

export default Carousel3;
