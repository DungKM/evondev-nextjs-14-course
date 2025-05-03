import {IconExplore, IconPlay} from "@/components/icons";
import { TMenuItem } from "@/components/types";

export const menuItems: TMenuItem[] = [
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