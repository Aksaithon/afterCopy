import { useSpring, animated } from "@react-spring/web";

import "./React-Spring.css";

export default function MySpringAnim() {
  const [springs, api] = useSpring(() => ({
    from: { x: 0 },
  }));

  //   or 👇🏽
  //   const [springs, api] = useSpring(() => {
  //     return {
  //       from: {
  //         x: 0,
  //       },
  //     };
  //   });

  const handleClick = () => {
    api.start({
      from: { x: 0 },
      to: { x: 100 },
    });
  };

  return (
    <animated.div
      onClick={handleClick}
      style={{
        width: 80,
        height: 80,
        background: "#ff6d6d",
        borderRadius: 8,
        ...springs,
      }}
    />
  );
}
