'use client';
import { Editor } from '@tinymce/tinymce-react';
import { Editor as TinyMCEEditor } from 'tinymce';
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { ILesson } from '@/app/database/lesson.model'
import React, { use, useEffect, useRef } from 'react'
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { updateLesson } from "@/lib/actions/lesson.actions";
import { toast } from "react-toastify";
import { editorOptions } from '@/constants';
import { useTheme } from 'next-themes';
const LessonItemUpdate = ({ lesson }: { lesson: ILesson }) => {
    const editorRef = useRef<TinyMCEEditor | null>(null);
    const formSchema = z.object({
        slug: z.string().optional(),
        duration: z.number().optional(),
        video_url: z.string().optional(),
        content: z.string().optional(),
    });
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            slug: lesson.slug,
            duration: lesson.duration,
            video_url: lesson.video_url,
            content: lesson.content,
        },
    })
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const res = await updateLesson({
                lessonId: lesson._id,
                updateData: values,
            });
            if (res?.success) {
                toast.success("Cập nhật thành công");
            }
        } catch (error) {
            console.log(error);
        } finally {
        }
    }
    const theme = useTheme();

  useEffect(() => {
  if (editorRef.current) {
    editorRef.current.setContent(lesson.content || "");
  }
}, [lesson.content]);
    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-2 gap-8">
                        <FormField
                            control={form.control}
                            name="slug"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Đường dẫn</FormLabel>
                                    <FormControl>
                                        <Input placeholder="bai-1-tong-quan" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="duration"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Thời lượng</FormLabel>
                                    <FormControl>
                                        <Input placeholder="bai-1-tong-quan" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="video_url"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Video URL</FormLabel>
                                    <FormControl>
                                        <Input placeholder="http://youtube.com/abcxyz" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div></div>
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem className='col-start-1 col-end-3'>
                                    <FormLabel>Nội dung</FormLabel>
                                    <FormControl>
                                        <Editor
                                            apiKey={process.env.NEXT_PUBLIC_TINY_MCE_API_KEY}
                                            onInit={(_evt: unknown, editor: TinyMCEEditor) => {
                                                (editorRef.current = editor).setContent(
                                                    lesson.content || ""
                                                );
                                            }}
                                            value={field.value}
                                            {...editorOptions(field, theme)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex justify-end gap-5 items-center mt-8">
                        <Button type="submit">Cập nhật</Button>
                        <Link href="/" className="text-sm">Xem trước</Link>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default LessonItemUpdate