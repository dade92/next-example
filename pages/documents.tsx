import React, {FC, useState} from "react";
import {Alert, Button, Snackbar, TextareaAutosize} from "@mui/material";
import styled from "styled-components";
import {useRouter} from "next/router";
import {UploadButton} from "../components/UploadButton";
import {FileUpload, RestFileUpload} from "../utils/rest/FileUpload";
import {FileRead, RestFileRead} from "../utils/rest/FileRead";

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

interface Props {
    fileUpload: FileUpload
    fileRead: FileRead
}

const Documents: FC<Props> = ({fileUpload, fileRead}) => {
    const router = useRouter();
    const [file, setFile] = useState<File | null>();
    const [content, setContent] = useState<string>('')
    const [buttonEnabled, setButtonEnabled] = useState<boolean>(false);
    const [feedback, setFeedback] = useState<boolean>();

    const onFileChange = (event) => {
        setFile(event.target.files[0]);
        setButtonEnabled(true);
    };

    const onFileUpload = () => {
        if (file != null) {
            fileUpload(file, () => setFeedback(true));
        }
    };

    const read = () => {
        fileRead(file!.name, (content: string) => setContent(content));
    };

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
            <Button disabled={!buttonEnabled} variant={"contained"} onClick={read}>Read</Button>
        </HorizontalWrapper>
        <Button variant="outlined" onClick={() => router.push('/')}> Back </Button>
    </Wrapper>
}

const MainDocuments: FC = () => <Documents fileUpload={RestFileUpload} fileRead={RestFileRead}/>

export default MainDocuments;