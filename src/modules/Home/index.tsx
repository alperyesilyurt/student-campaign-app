import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
// @ts-ignore
import AnimatedText from "../../components/animated/AnimatedText";
import "./styles.scss";
import { Image } from "@chakra-ui/react";

export default function Home() {
  const [replay, setReplay] = useState(true);
  const [textIndex, setTextIndex] = useState(0);
  // Placeholder text data, as if from API
  const placeholderText = [
    [
      { type: "heading1", text: "Unilife Application" },
      {
        type: "heading2",
        text: "Have a great university experience",
      },
    ],
    [
      { type: "heading1", text: "Unilife Application" },
      {
        type: "heading2",
        text: "Enjoy your university life",
      },
    ],
    [
      { type: "heading1", text: "Unilife Application" },
      {
        type: "heading2",
        text: "Tell your friends about us.",
      },
    ],
  ];

  const container = {
    visible: {
      transition: {
        staggerChildren: 0.025,
      },
    },
  };

  // Quick and dirt for the example
  const handleReplay = () => {
    setReplay(!replay);
    setTimeout(() => {
      setReplay(true);
    }, 600);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleReplay();
      if (textIndex === placeholderText.length - 1) {
        setTextIndex(0);
      } else {
        setTextIndex(textIndex + 1);
      }
    }, 6670);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="home-animation">
      <motion.div
        className={"App"}
        initial="hidden"
        animate={replay ? "visible" : "hidden"}
        variants={container}
      >
        <div className="container">
          {placeholderText[textIndex].map((item, index) => {
            return <AnimatedText {...item} key={index} />;
          })}
        </div>
      </motion.div>
      <motion.div>
        <Image
          w={"lg"}
          h={"sm"}
          borderRadius={"xl"}
          src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80"
        ></Image>
      </motion.div>
    </div>
  );
}
