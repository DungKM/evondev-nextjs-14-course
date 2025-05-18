import { IconComment, IconExplore, IconOrder, IconPlay, IconStudy, IconUsers } from "@/components/icons";
import { TMenuItem } from "@/components/types";
import { ECourseLevel, ECourseStatus } from "@/components/types/enums";

export const menuItems: TMenuItem[] = [
    {
        url: "/",
        title: "Khám phá",
        icon: <IconPlay className="size-5"></IconPlay>,
    },
    {
        url: "/study",
        title: "Khu vực học tập",
        icon: <IconStudy className="size-5"></IconStudy>,
    },
    {
        url: "/manage/course",
        title: "Quản lý khóa học",
        icon: <IconExplore className="size-5"></IconExplore>,
    },
    {
        url: "/manage/member",
        title: "Quản lý thành viên",
        icon: <IconUsers className="size-5"></IconUsers>,
    },
    {
        url: "/manage/order",
        title: "Quản lý đơn hàng",
        icon: <IconOrder className="size-5"></IconOrder>,
    },
    {
        url: "/manage/comment",
        title: "Quản lý bình luận",
        icon: <IconComment className="size-5"></IconComment>,
    }
];
export const courseStatus: { title: string; value: ECourseStatus }[] = [
    {
        title: "Đã duyệt",
        value: ECourseStatus.APPROVED
    },
    {
        title: "Chờ duyệt",
        value: ECourseStatus.PENDING
    },
    {
        title: "Từ chối",
        value: ECourseStatus.REJECTED
    }
]
export const courseLevel: { title: string; value: ECourseLevel }[] = [
    {
        title: "Dễ",
        value: ECourseLevel.BEGINNER
    },
    {
        title: "Trung bình",
        value: ECourseLevel.INTERMEDIATE
    },
    {
        title: "Khó",
        value: ECourseLevel.ADVANCED
    }
]
export const CourseLevelTitle: Record<ECourseLevel, string> = {
    [ECourseLevel.BEGINNER]: "Dễ",
    [ECourseLevel.INTERMEDIATE]: "Trung bình",
    [ECourseLevel.ADVANCED]: "Khó",

}