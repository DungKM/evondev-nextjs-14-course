import Image from "next/image"
import Link from "next/link"
import { IconClock, IconEye, IconStar } from "../icons"
import { ICourse } from "@/app/database/course.model";
import { commonClassNames } from "@/constants";
const CourseItem = ({ data, cta, url = "" }: { data: ICourse, cta?: string, url?: string }) => {
    const courseInfo = [
        {
            title: data.views,
            icon: (classname?: string) => <IconEye className={classname}></IconEye>,
        },
        {
            title: data.rating[0],
            icon: (classname?: string) => <IconStar className={classname}></IconStar>,
        },
        {
            title: "30h25p",
            icon: (classname?: string) => <IconClock className={classname}></IconClock>,
        }
    ];
    const courseUrl = url || `/course/${data.slug}`;
    return (
        <div className="bg-white dark:bg-grayDarker border p-4 border-gray-200 rounded-2xl flex flex-col">
            <Link href={courseUrl} className="block h-[180px] relative">
                <Image src={data.image} width={600} height={400} sizes="@media (min-width: 640) 300px, 100vw" priority alt="#" className="w-full h-full object-cover rounded"></Image>
                <span className="inline-block px-3 py-1 rounded-full absolute top-3 right-3 z-10 text-white font-medium bg-green-500 text-xs">New</span>
            </Link>
            <div className="pt-4 flex flex-col flex-1">
                <h3 className="font-bold text-lg mb-5">{data.title}</h3>
                <div className="mt-auto">
                    <div className="flex items-center gap-3 mb-5 text-xs text-gray-500 darK:text-grayDark">
                        {courseInfo.map((item, index) => (
                            <div key={index} className="flex items-center gap-2">
                                {item.icon("size-4")}
                                <span>{item.title}</span>
                            </div>
                        ))}
                        <span className="font-bold text-primary ml-auto text-base"> {data.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                    </div>
                    <Link href={courseUrl} className={commonClassNames.btnPrimary}>{cta || "Xem chi tiết"}</Link>
                </div>
            </div>
        </div>
    )
}

export default CourseItem