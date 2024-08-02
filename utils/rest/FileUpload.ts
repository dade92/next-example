export type FileUpload = (file: File, onUploadCompleted: (location: string) => void, onUploadError: () => void) => void;

interface UploadResponse {
    imageLocation: string;
}

export const RestFileUpload: FileUpload = (file: File, onUploadCompleted: (location: string) => void, onUploadError: () => void) => {
    const formData = new FormData();

    formData.append(
        "file",
        file,
        file.name
    );
    //TODO when I have the public domain, change this! At the moment, it's something stubbed just to see the UI behaviour
    //it does not upload anything, just returns a fixed url from a bucket that should have been uploaded before!!
    //Basically I implementedin this project a sort of proxy to be able to validate locally without CORS problems
    fetch('http://localhost:3000/api/upload', {
        method: 'POST',
        body: formData,
    }).then((r) =>
        r.json() as any as UploadResponse
    ).then(r => {
        onUploadCompleted(r.imageLocation);
    }).catch(() => {
        onUploadError();
    })
}