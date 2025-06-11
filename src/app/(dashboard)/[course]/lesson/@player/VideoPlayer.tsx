'use client';
import { cn } from "@/lib/utils";
import MuxPlayer from "@mux/mux-player-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LessonNavigation from "../LessonNavigation";
import useGlobalStore from "@/app/store";
import { Button } from "@/components/ui/button";
const VideoPlayer = ({ nextLesson, prevLesson }: { nextLesson: string, prevLesson: string }) => {
    const duration = 5000;
    const [isEndedVideo, setIsEndedVideo] = useState(false);
    const router = useRouter();
    useEffect(() => {
        if (!isEndedVideo) return;
        const timer = setTimeout(() => {
            router.push(nextLesson);
        }, duration);
        return () => clearTimeout(timer);
    }, [isEndedVideo, nextLesson]);
    const { expandedPlayer, setExpandedPlayer } = useGlobalStore();
    return (
        <>
            <div className="relative mb-5 aspect-video">
                <div className={cn("h-2 bg-gradient-to-r from-primary absolute top-0 right-0 z-10", isEndedVideo ? "animate-bar" : "")}></div>
                <MuxPlayer
                    playbackId="a4nOgmxGWg6gULfcBbAa00gXyfcwPnAFldF8RdsNyk8M"
                    metadata={{
                        video_id: "video-id-54321",
                        video_title: "Test video title",
                        viewer_user_id: "user-id-007",
                    }}
                    onEnded={() => setIsEndedVideo(true)}
                    onPlay={() => setIsEndedVideo(false)}
                />
            </div>
            <div className="flex justify-between item-center mb-6">
                <LessonNavigation
                    nextLesson={nextLesson}
                    prevLesson={prevLesson}
                >
                </LessonNavigation>
                <Button onClick={() => setExpandedPlayer(!expandedPlayer)}>{expandedPlayer ? "Mặc định" : "Mở rộng"}</Button>
            </div>
        </>
    )
}

export default VideoPlayer