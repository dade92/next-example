db = new Mongo().getDB("sample_mflix");

db.createCollection('movies', {capped: false});
db.createCollection('users', {capped: false});
db.createCollection('sessions', {capped: false});
db.createCollection('comments', {capped: false});

db.movies.insert([
    {
        "_id": "573a1390f29313caabcd63d6",
        "plot": "Two peasant children, Mytyl and Tyltyl, are led by Berylune, a fairy, to search for the Blue Bird of Happiness. Berylune gives Tyltyl a cap with a diamond setting, and when Tyltyl turns the...",
        "genres": [
            "Fantasy"
        ],
        "runtime": 75,
        "cast": [
            "Tula Belle",
            "Robin Macdougall",
            "Edwin E. Reed",
            "Emma Lowry"
        ],
        "num_mflix_comments": 0,
        "poster": "https://m.media-amazon.com/images/M/MV5BMjNlMThmNzItMTZlMS00YzJkLTk1MzktYzIyMzllOGFmZmRlXkEyXkFqcGdeQXVyMzE0MjY5ODA@._V1_SY1000_SX677_AL_.jpg",
        "title": "The Blue Bird",
        "fullplot": "Two peasant children, Mytyl and Tyltyl, are led by Berylune, a fairy, to search for the Blue Bird of Happiness. Berylune gives Tyltyl a cap with a diamond setting, and when Tyltyl turns the diamond, the children become aware of and conversant with the souls of a Dog and Cat, as well as of Fire, Water, Bread, Light, and other presumably inanimate things. The troupe thus sets off to find the elusive Blue Bird of Happiness.",
        "languages": [
            "English"
        ],
        "released": new Date(2015, 1, 1),
        "directors": [
            "Maurice Tourneur"
        ],
        "writers": [
            "Maurice Maeterlinck (play)",
            "Charles Maigne"
        ],
        "awards": {
            "wins": 1,
            "nominations": 0,
            "text": "1 win."
        },
        "lastupdated": "2015-07-20 00:32:04.810000000",
        "year": 1918,
        "imdb": {
            "rating": 6.6,
            "votes": 446,
            "id": 8891
        },
        "countries": [
            "USA"
        ],
        "type": "movie",
        "tomatoes": {
            "viewer": {
                "rating": 3.6,
                "numReviews": 607,
                "meter": 60
            },
        }
    },
    {
        "_id": "573a1391f29313caabcd7616",
        "plot": "Salome, the daughter of Herodias, seduces her step-father/uncle Herod, governor of Judea, with a salacious dance. In return, he promises her the head of the prophet John the Baptist.",
        "genres": [
            "Biography",
            "Drama",
            "History"
        ],
        "runtime": 72,
        "cast": [
            "Mitchell Lewis",
            "Alla Nazimova",
            "Rose Dione",
            "Earl Schenck"
        ],
        "num_mflix_comments": 0,
        "poster": "https://m.media-amazon.com/images/M/MV5BMjA0MTY4MzI2OV5BMl5BanBnXkFtZTgwNTMyODg5MTE@._V1_SY1000_SX677_AL_.jpg",
        "title": "Salomè",
        "fullplot": "Salome, the daughter of Herodias, seduces her step-father/uncle Herod, governor of Judea, with a salacious dance. In return, he promises her the head of the prophet John the Baptist.",
        "countries": [
            "USA"
        ],
        "released": new Date(2015, 2, 1),
        "directors": [
            "Charles Bryant",
            "Alla Nazimova"
        ],
        "writers": [
            "Oscar Wilde (play)",
            "Natacha Rambova (scenario)"
        ],
        "awards": {
            "wins": 1,
            "nominations": 0,
            "text": "1 win."
        },
        "lastupdated": "2015-04-26 00:03:19.913000000",
        "year": 1922,
        "imdb": {
            "rating": 6.6,
            "votes": 466,
            "id": 13571
        },
        "type": "movie",
        "tomatoes": {
            "viewer": {
                "rating": 3.9,
                "numReviews": 310,
                "meter": 70
            },
            "fresh": 3,
            "critic": {
                "rating": 6.5,
                "numReviews": 5,
                "meter": 60
            },
            "rotten": 2,
        }
    },
    {
        "_id": "573a1390f29313caabcd4eaf",
        "plot": "A woman, with the aid of her police officer sweetheart, endeavors to uncover the prostitution ring that has kidnapped her sister, and the philanthropist who secretly runs it.",
        "genres": [
            "Crime",
            "Drama"
        ],
        "runtime": 88,
        "cast": [
            "Jane Gail",
            "Ethel Grandin",
            "William H. Turner",
            "Matt Moore"
        ],
        "num_mflix_comments": 1,
        "poster": "https://m.media-amazon.com/images/M/MV5BYzk0YWQzMGYtYTM5MC00NjM2LWE5YzYtMjgyNDVhZDg1N2YzXkEyXkFqcGdeQXVyMzE0MjY5ODA@._V1_SY1000_SX677_AL_.jpg",
        "title": "Traffic in Souls",
        "lastupdated": "2015-09-15 02:07:14.247000000",
        "languages": [
            "English"
        ],
        "released": new Date(2015, 3, 1),
        "directors": [
            "George Loane Tucker"
        ],
        "rated": "TV-PG",
        "awards": {
            "wins": 1,
            "nominations": 0,
            "text": "1 win."
        },
        "year": 1913,
        "imdb": {
            "rating": 6,
            "votes": 371,
            "id": 3471
        },
        "countries": [
            "USA"
        ],
        "type": "movie",
        "tomatoes": {
            "viewer": {
                "rating": 3,
                "numReviews": 85,
                "meter": 57
            },
            "dvd": {
                "$date": "2008-08-26T00:00:00.000Z"
            },
        }
    }
]);

db.users.insert([
    {
        "_id": "XXX",
        "name": "test",
        "email": "davidebotti@gmail.com",
        "password": "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
        "creationDate": new Date(2025, 1, 22, 12,6,0)
    }
])