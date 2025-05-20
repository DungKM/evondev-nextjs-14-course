import Image from "next/image"
import Link from "next/link"
import { IconClock, IconEye, IconStar } from "../icons"
import { ICourse } from "@/app/database/course.model";
const CourseItem = ({data}: {data: ICourse} ) => {
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
    return (
        <div className="bg-white dark:bg-grayDarker border p-4 border-gray-200 rounded-2xl">
            <Link href={`/course/${data.slug}`} className="block h-[180px] relative">
                <Image src={data.image} width={600} height={400} sizes="@media (min-width: 640) 300px, 100vw" priority alt="#" className="w-full h-full object-cover rounded"></Image>
                <span className="inline-block px-3 py-1 rounded-full absolute top-3 right-3 z-10 text-white font-medium bg-green-500 text-xs">New</span>
            </Link>
            <div className="p-4">
                <h3 className="font-bold text-lg mb-5">{data.title}</h3>
                <div className="flex items-center gap-3 mb-5 text-xs text-gray-500 darK:text-grayDark">
                    {courseInfo.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                            {item.icon("size-4")}
                            <span>{item.title}</span>
                        </div>
                    ))}
                    <span className="font-bold text-primary ml-auto text-base">{data.price}</span>
                </div>
                <Link href={`/course/${data.slug}`} className="flex items-center justify-center w-full mt-10 rounded-lg text-white font-semibold bg-primary h-12">Xem chi tiết</Link>
            </div>
        </div>
    )
}

export default CourseItem