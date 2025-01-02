import { Task } from '@/types/TaskTypes';
import { create } from 'zustand';

interface ListState {
    todos: Task[];
    addList: (title: string, start: string, end?: string, color?: string) => void;
    deleteList: (id: string) => void;
}

const useListStore = create<ListState>((set) => ({
    todos: [
        { id: "1", title: '스키장', start: '2025-01-04T21:00:00', end: '2025-01-05T04:00:00', color: '#fb8494' },
        { id: "2", title: '국밥 먹기', start: '2025-01-05T06:00:00' },
        { id: "3", title: '영화 시사회', start: '2025-01-07T19:30:00' },
        { id: "4", title: '아침 회의', start: '2025-01-20T10:00:00'},
        { id: "5", title: 'WBS 작성', start: '2025-01-20T10:00:00', end: '2025-01-21T12:00:00' },
        { id: "6", title: '오징어게임2 보기', start: '2025-01-18T17:50:00' },
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
