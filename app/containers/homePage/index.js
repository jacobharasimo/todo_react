/*
 * HomePage
 *
 * This is the first thing users see of our homePage, at the '/' route
 */

import React, { useState, useEffect } from 'react';
import { compose } from 'redux';
import { Flex, Box, Text, Button, Card } from 'rebass';
import { Input, Label } from '@rebass/forms';

import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import { loadAllTask, loadSaveTask, loadUpdateTask } from './actions';
import { makeSelectAllTodos } from './selectors';

const key = 'home';

const HomePage = () => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const [newTask, setNewTask] = useState('');
  const dispatch = useDispatch();
  const todos = useSelector(makeSelectAllTodos);
  const addTask = e => {
    e.preventDefault();
    dispatch(loadSaveTask({ task: newTask }));
  };

  const toggleCheck = todo => {
    dispatch(loadUpdateTask({task:todo}));
  };

  useEffect(() => {
    dispatch(loadAllTask());
  }, []);

  return (
    <Flex flexDirection="column">
      <Box variant="container">
        <Text as="h1">todos</Text>
      </Box>
      <Box>
        <form onSubmit={addTask}>
          <Input
            placeholder="Add a Task"
            value={newTask}
            onChange={e => {
              setNewTask(e.target.value);
            }}
          />
        </form>
      </Box>
      <Card>
        <Box>
          <Flex as="ul">
            <Box as="li">
              <Button>All</Button>
            </Box>
            <Box as="li">
              <Button>Active</Button>
            </Box>
            <Box as="li">
              <Button>Complete</Button>
            </Box>
          </Flex>
        </Box>
        <Box>
          <Flex as="ul">
            {todos &&
              todos.map(todo => (
                <Box a="li">
                  <Label>
                    <input
                      onClick={toggleCheck(todo)}
                      type="checkbox"
                      checked={Object.prototype.hasOwnProperty.call(
                        todo,
                        'completedAt',
                      )}
                    />
                    {todo.text}
                  </Label>
                </Box>
              ))}
          </Flex>
        </Box>
      </Card>
    </Flex>
  );
};

HomePage.propTypes = {};

HomePage.defaultProps = {};

export default compose(HomePage);
