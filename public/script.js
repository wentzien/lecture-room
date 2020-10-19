const urlParams = new URLSearchParams(window.location.search);
const jitsiEventId = urlParams.get('j');
const questionsEventId = urlParams.get('q');
const questionsCreatorId = urlParams.get('qa');
const whiteboardEventId = urlParams.get('w');
const whiteboardAccessId = urlParams.get('wa');

const room = document.getElementById("room");

const jitsi = {
    display: true,
    full: false,
};

const whiteboard = {
    display: false,
    full: false,
};

const questions = {
    display: true
}


eventAccess();

function eventAccess() {
    if (jitsiEventId && questionsEventId && questionsCreatorId && whiteboardEventId) {

        // Creator / Moderator
        jitsiUrl = "https://volz.hs-pforzheim.de/" + jitsiEventId + "#config.enableLocalVideoFlip=true";
        questionsUrl = "https://volz.hs-pforzheim.de/questions/events/" + questionsEventId + "/" + questionsCreatorId;
        whiteboardUrl = "https://volz.hs-pforzheim.de/whiteboard/?whiteboardid=" + whiteboardEventId;

    } else if (jitsiEventId && questionsEventId && whiteboardEventId) {

        // Viewer
        jitsiUrl = "https://volz.hs-pforzheim.de/" + jitsiEventId + "#config.enableLocalVideoFlip=true";
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
            <a class="navbar-brand">Hochschule Pforzheim University</a>
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
                id="questions"
                src="${questionsUrl}"
                name="question-app"></iframe>
    </div>
    
    `;

    jitsi.iElement = document.getElementById("jitsi");
    jitsi.navElement = document.getElementById("jitsi-nav");

    whiteboard.iElement = document.getElementById("whiteboard");
    whiteboard.navElement = document.getElementById("whiteboard-nav");

    questions.iElement = document.getElementById("questions");
    questions.navElement = document.getElementById("questions-nav");

}

let questionsDisplay = true;

function changeDisplay(changeTo) {

    switch (changeTo) {
        case "jitsi":
            jitsi.display = true;
            whiteboard.display = false;
            break;
        case "whiteboard":
            jitsi.display = false;
            whiteboard.display = true;
            break;
        case "questions":
            if (questions.display) {
                questions.display = false;
                jitsi.full = true;
                whiteboard.full = true;
            } else {
                questions.display = true;
                jitsi.full = false;
                whiteboard.full = false;
            }
            break;
    }

    getClass(jitsi, "jitsi");
    jitsi.iElement.className = jitsi.htmlIframeClass;
    jitsi.navElement.className = jitsi.htmlNavClass;

    getClass(whiteboard, "whiteboard");
    whiteboard.iElement.className = whiteboard.htmlIframeClass;
    whiteboard.navElement.className = whiteboard.htmlNavClass;

    getClass(questions, "questions");
    questions.iElement.className = questions.htmlIframeClass;
    questions.navElement.className = questions.htmlNavClass;
}

function getClass(object, name) {
    object.htmlIframeClass = "iframe";
    object.htmlNavClass = "nav-item";
    if (name === "jitsi" || name === "whiteboard") {
        if (!object.display) {
            object.htmlIframeClass = "nodisplay";
            object.htmlNavClass = "nav-item";
        } else if (object.full) {
            object.htmlIframeClass = "iframe full";
            object.htmlNavClass = "nav-item active";
        } else {
            object.htmlIframeClass = "iframe left";
            object.htmlNavClass = "nav-item active";
        }
    } else {
        if (!object.display) {
            object.htmlIframeClass = "nodisplay";
            object.htmlNavClass = "nav-item";
        } else {
            object.htmlIframeClass = "iframe right";
            object.htmlNavClass = "nav-item active";
        }
    }
    return object;
}