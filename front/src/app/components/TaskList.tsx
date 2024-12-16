import { useState } from "react";
import TodoItem from "../todoList/components/TodoItem";

interface Task {
    title: string;
    start: string;
    end?: string;
    time?: string;
    color?: string;
}

interface TaskListProps {
    eventsList: Task[];
}

export default function TaskList({ eventsList }: TaskListProps) {
    const [list, setList] = useState(eventsList);

    const deleteTodo = (index: number) => {
        setList((eventsList) => list.filter((_, i) => i !== index));
    };

    return (
        <div>
            {list.map((event, i) => (
                <div key={i}>
                    <h3>{event.title}</h3>
                    <p>시작 날짜: {event.start}</p>
                    {event.end && <p>종료 날짜: {event.end}</p>}
                    {event.time && <p>시간: {event.time}</p>}
                    <TodoItem
                        key={i}
                        todo={event.title}
                        // onUpdate={(newTodo) => updateTodo(index, newTodo)}
                        onDelete={() => deleteTodo(i)}
                    />
                </div>
            ))}
        </div>
    );
}