import React, {FC} from "react";
import {Typography} from "@mui/material";

interface Props {
    title: string;
}

export const CardTitle: FC<Props> = ({title}) =>
    <Typography variant={'h5'} color={'textPrimary'} gutterBottom>{title}</Typography>