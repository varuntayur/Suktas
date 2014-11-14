
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
this.isManualStop = false;
this.forceAudioPlayStop = false;
this.mediaIndex = 0;
this.audioPlayType = null;
this.sukta2ShlokaMediaList = {};
this.durgaSuktasMediaList = ["durgasukta1_0.aac", "durgasukta1_1.aac",
    "durgasukta1_2.aac", "durgasukta1_3.aac",
    "durgasukta1_4.aac", "durgasukta1_5.aac",
    "durgasukta1_6.aac", "durgasukta1_7.aac"];
this.narayanaSuktasMediaList = ["narayanasukta1_0.aac",
    "narayanasukta1_1.aac", "narayanasukta1_2.aac",
    "narayanasukta1_3.aac", "narayanasukta1_4.aac",
    "narayanasukta1_5.aac", "narayanasukta1_6.aac",
    "narayanasukta1_7.aac", "narayanasukta1_8.aac",
    "narayanasukta1_9.aac", "narayanasukta1_10.aac",
    "narayanasukta1_11.aac", "narayanasukta1_12.aac",
    "narayanasukta1_13.aac"];
this.purushaSuktasMediaList = ["purushasukta1_0.aac",
    "purushasukta1_1.aac", "purushasukta1_2.aac",
    "purushasukta1_3.aac", "purushasukta1_4.aac",
    "purushasukta1_5.aac", "purushasukta1_6.aac",
    "purushasukta1_7.aac", "purushasukta1_8.aac",
    "purushasukta1_9.aac", "purushasukta1_10.aac",
    "purushasukta1_11.aac", "purushasukta1_12.aac",
    "purushasukta1_13.aac", "purushasukta1_14.aac",
    "purushasukta1_15.aac", "purushasukta1_16.aac",
    "purushasukta1_17.aac", "purushasukta1_18.aac",
    "purushasukta1_19.aac", "purushasukta1_20.aac",
    "purushasukta1_21.aac", "purushasukta1_22.aac",
    "purushasukta1_23.aac", "purushasukta1_24.aac",
    "purushasukta1_25.aac"];
this.sriSuktasMediaList = ["srisukta1_0.aac",
    "srisukta1_1.aac", "srisukta1_2.aac",
    "srisukta1_3.aac", "srisukta1_4.aac",
    "srisukta1_5.aac", "srisukta1_6.aac",
    "srisukta1_7.aac", "srisukta1_8.aac",
    "srisukta1_9.aac", "srisukta1_10.aac",
    "srisukta1_11.aac", "srisukta1_12.aac",
    "srisukta1_13.aac", "srisukta1_14.aac",
    "srisukta2_0.aac", "srisukta2_1.aac",
    "srisukta2_2.aac", "srisukta2_3.aac",
    "srisukta2_4.aac", "srisukta2_5.aac",
    "srisukta2_6.aac", "srisukta2_7.aac",
    "srisukta2_8.aac", "srisukta2_9.aac",
    "srisukta2_10.aac", "srisukta2_11.aac",
    "srisukta2_12.aac", "srisukta2_13.aac",
    "srisukta2_14.aac", "srisukta2_15.aac",
    "srisukta2_16.aac"];
var app = {
    initialize: function () {
        loading('show');
        this.loadData();
        this.bindEvents();
        loading('hide');
    },
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('backbutton', this.backButtonCallback, false);
        $('#listviewMainMenu').on('click', 'li', function () {
            var selected_index = $(this).index();
            if (selected_index > 0) {

                loading('show');
                var listIndex = "li." + selected_index;
                var menuName = $('#listviewMainMenu').children(listIndex).text().trim();
                mediaIndex = 0;
                forceAudioPlayStop = false;
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
        $(window).on("navigate", function (event, data) {
            var direction = data.state.direction;
            if (direction === 'back') {
                console.log('Back button pressed');
                this.stopAudio();
            }
            if (direction === 'forward') {
                console.log('forward  button pressed');
                this.stopAudio();
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
        sukta2ShlokaMediaList["durgasukta"] = durgaSuktasMediaList;
        sukta2ShlokaMediaList["narayanasukta"] = narayanaSuktasMediaList;
        sukta2ShlokaMediaList["purushasukta"] = purushaSuktasMediaList;
        sukta2ShlokaMediaList["srisukta"] = sriSuktasMediaList;
        app.setDefaultSettings();
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
            purushaSuktaCached = app.buildSuktaContentInOnePage('purushasukta', shlokaListEng, shlokaListSan, shlokaListKan, parentElementDiv);
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
            narayanaSuktaCached = app.buildSuktaContentInOnePage('narayanasukta', shlokaListEng, shlokaListSan, shlokaListKan, parentElementDiv);
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
            durgaSuktaCached = app.buildSuktaContentInOnePage('durgasukta', shlokaListEng, shlokaListSan, shlokaListKan, parentElementDiv);
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
            sriSuktaCached = app.buildSuktaContentInOnePage('srisukta', shlokaListEng, shlokaListSan, shlokaListKan, parentElementDiv);
            secNum++;
        }

    },
    buildSuktaContentInOnePage: function (type, engList, sanList, kanList, parentElementDiv) {

        audioPlayType = type;
        var shlokaContentPrelude = "<fieldset class='ui-grid-e center'>";
        shlokaContentPrelude += "<div class='ui-block-b'><button class='ui-btn ui-icon-delete ui-btn-icon-left' onclick=\"stopAudioLoop(" + true + ")\">Stop</button></div>";
        shlokaContentPrelude += "<div class='ui-block-c'><button class='ui-btn ui-icon-audio ui-btn-icon-left' onclick=\"playAudioLoop()\">Play</button></div>";
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
                shlokaContent += "<div class='ui-block-b'><button class='ui-btn ui-icon-delete ui-btn-icon-left' onclick=\"stopAudio()\">Stop</button></div>";
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
    backButtonCallback: function () {
        console.log('Back button pressed..');
        forceAudioPlayStop = true;
        stopAudio();
        $.mobile.navigate("#home");
        return false;
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

    if (this.my_media !== null)
        stopAudio();
    var path = window.location.pathname;
    path = path.substr(path, path.length - 10);
    // Create Media object from src
    this.my_media = new Media('file://' + path + src, onSuccess, onError);
    // Play audio
    this.my_media.play();
}

function playAudioLoop() {

    var mediaPlaylist = sukta2ShlokaMediaList[audioPlayType];
    if (this.mediaIndex > (mediaPlaylist.length - 1)) {
        console.log("playAudioLoop():Play Audio reached end of list." + this.mediaIndex + "/" + mediaPlayList.length);
        return;
    }
    var curMediaItem = "audio/" + mediaPlaylist[this.mediaIndex++];
    if (this.my_media) {
        forceAudioPlayStop = true;
        this.my_media.stop();
        this.my_media = null;
        console.log("stopAudio():Stop Audio Success");
    }

    var path = window.location.pathname;
    path = path.substr(path, path.length - 10);
    this.my_media = new Media('file://' + path + curMediaItem, onSuccessLoop, onErrorLoop, onStatus);
    this.my_media.play();
    console.log("playAudioLoop():Play Audio Success" + curMediaItem);
}

function stopAudioLoop(isManualStop) {
    if (this.my_media) {
        forceAudioPlayStop = Boolean(isManualStop);
        this.my_media.stop();
        this.my_media = null;
        console.log("stopAudioLoop():Stop Audio Loop Success");
    }
}

function stopAudio() {
    if (this.my_media) {
        this.my_media.stop();
        this.my_media = null;
        console.log("stopAudio():Stop Audio Success");
    }
}

function onSuccessLoop() {
    console.log("playAudioLoop():Audio Success");
    this.my_media = null;
}

function onSuccess() {
    console.log("playAudio():Audio Success");
    this.my_media = null;
}

function onErrorLoop(error) {
    console.log('Encountered an error trying to play the sound track. Details: code: ' + error.code + '\n' +
            'message: ' + error.message + '\n');
}

function onError(error) {
    console.log('Encountered an error trying to play the sound track. Details: code: ' + error.code + '\n' +
            'message: ' + error.message + '\n');
}
function onStatus(status) {
    if (status === Media.MEDIA_STOPPED) {
        console.log("playAudio():Audio stop success, will begin next track");
        if (forceAudioPlayStop) {
            forceAudioPlayStop = false;
            return;
        }
        playAudioLoop();
    }
}


