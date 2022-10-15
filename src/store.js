import create from 'zustand'

const taksSlice = (set) => ({
    tasks: [],
    addTask: (text, timeout) => {
        set((state) => ({ tasks: [...state.tasks, { text: text, id: crypto.randomUUID(), timeout: timeout }] }));
    },
    removeTask: (id) => {
        set((state) => ({ tasks: state.tasks.filter(x => x.id != id) }));
    },
});

const useStore = create((set, get) => ({
    ...taksSlice(set)
}));

export default useStore;