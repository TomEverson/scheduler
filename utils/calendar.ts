export const generateDates = (month: number, year: number) => {
    const date = new Date(year, month, 1);
    const days = [] as { date: number | null; day: number }[];
    let index = date.getDay()
    while (date.getMonth() === month) {

        while (index !== 0) {
            days.push({
                date: null,
                day: date.getDay()
            }),
                index = index - 1
        }

        days.push({
            date: date.getDate(),
            day: date.getDay()
        });
        date.setDate(date.getDate() + 1);
    }
    return days;
}

export const calculateTimeDifference = (time1: number, time2: number) => {
    const hours1 = Math.floor(time1 / 100);
    const minutes1 = time1 % 100;

    const hours2 = Math.floor(time2 / 100);
    const minutes2 = time2 % 100;

    const totalMinutes1 = hours1 * 60 + minutes1;
    const totalMinutes2 = hours2 * 60 + minutes2;

    const timeDiffInMinutes = Math.abs(totalMinutes2 - totalMinutes1);


    return timeDiffInMinutes;
}

export const addMinutesToTime = (time: number, minutesToAdd: number) => {

    let hours = Math.floor(time / 100);
    let minutes = time % 100;


    minutes += minutesToAdd;


    hours += Math.floor(minutes / 60);
    minutes %= 60;


    hours %= 24;


    const result = hours * 100 + minutes;
    return result;
}

export const convertTime = (time: number) => time.toString().slice(0, 2) + ":" + time.toString().slice(2)
