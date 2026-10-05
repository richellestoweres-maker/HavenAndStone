(function () {
  var P = window.HS_PRODUCTS || [];
  var page = document.body.getAttribute("data-page") || "";

  /* ---------- helpers ---------- */
  function money(n) {
    return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
  }
  function byId(id) {
    for (var i = 0; i < P.length; i++) if (P[i].id === id) return P[i];
    return null;
  }
  function load(key) {
    try { return JSON.parse(localStorage.getItem(key)) || []; } catch (e) { return []; }
  }
  function save(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {}
  }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  window.HS = { money: money, byId: byId, esc: esc };

  var ICON = {
    search: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/></svg>',
    user: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8.5" r="4"/><path d="M4.5 20.5c1.2-4 4.2-6 7.5-6s6.3 2 7.5 6"/></svg>',
    heart: '<svg viewBox="0 0 24 24"><path d="M12 20s-7.5-4.6-7.5-10.2C4.5 7 6.6 5 9 5c1.4 0 2.4.6 3 1.6C12.6 5.6 13.6 5 15 5c2.4 0 4.5 2 4.5 4.8C19.5 15.4 12 20 12 20z"/></svg>',
    bag: '<svg viewBox="0 0 24 24"><path d="M5.5 8h13l-1 12.5h-11z"/><path d="M9 8V6.5a3 3 0 016 0V8"/></svg>',
    menu: '<svg viewBox="0 0 24 24"><path d="M3 7h18M3 12h18M3 17h18"/></svg>'
  };

  /* ---------- header ---------- */
  var nav = [
    ["shop.html?filter=new", "New", "new"],
    ["collection.html", "The Collection", "collection"],
    ["shop.html", "Shop All", "shop"],
    ["shop.html?filter=objects", "Objects", "objects"],
    ["shop.html?filter=textiles", "Textiles", "textiles"],
    ["shop.html?filter=table", "Kitchen & Table", "table"],
    ["shop.html?filter=lighting", "Lighting", "lighting"],
    ["shop.html?filter=mirrors", "Mirrors", "mirrors"],
    ["shop.html?filter=furniture", "Furniture", "furniture"],
    ["story.html", "Our Story", "story"]
  ];
  var current = page;
  var qf = new URLSearchParams(location.search).get("filter");
  if (page === "shop" && qf) current = qf;

  var header = document.getElementById("site-header");
  if (header) {
    header.outerHTML =
      '<div class="announce">Free shipping on orders over $150 &nbsp;&middot;&nbsp; Beautiful things for a home well lived</div>' +
      '<header class="site-header"><div class="wrap">' +
      '<div class="header-top">' +
      '<div><button class="menu-btn" aria-label="Open menu" aria-expanded="false">' + ICON.menu + '</button>' +
      '<form class="search" action="shop.html" role="search">' + ICON.search.replace("<svg", '<svg width="16" height="16" style="stroke:#2e2925;fill:none;stroke-width:1.4"') +
      '<input name="q" type="search" placeholder="Search..." aria-label="Search"></form></div>' +
      '<a class="logo" href="index.html"><span class="word">HEARTH &amp; STONE</span><span class="tag">Objects for a home well lived</span></a>' +
      '<div class="icons">' +
      '<a class="acct" href="story.html" aria-label="About us">' + ICON.user + '</a>' +
      '<a href="shop.html?filter=saved" aria-label="Saved items">' + ICON.heart + '</a>' +
      '<button class="bag-btn" aria-label="Open bag">' + ICON.bag + '<span class="bag-count"></span></button>' +
      '</div></div>' +
      '<nav class="main-nav" aria-label="Main"><ul>' +
      nav.map(function (n) {
        return '<li><a href="' + n[0] + '"' + (current === n[2] ? ' class="active"' : "") + ">" + n[1] + "</a></li>";
      }).join("") +
      "</ul></nav></div></header>";
  }

  /* ---------- footer ---------- */
  var footer = document.getElementById("site-footer");
  if (footer) {
    footer.outerHTML =
      '<section class="newsletter"><div class="wrap">' +
      '<div class="eyebrow">The Hearth &amp; Stone Letter</div>' +
      "<h2>Be the first to see Collection No. 01</h2>" +
      "<p>New arrivals, styling notes and quiet inspiration for a home well lived. Never more than twice a month.</p>" +
      '<form class="news-form"><input type="email" required placeholder="Your email address" aria-label="Email address"><button type="submit">Join</button></form>' +
      '<div class="news-note" aria-live="polite"></div>' +
      "</div></section>" +
      '<footer class="site-footer"><div class="wrap"><div class="foot-grid">' +
      '<div><div class="word">HEARTH &amp; STONE</div><p>Timeless furnishings, thoughtful objects and natural textures, gathered for a home that feels collected, not decorated.</p></div>' +
      '<div><h4>Shop</h4><ul><li><a href="shop.html?filter=new">New Arrivals</a></li><li><a href="collection.html">Collection No. 01</a></li><li><a href="shop.html?filter=objects">Objects</a></li><li><a href="shop.html?filter=textiles">Textiles</a></li><li><a href="shop.html?filter=furniture">Furniture</a></li></ul></div>' +
      '<div><h4>Rooms</h4><ul><li><a href="shop.html?room=kitchen">The Kitchen</a></li><li><a href="shop.html?room=living">The Living Room</a></li><li><a href="shop.html?room=table">The Table</a></li><li><a href="shop.html?room=bedroom">The Bedroom</a></li></ul></div>' +
      '<div><h4>About</h4><ul><li><a href="story.html">Our Story</a></li><li><a href="story.html#materials">Our Materials</a></li><li><a href="story.html#home-edit">The Home Edit</a></li><li><a href="mailto:hello@hearthandstone.com">Contact</a></li></ul></div>' +
      "</div>" +
      '<div class="foot-base"><span>&copy; ' + new Date().getFullYear() + " Hearth &amp; Stone. All rights reserved.</span><span>Made in Texas</span></div>" +
      "</div></footer>";
  }

  /* ---------- bag drawer ---------- */
  document.body.insertAdjacentHTML(
    "beforeend",
    '<div class="overlay"></div>' +
      '<aside class="drawer" aria-label="Your bag"><div class="drawer-head"><h3>Your Bag</h3><button class="close-bag" aria-label="Close bag">&times;</button></div>' +
      '<div class="drawer-body"></div><div class="drawer-foot"></div></aside>' +
      '<div class="toast" role="status"></div>'
  );
  var overlay = document.querySelector(".overlay");
  var drawer = document.querySelector(".drawer");

  function openBag() { renderBag(); overlay.classList.add("open"); drawer.classList.add("open"); }
  function closeBag() { overlay.classList.remove("open"); drawer.classList.remove("open"); }
  overlay.addEventListener("click", closeBag);
  drawer.querySelector(".close-bag").addEventListener("click", closeBag);
  document.querySelector(".bag-btn").addEventListener("click", openBag);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeBag(); });

  function toast(msg) {
    var t = document.querySelector(".toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { t.classList.remove("show"); }, 2600);
  }
  window.HS.toast = toast;

  function updateCount() {
    var bag = load("hs_bag");
    var n = bag.reduce(function (s, l) { return s + l.qty; }, 0);
    var el = document.querySelector(".bag-count");
    el.textContent = n;
    el.classList.toggle("show", n > 0);
  }

  function addToBag(id, qty, color) {
    var bag = load("hs_bag");
    color = color || "";
    var found = bag.filter(function (l) { return l.id === id && l.color === color; })[0];
    if (found) found.qty += qty; else bag.push({ id: id, qty: qty, color: color });
    save("hs_bag", bag);
    updateCount();
    var p = byId(id);
    toast((p ? p.name : "Item") + " added to your bag");
  }
  window.HS.addToBag = addToBag;
  window.HS.openBag = openBag;

  function renderBag() {
    var bag = load("hs_bag").filter(function (l) { return byId(l.id); });
    var body = drawer.querySelector(".drawer-body");
    var foot = drawer.querySelector(".drawer-foot");
    if (!bag.length) {
      body.innerHTML = '<div class="bag-empty">Your bag is empty.<br><br><a class="link-arrow" href="shop.html">Shop the collection</a></div>';
      foot.innerHTML = "";
      return;
    }
    var total = 0;
    body.innerHTML = bag.map(function (l, i) {
      var p = byId(l.id);
      total += p.price * l.qty;
      return '<div class="line"><img src="' + p.img + '" alt=""><div><div class="n">' + esc(p.name) + '</div><div class="m">' +
        (l.color ? esc(l.color) + " &middot; " : "") + "Qty " + l.qty + '</div><button class="rm" data-i="' + i + '">Remove</button></div><div>' + money(p.price * l.qty) + "</div></div>";
    }).join("");
    foot.innerHTML = '<div class="subtotal"><span>Subtotal</span><span>' + money(total) + "</span></div>" +
      "<small>" + (total >= 150 ? "Your order ships free." : "Add " + money(150 - total) + " more for free shipping.") + "</small>" +
      '<button class="btn btn-solid checkout">Checkout</button>';
    body.querySelectorAll(".rm").forEach(function (b) {
      b.addEventListener("click", function () {
        var all = load("hs_bag").filter(function (l) { return byId(l.id); });
        all.splice(+b.getAttribute("data-i"), 1);
        save("hs_bag", all);
        updateCount();
        renderBag();
      });
    });
    foot.querySelector(".checkout").addEventListener("click", function () {
      toast("Checkout opens with our launch. Join the list below to hear first.");
    });
  }

  /* ---------- wishlist ---------- */
  function isSaved(id) { return load("hs_saved").indexOf(id) > -1; }
  function toggleSaved(id) {
    var s = load("hs_saved");
    var i = s.indexOf(id);
    if (i > -1) s.splice(i, 1); else s.push(id);
    save("hs_saved", s);
    return i === -1;
  }
  window.HS.saved = function () { return load("hs_saved"); };

  document.addEventListener("click", function (e) {
    var w = e.target.closest(".wish");
    if (!w) return;
    e.preventDefault();
    var on = toggleSaved(w.getAttribute("data-id"));
    w.classList.toggle("on", on);
    toast(on ? "Saved to your favorites" : "Removed from favorites");
  });

  /* ---------- product card ---------- */
  window.HS.card = function (p) {
    return '<a class="card" href="product.html?id=' + p.id + '">' +
      '<div class="ph">' + (p.isNew ? '<span class="badge">New</span>' : "") +
      '<button class="wish' + (isSaved(p.id) ? " on" : "") + '" data-id="' + p.id + '" aria-label="Save ' + esc(p.name) + '">' + ICON.heart + "</button>" +
      '<img src="' + p.img + '" alt="' + esc(p.name) + '" loading="lazy"></div>' +
      "<h3>" + esc(p.name) + '</h3><div class="price">' + money(p.price) + "</div>" +
      '<div class="swatches">' + p.swatches.map(function (s) {
        return '<i style="background:' + s[1] + '" title="' + esc(s[0]) + '"></i>';
      }).join("") + "</div></a>";
  };

  /* ---------- menu + newsletter ---------- */
  var mb = document.querySelector(".menu-btn");
  if (mb) mb.addEventListener("click", function () {
    var n = document.querySelector(".main-nav");
    var open = n.classList.toggle("open");
    mb.setAttribute("aria-expanded", open);
  });

  var nf = document.querySelector(".news-form");
  if (nf) nf.addEventListener("submit", function (e) {
    e.preventDefault();
    nf.querySelector("input").value = "";
    document.querySelector(".news-note").textContent = "Thank you. You're on the list for Collection No. 01.";
  });

  updateCount();
})();
