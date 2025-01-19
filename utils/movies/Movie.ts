export interface Movie {
    id: string;
    title: string;
    plot: string;
    posterUrl: string;
    year: number;
    genres: string[];
    directors: string[];
    rating: number;
}

export interface MovieDetail {
    comments: Comment[];
}
export interface Comment {
    email: string;
    text: string;
}