import { useMemo } from "react";
import style from "./ClassItem.module.css";

export default function ClassItem({ title, startTime, endTime, daysOfWeek }) {
    const daysOfWeekText = useMemo(() => {
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return daysOfWeek.map((day) => days[day]).join(", ");
    },  daysOfWeek);

    return (
        <div className={style.classItem}>
            <h1>{title}</h1>
            <h2>{daysOfWeekText}</h2>
        </div>
    );
}