import { Button, Card, CardContent, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';
import Task from '../components/task';
import useStore from '../store';
import AddIcon from '@mui/icons-material/Add';
import AddTaskIcon from '@mui/icons-material/AddTask';
import AccessAlarmOutlinedIcon from '@mui/icons-material/AccessAlarmOutlined';

const Tasks = () => {
    const tasks = useStore(state => state.tasks);
    const addTask = useStore(state => state.addTask);

    const [newTaskName, setNewTaskName] = useState('');
    const [newTaskTime, setNewTaskTime] = useState('');

    const addNewTask = (taskName, timeout) => {
        addTask(taskName, timeout);
        setNewTaskName('');
        setNewTaskTime('');
    }

    return (
        <>
            <Card variant='outlined'>
                <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
                    <TextField variant='standard' label="Task" id="newTaskName" name="newTaskName"
                        value={newTaskName}
                        onChange={e => setNewTaskName(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AddTaskIcon />
                                </InputAdornment>
                            ),
                        }}
                        sx={{ flex: '7', mx: 2 }}
                    />
                    <TextField variant='standard' label="Minutes" id="taskTimeout" name="taskTimeout"
                        value={newTaskTime}
                        onChange={e => setNewTaskTime(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccessAlarmOutlinedIcon />
                                </InputAdornment>
                            ),
                        }}
                        sx={{ flex: '1', mx: 2 }}
                    />
                    <Button variant='contained'
                        onClick={() => addNewTask(newTaskName, newTaskTime)}
                        endIcon={<AddIcon />}
                        sx={{ flex: '1' }}
                    >
                        Add
                    </Button>
                </CardContent>
            </Card>

            <ul>
                {tasks.map((t, i) => (
                    <Task key={i} text={t.text} id={t.id} timeout={t.timeout} />
                ))}
            </ul>
        </>
    );
}

export default Tasks;
