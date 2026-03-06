
      (function () {
        /* ---------- CSS ---------- */
        const style = document.createElement("style");
        style.textContent = `
    :root{
      --mh-primary: #04724D;
      --mh-secondary: #EAECE6;
      --mh-text: #2A2F2D;
      --mh-lightblue: #E7EDF5;
      --mh-icon: #B9C4D4;
      --mh-yellow: #F9F1E1;      
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    }

    .mh-chat-fab{
      position: fixed;
      right: 20px;
      bottom: 20px;
      width: 64px;
      height: 64px;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      background: var(--mh-primary);
      box-shadow: rgba(0, 0, 0, 0.4) 0px 30px 90px;
      display: grid;
      place-items: center;
      z-index: 9999;
    }

    .mh-chat-fab svg{
      fill: white;
      width: 48px;
      height: 48px;
    }

    .mh-chat-panel{
      position: fixed;
      right: 20px;
      bottom: 100px;
      width: 360px;
      height: 700px;
      background: white;
      border: 1px solid #ddd;
      border-radius: 10px;
      box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
      display: none;
      z-index: 9999;
      padding: 10px;
      color: var(--mh-text);

      
      overflow-y: auto;   /* scrollbart */
    }

    .mh-header-widget{
      display: -webkit-box;
      background: var(--mh-primary);
      padding: 3px;
      border-radius: 8px 8px 0 0;
      margin: -10px -10px 0px -10px;
    }
    .mh-chat-panel select{
      width: 100%;
      border-radius: 4px;
      background: #fff;
      padding: 8px;
      border-radius: 8px;
      border: 2px solid var(--mh-secondary);
      box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
    }
    .mh-submit{
      display: block;
      margin-top: 12px;
      width: 100%;
      background: #9FC7B8; /* dus grønn */
      color: white;
      border: none;
      border-radius: 10px;
      padding: 10px;
      font-size: 16px;
      cursor: not-allowed;
      font-weight: bold;
      transition: background 0.2s ease;
    }

    .mh-submit.active{
      background: var(--mh-primary); /* sterk grønn */
      cursor: pointer;
    }
    .img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      margin-top: 2px;
      margin-bottom: 2px;
    }
     
    .mh-header-text {
      font-size: 1.25rem;
      padding-left: 10px;
      font-weight: bold;
      color: white;
    }
    .mh-box{
      background: white;
      justify-content: space-between;
      border-radius: 10px;
      margin-left: 10px;
      margin-right: 10px;
    }
    .mh-label-text{
      font-weight: bold;
      font-size: 0.9rem;
      margin-bottom: 1px;
    }
    .mh-welcome{
      font-weight: bold;
      margin-top: 20px;
      padding: 20px;
    }
    .mh-box-center{
      display: flex;
      font-size: 1.15rem;
      justify-content: center;
    }
    .mh-welcome-text{
      text-align: center;
      font-size: 1.15rem;
      margin-bottom: 1px;
    }
    .mh-chat-info{
      text-align: center;
      margin-top: 4px;
      font-size: 0.9rem;
      margin-bottom: 1px;
    }
    .mh-box-blue{
      padding-bottom: 5px;
      padding-top: 10px;
      border-radius: 10px;
      margin-left: 10px;
      margin-right: 10px;
      background: linear-gradient(180deg, #F3F6F4 0%, #E6ECE8 100%);

      /* svak ytterkant */
      border: 1px solid #D2DAD5;

      /* litt “shine” inni + lett løft */
      box-shadow:
        inset 0 1px 0 rgba(255,255,255,0.8),
        0 1px 2px rgba(0,0,0,0.06);
      }
        
      .mh-box-blue input[type="checkbox"]{
        accent-color: var(--mh-primary);
        width: 16px;
        height: 16px;
        margin-left: -4;
      }
    .mh-box-yellow{
      padding: 6px;
      background: var(--mh-yellow);
      border-radius: 10px;
      margin-left: 10px;
      margin-right: 10px;
      box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
      color: var(--mh-text);
      display: flex;
      align-items: center;
    }
    .mh-gdpr-text{
      font-size: 0.85rem;
      font-weight: 600;
      margin-left: 10px;
    }
    .mh-gdpr-label{
      font-size: 0.85rem;
      font-weight: 600;   
    }
    .mh-text-info{
      font-size: 0.85rem;
      margin-left: 10px;
      font-family: inherit;
    }
    .mh-text-info2{
      font-size: 0.85rem;
      font-family: inherit;
    }
    .mh-text-bold{
      font-weight: bold;
      font-size: 0.85rem;
    }
      select,
      option {
      font-size: 0.85rem;
      font-family: inherit;
      margin-bottom: 10px;
    }
    .mh-box-border{
      display: flex;
      flex-direction: row;
      padding: 8px;
      border: 1px solid var(--mh-secondary);
      border-radius: 10px;
      margin: 8px;
    }
    .mh-icon-info{
      width: 30px;
      height: 30px;
      fill: var(--mh-primary);
    }
    .mh-bg {
      fill: var(--mh-primary); /* eller ønsket farge */
    }

    .mh-symbol {
      fill: var(--mh-text);
    }

    .mh-icon-alert {
      margin-top: 10px;
      margin-left: 10px;
      width: 30px;
      height: 30px;
    }
    .mh-box-border-blue{
      display: flex;
      flex-direction: row;
      padding: 8px;
      border: 1px solid var(--mh-primary);
      border-radius: 10px;
      margin: 10px;
      background: var(--mh-secondary);
      }
      /* Standard størrelse + farger via CSS-variabler */
    .icon-warning{
      width:30px;
      height: 30px;
      display: inline-block;
    }
    .icon-warning{
      --warn-bg: #f5b400;  /* gul */
      --warn-fg: #ffffff;  /* hvit */
    }
    .icon-warning__bg{
      fill: var(--warn-bg);
    }
    .icon-warning__mark{
      fill: var(--warn-fg);
    }
    .mh-accordion{ 
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    }

    .mh-accordion-btn{
      width: 100%;
      display: flex;
      align-items: center;
      gap: 12px;

      padding: 10px 5px;
      border-radius: 10px;

      background: rgba(255,255,255,0.75);
      color: var(--mh-text);
      border: 1px solid rgba(46,69,110,0.18);
      box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
      
      cursor: pointer;
      text-align: left;

      appearance: none;
      -webkit-appearance: none;
      font-family: inherit;
    }

    .mh-chevron{
      width: 20px;
      height: 20px;
      flex: 0 0 auto;
      margin-left: 25px;
      transition: transform .18s ease;
    }

          /* når den er åpnet */
    .mh-accordion-btn[aria-expanded="true"] .mh-chevron{
      transform: rotate(180deg);
    }

    .mh-accordion-panel{
      margin-top: 10px;
    }

    .mh-scrollbox{
      max-height: 180px;       /* <- scroll høyde */
      overflow: auto;
      padding: 12px 14px;

      border-radius: 14px;
      background: rgba(255,255,255,0.65);
      border: 1px solid rgba(46,69,110,0.14);

      color: var(--mh-text);
      font-size: 13px;
      line-height: 1.45;
      }
      .mh-link-info{
            text-decoration: none;
            color: var(--mh-primary);
          }
      /* ✅ KUN MOBIL-OVERRIDE */
    @media (max-width: 480px){
    .mh-chat-panel{
      right: 0;
      bottom: 75;
      width: auto;
      height: auto;
      border-radius: 0;
      max-width: none;
      overflow-y: auto;  
      max-height: 100vh;
      -webkit-overflow-scrolling: touch;
      overflow-x: hidden;
      }
      .mh-scrollbox{
      max-height: 100px; 
    }


 
  `;
        document.head.appendChild(style);

        /* ---------- HTML ---------- */
        const wrapper = document.createElement("div");
        wrapper.innerHTML = `
    <button class="mh-chat-fab" aria-label="Åpne chat">
      <svg viewBox="0 0 24 24">
        <path d="M4 5H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9l-4 3v-3H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z"/>
      </svg>
    </button>

    <form class="mh-chat-panel">
      <div class="mh-header-widget">
        <img src = "https://mentalhelse.no/content/themes/mentalhelse-theme/assets/logo/fav/apple-touch-icon.png" alt = "logo" class="img">
        <p class = "mh-header-text">Arbeidslivstelefonen</p>
      </div>

      <div class ="mh-box-center">
      <p class ="mh-welcome-text">Velkommen til Arbeidslivstelefonen</p>
      </div>
      <div class ="mh-box-center">
      <p class="mh-chat-closed" id="mh-closed-message" style="display:none; color:#B00020; text-align:center; font-size: 0.75rem;">
      Chatten er stengt akkurat nå.
      Åpningstid: Man–Ons & Fre 08:30–16:00, Torsdag 08:30–18:00.
      </p>
      </div>

      <div class="mh-box">
      <label class="mh-label-text">Kjønn</label>
        <select id="mh-gender">
          <option value="">Velg kjønn</option>
          <option>Kvinne</option>
          <option>Mann</option>
          <option>Hen</option>
        </select>

      <label class="mh-label-text">Alder</label>
        <select id="mh-age">
          <option value="">Velg alder</option>
          <option>Under 9</option>
          <option>10–14</option>
          <option>15–19</option>
          <option>20–24</option>
          <option>25–29</option>
          <option>30–39</option>
          <option>40–49</option>
          <option>Over 50 år </option>
        </select>  

      <label class="mh-label-text">Fylke</label>
        <select id="mh-county">
          <option value="">Velg fylke</option>
          <option>Agder</option>
          <option>Akershus</option>
          <option>Buskerud</option>
          <option>Finnmark</option>
          <option>Innlandet</option>
          <option>Møre og Romsdal</option>
          <option>Nordland</option>
          <option>Oslo</option>
          <option>Rogaland</option>
          <option>Telemark</option>
          <option>Troms</option>
          <option>Trøndelag</option>
          <option>Vestfold</option>
          <option>Vestland</option>
          <option>Østfold</option>
          <option>Utlandet</option>
        </select>
      </div>

      <p class="mh-text-info"> Før vi fortsetter, trenger vi ditt samtykke til vilkårene til hjelpetjenesten </p>

      <div class="mh-box-blue"> 
        <label class ="mh-text-info">
          <input type="checkbox" id="mh-gdpr"><strong> Jeg har lest og samtykker til betingelsene </strong>
        </label>
        <p class="mh-text-info"><a href="https://mentalhelse.no/personvernerklaering/" class="mh-link-info" target="_blank" rel="noopener"><strong>Les mer </strong></a> om våre betingelser</p>
      </div>
      
      <div class="mh-accordion">
        <button type="button"
          class="mh-accordion-btn"
          data-action="toggle-privacy"
          aria-expanded="false"
          aria-controls="mhPrivacyPanel">
          <svg class="mh-icon-info" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2
                a10 10 0 1 1 0 20
                a10 10 0 1 1 0 -20z" />
            <path d="M12 7.5
                a1 1 0 1 1 0 2
                a1 1 0 1 1 0 -2z
                M11 11h2v6h-2z"
              fill="#ffffff"/>
            </svg>
        <span><p class="mh-text-info2">Avvergingsplikt og personvern </p></span>
          <svg class="mh-chevron" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2.5"
                  stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <div id="mhPrivacyPanel" class="mh-accordion-panel" hidden>
          <div class="mh-scrollbox">
            <p class="mh-text-info">
              Alle ansatte som besvarer chattesamtaler hos Mental Helse har taushetsplikt. Det betyr at vi ikke har lov å fortelle det du sier til oss til noen andre. Men dersom vi får inn spørsmål eller kommentarer som gjør at vi tror det kan være fare for ditt liv eller helse, må vi følge avvergingsplikten og melde fra til politiet. I slike tilfeller går avvergingsplikten foran taushetsplikten.
            </p>
            <p class="mh-text-info">
              Når vi benytter oss av avvergingsplikten så har vi anledning til å hente ut IP-adressen og gi den til politiet. Dette gjør vi kun ved fare for liv og helse.
            </p>
          </div>
        </div>
      </div>

      <div class ="mh-box-yellow">
        <svg class="icon-warning" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
          <!-- Bakgrunn (triangel) -->
          <path class="icon-warning__bg"
                d="M12 3.2c.45 0 .87.24 1.1.64l8.7 15.1c.45.79-.12 1.76-1.02 1.76H3.22c-.9 0-1.47-.97-1.02-1.76l8.7-15.1c.23-.4.65-.64 1.1-.64z"/>

          <!-- Utropstegn -->
          <rect class="icon-warning__mark" x="11" y="8" width="2" height="7" rx="1"/>
          <circle class="icon-warning__mark" cx="12" cy="17.5" r="1.2"/>
        </svg>
        <p class="mh-text-info"><strong>Ved akutt fare:</strong> Ring 113 eller kontakt legevakt (116117).</p>
      </div>

      <button class="mh-submit" type="submit">Start chat</button>
    </form>
  `;
        document.body.appendChild(wrapper);

        /* ---------- LOGIKK ---------- */
        const btn = wrapper.querySelector(".mh-chat-fab");
        const panel = wrapper.querySelector(".mh-chat-panel");
        const submit = wrapper.querySelector(".mh-submit");

        const county = wrapper.querySelector("#mh-county");
        const gender = wrapper.querySelector("#mh-gender");
        const age = wrapper.querySelector("#mh-age");
        const gdpr = wrapper.querySelector("#mh-gdpr");

        //deklarerer chat event
        var zissonWebChatEvent = "zissonWebChat";
        var zissonWebChat = window[zissonWebChatEvent];
        const closedMessage = wrapper.querySelector("#mh-closed-message");
        // Accordion: Avvergingsplikt og personvern
        const privacyBtn = wrapper.querySelector(
          '[data-action="toggle-privacy"]',
        );
        const privacyPanel = wrapper.querySelector("#mhPrivacyPanel");

        function setAccordion(open) {
          privacyBtn.setAttribute("aria-expanded", String(open));
          privacyPanel.hidden = !open;

          privacyBtn.classList.toggle("is-open", open);

          if (open) {
            privacyPanel.scrollIntoView({
              block: "nearest",
              behavior: "smooth",
            });
          }
        }

        if (privacyBtn && privacyPanel) {
          privacyBtn.addEventListener("click", () => {
            const isOpen = privacyBtn.getAttribute("aria-expanded") === "true";
            setAccordion(!isOpen);
          });
        }

        function restorePreChatUI() {
          // Vis FAB + panel-UI igjen
          wrapper.style.display = "block";

          // Lukk panelet
          panel.style.display = "none";

          // Reset felter + knapp-state
          panel.reset();
          closedMessage.style.display = "none"; //
          update(); // oppdater disabled
        }
        let conversationEndListenerAttached = false;

        function attachConversationEndedListener() {
          if (conversationEndListenerAttached) return;
          conversationEndListenerAttached = true;

          // Sjekker om samtale har endt
          window.addEventListener("zConversationEnded", (ev) => {
            console.log("zConversationEnded", ev);
            restorePreChatUI();
          });
        }
        //Loader før man begynner med chatteboblen
        function ensureZissonLoaded() {
          if (window.zissonWebChat) return;

          if (eksternChatLoaded) return;
          eksternChatLoaded = true;

          const script = document.createElement("script");
          script.type = "text/javascript";
          script.setAttribute(
            "data-jwt",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcklkIjoiNzM2IiwiY3VzdG9tZXJHdWlkIjoiYWE3NWE3N2ItODgyNi00YjBhLWE3N2YtM2JiNTBiYTQxZTkxIiwiZW50cnlQb2ludEd1aWQiOiJmZWJkNTQyMC1hYTgyLTQwN2YtOTNjZS1iM2Y2YjE3M2RiNjIiLCJuYmYiOjE3NzIwMDk0NzgsImV4cCI6MTkyOTc3NTg3OCwiaWF0IjoxNzcyMDA5NDc4LCJpc3MiOiJ6aXNzb24iLCJhdWQiOiJ3YXZlQ2hhdCJ9.1Kgqc0imFtIe12D_bhBfZs78qKrPqsxmY9rlHCMbSa0",
          );
          script.src = "https://chat2.zisson.com/bootstrapper.js";

          document.body.appendChild(script);
        }
        const isValid = () =>
          county.value && gender.value && age.value && gdpr.checked;

        const update = () => {
          const valid = isValid();

          submit.disabled = !valid;

          if (valid) {
            submit.classList.add("active");
          } else {
            submit.classList.remove("active");
          }
        };

        update();

        btn.onclick = () => {
          const open = panel.style.display === "block";
          panel.style.display = open ? "none" : "block";

          if (!open) {
            ensureZissonLoaded(); // <-- LAST SCRIPT HER
          }

          if (open) {
            panel.reset();
            update();
          } else {
            update();
          }
        };

        window.addEventListener("zissonWebChat", () => {
          const api = window.zissonWebChat;
          if (!api) return;

          const isOpen = api.isOpen;
          const available = api.agentsAreAvailable;

          console.log("isOpen:", isOpen);
          console.log("available:", available);

          if (!available) {
            closedMessage.style.display = "block";
            submit.style.display = "none";
          } else {
            closedMessage.style.display = "none";
            submit.style.display = "block";
          }
        });
        // Test om dette funker - inn med chat
        let eksternChatLoaded = false;

        function startEksternChat(inputDefaults) {
          function run() {
            if (!window.zissonWebChat) return;

            attachConversationEndedListener();

            window.zissonWebChat.setDefaults(inputDefaults);
            window.zissonWebChat.openWidget?.();
            window.zissonWebChat.startConversation?.();
          }

          // API er allerede klar
          if (window.zissonWebChat) {
            run();
            return;
          }

          // Vent til API blir klar
          window.addEventListener("zissonWebChat", run, { once: true });

          // Last script bare én gang
          if (eksternChatLoaded) return;
          eksternChatLoaded = true;

          const script = document.createElement("script");
          script.type = "text/javascript";
          script.setAttribute(
            "data-jwt",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcklkIjoiNzM2IiwiY3VzdG9tZXJHdWlkIjoiYWE3NWE3N2ItODgyNi00YjBhLWE3N2YtM2JiNTBiYTQxZTkxIiwiZW50cnlQb2ludEd1aWQiOiJiYjE2OTk3MS1lNmNiLTQzNDAtYmY5YS03M2VlYzgwN2YzNjAiLCJuYmYiOjE3NjM0NTIzODUsImV4cCI6MTkyMTIxODc4NSwiaWF0IjoxNzYzNDUyMzg1LCJpc3MiOiJ6aXNzb24iLCJhdWQiOiJ3YXZlQ2hhdCJ9.tzOYuMcrK25rEAovnNYsK6kLLUh_Gai6qDvw9dCBfjs",
          );
          script.src = "https://chat2.zisson.com/bootstrapper.js";
          document.body.appendChild(script);
        }

        [county, gender, age].forEach((el) =>
          el.addEventListener("change", update),
        );
        gdpr.addEventListener("change", update);

        panel.onsubmit = function (e) {
          e.preventDefault();
          if (!isValid()) return;

          startEksternChat({
            fylke: county.value,
            alder: age.value,
            kjonn: gender.value,
          });

          panel.style.display = "none";

          console.log({
            county: county.value,
            gender: gender.value,
            age: age.value,
          });

          wrapper.style.display = "none";
          //btn.style.display = "none";
          panel.reset();
          update();
        };
      })();
