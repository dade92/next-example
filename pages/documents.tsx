import React, {FC, useState} from "react";
import {Alert, Button, Snackbar, TextareaAutosize} from "@mui/material";
import styled from "styled-components";
import {useRouter} from "next/router";
import {UploadButton} from "../components/UploadButton";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`

const UploadWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 16px;
    justify-content: space-between;
`

export type Data = {
    content: string
}

const Documents: FC = () => {
    const router = useRouter();
    const [file, setFile] = useState<File>();
    const [content, setContent] = useState<string>('')
    const [buttonEnabled, setButtonEnabled] = useState<boolean>(false);
    const [feedback, setFeedback] = useState<boolean>();

    const onFileChange = (event) => {
        setFile(event.target.files[0]);
        setButtonEnabled(true);
    };

    const onFileUpload = () => {
        const formData = new FormData();

        formData.append(
            "file",
            file!,
            file!.name
        );

        fetch('http://app-load-balancer-236466362.eu-central-1.elb.amazonaws.com/api/upload', {
            method: 'POST',
            body: formData,
            mode: 'no-cors' //very bad, just for presentation purposes!
        }).then(() => {
            setFeedback(true);
        }).catch()
    };

    const readFile = () => {
        fetch(`http://app-load-balancer-236466362.eu-central-1.elb.amazonaws.com/api/read?fileName=${file?.name}`, {
            method: 'GET',
        })
            .then(r => r.json())
            .then(r => {
                setContent(r.content)
            })
    }


    return <Wrapper>
        <UploadWrapper>
            <input
                type="file"
                onChange={onFileChange}
            />
            <UploadButton onFileUpload={onFileUpload} disabled={!buttonEnabled}/>
            {feedback &&
                <Snackbar open={true} autoHideDuration={2000} onClose={() => setFeedback(false)}
                          data-testid={'snackbar'}>
                    <Alert severity="success" sx={{width: '100%'}}>
                        Document uploaded successfully
                    </Alert>
                </Snackbar>
            }
        </UploadWrapper>
        <UploadWrapper>
            {<TextareaAutosize
                minRows={3}
                defaultValue={content}
            />}
            <Button disabled={!buttonEnabled} variant={"contained"} onClick={readFile}>Read</Button>
        </UploadWrapper>
        <Button variant="outlined" onClick={() => router.push('/')}> Back </Button>
    </Wrapper>
}

export default Documents;