
this.secName2ShlokasEng = {};
this.secName2ShlokasKan = {};
this.secName2ShlokasSan = {};
this.my_media;

var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        $('#listviewMainMenu').on('click', 'li', function () {
            var selected_index = $(this).index();
            if (selected_index > 0) {
                var listIndex = "li." + selected_index;
                var menuName = $('#listviewMainMenu').children(listIndex).text().trim();
//                alert(menuName); // id of clicked li by directly accessing DOMElement property

                if (menuName === "Purusha Sukta") {

                    var shlokaListEng = secName2ShlokasEng["Purusha Sukta"];
                    var shlokaListKan = secName2ShlokasKan["Purusha Sukta"];
                    var shlokaListSan = secName2ShlokasSan["Purusha Sukta"];
                    for (var shlokaNum = 0; shlokaNum < shlokaListEng.length; shlokaNum++) {

                        var shlokaEng = shlokaListEng[shlokaNum];
                        var shlokaKan = shlokaListKan[shlokaNum];
                        var shlokaSan = shlokaListSan[shlokaNum];
                        var shlokaTextEng = shlokaEng["text"];
                        var shlokaTextKan = shlokaKan["text"];
                        var shlokaTextSan = shlokaSan["text"];
                        var shlokaEngExp = shlokaEng["explanation"];
                        var notesList = shlokaEngExp["notesList"];
                        var shlokaContent = "<div data-role='collapsible'>";
                        shlokaContent += "<fieldset class='ui-grid-e center'>";
                        shlokaContent += "<div class='ui-block-a'><button class='ui-shadow ui-btn ui-corner-all ui-mini' >Pause</button></div>";
                        shlokaContent += "<div class='ui-block-b'><button class='ui-shadow ui-btn ui-corner-all ui-mini'>Stop</button></div>";
//                        shlokaContent += "<div class='ui-block-c'><button class='ui-shadow ui-btn ui-corner-all ui-mini' onclick='playAudio('stotra_1_1.mp3');'>Play</button></div>";
                        shlokaContent += "<div class='ui-block-c'><button class='ui-shadow ui-btn ui-corner-all ui-mini' onclick=\"playAudio('stotra_1_1.mp3')\">Play</button></div>";
                        shlokaContent += "</fieldset>";
                        shlokaContent += "<h3>" + 'Shloka ' + shlokaEng["num"] + "</h3>";
                        shlokaContent += "<p>" + shlokaTextEng.replace(/\n/g, '<br/>') + "</p>";
                        shlokaContent += "<p>" + shlokaTextKan.replace(/\n/g, '<br/>') + "</p>";
                        shlokaContent += "<p>" + shlokaTextSan.replace(/\n/g, '<br/>') + "</p>";
                        for (var k = 0; k < notesList.length; k++) {
                            var notes = notesList[k];
                            var expTitle = notes["title"];
                            var expText = notes["text"];
                            shlokaContent += "<p><b>" + expTitle + "</b></p>";
                            shlokaContent += "<p>" + expText.replace(/\n/g, '<br/>') + "</p>";
                            $('#listviewPurusha').append(shlokaContent);
                        }
                    }
                    $('[data-role="collapsible"]').parent().enhanceWithin();
                    $.mobile.navigate("#purushaSukta");
                }
                else if (menuName === "Sri Sukta")
                    $.mobile.navigate("#sriSukta");
            }
        });
        $('#listviewPurusha').on('click', 'li', function () {
            var selected_index = $(this).index();
            var listIndex = "li." + selected_index;
            alert($('#listviewPurusha').children(listIndex).text()); // id of clicked li by directly accessing DOMElement property
//            $.mobile.navigate( "#purushaSukta" );
        });
        $('#listviewSrisukta').on('click', 'li', function () {
            var selected_index = $(this).index();
            var listIndex = "li." + selected_index;
            alert($('#listviewSrisukta').children(listIndex).text()); // id of clicked li by directly accessing DOMElement property
//            $.mobile.navigate( "#purushaSukta" );
        });
        $.getJSON("data/purusha_eng.json", function (data) {
            var items = [];
            var sections = data["sections"];
            console.log('No. of sections :' + sections.length);
            for (var i = 0; i < sections.length; i++)
            {
                var section = sections[i];
                var secName = section["name"];
                var shlokaList = section["shlokaList"];
                console.log('Section :' + secName);
                app.printShlokaExplanation(shlokaList);
                secName2ShlokasEng[secName] = shlokaList;
            }

        });
        $.getJSON("data/purusha_kan.json", function (data) {
            var items = [];
            var sections = data["sections"];
            console.log('No. of sections :' + sections.length);
            for (var i = 0; i < sections.length; i++)
            {
                var section = sections[i];
                var secName = section["name"];
                var shlokaList = section["shlokaList"];
                console.log('Section :' + secName);
                app.printShlokaExplanation(shlokaList);
                secName2ShlokasKan[secName] = shlokaList;
            }

        });
        $.getJSON("data/purusha_san.json", function (data) {
            var items = [];
            var sections = data["sections"];
            console.log('No. of sections :' + sections.length);
            for (var i = 0; i < sections.length; i++)
            {
                var section = sections[i];
                var secName = section["name"];
                var shlokaList = section["shlokaList"];
                console.log('Section :' + secName);
                app.printShlokaExplanation(shlokaList);
                secName2ShlokasSan[secName] = shlokaList;
            }

        });

        $('#collapser').on('click', function () {
            $('[data-role="collapsible"]').each(function () {
                var coll = $(this);
                coll.collapsible({collapsed: true});
            });
        });
        
        $('#expander').on('click', function () {
            $('[data-role="collapsible"]').each(function () {
                var coll = $(this);
                coll.collapsible({collapsed: false});
            });
        });
    },
    printShlokaExplanation: function (shlokaList) {
        for (var j = 0; j < shlokaList.length; j++) {
            var shloka = shlokaList[j];
            var shlokaText = shloka["text"];
            var shlokaExp = shloka["explanation"];
            console.log('Shloka Text :' + shlokaText);
            if (shlokaExp === undefined)
                continue;
            var notesList = shlokaExp["notesList"];
            for (var k = 0; k < notesList.length; k++) {
                var notes = notesList[k];
                console.log('Shloka exp Title :' + notes["title"]);
                console.log('Shloka exp Text :' + notes["text"]);
            }
        }
    },
    getShloka: function (section, shlokaNum) {

        var shlokaList = secName2Shlokas[section];
        var shloka = shlokaList[shlokaNum];
        var shlokaText = shloka["text"];
        var shlokaExp = shloka["explanation"];
        var notesList = shlokaExp["notesList"];
        console.log("-----------" + shlokaText + "-----------");
        for (var k = 0; k < notesList.length; k++) {
            var notes = notesList[k];
            var expTitle = notes["title"];
            var expText = notes["text"];
            console.log('--' + expTitle + '--');
            console.log(expText);
            console.log('---------------------');
        }
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        console.log('Received Event: ' + id);
    }
};

// Play audio
//
function playAudio(src) {

    var path = window.location.pathname;
    path = path.substr(path, path.length - 10);

    // Create Media object from src
    this.my_media = new Media('file://' + path + src, onSuccess, onError);

    // Play audio
    this.my_media.play();

}

// Pause audio
// 
function pauseAudio() {
    if (this.my_media) {
        this.my_media.pause();
    }
}

// Stop audio
// 
function stopAudio() {
    if (this.my_media) {
        this.my_media.stop();
    }
}

// onSuccess Callback
//
function onSuccess() {
    console.log("playAudio():Audio Success");
}

// onError Callback 
//
function onError(error) {
    alert('code: ' + error.code + '\n' +
            'message: ' + error.message + '\n');
}

//        // Play audio
//        //
//        playAudio: function (src) {
//
//        var path = window.location.pathname;
////                var path = '/android_asset/www/index.html'; //delete this line! test only
//                path = path.substr(path, path.length - 10);
//                // Create Media object from src
//                my_media = new Media('file://' + path + src, onSuccess, onError);
//                // Play audio
//                my_media.play();
//        },
//        // Pause audio
//        // 
//        pauseAudio: function () {
//        if (my_media) {
//        my_media.pause();
//        }
//        },
//        // Stop audio
//        // 
//        stopAudio: function () {
//        if (my_media) {
//        my_media.stop();
//        }
//        },
//        // onSuccess Callback
//        //
//        onSuccess: function () {
//        console.log("playAudio():Audio Success");
//        },
//        // onError Callback 
//        //
//        onError: function (error) {
//        alert('code: ' + error.code + '\n' +
//                'message: ' + error.message + '\n');
//        },
