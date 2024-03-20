"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"

import { mutate } from "swr"


const Modal = ({ selectedDate }: { selectedDate: number }) => {

    const router = useRouter()
    const [openState, setOpenState] = useState(false)

    const [timeState, setTimeState] = useState({
        startTime: 0,
        endTime: 0,
        bufferPeriod: 3,
        numberOfMeeting: 1,
        selectedDate: selectedDate,
    })

    const submitFunction = async () => {

        //? If Starting Time Or Ending Time Doesn't Exist
        if (timeState.startTime === 0 || timeState.endTime === 0) return

        //? Doesn't Allow Starting Time To Bigger Than 
        if (timeState.startTime > timeState.endTime) return

        //? Buffer Periods Before And After The Meetings * Number Of Meetings Shouldn't Be Smaller Than Difference Between End And Start Time, and Assume 3 Mins is Default Length 
        //? For Each Meeting
        if (((2 * timeState.bufferPeriod * timeState.numberOfMeeting) + (3 * timeState.numberOfMeeting)) > (timeState.endTime - timeState.startTime)) return

        await axios.post("/api", { timeState }).then(res => {
            if (res.status === 200) setOpenState(prev => !prev);
            mutate(`/api?day=${selectedDate}`)
            router.refresh()
        })

    }





    return (
        <Dialog open={openState}>
            <DialogTrigger asChild onClick={() => setOpenState(prev => !prev)}>
                <button className="w-full
                mt-4
                 h-12 bg-yellow-400 font-medium rounded-xl border border-gray">
                    Add Schedule
                </button></DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Schedule</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            From
                        </Label>
                        <Input
                            id="from"
                            type="time"
                            className="col-span-3"
                            onChange={(e) => setTimeState(prev => ({ ...prev, startTime: Number(e.target.value.split(":").join("")) }))}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            To
                        </Label>
                        <Input
                            id="to"
                            type="time"
                            onChange={(e) => setTimeState(prev => ({ ...prev, endTime: Number(e.target.value.split(":").join("")) }))}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right text-nowrap">
                            Buffer Perioid
                        </Label>
                        <Input
                            id="from"
                            type="number"
                            className="col-span-3"
                            placeholder="3"
                            onChange={(e) => setTimeState(prev => ({ ...prev, bufferPeriod: Number(e.target.value) }))}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Max No Of Meeting
                        </Label>
                        <Input
                            placeholder="1"
                            id="from"
                            type="number"
                            className="col-span-3"
                            onChange={(e) => setTimeState(prev => ({ ...prev, numberOfMeeting: Number(e.target.value) }))}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        type="submit"
                        onClick={submitFunction}

                    >Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default Modal