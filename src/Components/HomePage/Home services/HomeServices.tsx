import styles from "./HomeServices.module.css";

const HomeServices = () => {
  return (
    <div className={styles.service_containerA}>
      <div className={styles.detailesA}>
        <div className={styles.title_and_para}>
          <div className={styles.title}>
            Arrange for a <span className={styles.bold}>loved one</span>
          </div>
          <p className={styles.para}>
            Arrange cremation services online from the comfort of your home,
            saving you time, money and energy for what matters most—celebrating
            their life.
          </p>
        </div>
        <div className={styles.key_points}>
          <div className={styles.point}>
            <img
              className={styles.point_Img1}
              src="/Home_Service_Images/Img1.webp"
              alt=""
            />
            <p className={styles.point_line}>
              Arrange simple cremation services online in minutes.
            </p>
          </div>
          <div className={styles.point}>
            <img
              className={styles.point_Img2}
              src="/Home_Service_Images/Img2.webp"
              alt=""
            />
            <p className={styles.point_line}>
              Save thousands compared to traditional funeral homes.
            </p>
          </div>
          <div className={styles.point}>
            <img
              className={styles.point_Img3}
              src="/Home_Service_Images/Img3.webp"
              alt=""
            />
            <p className={styles.point_line}>
              The price you see is the price you pay. No hidden fees. Ever.
            </p>
          </div>
          <div className={styles.point}>
            <img
              className={styles.point_Img4}
              src="/Home_Service_Images/Img4.webp"
              alt=""
            />
            <p className={styles.point_line}>
              A dedicated care specialist to support you every step of the way.
            </p>
          </div>
        </div>
        <div className={styles.pricing_btn}>See pricing</div>
      </div>
      <img
        className={styles.imgA}
        src="/Home_Service_Images/ImgA.webp"
        alt=""
      />
    </div>
  );
};

export default HomeServices;
