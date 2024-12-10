'use client';

import { useState } from "react";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";

export default function TodoList() {
    const [todos, setTodos] = useState<string[]>([]);

    const addTodo = (todo: string) => {
        setTodos((todoList) => [...todoList, todo]);
    };

    const updateTodo = (index: number, newTodo: string) => {
        setTodos((todoList) =>
            todoList.map((todo, i) => (i === index ? newTodo : todo))
        );
    };

    const deleteTodo = (index: number) => {
        setTodos((todoList) => todoList.filter((_, i) => i !== index));
    };

    return (
        <div>
            <TodoForm onAdd={addTodo} />

            <ul>
                {todos.map((todo, index) => (
                    <TodoItem
                        key={index}
                        todo={todo}
                        onUpdate={(newTodo) => updateTodo(index, newTodo)}
                        onDelete={() => deleteTodo(index)}
                    />
                ))}
            </ul>
        </div>
    )
}