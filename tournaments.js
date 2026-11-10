
const tournaments = [
    {
        id: 1,
        name: "CS2 CUP",
        game: "Counter-Strike 2",
        date: "Dec 12, 2026",
        format: "5 vs 5",
        players: 40,
        prize: 500,
        status: "Open",
        description: "Compete with your team in our Counter-Strike 2 tournament."
    },
    {
        id: 2,
        name: "VALORANT NIGHT",
        game: "Valorant",
        date: "Dec 19, 2026",
        format: "5 vs 5",
        players: 30,
        prize: 400,
        status: "Open",
        description: "Join an exciting Valorant competition."
    },
    {
        id: 3,
        name: "FC CHALLENGE",
        game: "EA Sports FC",
        date: "Jan 9, 2027",
        format: "1 vs 1",
        players: 16,
        prize: 250,
        status: "Soon",
        description: "Show your football skills and compete for the prize."
    },
    {
        id: 4,
        name: "DOTA CHAMPIONSHIP",
        game: "Dota 2",
        date: "Jan 16, 2027",
        format: "5 vs 5",
        players: 50,
        prize: 700,
        status: "Soon",
        description: "Build a team and fight for the championship."
    },
    {
        id: 5,
        name: "FORTNITE BATTLE",
        game: "Fortnite",
        date: "Jan 23, 2027",
        format: "Solo",
        players: 60,
        prize: 350,
        status: "Soon",
        description: "Survive until the end and become the winner."
    },
    {
        id: 6,
        name: "APEX ARENA",
        game: "Apex Legends",
        date: "Feb 6, 2027",
        format: "3 players",
        players: 36,
        prize: 450,
        status: "Soon",
        description: "Fight against other squads in Apex Legends."
    },
    {
        id: 7,
        name: "MINECRAFT BUILD CUP",
        game: "Minecraft",
        date: "Feb 13, 2027",
        format: "Solo",
        players: 25,
        prize: 200,
        status: "Soon",
        description: "Create your best build and impress the judges."
    },
    {
        id: 8,
        name: "GTA RACING NIGHT",
        game: "GTA V",
        date: "Feb 20, 2027",
        format: "Racing",
        players: 20,
        prize: 300,
        status: "Soon",
        description: "Race against other players in Los Santos."
    }
];

const tournamentCards = document.getElementById("tournamentCards");
const tournamentTableBody = document.getElementById("tournamentTableBody");
const tournamentSearch = document.getElementById("tournamentSearch");
const statusFilter = document.getElementById("statusFilter");
const tournamentCount = document.getElementById("tournamentCount");
const noTournaments = document.getElementById("noTournaments");
const resetTournaments = document.getElementById("resetTournaments");

function createTournamentCard(tournament) {
    const column = document.createElement("div");
    column.className = "col-md-6 col-lg-4";

    const card = document.createElement("article");
    card.className = "tournament-card";

    const status = document.createElement("p");
    status.className = "tournament-status";
    status.textContent = tournament.status === "Open"
        ? "REGISTRATION OPEN"
        : "COMING SOON";

    const title = document.createElement("h2");
    title.textContent = tournament.name;

    const description = document.createElement("p");
    description.textContent = tournament.description;

    const details = document.createElement("div");
    details.className = "tournament-details";

    const date = document.createElement("span");
    date.textContent = tournament.date;

    const prize = document.createElement("span");
    prize.textContent = "$" + tournament.prize + " Prize";

    details.appendChild(date);
    details.appendChild(prize);

    const button = document.createElement("button");
    button.type = "button";
    button.className = "btn btn-main tournament-details-button";
    button.textContent = "SHOW DETAILS";
    button.setAttribute("aria-expanded", "false");

    const extra = document.createElement("div");
    extra.className = "tournament-extra";
    extra.hidden = true;

    const gameText = document.createElement("p");
    gameText.textContent = "Game: " + tournament.game;

    const formatText = document.createElement("p");
    formatText.textContent = "Format: " + tournament.format;

    const playersText = document.createElement("p");
    playersText.textContent = "Players: " + tournament.players;

    extra.appendChild(gameText);
    extra.appendChild(formatText);
    extra.appendChild(playersText);

    button.addEventListener("click", function() {
        const isOpen = button.getAttribute("aria-expanded") === "true";

        if (isOpen) {
            $(extra).stop(true, true).slideUp(250, function() {
                extra.hidden = true;
            });
            button.textContent = "SHOW DETAILS";
            button.setAttribute("aria-expanded", "false");
        } else {
            extra.hidden = false;
            $(extra).stop(true, true).hide().slideDown(250);
            button.textContent = "HIDE DETAILS";
            button.setAttribute("aria-expanded", "true");
        }
    });

    card.appendChild(status);
    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(details);
    card.appendChild(button);
    card.appendChild(extra);

    column.appendChild(card);

    return column;
}

function createTournamentRow(tournament) {
    const row = document.createElement("tr");

    const values = [
        tournament.game,
        tournament.date,
        tournament.format,
        tournament.players,
        "$" + tournament.prize
    ];

    values.forEach(function(value) {
        const cell = document.createElement("td");
        cell.textContent = value;
        row.appendChild(cell);
    });

    const statusCell = document.createElement("td");
    const statusLabel = document.createElement("span");

    statusLabel.className = tournament.status === "Open"
        ? "status-open"
        : "status-soon";

    statusLabel.textContent = tournament.status;
    statusCell.appendChild(statusLabel);
    row.appendChild(statusCell);

    return row;
}

function displayTournaments(list) {
    tournamentCards.innerHTML = "";
    tournamentTableBody.innerHTML = "";

    list.forEach(function(tournament) {
        tournamentCards.appendChild(createTournamentCard(tournament));
        tournamentTableBody.appendChild(createTournamentRow(tournament));
    });

    tournamentCount.textContent = list.length + " tournaments found";
    noTournaments.hidden = list.length !== 0;

    $(".tournament-card").hide().fadeIn(350);
}

function filterTournaments() {
    const search = tournamentSearch.value.toLowerCase().trim();
    const selectedStatus = statusFilter.value;

    const filtered = tournaments.filter(function(tournament) {
        const matchesSearch =
            tournament.name.toLowerCase().includes(search) ||
            tournament.game.toLowerCase().includes(search);

        const matchesStatus =
            selectedStatus === "all" ||
            tournament.status === selectedStatus;

        return matchesSearch && matchesStatus;
    });

    displayTournaments(filtered);
}

tournamentSearch.addEventListener("input", filterTournaments);
statusFilter.addEventListener("change", filterTournaments);

resetTournaments.addEventListener("click", function() {
    tournamentSearch.value = "";
    statusFilter.value = "all";
    displayTournaments(tournaments);
    tournamentSearch.focus();
});

displayTournaments(tournaments);
