import create from 'zustand';
import { persist } from 'zustand/middleware';

const taksSlice = (set, get) => ({
    tasks: [],
    addTask: (text, timeout) => {
        set((state) => ({ tasks: [...state.tasks, { text: text, id: crypto.randomUUID(), timeout: timeout }] }));
    },
    restart: (id) => {
        set((state) => ({ counter: state.counter + 1 }))
    },
    removeTask: (id) => {
        set((state) => ({ tasks: state.tasks.filter(x => x.id !== id) }));
    }
});

const useStore = create(persist(
    (set, get) => ({
        ...taksSlice(set)
    })),
    { name: 'personal-reminder-tasks' }
);

export default useStore;