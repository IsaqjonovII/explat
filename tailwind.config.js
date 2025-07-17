import TailwindAnimate from "tailwindcss-animate";

export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderWidth: {
        3: "3px",
      },
      colors: {
        stats: {
          "blue-light": "#4489F7",
          green: "#23DB9F",
          blue: "#59B8FD",
          "green-light": "#73CF11",
          violet: "#B36CFB",
          orange: "#FD9459",
          purple: "#C2278D",
          red: "#FF5252",
        },
        primary: {
          DEFAULT: "#2E77E5",
        },
        white: {
          DEFAULT: "#FFFFFF",
          1: "#F3F5F4",
          2: "#EDF0F2",
        },
        dark: {
          black: "#090E14",
          DEFAULT: "#061018",
          1: "#111014",
          2: "#090E14",
        },
        blue: {
          DEFAULT: "#2684FC",
          dark: "#2E77E5",
          light: "#519DFD",
        },
        gray: {
          neutral: "#8E9BA8",
          0: "#818B88",
          1: "#9096A7",
          3: "#D1D5D3",
          2: "#B3B9B7",
          4: "#E1E3E2",
          5: "#4C4C49",
          6: "#F5F6F7",
          7: "#ebeceb",
          8: "#596066",
          9: "#F2F2F2",
          10: "#9096A6",
          light: "#9AA2A0",
          main: {
            DEFAULT: "#4D696E",
          },
        },
        red: {
          DEFAULT: "#E52E30",
          1: "#D0413A",
          light: "#D96761",
          secondary: "#FEF5F5",
        },
        orange: {
          DEFAULT: "#F39C12",
          light: "#F5B041",
        },
        green: {
          DEFAULT: "#4CD03A",
        },
        yellow: {
          DEFAULT: "#E4AB10",
          dark: "#DFBD40",
        },
      },
      lineHeight: {
        normal: "normal",
        130: "130%",
      },
      fontFamily: {
        roboto: ["Roboto"],
      },
      fontSize: {
        10: "0.625rem", // 10px
        13: "13px", // 13px
        "4.5xl": "2.5rem", // 40px
        "3.5xl": "2rem", // 32px
      },
      borderRadius: {
        "2lg": "10px",
      },
      boxShadow: {
        "tab-item": "0px 4px 8px 0px rgba(18, 28, 37, 0.10)",
        blue: "0px 4px 10px rgba(38, 132, 252, 0.50)",
      },
    },
  },
  plugins: [TailwindAnimate],
};
