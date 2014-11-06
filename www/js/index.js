
this.introSec2ShlokasEng = {};

this.puruSecName2ShlokasEng = {};
this.puruSecName2ShlokasKan = {};
this.puruSecName2ShlokasSan = {};

this.narayanaSecName2ShlokasEng = {};
this.narayanaSecName2ShlokasKan = {};
this.narayanaSecName2ShlokasSan = {};

this.durgaSecName2ShlokasEng = {};
this.durgaSecName2ShlokasKan = {};
this.durgaSecName2ShlokasSan = {};

this.sriSecName2ShlokasEng = {};
this.sriSecName2ShlokasKan = {};
this.sriSecName2ShlokasSan = {};

this.my_media;

this.purushaSuktaCached = null;
this.introCached = null;
this.narayanaSuktaCached = null;
this.durgaSuktaCached = null;
this.sriSuktaCached = null;


var app = {
    initialize: function () {
        loading('show');

        this.loadData();


        this.bindEvents();
        loading('hide');
    },
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        $('#listviewMainMenu').on('click', 'li', function () {
            var selected_index = $(this).index();
            if (selected_index > 0) {

                loading('show');
                var listIndex = "li." + selected_index;
                var menuName = $('#listviewMainMenu').children(listIndex).text().trim();
                switch (menuName) {

                    case "Introduction":
                        app.loadIntroduction();
                        break;
                    case "Purusha Sukta":
                        app.loadPurushaSuktas();
                        break;
                    case "Narayana Sukta":
                        app.loadNarayanaSuktas();
                        break;
                    case "Sri Sukta":
                        app.loadSriSuktas();
                        break;
                    case "Durga Sukta":
                        app.loadDurgaSuktas();
                        break;
                }

                loading('hide');
            }

        });
        $('#collapserPuru').on('click', this.collapseAll);
        $('#expanderPuru').on('click', this.expandAll);
        $('#collapserSri').on('click', this.collapseAll);
        $('#expanderSri').on('click', this.expandAll);
        $('collapserNarayana').on('click', this.collapseAll);
        $('expanderNarayana').on('click', this.collapseAll);
        $('collapserDurga').on('click', this.collapseAll);
        $('expanderDurga').on('click', this.collapseAll);
        $('#saveSettings').on("click", this.saveSettings);

        $("#popupSettings").bind({
            popupbeforeposition: function (event, ui) {

                if (localStorage.languageSelected !== null) {
                    $("input[name=radio-choice-lang][value=" + localStorage.languageSelected + "]").prop('checked', true);
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
    loadData: function () {

        /* introduction   */
        $.getJSON("data/introduction_eng.json", function (data) {
            var sections = data["sections"];
            console.log('No. of sections in introduction (Eng) :' + sections.length);
            for (var i = 0; i < sections.length; i++)
            {
                var section = sections[i];
                var secName = section["name"];
                var shlokaList = section["shlokaList"];
                console.log('Section :' + secName);
                introSec2ShlokasEng[secName] = shlokaList;
            }

        });

        /* purusha sukta   */
        $.getJSON("data/purusha_eng.json", function (data) {
            var sections = data["sections"];
            console.log('No. of sections in Purusha Sukta (Eng) :' + sections.length);
            for (var i = 0; i < sections.length; i++)
            {
                var section = sections[i];
                var secName = section["name"];
                var shlokaList = section["shlokaList"];
                console.log('Section :' + secName);
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
                puruSecName2ShlokasSan[secName] = shlokaList;
            }

        });

        /* sri sukta   */
        $.getJSON("data/srisukta_eng.json", function (data) {
            var sections = data["sections"];
            console.log('No. of sections in Sri Sukta (Eng)  :' + sections.length);
            for (var i = 0; i < sections.length; i++)
            {
                var section = sections[i];
                var secName = section["name"];
                var shlokaList = section["shlokaList"];
                console.log('Section :' + secName);
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
                sriSecName2ShlokasSan[secName] = shlokaList;
            }

        });

        /* narayana sukta   */
        $.getJSON("data/narayana_eng.json", function (data) {
            var sections = data["sections"];
            console.log('No. of sections in Narayana Sukta (Eng) :' + sections.length);
            for (var i = 0; i < sections.length; i++)
            {
                var section = sections[i];
                var secName = section["name"];
                var shlokaList = section["shlokaList"];
                console.log('Section :' + secName);
                narayanaSecName2ShlokasEng[secName] = shlokaList;
            }

        });
        $.getJSON("data/narayana_kan.json", function (data) {
            var sections = data["sections"];
            console.log('No. of sections in narayana Sukta (Kan)  :' + sections.length);
            for (var i = 0; i < sections.length; i++)
            {
                var section = sections[i];
                var secName = section["name"];
                var shlokaList = section["shlokaList"];
                console.log('Section :' + secName);
                narayanaSecName2ShlokasKan[secName] = shlokaList;
            }

        });
        $.getJSON("data/narayana_san.json", function (data) {
            var sections = data["sections"];
            console.log('No. of sections in narayana Sukta (San) :' + sections.length);
            for (var i = 0; i < sections.length; i++)
            {
                var section = sections[i];
                var secName = section["name"];
                var shlokaList = section["shlokaList"];
                console.log('Section :' + secName);
                narayanaSecName2ShlokasSan[secName] = shlokaList;
            }

        });

        /* durga sukta   */
        $.getJSON("data/durga_eng.json", function (data) {
            var sections = data["sections"];
            console.log('No. of sections in durga Sukta (Eng) :' + sections.length);
            for (var i = 0; i < sections.length; i++)
            {
                var section = sections[i];
                var secName = section["name"];
                var shlokaList = section["shlokaList"];
                console.log('Section :' + secName);
                durgaSecName2ShlokasEng[secName] = shlokaList;
            }

        });
        $.getJSON("data/durga_kan.json", function (data) {
            var sections = data["sections"];
            console.log('No. of sections in durga Sukta (Kan)  :' + sections.length);
            for (var i = 0; i < sections.length; i++)
            {
                var section = sections[i];
                var secName = section["name"];
                var shlokaList = section["shlokaList"];
                console.log('Section :' + secName);
                durgaSecName2ShlokasKan[secName] = shlokaList;
            }

        });
        $.getJSON("data/durga_san.json", function (data) {
            var sections = data["sections"];
            console.log('No. of sections in durga Sukta (San) :' + sections.length);
            for (var i = 0; i < sections.length; i++)
            {
                var section = sections[i];
                var secName = section["name"];
                var shlokaList = section["shlokaList"];
                console.log('Section :' + secName);
                durgaSecName2ShlokasSan[secName] = shlokaList;
            }

        });

    },
    setDefaultSettings: function () {
        if (localStorage.languageSelected === undefined) {

            localStorage.languageSelected = "sanskrit";
            console.log('setting the default language to sanskrit');
        }

        if (localStorage.learningMode === undefined) {
            console.log('setting the default learning mode to on');
            localStorage.learningMode = "on";
        }
    },
    saveSettings: function () {
        window.localStorage.setItem("learningMode", $("#slider-flip-learn").val());
        window.localStorage.setItem("languageSelected", $('input[name=radio-choice-lang]:checked').val());
        console.log('--Saved the settings--');
        console.log('Language:' + localStorage.languageSelected);
        console.log('Learning Mode:' + localStorage.learningMode);
        console.log('----');

        purushaSuktaCached = null;
        sriSuktaCached = null;
        narayanaSuktaCached = null;
        durgaSuktaCached = null;

        $("#listviewPurusha").empty();
        $("#listviewSrisukta").empty();
        $("#listviewNarayana").empty();
        $("#listviewDurgaSukta").empty();
    },
    collapseAll: function () {
        $('[data-role="collapsible"]').each(function () {
            var coll = $(this);
            coll.collapsible({collapsed: true});
        });
    },
    expandAll: function () {
        $('[data-role="collapsible"]').each(function () {
            var coll = $(this);
            coll.collapsible({collapsed: false});
        });
    },
    loadIntroduction: function () {
        $.mobile.navigate("#introduction");

        var parentElementDiv = '#listviewIntro';
        if (introCached !== null) {
            console.log("intro, loading cached contents");
            $(parentElementDiv).append(introCached);
            $('[data-role="collapsible"]').parent().enhanceWithin();
            return;
        }

        // shlokas to be displayed in one page
        console.log("intro, building the contents with learning mode off");
        introCached = app.buildIntroPage(parentElementDiv);

        loading('hide');
    },
    loadNarayanaSuktas: function () {
        $.mobile.navigate("#narayanasukta");

        var parentElementDiv = '#listviewNarayana';
        if (narayanaSuktaCached !== null) {
            console.log("Narayana Sukta, loading cached contents");
            $(parentElementDiv).append(narayanaSuktaCached);
            $('[data-role="collapsible"]').parent().enhanceWithin();
            return;
        }

        // shlokas to be displayed in one page
        if (localStorage.learningMode === 'off') {
            console.log("narayana-sukta, building the contents with learning mode off");
            app.buildNarayanaSuktasInSinglePage(parentElementDiv);
        }
        else {
            console.log("narayana-sukta, building the contents");
            app.buildNarayanaSuktas(parentElementDiv, 'on');
        }
        loading('hide');
    },
    loadDurgaSuktas: function () {
        $.mobile.navigate("#durgaSukta");

        var parentElementDiv = '#listviewDurgaSukta';
        if (durgaSuktaCached !== null) {
            console.log("Durga Sukta, loading cached contents");
            $(parentElementDiv).append(durgaSuktaCached);
            $('[data-role="collapsible"]').parent().enhanceWithin();
            return;
        }

        // shlokas to be displayed in one page
        if (localStorage.learningMode === 'off') {
            console.log("durga-sukta, building the contents with learning mode off");
            app.buildDurgaSuktasInSinglePage(parentElementDiv);
        }
        else {
            console.log("durga-sukta, building the contents");
            app.buildDurgaSuktas(parentElementDiv);
        }
        loading('hide');
    },       
    loadPurushaSuktas: function () {
        $.mobile.navigate("#purushaSukta");
        var parentElementDiv = '#listviewPurusha';
        if (purushaSuktaCached !== null) {
            console.log("purusha-sukta, loading cached contents");
            $(parentElementDiv).append(purushaSuktaCached);
            $('[data-role="collapsible"]').parent().enhanceWithin();
            return;
        }

        // shlokas to be displayed in one page
        if (localStorage.learningMode === 'off') {
            console.log("purusha-sukta, building the contents with learning mode off");
            app.buildPurushaSuktasInSinglePage(parentElementDiv);
        }
        else {
            console.log("purusha-sukta, building the contents");
            app.buildPurushaSuktas(parentElementDiv, 'on');
        }
        loading('hide');
    },    
    loadSriSuktas: function () {

        $.mobile.navigate("#sriSukta");
        var parentElementDiv = '#listviewSrisukta';
        if (sriSuktaCached !== null) {
            console.log("loading cached contents for srisukta");
            $(parentElementDiv).append(sriSuktaCached);
            $('[data-role="collapsible"]').parent().enhanceWithin();
            return;
        }

        // shlokas to be displayed in one page
        if (localStorage.learningMode === 'off') {
            console.log("sri-sukta, building the contents with learning mode off");
            app.buildSriSuktasInSinglePage(parentElementDiv);
        }
        else {
            console.log("sri-sukta : building the contents");
            app.buildSriSuktas(parentElementDiv);
        }

    },
    
    buildIntroPage: function (parentElementDiv) {

        var secNum = 1;
        for (var key in introSec2ShlokasEng) {
            console.log('Building intro for section:' + key);
            var shlokaListEng = introSec2ShlokasEng[key];
            introCached = app.buildIntroContent(shlokaListEng, parentElementDiv);
            secNum++;
        }
    },
    buildPurushaSuktas: function (parentElementDiv) {

        var secNum = 1;
        for (var key in puruSecName2ShlokasEng) {
            console.log('Building purusha-sukta for section:' + key);
            var headerSection = "<div data-role='header'><h1>" + key + "</h1></div>";
            $(parentElementDiv).append(headerSection);
            var shlokaListEng = puruSecName2ShlokasEng[key];
            var shlokaListKan = puruSecName2ShlokasKan[key];
            var shlokaListSan = puruSecName2ShlokasSan[key];
            purushaSuktaCached = app.buildSuktaContent('purushasukta', secNum, shlokaListEng, shlokaListSan, shlokaListKan, parentElementDiv);
            secNum++;
        }
    },
    buildPurushaSuktasInSinglePage: function (parentElementDiv) {

        var secNum = 1;
        for (var key in puruSecName2ShlokasEng) {
            console.log('Building purusha-sukta for section:' + key);
            var headerSection = "<div data-role='header'><h1>" + key + "</h1></div>";
            $(parentElementDiv).append(headerSection);
            var shlokaListEng = puruSecName2ShlokasEng[key];
            var shlokaListKan = puruSecName2ShlokasKan[key];
            var shlokaListSan = puruSecName2ShlokasSan[key];
            purushaSuktaCached = app.buildSuktaContentInOnePage(shlokaListEng, shlokaListSan, shlokaListKan, parentElementDiv);
            secNum++;
        }
    },
    buildNarayanaSuktas: function (parentElementDiv) {

        var secNum = 1;
        for (var key in narayanaSecName2ShlokasEng) {
            console.log('Building narayana-sukta for section:' + key);
            var headerSection = "<div data-role='header'><h1>" + key + "</h1></div>";
            $(parentElementDiv).append(headerSection);
            var shlokaListEng = narayanaSecName2ShlokasEng[key];
            var shlokaListKan = narayanaSecName2ShlokasKan[key];
            var shlokaListSan = narayanaSecName2ShlokasSan[key];
            narayanaSuktaCached = app.buildSuktaContent('narayanasukta', secNum, shlokaListEng, shlokaListSan, shlokaListKan, parentElementDiv);
            secNum++;
        }
    },
    buildNarayanaSuktasInSinglePage: function (parentElementDiv) {

        var secNum = 1;
        for (var key in narayanaSecName2ShlokasEng) {
            console.log('Building narayana-sukta for section:' + key);
            var headerSection = "<div data-role='header'><h1>" + key + "</h1></div>";
            $(parentElementDiv).append(headerSection);
            var shlokaListEng = narayanaSecName2ShlokasEng[key];
            var shlokaListKan = narayanaSecName2ShlokasKan[key];
            var shlokaListSan = narayanaSecName2ShlokasSan[key];
            narayanaSuktaCached = app.buildSuktaContentInOnePage(shlokaListEng, shlokaListSan, shlokaListKan, parentElementDiv);
            secNum++;
        }
    },
    buildDurgaSuktas: function (parentElementDiv) {

        var secNum = 1;
        for (var key in durgaSecName2ShlokasEng) {
            console.log('Building durga-sukta for section:' + key);
            var headerSection = "<div data-role='header'><h1>" + key + "</h1></div>";
            $(parentElementDiv).append(headerSection);
            var shlokaListEng = durgaSecName2ShlokasEng[key];
            var shlokaListKan = durgaSecName2ShlokasKan[key];
            var shlokaListSan = durgaSecName2ShlokasSan[key];
            durgaSuktaCached = app.buildSuktaContent('durgasukta', secNum, shlokaListEng, shlokaListSan, shlokaListKan, parentElementDiv);
            secNum++;
        }
    },
    buildDurgaSuktasInSinglePage: function (parentElementDiv) {

        var secNum = 1;
        for (var key in durgaSecName2ShlokasEng) {
            console.log('Building durga-sukta for section:' + key);
            var headerSection = "<div data-role='header'><h1>" + key + "</h1></div>";
            $(parentElementDiv).append(headerSection);
            var shlokaListEng = durgaSecName2ShlokasEng[key];
            var shlokaListKan = durgaSecName2ShlokasKan[key];
            var shlokaListSan = durgaSecName2ShlokasSan[key];
            durgaSuktaCached = app.buildSuktaContentInOnePage(shlokaListEng, shlokaListSan, shlokaListKan, parentElementDiv);
            secNum++;
        }
    },    
    buildSriSuktas: function (parentElementDiv) {

        var secNum = 1;
        for (var key in sriSecName2ShlokasEng) {
            console.log('Building sri-sukta for section:' + key);
            var headerSection = "<div data-role='header'><h1>" + key + "</h1></div>";
            $(parentElementDiv).append(headerSection);
            var shlokaListEng = sriSecName2ShlokasEng[key];
            var shlokaListKan = sriSecName2ShlokasKan[key];
            var shlokaListSan = sriSecName2ShlokasSan[key];
            sriSuktaCached = app.buildSuktaContent('srisukta', secNum, shlokaListEng, shlokaListSan, shlokaListKan, parentElementDiv);
            secNum++;
        }

    },
    buildSriSuktasInSinglePage: function (parentElementDiv) {

        var secNum = 1;
        for (var key in sriSecName2ShlokasEng) {
            console.log('Building sri-sukta for section:' + key);
            var headerSection = "<div data-role='header'><h1>" + key + "</h1></div>";
            $(parentElementDiv).append(headerSection);
            var shlokaListEng = sriSecName2ShlokasEng[key];
            var shlokaListKan = sriSecName2ShlokasKan[key];
            var shlokaListSan = sriSecName2ShlokasSan[key];
            sriSuktaCached = app.buildSuktaContentInOnePage(shlokaListEng, shlokaListSan, shlokaListKan, parentElementDiv);
            secNum++;
        }

    },
    
    buildSuktaContentInOnePage: function (engList, sanList, kanList, parentElementDiv) {

        var shlokaContentPrelude = "<fieldset class='ui-grid-e center'>";
        shlokaContentPrelude += "<div class='ui-block-b'><button class='ui-btn ui-icon-delete ui-btn-icon-left'>Stop</button></div>";
        shlokaContentPrelude += "<div class='ui-block-c'><button class='ui-btn ui-icon-audio ui-btn-icon-left' onclick=\"playAudio('audio/purushasukta0.aac')\">Play</button></div>";
        shlokaContentPrelude += "</fieldset>";
        $(parentElementDiv).append(shlokaContentPrelude);
        for (var shlokaNum = 0; shlokaNum < engList.length; shlokaNum++) {

            var shlokaEng = engList[shlokaNum];
            var shlokaKan = kanList[shlokaNum];
            var shlokaSan = sanList[shlokaNum];
            var shlokaTextEng = shlokaEng["text"];
            var shlokaTextKan = shlokaKan["text"];
            var shlokaTextSan = shlokaSan["text"];
            var shlokaContent = "<p>";
            shlokaContent += "<h3>" + 'Shloka ' + (shlokaEng["num"] === '0' ? "Dhyanam" : shlokaEng["num"]) + "</h3>";
            shlokaContent += "<p>" + shlokaTextEng.replace(/\n/g, '<br/>') + "</p>";
            if (localStorage.languageSelected === 'kannada')
                shlokaContent += "<p>" + shlokaTextKan.replace(/\n/g, '<br/>') + "</p>";
            if (localStorage.languageSelected === 'sanskrit')
                shlokaContent += "<p>" + shlokaTextSan.replace(/\n/g, '<br/>') + "</p>";
            shlokaContent += "<a href='#' onclick='$.mobile.silentScroll(0)'>Back To Top</a>";
            shlokaContent += "</p>";
            shlokaContentPrelude += shlokaContent;
            $(parentElementDiv).append(shlokaContent);
        }
        return shlokaContentPrelude;
    },
    buildIntroContent: function (engList, parentElementDiv) {

        for (var shlokaNum = 0; shlokaNum < engList.length; shlokaNum++) {

            var shlokaEng = engList[shlokaNum];
            var shlokaTextEng = shlokaEng["text"];
            var shlokaEngExp = shlokaEng["explanation"];
            var notesList = shlokaEngExp["notesList"];

            var shlokaContent = "<p>" + shlokaTextEng.replace(/\n/g, '<br/>') + "</p>";
            $(parentElementDiv).append(shlokaContent);

            var iterShlokaContent = "";
            for (var k = 0; k < notesList.length; k++) {
                var notes = notesList[k];
                var expTitle = notes["title"];
                var expText = notes["text"];
                iterShlokaContent += "<p><b>" + expTitle + "</b></p>";
                iterShlokaContent += "<p>" + expText.replace(/\n/g, '<br/>') + "</p>";
                iterShlokaContent += "<a href='#' onclick='$.mobile.silentScroll(0)'>Back To Top</a>";
            }
            $(parentElementDiv).append(iterShlokaContent);
        }
        $('[data-role="collapsible"]').parent().enhanceWithin();
        return shlokaContent + iterShlokaContent;
    },
    buildSuktaContent: function (type, secNum, engList, sanList, kanList, parentElementDiv) {

        for (var shlokaNum = 0; shlokaNum < engList.length; shlokaNum++) {

            var shlokaEng = engList[shlokaNum];
            var shlokaKan = kanList[shlokaNum];
            var shlokaSan = sanList[shlokaNum];
            var shlokaTextEng = shlokaEng["text"];
            var shlokaTextKan = shlokaKan["text"];
            var shlokaTextSan = shlokaSan["text"];
            var shlokaEngExp = shlokaEng["explanation"];
            var notesList = shlokaEngExp["notesList"];
            if (type !== null) {
                var shlokaContent = "<div data-role='collapsible' data-theme='b'>";
                shlokaContent += "<fieldset class='ui-grid-e center'>";
                shlokaContent += "<div class='ui-block-b'><button class='ui-btn ui-icon-delete ui-btn-icon-left'>Stop</button></div>";
                var audioFile = "audio/" + type + secNum + "_" + shlokaNum + ".aac";
                shlokaContent += "<div class='ui-block-c'><button class='ui-btn ui-icon-audio ui-btn-icon-left' onclick=\"playAudio('" + audioFile + "')\">Play</button></div>";
                shlokaContent += "</fieldset>";
            }
            shlokaContent += "<h3>" + 'Shloka ' + (shlokaEng["num"] === '0' ? "Dhyanam" : shlokaEng["num"]) + "</h3>";
            shlokaContent += "<p>" + shlokaTextEng.replace(/\n/g, '<br/>') + "</p>";
            if (localStorage.languageSelected === 'kannada')
                shlokaContent += "<p>" + shlokaTextKan.replace(/\n/g, '<br/>') + "</p>";
            if (localStorage.languageSelected === 'sanskrit')
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
    
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
    },
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

