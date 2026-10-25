/* Arif Mia — Redesign demo interactions */
(function(){
  "use strict";
  var $ = function(s,c){ return (c||document).querySelector(s); };
  var $$ = function(s,c){ return Array.prototype.slice.call((c||document).querySelectorAll(s)); };

  /* Year */
  $$(".js-year").forEach(function(el){ el.textContent = new Date().getFullYear(); });

  /* Header scroll state + back-to-top */
  var header = $(".site-header"), toTop = $(".to-top");
  function onScroll(){
    if(header) header.classList.toggle("scrolled", window.scrollY > 24);
    if(toTop) toTop.classList.toggle("show", window.scrollY > 700);
  }
  window.addEventListener("scroll", onScroll, {passive:true}); onScroll();
  if(toTop) toTop.addEventListener("click", function(){ window.scrollTo({top:0,behavior:"smooth"}); });

  /* Mobile drawer */
  var drawer = $("#mobileDrawer");
  $$("[data-open-drawer]").forEach(function(b){ b.addEventListener("click", function(){ if(drawer) drawer.classList.add("open"); document.body.style.overflow="hidden"; }); });
  $$("[data-close-drawer]").forEach(function(b){ b.addEventListener("click", closeDrawer); });
  function closeDrawer(){ if(drawer) drawer.classList.remove("open"); document.body.style.overflow=""; }
  document.addEventListener("keydown", function(e){ if(e.key==="Escape") closeDrawer(); });

  /* Active nav */
  var page = (location.pathname.split("/").pop() || "index.html").split("?")[0].split("#")[0] || "index.html";
  $$(".nav-links a, .drawer-panel a").forEach(function(a){
    var href = a.getAttribute("href");
    if(href === page || (page==="index.html" && href==="./")) a.classList.add("active");
  });

  /* Reveal on scroll */
  var revealEls = $$(".reveal");
  if("IntersectionObserver" in window && revealEls.length){
    var ro = new IntersectionObserver(function(entries){
      entries.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add("in"); ro.unobserve(en.target); } });
    }, {threshold:.12, rootMargin:"0px 0px -40px 0px"});
    revealEls.forEach(function(el){ ro.observe(el); });
  } else { revealEls.forEach(function(el){ el.classList.add("in"); }); }

  /* Animated counters */
  function animateCount(el){
    var target = parseFloat(el.getAttribute("data-count"));
    var decimals = parseInt(el.getAttribute("data-decimals")||"0",10);
    var suffix = el.getAttribute("data-suffix")||"";
    var dur = 1600, start = null;
    function tick(t){
      if(!start) start = t;
      var p = Math.min((t-start)/dur, 1);
      var eased = 1 - Math.pow(1-p, 3);
      el.innerHTML = (target*eased).toFixed(decimals) + "<em>"+suffix+"</em>";
      if(p<1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  var counters = $$("[data-count]");
  if("IntersectionObserver" in window && counters.length){
    var co = new IntersectionObserver(function(entries){
      entries.forEach(function(en){ if(en.isIntersecting){ animateCount(en.target); co.unobserve(en.target); } });
    }, {threshold:.5});
    counters.forEach(function(el){ co.observe(el); });
  }

  /* Animated bars + skill fills */
  function fillBars(scope){
    $$(".bar i", scope||document).forEach(function(b){ b.style.width = b.getAttribute("data-w")||"70%"; });
    $$(".skill .fill", scope||document).forEach(function(b){ b.style.width = b.getAttribute("data-w")||"80%"; });
  }
  if("IntersectionObserver" in window){
    var bo = new IntersectionObserver(function(entries){
      entries.forEach(function(en){ if(en.isIntersecting){ fillBars(en.target); bo.unobserve(en.target); } });
    }, {threshold:.25});
    $$(".result-card, .skills-block").forEach(function(el){ bo.observe(el); });
  } else { fillBars(document); }

  /* FAQ accordion */
  $$(".faq").forEach(function(faq){
    var btn = $("button", faq), panel = $(".a", faq);
    btn.addEventListener("click", function(){
      var isOpen = faq.classList.contains("open");
      $$(".faq.open").forEach(function(o){ o.classList.remove("open"); $(".a",o).style.maxHeight = null; });
      if(!isOpen){ faq.classList.add("open"); panel.style.maxHeight = panel.scrollHeight + "px"; }
    });
  });

  /* Testimonial slider */
  var cards = $$(".testi-card");
  if(cards.length){
    var dotsWrap = $(".testi-dots"), idx = 0, timer = null;
    function go(n){
      idx = (n + cards.length) % cards.length;
      cards.forEach(function(c,i){ c.classList.toggle("show", i===idx); });
      if(dotsWrap) $$("button", dotsWrap).forEach(function(d,i){ d.classList.toggle("on", i===idx); });
    }
    if(dotsWrap){
      cards.forEach(function(_,i){
        var d = document.createElement("button");
        d.setAttribute("aria-label","Show testimonial "+(i+1));
        d.addEventListener("click", function(){ go(i); restart(); });
        dotsWrap.appendChild(d);
      });
    }
    var prev = $("#testiPrev"), next = $("#testiNext");
    if(prev) prev.addEventListener("click", function(){ go(idx-1); restart(); });
    if(next) next.addEventListener("click", function(){ go(idx+1); restart(); });
    function restart(){ if(timer) clearInterval(timer); timer = setInterval(function(){ go(idx+1); }, 6000); }
    go(0); restart();
  }

  /* Audit / contact forms -> compose email + WhatsApp (static demo) */
  function handleLead(formId){
    var form = document.getElementById(formId);
    if(!form) return;
    form.addEventListener("submit", function(e){
      e.preventDefault();
      var data = {};
      $$("input, select, textarea", form).forEach(function(f){ if(f.name) data[f.name] = f.value.trim(); });
      var subject = encodeURIComponent("New enquiry from website — " + (data.name||"Visitor") + " (" + (data.service||"General") + ")");
      var body = encodeURIComponent(
        "Name: "+(data.name||"")+"\nEmail: "+(data.email||"")+"\nBusiness: "+(data.business||"")+
        "\nService: "+(data.service||"")+"\nWebsite: "+(data.website||"")+"\n\nMessage:\n"+(data.message||"")
      );
      var wa = encodeURIComponent(
        "Hi Arif! I'm "+(data.name||"")+" from "+(data.business||"my business")+". I'm interested in "+(data.service||"SEO services")+". "+(data.message||"")
      );
      var msg = $("#"+formId+"-ok");
      if(msg){
        msg.style.display = "block";
        msg.innerHTML = 'Thanks, <b>'+(data.name||"friend")+'</b>! This demo site doesn\'t include a backend yet — your message is ready to send: ' +
          '<div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:12px">' +
          '<a class="btn btn-primary btn-sm" href="mailto:contact@arifmia.com?subject='+subject+'&body='+body+'">Send via Email</a>' +
          '<a class="btn btn-dark btn-sm" target="_blank" rel="noopener" href="https://wa.me/8801834177835?text='+wa+'">Send via WhatsApp</a></div>';
        msg.scrollIntoView({behavior:"smooth", block:"center"});
      }
    });
  }
  handleLead("leadForm"); handleLead("auditForm");

  /* Footer newsletter (demo) */
  var nl = $("#newsForm");
  if(nl) nl.addEventListener("submit", function(e){
    e.preventDefault();
    var em = $("input", nl).value.trim();
    var ok = $("#newsOk");
    if(ok){ ok.style.display="block"; ok.textContent = em ? "You're on the list! SEO tips will land in "+em+"." : "You're on the list!"; }
    nl.reset();
  });
})();
