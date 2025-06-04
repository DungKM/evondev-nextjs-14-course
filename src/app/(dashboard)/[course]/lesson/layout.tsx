import PageNotPound from '@/app/not-found';
import { getUserInfo } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs/server';
import React, { Suspense } from 'react'

const layout = async ({ player, outline }: { player: React.ReactNode; outline: React.ReactNode }) => {
    const { userId } = await auth();
    if (!userId) return <PageNotPound />
    const findUser = await getUserInfo({ userId });
    if (!findUser) return <PageNotPound />
    return (
        <div className='grid xl:grid-cols-[minmax(0,2fr),minmax(0,1fr)] gap-10 min-h-screen items-start'>
            <Suspense>{player}</Suspense>
            <Suspense>{outline}</Suspense>
        </div>
    )
}

export default layout