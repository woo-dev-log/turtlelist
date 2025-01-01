'use client';

import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import './Calendar.scss';
import { formatDate } from '@/utils/dateutils';
import useListStore from '@/store/listStore';
import TaskForm from '@/app/components/taskform/TaskForm';
import { Task } from '@/types/TaskTypes';
import TaskList from '../task/TaskList';

const CalendarPage = () => {
  const { todos, addList } = useListStore();
  const [selectedDate, setSelectedDate] = useState('');

  const addTaskToCalendar = (task: Task) => {
    const newList = {
      id: String(todos.length + 1),
      title: task.title,
      start: task.time
        ? `${task.start}T${task.time}`
        : `${task.start}T00:00:00`,
      end:
        task.end && task.end !== task.start
          ? `${task.end}${task.time ? `T${task.time}` : 'T23:59:59'}`
          : `${task.start}${task.time ? `T${task.time}` : 'T23:59:59'}`,
      color: '#84b6fb',
    };

    addList(newList.title, newList.start, newList.end, newList.color);
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
          events={todos}
          locale={'ko'}
          dateClick={(clickedDate) => setSelectedDate(formatDate(clickedDate.date))}
          dayCellContent={(e) => e.dayNumberText.replace('일', '')}
          fixedWeekCount={false}
          eventClick={(ev) => {
            console.log(ev.event.id);
          }}
        />
      </div>
      <div className="taskForm-container">
        <TaskForm onAddTask={addTaskToCalendar} defaultStartDate={selectedDate} />
        <TaskList />
      </div>
    </div>
  );
};

export default CalendarPage;
