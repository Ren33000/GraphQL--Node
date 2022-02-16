const UserList = [
    {
        id: 1,
        name: "John",
        username: "john",
        age: 20,
        nationality: "CANADA",
        friends: [
            {
                id: 4,
                name: "Marc",
                username: "Marco",
                age: 43,
                nationality: "FRANCE",
            },
            {
                id: 5,
                name: "Kiko",
                username: "Kiki-chan",
                age: 15,
                nationality: "JAPAN",
            },
        ]
    },
    {
        id: 2,
        name: "Pedro",
        username: "PedroTech",
        age: 20,
        nationality: "BRAZIL",
    },
    {
        id: 3,
        name: "Sarah",
        username: "cameron",
        age: 25,
        nationality: "UNITED STATES",
    },
    {
        id: 4,
        name: "Marc",
        username: "Marco",
        age: 43,
        nationality: "FRANCE",
        friends: [
            {
                id: 5,
                name: "Kiko",
                username: "Kiki-chan",
                age: 15,
                nationality: "JAPAN",
            },
        ]
    },
    {
        id: 5,
        name: "Kiko",
        username: "Kiki-chan",
        age: 15,
        nationality: "JAPAN",
    },
    {
        id: 6,
        name: "Jayoong",
        username: "Jay",
        age: 37,
        nationality: "SOUTH KOREA",
    },
];

const MovieList = [
    {
        id: 1, 
        name: "Le Voyage de Chihiro",
        yearOfPublication: 2009,
        isInTheaters: true,
    },
    {
        id: 2, 
        name: "Kingdom",
        yearOfPublication: 2020,
        isInTheaters: true,
    },
    {
        id: 3, 
        name: "Rush Hour",
        yearOfPublication: 2000,
        isInTheaters: false,
    },
    {
        id: 4, 
        name: "Look Up",
        yearOfPublication: 2021,
        isInTheaters: true,
    },
    {
        id: 5, 
        name: "Coco",
        yearOfPublication: 2020,
        isInTheaters: false,
    },
];

module.exports = {UserList, MovieList}