import TailwindAnimate from "tailwindcss-animate";

export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderWidth: {
        3: "3px",
      },
      colors: {
        // Millat color scheme
        primary: "#111e2b",
        secondary: "#606b8b",
        white: "#ffffff",
        brand: "#ffcb69",
        "white-hover": "#f2f3f5",
        divider: "#ebedf1",
        yellow: "#ffbd14",
        "yellow-1": "#f39c12",
        red: "#f74c39",
        blue: "#347bdf",
        "blue-1": "#047bf3",
        violet: "#8938fa",
        orange: "#e59500",
        "orange-2": "#f39c121f",
        green: "#13bd62",
        "green-excel": "#3a6c46",
        "gray-1": "#8e9ba8",
        "gray-2": "#8994b0",
        "gray-3": "#b4b9cb",
        "gray-4": "#e6e8ec",
        "gray-5": "#f2f3f5",
        "blue-male": "#2e77e5",
        "pink-female": "#e52ed9",
        "sidebar-hover": "#1c2836",

        // Input colors
        input: "#f2f3f5",
        "input-border": "#e6e8ec",
        "input-placeholder": "#b4b9cb",
        "input-disabled": "#e6e8ec",
        "input-focus": "#ffcb69",
        "input-text": "#606b8b",

        // Toast colors
        toast: "#111e2b",
        "toast-text": "#ffffff",
        "toast-border": "#gray-700",
        "toast-icon": "#b4b9cb",

        // Table colors
        "table-even-row": "#f2f3f5",
        "table-row-hover": "#e6e8ec",

        // Legacy colors for compatibility
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
        dark: {
          black: "#090E14",
          DEFAULT: "#061018",
          1: "#111014",
          2: "#090E14",
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
