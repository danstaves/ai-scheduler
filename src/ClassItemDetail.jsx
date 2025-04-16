import { useMemo } from "react";
import style from "./ClassItem.module.css";
import SectionItem from "./SectionItem";

String.prototype.splice = function (start, deleteCount, ...items) {
    const str = this.toString();
    const head = str.slice(0, start);
    const tail = str.slice(start + Math.abs(deleteCount));
    return head + items.join("") + tail;
}

const allDaysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

export default function ClassItemDetail(data) {


    return (
        <div className={style.classItem}>
            <h1>{`${data.subject} ${data.number}: ${data.sections[0].course_title}`}</h1>
            <div>
                {data.sections.map((section, index) => <SectionItem key={index} {...section} />)}
            </div>
        </div>
    )
}