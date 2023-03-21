import React from "react";
import { chakra, keyframes } from "@chakra-ui/react";

const floatAnimation = keyframes`
  0% { transform: translate(0,  0px); }
  50% { transform: translate(0, 15px); }
  100% { transform: translate(0, -0px); }
`;
const FloatingSvg = chakra("svg", {
  baseStyle: {
    animationName: floatAnimation,
    animationDuration: "3s",
    animationIterationCount: "infinite",
    animationTimingFunction: "ease-in-out",
  },
});
function UnilifeGlob() {
  return (
    <div>
      <style
        dangerouslySetInnerHTML={{
          __html:
            "\n  .float {  \n    animation-name: ani-float;\n    animation-duration: 3s;\n    animation-iteration-count: infinite;\n    animation-timing-function: ease-in-out; \n  }\n \n  @keyframes ani-float {\n    0% { transform: translate(0,  0px); }\n    50% { transform: translate(0, 15px); }\n    100% { transform: translate(0, -0px); }    \n  }\n",
        }}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={200}
        height={200}
        viewBox="-25 -25 250 250"
        className="float"
      >
        <defs>
          <linearGradient id="lgrad" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop
              offset="0%"
              style={{ stopColor: "#00FF84", stopOpacity: 1.0 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#008EE6", stopOpacity: 1.0 }}
            />
          </linearGradient>
        </defs>
        <path
          d="M177.1567537799682 36.38525842120113 C129.94838842907765 20.037178385528545 18.506067407463213 120.658540044398 28.251734057191427 169.65763658207197 C32.606253095953704 191.55121312477073 90.5067428466541 202.990872434381 112.5074545102366 199.21473470041818 C138.3469590990986 194.779717788378 184.9965203118156 158.02911958009815 194.22542739763043 133.48983176628215 C202.9020137288207 110.41914232898567 200.44805094119445 44.45094735781623 177.1567537799682 36.38525842120113Z"
          stroke="none"
          fill="url(#lgrad)"
        />
      </svg>
    </div>
  );
}
const MemoizedUinilfeGlob = React.memo(UnilifeGlob);

export default MemoizedUinilfeGlob;

/*  <FloatingSvg
      xmlns="http://www.w3.org/2000/svg"
      width={200}
      height={200}
      viewBox="-25 -25 250 250"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={200}
        height={200}
        viewBox="-25 -25 250 250"
        className="float"
      >
        <defs>
          <linearGradient id="lgrad" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop
              offset="0%"
              style={{ stopColor: "#00FF84", stopOpacity: 1.0 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#008EE6", stopOpacity: 1.0 }}
            />
          </linearGradient>
        </defs>
        <path
          d="M177.1567537799682 36.38525842120113 C129.94838842907765 20.037178385528545 18.506067407463213 120.658540044398 28.251734057191427 169.65763658207197 C32.606253095953704 191.55121312477073 90.5067428466541 202.990872434381 112.5074545102366 199.21473470041818 C138.3469590990986 194.779717788378 184.9965203118156 158.02911958009815 194.22542739763043 133.48983176628215 C202.9020137288207 110.41914232898567 200.44805094119445 44.45094735781623 177.1567537799682 36.38525842120113Z"
          stroke="none"
          fill="url(#lgrad)"
        />
      </svg>
    </FloatingSvg>  */
