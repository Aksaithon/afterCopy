import { useSpring, useSprings, animated } from "react-spring";
import { useGesture } from "@use-gesture/react";
import { useRef, useState } from "react";
import "./TrialCarousel.css";

const TrialCarousel = () => {
  //
  // VARIABLES===============>>>>>>>>
  //

  const totalCards = 15; // Update this to reflect the total number of cards
  const initial_CenterCard_Index = (totalCards - 1) / 2;

  let slider_Pos = 0;

  const X_Pos = useRef(0);
  const [down, setDown] = useState(false);

  //
  // SPRINGS===============>>>>>>>>
  //

  const [{ x }, slider] = useSpring(() => ({ x: X_Pos.current }));

  const [cardSprings, setCardSprings] = useSprings(totalCards, () => ({
    height: 376,
    immediate: false,
  }));

  //
  // FUNCTIONS===============>>>>>>>>
  //

  function current_CenterCard_Index(): number {
    const current_Center_Card_Index =
      initial_CenterCard_Index + -X_Pos.current / 376;

    // console.log("current center card = ", current_Center_Card_Index);
    // console.log(" slider shift number ", X_Pos.current / 376);

    // console.log(current_Center_Card_Index); // from 0 - nth card number

    return current_Center_Card_Index; // this card Index is currently at center
  }

  function calculate_Height_Manually(currCenterCardIndex: number, cardIndex: number): number{
    const indexDiffrnc = cardIndex - currCenterCardIndex;

    return indexDiffrnc < 0
    ? 376 + -1 * indexDiffrnc * 376 * 0.1643454038997214
    : 376 + indexDiffrnc * 376 * 0.1643454038997214
  };

  const bind = useGesture({
    onDragStart: () => {
      slider.start({
        x: X_Pos.current,
        immediate: false,
      });

      setCardSprings.start((thisIndex) => {
      
        if (current_CenterCard_Index() == thisIndex) {
          return {
            height: 376,
            immediate: false,
          };
        } else {
          const indexDiffrnc = current_CenterCard_Index() - thisIndex;
          return {
            height:
              indexDiffrnc < 0
                ? 376 + -1 * indexDiffrnc * 376 * 0.1643454038997214
                : 376 + indexDiffrnc * 376 * 0.1643454038997214,
            immediate: false,
          };
        }
      });

      setDown(true);
    },

    onDrag: ({
      down,
      movement: [mx],
      direction: [inThisDirection],
      distance,
    }) => {
      if (distance[0] > 5) {
        // const improveDragControll = 150 * inThisDirection;  
        slider_Pos = X_Pos.current + mx;
        slider.start({
          x: slider_Pos,
          immediate: false,
        });

        // console.log(1
        //   "center card while dragging : ",
        //   (totalCards - 1) / 2 + -Math.round(slider_Pos / 376)
        // );

        // for calculating card height manually
        const currCenterCardChangeIndex =
          initial_CenterCard_Index + -Math.round(slider_Pos / 376); 

        const currCardIndex = current_CenterCard_Index(); // this card Index is currently at center

        setCardSprings((thisIndex) => {
          //center card on both left & right swipe
          if (thisIndex == currCenterCardChangeIndex) {
            return {
              height:
                376 + 0.1643454038997214 * Math.abs(mx) <= 650
                  ? 376 + 0.1643454038997214 * Math.abs(mx)
                  : 650,

              immediate: false,
            };
          }

          //right cards✅
          if (thisIndex > currCardIndex) {
            //on swipe left✅, decrease card height✅
            if (inThisDirection < 0) {
              return {
                height:
                  calculate_Height_Manually(currCenterCardChangeIndex, thisIndex) -
                    0.1643454038997214 * Math.abs(mx) >=
                  376
                    ? calculate_Height_Manually(currCenterCardChangeIndex, thisIndex) -
                      0.1643454038997214 * Math.abs(mx)
                    : 376,
                immediate: false,
              };
            }

            //on swipe right✅, increase card height✅
            if (inThisDirection > 0) {
              return {
                height:
                  calculate_Height_Manually(currCenterCardChangeIndex, thisIndex) +
                    0.1643454038997214 * Math.abs(mx) <=
                  808.5571030640667
                    ? calculate_Height_Manually(currCenterCardChangeIndex, thisIndex) +
                      0.1643454038997214 * Math.abs(mx)
                    : 808.5571030640667,
                immediate: false,
              };
            }
          }

          //left card
          if (thisIndex < currCardIndex) {
            //on swipe left✅, increase card height✅
            if (inThisDirection < 0) {
              return {
                height:
                  calculate_Height_Manually(currCenterCardChangeIndex, thisIndex) +
                    0.1643454038997214 * Math.abs(mx) <=
                  808.5571030640667
                    ? calculate_Height_Manually(currCenterCardChangeIndex, thisIndex) +
                      0.1643454038997214 * Math.abs(mx)
                    : 808.5571030640667,
                immediate: false,
              };
            }

            //on swipe right✅, decrease card height✅
            if (inThisDirection > 0) {
              return {
                height:
                  calculate_Height_Manually(currCenterCardChangeIndex, thisIndex) -
                    0.1643454038997214 * Math.abs(mx) >=
                  376
                    ? calculate_Height_Manually(currCenterCardChangeIndex, thisIndex) -
                      0.1643454038997214 * Math.abs(mx)
                    : 376,
                immediate: false,
              };
            }
          }
        });

        setDown(down);
      }
    },

    onDragEnd: ({ distance }) => {
      if (distance[0] > 5) {
        const adjustedSliderPos = Math.round(slider_Pos / 376) * 376;

        slider.start({
          x: adjustedSliderPos,
          immediate: false,
        });
        X_Pos.current = adjustedSliderPos;
        current_CenterCard_Index();
        setCardSprings((thisIndex) => {
          if (current_CenterCard_Index() == thisIndex) {
            return {
              height: 376,
              immediate: false,
            };
          } else {
            const indexDiffrnc = current_CenterCard_Index() - thisIndex;
            return {
              height:
                indexDiffrnc < 0
                  ? 376 + Math.abs(indexDiffrnc) * 376 * 0.1643454038997214
                  : 376 + indexDiffrnc * 376 * 0.1643454038997214,
              immediate: false,
            };
          }
        });
      }
      setDown(false);
    },
  });

  return (
    <>
      <animated.div
        {...bind()}
        style={{
          x,
          cursor: down ? "grabbing" : "grab",
          touchAction: "none",
        }}
        className={"slider"}
      >
        <animated.div
          style={{
            backgroundSize: "cover",
            ...cardSprings[0],
          }}
          className={"cardContainers cardContainer1"}
        >
          <div className="customer_review_card">
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
              <div className="customer_name">Card 0</div>
            </div>
          </div>
        </animated.div>
        <animated.div
          style={{
            backgroundSize: "cover",
            ...cardSprings[1],
          }}
          className={"cardContainers cardContainer2"}
        >
          <div className="customer_review_card">
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
              <div className="customer_name">Card 1</div>
            </div>
          </div>
        </animated.div>
        <animated.div
          style={{
            backgroundSize: "cover",
            ...cardSprings[2],
          }}
          className={"cardContainers cardContainer3"}
        >
          <div className="customer_review_card">
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
              <div className="customer_name">Card 2</div>
            </div>
          </div>
        </animated.div>
        <animated.div
          style={{
            backgroundSize: "cover",
            ...cardSprings[3],
          }}
          className={"cardContainers cardContainer4"}
        >
          <div className="customer_review_card">
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
              <div className="customer_name">Card 3</div>
            </div>
          </div>
        </animated.div>
        <animated.div
          style={{
            backgroundSize: "cover",
            ...cardSprings[4],
          }}
          className={"cardContainers cardContainer5"}
        >
          <div className="customer_review_card">
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
              <div className="customer_name">Card 4</div>
            </div>
          </div>
        </animated.div>
        <animated.div
          style={{
            backgroundSize: "cover",
            ...cardSprings[5],
          }}
          className={"cardContainers cardContainer6"}
        >
          <div className="customer_review_card">
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
              <div className="customer_name">Card 5</div>
            </div>
          </div>
        </animated.div>
        <animated.div
          style={{
            backgroundSize: "cover",
            ...cardSprings[6],
          }}
          className={"cardContainers cardContainer7"}
        >
          <div className="customer_review_card">
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
              <div className="customer_name">Card 6</div>
            </div>
          </div>
        </animated.div>
        <animated.div
          style={{
            backgroundSize: "cover",
            ...cardSprings[7],
          }}
          className={"cardContainers cardContainer8"}
        >
          <div className="customer_review_card">
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
              <div className="customer_name">Card 7</div>
            </div>
          </div>
        </animated.div>
        <animated.div
          style={{
            backgroundSize: "cover",
            ...cardSprings[8],
          }}
          className={"cardContainers cardContainer9"}
        >
          <div className="customer_review_card">
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
              <div className="customer_name">Card 8</div>
            </div>
          </div>
        </animated.div>
        <animated.div
          style={{
            backgroundSize: "cover",
            ...cardSprings[9],
          }}
          className={"cardContainers cardContainer10"}
        >
          <div className="customer_review_card">
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
              <div className="customer_name">Card 9</div>
            </div>
          </div>
        </animated.div>
        <animated.div
          style={{
            backgroundSize: "cover",
            ...cardSprings[10],
          }}
          className={"cardContainers cardContainer11"}
        >
          <div className="customer_review_card">
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
              <div className="customer_name">Card 10</div>
            </div>
          </div>
        </animated.div>
        <animated.div
          style={{
            backgroundSize: "cover",
            ...cardSprings[11],
          }}
          className={"cardContainers cardContainer12"}
        >
          <div className="customer_review_card">
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
              <div className="customer_name">Card 11</div>
            </div>
          </div>
        </animated.div>
        <animated.div
          style={{
            backgroundSize: "cover",
            ...cardSprings[12],
          }}
          className={"cardContainers cardContainer13"}
        >
          <div className="customer_review_card">
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
              <div className="customer_name">Card 12</div>
            </div>
          </div>
        </animated.div>
        <animated.div
          style={{
            backgroundSize: "cover",
            ...cardSprings[13],
          }}
          className={"cardContainers cardContainer14"}
        >
          <div className="customer_review_card">
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
              <div className="customer_name">Card 13</div>
            </div>
          </div>
        </animated.div>
        <animated.div
          style={{
            backgroundSize: "cover",
            ...cardSprings[14],
          }}
          className={"cardContainers cardContainer15"}
        >
          <div className="customer_review_card">
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
              <div className="customer_name">Card 14</div>
            </div>
          </div>
        </animated.div>
      </animated.div>
    </>
  );
};

export default TrialCarousel;
