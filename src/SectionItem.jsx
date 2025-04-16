import { useMemo } from "react";
import style from "./SectionItem.module.css";

String.prototype.splice = function (start, deleteCount, ...items) {
    const str = this.toString();
    const head = str.slice(0, start);
    const tail = str.slice(start + Math.abs(deleteCount));
    return head + items.join("") + tail;
}

const allDaysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

export default function SectionItem(section) {

    const classTimes = useMemo(()=>{
        const startTime = section.start_time;
        const endTime = section.end_time;
        return {start:startTime?.splice(2,0,":")??"", end:endTime?.splice(2,0,":")??""};
    }, [section]);

    const daysOfWeekText = useMemo(() => {
        const daysOfWeek = allDaysOfWeek.map((dayName, index) => (section[dayName] === 1 ? index : null)).filter((dayIndex) => dayIndex !== null);
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return daysOfWeek.map((day) => days[day]).join(", ");
    },  [section]);

    return (
        <div className={style.sectionItem}>
            <h2>{`${classTimes.start} - ${classTimes.end}:`}</h2>
            <h2>{daysOfWeekText}</h2>
        </div>
    )
}