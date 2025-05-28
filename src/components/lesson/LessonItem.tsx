'use client';
import { IconPlay } from '../icons'
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Checkbox } from '../ui/checkbox';
import { createHistory } from '@/lib/actions/history.action';

const LessonItem = ({ lesson, url, isActive = false, isChecked = false }: { lesson: { title: string; duration: number, course: string, _id: string }, url?: string, isActive?: boolean, isChecked?: boolean }) => {
    const handlleCompleteLesson = async (checked: boolean | string) => {
         try {
            await createHistory({
                course: lesson.course,
                lesson: lesson._id,
                checked
            });
            console.log(lesson.course)
            console.log(lesson._id)
         } catch (error) {
            console.log(error)
         }
    };
    return (
        <div className={cn("flex items-center gap-2 bgDarkMode border borderDarkMode rounded-lg p-4 text-sm font-bold", isActive ? 'text-primary font-semibold pointer-events-none' : '')}>
            {url && <Checkbox defaultChecked={isChecked} className='flex-shrink-0 size-4' 
            onCheckedChange={(checked) => handlleCompleteLesson(checked)}
            />}
            <IconPlay className='size-5 flex-shrink-0' />
            {url ? (
                <Link href={url} className='line-clamp-1'>
                    {lesson.title}
                </Link>
            ) : (
                <>
                    <h4 className='line-clamp-1'>{lesson.title}</h4>
                </>
            )}
            <span className='ml-auto  text-sm font-semibold'>{Math.floor(lesson.duration)} phút</span>
        </div>
    )
}

export default LessonItem