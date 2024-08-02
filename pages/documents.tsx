import React, {FC, useState} from "react";
import {Alert, Button, Snackbar} from "@mui/material";
import styled from "styled-components";
import {useRouter} from "next/router";
import {UploadButton} from "../components/UploadButton";
import {FileUpload, RestFileUpload} from "../utils/rest/FileUpload";
import {FileRead, RestFileRead} from "../utils/rest/FileRead";
import {ErrorFeedback} from "../components/ErrorFeedback";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-top: 400px;
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
    const [imageLocation, setImageLocation] = useState<string | null>(null);
    const [successFeedback, setSuccessFeedback] = useState<boolean>();
    const [errorFeedback, setErrorFeedback] = useState<boolean>();

    const onFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const onUploadCompleted = (location: string) => {
        setSuccessFeedback(true);
        setImageLocation(location);
    };

    const onUploadError = () => {
        setErrorFeedback(true);
    }

    const onFileUpload = () => {
        if (file != null) {
            fileUpload(file, onUploadCompleted, onUploadError);
        }
    };

    return <Wrapper>
        {errorFeedback && <ErrorFeedback message={'There was an error uploading the image'}/>}
        <HorizontalWrapper>
            <input
                type="file"
                onChange={onFileChange}
            />
            <UploadButton onFileUpload={onFileUpload}/>
            {successFeedback &&
                <Snackbar open={true} autoHideDuration={2000} onClose={() => setSuccessFeedback(false)}
                          data-testid={'snackbar'}>
                    <Alert severity="success" sx={{width: '100%'}}>
                        Document uploaded successfully
                    </Alert>
                </Snackbar>
            }
        </HorizontalWrapper>
        {imageLocation && <div>
            <img
                src={'https://davide-s3-12345678900000.s3.eu-central-1.amazonaws.com/Dani.jpg'}
                width={400}
                height={400}
                alt="Uploaded picture"
            />
        </div>}
        <Button variant="outlined" onClick={() => router.push('/')}> Back </Button>
    </Wrapper>
}

const MainDocuments: FC = () => <Documents fileUpload={RestFileUpload} fileRead={RestFileRead}/>

export default MainDocuments;