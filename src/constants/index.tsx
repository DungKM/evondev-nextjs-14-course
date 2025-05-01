import IconExplore from "@/components/layout/icons/IconExplore";
import IconPlay from "@/components/layout/icons/IconPlay";

export const menuItems: {
    url: string;
    title: string;
    icon: React.ReactNode;
}[] = [
        {
            url: "/",
            title: "Khu vực học tập",
            icon: <IconPlay className="size-5"></IconPlay>,
        },
        {
            url: "/explore",
            title: "Khám phá",
            icon: <IconExplore className="size-5"></IconExplore>,
        }
    ];