import { Roboto, Manrope } from "next/font/google";
import localFont from "next/font/local";
const roboto = Roboto({subsets: ["latin"], weight: ["100", "300", "400", "500", "700", "900"],variable: "--font-roboto"
});
const manrope = Manrope({subsets: ["latin"], variable: "--font-manrope"});
const poppins = localFont({
    src: [
        {
            path: "../app/fonts/Poppins-Regular.ttf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../app/fonts/Poppins-Medium.ttf",
            weight: "500",
            style: "normal",
        },
        {
            path: "../app/fonts/Poppins-Italic.ttf",
            weight: "400",
            style: "italic",
        }
    ],
    display: "swap",
    variable: "--font-poppins",
});
export {manrope, roboto, poppins};