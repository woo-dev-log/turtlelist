'use client';

import useListStore from "@/store/listStore";
import styles from "./tasklist.module.scss";
import { formatTime } from "@/utils/dateutils";
import { Task } from "@/types/TaskTypes";

const groupTodosByDate = (todos: Task[]): Record<string, Task[]> => {
    return todos.reduce((groups, todo) => {
        const dateKey = todo.start.split('T')[0];

        if (!groups[dateKey]) {
            groups[dateKey] = [];
        }
        
        groups[dateKey].push(todo);
        return groups;
    }, {} as Record<string, Task[]>);
};

export default function TaskList() {
    const { todos, deleteList } = useListStore();
    const groupedTodos = groupTodosByDate(todos);
    const sortedDates = Object.keys(groupedTodos).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

    return (
        <div style={{ height: "450px", overflowY: "auto" }}>
            {sortedDates.map((date) => (
                <div key={date} className={styles.dateGroup}>
                    <div className={styles.dateHeader}>{date}</div>
                    {groupedTodos[date].map((event) => (
                        <div key={event.id} className={styles.listContainer}>
                            <div className={styles.listTitle}>{event.title}</div>
                            <div className={styles.listDate}>
                                <p>시작일: {formatTime(new Date(event.start))}</p>
                                {event.end && <p>종료일: {formatTime(new Date(event.end))}</p>}
                                {/* <p>시작일: {event.start.includes('T') ? formatTime(new Date(event.start)) : event.start}</p>
                                {event.end && <p>종료일: {event.end.includes('T') ? formatTime(new Date(event.end)) : event.end}</p>} */}
                                {event.time && <p>시간: {formatTime(new Date(event.time))}</p>}
                                <button onClick={() => deleteList(event.id ? event.id : "0")} className={styles.deleteButton}>
                                    삭제
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );

    // return (
    //     <div>
    //         {todos.map((event, i) => (
    //             <div key={event.id} className={styles.listContainer}>
    //                 <div className={styles.listTitle}>{event.title}</div>
    //                 <div className={styles.listDate}>
    //                     <p>시작 날짜: {formatTime(new Date(event.start))}</p>
    //                     {event.end && <p>종료 날짜: {formatTime(new Date(event.end))}</p>}
    //                     {event.time && <p>시간: {formatTime(new Date(event.time))}</p>}
    //                     <button onClick={() => deleteList(event.id)}>삭제</button>
    //                 </div>
    //             </div>
    //         ))}
    //     </div>
    // );
}
