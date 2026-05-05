      /**
       * @author Mie Rønningen
       * @version 1.0
       * @description HC-CHAT
       * Widget for Hjelpechat - Zisson
       */
      (() => {
        const CONFIG = {
          zissonScriptSrc: "https://chat2.zisson.com/bootstrapper.js",
          zissonJwt:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcklkIjoiNzM2IiwiY3VzdG9tZXJHdWlkIjoiYWE3NWE3N2ItODgyNi00YjBhLWE3N2YtM2JiNTBiYTQxZTkxIiwiZW50cnlQb2ludEd1aWQiOiJiYjE2OTk3MS1lNmNiLTQzNDAtYmY5YS03M2VlYzgwN2YzNjAiLCJuYmYiOjE3NjM0NTIzODUsImV4cCI6MTkyMTIxODc4NSwiaWF0IjoxNzYzNDUyMzg1LCJpc3MiOiJ6aXNzb24iLCJhdWQiOiJ3YXZlQ2hhdCJ9.tzOYuMcrK25rEAovnNYsK6kLLUh_Gai6qDvw9dCBfjs",
          readyTimeoutMs: 10000,
          readyPollMs: 150,
          availabilityRetries: 8,
          availabilityRetryDelayMs: 350,
          startReloadDelayMs: 700,
          startConversationDelayMs: 500,
        };

        const state = {
          zissonReadyPromise: null,
          externalChatLoaded: false,
          chatAvailable: false,
          isStartingChat: false,
          hasActiveConversation: false,
          conversationEndedByUser: false,
          conversationEndListenerAttached: false,
          isPanelOpen: false,
        };

        injectStyles();

        const closeBtn = createCloseButton();
        const wrapper = createWidget();
        document.body.appendChild(closeBtn);
        document.body.appendChild(wrapper);

        const elements = {
          button: wrapper.querySelector(".mh-chat-fab"),
          panel: wrapper.querySelector(".mh-chat-panel"),
          submit: wrapper.querySelector(".mh-submit"),
          county: wrapper.querySelector("#mh-county"),
          gender: wrapper.querySelector("#mh-gender"),
          age: wrapper.querySelector("#mh-age"),
          gdpr: wrapper.querySelector("#mh-gdpr"),
          openView: wrapper.querySelector(".mh-open-view"),
          closedView: wrapper.querySelector(".mh-closed-view"),
        };
        const privacyBtn = wrapper.querySelector(
          '[data-action="toggle-privacy"]',
        );
        const privacyPanel = wrapper.querySelector("#mhPrivacyPanel");

        bindEvents(elements, closeBtn, wrapper);
        attachConversationEndedListener();
        updateSubmitState(elements);
        //prewarmZisson();

        function injectStyles() {
          const style = document.createElement("style");
          style.textContent = `
            :root{
              --mh-primary: #205f79;
              --mh-secondary: #EAECE6;
              --mh-text: #2A2F2D;
              --mh-yellow: #F9F1E1;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            }

            body.mh-hide-zisson iframe,
            body.mh-hide-zisson [id*="zisson"],
            body.mh-hide-zisson [class*="zisson"],
            body.mh-hide-zisson [id*="wavechat"],
            body.mh-hide-zisson [class*="wavechat"]{
              opacity: 0 !important;
              visibility: hidden !important;
              pointer-events: none !important;
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
              bottom: 96px;
              width: 370px;
              height: 700px;
              background: white;
              border: 1px solid #ddd;
              border-radius: 10px;
              box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
              display: none;
              z-index: 10000;
              padding: 10px;
              color: var(--mh-text);
              overflow-y: auto;
            }

            .mh-header-widget{
              display: flex;
              align-items: center;
              background: var(--mh-primary);
              padding: 3px;
              border-radius: 8px 8px 0 0;
              margin: -10px -10px 0 -10px;
            }

            .mh-chat-panel select{
              width: 100%;
              background: #fff;
              padding: 8px;
              border-radius: 8px;
              border: 2px solid var(--mh-secondary);
              font-size: 0.85rem;
              font-family: inherit;
            }

            .mh-submit{
              display: block;
              margin-top: 12px;
              width: 100%;
              background: var(--mh-primary);
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
              background: var(--mh-primary);
              cursor: pointer;
            }

            .mh-img{
              width: 40px;
              height: 40px;
              border-radius: 50%;
              margin-top: 2px;
              margin-bottom: 2px;
              margin-left: 5px;
            }

            .mh-header-text{
              font-size: 1.25rem;
              padding-left: 10px;
              font-weight: bold;
              color: white;
            }

            .mh-box{
              background: white;
              border-radius: 10px;
              margin-left: 10px;
              margin-right: 10px;
            }

            .mh-label-text{
              font-weight: bold;
              font-size: 0.9rem;
              margin-bottom: 1px;
              display: block;
            }

            .mh-box-center{
              display: flex;
              justify-content: center;
            }

            .mh-welcome-text{
              text-align: center;
              font-size: 1.15rem;
              margin-bottom: -10px;
              font-weight: bold;
              margin-top: 5px;
            }

            .mh-box-blue{
              padding-bottom: 5px;
              padding-top: 10px;
              padding-right: 10px;
              border-radius: 10px;
              margin-left: 10px;
              margin-right: 10px;
              background: linear-gradient(180deg, #E7F1FB 0%, #E6EBEC 100%);
              border: 1px solid #D2DAD5;
              box-shadow:
                inset 0 1px 0 rgba(255,255,255,0.8),
                0 1px 2px rgba(0,0,0,0.06);
            }

            .mh-box-blue input[type="checkbox"]{
              accent-color: var(--mh-primary);
              width: 16px;
              height: 16px;
              margin-left: 0;
            }
            .mh-box-blue2{
              border-radius: 14px;
              background: #ffecc9;
              border: 1px solid #D2DAD5;

              display: flex;
              flex-direction: row;
              align-items: center;
              padding-left:5px;
              margin-bottom: -4px;
            }

            .mh-text-info{
              font-size: 0.85rem;
              margin-left: 10px;
              font-family: inherit;
              text-align: center;
              line-height: 1.4;
              margin-top: 10px;
            }
            .mh-text-info2{
              font-size: 0.85rem;
              font-family: inherit;
              text-align: center;
              margin-top: -5px;
            }
            .mh-text-info3{
              font-size: 0.85rem;
              margin-left: 10px;
              font-family: inherit;
            }
            .mh-text-bold{
              font-weight: 600;
              font-size: 0.85rem;
              margin-left: 10px;
              font-family: inherit;
            }

            .mh-link-info{
              text-decoration: none;
              color: var(--mh-primary);
            }

            #mh-chat-close{
              display: none;
              place-items: center;
              height: 45px;
              margin-top: 5px;
              border: none;
              background: transparent;
              color: #2A2F2D;
              cursor: pointer;
              z-index: 2147483647;
              transition: background 0.2s ease, color 0.2s ease, transform 0.15s ease;
            }

            #mh-chat-close:hover{
              background: #d32f2f;
              color: #fff;
              transform: scale(1.06);
            }

            .mh-close-icon{
              width: 20px;
              height: 50px;
              display: block;
            }

            .mh-chat-panel.closed{
              background: white;
              color: var(--mh-text);
            }

            .card{
              background: #ffffff;
              border-radius: 18px;
              padding: 24px 20px;
            }

            .title{
              font-size: 1.75rem;
              font-weight: 700;
              line-height: 1.25;
              text-align: left;
              margin-bottom: 24px;
            }

            .section{
              margin-bottom: 24px;
            }

            .section-title{
              font-size: 0.95rem;
              font-weight: 600;
              margin-bottom: 8px;
              color: #1f2a2a;
            }

            .section-text{
              font-size: 1rem;
              line-height: 1.6;
              color: #374444;
            }

            .help-box{
              background: #e8f3ef;
              border-radius: 16px;
              padding: 16px;
              margin-bottom: 24px;
              box-shadow: 0 6px 20px rgba(0,0,0,0.06);
            }

            .help-box p{
              line-height: 1.6;
            }

            .help-main{
              font-size: 1rem;
              font-weight: 600;
              margin-bottom: 8px;
              color: #1f2a2a;
            }

            .help-contact{
              font-size: 1rem;
              color: #1f2a2a;
              margin-bottom: 8px;
            }

            .help-note{
              font-size: 0.92rem;
              color: #5f6b6b;
            }

            .call-button{
              text-decoration: none;
              color: var(--mh-primary);
            }
            .mh-chat-hint{
              position: fixed;
              right: 90px;
              bottom: 22px;
              width: 240px;
              height: 78px;
              z-index: 9998;

              opacity: 0;
              transform: translateY(8px);
              transition: opacity 0.25s ease, transform 0.25s ease;
            }

            .mh-chat-hint.visible{
              opacity: 1;
              transform: translateY(0);
            }

            .mh-chat-hint-bg{
              position: absolute;
              inset: 0;
              width: 100%;
              height: 100%;
              display: block;
            }

            .mh-chat-hint-tail{
              position: absolute;
              right: -10px;
              bottom: 10px;
              width: 18px;
              height: 14px;
              display: block;
            }

            .mh-chat-hint-text{
              position: absolute;
              inset: 0;
              display: flex;
              align-items: center;
              padding: 10px 18px 14px 18px;
              color: white;
              font-size: 14px;
              line-height: 1.5;
              box-sizing: border-box;
            }
            .mh-accordion{ 
              margin-top: 10px;
              margin-bottom: 10px;
            }

            .mh-accordion-btn{
              width: 100%;
              display: flex;
              align-items: center;
              border-radius: 14px;

              background: #eef4ff;
              color: #1e3a8a;
              border: 1px solid rgba(46,69,110,0.18);
              box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
              
              cursor: pointer;
              text-align: left;

              appearance: none;
              -webkit-appearance: none;
              font-family: inherit;
              font-weight: 500;
            }

            .mh-chevron{
              width: 20px;
              height: 20px;
              flex: 0 0 auto;
              margin-left: 130px;
              transition: transform .18s ease;
            }

                  /* når den er åpnet */
            .mh-accordion-btn[aria-expanded="true"] .mh-chevron{
              transform: rotate(180deg);
            }

            .mh-accordion-panel{
              margin-top: 10px;
            }
            .mh-icon-info{
              width: 30px;
              height: 30px;
              fill: var(--mh-primary);
            }
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
            .mh-input-card {
            display: flex;
            align-items: center;
            background: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 16px;
            padding: 1px 10px;
            gap: 12px;
            margin-bottom: 8px;
          }

          .mh-input-icon {
            width: 40px;
            height: 40px;
            background: #eef2ff;
            padding: 8px;
            border-radius: 50%;
            fill: #205f79;
          }

          .mh-input-content {
            flex: 1;
            display: flex;
            flex-direction: column;
          }

          .mh-label-text {
            font-size: 0.75rem;
            color: #6b7280;
            margin-bottom: 2px;
          }

          .mh-input-content select {
            border: none;
            background: transparent;
            font-size: 0.875rem;
            font-weight: 500;
            outline: none;
          }

          .mh-input-arrow {
            font-size: 14px;
            color: #6b7280;
          }
            .mh-consent-card {
            background: #f9fafb;
            border: 1px solid #dbe3ea;
            border-radius: 14px;
            padding: 8px 10px;
            display: flex;
            flex-direction: column;
            gap: 1px; /* mindre spacing */
          }

          /* Checkbox + tekst */
          .mh-consent-row {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 0.875rem;
            font-weight: 600;
            color: #1f2937;
            cursor: pointer;
          }

          /* Checkbox styling */
          .mh-consent-row input {
            width: 18px;
            height: 18px;
            cursor: pointer;
          }

          /* Les mer */
          .mh-consent-link {
            font-size: 0.875rem;
            color: #1e3a8a;
            text-decoration: none;
            padding-left: 5px;
          }

          .mh-consent-link:hover {
            text-decoration: underline;
          }
            .mh-info-box {
            background: #eef4ff;
            border: 1px solid #dbeafe;
            border-radius: 16px;
            position: relative;

            padding: 2px 10px;
            margin-bottom: 8px;
          }

          /* hovedlinje */
          .mh-info-main {
            font-size: 0.85rem;
            font-weight: 600;
            color: #1e3a8a;
            margin:0 0 3px 0;
            margin-bottom: -3px;
          }

          /* sekundær tekst */
          .mh-info-sub {
            font-size: 13px;
            color: #374151;
            margin: 0;
            line-height: 1.4;
          }

            @media (max-width: 480px){
              .mh-chat-panel{
                right: 16px;
                left: 16px;
                bottom: 40px;
                width: auto;
                height: auto;
                border-radius: 10px;
                max-width: none;
                overflow-y: auto;
                max-height: 100vh;
                -webkit-overflow-scrolling: touch;
                overflow-x: hidden;
              }
                .mh-chat-fab{
                  bottom: 5px;
                }
                .mh-chevron{
              margin-left: 120px;
            }
            .mh-header-widget {
            padding: 0px;
            }
            }
          `;

          document.head.appendChild(style);
        }

        function createCloseButton() {
          const button = document.createElement("button");
          button.className = "mh-chat-close";
          button.id = "mh-chat-close";
          button.type = "button";
          button.setAttribute("aria-label", "Lukk chat");
          button.innerHTML = `
            <svg viewBox="0 0 24 24" aria-hidden="true" class="mh-close-icon">
              <path
                d="M6 6L18 18M18 6L6 18"
                fill="none"
                stroke="currentColor"
                stroke-width="2.4"
                stroke-linecap="round"
              />
            </svg>
          `;
          return button;
        }

        function createWidget() {
          const wrapper = document.createElement("div");
          wrapper.innerHTML = `
            <button class="mh-chat-fab" aria-label="Åpne chat" type="button">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 5H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9l-4 3v-3H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z"/>
              </svg>
            </button>
             <div class="mh-chat-hint">
              <svg
                class="mh-chat-hint-bg"
                viewBox="0 0 240 78"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <rect x="0" y="0" width="240" height="78" rx="16" ry="16" fill="#205f79" />
              </svg>

              <svg
                class="mh-chat-hint-tail"
                viewBox="0 0 18 14"
                aria-hidden="true"
              >
                <polygon points="0,0 18,7 0,14" fill="#205f79" />
              </svg>

              <div class="mh-chat-hint-text">
                Hei, her kan du chatte med oss direkte.
              </div>
            </div>
            <form class="mh-chat-panel">
              <div class="mh-header-widget">
                <img
                  src="https://mentalhelse.no/content/themes/mentalhelse-theme/assets/logo/fav/apple-touch-icon.png"
                  alt="Mental Helse logo"
                  class="mh-img"
                />
                <p class="mh-header-text">Mental Helse chat</p>
              </div>

              <div class="mh-open-view">
                <div class="mh-box-center">
                  <p class="mh-welcome-text">Her kan du chatte med oss</p>
                </div>
                <div class="mh-box-center">
                <p class="mh-text-info">
                  Du kan skrive til oss om det du ønsker. Vi er her for deg hele døgnet. Du kan chatte med oss opptil to ganger i døgnet. 
                </p>  
                </div>
          <div class="mh-info-box">
            <p class="mh-info-main">
              Du er anonym når du chatter.
            </p>

            <p class="mh-info-sub">
              For å gi deg best mulig støtte, trenger vi litt informasjon om deg. 
              Vi lagrer noen opplysninger med ditt samtykke.
            </p>

          </div>
          <div class="mh-input-card">
          
          <div class="mh-input-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M432 64C414.3 64 400 49.7 400 32C400 14.3 414.3 0 432 0L544 0C561.7 0 576 14.3 576 32L576 144C576 161.7 561.7 176 544 176C526.3 176 512 161.7 512 144L512 109.3L449 172.3C468.5 200.7 480 235 480 272.1C480 358.4 417.9 430.2 336 445.2L336 480.1L368 480.1C385.7 480.1 400 494.4 400 512.1C400 529.8 385.7 544.1 368 544.1L336 544.1L336 576.1C336 593.8 321.7 608.1 304 608.1C286.3 608.1 272 593.8 272 576.1L272 544.1L240 544.1C222.3 544.1 208 529.8 208 512.1C208 494.4 222.3 480.1 240 480.1L272 480.1L272 445.2C190.1 430.2 128 358.4 128 272.1C128 174.9 206.8 96.1 304 96.1C341 96.1 375.4 107.5 403.8 127.1L466.8 64.1L432.1 64.1zM416 272C416 210.1 365.9 160 304 160C242.1 160 192 210.1 192 272C192 333.9 242.1 384 304 384C365.9 384 416 333.9 416 272z"/></svg>
          </div>

          <div class="mh-input-content">  
            <select id="mh-gender">
              <option value="">Velg kjønn</option>
              <option>Kvinne</option>
              <option>Mann</option>
              <option>Hen</option>
            </select>
          </div>
        </div>

        <div class="mh-input-card">
          <div class="mh-input-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M216 64C229.3 64 240 74.7 240 88L240 128L400 128L400 88C400 74.7 410.7 64 424 64C437.3 64 448 74.7 448 88L448 128L480 128C515.3 128 544 156.7 544 192L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 192C96 156.7 124.7 128 160 128L192 128L192 88C192 74.7 202.7 64 216 64zM216 176L160 176C151.2 176 144 183.2 144 192L144 240L496 240L496 192C496 183.2 488.8 176 480 176L216 176zM144 288L144 480C144 488.8 151.2 496 160 496L480 496C488.8 496 496 488.8 496 480L496 288L144 288z"/></svg>
          </div>

          <div class="mh-input-content">
            
            <select id="mh-age">
              <option value="">Velg alder</option>
              <option>Under 9</option>
              <option>10–14</option>
              <option>15–19</option>
              <option>20–24</option>
              <option>25–29</option>
              <option>30–39</option>
              <option>40–49</option>
              <option>Over 50 år</option>
            </select>
          </div>
        </div>

        <div class="mh-input-card">
          <div class="mh-input-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M128 252.6C128 148.4 214 64 320 64C426 64 512 148.4 512 252.6C512 371.9 391.8 514.9 341.6 569.4C329.8 582.2 310.1 582.2 298.3 569.4C248.1 514.9 127.9 371.9 127.9 252.6zM320 320C355.3 320 384 291.3 384 256C384 220.7 355.3 192 320 192C284.7 192 256 220.7 256 256C256 291.3 284.7 320 320 320z"/></svg>
          </div>

              <div class="mh-input-content">
                
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
            </div>

                <div class="mh-consent-card">

                <label class="mh-consent-row">
                  <input type="checkbox" id="mh-gdpr"/>
                  <span>Jeg har lest og godtar betingelsene</span>
                </label>
                <a
                  href="https://mentalhelse.no/personvernerklaering/"
                  class="mh-consent-link" 
                  target="_blank"
                  rel="noopener"
                >
                  <strong>Les mer</strong> om betingelsene
                </a>

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
                  <span><p class="mh-text-info3">Unntak fra anonymitet </p></span>
                    <svg class="mh-chevron" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2.5"
                            stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>

                  <div id="mhPrivacyPanel" class="mh-accordion-panel" hidden>
                    <div class="mh-scrollbox">
                      <p class="mh-text-info3">
                        
                        Alle som svarer på chat hos Mental Helse har taushetsplikt. Det betyr at det du deler med oss, ikke blir fortalt videre til andre.

                        Hvis vi er bekymret for at det kan være fare for liv eller alvorlig skade, kan vi likevel ha plikt til å melde fra til nødetater.

                        I slike tilfeller kan vi hente ut IP-adressen din og gi den videre til politiet. Dette gjør vi kun når det er nødvendig for å ivareta liv og helse.
                      </p>

                    </div>
                  </div>
                </div>

                <div class="mh-box-blue2">

                  <svg class="icon-warning" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                    <path class="icon-warning__bg"
                          d="M12 3.2c.45 0 .87.24 1.1.64l8.7 15.1c.45.79-.12 1.76-1.02 1.76H3.22c-.9 0-1.47-.97-1.02-1.76l8.7-15.1c.23-.4.65-.64 1.1-.64z"/>
                    <rect class="icon-warning__mark" x="11" y="8" width="2" height="7" rx="1"/>
                    <circle class="icon-warning__mark" cx="12" cy="17.5" r="1.2"/>
                  </svg>
                  <p class="mh-text-info">
                    Er du i akutt fare? Ring 113 nå. <br>
                    Du kan også kontakte legevakt på 116 117.
                  </p>
                </div>

                <button class="mh-submit" type="submit" disabled>Start chat</button>
              </div>

              <div class="mh-closed-view" style="display:none">
                <section class="card">
                  <h2 class="title">Chatten er dessverre stengt nå</h2>

                  <div class="help-box">
                    <p class="help-main">Trenger du noen å snakke med?</p>
                    <p class="help-contact">
                      📞 <a class="call-button" href="tel:116123">Ring 116 123</a><br />
                      💬 <a
                        class="call-button"
                        href="https://mentalhelse.no/"
                        target="_blank"
                        rel="noopener"
                      >
                        Kontakt Mental Helse Chat
                      </a>
                    </p>
                    <p class="help-note">Vi er her for deg hele døgnet.</p>
                  </div>
                </section>
              </div>
            </form>
          `;

          return wrapper;
        }
        const hint = wrapper.querySelector(".mh-chat-hint");
        setTimeout(() => {
          hint.classList.add("visible");

          setTimeout(() => {
            hint.classList.remove("visible");
          }, 5000); // vis i 5 sek
        }, 2500);

        function bindEvents(elements, closeBtn, wrapper) {
          elements.button.addEventListener("click", async () => {
            hint.classList.remove("visible");

            if (state.isPanelOpen) {
              closePreChatPanel(elements);
              return;
            }

            openLoadingState(elements);
            await syncAvailabilityUI(elements);
            openPreChatPanel(elements);
          });

          elements.panel.addEventListener("submit", async (event) => {
            event.preventDefault();

            if (!isValid(elements)) return;
            if (!state.chatAvailable) return;
            if (state.isStartingChat) return;

            try {
              await startExternalChat(elements, closeBtn, {
                fylke: elements.county.value,
                alder: elements.age.value,
                kjonn: elements.gender.value,
              });

              elements.panel.style.display = "none";
              state.isPanelOpen = false;
              wrapper.style.display = "none";
              elements.panel.reset();
            } catch (error) {
              console.error("Feil ved start av chat:", error);
              state.isStartingChat = false;
              updateSubmitState(elements);
            }
          });

          [elements.county, elements.gender, elements.age].forEach(
            (element) => {
              element.addEventListener("change", () =>
                updateSubmitState(elements),
              );
            },
          );

          elements.gdpr.addEventListener("change", () =>
            updateSubmitState(elements),
          );

          closeBtn.addEventListener("click", () => {
            const api = window.zissonWebChat;

            if (!api) {
              restorePreChatUI(elements, closeBtn, wrapper);
              return;
            }

            try {
              if (
                !state.conversationEndedByUser &&
                state.hasActiveConversation
              ) {
                api.endConversation?.();
                state.conversationEndedByUser = true;
                state.hasActiveConversation = false;
                return;
              }

              api.hideWidget?.();
              restorePreChatUI(elements, closeBtn, wrapper);
            } catch (error) {
              console.error("Feil ved klikk på lukkeknapp:", error);
            }
          });

          window.addEventListener("resize", placeCloseButton);
          window.addEventListener("scroll", placeCloseButton, {
            passive: true,
          });
        }

        function isValid(elements) {
          return Boolean(
            elements.county.value &&
            elements.gender.value &&
            elements.age.value &&
            elements.gdpr.checked,
          );
        }

        function updateSubmitState(elements) {
          const enabled =
            isValid(elements) && state.chatAvailable && !state.isStartingChat;
          elements.submit.disabled = !enabled;
          elements.submit.classList.toggle("active", enabled);
        }

        function setPanelMode(elements, isAvailable) {
          elements.openView.style.display = isAvailable ? "block" : "none";
          elements.closedView.style.display = isAvailable ? "none" : "block";
          elements.panel.classList.toggle("closed", !isAvailable);
        }

        function openPreChatPanel(elements) {
          elements.panel.style.display = "block";
          state.isPanelOpen = true;
        }

        function closePreChatPanel(elements) {
          elements.panel.style.display = "none";
          elements.panel.reset();
          state.isPanelOpen = false;
          setPanelMode(elements, true);
          updateSubmitState(elements);
        }

        function openLoadingState(elements) {
          elements.submit.disabled = true;
          elements.submit.classList.remove("active");
        }

        function restorePreChatUI(elements, closeBtn, wrapper) {
          wrapper.style.display = "block";
          elements.panel.style.display = "none";
          closeBtn.style.display = "none";
          elements.panel.reset();

          state.chatAvailable = false;
          state.isStartingChat = false;
          state.hasActiveConversation = false;
          state.conversationEndedByUser = false;
          state.isPanelOpen = false;

          setPanelMode(elements, true);
          updateSubmitState(elements);
        }

        function attachConversationEndedListener() {
          if (state.conversationEndListenerAttached) return;
          state.conversationEndListenerAttached = true;

          window.addEventListener("zConversationEnded", (event) => {
            //console.log("zConversationEnded", event);
            state.hasActiveConversation = false;
          });
        }

        function ensureZissonLoaded() {
          if (
            window.zissonWebChat &&
            typeof window.zissonWebChat.isOpen === "boolean" &&
            typeof window.zissonWebChat.agentsAreAvailable === "boolean"
          ) {
            return Promise.resolve(window.zissonWebChat);
          }

          if (state.zissonReadyPromise) return state.zissonReadyPromise;

          document.body.classList.add("mh-hide-zisson");

          state.zissonReadyPromise = new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
              reject(new Error("Timeout: Zisson ble ikke klar i tide"));
            }, CONFIG.readyTimeoutMs);

            const waitForReadyState = () => {
              const api = window.zissonWebChat;

              if (
                api &&
                typeof api.isOpen === "boolean" &&
                typeof api.agentsAreAvailable === "boolean"
              ) {
                clearTimeout(timeout);
                resolve(api);
                return;
              }

              setTimeout(waitForReadyState, CONFIG.readyPollMs);
            };

            window.addEventListener(
              "zissonWebChat",
              () => {
                waitForReadyState();
              },
              { once: true },
            );

            if (!state.externalChatLoaded) {
              state.externalChatLoaded = true;

              const script = document.createElement("script");
              script.src = CONFIG.zissonScriptSrc;
              script.type = "text/javascript";
              script.setAttribute("data-jwt", CONFIG.zissonJwt);
              script.async = true;

              script.onerror = () => {
                clearTimeout(timeout);
                reject(new Error("Kunne ikke laste Zisson"));
              };

              document.body.appendChild(script);
            } else {
              waitForReadyState();
            }
          });

          return state.zissonReadyPromise;
        }

        async function getAvailabilitySnapshot() {
          await ensureZissonLoaded();

          let lastSnapshot = {
            open: false,
            available: false,
          };

          for (
            let attempt = 0;
            attempt < CONFIG.availabilityRetries;
            attempt += 1
          ) {
            const api = window.zissonWebChat;

            lastSnapshot = {
              open: api?.isOpen === true,
              available: api?.agentsAreAvailable === true,
            };

            if (lastSnapshot.open || lastSnapshot.available) {
              break;
            }

            await delay(CONFIG.availabilityRetryDelayMs);
          }

          return lastSnapshot;
        }

        async function syncAvailabilityUI(elements) {
          try {
            const snapshot = await getAvailabilitySnapshot();
            state.chatAvailable = snapshot.open && snapshot.available;

            /*console.log("Zisson status:", {
        isOpen: snapshot.open,
        agentsAreAvailable: snapshot.available,
        chatAvailable: state.chatAvailable,
      });*/

            setPanelMode(elements, state.chatAvailable);
            updateSubmitState(elements);
          } catch (error) {
            console.error("Feil ved lasting av Zisson:", error);
            state.chatAvailable = false;
            setPanelMode(elements, false);
            updateSubmitState(elements);
          }
        }

        async function startExternalChat(elements, closeBtn, inputDefaults) {
          if (state.isStartingChat) return;

          state.isStartingChat = true;
          updateSubmitState(elements);

          try {
            const api = await ensureZissonLoaded();

            api.reload?.();

            await waitForApiSnapshot();
            await delay(CONFIG.startReloadDelayMs);

            document.body.classList.remove("mh-hide-zisson");

            api.openWidget?.();

            await waitForWidgetMount();
            await delay(1000);

            api.setDefaults?.(inputDefaults);

            await delay(1000);

            api.startConversation?.();
            state.hasActiveConversation = true;
            closeBtn.style.display = "block";
            placeCloseButton();
          } catch (error) {
            console.error("Feil ved startExternalChat:", error);
            throw error;
          } finally {
            state.isStartingChat = false;
            updateSubmitState(elements);
          }
        }

        async function waitForApiSnapshot() {
          const startedAt = Date.now();

          while (Date.now() - startedAt < CONFIG.readyTimeoutMs) {
            const api = window.zissonWebChat;

            if (
              api &&
              typeof api.isOpen === "boolean" &&
              typeof api.agentsAreAvailable === "boolean"
            ) {
              return api;
            }

            await delay(CONFIG.readyPollMs);
          }

          throw new Error("Zisson API ble ikke klar etter reload");
        }

        async function waitForWidgetMount() {
          const startedAt = Date.now();

          while (Date.now() - startedAt < CONFIG.readyTimeoutMs) {
            const widget =
              document.querySelector('iframe[src*="chat2.zisson.com"]') ||
              document.querySelector('[id*="zisson"]') ||
              document.querySelector('[class*="zisson"]') ||
              document.querySelector('[id*="wavechat"]') ||
              document.querySelector('[class*="wavechat"]');

            if (widget) {
              return widget;
            }

            await delay(100);
          }

          throw new Error("Zisson-widget ble ikke montert i tide");
        }

        function placeCloseButton() {
          if (!closeBtn) return;

          // Ikke vis krysset med mindre vi faktisk er inne i ekstern chat
          if (!state.hasActiveConversation) {
            closeBtn.style.display = "none";
            return;
          }

          const zissonElement = document.querySelector(
            'iframe[src*="chat2.zisson.com"]',
          );

          if (!zissonElement) {
            closeBtn.style.display = "none";
            return;
          }

          const rect = zissonElement.getBoundingClientRect();

          if (rect.width === 0 || rect.height === 0) {
            closeBtn.style.display = "none";
            return;
          }

          closeBtn.style.position = "fixed";
          closeBtn.style.top = `${rect.top + 10}px`;
          closeBtn.style.left = `${rect.right - 46}px`;
          closeBtn.style.display = "block";
        }

        function prewarmZisson() {
          const run = async () => {
            try {
              await ensureZissonLoaded();
              await getAvailabilitySnapshot();
            } catch (error) {
              console.error("Prewarm av Zisson feilet:", error);
            }
          };

          if ("requestIdleCallback" in window) {
            window.requestIdleCallback(run, { timeout: 2000 });
          } else {
            window.setTimeout(run, 300);
          }
        }

        function delay(ms) {
          return new Promise((resolve) => setTimeout(resolve, ms));
        }
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
      })();
