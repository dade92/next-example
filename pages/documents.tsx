import React, {FC, useEffect, useState} from "react";
import {Alert, Button, Snackbar} from "@mui/material";
import styled from "styled-components";
import {useRouter} from "next/router";
import {UploadButton} from "../components/UploadButton";
import {FileUpload, RestFileUpload} from "../utils/rest/FileUpload";
import {ErrorFeedback} from "../components/ErrorFeedback";
import {Post, PostsRetriever, RestPostsRetriever} from "../utils/rest/PostsRetriever";

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

const ButtonWithMargin = styled(Button)`
    margin-top: 16px;
`

interface Props {
    fileUpload: FileUpload
    postsRetriever: PostsRetriever
}

const Documents: FC<Props> = ({fileUpload, postsRetriever}) => {
    const router = useRouter();
    const [file, setFile] = useState<File | null>();
    const [successFeedback, setSuccessFeedback] = useState<boolean>();
    const [errorFeedback, setErrorFeedback] = useState<boolean>();
    const [posts, setPosts] = useState<Post[]>([]);

    const fetchPosts = () => {
        postsRetriever()
            .then(posts => setPosts(posts))
            .catch(e => console.log('Error retrieving posts!'))
    };

    useEffect(() => {
        fetchPosts();
    }, [])

    const onFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const onUploadCompleted = (location: string) => {
        setSuccessFeedback(true);
        fetchPosts();
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
        <ButtonWithMargin variant="outlined" onClick={() => router.push('/')}> Back </ButtonWithMargin>
    </Wrapper>
}

const MainDocuments: FC = () => <Documents fileUpload={RestFileUpload} postsRetriever={RestPostsRetriever}/>

export default MainDocuments;