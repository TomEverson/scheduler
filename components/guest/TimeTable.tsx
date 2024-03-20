"use client"

import { Meeting } from '@/db/schema'
import { convertTime } from '@/utils/calendar'
import axios from 'axios'
import useSWR, { mutate } from 'swr'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '../ui/button'
import useSWRMutation from 'swr/mutation'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type Payload = {
    id: number,
    booked: true,
}



const TimeTable = ({ selectedDate }: { selectedDate: number }) => {

    const router = useRouter()

    const fetcher = (url: string) => axios.get(url).then(res => res.data)
    const mutationer = (url: string, { arg }: { arg: Payload }) => axios.post(url, arg).then(res => {
        if (res.status === 200) {
            mutate(`/api?day=${selectedDate}`)
            return router.refresh();
        }
    })


    const { data } = useSWR<Meeting[]>(`/api?day=${selectedDate}`, fetcher)
    const { trigger, isMutating } = useSWRMutation("/api/guest", mutationer)

    return (
        <>
            <div className='flex flex-col gap-4 pt-4'>
                {data?.map(meeting =>
                    <Dialog>
                        <DialogTrigger asChild>
                            <div className='flex flex-col hover:cursor-pointer'>
                                <p>{meeting.id}</p>
                                <p>Starting Time: {convertTime(meeting.startTime)}</p>
                                <p>Ending Time: {convertTime(meeting.endTime)}</p>
                                <p>Booked: {String(meeting.booked)}</p>
                            </div>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>{meeting.id}</DialogTitle>
                            </DialogHeader>
                            <DialogFooter>


                                <Button
                                    disabled={isMutating}
                                    onClick={async () => await trigger({
                                        id: meeting.id,
                                        booked: true,
                                    })}>
                                    Confirm
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                )}
            </div>
        </>)
}

export default TimeTable