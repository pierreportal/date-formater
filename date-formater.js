// Config :

const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
];
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "Jun",
    "July",
    "August",
    "September",
    "October",
    "Nevember",
    "December"
];
//

const dth = n => {
    const x = n % 10;
    return Math.floor(n / 10) === 1
        ? n + "th"
        : x === 1
            ? n + "st"
            : x === 2
                ? n + "nd"
                : x === 3
                    ? n + "rd"
                    : n + "th";
};

const calcDate = args => {
    const params = [...args];
    let d = params.splice(-1)[0];
    let n = Number(params.join(""));
    let today = new Date().getDate();
    let m = new Date().getMonth();
    let y = new Date().getFullYear();
    if (d === "w") n *= 7;
    if (d === "m") m += n;
    if (d === "y") y += n;
    return new Date(y, m, today + n);
};

const format = (date, str) => {
    const param =
        str === "B"
            ? "yyyy/mm/dd"
            : str === "L"
                ? "dd/mm/yyyy"
                : str === "M"
                    ? "mm/dd/yyyy"
                    : str;
    const separators = [...param].filter(x => [..."./ -_|"].includes(x));
    const arr = param.split(/[./ -_|]/);
    const newDate = {
        d: date.getDate(),
        m: date.getMonth() + 1,
        y: date.getFullYear(),
        strd: days[date.getDay() - 1 > -1 ? date.getDay() - 1 : days.length - 1],
        strm: months[date.getMonth()]
    };
    const res = arr
        .map(elem => {
            const x = elem[0];
            return (token =
                x === "y" || elem.length <= 2
                    ? [elem.length % 2 === 0 ? "0" : "", ...newDate[x].toString()]
                        .splice(-(elem.length + (elem.length % 2)))
                        .join("")
                    : elem.length === 3
                        ? newDate[`str${x}`].substring(0, 3)
                        : newDate[`str${x}`]);
        })
        .join(separators[0]);
    return res;
};

// use examples :

format(calcDate("10d"), "dd/mm/yyyy"); // 12/03/2020
format(calcDate("2w"), "dd mmm yy"); // 16 Mar 20
format(calcDate("1m"), "d/m/yyy"); // 3/4/2020
format(calcDate("1y"), "d/m/y"); // 3/3/21
format(calcDate("10d"), "d/mmm/y"); // 12/Mar/20
format(calcDate("10d"), "ddd/mmm/y"); // Thu/Mar/20
format(calcDate("10d"), "dddd-mmm-y"); // Thursday-Mar-20
format(calcDate("10d"), "d.mmmm.y"); // 12.March.20
format(calcDate("10d"), "L"); // 12/03/2020
format(calcDate("10d"), "B"); // 2020/03/12
format(calcDate("112345d"), "M"); // 10/05/2327