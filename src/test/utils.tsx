import React, { PropsWithChildren } from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';

import tasksReducer from '@/lib/features/tasks/tasksSlice';

// ---- DeepPartial local para estados parciales en tests ----
type DeepPartial<T> = { [K in keyof T]?: DeepPartial<T[K]> };

// ---- Root reducer / tipos ----
const rootReducer = combineReducers({
  tasks: tasksReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof makeTestStore>;
export type AppDispatch = AppStore['dispatch'];

// ---- Factory de store para tests ----
export function makeTestStore(preloadedState?: DeepPartial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    // RTK espera PreloadedState<RootState>. Como tu versión no lo exporta,
    // pasamos nuestro DeepPartial y lo casteamos a RootState para el call.
    preloadedState: preloadedState as RootState,
  });
}

interface ExtendedRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  preloadedState?: DeepPartial<RootState>;
  store?: AppStore;
}

export function renderWithStore(
  ui: React.ReactElement,
  { preloadedState, store = makeTestStore(preloadedState), ...opts }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren) {
    return <Provider store={store}>{children}</Provider>;
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...opts }) };
}
