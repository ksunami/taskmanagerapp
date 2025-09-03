import Home from '../page';
import TasksPage from '../tasks/page';
import ListadoPage from '../listado/page';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { makeTestStore } from '@/test/utils';

describe('Pages', () => {
  test('Home shows navigation links', () => {
    render(<Home />);
    expect(screen.getByRole('link', { name: /tasks/i })).toHaveAttribute('href', '/tasks');
    expect(screen.getByRole('link', { name: /remote list/i })).toHaveAttribute('href', '/listado');
  });

  test('Tasks page renders heading and components', () => {
    const store = makeTestStore();
    render(
      <Provider store={store}>
        <TasksPage />
      </Provider>
    );
    
    expect(screen.getByRole('heading', { name: /tasks/i, level: 2 })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add new task/i })).toBeInTheDocument();
  });

  test('Listado page renders heading', () => {
    render(<ListadoPage />);
    
    expect(screen.getByRole('heading', { name: /remote list/i, level: 2 })).toBeInTheDocument();
  });
});
