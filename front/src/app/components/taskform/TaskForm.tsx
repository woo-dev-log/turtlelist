import React, { useEffect, useState } from 'react';
import { getTodayDate } from '@/utils/dateutils';
import { Task } from '@/types/TaskTypes';
import styles from './taskform.module.scss';

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
        <form onSubmit={handleSubmit} className={styles.formContainer}>
            <div className={styles.dateContainer}>
                <div className={styles.formButton}>
                    <button
                        type="button"
                        className={`${styles.toggleButton} ${day === 'today' ? styles.active : ''}`}
                        onClick={() => handleDayChange('today')}
                    >
                        하루
                    </button>
                    <button
                        type="button"
                        className={`${styles.toggleButton} ${day === 'range' ? styles.active : ''}`}
                        onClick={() => handleDayChange('range')}
                    >
                        기간 설정
                    </button>
                </div>

                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className={styles.inputField}
                    required
                />

                {day === 'range' && (
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className={styles.inputField}
                        required
                    />
                )}
            </div>

            <div className={styles.timeContainer}>
                <div className={styles.formButton}>
                    <button
                        type="button"
                        className={`${styles.toggleButton} ${hour === 'all' ? styles.active : ''}`}
                        onClick={() => handleHourChange('all')}
                    >
                        종일
                    </button>
                    <button
                        type="button"
                        className={`${styles.toggleButton} ${hour === 'hour' ? styles.active : ''}`}
                        onClick={() => handleHourChange('hour')}
                    >
                        시간 설정
                    </button>
                </div>

                {hour === "hour" && (
                    <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className={styles.inputField}
                        required
                    />
                )}
            </div>

            <div className={styles.inputContainer}>
                <input
                    type='text'
                    placeholder="할 일을 입력하세요"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={styles.inputField}
                    required
                />

                <button type="submit" className={styles.submitButton}>추가</button>
            </div>
        </form>
    );
};

export default TaskForm;