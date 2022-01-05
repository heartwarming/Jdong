$(function () {
    (function () {
        function a(e) {
            if (e == u) return;
            var r = t.eq(u),
                s = t.eq(e);
            r.css("z-index", 1).fadeOut(500),
                s.css("z-index", 0).fadeIn(500),
                n.eq(u).removeClass(i),
                n.eq(e).addClass(i),
                u = e
        }
        function f() {
            o = setInterval(function () {
                var e = (u + 1) % r;
                a(e)
            },
                5e3)
        }
    })(),
        function () {
            function e(e, t) {
                t = t || {};
                var n = $(this),
                    r = t.tabSelecter || ".tabs li",
                    i = t.viewSelector || ".views .view-item",
                    s = $(e),
                    o = s.find(r),
                    u = s.find(i),
                    a = [1],
                    f = "active",
                    l = 0;
                return n.host = s,
                    s.delegate(r, "click",
                        function (e) {
                            e.preventDefault();
                            var t = o.index(this),
                                r = o.eq(t),
                                i = u.eq(t);
                            o.eq(l).removeClass(f),
                                u.eq(l).removeClass(f),
                                r.addClass(f),
                                i.addClass(f),
                                l = t,
                                n.trigger("switch", {
                                    tab: r,
                                    view: i
                                }),
                                a[t] || (i.find("img").each(function () {
                                    var e = this.getAttribute("data-src");
                                    e && (this.src = e)
                                }), a[t] = 1)
                        }),
                    n
            }
            $.TabView = e
        }(),
        function () {
            var e = new $.TabView(".top-vrank");
            e.on("switch",
                function (t, n) {
                    e.host.find(".more a").attr("href", "http://" + n.tab.attr("data-type"))
                }),
                $(".top-vrank .tabs li").click(function () {
                    $(".top-vrank .view-item").removeClass("first")
                })
        }(),
        function () {
            var e = new $.TabView(".star-trend");
            $(".star-trend").delegate(".views li", "mouseenter",
                function (e) {
                    $(this).addClass("active").siblings(".active").removeClass("active")
                })
        }(),
        function () {
            function o() {
                var e = $(".star-album .active .active");
                e.next().length ? n.removeClass("disabled") : n.addClass("disabled"),
                    e.prev().length ? t.removeClass("disabled") : t.addClass("disabled"),
                    e.siblings().length ? i.css("visibility", "visible") : i.css("visibility", "hidden")
            }
            var e = new $.TabView(".star-album"),
                t = $(".star-album .prev"),
                n = $(".star-album .next"),
                r = $(".star-album").width(),
                i = $(".star-album .controls"),
                s = 1;
            e.on("switch",
                function (e) {
                    o()
                });
            var u = !1;
            i.delegate("a", "click",
                function (e) {
                    e.preventDefault();
                    var t = $(this);
                    if (u || t.hasClass("disabled")) return;
                    var n = $(".star-album .active .active"),
                        i;
                    t.hasClass("next") ? (i = n.next(), s = 1) : (i = n.prev(), s = -1),
                        u = !0,
                        n.stop().animate({
                            left: -s * r
                        },
                            400,
                            function () {
                                n.removeClass("active"),
                                    o(),
                                    u = !1
                            }),
                        i.stop().css("left", s * r + "px").addClass("active").animate({
                            left: 0
                        },
                            400)
                }),
                o()
        }()
});
