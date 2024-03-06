import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

// function pullRelease() {}

function ReactGesturesWithSpring() {
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));

  const bind = useDrag(({ down, offset: [mx, my] }) => {
    api.start({
      x: down ? mx : mx,
      y: down ? my : my,
      immediate: down,
    });
  });
  return (
    <animated.div
      {...bind()}
      style={{
        x,
        y,
        width: 80,
        height: 80,
        background: "pink",
        borderRadius: 8,
      }}
    />
  );
}

export default ReactGesturesWithSpring;
