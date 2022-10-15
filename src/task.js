import React, { useEffect, useState } from "react"
import { useTimer } from "react-timer-hook";
import useStore from "./store";

const Task = (props) => {

    const removeTask = useStore(state => state.removeTask);
    const [isFinished, setIsFinished] = useState(false);
    const time = new Date();
    const timer = new useTimer({ expiryTimestamp: time.setSeconds(time.getSeconds() + +props.timeout), onExpire: () => timerFinished() });

    const timerFinished = () => {
        window.electronAPI.taskFinished(props.text);
        setIsFinished(true);
    }

    const restart = () => {
        setIsFinished(false);
        timer.restart(new Date().setSeconds(new Date().getSeconds() + +props.timeout));
    }

    const remove = () => {
        removeTask(props.id);
    }

    useEffect(() => {
        //timer.start();
        //return () => clearTimeout(timer);
    }, []);

    return (
        <div>
            {timer.minutes}:{timer.seconds}
            {props.text}
            {isFinished && <>
                <div>Finished</div>
                <button onClick={restart}>Start</button>
            </>
            }
            <button onClick={remove}>Remove</button>

        </div>
    )
}

export default Task;