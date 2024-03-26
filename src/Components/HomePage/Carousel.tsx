import { useSprings, animated, SpringValue } from "react-spring";
import { useGesture } from "@use-gesture/react";
import React, { useState, useRef, useEffect } from "react";
import "./Carousel.css";
import "./Carousel_Data";
import { Carousel_data } from "./Carousel_Data";

const no_of_reviews = 15;
const intervals: { [key: number]: NodeJS.Timeout } = {};
const card_padding = 39;
let Card_Pos = 0;
const centerPoint = 0;
const [startPoint, endPoint] = [1875, -1875];
let autoPosition = 0;

function setDepth(accordingToThisX: number) {
  const depth =
    startPoint >= accordingToThisX &&
    accordingToThisX >= centerPoint /* decresion zone */
      ? -0.1866666666666667 * (accordingToThisX - startPoint) - 350
      : centerPoint >= accordingToThisX &&
        accordingToThisX >= endPoint /* incresion zone */
      ? 0.1866666666666667 * (accordingToThisX - centerPoint) - 0
      : -350;

  return depth;
}

function setRight_CardPositions(
  index: number,
  centerCardPos: number,
  centerCardIndex: number
): number {
  const X_pos =
    centerCardPos + (centerCardIndex - index) * (336 + card_padding);

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
  centerCardPos: number,
  centerCardIndex: number
): number {
  const X_pos =
    centerCardPos - (index - centerCardIndex) * (336 + card_padding);

  if (X_pos > startPoint) {
    return startPoint;
  }
  if (X_pos < endPoint) {
    return endPoint;
  }

  return X_pos;
}

let carouselRendered = 0;

const Carousel: React.FC = () => {
  carouselRendered += 1;

  const ref = useRef(null);

  const [down, setDown] = useState(false);

  const cardSpring_Pos = useRef(0);

  const [springs, setSprings] = useSprings(no_of_reviews, (index) => ({
    x:
      index == 5
        ? 0
        : index < 5
        ? setRight_CardPositions(index, 0, 5)
        : index > 5
        ? setLeft_CardPositions(index, 0, 5)
        : 0,
    y:
      index == 5
        ? setDepth(0)
        : index < 5
        ? setDepth(setRight_CardPositions(index, 0, 5))
        : index > 5
        ? setDepth(setLeft_CardPositions(index, 0, 5))
        : setDepth(0),
    immediate: true,
  }));

  // +======================================================+

  /* Automate carousel 
  
  --selects card at center✅
  --shifts (336 + padding) to left with some interval✅
  --shifts card to start point after reaching at end point✅ 
  */

  // +======================================================+

  function find_centerCard(): number {
    let centerCard = 0;
    let yPos_array: number[] = [];

    springs.map((positions: { y: SpringValue<number> }) => {
      yPos_array.push(positions.y.get());
    });

    let largestY = yPos_array[0]; // Initialize largestY with the first element

    for (let i = 1; i < yPos_array.length; i++) {
      if (yPos_array[i] > largestY) {
        largestY = yPos_array[i]; // Update largestY if a larger element is found
      }
    }

    centerCard = yPos_array.indexOf(largestY);

    return centerCard;
  }

  function shiftThis_Card(thisCard: number): void {
    intervals[thisCard] = setInterval(() => {
      console.log(`running ${thisCard}`);

      const card_no = [6, 7, 8];

      if (thisCard <= 3 && find_centerCard() <= 3) {
        autoPosition = startPoint;
        thisCard = card_no[Math.floor(Math.random() * card_no.length)];
      }

      if (autoPosition == endPoint) {
        autoPosition = startPoint;
      } else {
        if (thisCard == 0 && find_centerCard() == 0) {
          autoPosition = startPoint;
        } else {
          autoPosition = autoPosition - (336 + card_padding);
        }
      }

      autoPosition =
        autoPosition < endPoint
          ? endPoint
          : autoPosition > startPoint
          ? startPoint
          : autoPosition;

      setSprings.start((index) => {
        return {
          x:
            index == thisCard
              ? autoPosition
              : index < thisCard
              ? setRight_CardPositions(index, autoPosition, thisCard)
              : index > thisCard
              ? setLeft_CardPositions(index, autoPosition, thisCard)
              : autoPosition,
          y:
            index == thisCard
              ? setDepth(autoPosition)
              : index < thisCard
              ? setDepth(setRight_CardPositions(index, autoPosition, thisCard))
              : index > thisCard
              ? setDepth(setLeft_CardPositions(index, autoPosition, thisCard))
              : setDepth(autoPosition),
          immediate: false,
        };
      });
    }, 5000);
  }

  function stopAllIntervals(intervals: { [key: number]: NodeJS.Timeout }) {
    console.log("Stopping all intervals");

    if (Object.keys(intervals).length == 0) {
      console.log("no interval running");
    }
    for (const key of Object.keys(intervals)) {
      console.log("Loop ran 🏃🏽‍♂️🏃🏽‍♂️🏃🏽‍♂️");
      clearInterval(intervals[Number(key)]);
      console.log(`Stopped interval for ${key}`);
      delete intervals[Number(key)];
    }
  }

  function automatic_Carousel() {
    const card = find_centerCard();
    shiftThis_Card(card);
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio == 1) {
          automatic_Carousel();
        }

        if (entry.intersectionRatio == 0) {
          stopAllIntervals(intervals);
          autoPosition = 0;
        }
      },
      { threshold: [0, 1] }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const bindGesture = useGesture({
    onDragStart: ({ args: currCardIndex }) => {
      autoPosition = 0;
      stopAllIntervals(intervals);
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
            ? centerPoint + (336 + card_padding)
            : cardSpring_Pos.current <= centerPoint - 336 / 2 &&
              cardSpring_Pos.current >= centerPoint - 336 &&
              !down
            ? centerPoint - (336 + card_padding)
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
            ? centerPoint + (336 + card_padding)
            : Card_Pos <= centerPoint - 336 / 2 &&
              Card_Pos >= centerPoint - 336 &&
              !down
            ? centerPoint - (336 + card_padding)
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
      automatic_Carousel();

      springs.map(
        (
          positions: { x: SpringValue<number>; y: SpringValue<number> },
          mapIndex
        ) => {
          // console.log(`card ${mapIndex} x: ${positions.x.get()}, y: ${positions.y.get()}`);

          const currCardX_Pos = positions.x.get();
          const logicalX_pos1 = centerPoint;
          const logicalX_pos2 = centerPoint + (336 + card_padding);
          const logicalX_pos3 = centerPoint - (336 + card_padding);

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
        }
      );
    },
  });

  // Generate animated div elements dynamically
  const animatedDivs = [];
  for (let i = 0; i < no_of_reviews; i++) {
    animatedDivs.push(
      <animated.div
        // Pass the index of the card to the gesture hook
        {...bindGesture(i)}
        className={"customer_review_card"}
        key={i.toString()}
        style={{
          ...springs[i],
          cursor: down ? "grabbing" : "grab",
          touchAction: "pan-y",
          backgroundColor: `${Object.values(Carousel_data)[i].color}`,
        }}
      >
        <div className="review_text">
          {Object.values(Carousel_data)[i].review}
        </div>
        <div className="customer_info">
          <img
            src={`${Object.values(Carousel_data)[i].profile_img}`}
            alt="coverphoto"
            className="customer_coverphoto"
            style={{
              width: "50.67px",
              height: "50.67px",
              borderRadius: "50%",
              userSelect: "none",
            }}
          />
          <div className="customer_name">{`${
            Object.values(Carousel_data)[i].name
          }`}</div>
        </div>
      </animated.div>
    );
  }

  return (
    <>
      <div className="carousel_Wrapper">
        <div ref={ref} className="carousel_Component">
          {animatedDivs}
        </div>
        <animated.div
          className="glass_layer"
          {...bindGesture(find_centerCard())} // DRAG GAP FILLING CODE
          style={{ cursor: down ? "grabbing" : "grab", touchAction: "pan-x" }}
        />
      </div>
    </>
  );
};

export default Carousel;
