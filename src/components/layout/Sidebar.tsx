const Sidebar = () => {
    return (<aside className="p-5 border-r border-gray-200">
        <a href="/" className="font-bold text-3xl inline-block mb-5">
            Ucademy
        </a>
        <ul>
            <MenuItem url="/" title="Khu vực học tập"></MenuItem>
            <MenuItem url="/explore" title="Kham phá"></MenuItem>
            {/* <MenuItem></MenuItem> */}
        </ul>
    </aside>);
}

function MenuItem({ url = "/", title = "" }: { url?: string, title?: string }) {
    return (
        <li>
            <a href={url} className="p-3 rounded-md flex items-center">{title}</a>
        </li>
    )
}

export default Sidebar;