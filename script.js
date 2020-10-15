const urlParams = new URLSearchParams(window.location.search);
const jitsiEventId = urlParams.get('j');
const questionsEventId = urlParams.get('q');
const questionsCreatorId = urlParams.get('qa');
const whiteboardEventId = urlParams.get('w');
const whiteboardAccessId = urlParams.get('wa');

const room = document.getElementById("room");

eventAccess();

function eventAccess() {
    if (jitsiEventId && questionsEventId && questionsCreatorId && whiteboardEventId && whiteboardAccessId) {

        // Creator / Moderator
        jitsiUrl = "https://volz.hs-pforzheim.de/" + jitsiEventId;
        questionsUrl = "https://volz.hs-pforzheim.de/questions/events/" + questionsEventId + "/" + questionsCreatorId;
        whiteboardUrl = "https://volz.hs-pforzheim.de/whiteboard/?whiteboardid=" + whiteboardEventId + "&accesstoken=" + whiteboardAccessId;

    } else if (jitsiEventId && questionsEventId && whiteboardEventId) {

        // Viewer
        jitsiUrl = "https://volz.hs-pforzheim.de/" + jitsiEventId;
        questionsUrl = "https://volz.hs-pforzheim.de/questions/events/" + questionsEventId;
        whiteboardUrl = "https://volz.hs-pforzheim.de/whiteboard/?whiteboardid=" + whiteboardEventId;

    } else {

        // Error
        return room.innerHTML = "<h1>Verwenden Sie bitte den bereitgestellten Link für die Veranstaltung</h1>";

    }

    console.log("Links:", jitsiUrl, questionsUrl, whiteboardUrl);

    // Search Parameter ok

    room.innerHTML = `
    
    <div class="menu">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <a class="navbar-brand">Einführung in die Informatik</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li id="jitsi-nav" class="nav-item active">
                        <a class="nav-link" style="cursor: pointer" onclick="changeDisplay('jitsi')">Video</a>
                    </li>
                    <li id="whiteboard-nav" class="nav-item">
                        <a class="nav-link" style="cursor: pointer" onclick="changeDisplay('whiteboard')">Whiteboard</a>
                    </li>
                    <li id="questions-nav" class="nav-item">
                        <a class="nav-link" style="cursor: pointer" onclick="changeDisplay('questions')">Fragen</a>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
    <div class="content">
        <iframe class="iframe left"
                id="jitsi"
                src="${jitsiUrl}"
                allow="camera;microphone"
                name="jitsi"></iframe>

        <iframe class="iframe left nodisplay"
                id="whiteboard"
                src="${whiteboardUrl}"
                name="whiteboard"></iframe>

        <iframe class="iframe right"
                src="${questionsUrl}"
                name="question-app"></iframe>
    </div>
    
    `;
}


function changeDisplay(changeTo) {

    const jitsy = document.getElementById("jitsi");
    const whiteboard = document.getElementById("whiteboard");

    const jitsyNav = document.getElementById("jitsi-nav");
    const whiteboardNav = document.getElementById("whiteboard-nav");
    const questionsNav = document.getElementById("questions-nav");

    switch (changeTo) {
        case "jitsi":
            jitsy.className = "iframe left";
            whiteboard.className = "iframe left nodisplay";

            jitsyNav.className = "nav-item active";
            whiteboardNav.className = "nav-item";
            questionsNav.className = "nav-item";
            break;
        case "whiteboard":
            jitsy.className = "iframe left nodisplay";
            whiteboard.className = "iframe left";

            jitsyNav.className = "nav-item";
            whiteboardNav.className = "nav-item active";
            questionsNav.className = "nav-item";
            break;
        case "questions":

            break;
    }
}