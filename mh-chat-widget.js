

(function () {

  /* ---------- CSS ---------- */
  const style = document.createElement("style");
  style.textContent = `
    :root{
      --mh-red: #E02010;
      --mh-blue: #80D0E0;
      --mh-light-blue: #CFEFF4;
      --mh-light-red: #F6A3A0;
      --mh-dark-red: #33090B;
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
      background: var(--mh-red);
      box-shadow: rgba(0, 0, 0, 0.4) 0px 30px 90px;
      display: grid;
      place-items: center;
      z-index: 9999;
    }

    .mh-chat-fab svg{
      fill: var(--mh-blue);
      width: 48px;
      height: 48px;
    }

    .mh-chat-panel{
      position: fixed;
      right: 20px;
      bottom: 100px;
      width: 350px;
      height: 50%;
      background: white;
      border: 1px solid #ddd;
      border-radius: 10px;
      box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
      display: none;
      z-index: 9999;
      padding: 10px;
      backdrop-filter: blur(8px);
    }

    .mh-header-widget{
      display: -webkit-box;
      background: white;
      padding: 3px;
      border-radius: 8px 8px 0 0;
      margin: -10px -10px 0px -10px;
    }

    .mh-chat-panel label{
      font-size: 13px;
      display: block;
      margin-top: 8px;
    }

    .mh-chat-panel select{
      width: 100%;
      margin-top: 4px;
      border-radius: 4px;
      background: ##D8DDE0;
      padding: 5px;
    }

    .mh-submit{
      display: none;
      margin-top: 12px;
      width: 100%;
      background: var(--mh-red);
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
      }
     
      .mh-header-text {
      font-size: 15px;
      font-weight: bold;
      color: black;
      }
      .mh-box{
      padding: 10px;
      background: white;
      justify-content: space-between;
      border-radius: 10px;
      margin-top: 20px;
      margin-left: 10px;
      margin-right: 10px;
      }
      .mh-label-text{
      font-weight: bold;
      }
      .mh-input{
      width: 100%;
      margin-top: 4px;
      padding: 10px;
      border-radius: 8px;
      border: 1px solid #ddd;
  `;
  document.head.appendChild(style);

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
        <p class = "mh-header-text">Mental Helse – hjelpechat</p>
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
          <option class="mh-input">Agder</option>
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
          <option> Vestfold</option>
          <option>Vestland</option>
          <option>Østfold</option>
          <option>Utlandet</option>
        </select>
      </div>

      <div class="mh-box">
      <p style="font-size:12px">
        GDPR og Personopplysningsloven stiller krav til at det må innhentes spesifikt samtykke for å lagre personopplysninger. 
        <a href="https://mentalhelse.no/personvernerklaering/" target="_blank" rel="noopener">Personvernserklæring for Mental Helse</a>
      </p>

      <label style ="display:-webkit-box">
        <input type="checkbox" id="mh-gdpr"> Jeg samtykker
      </label>
      </div>

      <button class="mh-submit" type="submit">Start chat</button>
    </form>
  `;
  document.body.appendChild(wrapper);


  const btn = wrapper.querySelector(".mh-chat-fab");
  const panel = wrapper.querySelector(".mh-chat-panel");
  const submit = wrapper.querySelector(".mh-submit");

  const county = wrapper.querySelector("#mh-county");
  const gender = wrapper.querySelector("#mh-gender");
  const age = wrapper.querySelector("#mh-age");
  const gdpr = wrapper.querySelector("#mh-gdpr");

  const isValid = () =>
    county.value && gender.value && age.value && gdpr.checked;

  const update = () =>
    submit.style.display = isValid() ? "block" : "none";

  btn.onclick = () => {
    panel.style.display =
      panel.style.display === "block" ? "none" : "block";

    if (panel.style.display === "none") {
      panel.reset();
      submit.style.display = "none";
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
    openWidget();
    startConversation();
    
    panel.style.display = "none";


    console.log({
      county: county.value,
      gender: gender.value,
      age: age.value
    });
    panel.style.display = "none";
    panel.reset();
    submit.style.display = "none";
  };

})();


