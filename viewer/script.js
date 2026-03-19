document.addEventListener('DOMContentLoaded', () => {
    
    // The data mapping events to episode numbers
    const phasesData = [
        {
            title: "Faza 1: Ucieczka, poszukiwanie prawdy i intrygi Canan",
            events: [
                { text: "Po postrzeleniu Yamana, zdesperowana Seher ucieka z Yusufem i żyją w biedzie, walcząc o przetrwanie.", episodes: [282, 285] },
                { text: "Yaman ich odnajduje i zmusza do powrotu, jednak Seher nienawidzi go, myśląc, że jest mordercą jej siostry.", episodes: [289, 304] },
                { text: "Wkrótce wychodzi na jaw, że Yaman jest niewinny, a za śmierć Kevser odpowiada Ikbal oraz sfałszowany przez lekarkę raport.", episodes: [310, 312] },
                { text: "W życiu Yamana pojawia się jego matka, Canan, która potajemnie współpracuje z lekarzem i fałszuje historię swojej choroby, by wzbudzić litość i przejąć majątek syna.", episodes: [333, 347] },
                { text: "Zła kobieta posuwa się do tego, że podaje Yamanowi truciznę niszczącą jego wątrobę.", episodes: [385, 389] },
                { text: "Dzięki nagraniom od Seher intryga wychodzi na jaw, a Yaman zamyka matkę w kotłowni.", episodes: [436, 436] },
                { text: "Jakiś czas później Canan ginie w wyniku szamotaniny z Keremem.", episodes: [444, 444] }
            ]
        },
        {
            title: "Faza 2: Utrata pamięci, nowi wrogowie i tragiczny finał Seher",
            events: [
                { text: "Zuhal po wielu okrutnych intrygach ginie, spadając ze schodów z nożem wbitym w pierś podczas ostatecznej próby zamordowania Seher i Yamana.", episodes: [537, 537] },
                { text: "Seher traci pamięć, a w jej odzyskaniu pomaga jej doktor Aziz, który wkrótce okazuje się bratem nowego, potężnego wroga Yamana – Idrisa.", episodes: [475, 559] },
                { text: "Mimo przeciwności, Seher i Yaman zbliżają się do siebie na nowo i planują wziąć podwójny ślub razem z Ziyą i Çicek.", episodes: [561, 564] },
                { text: "Idris swoimi manipulacjami doprowadza do śmierci Aziza i o mały włos nie niszczy rodziny Kyrymly.", episodes: [565, 565] },
                { text: "Sielanka nie trwa długo, gdyż Nedim przynosi Yamanowi tragiczne wieści o Seher, co brutalnie kończy jej wątek w serialu.", episodes: [565, 565] }
            ]
        },
        {
            title: "Faza 3: Pojawienie się Nany, zemsta i zdrada Nedima",
            events: [
                { text: "Trzy miesiące po dramatycznych wydarzeniach Yusuf, z powodu traumy, przestaje mówić.", episodes: [566, 566] },
                { text: "W rezydencji pojawia się Nana, siostra Aziza, która w tajemnicy pragnie pomścić brata, wierząc, że zabił go Yaman.", episodes: [566, 566] },
                { text: "Nana zostaje guwernantką Yusufa, dzięki czemu chłopiec powoli odzyskuje mowę.", episodes: [571, 571] },
                { text: "Kobieta waha się przed zabiciem Yamana, a z czasem dowiaduje się od Halita, że prawdziwym mordercą her brata był Idris.", episodes: [574, 640] },
                { text: "Podczas ostatecznego starcia z Yamanem, Idris ginie pod kołami samochodu.", episodes: [654, 654] },
                { text: "Nedim z powodu chorobliwej miłości do Nany zdradza Yamana, próbuje go wrobić i ostatecznie aranżuje wybuch jego samochodu.", episodes: [712, 712] },
                { text: "Yaman jednak przeżywa ten zamach i działa w ukryciu.", episodes: [714, 714] },
                { text: "Gdy Nedim porywa Nanę i szantażuje Yamana, ostatecznie traci równowagę i spada w przepaść.", episodes: [802, 802] },
                { text: "Nana i Yaman wyznają sobie miłość i oficjalnie się zaręczają.", episodes: [827, 830] }
            ]
        },
        {
            title: "Faza 4: Wątek komisarzy i nadejście \"Trucizny\"",
            events: [
                { text: "W międzyczasie komisarz Ali, po zawirowaniach związanych z ucieczką Duygu (spowodowaną diagnozą o bezpłodności), odnajduje ją i wybacza jej kłamstwa.", episodes: [565, 605] },
                { text: "Wątek Alego na komendzie przejmuje tajemniczy komisarz Ercan, który okazuje się działającym pod przykrywką Feritem.", episodes: [608, 608] },
                { text: "Miejsce Duygu zajmuje Ayse, która w przeszłości była żoną Ferita.", episodes: [608, 608] },
                { text: "Ferit próbuje odzyskać Ayse, nie wiedząc początkowo, że wychowywana przez nią Doga jest jego biologiczną córką.", episodes: [610, 613] },
                { text: "Obecny mąż Ayse, Koray, stale knuje intrygi i fałszuje wyniki testów DNA, aby prawda nie wyszła na jaw.", episodes: [613, 780] },
                { text: "W głównym wątku pojawia się potężny i bezwzględny wróg – Trucizna, ukrywający się pod tożsamością biznesmena Acara Tuncy, który atakuje rezydencję i sprawia, że Yusuf znika.", episodes: [831, 853] },
                { text: "Sześć miesięcy później Nana i Yusuf żyją w skrajnej biedzie na ulicy, a Trucizna wysyła ich tropem płatnego mordercę.", episodes: [863, 864] },
                { text: "Zdesperowany Yaman współpracuje z policją i śledzi uciekającego Truciznę, by wreszcie odzyskać bratanka.", episodes: [861, 861] }
            ]
        }
    ];

    const timelineContainer = document.getElementById('timeline-container');
    const episodeTimeline = document.getElementById('episode-timeline');

    // Generate Full List of Episodes in the Right Sidebar
    const minEp = 282;
    const maxEp = 865;
    
    // Use a Set to store only the start and end of each range
    const boundaryEpisodes = new Set();
    phasesData.forEach(p => p.events.forEach(e => {
        boundaryEpisodes.add(e.episodes[0]);
        boundaryEpisodes.add(e.episodes[1]);
    }));

    // Convert Set to sorted array
    const sortedBoundaries = Array.from(boundaryEpisodes).sort((a, b) => a - b);

    // Create side timeline with only boundary episodes
    sortedBoundaries.forEach(ep => {
        const epMarker = document.createElement('div');
        epMarker.className = 'ep-marker highlighted';
        epMarker.id = `ep-${ep}`;
        epMarker.textContent = ep;
        episodeTimeline.appendChild(epMarker);
    });

    // Generate HTML for the timeline
    phasesData.forEach((phase, index) => {
        const phaseSection = document.createElement('section');
        phaseSection.className = 'phase-section animate-hidden-right';
        phaseSection.style.transitionDelay = `${index * 0.1}s`;

        const phaseHeader = document.createElement('div');
        phaseHeader.className = 'phase-header';
        
        const phaseTitle = document.createElement('h2');
        phaseTitle.className = 'phase-title';
        phaseTitle.textContent = phase.title;
        
        phaseHeader.appendChild(phaseTitle);
        phaseSection.appendChild(phaseHeader);

        const eventsGrid = document.createElement('div');
        eventsGrid.className = 'events-grid';

        phase.events.forEach((event, evIndex) => {
            const eventCard = document.createElement('div');
            eventCard.className = 'event-card animate-hidden-up';
            eventCard.style.transitionDelay = `${evIndex * 0.05}s`;
            
            const eventText = document.createElement('p');
            eventText.className = 'event-text';
            eventText.textContent = event.text;

            const epTag = document.createElement('span');
            epTag.className = 'ep-tag';
            epTag.textContent = event.episodes[0] === event.episodes[1] ? 
                `Odc. ${event.episodes[0]}` : 
                `Odc. ${event.episodes[0]}-${event.episodes[1]}`;

            eventCard.appendChild(epTag);
            eventCard.appendChild(eventText);
            
            // Interaction: Hover over card highlights markers
            eventCard.addEventListener('mouseenter', () => {
                for (let i = event.episodes[0]; i <= event.episodes[1]; i++) {
                    const marker = document.getElementById(`ep-${i}`);
                    if (marker) marker.classList.add('glowing');
                }
            });

            eventCard.addEventListener('mouseleave', () => {
                for (let i = event.episodes[0]; i <= event.episodes[1]; i++) {
                    const marker = document.getElementById(`ep-${i}`);
                    if (marker) marker.classList.remove('glowing');
                }
            });

            eventsGrid.appendChild(eventCard);
        });

        phaseSection.appendChild(eventsGrid);
        timelineContainer.appendChild(phaseSection);
    });

    const observerOptions = {
        threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-hidden-up, .animate-hidden-right').forEach(el => scrollObserver.observe(el));
});
