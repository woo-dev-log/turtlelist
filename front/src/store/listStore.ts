import { Task } from '@/types/TaskTypes';
import { create } from 'zustand';

interface ListState {
    todos: Task[];
    addList: (title: string, start: string, end?: string, color?: string) => void;
    deleteList: (id: string) => void;
}

const useListStore = create<ListState>((set) => ({
    todos: [
        { id: "1", title: '아침 먹기', start: '2025-01-17T00:00:00', end: '2025-01-18T23:59:59', color: '#fb8494' },
        { id: "2", title: '점심 먹기', start: '2025-01-19T00:00:00', end: '2025-01-21T23:59:59', color: '#fb8494' },
        { id: "3", title: '저녁 먹기', start: '2025-01-23T00:00:00', end: '2025-01-27T23:59:59', color: '#fb8494' },
        { id: "4", title: '아침 회의', start: '2025-01-19T10:00:00', end: '2025-01-22T11:00:00' },
        { id: "5", title: '점심 식사', start: '2025-01-19T12:00:00', end: '2025-01-20T13:00:00' },
        { id: "6", title: '오징어게임2 보기', start: '2025-01-25T17:50:00' },
    ],

    addList: (title, start, end = '', color = '#ffffff') =>
        set((state) => {
            const newId = String(state.todos.length + 1);
            return {
                todos: [
                    ...state.todos,
                    {
                        id: newId,
                        title,
                        start,
                        end,
                        color,
                    },
                ],
            };
        }),

    deleteList: (id) =>
        set((state) => ({
            todos: state.todos.filter((todo) => todo.id !== id),
        })),
}));

export default useListStore;
