import PageNotPound from '@/app/not-found';
import { getUserInfo } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs/server';
import React, { Suspense } from 'react'
import LessonWrapper from './LessonWrapper';

const layout = async ({ player, outline }: { player: React.ReactNode; outline: React.ReactNode }) => {
    const { userId } = await auth();
    if (!userId) return <PageNotPound />
    const findUser = await getUserInfo({ userId });
    if (!findUser) return <PageNotPound />
    return (
        <LessonWrapper>
            <Suspense>{player}</Suspense>
            <Suspense>{outline}</Suspense>
        </LessonWrapper>
    )
}

export default layout