import { capitalize } from '@material-ui/core'

export const titleCase = (s: string) => s.split(' ').map(w => capitalize(w)).join(' ')

type time = {hours: number, minutes: number, ampm?: 'AM'|'PM'}

export function isSameDay(a: Date, b: Date) {
    const sameDay = a.getDate() == b.getDate()
    const sameMonth = a.getMonth() == b.getMonth()
    const sameYear = a.getFullYear() == b.getFullYear()
    return sameDay && sameMonth && sameYear
}

const serializeTime = (datestr: string): time => {
    const hours_minutes = datestr.split(':')
    return {
        hours: parseInt(hours_minutes[0]),
        minutes: parseInt(hours_minutes[1]),
    }
}

const appendAMPM = (time: time): time => ({
    ...time,
    ampm: (time.hours >= 12) ? 'PM': 'AM',
})

const toCivilianHours = (time: time): time => ({
    ...time,
    hours: (time.hours > 12) ?
        time.hours - 12 : time.hours,
})

const formatTime = (time: time, template='hh:mm tt') =>
    template
        .replace('hh', time.hours.toString())
        .replace('mm', (time.minutes < 10) ?
            '0'+time.minutes.toString() :
            time.minutes.toString())
        .replace('tt', time.ampm!)

// Input=19:00:00 => Output=7:00 PM
export const militaryToCivilian = (mil_t: string) =>
    formatTime(toCivilianHours(appendAMPM(serializeTime(mil_t))))

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
const serializeDate = (datestr: string): Date => new Date(datestr)
const getMonth = (d: Date) => MONTHS[d.getMonth()]
const getDay = (d: Date) => DAYS[d.getDay()]
const getDate = (d: Date) => d.getDate().toString()
const formatDate = (d: Date, template='dy, mm dt') =>
    template
        .replace('dy', getDay(d))
        .replace('mm', getMonth(d))
        .replace('dt', getDate(d))

export const dayMonthDate = (datestr: string) =>
    formatDate(serializeDate(datestr))

export type Dictionary<U> = {[key: string]: U}

export const toDollarAmount = (n: number): string => {
    return '$' + n.toFixed(2).toString()
}

const add1 = (n: number) => n+1
export const range = (n: number, zeroIndexed = true) => zeroIndexed
    ? Array.from(Array(n).keys())
    : Array.from(Array(n).keys()).map(add1)

export const bound = (min: number, max: number) => (n: number) => Math.min(Math.max(n, min), max)
