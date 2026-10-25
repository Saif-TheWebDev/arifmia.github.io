/* Arif Mia site — progressive enhancement only.
   All content is readable with JS disabled. */
(function(){
  "use strict";
  var doc = document;

  /* Footer year */
  doc.querySelectorAll(".js-year").forEach(function(el){
    el.textContent = String(new Date().getFullYear());
  });

  /* Mobile nav: disclosed panel, Escape closes, focus returns */
  var menuBtn = doc.getElementById("menuButton");
  var mobileNav = doc.getElementById("mobileNav");
  function setMenu(open){
    if(!menuBtn || !mobileNav) return;
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    mobileNav.classList.toggle("open", open);
    mobileNav.hidden = !open;
    if(!open) menuBtn.focus({preventScroll:true});
  }
  if(menuBtn && mobileNav){
    mobileNav.hidden = true;
    menuBtn.addEventListener("click", function(){
      var open = menuBtn.getAttribute("aria-expanded") !== "true";
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      mobileNav.classList.toggle("open", open);
      mobileNav.hidden = !open;
    });
    doc.addEventListener("keydown", function(e){
      if(e.key === "Escape" && menuBtn.getAttribute("aria-expanded") === "true") setMenu(false);
    });
  }

  /* Theme: white (#fff) is the main theme. Saved "dark" restores dark;
     anything else (or nothing) means light. Pre-paint script in <head>
     sets data-theme before first render. */
  var root = doc.documentElement;
  function paintTheme(){
    var saved = null;
    try{ saved = localStorage.getItem("arif-theme"); }catch(e){}
    var dark = saved === "dark" || root.getAttribute("data-theme") === "dark";
    doc.querySelectorAll(".theme-toggle").forEach(function(b){
      b.setAttribute("aria-pressed", dark ? "true" : "false");
      var label = b.querySelector(".sr");
      if(label) label.textContent = dark ? "Switch to light mode" : "Switch to dark mode";
    });
  }
  paintTheme();
  doc.querySelectorAll(".theme-toggle").forEach(function(b){
    b.addEventListener("click", function(){
      var currentlyDark = root.getAttribute("data-theme") === "dark";
      var next = currentlyDark ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try{ localStorage.setItem("arif-theme", next); }catch(e){}
      paintTheme();
    });
  });

  /* Lead form: static site, so submit reveals real send-channels
     (Email / WhatsApp with the message prefilled). Native validation
     runs first; the outcome is announced via role="status". */
  var form = doc.getElementById("leadForm");
  if(form){
    form.addEventListener("submit", function(e){
      e.preventDefault();
      if(!form.checkValidity()){ form.reportValidity(); return; }
      var v = function(n){ var f = form.elements[n]; return f ? f.value.trim() : ""; };
      var subject = encodeURIComponent("Free SEO audit request — " + (v("business") || v("name") || "new enquiry"));
      var body = encodeURIComponent(
        "Name: " + v("name") + "\nEmail: " + v("email") + "\nBusiness: " + v("business") +
        "\nService: " + v("service") + "\nWebsite: " + v("website") + "\n\n" + v("message")
      );
      var wa = encodeURIComponent(
        "Hi Arif! I'm " + (v("name") || "a business owner") +
        (v("business") ? " from " + v("business") : "") +
        ". I'd like a free SEO audit. " + v("message")
      );
      var box = doc.getElementById("leadOutcome");
      if(box){
        box.innerHTML = "<strong>Your message is ready.</strong> This demo site has no " +
          "server yet, so choose how to send it — nothing is lost:" +
          '<div class="row">' +
          '<a class="btn btn-primary btn-sm" href="mailto:contact@arifmia.com?subject=' + subject + "&body=" + body + '">Send via email</a>' +
          '<a class="btn btn-secondary btn-sm" target="_blank" rel="noopener" href="https://wa.me/8801834177835?text=' + wa + '">Send via WhatsApp</a>' +
          "</div>";
        box.classList.add("show");
        box.setAttribute("tabindex", "-1");
        box.focus({preventScroll:false});
      }
    });
  }
})();
