import type { Config } from "tailwindcss";
import plugin  from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      width: {
        "full-xl": "calc(100% + 0.8rem)",
        "full-2xl": "calc(100% + 1.4rem)",
        "full-5": "calc(100% - 2.50rem)",
      },
      keyframes: {
        coin6: {
          'from': { transform: 'translateY(0%)', top:'74%', filter: "blur(10px)", opacity: "0", scale: "1", position: "absolute", pointerEvents: "none" },
        },
        coin5: {
          'from': { transform: 'translateY(0%)', top:'74%', filter: "blur(4px)", scale: "1", position: "absolute", pointerEvents: "none"  },
        },
        coin4: {
          'from': { transform: 'translateY(10%)',  top:'59%', filter: "blur(1px)", scale: "1.2", position: "absolute", pointerEvents: "none"  },
        },
        coin3: {
          'from': { transform: 'translateY(15%)', top:'43%', filter: "blur(0px)", scale: "1.3", position: "absolute", pointerEvents: "none"  },
        },
        coin2: {
          'from': { transform: 'translateY(10%)', top:'28%', filter: "blur(2px)", scale: "1.2", position: "absolute", pointerEvents: "none"  },
        },
        coin1: {
          'from': { transform: 'translateY(0%)', top:'22%', filter: "blur(8px)", scale: "1", position: "absolute", pointerEvents: "none"  },
        },
        coin0: {
          'from': { transform: 'translateY(0%)', top:'22%', filter: "blur(10px)",opacity: "0", scale: "1" , position: "absolute", pointerEvents: "none" },
        },
        coin1Add:{
          'from': { transform: 'translate(-15%, 15%)', top:'43%', filter: "blur(10px)", opacity: "0", scale: "1.3", position: "absolute", pointerEvents: "none"  },
        },
        coin4Add:{
          '0%': { transform: 'translateY(0%)', top:'74%', filter: "blur(4px)", scale: "1", position: "absolute", pointerEvents: "none"  },
          '20%': { opacity: '0'},
          '30%': { opacity: '0', transform: 'translateY(10%)',  top:'59%', filter: "blur(1px)", scale: "1.2", position: "absolute", pointerEvents: "none"  },
          '75%': { opacity: '0'},
          // '100%': { transform: 'translateY(10%)',  top:'59%', filter: "blur(1px)", scale: "1.2", position: "absolute", pointerEvents: "none"  },
        },
        coin1Delete:{
          'from': { transform: 'translate(0%, 15%)', top:'43%', filter: "blur(0px)", opacity: "1", scale: "1.3", position: "absolute", pointerEvents: "none"  },
        },
        fromW100:{
          'from': { width: '100%'},
        },
        fromW50:{
          'from': { width: '50%'},
        },
        fromW0:{
          'from': { padding:'80px 0px 20px 0px', width: '0%', marginLeft:'0rem', opacity: '0'}
        },
        fromP5:{
          'from':{ paddingTop:'80px 20px 20px 20px 20px', width: '50%', marginLeft:'0.5rem', opacity: '1'}
        },
        fromIndex1:{
          'from':{ transform: 'translateX(-280%)', width: "120px", fontSize:"120px", position: "absolute"}
        },
        fromIndex2:{
          'from':{ transform: 'translateX(0%)', width: "120px", fontSize:"100px", position: "absolute"}
        },
        fromIndex3:{
          'from':{ transform: 'translateX(100%)', width: "120px", fontSize:"80px", position: "absolute"}
        },
        fromIndex4:{
          'from':{  transform: 'translateX(180%)', width: "120px", fontSize:"50px", position: "absolute"}
        },
        fromIndex5:{
          'from':{ transform: 'translateX(230%)', width: "120px", fontSize:"30px", position: "absolute"}
        },
        fromIndex6:{
          'from':{ transform: 'translateX(300%)', opacity:"0", width: "120px", fontSize:"10px", position: "absolute"}
        }
      },
      animation: {
        coin4: 'coin4 0.5s ease-in-out 1 forwards',
        coin3: 'coin3 0.5s ease-in-out 1 forwards',
        coin2: 'coin2 0.5s ease-in-out 1 forwards',
        coin1: 'coin1 0.5s ease-in-out 1 forwards',
        coin0: 'coin0 0.5s ease-in-out 1 forwards',
        coin5: 'coin5 0.5s ease-in-out 1 forwards',
        coin6: 'coin6 0.5s ease-in-out 1 forwards',
        coin1Add: 'coin1Add 0.5s ease-in-out 1 forwards',
        coin4Add: 'coin4Add 0.5s ease-in-out 1 forwards',
        coin1Delete: 'coin1Delete 0.5s ease-in-out 1 forwards',
        fromW100: 'fromW100 0.5s ease-in-out 1 forwards',
        fromW50: 'fromW50 0.5s ease-in-out 1 forwards',
        fromW0: 'fromW0 0.5s ease-in-out 1 forwards',
        fromP5: 'fromP5 0.5s ease-in-out 1 forwards',
        fromIndex1: 'fromIndex1 0.5s ease-in-out 1 forwards',
        fromIndex2: 'fromIndex2 0.5s ease-in-out 1 forwards',
        fromIndex3: 'fromIndex3 0.5s ease-in-out 1 forwards',
        fromIndex4: 'fromIndex4 0.5s ease-in-out 1 forwards',
        fromIndex5: 'fromIndex5 0.5s ease-in-out 1 forwards',
        fromIndex6: 'fromIndex6 0.5s ease-in-out 1 forwards',
      }
    },
  },
  plugins: [
  ]
};
export default config;
