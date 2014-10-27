
this.secName2ShlokasEng = {};
this.secName2ShlokasKan = {};
this.secName2ShlokasSan = {};

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

                alert(menuName); // id of clicked li by directly accessing DOMElement property

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
