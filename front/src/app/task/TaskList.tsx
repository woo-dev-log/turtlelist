'use client';

import useListStore from "@/store/listStore";
import styles from "./tasklist.module.scss";
import { formatTime } from "@/utils/dateutils";
import { Task } from "@/types/TaskTypes";

const groupTodosByDate = (todos: Task[]): Record<string, Task[]> => {
    return todos.reduce((groups, todo) => {
        const dateKey = new Date(todo.start).toISOString().split('T')[0];
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
        <div>
            {sortedDates.map((date) => (
                <div key={date} className={styles.dateGroup}>
                    <h3 className={styles.dateHeader}>{date}</h3>
                    {groupedTodos[date].map((event) => (
                        <div key={event.id} className={styles.listContainer}>
                            <div className={styles.listTitle}>{event.title}</div>
                            <div className={styles.listDate}>
                                <p>시작 날짜: {formatTime(new Date(event.start))}</p>
                                {event.end && <p>종료 날짜: {formatTime(new Date(event.end))}</p>}
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
