import Image from "next/image"
import Link from "next/link"

const CourseItem = () => {
    return (
        <div className="bg-white border p-5 border-gray-200 rounded-lg">
            <Link href="#" className="block h-[200px]">
                <Image src="https://images.unsplash.com/photo-1746307415334-8914cae06a28?q=80&w=1984&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" width={600} height={400} sizes="@media (min-width: 640) 300px, 100vw" priority alt="#" className="w-full h-full object-cover rounded"></Image>
            </Link>
        </div>
    )
}

export default CourseItem