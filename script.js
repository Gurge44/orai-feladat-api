let Data = [];

get();

function get() {
    document.getElementById("loading").hidden = false;
    fetch("https://www.mmobomb.com/api1/games")
    .then(x => x.text())
    .then(x => Data = JSON.parse(x))
    .then(x => display())
}

function display() {
    if (Data == null) return;
    document.getElementById("loading").hidden = false;
    document.getElementById("output").innerHTML = "";
    let count = 1;
    Data.forEach(x => {
        let platformSrc = "";
        switch (x.platform) {
            case "PC (Windows)":
                platformSrc = "win.svg";
                break;
            case "Web Browser":
                platformSrc = "web.png";
                break;
            default:
                platformSrc = "win.svg";
                break;
        }
        let element = `
        <div class="card text-bg-dark mb-3 col-5">
            <div class="row g-0">
                <div class="col-md-4">
                <img src="${x.thumbnail}" class="img-fluid rounded-start" alt="Game Image">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${x.title}</h5>
                        <p class="card-text">${x.short_description}</p>
                        <p class="card-text">Platform: <img src="${platformSrc}" class="plat"></p>
                        <p class="card-text" id="small">Publisher: ${x.publisher}<br>Developer: ${x.developer}<br>Release Date: ${x.release_date}<br>Genre: ${x.genre}</p>
                        <a href="${x.game_url}" class="btn btn-info">Visit Game Page</a>
                    </div>
                </div>
            </div>
        </div>`
        count++;
        if (count == 2) {
            count = 0;
            element += `<div class="col-2"></div>`
        }
        document.getElementById("output").innerHTML += element;
    });
    document.getElementById("loading").hidden = true;
    //document.getElementById("form").hidden = false;

    statistics();
}

function statistics() {
    var PC = Data.filter(x => x.platform == "PC (Windows)");
    var Web = Data.filter(x => x.platform == "Web Browser");
    document.getElementById("statisticOutput").innerHTML = `PC Games: ${PC.length}<br>Web Games: ${Web.length}`;
}