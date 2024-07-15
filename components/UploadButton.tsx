import React, {FC} from "react";
import {Button} from "@mui/material";


interface Props {
    onFileUpload: () => void;
    disabled: boolean;
}

export const UploadButton: FC<Props> = ({onFileUpload, disabled}) => {
    return <Button variant={'contained'} onClick={onFileUpload} disabled={disabled}>
        Upload
    </Button>
}