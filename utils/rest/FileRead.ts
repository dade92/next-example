export type FileRead = (filename: string, onFileReadCompleted: (content: string) => void) => void;

export const RestFileRead: FileRead = (filename: string, onFileReadCompleted: (content: string) => void) => {
    //TODO the host in the url must be changed
    fetch(`http://app-load-balancer-703479439.eu-central-1.elb.amazonaws.com/api/read?fileName=${filename}`, {
        method: 'GET',
    })
        .then(r => r.json())
        .then(r => {
            onFileReadCompleted(r.content)
        }).catch(() => {
        console.log('There was a problem reading that file')
    })
}