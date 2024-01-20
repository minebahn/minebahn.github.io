function html(a){return a}

const defaultModField = html`
<div class="single-entry">
    <div class="input-group">
        <span class="input-group-text">
            <select class="form-select" id="providerSelect" onChange="updateProviders();">
                <option value="modrinth">Modrinth</option>
                <option value="curseforge">Curseforge</option>
            </select>
        </span>
        <input id="modpvid" type="text" class="form-control" placeholder="Version ID">
        <input id="cfmodfileid" type="text" class="form-control" placeholder="CF File ID" style="display:none;">
        <span class="input-group-text" id="versionSpan">
            <b>Unknown Mod</b>&nbsp;Unknown Version
        </span>
    </div>
</div>
<br>
`;



const curseforge_api_key = "$2a$10$Pb25oWsbMZKcdMCpiRyVcO/uUBPQzcXwK0l7LZgsZvnpDveOoZnl6";

var modFields = document.getElementById("modFields");

let modsLinks = [];
let localProgress = [];

function updateProviders() {
    var entries = document.querySelectorAll(".single-entry");
    entries.forEach(function(entry) {
        var modPVid = entry.querySelector("#modpvid");
        var inputValue = entry.querySelector("#cfmodfileid");
        var provider = entry.querySelector("#providerSelect").value;
        if(provider == "curseforge") {
            inputValue.style.display = "block";
            modPVid.placeholder = "Project ID";
        } else {
            inputValue.style.display = "none";
            modPVid.placeholder = "Version ID";
        }
    });
}

function refreshMods() {
    modsLinks = [];
    var entries = document.querySelectorAll(".single-entry");
    entries.forEach(function(entry) {
        var modPVid = entry.querySelector("#modpvid").value;
        var modFIid = entry.querySelector("#cfmodfileid").value
        var provider = entry.querySelector("#providerSelect").value;
        var modVersionSpan = entry.querySelector("#versionSpan");

        modVersionSpan.innerHTML = `Loading...`;
        
        if(provider == "modrinth") {
            fetch(`https://api.modrinth.com/v2/version/${modPVid}`).then((res) => {
                if(!res.ok) {
                    modVersionSpan.innerHTML = "<b>Unknown Mod</b>&nbsp;Unknown Version";
                } else {
                    res.json().then((json) => {
                        modVersionSpan.innerHTML = `<b>${json.name}</b>&nbsp;${json.version_number}`;
                        modsLinks.push(json.files[0].url);
                    });
                }
            });
        } else {
            fetch(`https://api.curseforge.com/v1/mods/${modPVid}/files/${modFIid}`, { headers: { "x-api-key": curseforge_api_key, "content-type": "application/json" }}).then((res) => {
                if(!res.ok) {
                    modVersionSpan.innerHTML = "<b>Unknown Mod</b>&nbsp;Unknown Version";
                } else {
                    res.json().then((json) => {
                        modVersionSpan.innerHTML = `<b>${json.data.displayName}</b>&nbsp;Curseforge`;
                        modsLinks.push(json.data.downloadUrl);
                    });
                }
            });
        }
    });
}

function saveLocal() {
    localProgress = [];
    var entries = document.querySelectorAll(".single-entry");
    entries.forEach(function(entry) {
        var modPVid = entry.querySelector("#modpvid").value;
        var modFIid = entry.querySelector("#cfmodfileid").value
        var provider = entry.querySelector("#providerSelect").value;

        localProgress.push({
            pvid: modPVid,
            fiid: modFIid,
            provider: provider
        });
    });

    localStorage.setItem("mbpackLocalProgress", JSON.stringify(localProgress));
    alert("Saved. Will load back when you visit this page again.")
}

function loadLocal() {
    try {
        const json = JSON.parse(localStorage.getItem("mbpackLocalProgress"));

        json.forEach(()=>{
            modFields.innerHTML += defaultModField;
        });

        let count = 0;
        var entries = document.querySelectorAll(".single-entry");
        entries.forEach(function(entry) {
            var modPVid = entry.querySelector("#modpvid");
            var inputValue = entry.querySelector("#cfmodfileid");
            var provider = entry.querySelector("#providerSelect");
            
            modPVid.setAttribute("value", json[count].pvid);
            inputValue.setAttribute("value", json[count].fiid);
            provider.querySelectorAll("option").forEach((a) => {
                if(a.value == json[count].provider) {
                    a.selected = true;
                }
            });

            count++;
        });
        updateProviders();
        refreshMods();
    }
    catch(er) {}
}

function addMod() {
    modFields.innerHTML += defaultModField;
}

function clearAll() {
    if(confirm("Are you sure you want to clear all?")) modFields.innerHTML = "";
}

loadLocal();

function exportProd() {
    let finalString = "BAHNMPACK|";
    var modpackVersionString = document.getElementById("exportname").value.replace(/\|/g, '') + "|";

    finalString += modpackVersionString;

    modsLinks.forEach((b) => {
        finalString += b;
        finalString += "|";
    });
    
    if(finalString.endsWith("|")) finalString = finalString.slice(0, finalString.length - 1);

    document.getElementById("exporttextarea").innerHTML = btoa(finalString);
}