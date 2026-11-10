const games = [
    {
        id: 1,
        name: "Counter-Strike 2",
        genre: "FPS",
        players: "5 vs 5",
        description: "Competitive shooting game where teamwork and strategy decide the winner.",
        image: "images/cs2.jpg"
    },
    {
        id: 2,
        name: "Valorant",
        genre: "FPS",
        players: "5 vs 5",
        description: "Tactical shooter with unique agents and special abilities.",
        image: "images/valorant.jpg"
    },
    {
        id: 3,
        name: "EA Sports FC",
        genre: "SPORT",
        players: "1 vs 1",
        description: "Compete against friends in exciting football matches.",
        image: "images/fc.jpg"
    },
    {
        id: 4,
        name: "Dota 2",
        genre: "MOBA",
        players: "5 vs 5",
        description: "Choose your hero and work with your team to win.",
        image: "images/dota2.jpg"
    },
    {
        id: 5,
        name: "GTA V",
        genre: "ACTION",
        players: "Online",
        description: "Explore Los Santos and complete missions with friends.",
        image: "images/gta5.jpg"
    },
    {
        id: 6,
        name: "Minecraft",
        genre: "SANDBOX",
        players: "Multiplayer",
        description: "Build, explore and survive in a creative world.",
        image: "images/minecraft.jpg"
    },
    {
        id: 7,
        name: "Fortnite",
        genre: "BATTLE ROYALE",
        players: "Online",
        description: "Battle other players and try to be the last one standing.",
        image: "images/fortnite.jpg"
    },
    {
        id: 8,
        name: "Apex Legends",
        genre: "BATTLE ROYALE",
        players: "3 players",
        description: "Team up with legends and compete in fast-paced battles.",
        image: "images/apex.jpg"
    }
];

const gamesGrid = document.getElementById("gamesGrid");
const gameSearch = document.getElementById("gameSearch");
const genreFilter = document.getElementById("genreFilter");
const gamesCount = document.getElementById("gamesCount");
const noGames = document.getElementById("noGames");
const resetFilters = document.getElementById("resetFilters");

function displayGames(gameList) {
    gamesGrid.innerHTML = "";

    gameList.forEach(function(game) {
        const card = document.createElement("article");
        card.className = "game-card";

        const imageBox = document.createElement("div");
        imageBox.className = "game-image-box";

        const character = document.createElement("img");
        character.className = "game-character";
        character.src = game.image;
        character.alt = game.name;
        character.loading = "lazy";

        const number = document.createElement("span");
        number.className = "game-number";
        number.textContent = String(game.id).padStart(2, "0");

        const title = document.createElement("h2");
        title.textContent = game.name;

        const description = document.createElement("p");
        description.textContent = game.description;

        const info = document.createElement("div");
        info.className = "game-info";

        const genre = document.createElement("span");
        genre.textContent = game.genre;

        const players = document.createElement("span");
        players.textContent = game.players;

        imageBox.appendChild(character);

        info.appendChild(genre);
        info.appendChild(players);

        card.appendChild(imageBox);
        card.appendChild(number);
        card.appendChild(title);
        card.appendChild(description);
        card.appendChild(info);

        gamesGrid.appendChild(card);
    });

    gamesCount.textContent = gameList.length + " games found";
    noGames.hidden = gameList.length !== 0;
}

function filterGames() {
    const searchText = gameSearch.value.toLowerCase().trim();
    const selectedGenre = genreFilter.value;

    const filteredGames = games.filter(function(game) {
        const matchesName = game.name.toLowerCase().includes(searchText);
        const matchesGenre =
            selectedGenre === "all" || game.genre === selectedGenre;

        return matchesName && matchesGenre;
    });

    displayGames(filteredGames);
}

gameSearch.addEventListener("input", filterGames);
genreFilter.addEventListener("change", filterGames);

resetFilters.addEventListener("click", function() {
    gameSearch.value = "";
    genreFilter.value = "all";
    displayGames(games);
    gameSearch.focus();
});

displayGames(games);