import { addMinutesToTime, calculateTimeDifference } from "@/utils/calendar"
import { db } from "@/db"
import { meeting } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

type Payload = {
    startTime: number;
    endTime: number;
    bufferPeriod: number;
    numberOfMeeting: number;
    selectedDate: number;
}

export const GET = async (req: NextRequest) => {
    const day = parseInt(req.nextUrl.searchParams.get("day")!)
    const meetingTime = await db.select().from(meeting).where(eq(meeting.day, day))
    return Response.json(meetingTime.sort((a, b) => a.id - b.id), { status: 200 })
}


export const POST = async (req: NextRequest) => {
    const { timeState } = await req.json() as { timeState: Payload }

    const totalTimeInMinutes = calculateTimeDifference(timeState.endTime, timeState.startTime) - (2 * timeState.bufferPeriod * timeState.numberOfMeeting)
    const meetingPeriods = totalTimeInMinutes / timeState.numberOfMeeting
    let tempEndTime;

    for (let i = 0; i < timeState.numberOfMeeting; i++) {
        if (!tempEndTime) {
            const actualStartTime = addMinutesToTime(timeState.startTime, timeState.bufferPeriod)
            const actualEndTime = addMinutesToTime(actualStartTime, meetingPeriods)
            tempEndTime = addMinutesToTime(actualEndTime, timeState.bufferPeriod)
            await db.insert(meeting).values({ startTime: actualStartTime, endTime: actualEndTime, day: timeState.selectedDate })
        } else {
            const actualStartTime = addMinutesToTime(tempEndTime, timeState.bufferPeriod)
            const actualEndTime = addMinutesToTime(actualStartTime, meetingPeriods)
            tempEndTime = addMinutesToTime(actualEndTime, timeState.bufferPeriod)
            await db.insert(meeting).values({ startTime: actualStartTime, endTime: actualEndTime, day: timeState.selectedDate })
        }
    }

    return Response.json({ msg: "OK" }, { status: 200 })

}