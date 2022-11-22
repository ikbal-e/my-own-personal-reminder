import { Box, Button, IconButton } from "@mui/material";
import React, { useState } from "react"
import { useTimer } from "react-timer-hook";
import useStore from "../store";
import DeleteIcon from '@mui/icons-material/Delete';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

const Task = (props) => {

    const removeTask = useStore(state => state.removeTask);
    const [isFinished, setIsFinished] = useState(false);
    const time = new Date();
    const timer = new useTimer({ expiryTimestamp: time.setMinutes(time.getMinutes() + +props.timeout), onExpire: () => timerFinished(), autoStart: false });

    const timerFinished = () => {
        window.electronAPI.taskFinished(props.id);
        setIsFinished(true);
    }

    window.electronAPI.restartTaskToRenderer((event, id) => {
        if (props.id === id) {
            restart();
        }
    })

    const restart = () => {
        setIsFinished(false);
        timer.restart(new Date().setMinutes(new Date().getMinutes() + +props.timeout), true);
    }

    const remove = () => {
        removeTask(props.id);
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ flex: '7', mx: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center,'}}>
                {props.text}
                {isFinished &&
                    <>
                        <span> <PriorityHighIcon color="warning" /> </span>
                    </>
                }
                </Box>
            </Box>
            <Box sx={{ flex: '1', mx: 2 }}>
                {timer.minutes}:{timer.seconds}
            </Box>
            <Box sx={{ flex: '2', mx: 2 }}>
                {!isFinished && (timer.isRunning
                    ? <IconButton onClick={() => timer.pause()}>
                        <PauseIcon />
                    </IconButton>
                    : <IconButton onClick={() => timer.resume()} color="success">
                        <PlayArrowIcon />
                    </IconButton>
                )}
                <IconButton onClick={restart} color="info">
                    <RestartAltIcon />
                </IconButton>
                <IconButton onClick={remove} color="error">
                    <DeleteIcon />
                </IconButton>
            </Box>
        </Box>
    )
}

export default Task;