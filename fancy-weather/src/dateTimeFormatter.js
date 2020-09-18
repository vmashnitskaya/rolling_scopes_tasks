const timeFormatter = (time) => {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    return `${hours}:${minutes}:${seconds}`;
};

const dateFormatterToday = (date) => {
    const weekDay = date.getDay();
    const monthDate = date.getDate();
    const month = date.getMonth();
    return [weekDay, monthDate, month];
};

const dateFormatterNexDays = (date, plusDay) => {
    const weekDay = date.getDay();

    return weekDay + plusDay > 6 ? (weekDay + plusDay) % 7 : weekDay + plusDay;
};

export default {
    timeFormatter,
    dateFormatterToday,
    dateFormatterNexDays,
};
