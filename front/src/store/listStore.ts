import { Task } from '@/types/TaskTypes';
import { create } from 'zustand';

interface ListState {
    todos: Task[];
    addList: (title: string, start: string, end?: string, color?: string) => void;
    deleteList: (id: string) => void;
}

const useListStore = create<ListState>((set) => ({
    todos: [
        { id: "1", title: '아침 먹기', start: '2024-12-17', end: '2024-12-17', color: '#fb8494' },
        { id: "2", title: '점심 먹기', start: '2024-12-19', end: '2024-12-20', color: '#fb8494' },
        { id: "3", title: '저녁 먹기', start: '2024-12-23', end: '2024-12-27', color: '#fb8494' },
        { id: "4", title: '아침 회의', start: '2024-12-19T10:00:00', end: '2024-12-20T11:00:00' },
        { id: "5", title: '점심 식사', start: '2024-12-19T12:00:00', end: '2024-12-20T13:00:00' },
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
