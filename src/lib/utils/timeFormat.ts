export function twelveHourFormat(hour: number): number {
    if(hour > 12) {
        hour -= 12;
    }
    return hour
}