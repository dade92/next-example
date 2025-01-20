import {FC} from "react";
import {Box, Button} from "@mui/material";

interface Props {
    onBackClicked: () => void;
}

export const FloatingBackButton: FC<Props> = ({onBackClicked}) => {
    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: 20,
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0)',
                padding: '10px 20px',
                borderRadius: '5px',
                boxShadow: 0,
            }}
        >
            <Button
                variant="contained"
                onClick={onBackClicked}
                sx={{marginRight: 2}}
            >
                &lt; Back to movies
            </Button>
        </Box>
    );
}