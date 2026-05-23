(function () {
  var toggle = document.getElementById("menuToggle");
  var mobileNav = document.getElementById("mobileNav");

  if (toggle && mobileNav) {
    toggle.addEventListener("click", function () {
      var open = mobileNav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open);
    });
    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mobileNav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  var banner = document.getElementById("cookieBanner");
  var accept = document.getElementById("cookieAccept");
  var decline = document.getElementById("cookieDecline");

  if (banner && !localStorage.getItem("siwiworld_cookies")) {
    setTimeout(function () {
      banner.classList.add("is-visible");
    }, 1000);
  }

  function hideCookie(val) {
    localStorage.setItem("siwiworld_cookies", val);
    if (banner) banner.classList.remove("is-visible");
  }

  if (accept) accept.addEventListener("click", function () { hideCookie("accepted"); });
  if (decline) decline.addEventListener("click", function () { hideCookie("declined"); });

  var form = document.getElementById("careerForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Başvurunuz alındı. En kısa sürede sizinle iletişime geçeceğiz.");
      form.reset();
    });
  }

  var path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".main-nav__link").forEach(function (link) {
    var href = link.getAttribute("href");
    if (href && (href === path || (path === "index.html" && href === "/"))) {
      link.classList.add("is-active");
    }
  });

  /* 7/24 Teknik Destek — SİWİ Asistan */
  var agentMessages = document.getElementById("agentMessages");
  var agentForm = document.getElementById("agentForm");
  var agentInput = document.getElementById("agentInput");
  var agentQuick = document.getElementById("agentQuick");

  var agentReplies = [
    {
      keys: ["bağlan", "bağlantı", "internet", "açılm", "donma", "yavaş", "kop"],
      text: "Bağlantı sorunları için önce tarayıcınızı yenileyin ve mümkünse kablolu internet deneyin. Sorun sürerse öğrenci panelinizdeki «Canlı Ders Testi» aracını çalıştırın; sonucu bize iletin, bilişim ekibimiz 15 dakika içinde dönüş yapar."
    },
    {
      keys: ["kayıt", "video", "izle", "ders", "arşiv", "yüklen"],
      text: "Canlı dersler en geç 2 saat içinde panelinize yüklenir. «Derslerim» menüsünden ilgili haftayı seçin. Hâlâ görünmüyorsa ders adını ve tarihini yazın; kayıt ekibimiz kontrol etsin."
    },
    {
      keys: ["giriş", "şifre", "panel", "hesap", "oturum", "login"],
      text: "Panel girişinde «Şifremi Unuttum» bağlantısını kullanın. E-posta gelmezse spam klasörünü kontrol edin. 10 dakika içinde ulaşmazsa kayıtlı telefon numaranızı yazın; hesabınızı manuel doğrulayalım."
    },
    {
      keys: ["iş garantisi", "sözleşme", "istihdam", "mezun"],
      text: "İş garantisi süreci kayıt sırasında imzalanan taahhütname ile yürür. Detaylar için sitemizdeki İş Garantisi bölümüne bakabilir veya kariyer danışmanımızla görüşmek üzere başvuru formunu doldurabilirsiniz."
    },
    {
      keys: ["ödeme", "taksit", "fatura", "ücret", "kayıt ücret"],
      text: "Ödeme ve taksit seçenekleri kayıt danışmanlarımız tarafından paylaşılır. Telefon numaranızı bırakırsanız muhasebe ekibimiz sizi arayarak net bilgi verir."
    },
    {
      keys: ["merhaba", "selam", "iyi gün", "günaydın", "hey"],
      text: "Merhaba, size nasıl yardımcı olabilirim? Canlı ders, panel, kayıt veya başvuru konularında sorunuzu yazmanız yeterli."
    }
  ];

  var defaultReply =
    "Mesajınızı aldım. Kısa süre içinde teknik ekibimize iletiyorum. Acil durumlarda WhatsApp hattımızdan veya destek@siwiworld.com adresinden de ulaşabilirsiniz. Talebinizi özetler misiniz: hangi ders, hangi cihaz ve hata mesajı?";

  var humanReply =
    "Sizi canlı destek uzmanımıza aktarıyorum. Lütfen ad-soyad ve kayıtlı telefon numaranızı yazın; en geç 2 dakika içinde geri dönüş yapılacaktır. WhatsApp: paneldeki «Eğitim Danışmanı» butonundan da yazabilirsiniz.";

  function scrollAgentChat() {
    if (agentMessages) {
      agentMessages.scrollTop = agentMessages.scrollHeight;
    }
  }

  function addAgentMessage(text, isUser) {
    if (!agentMessages) return;
    var wrap = document.createElement("div");
    wrap.className = "agent-msg " + (isUser ? "agent-msg--user" : "agent-msg--bot");

    var avatar = document.createElement("div");
    avatar.className = "agent-msg__avatar";
    var img = document.createElement("img");
    img.src = "icon logo.png";
    img.alt = isUser ? "Siz" : "SİWİ Asistan";
    avatar.appendChild(img);

    var bubble = document.createElement("div");
    bubble.className = "agent-msg__bubble";
    if (!isUser) {
      var strong = document.createElement("strong");
      strong.textContent = "SİWİ Asistan";
      bubble.appendChild(strong);
    }
    var p = document.createElement("p");
    p.textContent = text;
    bubble.appendChild(p);

    wrap.appendChild(avatar);
    wrap.appendChild(bubble);
    agentMessages.appendChild(wrap);
    scrollAgentChat();
  }

  function showTyping() {
    if (!agentMessages) return null;
    var wrap = document.createElement("div");
    wrap.className = "agent-msg agent-msg--bot agent-msg--typing";
    wrap.id = "agentTyping";
    wrap.innerHTML =
      '<div class="agent-msg__avatar"><img src="icon logo.png" alt=""></div>' +
      '<div class="agent-msg__bubble"><span></span><span></span><span></span></div>';
    agentMessages.appendChild(wrap);
    scrollAgentChat();
    return wrap;
  }

  function hideTyping() {
    var el = document.getElementById("agentTyping");
    if (el) el.remove();
  }

  function getAgentReply(message) {
    var lower = message.toLowerCase();
    for (var i = 0; i < agentReplies.length; i++) {
      var keys = agentReplies[i].keys;
      for (var j = 0; j < keys.length; j++) {
        if (lower.indexOf(keys[j]) !== -1) {
          return agentReplies[i].text;
        }
      }
    }
    return defaultReply;
  }

  function handleAgentMessage(text, isHuman) {
    if (!text || !text.trim()) return;
    addAgentMessage(text.trim(), true);
    showTyping();
    setTimeout(function () {
      hideTyping();
      addAgentMessage(isHuman ? humanReply : getAgentReply(text), false);
    }, 900 + Math.random() * 600);
  }

  if (agentForm && agentInput) {
    agentForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var text = agentInput.value;
      agentInput.value = "";
      handleAgentMessage(text, false);
    });
  }

  if (agentQuick) {
    agentQuick.addEventListener("click", function (e) {
      var btn = e.target.closest(".agent-quick-btn");
      if (!btn) return;
      if (btn.getAttribute("data-human") === "true") {
        handleAgentMessage("Canlı uzman ile görüşmek istiyorum", true);
        return;
      }
      var msg = btn.getAttribute("data-msg");
      if (msg) handleAgentMessage(msg, false);
    });
  }
})();
