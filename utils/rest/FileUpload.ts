export type FileUpload = (file: File, onUploadCompleted: () => void) => void;

export const RestFileUpload: FileUpload = (file: File, onUploadCompleted: () => void) => {
    const formData = new FormData();

    formData.append(
        "file",
        file,
        file.name
    );
    //TODO when I have the public domain, change this!
    fetch('http://app-load-balancer-703479439.eu-central-1.elb.amazonaws.com/api/upload', {
        method: 'POST',
        body: formData,
    }).then(() => {
        onUploadCompleted();
    }).catch()
}