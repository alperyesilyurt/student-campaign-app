// The code above is used to get the size of the window. It is used in order to get the screen size of the user. The function is called useWindowSize and it is used by importing it from the react library. The function is used by calling it in the code and assigning it to a variable. The variable is called windowSize and it is assigned to the function. The function is called on an event listener which is triggered when the user resizes the window. This is done by using the window.addEventListener method. The function is also called in order to set the initial window size. This is done by calling the function inside the useEffect method. The useEffect method is called on the component mount. The useEffect method is called with an array of dependencies. This is done in order to avoid an infinite loop. The array of dependencies will only run the useEffect method when the size of the window changes. The useEffect method will call the handleResize function when the window is resized. The handleResize function will set the windowSize variable to the new window size. The windowSize variable is an object with two properties: width and height. The width property will be set to the innerWidth of the window. The height property will be set to the innerHeight of the window. The innerWidth and innerHeight properties are used to get the width and height of the window. The windowSize variable will then be set to this object. The function will return the windowSize variable, which will be an object with the window width and height.

import { useEffect, useState } from "react";

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState<{
    width: number | undefined;
    height: number | undefined;
  }>({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [windowSize]);
  return windowSize;
}
