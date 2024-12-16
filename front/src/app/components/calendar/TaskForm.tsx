import React, { useEffect, useState } from 'react';
import { getTodayDate } from '../dateutils';

interface Task {
    title: string;
    start: string;
    end?: string;
    time?: string;
    color?: string;
}

interface TaskFormProps {
    onAddTask: (task: Task) => void;
    defaultStartDate?: string;
}

const TaskForm = ({ onAddTask, defaultStartDate }: TaskFormProps) => {
    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState(getTodayDate());
    const [endDate, setEndDate] = useState('');
    const [time, setTime] = useState('');
    const [day, setDay] = useState('today');
    const [hour, setHour] = useState('all');

    const handleHourChange = (value: string) => {
        setHour(value);
        if (value === 'all') {
            setTime('');
        }
    };

    const handleDayChange = (value: string) => {
        setDay(value);
        if (value === 'today') {
            setStartDate(getTodayDate());
            setEndDate('');
        } else {
            setStartDate('');
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (day === 'today' && title && startDate) {
            onAddTask({ title, start: startDate, time });
        } else if (day === 'range' && title && startDate && endDate) {
            onAddTask({ title, start: startDate, end: endDate, time });
        }

        setTitle('');
        setStartDate(getTodayDate());
        setEndDate('');
        setTime('');
        setDay('today');
        setHour('all');
    };

    useEffect(() => {
        if (defaultStartDate) {
            setStartDate(defaultStartDate);
        }
    }, [defaultStartDate]);

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="할 일"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />

            <div>
                <label>
                    <input
                        type="radio"
                        value="today"
                        checked={day === 'today'}
                        onChange={() => handleDayChange('today')}
                    />
                    하루
                </label>
                <label>
                    <input
                        type="radio"
                        value="range"
                        checked={day === 'range'}
                        onChange={() => handleDayChange('range')}
                    />
                    기간 설정
                </label>
            </div>

            <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
            />

            {day === 'range' && (
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                />
            )}

            <div>
                <label>
                    <input
                        type="radio"
                        value="all"
                        checked={hour === 'all'}
                        onChange={() => handleHourChange('all')}
                    />
                    종일
                </label>
                <label>
                    <input
                        type="radio"
                        value="hour"
                        checked={hour === 'hour'}
                        onChange={() => handleHourChange('hour')}
                    />
                    시간 설정
                </label>
            </div>

            {hour === "hour" && (
                <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                />
            )}

            <button type="submit">추가</button>
        </form>
    );
};

export default TaskForm;