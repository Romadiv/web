var CACHE = 'resume-v4';
var FILES = ["./", "index.html", "style.css", "manifest.json", "icon.svg", "photo.jpg", "bg.jpg", "qr.js"];

self.addEventListener("install", function (e) {
	e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(FILES); }));
	self.skipWaiting();
});
self.addEventListener("activate", function (e) {
	e.waitUntil(caches.keys().then(function (keys) {
		return Promise.all(keys.map(function (k) { return k === CACHE ? null : caches.delete(k); }));
	}));
	self.clients.claim();
});
self.addEventListener("fetch", function (e) {
	e.respondWith(caches.match(e.request).then(function (r) {
		return r || fetch(e.request).then(function (res) {
			var copy = res.clone();
			caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
			return res;
		}).catch(function () { return caches.match("./index.html"); });
	}));
});

/* ===== Навігація між сторінками ===== */
function go(url) { location.href = url; }

function markNav() {
	var cur = location.pathname.split("/").pop() || "index.html";
	var links = document.querySelectorAll(".nav a");
	for (var i = 0; i < links.length; i++) {
		var h = (links[i].getAttribute("href") || "").split("/").pop();
		links[i].classList.toggle("on", h === cur);
	}
}
document.addEventListener("DOMContentLoaded", markNav);

/* ===== Перемикання вкладок усередині однієї сторінки ===== */
function tab(name) {
	var pages = document.querySelectorAll(".page");
	for (var i = 0; i < pages.length; i++) pages[i].classList.toggle("active", pages[i].id === name);
	window.scrollTo(0, 0);
}

var FILES = ["./", "index.html", "style.css", "app.css", "app.js",
	"manifest.json", "icon.svg", "logo.svg", "photo.jpg", "photo2.jpg", "qr.png",
	"menu.html", "services.html", "vacancies.html"];

/* ================= QR ================= */
(function () {
	var modal = $("#modal");
	var photo = $("#photo");

	photo.addEventListener("click", function () {
		modal.classList.add("show");
	});
	$("#closeModal").addEventListener("click", function () {
		modal.classList.remove("show");
	});
	modal.addEventListener("click", function (e) {
		if (e.target === modal) modal.classList.remove("show");
	});
})();