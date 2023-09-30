const backgroundImages = [
    ["Central_1", "<b>Central station,</b> Near entrance, Minebahn City and cable cars"],
    ["Central_2", "<b>Central station,</b> View of main entrance from Minebahn City buildings"],
    ["Central_3", "<b>Central station,</b> Scenic Loop cable cars"],
    ["Central_4", "<b>Central station,</b> Light Rail Terminal"],
    ["Central_5", "<b>Central station,</b> Metro Blue Line"],
    ["Central_6", "<b>Central station,</b> Spring Lily Line"],
    ["Central_7", "<b>Central station,</b> West Central APM"],
    ["Central_8", "<b>Central station,</b> Central Botanic Gardens"],

    ["CentralWest_1", "<b>Central West station,</b> Central West APM"],

    ["CeramicPark_1", "<b>Ceramic Park station,</b> platforms"],
    ["CeramicPark_2", "<b>Ceramic Park station,</b> SP1900 at platform"],

    ["HighSpeedTerminal_1", "<b>Minebahn City High Speed Terminal,</b> Metro Blue Line platforms"],

    ["Hurstbridge_1", "<b>Hurstbridge station,</b> SP1900 at platforms"],

    ["YellowstoneDocks_1", "<b>Yellowstone Docks station,</b> Spring Lily line platforms"],
    ["YellowstoneDocks_2", "<b>Yellowstone Docks station,</b> inside Spring Lily line platforms"],
    ["YellowstoneDocks_3", "<b>Yellowstone Docks station,</b> Metro West platforms "]
];

document.addEventListener("DOMContentLoaded", () => {
    const randomImage = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];

    console.log(randomImage);

    document.querySelector(".container-fluid#main-background").style.backgroundImage = "url(assets/station_images/" + randomImage[0] + ".png)";
    document.querySelector("#background-info").innerHTML = randomImage[1];


});