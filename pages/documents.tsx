import React, {FC, useState} from "react";
import {Alert, Button, Snackbar} from "@mui/material";

const Documents: FC = () => {
    const [file, setFile] = useState<File>();
    const [feedback, setFeedback] = useState<boolean>();

    const onFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const onFileUpload = () => {
        // Create an object of formData
        const formData = new FormData();

        // Update the formData object
        formData.append(
            "file",
            file!,
            file!.name
        );

        fetch('http://app-load-balancer-1008930926.eu-central-1.elb.amazonaws.com/api/upload', {
            method: 'POST',
            body: formData,
            mode: 'no-cors' //very bad, just for presentation purposes!
        }).then(() => {
            setFeedback(true);
        }).catch()
    };


    return <div>
        <input
            type="file"
            onChange={onFileChange}
        />
        <Button variant={'contained'} onClick={onFileUpload}>
            Upload!
        </Button>
        {feedback &&
            <Snackbar open={true} autoHideDuration={2000} onClose={() => setFeedback(false)} data-testid={'snackbar'}>
                <Alert severity="success" sx={{width: '100%'}}>
                    Document uploaded successfully
                </Alert>
            </Snackbar>}
    </div>
}

export default Documents;