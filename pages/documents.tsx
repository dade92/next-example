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

const HorizontalWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 16px;
    justify-content: space-between;
`

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
        //TODO when I have the public domain, change this!
        fetch('http://app-load-balancer-236466362.eu-central-1.elb.amazonaws.com/api/upload', {
            method: 'POST',
            body: formData,
            mode: 'no-cors' //very bad, just for presentation purposes!
        }).then(() => {
            setFeedback(true);
        }).catch()
    };

    //TODO the host in the url must be changed
    const readFile = () => {
        fetch(`http://localhost:3000/api/read?fileName=${file?.name}`, {
            method: 'GET',
        })
            .then(r => r.json())
            .then(r => {
                setContent(r.content)
            }).catch(() => {
                console.log('There was a problem reading that file')
            })
    }


    return <Wrapper>
        <HorizontalWrapper>
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
        </HorizontalWrapper>
        <HorizontalWrapper>
            {<TextareaAutosize
                minRows={3}
                defaultValue={content}
            />}
            <Button disabled={!buttonEnabled} variant={"contained"} onClick={readFile}>Read</Button>
        </HorizontalWrapper>
        <Button variant="outlined" onClick={() => router.push('/')}> Back </Button>
    </Wrapper>
}

export default Documents;