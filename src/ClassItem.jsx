import { useMemo } from "react";
import style from "./ClassItem.module.css";

const allDaysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

export default function ClassItem(data) {
    const daysOfWeekText = useMemo(() => {
        const daysOfWeek = allDaysOfWeek.map((dayName, index) => (data[dayName] === 1 ? index : null)).filter((dayIndex) => dayIndex !== null);
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return daysOfWeek.map((day) => days[day]).join(", ");
    },  data);

    return (
        <div className={style.classItem}>
            <h1>{`${data.subject} ${data.course_number}`}</h1>
            <p>{data.course_title}</p>
            <h2>{daysOfWeekText}</h2>
        </div>
    );
}