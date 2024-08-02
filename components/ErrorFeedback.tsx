import {FC} from "react";
import {Alert} from "@mui/material";

interface Props {
    message: string;
}

export const ErrorFeedback: FC<Props> = ({message}) => {
    return <Alert severity="error">{message}</Alert>
}