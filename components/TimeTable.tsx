"use client"

import { Meeting } from '@/db/schema'
import { convertTime } from '@/utils/calendar'
import axios from 'axios'
import useSWR from 'swr'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"


const TimeTable = ({ selectedDate }: { selectedDate: number }) => {

    const fetcher = (url: string) => axios.get(url).then(res => res.data)


    const { data } = useSWR<Meeting[]>(`/api?day=${selectedDate}`, fetcher)

    return (
        <>
            <div className='flex flex-col gap-2'>
                {data?.map(meeting =>
                    <div className='flex flex-col'>
                        <p>Starting Time: {convertTime(meeting.startTime)}</p>
                        <p>Ending Time: {convertTime(meeting.endTime)}</p>
                        <p>Booked: {String(meeting.booked)}</p>
                    </div>
                )}
            </div>
        </>)
}

export default TimeTable