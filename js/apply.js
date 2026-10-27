(function () {
  "use strict";

  var STEPS = ["about", "learn", "fit", "review"];
  var state = {
    stepIndex: 0,
    data: {}
  };

  var form = document.getElementById("interest-form");
  var panels = Array.prototype.slice.call(document.querySelectorAll("[data-step]"));
  var progressItems = Array.prototype.slice.call(document.querySelectorAll("[data-progress]"));
  var resultEl = document.getElementById("form-result");
  var resultTitle = document.getElementById("form-result-title");
  var resultBody = document.getElementById("form-result-body");
  var reviewMount = document.getElementById("review-summary");
  var configBanner = document.getElementById("config-banner");
  var submitBtn = document.getElementById("submit-btn");

  function endpoint() {
    var cfg = window.RESIDENCY_CONFIG || {};
    return (cfg.formspreeEndpoint || "").trim();
  }

  function isConfigured() {
    var url = endpoint();
    if (!url) return false;
    try {
      var u = new URL(url);
      return u.protocol === "https:";
    } catch (e) {
      return false;
    }
  }

  function showConfigBanner() {
    if (!configBanner) return;
    if (isConfigured()) {
      configBanner.hidden = true;
    } else {
      configBanner.hidden = false;
    }
  }

  function setStep(index) {
    state.stepIndex = Math.max(0, Math.min(index, STEPS.length - 1));
    var name = STEPS[state.stepIndex];

    panels.forEach(function (panel) {
      var active = panel.getAttribute("data-step") === name;
      panel.classList.toggle("is-active", active);
      panel.hidden = !active;
    });

    progressItems.forEach(function (item, i) {
      var current = i === state.stepIndex;
      item.setAttribute("aria-current", current ? "step" : "false");
      item.classList.toggle("is-done", i < state.stepIndex);
    });

    if (name === "review") {
      renderReview();
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function fieldWrap(el) {
    return el.closest(".field") || el.closest(".choice-grid") || el.parentElement;
  }

  function clearErrors(scope) {
    scope.querySelectorAll(".field.is-invalid").forEach(function (f) {
      f.classList.remove("is-invalid");
    });
  }

  function markInvalid(el, message) {
    var wrap = el.closest(".field");
    if (!wrap) return;
    wrap.classList.add("is-invalid");
    var err = wrap.querySelector(".field-error");
    if (err && message) err.textContent = message;
  }

  function isUrl(value) {
    if (!value) return true;
    try {
      var u = new URL(value);
      return u.protocol === "http:" || u.protocol === "https:";
    } catch (e) {
      return false;
    }
  }

  function readStep(stepName) {
    var panel = document.querySelector('[data-step="' + stepName + '"]');
    if (!panel) return true;
    clearErrors(panel);
    var ok = true;

    panel.querySelectorAll("[data-required]").forEach(function (el) {
      if (el.type === "checkbox") {
        if (!el.checked) {
          ok = false;
          markInvalid(el, "Please confirm to continue.");
        }
        return;
      }
      if (el.type === "radio") {
        var group = panel.querySelectorAll('input[type="radio"][name="' + el.name + '"]');
        var checked = Array.prototype.some.call(group, function (r) { return r.checked; });
        if (!checked) {
          ok = false;
          markInvalid(el, "Please choose one option.");
        }
        return;
      }
      if (!String(el.value || "").trim()) {
        ok = false;
        markInvalid(el, "This field is required.");
      }
    });

    panel.querySelectorAll('input[type="url"]').forEach(function (el) {
      var v = String(el.value || "").trim();
      if (v && !isUrl(v)) {
        ok = false;
        markInvalid(el, "Enter a full URL starting with https://");
      }
    });

    var email = panel.querySelector('input[type="email"]');
    if (email && email.value.trim()) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        ok = false;
        markInvalid(email, "Enter a valid email address.");
      }
    }

    var commitNo = panel.querySelector("#commit-no");
    var commitYes = panel.querySelector("#commit-yes");
    var commitAlt = panel.querySelector("#commit-alt");
    if (commitNo && commitNo.checked && commitAlt && !String(commitAlt.value || "").trim()) {
      ok = false;
      markInvalid(commitAlt, "Please share what commitment you can make.");
    }

    if (commitYes || commitNo) {
      // handled via data-required on radios
    }

    if (!ok) {
      var first = panel.querySelector(".field.is-invalid input, .field.is-invalid select, .field.is-invalid textarea");
      if (first) first.focus();
    }
    return ok;
  }

  function collectAll() {
    var data = {};
    var fd = new FormData(form);

    fd.forEach(function (value, key) {
      if (key.endsWith("[]")) {
        var base = key.slice(0, -2);
        if (!data[base]) data[base] = [];
        data[base].push(String(value));
      } else if (Object.prototype.hasOwnProperty.call(data, key)) {
        if (!Array.isArray(data[key])) data[key] = [data[key]];
        data[key].push(String(value));
      } else {
        data[key] = String(value);
      }
    });

    state.data = data;
    return data;
  }

  function labelFor(name, value) {
    if (value === undefined || value === null || value === "") return "—";
    if (Array.isArray(value)) return value.length ? value.join(", ") : "—";
    return String(value);
  }

  function renderReview() {
    var data = collectAll();
    var blocks = [
      {
        title: "About you",
        rows: [
          ["Full name", data.full_name],
          ["Email", data.email],
          ["LinkedIn", data.linkedin],
          ["Current situation", data.situation],
          ["Role / experience", data.experience_text],
          ["Professional experience", data.years],
          ["GitHub / portfolio", data.portfolio]
        ]
      },
      {
        title: "Learning",
        rows: [
          ["Main focus", data.learning_focus],
          ["What you want to learn or build", data.learning_detail],
          ["Current experience with topic", data.topic_experience],
          ["Meaningful progress in 30 days", data.progress_goal],
          ["Already following a plan?", data.has_plan],
          ["Plan / course / project link", data.plan_link],
          ["~20 hours / week", data.commit_20h],
          ["If not, expected commitment", data.commit_alt]
        ]
      },
      {
        title: "Fit for the residency",
        rows: [
          ["Availability", data.availability],
          ["Budget (core)", data.budget_core],
          ["Budget (optional activities)", data.budget_optional],
          ["Accommodation", data.accommodation],
          ["Food arrangement", data.food],
          ["Dietary preference", data.diet],
          ["Allergies / needs", data.allergies],
          ["Facilities important to you", data.facilities],
          ["Optional activities", data.activities],
          ["What would make the month worthwhile", data.worthwhile],
          ["Non-negotiables / comments", data.comments],
          ["How you heard about us", data.heard]
        ]
      }
    ];

    reviewMount.innerHTML = blocks.map(function (block) {
      var rows = block.rows.map(function (row) {
        return "<div><dt>" + escapeHtml(row[0]) + "</dt><dd>" + escapeHtml(labelFor(row[0], row[1])) + "</dd></div>";
      }).join("");
      return '<section class="review-block"><h3>' + escapeHtml(block.title) + '</h3><dl>' + rows + "</dl></section>";
    }).join("");
  }

  function escapeHtml(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function showResult(title, body, ok) {
    form.hidden = true;
    document.getElementById("apply-progress").hidden = true;
    resultEl.classList.add("is-visible");
    resultTitle.textContent = title;
    resultBody.innerHTML = body;
    resultEl.classList.toggle("banner--ok", !!ok);
    resultEl.focus();
  }

  function payloadFromData(data) {
    var out = {};
    Object.keys(data).forEach(function (key) {
      var v = data[key];
      out[key] = Array.isArray(v) ? v.join(", ") : v;
    });
    out._subject = "Rishikesh Learning Residency — interest from " + (data.full_name || "someone");
    return out;
  }

  function onSubmit() {
    if (!readStep("fit") && state.stepIndex === 2) return;
    // Review step: consent already collected in step 3
    var consent = form.querySelector("#consent");
    if (consent && !consent.checked) {
      markInvalid(consent, "Please confirm to submit.");
      setStep(2);
      return;
    }

    var data = collectAll();
    if (!isConfigured()) {
      showResult(
        "Nothing was sent",
        "<p>Submissions are not connected yet — no Formspree endpoint is configured in <code>js/config.js</code>.</p>" +
          "<p>Your answers stayed in this browser tab only and were not stored or emailed. When the host adds an endpoint, try again.</p>" +
          '<p><a class="btn btn--secondary" href="index.html">Back to the residency page</a></p>',
        false
      );
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending…";

    fetch(endpoint(), {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payloadFromData(data))
    })
      .then(function (res) {
        if (!res.ok) throw new Error("Request failed");
        return res.json().catch(function () { return {}; });
      })
      .then(function () {
        showResult(
          "Thanks — I received your interest",
          "<p>I’ll usually follow up on WhatsApp for a short chat about fit, timing, and what you want to learn. This was an expression of interest, not a booking.</p>" +
            '<p><a class="btn btn--secondary" href="index.html">Back to the residency page</a></p>',
          true
        );
      })
      .catch(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = "Submit interest";
        showResult(
          "Couldn’t send just now",
          "<p>Something went wrong reaching the form service. Please try again in a little while, or come back once the host has confirmed the form is connected.</p>" +
            '<p><button type="button" class="btn btn--primary" id="retry-form">Try again</button></p>',
          false
        );
        var retry = document.getElementById("retry-form");
        if (retry) {
          retry.addEventListener("click", function () {
            resultEl.classList.remove("is-visible");
            form.hidden = false;
            document.getElementById("apply-progress").hidden = false;
            setStep(3);
          });
        }
      });
  }

  form.addEventListener("click", function (e) {
    var next = e.target.closest("[data-next]");
    var back = e.target.closest("[data-back]");
    if (next) {
      e.preventDefault();
      var current = STEPS[state.stepIndex];
      if (current !== "review" && !readStep(current)) return;
      if (current === "review") {
        onSubmit();
        return;
      }
      setStep(state.stepIndex + 1);
    }
    if (back) {
      e.preventDefault();
      setStep(state.stepIndex - 1);
    }
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (STEPS[state.stepIndex] === "review") onSubmit();
  });

  var commitRadios = form.querySelectorAll('input[name="commit_20h"]');
  var commitAltField = document.getElementById("commit-alt-field");
  function syncCommitAlt() {
    var no = document.getElementById("commit-no");
    if (!commitAltField) return;
    var show = no && no.checked;
    commitAltField.hidden = !show;
    if (!show) {
      var ta = document.getElementById("commit-alt");
      if (ta) ta.value = "";
    }
  }
  commitRadios.forEach(function (r) {
    r.addEventListener("change", syncCommitAlt);
  });
  syncCommitAlt();

  var hasPlanRadios = form.querySelectorAll('input[name="has_plan"]');
  var planLinkField = document.getElementById("plan-link-field");
  function syncPlanLink() {
    var yes = document.getElementById("has-plan-yes");
    if (!planLinkField) return;
    planLinkField.hidden = !(yes && yes.checked);
  }
  hasPlanRadios.forEach(function (r) {
    r.addEventListener("change", syncPlanLink);
  });
  syncPlanLink();

  showConfigBanner();
  setStep(0);
})();
