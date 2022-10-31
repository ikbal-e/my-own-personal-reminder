import React, { useState } from "react"
import { useTimer } from "react-timer-hook";
import useStore from "../store";

const Task = (props) => {

    const removeTask = useStore(state => state.removeTask);
    const [isFinished, setIsFinished] = useState(false);
    const time = new Date();
    const timer = new useTimer({ expiryTimestamp: time.setSeconds(time.getSeconds() + +props.timeout), onExpire: () => timerFinished(), autoStart: false });

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
        timer.restart(new Date().setSeconds(new Date().getSeconds() + +props.timeout), true);
    }

    const remove = () => {
        removeTask(props.id);
    }

    return (
        <div>
            {timer.minutes}:{timer.seconds}
            {props.text}
            {isFinished &&
                <>
                    <div>Finished</div>
                </>
            }
            {!isFinished && (timer.isRunning
                ? <button onClick={() => timer.pause()}>Pause</button>
                : <button onClick={() => timer.resume()}>Resume</button>
            )}
            <button onClick={restart}>Restart</button>
            <button onClick={remove}>Remove</button>

        </div>
    )
}

export default Task;