const testingMode = true;

function getQueryVariable(variable) {
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

var isChanging = false;

if(getQueryVariable("dontsend")) {
    isChanging = true;
    window.location.href="apply.html";
}

const contact_method = decodeURIComponent(getQueryVariable("contact-method"));
const minecraft_username = decodeURIComponent(getQueryVariable("mc-username"));
const country = decodeURIComponent(getQueryVariable("select-country"));
const why_choose_you = decodeURIComponent(getQueryVariable("question-why-should-we-choose-you"));
const previous_experience = decodeURIComponent(getQueryVariable("question-previous-experience"));
const contributions = decodeURIComponent(getQueryVariable("question-what-contributions"));
const mtrmod_experience = decodeURIComponent(getQueryVariable("question-mtrmod-experience"));

history.pushState({ dontsend: 1 }, "Application Verified", "?dontsend=1");

document.querySelector(".send-status").style.display = "block";


const webhook_data = {
    content: `${testingMode ? "No Ping - testing mode" : "<@&1157533001312387202>"}\n\n## Contact Information\nDiscord: ${contact_method}\nIGN: ${minecraft_username}\nCountry: ${country}\n\n## Questions\n\n### Why should we choose you over other applicants?\n${why_choose_you}\n\n### Do you have any previous experience? If so, then list it here!\n${previous_experience}\n\n### What contributions will you make to the server? Do you like building with other people, or making your own lines?\n${contributions}\n\n### How experienced are you with MTR mod? What have you built? Feel free to include image links to your builds!\n${mtrmod_experience}`,
    thread_name: "Application: " + contact_method
};

if(!isChanging) {
    (async () => {
        const rawResponse = await fetch("https://discord.com/api/webhooks/1158141864256475176/LRO7fmGbDSGqhg9w9mlZVzY8u5p1SSzjPlSUtC-1Tgs9T3ltfyW0sW2WOvTDFSbufBdZ", {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(webhook_data)
        });
    
        document.querySelector(".send-status").style.display = "none";
        document.querySelector(".send-complete").style.display = "block";
        document.querySelector("button").disabled = false;
    
    })();
}
