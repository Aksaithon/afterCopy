import "./BeforeAfterComp.css";

const BeforeAfterComp = () => {
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
              <div className="beforeCardDsplyImg"></div>
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
              <div className="afterCardDsplyImg"></div>
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
