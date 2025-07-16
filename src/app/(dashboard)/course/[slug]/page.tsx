import PageNotPound from '@/app/not-found';
import { ECourseLevel, ECourseStatus } from '@/components/types/enums';
import { CourseLevelTitle } from '@/constants';
import { getCourseBySlug } from '@/lib/actions/course.actions';
import Image from 'next/image'
import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import LessonContent from '@/components/lesson/LessonContent';
import { auth } from '@clerk/nextjs/server';
import { getUserInfo } from '@/lib/actions/user.actions';
import CourseWidget from './CourseWidget';
import AlreadyEnroll from './AlreadyEnroll';


const page = async ({ params }: { params: { slug: string } }) => {
  const data = await getCourseBySlug({ slug: params.slug });
  if (!data) return null;
  if (data.status !== ECourseStatus.APPROVED) return <PageNotPound />
  const { userId } = await auth();
  const userDoc = await getUserInfo({ userId: userId || '' });

  if (!userDoc) return null;

  const findUser = JSON.parse(JSON.stringify(userDoc));
  const userCourses = findUser.courses.map((c: any) => c.toString());
  const videoId = data.intro_url?.split("v=")[1];
  const lectures = data.lectures || [];
  return (
    <div className='grid lg:grid-cols-[2fr,1fr] gap-10 min-h-screen'>
      <div>
        <div className='relative aspect-[16/9] mb-5'>
          {!data.intro_url ? <>
            <iframe width="560" height="315" src={`https://www.youtube.com/embed/${videoId}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" className='w-full h-full object-fill'></iframe>
          </> : (
            <Image src={data.image} alt='' fill
              className='w-ful h-full object-cover rounded-lg' />
          )}
        </div>
        <h1 className='font-bold text-3xl mb-5'>{data.title}</h1>
        <BoxSection title='Mô tả'>
          <div className='leading-normal'>{data.desc}</div>
        </BoxSection>
        <BoxSection title='Thông tin'>
          <div className='grid grid-cols-4 gap-5 text-gray-900 dark:text-gray-500'>
            <BoxInfo title="Bài học">100</BoxInfo>
            <BoxInfo title="Lượt xem">{data.views.toLocaleString('vi-VN')}</BoxInfo>
            <BoxInfo title="Trình độ"> {CourseLevelTitle[data.level as ECourseLevel]}</BoxInfo>
            <BoxInfo title="Thời lượng">100</BoxInfo>
          </div>
        </BoxSection>
        <BoxSection title='Nội dung khóa học'>
          <LessonContent lectures={lectures} course="" slug=''></LessonContent>
        </BoxSection>
        <BoxSection title='Yêu cầu'>
          {data.info.requirements.map((r: string, index: number) => (
            <div key={index} className='mb-3 flex items-center gap-2'>
              <span className='flex-shrink-0 size-5 bg-primary text-white p-1 rounded-lg flex items-center justify-center'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </span>
              <span>
                {r}
              </span>
            </div>
          ))}
        </BoxSection>
        <BoxSection title='Lợi ích'>
          {data.info.benefits.map((b: string, index: number) => (
            <div key={index} className='mb-3 flex items-center gap-2'>
              <span className='flex-shrink-0 size-5 bg-primary text-white p-1 rounded-lg flex items-center justify-center'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </span>
              <span>
                {b}
              </span>
            </div>
          ))}
        </BoxSection>
        <BoxSection title='Q.A'>
          {data.info.qa.map((qa: { question: string; answer: string }, index: number) => (
            <Accordion type="single" key={index} collapsible>
              <AccordionItem value={qa.question}>
                <AccordionTrigger>{qa.question}</AccordionTrigger>
                <AccordionContent>
                  {qa.answer}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </BoxSection>
      </div>
      <div>
        {/* <div className='bgDarkMode border borderDarkMode rounded-lg p-5 mb-10'>
          <div className='flex items-center gap-2 mb-3'>
            <strong className='text-primary text-xl font-bold'>{data.price.toLocaleString('vi-VN')}</strong>
            <span className='text-slate-400 line-through text-xl'>{data.sale_price.toLocaleString('vi-VN')}</span>
            <span className='ml-auto inline-block px-3 py-1 rounded-lg bg-primary text-primary bg-opacity-10 font-semibold text-sm'>{Math.floor((data.price / data.sale_price) * 100)}%</span>
          </div>
          <h3 className='font-bold mb-3 text-sm'>Khóa học gồm có:</h3>
          <div className='mb-5 flex flex-col gap-2 text-sm text-slate-500'>
            <div className='flex items-center gap-2'>
              <IconPlay className='size-4' />
              <span>30h học</span>
            </div>
            <div className='flex items-center gap-2'>
              <IconPlay className='size-4' />
              <span>Video full HD</span>
            </div>
            <div className='flex items-center gap-2'>
              <IconUsers className='size-4' />
              <span>Có nhóm hỗ trợ</span>
            </div>
            <div className='flex items-center gap-2'>
              <IconStudy className='size-4' />
              <span>Có nhóm hỗ trợ</span>
            </div>
          </div>
          <ButtonEnroll
            user={findUser}
            courseId={JSON.parse(JSON.stringify(data._id))}
            amount={data.price}
          ></ButtonEnroll>
        </div> */}
        {userCourses.includes(data._id.toString()) ? (
          <>
          <AlreadyEnroll></AlreadyEnroll>
          </>
        ) : (
          <>
            <CourseWidget findUser={findUser ? JSON.parse(JSON.stringify(findUser)) : null} data={data ? JSON.parse(JSON.stringify(data)) : null}></CourseWidget>
          </>
        )}
      </div>
    </div>
  )
}

function BoxSection({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <>
      <h2 className='font-bold text-xl mb-5'>{title}</h2>
      <div className='mb-10'>{children}</div>
    </>
  )
}
function BoxInfo({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className='bg-white rounded-lg p-5'>
      <h4 className='text-sm text-slate-400 font-normal'>{title}</h4>
      <h3 className='font-bold'>{children}</h3>
    </div>
  )
}
export default page