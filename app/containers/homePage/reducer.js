/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { handleActions } from 'redux-actions';
import {
  loadedAllTask,
  loadedSample,
  loadedSaveTask, loadedUpdateTask,
  loadSample,
} from './actions';

// The initial state of the Main
export const initialState = {
  sample: null,
  todos: [],
};

/* eslint-disable default-case, no-param-reassign */
const homeReducer = handleActions(
  {
    [loadSample]: produce(draft => {
      draft.sample = initialState.sample;
      return draft;
    }),
    [loadedSample]: produce((draft, action) => {
      draft.sample = action.payload.sample;
      return draft;
    }),
    [loadedSaveTask]: produce((draft, action) => {
      const { todo } = action.payload;
      draft.todos.push(todo);
      return draft;
    }),
    [loadedAllTask]: produce((draft, action) => {
      const { todos } = action.payload;
      draft.todos = todos;
      return draft;
    }),
    [loadedUpdateTask]: produce((draft, action) => {
      const { todo } = action.payload;
      const newTodos = draft.todos.map(item => {
        if (item._id === todo._id) {
          return todo;
        }
        return item;
      });
      draft.todos = newTodos;
      debugger;
      draft.todos = todos;
      return draft;
    }),
  },
  initialState,
);

export default homeReducer;
