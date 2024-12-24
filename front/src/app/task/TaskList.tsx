'use client';

import useListStore from "@/store/listStore";
import styles from "./tasklist.module.scss";
import { formatTime } from "@/utils/dateutils";

export default function TaskList() {
    const { todos, deleteList } = useListStore();

    return (
        <div>
            {todos.map((event, i) => (
                <div key={event.id} className={styles.listContainer}>
                    <div className={styles.listTitle}>{event.title}</div>
                    <div className={styles.listDate}>
                        <p>시작 날짜: {formatTime(new Date(event.start))}</p>
                        {event.end && <p>종료 날짜: {formatTime(new Date(event.end))}</p>}
                        {event.time && <p>시간: {formatTime(new Date(event.time))}</p>}
                        <button onClick={() => deleteList(event.id)}>삭제</button>
                    </div>
                </div>
            ))}
        </div>
    );
}
