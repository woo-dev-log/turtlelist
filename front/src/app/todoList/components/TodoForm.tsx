'use client';

import { useState } from "react"

export default function TodoForm({ onAdd }: { onAdd?: (todo: string) => void }) {
    const [text, setText] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    const handleAddTodo = () => {
        if (text.trim()) {
            onAdd?.(text);
            setText('');
        }
    };

    return (
        <div>
            <input
                type="text"
                value={text}
                onChange={handleInputChange}
                placeholder="할 일을 입력하세요"
            />
            <button onClick={handleAddTodo}>추가</button>
        </div>
    );
}