import {FC} from "react";
import {Typography} from "@mui/material";

interface Props {
    text: string;
}

export const Paragraph: FC<Props> = ({text}) =>
    <Typography variant="body2" sx={{color: 'text.secondary'}}>{text}</Typography>