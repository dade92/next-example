export interface Movie {
    id: string;
    title: string;
    plot: string;
    fullPlot: string | undefined;
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
    name: string;
    email: string;
    text: string;
}