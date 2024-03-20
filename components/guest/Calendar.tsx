"use client"

import React, { useState } from "react";
import { generateDates } from "@/utils/calendar";
import { cn } from "@/utils";
import TimeTable from "@/components/guest/TimeTable";

export default function Calendar() {

    const days = ["S", "M", "T", "W", "T", "F", "S"];

    const tempDate = new Date()
    const [today, setToday] = useState({
        date: tempDate.getDate(),
        month: tempDate.getMonth(),
        year: tempDate.getFullYear(),
    });
    const [selectDate, setSelectDate] = useState<number | undefined>(undefined)



    return (
        <div className="flex gap-10 sm:divide-x justify-center sm:w-1/2 mx-auto  h-screen items-center sm:flex-row flex-col">
            <div className="w-96 h-96 ">
                <div className="flex justify-between items-center">
                    <h1 className="select-none font-semibold">
                        March, 2024
                    </h1>

                </div>
                <div className="grid grid-cols-7 ">
                    {days.map((day, index) => {
                        return (
                            <h1
                                key={index}
                                className="text-sm text-center h-14 w-14 grid place-content-center text-gray-500 select-none"
                            >
                                {day}
                            </h1>
                        );
                    })}
                </div>

                <div className=" grid grid-cols-7 ">
                    {generateDates(today.month, today.year).map(
                        (value, index) => {
                            return (
                                <div
                                    key={index}
                                    className="p-2 text-center h-14 grid place-content-center text-sm border-t"

                                >
                                    <h1
                                        className={cn(
                                            value.date === null ? "hover:bg-none hover:cursor-not-allowed" : "hover:bg-black hover:text-white",
                                            selectDate === value.date
                                                ? "bg-black text-white"
                                                : "",
                                            "h-10 w-10 rounded-full grid place-content-center  transition-all cursor-pointer select-none"

                                        )}
                                        onClick={() => {
                                            setSelectDate(value.date !== null ? value.date : undefined);
                                        }}

                                    >
                                        {value.date}
                                    </h1>
                                </div>
                            );
                        }
                    )}
                </div>
            </div>
            <div className="h-96 w-96 sm:px-5 flex flex-col">
                {selectDate ? <><h1 className=" font-semibold">
                    {selectDate ? `Schedule for ${new Date(tempDate.getFullYear(), tempDate.getMonth(), selectDate).toLocaleDateString()}` : ""}
                </h1>
                    <TimeTable selectedDate={selectDate} />

                </> : <></>}
            </div>
        </div>
    );
}
