export interface Movie {
    id: string;
    title: string;
    plot: string;
    fullPlot: string;
    posterUrl: string;
    year: number;
    genres: string[];
    directors: string[];
    rating: number;
    googleLink: string;
    releaseDate: Date | null;
    trailer: string | undefined;
}

export interface MovieDetail {
    comments: Comment[];
}

export interface Comment {
    name: string;
    email: string;
    text: string;
}