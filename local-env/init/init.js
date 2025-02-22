db = new Mongo().getDB("sample_mflix");

db.createCollection('movies', {capped: false});
db.createCollection('users', {capped: false});
db.createCollection('sessions', {capped: false});

db.movies.insert([
    {
        "_id": "123",
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
        "_id": "456",
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
        "_id": "789",
        "plot": "Christ takes on the form of a pacifist count to end a senseless war.",
        "genres": [
            "Drama"
        ],
        "runtime": 78,
        "cast": [
            "Howard C. Hickman",
            "Enid Markey",
            "Lola May",
            "Kate Bruce"
        ],
        "num_mflix_comments": 0,
        "poster": "https://m.media-amazon.com/images/M/MV5BMjAwNTIxMjE5N15BMl5BanBnXkFtZTgwODc1Mjg1MzE@._V1_SY1000_SX677_AL_.jpg",
        "title": "Civilization",
        "fullplot": "Allegorical film about peace. A king starts a war, many of the women are against it, people are pressed into service. A count has constructed a submarine and gets the order to sink an ocean liner, that is also carrying - supposedly - ammunition for the enemy. The count refuses to fire the torpedos, and sinks the submarine. He survives, but in a limbo between death and life where he meets Jesus, who takes him over to preach peace. Naturally the king arrests him and sentences him to death for treason, but then Jesus shows him the real face of war.",
        "countries": [
            "USA"
        ],
        "released": new Date(2015, 1, 3),
        "directors": [
            "Reginald Barker",
            "Thomas H. Ince",
            "Raymond B. West",
            "Walter Edwards",
            "David Hartford",
            "Jay Hunt",
            "J. Parker Read Jr."
        ],
        "writers": [
            "C. Gardner Sullivan"
        ],
        "awards": {
            "wins": 1,
            "nominations": 0,
            "text": "1 win."
        },
        "lastupdated": "2015-04-30 02:13:27.863000000",
        "year": 1916,
        "imdb": {
            "rating": 6.3,
            "votes": 162,
            "id": 6517
        },
        "type": "movie",
        "tomatoes": {
            "viewer": {
                "rating": 0,
                "numReviews": 7
            },
        }
    },
    {
        "_id": "012",
        "plot": "An immigrant leaves his sweetheart in Italy to find a better life across the sea in the grimy slums of New York. They are eventually reunited and marry. But life in New York is hard and ...",
        "genres": [
            "Drama"
        ],
        "runtime": 78,
        "rated": "PASSED",
        "cast": [
            "George Beban",
            "Clara Williams",
            "J. Frank Burke",
            "Leo Willis"
        ],
        "title": "The Italian",
        "fullplot": "An immigrant leaves his sweetheart in Italy to find a better life across the sea in the grimy slums of New York. They are eventually reunited and marry. But life in New York is hard and tragedy tarnishes their dream of a better life in the new world.",
        "languages": [
            "English"
        ],
        "released": new Date(2015, 2, 2),
        "directors": [
            "Reginald Barker"
        ],
        "writers": [
            "Thomas H. Ince (story)",
            "C. Gardner Sullivan (story)"
        ],
        "awards": {
            "wins": 1,
            "nominations": 0,
            "text": "1 win."
        },
        "lastupdated": "2015-07-27 00:07:43.230000000",
        "year": 1915,
        "imdb": {
            "rating": 6.4,
            "votes": 175,
            "id": 5557
        },
        "countries": [
            "USA"
        ],
        "type": "movie",
        "tomatoes": {
            "viewer": {
                "rating": 4,
                "numReviews": 204,
                "meter": 60
            },
            "dvd": {
                "$date": "2008-08-26T00:00:00.000Z"
            },
        },
        "num_mflix_comments": 0
    }
])