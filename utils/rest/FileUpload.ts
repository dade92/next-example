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
    //TODO when I have the public domain, change this!
    fetch('http://localhost:8080/api/upload', {
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