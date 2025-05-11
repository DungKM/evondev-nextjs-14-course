"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Textarea } from "../ui/textarea"
import { ECourseLevel, ECourseStatus } from "../types/enums"
import { updateCourse } from "@/lib/actions/course.action"
import { ICourse } from "@/app/database/course.model"
import { toast } from "react-toastify"
const formSchema = z.object({
    title: z.string().min(10, "Tên khóa học phải có ít nhất 10 ký tự"),
    slug: z.string().optional(),
    price: z.number().int().positive().optional(),
    sale_price: z.number().int().positive().optional(),
    intro_url: z.string().optional(),
    desc: z.string().optional(),
    image: z.string().optional(),
    status: z.enum([ECourseStatus.APPROVED, ECourseStatus.PENDING, ECourseStatus.REJECTED]).optional(),
    level: z.enum([ECourseLevel.BEGINNER, ECourseLevel.INTERMEDIATE, ECourseLevel.ADVANCED]).optional(),
    info: z.object({
        requirements: z.string().optional(),
        benefits: z.array(z.string()).optional(),
        qa: z.array(z.object({
            question: z.string().optional(),
            answer: z.string().optional(),
        })).optional(),
    })
});

const CourseUpdate = ({ data }: { data: ICourse }) => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: data.title,
            slug: data.slug,
            price: data.price,
            sale_price: data.sale_price,
            intro_url: data.intro_url,
            desc: data.desc,
            image: data.image,
            status: data.status,
            level: data.level,
        },
    })
    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        setIsSubmitting(true)
        try {
            const res= await updateCourse({
                slug: data.slug,
                updateData: {
                    title: values.title,
                    slug: values.slug,
                    price: values.price,
                    sale_price: values.sale_price,
                    intro_url: values.intro_url,
                    desc: values.desc,
                }
            });
            if(values.slug){
                router.replace(`/manage/course/update?slug=${values.slug}`);
            }
            if (res?.success) {
                toast.success(res.message);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsSubmitting(false);
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
                <div className="grid grid-cols-2 gap-8 mt-10 mb-8">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tên khóa học*</FormLabel>
                                <FormControl>
                                    <Input placeholder="Tên khóa học" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="slug"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Đường dẫn khóa học</FormLabel>
                                <FormControl>
                                    <Input placeholder="khoa-hoc-lap-trinh" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Giá khuyến mãi</FormLabel>
                                <FormControl>
                                    <Input type="numeber" placeholder="599.000" {...field}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="sale_price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Giá gốc</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="999.000" {...field}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="desc"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Mô tả khóa học</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Nhập mô tả..." {...field} className="h-[200px]" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Ảnh đại diện</FormLabel>
                                <FormControl>
                                    <div className="h-[200px] bg-white border rounded-md border-gray-200"></div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="intro_url"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Đường dẫn video</FormLabel>
                                <FormControl>
                                    <Input placeholder="https://youtube.com/axfgh" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Trạng thái</FormLabel>
                                <FormControl>
                                    <Input placeholder="https://youtube.com/axfgh" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="level"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Trình độ</FormLabel>
                                <FormControl>
                                    <Input placeholder="https://youtube.com/axfgh" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="info.requirements"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Yêu cầu</FormLabel>
                                <FormControl></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="info.benefits"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Lợi ích</FormLabel>
                                <FormControl></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="info.qa"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Question/Answer</FormLabel>
                                <FormControl></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button isLoading={isSubmitting} variant={"primary"} type="submit" className="w-[150px]">Cập nhật khóa học</Button>
            </form>
        </Form>
    )
}

export default CourseUpdate