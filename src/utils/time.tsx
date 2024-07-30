import { addMinutes, addSeconds, setMinutes, setSeconds, startOfMinute, startOfSecond } from 'date-fns';

export const addNanoSeconds = (value: string) => {
    return `${value}000000`;
};

export const removeNanoSeconds = (value: string) => {
    return value.slice(0, -6);
};

export const getCurrentUTCTimeStamp = (): string => {
    return Math.floor(new Date().getTime()).toString();
};

export const getNextNearestDate = (): Date => {
    const now = new Date();

    const currentSeconds = now.getSeconds();

    let nextSecond = currentSeconds;
    if (currentSeconds % 5 !== 0) {
        nextSecond = Math.ceil(currentSeconds / 5) * 5;
    } else {
        nextSecond += 5;
    }

    let nextTime = setSeconds(now, nextSecond);
    nextTime = startOfSecond(nextTime);

    if (nextSecond >= 60) {
        nextTime = addMinutes(nextTime, 1);
        nextTime = setSeconds(nextTime, 0);
    }

    let nextMinute = nextTime.getMinutes();
    if (nextMinute % 5 !== 0) {
        nextMinute = Math.ceil(nextMinute / 5) * 5;
    } else if (nextSecond === 0) {
        nextMinute += 5;
    }

    nextTime = setMinutes(nextTime, nextMinute);
    nextTime = startOfMinute(nextTime);

    if (nextTime <= now) {
        nextTime = addMinutes(nextTime, 5);
    }

    return nextTime;
}