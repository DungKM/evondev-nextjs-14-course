import { Roboto, Manrope } from "next/font/google";

const roboto = Roboto({subsets: ["latin"], weight: ["100", "300", "400", "500", "700", "900"],variable: "--font-roboto"
});
const manrope = Manrope({subsets: ["latin"], variable: "--font-manrope"});

export {manrope, roboto};