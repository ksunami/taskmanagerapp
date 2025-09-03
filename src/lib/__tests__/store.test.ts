import { store } from '../store';
import { addTask } from '../features/tasks/tasksSlice';

describe('store', () => {
  it('dispatches and updates tasks slice', () => {
    store.dispatch(addTask('From store test'));
    const state = store.getState();
    expect(state.tasks.items.some(t => t.description === 'From store test')).toBe(true);
  });
});