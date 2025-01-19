export interface Movie {
    id: string;
    title: string;
    plot: string;
    posterUrl: string;
}

export interface MovieDetail {
    comments: Comment[];
}
export interface Comment {
    email: string;
    text: string;
}