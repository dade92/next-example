export type FileUpload = (file: File, onUploadCompleted: (location: string) => void) => void;

interface UploadResponse {
    imageLocation: string;
}

export const RestFileUpload: FileUpload = (file: File, onUploadCompleted: (location: string) => void) => {
    const formData = new FormData();

    formData.append(
        "file",
        file,
        file.name
    );
    //TODO when I have the public domain, change this!
    fetch('http://app-load-balancer-1556041158.eu-central-1.elb.amazonaws.com/api/upload', {
        method: 'POST',
        body: formData,
    }).then((r) =>
        r.json() as any as UploadResponse
    ).then(r => {
        onUploadCompleted(r.imageLocation);
    }).catch()
}