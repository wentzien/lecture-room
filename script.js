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
                id="questions"
                src="${questionsUrl}"
                name="question-app"></iframe>
    </div>
    
    `;
}

let questionsDisplay = true;

function changeDisplay(changeTo) {
    const jitsy = {
        htmlClass: document.getElementById("jitsi"),
        htmlNavClass: document.getElementById("jitsi-nav"),
        display: true,
        full: false,
    };

    const whiteboard = {
        htmlClass: document.getElementById("whiteboard"),
        htmlNavClass: document.getElementById("whiteboard-nav"),
        display: false,
        full: false,
    };

    const questions = {
        htmlClass: document.getElementById("questions"),
        htmlNavClass: document.getElementById("questions-nav"),
        display: true
    }

    switch (changeTo) {
        case "jitsi":
            jitsy.display = true;
            whiteboard.display = false;
            break;
        case "whiteboard":
            jitsy.display = false;
            whiteboard.display = true;
            break;
        case "questions":
            if (questions.display) {
                questions.display = false;
                jitsy.full = true;
                whiteboard.full = true;
            } else {
                questions.display = true;
                jitsy.full = false;
                whiteboard.full = false;
            }
            break;
    }

    jitsy.htmlClass.className = getClass(jitsy, "jitsi").htmlIframeClass;
    jitsy.htmlNavClass.className = getClass(jitsy, "jitsi").htmlNavClass;
    console.log(jitsy);

    whiteboard.htmlClass.className = getClass(whiteboard, "whiteboard").htmlIframeClass;
    whiteboard.htmlNavClass.className = getClass(whiteboard, "whiteboard").htmlNavClass;
    console.log(whiteboard);

    questions.htmlClass.className = getClass(questions, "questions").htmlIframeClass;
    questions.htmlNavClass.className = getClass(questions, "questions").htmlNavClass;
    console.log(questions);

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