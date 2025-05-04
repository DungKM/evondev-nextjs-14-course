import Image from "next/image"
import Link from "next/link"
import { IconClock, IconEye, IconStar } from "../icons"
const courseInfo = [
    {
        title: "3000",
        icon: (classname?: string) => <IconEye className={classname}></IconEye>,
    },
    {
        title: "5.0",
        icon: (classname?: string) => <IconStar className={classname}></IconStar>,
    },
    {
        title: "30h25p",
        icon: (classname?: string) => <IconClock className={classname}></IconClock>,
    }
];
const CourseItem = () => {
    return (
        <div className="bg-white border p-4 border-gray-200 rounded-2xl">
            <Link href="#" className="block h-[180px] relative">
                <Image src="https://images.unsplash.com/photo-1746307415334-8914cae06a28?q=80&w=1984&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" width={600} height={400} sizes="@media (min-width: 640) 300px, 100vw" priority alt="#" className="w-full h-full object-cover rounded"></Image>
                <span className="inline-block px-3 py-1 rounded-full absolute top-3 right-3 z-10 text-white font-medium bg-green-500 text-xs">New</span>
            </Link>
            <div className="p-4">
                <h3 className="font-bold text-lg mb-5">Khóa học NextJS Pro - Xây dựng E-Learning system hoàn chỉnh</h3>
                <div className="flex items-center gap-3 mb-5 text-xs text-gray-500">
                    {courseInfo.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                            {item.icon("size-4")}
                            <span>{item.title}</span>
                        </div>
                    ))}
                    <span className="font-bold text-primary ml-auto text-base">799.000</span>
                </div>
                <Link href="#" className="flex items-center justify-center w-full mt-10 rounded-lg text-white font-semibold bg-primary h-12">Xem chi tiết</Link>
            </div>
        </div>
    )
}

export default CourseItem