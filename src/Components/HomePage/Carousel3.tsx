import { useSprings, animated, SpringValue } from "react-spring";
import { useGesture } from "@use-gesture/react";
import React, { useState, useRef } from "react";

import "./Carousel.css";
const Carousel3: React.FC = () => {
  const [down, setDown] = useState(false);

  let Card_Pos = 0;
  const cardSpring_Pos = useRef(0);

  /* start startPoint, -350  center centerPoint, -55  end endPoint, -350  */
  function setCenterPoint(): number {
    return 0;
  }

  function setStart_and_End_Point(centerPoint: number): number[] {
    const startPoint = centerPoint + 1795;
    const endPoint = centerPoint - 1795;

    return [startPoint, endPoint];
  }

  const centerPoint = setCenterPoint();

  const [startPoint, endPoint] = setStart_and_End_Point(centerPoint);

  const [springs, setSprings] = useSprings(15, () => ({
    x: centerPoint,
    y: 0,
    immediate: true,
  }));

  function setDepth(accordingToThisX: number) {
    const depth =
      startPoint >= accordingToThisX &&
      accordingToThisX >= centerPoint /* decresion zone */
        ? -0.1949860724233983 * (accordingToThisX - startPoint) - 350
        : centerPoint >= accordingToThisX &&
          accordingToThisX >= endPoint /* incresion zone */
        ? 0.1949860724233983 * (accordingToThisX - centerPoint) - 0
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

  const bindGesture = useGesture({
    onDragStart: ({ args: currCardIndex }) => {
      cardSpring_Pos.current = springs[currCardIndex].x.get();

      //ONE massive LOGIC of all time 😲🤯

      const currX_Pos =
        cardSpring_Pos.current >= endPoint &&
        cardSpring_Pos.current <= startPoint
          ? cardSpring_Pos.current >= centerPoint &&
            cardSpring_Pos.current <= centerPoint + 336 / 2 &&
            !down
            ? centerPoint
            : cardSpring_Pos.current <= centerPoint &&
              cardSpring_Pos.current >= centerPoint - 336 / 2 &&
              !down
            ? centerPoint
            : cardSpring_Pos.current >= centerPoint + 336 / 2 &&
              cardSpring_Pos.current <= centerPoint + 336 &&
              !down
            ? centerPoint + 375
            : cardSpring_Pos.current <= centerPoint - 336 / 2 &&
              cardSpring_Pos.current >= centerPoint - 336 &&
              !down
            ? centerPoint - 375
            : cardSpring_Pos.current
          : cardSpring_Pos.current < endPoint
          ? endPoint
          : cardSpring_Pos.current > startPoint
          ? startPoint
          : 0;
      const newY = setDepth(currX_Pos);

      console.log();

      console.log();

      setSprings.start((index) => {
        if (index === currCardIndex) {
          return {
            x: currX_Pos,
            y: newY,
            immediate: down,
          };
        } else {
          if (index < currCardIndex) {
            // For right cards
            const rightCardX_Pos = setRight_CardPositions(
              index,
              currX_Pos,
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
              currX_Pos,
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
      console.log();
    },
    onDrag: ({ args: [currCardIndex], down, movement: [mx] }) => {
      Card_Pos = cardSpring_Pos.current + mx;

      //ONE massive LOGIC of all time 😲🤯

      const currX_Pos =
        Card_Pos >= endPoint && Card_Pos <= startPoint
          ? Card_Pos >= centerPoint &&
            Card_Pos <= centerPoint + 336 / 2 &&
            !down
            ? centerPoint
            : Card_Pos <= centerPoint &&
              Card_Pos >= centerPoint - 336 / 2 &&
              !down
            ? centerPoint
            : Card_Pos >= centerPoint + 336 / 2 &&
              Card_Pos <= centerPoint + 336 &&
              !down
            ? centerPoint + 375
            : Card_Pos <= centerPoint - 336 / 2 &&
              Card_Pos >= centerPoint - 336 &&
              !down
            ? centerPoint - 375
            : Card_Pos
          : Card_Pos < endPoint
          ? endPoint
          : Card_Pos > startPoint
          ? startPoint
          : 0;
      const newY = setDepth(currX_Pos);

      console.log();

      console.log();

      setSprings.start((index) => {
        if (index === currCardIndex) {
          return {
            x: currX_Pos,
            y: newY,
            immediate: down,
          };
        } else {
          // For right cards
          if (index < currCardIndex) {
            const rightCardX_Pos = setRight_CardPositions(
              index,
              currX_Pos,
              currCardIndex
            );
            const rightCardY_Pos = setDepth(rightCardX_Pos);

            return {
              x: rightCardX_Pos,
              y: rightCardY_Pos,
              immediate: down,
            };
          }
          // For left cards
          if (index > currCardIndex) {
            const leftCardX_Pos = setLeft_CardPositions(
              index,
              currX_Pos,
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
      console.log();
    },
    onDragEnd: () => {
      springs.map((positions: { x: SpringValue<number> }, mapIndex) => {
        const currCardX_Pos = positions.x.get();
        const logicalX_pos1 = centerPoint;
        const logicalX_pos2 = centerPoint + 375;
        const logicalX_pos3 = centerPoint - 375;

        if (
          (currCardX_Pos >= centerPoint &&
            currCardX_Pos <= centerPoint + 336 / 2) ||
          (currCardX_Pos <= centerPoint &&
            currCardX_Pos >= centerPoint - 336 / 2)
        ) {
          setSprings.start((springIndex) => {
            if (springIndex == mapIndex) {
              return {
                x: logicalX_pos1,
                y: setDepth(logicalX_pos1),
                immediate: false,
              };
            } else {
              if (springIndex < mapIndex) {
                //for right cards
                const rightCardX_Pos = setRight_CardPositions(
                  springIndex,
                  logicalX_pos1,
                  mapIndex
                );
                const rightCardY_Pos = setDepth(rightCardX_Pos);

                return {
                  x: rightCardX_Pos,
                  y: rightCardY_Pos,
                  immediate: false,
                };
              }

              if (springIndex > mapIndex) {
                //for left cards
                const rightCardX_Pos = setLeft_CardPositions(
                  springIndex,
                  logicalX_pos1,
                  mapIndex
                );
                const rightCardY_Pos = setDepth(rightCardX_Pos);

                return {
                  x: rightCardX_Pos,
                  y: rightCardY_Pos,
                  immediate: false,
                };
              }
            }
          });
        }

        if (
          currCardX_Pos >= centerPoint + 336 / 2 &&
          currCardX_Pos <= centerPoint + 336
        ) {
          setSprings.start((springIndex) => {
            if (springIndex == mapIndex) {
              return {
                x: logicalX_pos2,
                y: setDepth(logicalX_pos2),
                immediate: false,
              };
            } else {
              if (springIndex < mapIndex) {
                //for right cards
                const rightCardX_Pos = setRight_CardPositions(
                  springIndex,
                  logicalX_pos2,
                  mapIndex
                );
                const rightCardY_Pos = setDepth(rightCardX_Pos);

                return {
                  x: rightCardX_Pos,
                  y: rightCardY_Pos,
                  immediate: false,
                };
              }

              if (springIndex > mapIndex) {
                //for left cards
                const rightCardX_Pos = setLeft_CardPositions(
                  springIndex,
                  logicalX_pos2,
                  mapIndex
                );
                const rightCardY_Pos = setDepth(rightCardX_Pos);

                return {
                  x: rightCardX_Pos,
                  y: rightCardY_Pos,
                  immediate: false,
                };
              }
            }
          });
        }

        if (
          currCardX_Pos <= centerPoint - 336 / 2 &&
          currCardX_Pos >= centerPoint - 336
        ) {
          setSprings.start((springIndex) => {
            if (springIndex == mapIndex) {
              return {
                x: logicalX_pos3,
                y: setDepth(logicalX_pos3),
                immediate: false,
              };
            } else {
              if (springIndex < mapIndex) {
                //for right cards
                const rightCardX_Pos = setRight_CardPositions(
                  springIndex,
                  logicalX_pos3,
                  mapIndex
                );
                const rightCardY_Pos = setDepth(rightCardX_Pos);

                return {
                  x: rightCardX_Pos,
                  y: rightCardY_Pos,
                  immediate: false,
                };
              }

              if (springIndex > mapIndex) {
                //for left cards
                const rightCardX_Pos = setLeft_CardPositions(
                  springIndex,
                  logicalX_pos3,
                  mapIndex
                );
                const rightCardY_Pos = setDepth(rightCardX_Pos);

                return {
                  x: rightCardX_Pos,
                  y: rightCardY_Pos,
                  immediate: false,
                };
              }
            }
          });
        }
      });
    },
  });

  // Generate animated div elements dynamically
  const animatedDivs = [];
  for (let i = 0; i < 15; i++) {
    animatedDivs.push(
      <animated.div
        // Pass the index of the card to the gesture hook
        {...bindGesture(i)}
        id={i.toString()} // Make sure to provide a unique id for each item in the list
        className={"customer_review_card"}
        style={{
          ...springs[i],
          cursor: down ? "grabbing" : "grab",
          touchAction: "pan-y",
        }}
      >
        <div className="review_text">
          The process was so easy and the representative was knowledgeable,
          patient and kind. Definitely would recommend this company to everyone.
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
          <div className="customer_name">{`Card${i}`}</div>
        </div>
      </animated.div>
    );
  }

  return (
    <>
      <div className="carousel_Component">{animatedDivs}</div>
    </>
  );
};

export default Carousel3;
