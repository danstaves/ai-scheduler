import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import style from './Calendar.css';
import { useEffect, useState } from 'react';
import ClassItem from './ClassItem';

const weekStart = new Date("2024-06-30T00:00:00");

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

  useEffect(() => {
    const events = classSchedule?.map((classItem) => {
      const { title, daysOfWeek, startTime, endTime } = classItem;
      return createEvent(title, daysOfWeek, startTime, endTime);
    });
    setEvents(events);
  }, [classSchedule]);

  return (
	<div>
		<h1>Fall 2025 Schedule</h1>

		<div className="schedule">
			<div className='classList'>
				{classSchedule?.map((classItem, index) => <ClassItem key={index} {...classItem} />)}
			</div>
		<div className='calendar'>
			<FullCalendar
				viewClassNames={style.timegrid}
				plugins={[ timeGridPlugin ]}
				initialView="timeGridWeek"
				slotMinTime={"7:00:00"}
				slotMaxTime={"18:00:00"}
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