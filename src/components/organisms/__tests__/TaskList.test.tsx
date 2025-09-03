import { screen } from '@testing-library/react';
import { renderWithStore } from '@/test/utils';
import { addTask } from '@/lib/features/tasks/tasksSlice';
import TaskList from '../TaskList';
import { act } from 'react';

describe('TaskList', () => {
  test('shows empty message and then renders items from redux', () => {
    const { store } = renderWithStore(<TaskList />);
    expect(screen.getByText(/no tasks yet/i)).toBeInTheDocument();

    // Cualquier update al store que afecta la UI debe ir en act(...)
    act(() => {
      store.dispatch(addTask('First'));
      store.dispatch(addTask('Second'));
    });

    
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
  });
});
