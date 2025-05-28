'use client'

import { ILesson } from '@/app/database/lesson.model'
import { IconLeftArrow, IconRightArrow } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const LessonNavigation = ({nextLesson, prevLesson}: {nextLesson?: string; prevLesson?: string}) => {
  const router = useRouter();

  return (
    <div className="flex gap-3">
      <Button className='size-10 p-3' onClick={()=> !prevLesson ? null : router.push(prevLesson || "/")} disabled={!prevLesson}>
        <IconLeftArrow name="play" className="w-6 h-6" />
      </Button>
      <Button className='size-10 p-3' onClick={()=> !nextLesson ? null : router.push(nextLesson || "/")} disabled={!nextLesson}>
        <IconRightArrow name="play" className="w-6 h-6" />
      </Button>
    </div>
  )
}

export default LessonNavigation