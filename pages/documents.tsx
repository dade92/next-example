import React, {FC, useEffect, useState} from "react";
import {Alert, Button, Snackbar} from "@mui/material";
import styled from "styled-components";
import {useRouter} from "next/router";
import {UploadButton} from "../components/UploadButton";
import {FileUpload, RestFileUpload} from "../utils/rest/FileUpload";
import {FileRead, RestFileRead} from "../utils/rest/FileRead";
import {ErrorFeedback} from "../components/ErrorFeedback";
import {Post, PostsRetriever, RestPostsRetriever} from "../utils/rest/PostsRetriever";

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
    fileRead: FileRead,
    postsRetriever: PostsRetriever
}

const Documents: FC<Props> = ({fileUpload, fileRead, postsRetriever}) => {
    const router = useRouter();
    const [file, setFile] = useState<File | null>();
    const [imageLocation, setImageLocation] = useState<string | null>(null);
    const [successFeedback, setSuccessFeedback] = useState<boolean>();
    const [errorFeedback, setErrorFeedback] = useState<boolean>();
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        postsRetriever().then(posts => setPosts(posts))
    })

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
        {
            posts.map(p => {
                return <img
                    src={p.imageLocation}
                    key={p.name}
                    width={400}
                    height={400}
                    alt="Uploaded picture"
                />
            })
        }
        {/*{imageLocation && <div>*/}
        {/*    <img*/}
        {/*        src={imageLocation}*/}
        {/*        width={400}*/}
        {/*        height={400}*/}
        {/*        alt="Uploaded picture"*/}
        {/*    />*/}
        {/*</div>}*/}
        <Button variant="outlined" onClick={() => router.push('/')}> Back </Button>
    </Wrapper>
}

const MainDocuments: FC = () => <Documents fileUpload={RestFileUpload} fileRead={RestFileRead}
                                           postsRetriever={RestPostsRetriever}/>

export default MainDocuments;