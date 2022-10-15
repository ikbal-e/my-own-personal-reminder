import { useSearchParams } from "react-router-dom";
import Task from "../components/task";
import useStore from "../store";

const InfoPanel = () => {

    const [searchParams] = useSearchParams();

    console.log('heyyy')

    const tasks = useStore(state => state.tasks);
    const taskId = searchParams.get('id');
    const task = tasks.find(x => x.id == taskId);

    const restartTask = () => {
        
    }

    const closePanel = () => {
        window.electronAPI.closePanel();
    }

    return (
        <>
            INFO PANEL: {taskId}
            {task != null &&
                <>
                    {task.text}!
                    <summary>{task.timeout} seconds</summary>
                    <button onClick={closePanel}>OK</button>
                    <button onClick={restartTask}>RESTART</button>
                </>
            }
        </>
    );
}

export default InfoPanel;
