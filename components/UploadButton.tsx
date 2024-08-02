import React, {FC} from "react";
import {Button} from "@mui/material";


interface Props {
    onFileUpload: () => void;
}

export const UploadButton: FC<Props> = ({onFileUpload}) => {
    return <Button variant={'contained'} onClick={onFileUpload}>
        Upload
    </Button>
}