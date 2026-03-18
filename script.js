document.addEventListener('DOMContentLoaded', () => {
    
    // The raw data from the summary
    const phasesData = [
        {
            title: "Faza 1: Ucieczka, poszukiwanie prawdy i intrygi Canan",
            events: [
                "[cite_start]Po postrzeleniu Yamana, zdesperowana Seher ucieka z Yusufem i żyją w biedzie, walcząc o przetrwanie[cite: 3075, 3082].",
                "[cite_start]Yaman ich odnajduje i zmusza do powrotu, jednak Seher nienawidzi go, myśląc, że jest mordercą jej siostry[cite: 3023, 3067, 3070].",
                "[cite_start]Wkrótce wychodzi na jaw, że Yaman jest niewinny, a za śmierć Kevser odpowiada Ikbal oraz sfałszowany przez lekarkę raport[cite: 3015, 3016, 3024].",
                "[cite_start]W życiu Yamana pojawia się jego matka, Canan, która potajemnie współpracuje z lekarzem i fałszuje historię swojej choroby, by wzbudzić litość i przejąć majątek syna[cite: 2944, 2946].",
                "[cite_start]Zła kobieta posuwa się do tego, że podaje Yamanowi truciznę niszczącą jego wątrobę[cite: 2695].",
                "[cite_start]Dzięki nagraniom od Seher intryga wychodzi na jaw, a Yaman zamyka matkę w kotłowni[cite: 2371, 2372].",
                "[cite_start]Jakiś czas później Canan ginie w wyniku szamotaniny z Keremem[cite: 2349]."
            ]
        },
        {
            title: "Faza 2: Utrata pamięci, nowi wrogowie i tragiczny finał Seher",
            events: [
                "[cite_start]Zuhal po wielu okrutnych intrygach ginie, spadając ze schodów z nożem wbitym w pierś podczas ostatecznej próby zamordowania Seher i Yamana[cite: 1973, 1976].",
                "[cite_start]Seher traci pamięć, a w jej odzyskaniu pomaga jej doktor Aziz, który wkrótce okazuje się bratem nowego, potężnego wroga Yamana – Idrisa[cite: 1960, 2007].",
                "[cite_start]Mimo przeciwności, Seher i Yaman zbliżają się do siebie na nowo i planują wziąć podwójny ślub razem z Ziyą i Çicek[cite: 1800].",
                "[cite_start]Idris swoimi manipulacjami doprowadza do śmierci Aziza i o mały włos nie niszczy rodziny Kyrymly[cite: 1794, 1795, 1796].",
                "[cite_start]Sielanka nie trwa długo, gdyż Nedim przynosi Yamanowi tragiczne wieści o Seher, co brutalnie kończy jej wątek w serialu[cite: 1797]."
            ]
        },
        {
            title: "Faza 3: Pojawienie się Nany, zemsta i zdrada Nedima",
            events: [
                "[cite_start]Trzy miesiące po dramatycznych wydarzeniach Yusuf, z powodu traumy, przestaje mówić[cite: 1786].",
                "[cite_start]W rezydencji pojawia się Nana, siostra Aziza, która w tajemnicy pragnie pomścić brata, wierząc, że zabił go Yaman[cite: 1785, 1787].",
                "[cite_start]Nana zostaje guwernantką Yusufa, dzięki czemu chłopiec powoli odzyskuje mowę[cite: 1752, 1778].",
                "[cite_start]Kobieta waha się przed zabiciem Yamana, a z czasem dowiaduje się od Halita, że prawdziwym mordercą jej brata był Idris[cite: 1247, 1248, 1749].",
                "[cite_start]Podczas ostatecznego starcia z Yamanem, Idris ginie pod kołami samochodu[cite: 1149].",
                "[cite_start]Nedim z powodu chorobliwej miłości do Nany zdradza Yamana i aranżuje wybuch jego samochodu[cite: 820, 823, 824].",
                "[cite_start]Yaman jednak przeżywa ten zamach i działa w ukryciu[cite: 804, 812].",
                "[cite_start]Gdy Nedim porywa Nanę i szantażuje Yamana, ostatecznie traci równowagę i spada w przepaść[cite: 308, 309].",
                "[cite_start]Nana i Yaman wyznają sobie miłość i oficjalnie się zaręczają[cite: 139, 154]."
            ]
        },
        {
            title: "Faza 4: Wątek komisarzy i nadejście \"Trucizny\"",
            events: [
                "[cite_start]W międzyczasie komisarz Ali, po zawirowaniach związanych z ucieczką Duygu (spowodowaną jej bezpłodnością), odnajduje ją i wybacza jej kłamstwa[cite: 1506, 1511, 1831].",
                "[cite_start]Wątek Alego na komendzie przejmuje tajemniczy komisarz Ercan, który okazuje się działającym pod przykrywką Feritem[cite: 1488].",
                "[cite_start]Miejsce Duygu zajmuje Ayse, która w przeszłości była żoną Ferita[cite: 1490, 1491].",
                "[cite_start]Ferit próbuje odzyskać Ayse, nie wiedząc początkowo, że wychowywana przez nią Doga jest jego biologiczną córką[cite: 730, 1473].",
                "[cite_start]Obecny mąż Ayse, Koray, stale knuje intrygi i fałszuje wyniki testów DNA, aby prawda nie wyszła na jaw[cite: 427, 428, 640].",
                "[cite_start]W głównym wątku pojawia się potężny i bezwzględny wróg – Trucizna (ukrywający się początkowo pod tożsamością biznesmena Acara Tuncy), który atakuje rezydencję i sprawia, że Yusuf znika[cite: 36, 37, 130].",
                "[cite_start]Sześć miesięcy później Nana i Yusuf żyją w skrajnej biedzie na ulicy, a Trucizna wysyła ich tropem płatnego mordercę[cite: 10, 11, 13].",
                "[cite_start]Zdesperowany Yaman współpracuje z policją i śledzi uciekającego Truciznę, by wreszcie odzyskać bratanka[cite: 16]."
            ]
        }
    ];

    const timelineContainer = document.getElementById('timeline-container');

    // Function to clean the text from AI citation artifacts [cite_start] and [cite: ...]
    function cleanText(text) {
        return text.replace(/\[cite_start\]/g, "")
                   .replace(/\[cite:\s*[\d,\s]+\]/g, "");
    }

    // Generate HTML for the timeline
    phasesData.forEach((phase, index) => {
        // Create Phase Section
        const phaseSection = document.createElement('section');
        phaseSection.className = 'phase-section animate-hidden-right';
        phaseSection.style.transitionDelay = `${index * 0.1}s`;

        // Create Phase Header
        const phaseHeader = document.createElement('div');
        phaseHeader.className = 'phase-header';
        
        const phaseTitle = document.createElement('h2');
        phaseTitle.className = 'phase-title';
        phaseTitle.textContent = phase.title;
        
        phaseHeader.appendChild(phaseTitle);
        phaseSection.appendChild(phaseHeader);

        // Create Events Grid
        const eventsGrid = document.createElement('div');
        eventsGrid.className = 'events-grid';

        phase.events.forEach((eventRaw, evIndex) => {
            const cleanMessage = cleanText(eventRaw);
            
            const eventCard = document.createElement('div');
            eventCard.className = 'event-card animate-hidden-up';
            // Slight staggering
            eventCard.style.transitionDelay = `${evIndex * 0.05}s`;
            
            const eventText = document.createElement('p');
            eventText.className = 'event-text';
            eventText.textContent = cleanMessage;

            eventCard.appendChild(eventText);
            eventsGrid.appendChild(eventCard);
        });

        phaseSection.appendChild(eventsGrid);
        timelineContainer.appendChild(phaseSection);
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-visible');
                // Optional: unobserve after animating once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animate-hidden elements
    const elementsToAnimate = document.querySelectorAll('.animate-hidden-up, .animate-hidden-right');
    elementsToAnimate.forEach(el => scrollObserver.observe(el));
});
