
this.puruSecName2ShlokasEng = {};
this.puruSecName2ShlokasKan = {};
this.puruSecName2ShlokasSan = {};
this.sriSecName2ShlokasEng = {};
this.sriSecName2ShlokasKan = {};
this.sriSecName2ShlokasSan = {};
this.my_media;

this.purushaSuktaCached = null;
this.sriSuktaCached = null;

var app = {
    // Application Constructor
    initialize: function () {
        loading('show');
        $.getJSON("data/purusha_eng.json", function (data) {
            var sections = data["sections"];
            console.log('No. of sections in Purusha Sukta (Eng) :' + sections.length);
            for (var i = 0; i < sections.length; i++)
            {
                var section = sections[i];
                var secName = section["name"];
                var shlokaList = section["shlokaList"];
                console.log('Section :' + secName);
//                app.printShlokaExplanation(shlokaList);
                puruSecName2ShlokasEng[secName] = shlokaList;
            }

        });
        $.getJSON("data/purusha_kan.json", function (data) {
            var items = [];
            var sections = data["sections"];
            console.log('No. of sections in Purusha Sukta (Kan)  :' + sections.length);
            for (var i = 0; i < sections.length; i++)
            {
                var section = sections[i];
                var secName = section["name"];
                var shlokaList = section["shlokaList"];
                console.log('Section :' + secName);
//                app.printShlokaExplanation(shlokaList);
                puruSecName2ShlokasKan[secName] = shlokaList;
            }

        });
        $.getJSON("data/purusha_san.json", function (data) {
            var items = [];
            var sections = data["sections"];
            console.log('No. of sections in Purusha Sukta (San) :' + sections.length);
            for (var i = 0; i < sections.length; i++)
            {
                var section = sections[i];
                var secName = section["name"];
                var shlokaList = section["shlokaList"];
                console.log('Section :' + secName);
//                app.printShlokaExplanation(shlokaList);
                puruSecName2ShlokasSan[secName] = shlokaList;
            }

        });

        $.getJSON("data/srisukta_eng.json", function (data) {
            var sections = data["sections"];
            console.log('No. of sections in Sri Sukta (Eng)  :' + sections.length);
            for (var i = 0; i < sections.length; i++)
            {
                var section = sections[i];
                var secName = section["name"];
                var shlokaList = section["shlokaList"];
                console.log('Section :' + secName);
//                app.printShlokaExplanation(shlokaList);
                sriSecName2ShlokasEng[secName] = shlokaList;
            }

        });
        $.getJSON("data/srisukta_kan.json", function (data) {
            var items = [];
            var sections = data["sections"];
            console.log('No. of sections in Sri Sukta (Kan)  :' + sections.length);
            for (var i = 0; i < sections.length; i++)
            {
                var section = sections[i];
                var secName = section["name"];
                var shlokaList = section["shlokaList"];
                console.log('Section :' + secName);
//                app.printShlokaExplanation(shlokaList);
                sriSecName2ShlokasKan[secName] = shlokaList;
            }

        });
        $.getJSON("data/srisukta_san.json", function (data) {
            var items = [];
            var sections = data["sections"];
            console.log('No. of sections in Sri Sukta (San):' + sections.length);
            for (var i = 0; i < sections.length; i++)
            {
                var section = sections[i];
                var secName = section["name"];
                var shlokaList = section["shlokaList"];
                console.log('Section :' + secName);
//                app.printShlokaExplanation(shlokaList);
                sriSecName2ShlokasSan[secName] = shlokaList;
            }

        });

        this.bindEvents();

        loading('hide');
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

                loading('show');

                var listIndex = "li." + selected_index;
                var menuName = $('#listviewMainMenu').children(listIndex).text().trim();
//                alert(menuName); // id of clicked li by directly accessing DOMElement property

                if (menuName === "Purusha Sukta") {
                    $.mobile.navigate("#purushaSukta");
                    var parentElementDiv = '#listviewPurusha';
                    if (purushaSuktaCached === null) {
                        console.log("building the contents");
                        app.buildPurushaSuktas(parentElementDiv);
                    }
                    else {
                        console.log("loading cached contents");
                        $(parentElementDiv).append(purushaSuktaCached);
                        $('[data-role="collapsible"]').parent().enhanceWithin();
                    }
                    loading('hide');
                }
                else if (menuName === "Sri Sukta") {

                    $.mobile.navigate("#sriSukta");
                    var parentElementDiv = '#listviewSrisukta';
                    if (sriSuktaCached === null) {
                        console.log("sri-sukta : building the contents");
                        app.buildSriSuktas(parentElementDiv);
                    }
                    else {
                        console.log("loading cached contents for srisukta");
                        $(parentElementDiv).append(sriSuktaCached);
                        $('[data-role="collapsible"]').parent().enhanceWithin();
                    }
                    loading('hide');
                }
            }
        });

        $('#collapserPuru').on('click', function () {
            $('[data-role="collapsible"]').each(function () {
                var coll = $(this);
                coll.collapsible({collapsed: true});
            });
        });

        $('#expanderPuru').on('click', function () {
            $('[data-role="collapsible"]').each(function () {
                var coll = $(this);
                coll.collapsible({collapsed: false});
            });
        });

        $('#collapserSri').on('click', function () {
            $('[data-role="collapsible"]').each(function () {
                var coll = $(this);
                coll.collapsible({collapsed: true});
            });
        });

        $('#expanderSri').on('click', function () {
            $('[data-role="collapsible"]').each(function () {
                var coll = $(this);
                coll.collapsible({collapsed: false});
            });
        });

        $('#saveSettings').on("click", function () {
            window.localStorage.setItem("learningMode", $("#slider-flip-learn").val());
            window.localStorage.setItem("languageSelected", $('input[name=radio-choice-lang]:checked').val());

            console.log('--Saved the settings--');
            console.log('Language:' + localStorage.languageSelected);
            console.log('Learning Mode:' + localStorage.learningMode);
            console.log('----');
        });

        $("#popupSettings").bind({
            popupbeforeposition: function (event, ui) {

                if (localStorage.languageSelected !== null) {
                    $("input[name=radio-choice-lang]").val([localStorage.languageSelected]);
                }
                if (localStorage.learningMode !== null) {
                    $("#slider-flip-learn").val(localStorage.learningMode).slider('refresh');
                }

                console.log('--Displaying the saved settings--');
                console.log(localStorage.languageSelected);
                console.log(localStorage.learningMode);
                console.log('----');
            }
        });

    },
    buildPurushaSuktas: function (parentElementDiv) {

        var shlokaListEng = puruSecName2ShlokasEng["Purusha Sukta"];
        var shlokaListKan = puruSecName2ShlokasKan["Purusha Sukta"];
        var shlokaListSan = puruSecName2ShlokasSan["Purusha Sukta"];

        purushaSuktaCached = app.buildSuktaContent(shlokaListEng, shlokaListSan, shlokaListKan, parentElementDiv);

    },
    buildSriSuktas: function (parentElementDiv) {

        var shlokaListEng = sriSecName2ShlokasEng["Sri Sukta"];
        var shlokaListKan = sriSecName2ShlokasKan["Sri Sukta"];
        var shlokaListSan = sriSecName2ShlokasSan["Sri Sukta"];

        sriSuktaCached = app.buildSuktaContent(shlokaListEng, shlokaListSan, shlokaListKan, parentElementDiv);


        var headerSection = "<div data-role='header'><h1>Phala Shruthi</h1></div>";
        $(parentElementDiv).append(headerSection);
        sriSuktaCached += headerSection;

        var shlokaListEng = sriSecName2ShlokasEng["Sri Sukta - Phala Shruthi"];
        var shlokaListKan = sriSecName2ShlokasKan["Sri Sukta - Phala Shruthi"];
        var shlokaListSan = sriSecName2ShlokasSan["Sri Sukta - Phala Shruthi"];

        sriSuktaCached += app.buildSuktaContent(shlokaListEng, shlokaListSan, shlokaListKan, parentElementDiv);

    },
    buildSuktaContent: function (engList, sanList, kanList, parentElementDiv) {

        for (var shlokaNum = 0; shlokaNum < engList.length; shlokaNum++) {

            var shlokaEng = engList[shlokaNum];
            var shlokaKan = kanList[shlokaNum];
            var shlokaSan = sanList[shlokaNum];
            var shlokaTextEng = shlokaEng["text"];
            var shlokaTextKan = shlokaKan["text"];
            var shlokaTextSan = shlokaSan["text"];
            var shlokaEngExp = shlokaEng["explanation"];
            var notesList = shlokaEngExp["notesList"];
            var shlokaContent = "<div data-role='collapsible' data-theme='b'>";
            shlokaContent += "<fieldset class='ui-grid-e center'>";
            shlokaContent += "<div class='ui-block-b'><button class='ui-btn ui-icon-delete ui-btn-icon-left'>Stop</button></div>";
            shlokaContent += "<div class='ui-block-c'><button class='ui-btn ui-icon-audio ui-btn-icon-left' onclick=\"playAudio('stotra_1_1.mp3')\">Play</button></div>";
            shlokaContent += "</fieldset>";
            shlokaContent += "<h3>" + 'Shloka ' + (shlokaEng["num"] === '0' ? "Dhyanam" : shlokaEng["num"]) + "</h3>";
            shlokaContent += "<p>" + shlokaTextEng.replace(/\n/g, '<br/>') + "</p>";
            shlokaContent += "<p>" + shlokaTextKan.replace(/\n/g, '<br/>') + "</p>";
            shlokaContent += "<p>" + shlokaTextSan.replace(/\n/g, '<br/>') + "</p>";
            for (var k = 0; k < notesList.length; k++) {
                var notes = notesList[k];
                var expTitle = notes["title"];
                var expText = notes["text"];
                shlokaContent += "<p><b>" + expTitle + "</b></p>";
                shlokaContent += "<p>" + expText.replace(/\n/g, '<br/>') + "</p>";
                shlokaContent += "<a href='#' onclick='$.mobile.silentScroll(0)'>Back To Top</a>";
                $(parentElementDiv).append(shlokaContent);
            }
        }
        $('[data-role="collapsible"]').parent().enhanceWithin();
        return shlokaContent;
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
    }
    ,
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

function loading(showOrHide) {
    if (showOrHide === 'show') {
        $("body").addClass("loading");
    }
    else
        $("body").removeClass("loading");
}
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
