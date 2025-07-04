'use client';
import { menuItems } from "@/constants";
import { TMenuItem } from "../types";
import { ActiveLink } from "../common";
import { useAuth, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "../common/ModeToggle";
import Link from "next/link";
import { IconUsers } from "../icons";

const Sidebar = () => {
    const { userId } = useAuth();

    return (<div className="hidden p-5 border-r borderDarkMode bgDarkMode lg:flex flex-col fixed top-0 left-0 bottom-0 w-[300px]">
        <a href="/" className="font-bold text-3xl inline-block mb-5">
            <span className="text-primary">U</span>
            cademy
        </a>
        <ul className="flex flex-col gap-2">
            {menuItems.map((item, index) => (
                <MenuItem key={index} url={item.url} title={item.title} icon={item.icon}></MenuItem>
            ))}
        </ul>
        <div className="mt-auto flex items-center justify-end gap-5">
            <ModeToggle></ModeToggle>
            {!userId ? <Link href="/sign-in" className="size-10 rounded-lg bg-primary text-white flex items-center justify-center p-1">
                <IconUsers />
            </Link> : (<UserButton />)}
        </div>
    </div>);
}

export function MenuItem({ url = "/", title = "", icon, onlyIcon }: TMenuItem) {
    return (
        <li>
            <ActiveLink url={url}>
                {icon} {onlyIcon ? null :title}
            </ActiveLink>
        </li>
    )
}

export default Sidebar;