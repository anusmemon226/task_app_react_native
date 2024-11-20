import { create } from 'zustand'

type Store = {
    uniqueCategories: any
    categories: any
    tasks: any
    setUniqueCategories: (uniqueCat:any)=>void
    setCategories: (data:any) => void
    setTasks : (tasks:any)=>void
}

export const useStore = create<Store>()((set) => ({
    uniqueCategories:[],
    categories: [],
    tasks : [],
    setCategories: (data:any) => {
        set(() => ({ categories: data}))
    },
    setUniqueCategories:(uniqueCat:any)=>{
        set(()=>({uniqueCategories:uniqueCat}))
    },
    setTasks: (tasks:any)=>{
        set(()=> ({ tasks : tasks}))
    }
}))