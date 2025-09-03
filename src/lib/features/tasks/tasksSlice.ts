import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from './types';

interface TasksState { items: Task[]; }
const initialState: TasksState = { items: [] };

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<string>) {
      const description = action.payload.trim();
      if (!description) return; // no agregar vacío
      state.items.push({ id: crypto.randomUUID(), description });
    }
  }
});

export const { addTask } = tasksSlice.actions;
export default tasksSlice.reducer;
