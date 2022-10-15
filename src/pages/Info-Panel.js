import { useSearchParams } from "react-router-dom";
import useStore from "../store";

const InfoPanel = () => {

    const [searchParams] = useSearchParams();

    const tasks = useStore(state => state.tasks);
    const taskId = searchParams.get('id');
    const task = tasks.find(x => x.id === taskId);

    const restartTask = () => {
        window.electronAPI.restartTaskToMain(taskId);
        closePanel();
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
