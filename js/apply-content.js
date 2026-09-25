(function () {
  var data = window.SITE_CONTENT;
  if (!data) return;

  function readPath(path) {
    var value = data;
    var parts = path.split(".");
    for (var i = 0; i < parts.length; i += 1) {
      if (value == null) return undefined;
      value = value[parts[i]];
    }
    return value;
  }

  document.querySelectorAll("[data-bind]").forEach(function (el) {
    var value = readPath(el.getAttribute("data-bind"));
    if (typeof value === "string") el.textContent = value;
  });

  document.querySelectorAll("[data-src-bind]").forEach(function (el) {
    var value = readPath(el.getAttribute("data-src-bind"));
    if (typeof value !== "string" || !value) return;
    el.src = assetUrl(value);
  });

  document.querySelectorAll("[data-bind-facts]").forEach(function (el) {
    var rows = readPath(el.getAttribute("data-bind-facts"));
    if (!Array.isArray(rows)) return;
    el.replaceChildren();
    rows.forEach(function (row) {
      var label = (row && row.label) || "待填入";
      var value = (row && row.value) || "待填入";
      if (el.tagName === "UL") {
        var li = document.createElement("li");
        var mark = document.createElement("span");
        mark.className = "char-intro__label";
        mark.textContent = label;
        li.appendChild(mark);
        li.appendChild(document.createTextNode(value));
        el.appendChild(li);
        return;
      }
      var dt = document.createElement("dt");
      var dd = document.createElement("dd");
      dt.textContent = label;
      dd.textContent = value;
      el.appendChild(dt);
      el.appendChild(dd);
    });
  });

  document.querySelectorAll("[data-bind-list]").forEach(function (el) {
    var rows = readPath(el.getAttribute("data-bind-list"));
    if (!Array.isArray(rows)) return;
    el.replaceChildren();
    rows.forEach(function (text) {
      var li = document.createElement("li");
      li.textContent = typeof text === "string" && text ? text : "待填入";
      el.appendChild(li);
    });
  });

  document.querySelectorAll("[data-bind-paragraphs]").forEach(function (el) {
    var value = readPath(el.getAttribute("data-bind-paragraphs"));
    if (typeof value !== "string") return;
    el.replaceChildren();
    value.split(/\n{2,}/).forEach(function (block) {
      var p = document.createElement("p");
      p.textContent = block;
      el.appendChild(p);
    });
  });

  function assetUrl(path) {
    var base = document.body.getAttribute("data-base") || ".";
    return String(base).replace(/\/$/, "") + "/" + String(path || "").replace(/^\//, "");
  }

  function setLines(el, text) {
    el.replaceChildren();
    String(text == null || text === "" ? "待填入" : text).split("\n").forEach(function (line, index) {
      if (index) el.appendChild(document.createElement("br"));
      el.appendChild(document.createTextNode(line));
    });
  }

  function addEl(parent, tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    parent.appendChild(node);
    return node;
  }

  document.querySelectorAll("[data-card-list]").forEach(function (list) {
    var items = readPath(list.getAttribute("data-card-list"));
    var wrap = list.closest("[data-card-wrap]");
    var emptyNote = wrap ? wrap.querySelector("[data-members-empty]") : null;
    if (!Array.isArray(items) || items.length === 0) {
      list.hidden = true;
      if (emptyNote) emptyNote.hidden = false;
      return;
    }
    if (emptyNote) emptyNote.hidden = true;
    var prefix = list.getAttribute("data-card-prefix") || "";
    var fallbackLogo = list.getAttribute("data-card-logo") || "images/background/SCHOOL_ICON.png";
    var detail = (data.ui && data.ui.detail) || "详情";
    list.replaceChildren();
    items.forEach(function (item) {
      if (!item || !item.slug) return;
      var card = document.createElement("a");
      card.className = "card-profile";
      card.href = prefix + encodeURI(item.slug) + "/index.html";
      if (item.photo) card.style.setProperty("--prof-photo", item.photo);
      if (item.accent) card.style.setProperty("--prof-accent", item.accent);
      if (item.ink) card.style.setProperty("--prof-ink", item.ink);
      if (item.paper) card.style.setProperty("--prof-paper", item.paper);
      if (item.markColor) card.style.setProperty("--prof-mark", item.markColor);
      if (item.statusColor) card.style.setProperty("--prof-status", item.statusColor);

      var photo = addEl(card, "div", "prof-photo");
      var logoImg = document.createElement("img");
      logoImg.className = "prof-logo";
      logoImg.src = assetUrl(item.logo || fallbackLogo);
      logoImg.alt = "";
      photo.appendChild(logoImg);
      if (!item.logo) {
        addEl(photo, "div", "prof-photo-num", item.initials || "待");
        addEl(photo, "div", "prof-avatar", item.initials || "待");
      }
      if (item.status) addEl(photo, "div", "prof-status-badge", item.status);

      var body = addEl(card, "div", "prof-body");
      addEl(body, "div", "prof-handle", item.handle || "待填入");
      var name = addEl(body, "div", "prof-name");
      setLines(name, item.title);
      addEl(body, "div", "prof-bio", item.bio || item.summary || "待填入");

      var stats = addEl(card, "div", "prof-stats");
      var rows = Array.isArray(item.stats) && item.stats.length
        ? item.stats
        : [
            { value: "待填入", label: "待填入" },
            { value: "待填入", label: "待填入" },
            { value: "待填入", label: "待填入" }
          ];
      rows.slice(0, 3).forEach(function (row) {
        var cell = addEl(stats, "div", "pstat");
        addEl(cell, "span", "psv", (row && row.value) || "待填入");
        addEl(cell, "span", "psl", (row && row.label) || "待填入");
      });

      var btn = addEl(card, "span", "prof-btn");
      addEl(btn, "span", "prof-btn__label", detail);
      list.appendChild(card);
    });
  });

  document.querySelectorAll("[data-ticket-list]").forEach(function (list) {
    var items = readPath(list.getAttribute("data-ticket-list"));
    var wrap = list.closest("[data-card-wrap]");
    var emptyNote = wrap ? wrap.querySelector("[data-members-empty]") : null;
    if (!Array.isArray(items) || items.length === 0) {
      list.hidden = true;
      if (emptyNote) emptyNote.hidden = false;
      return;
    }
    if (emptyNote) emptyNote.hidden = true;
    var prefix = list.getAttribute("data-ticket-prefix") || "";
    var fallbackLogo = list.getAttribute("data-ticket-logo") || "";
    list.replaceChildren();
    items.forEach(function (item, index) {
      if (!item || !item.slug) return;
      var canvas = document.createElement("a");
      canvas.className = "ticket-canvas";
      canvas.href = prefix + encodeURI(item.slug) + "/index.html";

      var wrapper = addEl(canvas, "div", "ticket-wrapper");
      if (item.accent) {
        wrapper.style.setProperty("--t-accent", item.accent);
        wrapper.style.setProperty("--t-accent-glow", "color-mix(in srgb, " + item.accent + " 50%, transparent)");
      }
      var ticket = addEl(wrapper, "div", "ticket");
      var main = addEl(ticket, "div", "t-main");
      var content = addEl(main, "div", "t-content");

      var header = addEl(content, "div", "t-header");
      var logoBox = addEl(header, "div", "t-logo");
      var logoSrc = item.badge || fallbackLogo;
      if (logoSrc) {
        var badge = document.createElement("img");
        badge.src = assetUrl(logoSrc);
        badge.alt = "";
        logoBox.appendChild(badge);
      }
      logoBox.appendChild(document.createTextNode(item.org || "待填入"));
      addEl(header, "div", "t-type", item.type || "成员");

      var portrait = addEl(content, "div", "t-portrait");
      if (item.portrait) {
        var face = document.createElement("img");
        face.src = assetUrl(item.portrait);
        face.alt = item.title || "待填入";
        portrait.appendChild(face);
      } else {
        portrait.classList.add("t-portrait--empty");
        portrait.textContent = "待填入";
      }

      var name = addEl(content, "div", "t-title");
      setLines(name, item.title);
      addEl(content, "div", "t-subtitle", item.role || item.subtitle || "待填入");

      var details = addEl(content, "div", "t-details");
      var rows = Array.isArray(item.details) && item.details.length
        ? item.details
        : [
            { label: "待填入", value: "待填入" },
            { label: "待填入", value: "待填入" },
            { label: "待填入", value: "待填入" },
            { label: "待填入", value: "待填入" }
          ];
      rows.slice(0, 4).forEach(function (row) {
        var cell = addEl(details, "div", "t-detail-item");
        addEl(cell, "span", "t-label", (row && row.label) || "待填入");
        addEl(cell, "span", "t-value", (row && row.value) || "待填入");
      });

      var perf = addEl(main, "div", "t-perforation");
      addEl(perf, "div", "t-perf-line");

      var stub = addEl(ticket, "div", "t-stub");
      var codeBox = addEl(stub, "div", "t-barcode-container");
      addEl(codeBox, "div", "t-barcode");
      addEl(codeBox, "div", "t-barcode-id", item.code || "待填入");
      var admit = addEl(stub, "div", "t-admit");
      addEl(admit, "div", "t-admit-text", item.seatLabel || "编号");
      addEl(admit, "div", "t-admit-num", item.seat || String(index + 1).padStart(2, "0"));

      list.appendChild(canvas);
    });
  });

  var banner = document.querySelector("[data-banner]");
  var src = data.home && data.home.banner;
  if (banner && typeof src === "string" && src.trim() !== "") {
    var base = document.body.getAttribute("data-base") || ".";
    var img = document.createElement("img");
    img.className = "banner__image";
    img.alt = data.name ? data.name + "横幅" : "横幅";
    img.src = base.replace(/\/$/, "") + "/" + src.replace(/^\//, "");
    img.addEventListener("error", function () {
      showBannerPlaceholder(banner);
    });
    banner.classList.remove("banner--empty");
    banner.replaceChildren(img);
  }

  function showBannerPlaceholder(target) {
    var holder = document.createElement("div");
    holder.className = "banner__placeholder";
    var span = document.createElement("span");
    span.textContent = (data.home && data.home.bannerLabel) || "横幅待补";
    holder.appendChild(span);
    target.classList.add("banner--empty");
    target.replaceChildren(holder);
  }

  document.querySelectorAll(".card").forEach(function (card) {
    var panes = Array.prototype.slice.call(card.querySelectorAll(".card__pane"));
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function spanOf(pane) {
      return pane.querySelector(".card__label");
    }

    function bump(pane) {
      pane._job = (pane._job || 0) + 1;
      clearInterval(pane._timer);
      clearTimeout(pane._wait);
      return pane._job;
    }

    function alive(pane, job) {
      return pane._job === job;
    }

    function centerOpen(openPane) {
      card.classList.toggle("is-live", !!openPane);
    }

    function anyOpen() {
      return panes.some(function (pane) {
        return pane.classList.contains("is-open") || pane.classList.contains("is-arming");
      });
    }

    function afterGrow(pane, job, done) {
      if (reduceMotion) {
        done();
        return;
      }
      var finished = false;
      function finish() {
        if (finished || !alive(pane, job)) return;
        finished = true;
        card.removeEventListener("transitionend", onEnd);
        clearTimeout(pane._wait);
        done();
      }
      function onEnd(event) {
        if (event.target !== card) return;
        if (event.propertyName !== "grid-template-columns") return;
        finish();
      }
      card.addEventListener("transitionend", onEnd);
      pane._wait = setTimeout(finish, 980);
    }

    function erase(pane, job, done) {
      var span = spanOf(pane);
      var text = span.textContent;
      var index = text.length;
      if (reduceMotion || index === 0) {
        span.textContent = "";
        done();
        return;
      }
      pane._timer = setInterval(function () {
        if (!alive(pane, job)) return;
        index -= 1;
        span.textContent = text.slice(0, index);
        if (index <= 0) {
          clearInterval(pane._timer);
          done();
        }
      }, 16);
    }

    function typeText(pane, job, text, done) {
      var span = spanOf(pane);
      var index = 0;
      span.textContent = "";
      if (reduceMotion) {
        span.textContent = text;
        if (done) done();
        return;
      }
      pane._timer = setInterval(function () {
        if (!alive(pane, job)) return;
        index += 1;
        span.textContent = text.slice(0, index);
        if (index >= text.length) {
          clearInterval(pane._timer);
          if (done) done();
        }
      }, 28);
    }

    function closePane(pane) {
      var wasOpen = pane.classList.contains("is-open");
      var job = bump(pane);
      var face = pane.querySelector(".card__face");
      var span = spanOf(pane);
      pane.classList.remove("is-arming", "is-typed", "is-open");
      if (face) face.setAttribute("aria-expanded", "false");
      if (!wasOpen) {
        span.textContent = span.dataset.label || "";
        if (!anyOpen()) centerOpen(null);
        return;
      }
      span.textContent = "";
      afterGrow(pane, job, function () {
        if (!alive(pane, job)) return;
        if (pane.classList.contains("is-open") || pane.classList.contains("is-arming")) return;
        if (!anyOpen()) centerOpen(null);
        typeText(pane, job, span.dataset.label || "");
      });
    }

    function openPane(pane) {
      var job = bump(pane);
      var face = pane.querySelector(".card__face");
      var span = spanOf(pane);
      var text = span.dataset.label || "";
      pane.classList.add("is-arming");
      pane.classList.remove("is-typed");
      panes.forEach(function (other) {
        if (other !== pane && (other.classList.contains("is-open") || other.classList.contains("is-arming"))) {
          closePane(other);
        }
      });
      erase(pane, job, function () {
        if (!alive(pane, job)) return;
        pane.classList.remove("is-arming");
        pane.classList.add("is-open");
        if (face) face.setAttribute("aria-expanded", "true");
        centerOpen(pane);
        afterGrow(pane, job, function () {
          typeText(pane, job, text, function () {
            if (!alive(pane, job)) return;
            pane.classList.add("is-typed");
          });
        });
      });
    }

    panes.forEach(function (pane) {
      var face = pane.querySelector(".card__face");
      var span = spanOf(pane);
      if (!face || !span) return;
      span.dataset.label = span.textContent;
      face.setAttribute("aria-label", span.dataset.label);
      span.setAttribute("aria-hidden", "true");
      face.addEventListener("click", function () {
        if (pane.classList.contains("is-open") || pane.classList.contains("is-arming")) {
          closePane(pane);
          return;
        }
        openPane(pane);
      });
    });
  });

  if (!document.querySelector(".morse")) {
    var pattern = ". -..- - .-. .- - . .-. .-. . ... - .-. .. .- .-.. / -.-. .-. .. ... .. ... /";
    var root = document.createElement("div");
    root.className = "morse";
    root.setAttribute("aria-hidden", "true");

    function buildCopy() {
      var copy = document.createElement("div");
      copy.className = "morse__copy";
      pattern.split("").forEach(function (mark) {
        var piece = document.createElement("span");
        if (mark === ".") piece.className = "morse__dot";
        else if (mark === "-") piece.className = "morse__dash";
        else if (mark === " ") piece.className = "morse__gap";
        else if (mark === "/") piece.className = "morse__word";
        else return;
        copy.appendChild(piece);
      });
      return copy;
    }

    ["left", "right"].forEach(function (side) {
      var rail = document.createElement("div");
      var track = document.createElement("div");
      rail.className = "morse__rail morse__rail--" + side;
      track.className = "morse__track";
      track.appendChild(buildCopy());
      track.appendChild(buildCopy());
      rail.appendChild(track);
      root.appendChild(rail);
    });

    document.body.appendChild(root);
  }

  var page = document.body.getAttribute("data-page") || "home";
  var titlePath = document.body.getAttribute("data-title");
  var boundTitle = titlePath ? readPath(titlePath) : undefined;
  if (typeof boundTitle === "string" && data.name) {
    document.title = boundTitle === data.name ? boundTitle : boundTitle + " · " + data.name;
  } else if (page === "home" && data.name) {
    document.title = data.name;
  } else if (data[page] && data[page].title && data.name) {
    document.title = data[page].title + " · " + data.name;
  }
})();
