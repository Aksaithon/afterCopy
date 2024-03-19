import "./BeforeAfterComp.css";

import { useRef, useEffect } from "react";

const BeforeAfterComp = () => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= (window.innerWidth < 767 ? 1 : 0.68)) {
          // Trigger your desired animation here
          const img1 = document.getElementsByClassName("before-small-img1")[0];
          const img2 = document.getElementsByClassName("before-small-img2")[0];

          img1.classList.add("change_top_and_opacity");
          img2.classList.add("change_top_and_opacity");
        }

        if (entry.intersectionRatio == 0) {
          // alert('BEfore card IS INVISIBLE')
          const img1 = document.getElementsByClassName("before-small-img1")[0];
          const img2 = document.getElementsByClassName("before-small-img2")[0];

          img1.classList.remove("change_top_and_opacity");
          img2.classList.remove("change_top_and_opacity");
        }
      },
      {
        threshold: [0, window.innerWidth < 767 ? 1 : 0.68],
      }
    );
    const observer2 = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= (window.innerWidth < 767 ? 1 : 0.68)) {
          // Trigger desired animation here

          const img1 = document.getElementsByClassName("after-small-img1")[0];
          const img2 = document.getElementsByClassName("after-small-img2")[0];

          img1.classList.add("change_top_and_opacity");
          img2.classList.add("change_top_and_opacity");
        }

        if (entry.intersectionRatio == 0) {
          // alert('BEfore card IS INVISIBLE')
          const img1 = document.getElementsByClassName("after-small-img1")[0];
          const img2 = document.getElementsByClassName("after-small-img2")[0];

          img1.classList.remove("change_top_and_opacity");
          img2.classList.remove("change_top_and_opacity");
        }
      },
      {
        threshold: [0, window.innerWidth < 767 ? 1 : 0.68],
      }
    );

    if (ref1.current) {
      observer.observe(ref1.current);
    }
    if (ref2.current) {
      observer2.observe(ref2.current);
    }

    return () => {
      if (ref1.current) {
        observer.unobserve(ref1.current);
      }
      if (ref2.current) {
        observer2.unobserve(ref2.current);
      }
    };
  }, []);

  return (
    <>
      <div className="comparison_Component">
        <div className="texture1"></div>
        <div className="title_and_BeforeAfterCards_Container">
          <div className="title">
            <span className="calloutText">Forget everything</span>
            <br /> you know about funerals
          </div>
          <div className="BeforeAfterCards_Container">
            <div className="beforeCard ">
              <div ref={ref1} className="beforeCardDsplyImg"></div>
              <div className="before-small-img1"></div>
              <div className="before-small-img2"></div>
              <div className="before_card_texts">
                <div className="beforeTitle">Before</div>
                <div className="before_textStack">
                  <p>Expensive, outdated pricing structures</p>
                  <p>Hidden fees extra costs</p>
                  <p>Disruptive process with mandatory funeral home visits</p>
                  <p>Commision-based sales people</p>
                  <p>Same approch since 1961</p>
                </div>
              </div>
            </div>
            <div className="afterCard ">
              <div ref={ref2} className="afterCardDsplyImg"></div>
              <div className="after-small-img1"></div>
              <div className="after-small-img2"></div>
              <div className="after_card_texts">
                <img
                  className="afterTitleImg"
                  src="/AfterTitleImg.svg"
                  alt=""
                />
                <div className="after_textStack">
                  <p>Simple, affordable pricing</p>
                  <p>No hidden fees or extra costs</p>
                  <p>Easy online arrangements</p>
                  <p>Dedicated care team available 24/7</p>
                  <p>Same credentials, a whole new approach</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="texture2"></div>
      </div>
    </>
  );
};

export default BeforeAfterComp;
