import NodeCache from "node-cache";
import {MoviesRepository} from "./MoviesRepository";
import {Movie} from "../../../data/movies/Movie";

const TTL = 600;
const CHECK_PERIOD = 300;

export class CachedMoviesRepository {
    private delegate: MoviesRepository;
    private pagesNodeCache: NodeCache;
    private titleNodeCache: NodeCache;
    private movieIdNodeCache: NodeCache;

    constructor(delegate: MoviesRepository) {
        this.delegate = delegate;
        this.pagesNodeCache = new NodeCache({stdTTL: TTL, checkperiod: CHECK_PERIOD});
        this.titleNodeCache = new NodeCache({stdTTL: TTL, checkperiod: CHECK_PERIOD});
        this.movieIdNodeCache = new NodeCache({stdTTL: TTL, checkperiod: CHECK_PERIOD});
    }

    async countMovies(): Promise<number> {
        return this.delegate.countMovies();
    }

    async findById(id: string): Promise<Movie> {
        const result = this.movieIdNodeCache.get(id);

        if (result) {
            console.log(`Returning cached movie ${id}`);
            return Promise.resolve(result as Movie);
        } else {
            const movie = await this.delegate.findById(id);
            this.pagesNodeCache.set(id, movie);
            return movie;
        }
    }

    async findBy(page: number, pageSize: number): Promise<Movie[]> {
        const result = this.pagesNodeCache.get(page);

        if (result) {
            console.log(`Returning cached page ${page}`);
            return Promise.resolve(result as Movie[]);
        } else {
            const movies = await this.delegate.findBy(page, pageSize);
            this.pagesNodeCache.set(page, movies);
            return movies;
        }
    }

    async findByTitle(title: string): Promise<Movie | null> {
        const result = this.titleNodeCache.get(title);

        if (result) {
            console.log(`Returning cached movie ${title}`);
            return Promise.resolve(result as Movie);
        } else {
            const movie = await this.delegate.findByTitle(title);
            this.pagesNodeCache.set(title, movie);
            return movie;
        }
    }

}