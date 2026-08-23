import React, { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Image from "next/image";
import featuredImage from "../../d7e3f658-ad2c-4625-a3eb-165e8d54403c.jpg";

const FeaturedVideo = ({refForward, ...props }) => {
  const ref = useRef(null);

  const variants = {
    initial: { scale: 1, x: 0, y: 0 },
    animate: { scale: 1.08, x: 0, y: 0 },
  };

  const { scrollYProgress } = useScroll({
    target: refForward,
    layoutEffect: false,
  });

  const [progress, setProgress] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setProgress(value);
  });

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="initial"
      animate={progress > 0.5 ? "animate" : "initial"}
      className="relative md:absolute mx-auto md:mx-0 mt-4 md:mt-0 md:top-[55vh] md:left-20 md:translate-x-0 md:translate-y-0 z-30 w-[82vw] md:w-[40vw] max-w-[22rem] md:max-w-[856px] aspect-[3/4] md:aspect-[856/1024] overflow-hidden rounded-3xl"
      {...props}
    >
      <Image
        src={featuredImage}
        alt="Featured portrait"
        fill
        priority
        sizes="(max-width: 768px) 80vw, 40vw"
        className="object-cover"
      />
    </motion.div>
  );
};

export default FeaturedVideo;
