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
                checked,
                path: url || '/'
            });
         } catch (error) {
            console.log(error)
         }
    };
    return (
        <div className={cn("flex items-center gap-2 bgDarkMode border borderDarkMode rounded-lg p-4 text-sm font-medium", isActive ? 'text-primary font-bold' : '')}>
            {url && <Checkbox defaultChecked={isChecked} className='flex-shrink-0 size-4' 
            onCheckedChange={(checked) => handlleCompleteLesson(checked)}
            />}
            <IconPlay className='size-5 flex-shrink-0' />
            {url ? (
                <Link href={url} className={cn("line-clamp-1", isActive && 'pointer-events-none')}>
                    {lesson.title}
                </Link>
            ) : (
                <>
                    <h4 className='line-clamp-1'>{lesson.title}</h4>
                </>
            )}
            <span className={cn("ml-auto text-sm font-medium", isActive ? 'text-primary font-bold' : '')}>{Math.floor(lesson.duration)} phút</span>
        </div>
    )
}

export default LessonItem