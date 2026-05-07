"use client";

import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AnimatedButton() {
  const [isPressed, setIsPressed] = useState(false);
  const router = useRouter();

  return (
    <motion.button
      animate={isPressed ? "pressed" : "idle"}
      className="bg-blue-500 p-2"
      variants={{
        idle: { scale: 1 },
        pressed: { scale: 0.9 },
      }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      onClick={() => {
        console.log("?");
        setIsPressed(true);
      }}
      onAnimationComplete={(definition) => {
        if (definition === "pressed") {
          router.push("abc");
        }
      }}
    >
      Click me
    </motion.button>
  );
}
