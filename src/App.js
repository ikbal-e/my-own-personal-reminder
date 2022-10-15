import { useRef } from 'react';
import './App.css';
import useStore from './store';
import Task from './task';

function App() {
  const tasks = useStore(state => state.tasks);
  const addTask = useStore(state => state.addTask);

  const addNewTaskInputRef = useRef();
  const taskTimeoutInputRef = useRef();
  const addNewTask = (taskName, timeout) => {
    addTask(taskName, timeout);
    addNewTaskInputRef.current.value = '';
    taskTimeoutInputRef.current.value = '';
  }

  return (
    <div className="App">
      <label htmlFor="newTaskName">Task:</label>
      <input ref={addNewTaskInputRef} type="text" id="newTaskName" name="newTaskName"></input>
      <label htmlFor="taskTimeout">Minutes</label>
      <input ref={taskTimeoutInputRef} type="text" id="taskTimeout" name="taskTimeout"></input>
      <button onClick={() => addNewTask(addNewTaskInputRef.current.value, taskTimeoutInputRef.current.value)}>Add</button>
      <ul>
        {tasks.map((t, i) => (
          <Task key={i} text={t.text} id={t.id} timeout={t.timeout}/>
        ))}
      </ul>
    </div>
  );
}

export default App;
