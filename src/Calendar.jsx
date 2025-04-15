import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import style from './Calendar.css';
import { useEffect, useState } from 'react';
import ClassItem from './ClassItem';

const weekStart = new Date("2024-06-30T00:00:00");

const allDaysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

function createEvent(title, daysOfWeek, startTime, endTime){
  startTime = startTime.padStart(4,"0");
  endTime = endTime.padStart(4,"0");

    return {
        title: title,
        startTime: startTime.includes(":") ? startTime : startTime.slice(0,2) + ":" + startTime.slice(2),
        endTime: endTime.includes(":") ? endTime : endTime.slice(0,2) + ":" + endTime.slice(2),
        daysOfWeek: daysOfWeek,
    };
}

export default function Calendar({classSchedule}) {
  const [events, setEvents] = useState([]);
  const [times, setTimes]= useState({startTime: "7:00", endTime: "19:00"});
  const [timeSpan, setTimeSpan] = useState(12);

  useEffect(() => {
	// Find the earliest start time and latest end time
	const startTime = classSchedule.Schedule.map(classItem=>parseInt(classItem.start_time)).sort((a,b)=>a-b)[0];
	const endTime = classSchedule.Schedule.map(classItem=>parseInt(classItem.end_time)).sort((a,b)=>b-a)[0];

	const startHourString = startTime.toString().padStart(4,"0").slice(0,2);
	const endHourString = (endTime+100).toString().padStart(4,"0").slice(0,2);

	const span = parseInt(endHourString) - parseInt(startHourString);

	setTimeSpan(span);



	setTimes({
		startTime: startHourString + ":00",
		endTime: endHourString + ":00"
	});

	// Format events for FullCalendar
    const events = classSchedule.Schedule.map((classItem) => {
	  const daysOfWeek = allDaysOfWeek.map((dayName, index)=>classItem[dayName]==1? index : null).filter((dayIndex)=>dayIndex!==null);
      return createEvent(`${classItem.subject} ${classItem.course_number}`, daysOfWeek, classItem.start_time, classItem.end_time);
    });
    setEvents(events);
  }, [classSchedule]);

  return (
	<div>
		<h1>Fall 2025 Schedule</h1>

		<div className="schedule">
			<div className='classList'>
				{classSchedule?.Schedule.sort((a,b)=>a.course_number > b.course_number).map((classItem, index) => <ClassItem key={index} {...classItem} />)}
			</div>
		<div style={{height:`${timeSpan*48+22}px`}} className='calendar'>
			<FullCalendar
				viewClassNames={style.timegrid}
				plugins={[ timeGridPlugin ]}
				initialView="timeGridWeek"
				slotMinTime={times.startTime}
				slotMaxTime={times.endTime}
				dayHeaderFormat={{ weekday: 'short' }}
				weekends={false}
				weekNumberFormat={{ week: 'short' }}
				headerToolbar={{left: false, center: '', right: false}}
				allDaySlot={false}
				events={events}
				initialDate={weekStart}
			/>
		</div>

		</div>
	</div>
  )
}