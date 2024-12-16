'use client';

import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import './Calendar.scss';
import TaskForm from './TaskForm';
import { formatDate } from '../dateutils';
import TaskList from '../TaskList';

interface Task {
  title: string;
  start: string;
  end?: string;
  time?: string;
  color?: string;
}

const CalendarPage = () => {
  const [events, setEvents] = useState([
    { id: "1", title: '아침 먹기', start: '2024-12-17', end: '2024-12-17', color: '#fb8494' },
    { id: "2", title: '점심 먹기', start: '2024-12-19', end: '2024-12-20', color: '#fb8494' },
    { id: "3", title: '저녁 먹기', start: '2024-12-23', end: '2024-12-27', color: '#fb8494' },
    { id: "4", title: '아침 회의', start: '2024-12-19T10:00:00', end: '2024-12-20T11:00:00' },
    { id: "5", title: '점심 식사', start: '2024-12-19T12:00:00', end: '2024-12-20T13:00:00' },
  ]);
  const [selectedDate, setSelectedDate] = useState('');

  const addTaskToCalendar = (task: Task) => {
    const newEvent = {
      id: String(events.length + 1),
      title: task.title,
      start: task.time
        ? `${task.start}T${task.time}`
        : `${task.start}`,
      end:
        task.end && task.end !== task.start
          ? `${task.end}${task.time ? `T${task.time}` : ''}`
          : `${task.start}${task.time ? `T${task.time}` : ''}`,
      color: '#84b6fb',
    };
    setEvents(prevEvents => [...prevEvents, newEvent]);
  };

  return (
    <div className="container">
      <div className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          height="auto"
          headerToolbar={{
            start: "",
            center: "title",
            end: "prev next",
          }}
          events={events}
          locale={'ko'}
          dateClick={(clickedDate) => setSelectedDate(formatDate(clickedDate.date))}
          dayCellContent={(e) => e.dayNumberText.replace('일', '')}
          fixedWeekCount={false}
          eventClick={(ev) => {
            // alert(ev.event.title);
            console.log(ev.event.id);
          }}
        />
      </div>
      <div className="taskForm-container">
        <TaskForm onAddTask={addTaskToCalendar} defaultStartDate={selectedDate} />
      </div>
      <TaskList eventsList={events} />
    </div>
  );
};

export default CalendarPage;
