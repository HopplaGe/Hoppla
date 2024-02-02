export const convertTimeToSeconds = (time: string) => {
    const [hours, minutes] = time.split(':')
    return parseInt(hours) * 3600 + parseInt(minutes) * 60
}

export const convertSecondsToTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds - hours * 3600) / 60)
    return `${hours}:${minutes}`
}