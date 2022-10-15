import create from 'zustand'
import { persist } from 'zustand/middleware'

const taksSlice = (set, get) => ({
    tasks: [],
    addTask: (text, timeout) => {
        set((state) => ({ tasks: [...state.tasks, { text: text, id: crypto.randomUUID(), timeout: timeout }] }));
    },
    removeTask: (id) => {
        set((state) => ({ tasks: state.tasks.filter(x => x.id != id) }));
    }
});

// const useStore = create(
//     (set, get) => ({
//         ...taksSlice(set)
//     })
// );

const useStore = create(persist(
    (set, get) => ({
        ...taksSlice(set)
    })),
    { name: 'personal-reminder-tasks' }
);

export default useStore;