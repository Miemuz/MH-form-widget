(function () {

  /* ---------- CSS ---------- */
  const style = document.createElement("style");
  style.textContent = `
    :root{
      --mh-blue: #2E456E;
      --mh-lightblue: #E7EDF5;
      --mh-icon: #B9C4D4;
      font-family: 'Montserrat', 'Times New Roman', Times, serif;
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
      background: var(--mh-blue);
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
      color: var(--mh-blue);
    }

    .mh-header-widget{
      display: -webkit-box;
      background: var(--mh-blue);
      padding: 3px;
      border-radius: 8px 8px 0 0;
      margin: -10px -10px 0px -10px;
    }
    .mh-chat-panel select{
      width: 100%;
      border-radius: 4px;
      background: ##D8DDE0;
      padding: 5px;
    }
    .mh-submit{
      display: block;
      margin-top: 12px;
      width: 100%;
      background: var(--mh-blue);
      color: white;
      border: none;
      border-radius: 8px;
      padding: 10px;
      font-size: 16px;
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
      padding-left: 1rem;
      font-weight: bold;
      color: white;
      }
      .mh-box{
      padding: 10px;
      background: white;
      justify-content: space-between;
      border-radius: 10px;
      margin-left: 10px;
      margin-right: 10px;
      }
      .mh-label-text{
      font-weight: bold;
      font-size: 0.9rem;
      }
      .mh-welcome{
      font-weight: bold;
      margin-top: 20px;
      padding: 20px;
      }
      .mh-box-center{
      display: flex;
      font-size: 1.15rem;
      }
      .mh-welcome-text{
      text-align: center;
      font-size: 1.15rem;
      margin-bottom: 1px;
      }
      .mh-chat-info{
      text-align: center;
      margin-top: 8px;
      font-size: 0.9rem;
      margin-bottom: 1px;
      }
      .mh-box-blue{
      padding: 8px;
      background: var(--mh-lightblue);
      border-radius: 10px;
      margin-left: 10px;
      margin-right: 10px;
      border: 1px solid var(--mh-blue);
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
      }
      select,
      option {
      font-size: 15px;
      font-family: 'Montserrat', sans-serif;
      }
      .mh-box-border{
      display: flex;
      flex-direction: row;
      padding: 8px;
      border: 1px solid var(--mh-lightblue);
      border-radius: 10px;
      margin: 10px;
      }
      .mh-icon-info{
      margin-top: 10px;
      width: 30px;
      height: 30px;
      fill: var(--mh-blue);
      }
      .mh-bg {
      fill: var(--mh-icon); /* eller ønsket farge */
      }

      .mh-symbol {
      fill: var(--mh-blue);
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
      border: 1px solid var(--mh-blue);
      border-radius: 10px;
      margin: 10px;
      background: var(--mh-lightblue);
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
        <p class = "mh-header-text">Mental Helse Chat</p>
      </div>

      <div class ="mh-box-center">
      <p class ="mh-welcome-text">Velkommen til vår døgnåpne chattetjeneste</p>
      </div>
      <div class ="mh-box-center">
      <p class ="mh-chat-info">Chatten vår er døgnåpen. Her kan du skrive om det du ønsker</p>
      </div>

      <div class="mh-box">
      <label class="mh-label-text">Kjønn(*)</label>
        <select id="mh-gender">
          <option value="">Ikke valgt</option>
          <option>Kvinne</option>
          <option>Mann</option>
          <option>Hen</option>
        </select>

      <label class="mh-label-text">Alder(*)</label>
        <select id="mh-age">
          <option value="">Ikke valgt</option>
          <option>Under 9</option>
          <option>10–14</option>
          <option>15–19</option>
          <option>20–24</option>
          <option>25–29</option>
          <option>30–39</option>
          <option>40–49</option>
          <option>Over 50 år </option>
        </select>  

      <label class="mh-label-text">Fylke(*)</label>
        <select id="mh-county">
          <option value="">Ikke valgt</option>
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

      <p class="mh-gdpr-text"> Før vi starter, trenger vi ditt samtykke til hjelpechattens betingelser. </p>

      <div class="mh-box-blue"> 
        <label class ="mh-gdpr-label">
          <input type="checkbox" id="mh-gdpr"> Jeg har lest og samtykker til betingelsene
        </label>
        <p class="mh-text-info"><a href="https://mentalhelse.no/personvernerklaering/" target="_blank" rel="noopener">Les mer</a> om våre betingelser</p>
      </div>
      
      <div class="mh-box-border">
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
        <p class="mh-gdpr-text"> Avvergingsplikt og personvern <a href="https://mentalhelse.no/personvernerklaering/" target="_blank" rel="noopener"><br>Les mer</a></p>
      </div>

      <div class ="mh-box-border-blue">
        <svg class="mh-icon-alert" viewBox="0 0 24 24" aria-hidden="true">
          <path
            class="mh-bg"
            d="M12 2
              a10 10 0 1 1 0 20
              a10 10 0 1 1 0 -20z" />
          <path
            class="mh-symbol"
            d="M11 6.5
              h2
              v8
              h-2
              z
              M12 17.5
              a1.2 1.2 0 1 1 0 2.4
              a1.2 1.2 0 1 1 0 -2.4z" />
        </svg>
        <p class="mh-text-info"> Ved akutt fare: Ring 113 eller kontakt legevakt (116117).</p>
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

  const isValid = () =>
    county.value && gender.value && age.value && gdpr.checked;

  const update = () => {
    submit.disabled = !isValid();
  };

  update();

btn.onclick = () => {
  const open = panel.style.display === "block";
  panel.style.display = open ? "none" : "block";

  if (open) {
    panel.reset();
    update();
  } else {
    update(); // oppdater når du åpner også
  }
};

  // Test om dette funker - inn med chat 
  let eksternChatLoaded = false;
  
  function startEksternChat () {
    if (eksternChatLoaded) return; 
    eksternChatLoaded = true;
    console.log("Start ekstern chat");


    const script = document.createElement("script");
    script.type = "text/javascript";

    script.setAttribute("data-jwt", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcklkIjoiNzM2IiwiY3VzdG9tZXJHdWlkIjoiYWE3NWE3N2ItODgyNi00YjBhLWE3N2YtM2JiNTBiYTQxZTkxIiwiZW50cnlQb2ludEd1aWQiOiJiYjE2OTk3MS1lNmNiLTQzNDAtYmY5YS03M2VlYzgwN2YzNjAiLCJuYmYiOjE3NjM0NTIzODUsImV4cCI6MTkyMTIxODc4NSwiaWF0IjoxNzYzNDUyMzg1LCJpc3MiOiJ6aXNzb24iLCJhdWQiOiJ3YXZlQ2hhdCJ9.tzOYuMcrK25rEAovnNYsK6kLLUh_Gai6qDvw9dCBfjs");
    script.src ="https://chat2.zisson.com/bootstrapper.js";


    document.body.appendChild(script);
  }

  [county, gender, age].forEach(el =>
    el.addEventListener("change", update)
  );
  gdpr.addEventListener("change", update);

  panel.onsubmit = function (e) {
    e.preventDefault();
    if (!isValid()) return;

    startEksternChat();
    startConversation();
    
    panel.style.display = "none";

    var inputDefaults = {
      Fylke: county.value,
      Kjønn: gender.value,
      Alder: age.value
    };
    if (window.zizzonWebchat.setDefaults) {
      window.zizzonWebchat.setDefaults(inputDefaults);
    }
    else {
      window.addEventListener("zizzonWebchatLoaded", function () {
        window.zizzonWebchat.setDefaults(inputDefaults);
      });
    }

    console.log({
      county: county.value,
      gender: gender.value,
      age: age.value
    });

    wrapper.style.display = "none";
    //btn.style.display = "none";
    panel.reset();
    update();
  };

})();