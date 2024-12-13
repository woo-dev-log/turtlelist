'use client';

import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import './Calendar.scss';

const CalendarPage = () => {
  const [events, setEvents] = useState([
    { title: '아침 먹기', start: '2024-12-17', end: '2024-12-17', color: '#fb8494' },
    { title: '점심 먹기', start: '2024-12-19', end: '2024-12-20', color: '#fb8494' },
    { title: '저녁 먹기', start: '2024-12-23', end: '2024-12-30', color: '#fb8494' },
    { title: '아침 회의', start: '2024-12-19T10:00:00', end: '2024-12-20T11:00:00' },
    { title: '점심 식사', start: '2024-12-19T12:00:00', end: '2024-12-20T13:00:00' },
    { title: '점심 식사', start: '2024-12-19T12:00:00', end: '2024-12-20T13:00:00' },
    { title: '점심 식사', start: '2024-12-19T12:00:00', end: '2024-12-20T13:00:00' },
  ]);

  // 이벤트 추가 함수
  const addEvent = () => {
    const newEvent = {
      title: '새로운 일정',
      start: '2024-12-25',
      end: '2024-12-25',
      color: '#84b6fb',
    };
    setEvents([...events, newEvent]); // 기존 events에 새로운 이벤트 추가
  };


  return (
    <div className="container">
      {/* <button onClick={addEvent} className="add-event-button">
        일정 추가
      </button> */}
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
          dateClick={(info) => alert(`${info.dateStr}`)}
          dayCellContent={(e) => e.dayNumberText.replace('일', '')}
          fixedWeekCount={false}
          />
      </div>
    </div>
  );
};

export default CalendarPage;
