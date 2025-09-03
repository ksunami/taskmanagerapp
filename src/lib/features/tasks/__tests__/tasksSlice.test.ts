import reducer, { addTask } from '../tasksSlice';

describe('tasksSlice', () => {
  it('adds a non-empty task (trims input)', () => {
    const state = reducer(undefined, addTask('  Hello  '));
    expect(state.items).toHaveLength(1);
    expect(state.items[0].description).toBe('Hello');
    expect(state.items[0].id).toBeTruthy();
  });

  it('ignores empty/whitespace-only task', () => {
    const state = reducer(undefined, addTask('   '));
    expect(state.items).toHaveLength(0);
  });

  it('adds multiple tasks with unique ids', () => {
    let state = reducer(undefined, addTask('One'));
    state = reducer(state, addTask('Two'));
    expect(state.items.map(i => i.description)).toEqual(['One', 'Two']);
    const ids = new Set(state.items.map(i => i.id));
    expect(ids.size).toBe(2);
  });
});
