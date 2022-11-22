import { Icon, IconButton, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import useStore from "../store";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CheckIcon from '@mui/icons-material/Check';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { Box } from "@mui/system";

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
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, alignItems: 'center', flex: '5'}} >
                    <NotificationsActiveIcon color='primary' fontSize="large" />
                    <span>{task.text}</span>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: '1' }}>
                    <Typography variant="caption" display="block" gutterBottom>{task.timeout} minutes</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: '1' }} >
                    {task != null &&
                        <>
                            <IconButton onClick={closePanel} color="success">
                                <CheckIcon fontSize="large" />
                            </IconButton>
                            <IconButton onClick={restartTask} color="info">
                                <RestartAltIcon fontSize="large" />
                            </IconButton>
                        </>
                    }
                </Box>
            </Box >
        </>
    );
}

export default InfoPanel;
