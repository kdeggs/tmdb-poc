import {useColorScheme} from '@mui/joy/styles';
import {IconButton} from "@mui/joy";
import {LightModeOutlined, ModeNightOutlined} from "@mui/icons-material";

export function ModeToggle() {
    const {mode, setMode} = useColorScheme();

    return (
        <IconButton
            size="sm"
            variant="outlined"
            color="primary"
            onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
        >
            {mode === 'dark' ? <ModeNightOutlined/> : <LightModeOutlined/>}
        </IconButton>
    );
}
