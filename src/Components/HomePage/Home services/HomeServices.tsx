import { useEffect, useState } from "react";
import styles from "./HomeServices.module.css";
import ServiceCard from "./ServiceCard";

const HomeServices = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove the event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles.service_container}>
      <ServiceCard
        containerVrnt={["service_containerA_Default", "detailesA_Default"]}
        textureVrnt={["ImgA", "ImgA2"]}
      />

      {/* COPY---------------------------------------------------------------- */}

      <ServiceCard
        containerVrnt={["service_containerA_Varient1", "detailesA_Varient1"]}
        textureVrnt={["ImgB", "ImgB2"]}
      />
    </div>
  );
};

export default HomeServices;
