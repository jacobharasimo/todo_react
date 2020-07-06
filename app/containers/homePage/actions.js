/*
 * Home Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import { createActions } from 'redux-actions';

export const { loadSample, loadedSample, errorSample } = createActions(
  'LOAD_SAMPLE',
  'LOADED_SAMPLE',
  'ERROR_SAMPLE',
);

export const { loadSaveTask, loadedSaveTask, errorSaveTask } = createActions(
  'LOAD_SAVE_TASK',
  'LOADED_SAVE_TASK',
  'ERROR_SAVE_TASK',
);

export const { loadAllTask, loadedAllTask, errorAllTask } = createActions(
  'LOAD_ALL_TASK',
  'LOADED_ALL_TASK',
  'ERROR_ALL_TASK',
);

export const { loadUpdateTask, loadedUpdateTask, errorUpdateTask } = createActions(
  'LOAD_UPDATE_TASK',
  'LOADED_UPDATE_TASK',
  'ERROR_UPDATE_TASK',
);
