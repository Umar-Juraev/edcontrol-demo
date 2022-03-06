import dayjs from "dayjs"
import moment from "moment"

export const checkLength = (value?: any) => {
    if (value.toString().length > 1) {
        return value
    } else {
        return `0${value}`
    }
}

export const parseFullDate = (value?: string | null) => {
    const date = dayjs(value)

    const userMinute = date.minute()
    const userHour = date.hour()
    const userDay = date.date()
    const userMonth = date.format('MMMM')
    const userYear = date.year()

    return `${userDay} ${userMonth} ${userYear}`
}

export const getHourAndMinute = (value?: string | null) => {
    const date = dayjs(value).format('HH:mm')
    return date
}

export const getFullDateAndHour = (value?: string | null) => {
    const date = dayjs(value).format('DD MMM YYYY - HH:mm')
    return date
}

export const getCurrentWeekDays = () => {
    const weekStart = moment().startOf('week');

    const days = [];
    for (let i = 1; i <= 6; i++) {
        days.push(moment(weekStart).add(i, 'days'))
    }

    return days.map((item) => ({ name: item.format('dddd'), date: item.toString() }))
}