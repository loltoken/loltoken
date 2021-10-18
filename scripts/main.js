! function(e, t, a) {
    "function" == typeof define && define.amd ? define(["jquery"], function(n) {
        return a(n, e, t), n.mobile
    }) : a(e.jQuery, e, t)
}(this, document, function(e, t, a) {
    ! function(e, t, a, n) {
        function s(e) {
            for (; e && "undefined" != typeof e.originalEvent;) e = e.originalEvent;
            return e
        }

        function i(t, a) {
            var i, o, r, l, c, u, d, p, f, g = t.type;
            if (t = e.Event(t), t.type = a, i = t.originalEvent, o = e.event.props, g.search(/^(mouse|click)/) > -1 && (o = M), i)
                for (d = o.length, l; d;) l = o[--d], t[l] = i[l];
            if (g.search(/mouse(down|up)|click/) > -1 && !t.which && (t.which = 1), -1 !== g.search(/^touch/) && (r = s(i), g = r.touches, c = r.changedTouches, u = g && g.length ? g[0] : c && c.length ? c[0] : n, u))
                for (p = 0, f = S.length; f > p; p++) l = S[p], t[l] = u[l];
            return t
        }

        function o(t) {
            for (var a, n, s = {}; t;) {
                a = e.data(t, k);
                for (n in a) a[n] && (s[n] = s.hasVirtualBinding = !0);
                t = t.parentNode
            }
            return s
        }

        function r(t, a) {
            for (var n; t;) {
                if (n = e.data(t, k), n && (!a || n[a])) return t;
                t = t.parentNode
            }
            return null
        }

        function l() {
            U = !1
        }

        function c() {
            U = !0
        }

        function u() {
            Q = 0, L.length = 0, X = !1, c()
        }

        function d() {
            l()
        }

        function p() {
            f(), E = setTimeout(function() {
                E = 0, u()
            }, e.vmouse.resetTimerDuration)
        }

        function f() {
            E && (clearTimeout(E), E = 0)
        }

        function g(t, a, n) {
            var s;
            return (n && n[t] || !n && r(a.target, t)) && (s = i(a, t), e(a.target).trigger(s)), s
        }

        function v(t) {
            var a, n = e.data(t.target, T);
            !X && (!Q || Q !== n) && (a = g("v" + t.type, t), a && (a.isDefaultPrevented() && t.preventDefault(), a.isPropagationStopped() && t.stopPropagation(), a.isImmediatePropagationStopped() && t.stopImmediatePropagation()))
        }

        function h(t) {
            var a, n, i, r = s(t).touches;
            r && 1 === r.length && (a = t.target, n = o(a), n.hasVirtualBinding && (Q = q++, e.data(a, T, Q), f(), d(), Y = !1, i = s(t).touches[0], I = i.pageX, N = i.pageY, g("vmouseover", t, n), g("vmousedown", t, n)))
        }

        function m(e) {
            U || (Y || g("vmousecancel", e, o(e.target)), Y = !0, p())
        }

        function _(t) {
            if (!U) {
                var a = s(t).touches[0],
                    n = Y,
                    i = e.vmouse.moveDistanceThreshold,
                    r = o(t.target);
                Y = Y || Math.abs(a.pageX - I) > i || Math.abs(a.pageY - N) > i, Y && !n && g("vmousecancel", t, r), g("vmousemove", t, r), p()
            }
        }

        function w(e) {
            if (!U) {
                c();
                var t, a, n = o(e.target);
                g("vmouseup", e, n), Y || (t = g("vclick", e, n), t && t.isDefaultPrevented() && (a = s(e).changedTouches[0], L.push({
                    touchID: Q,
                    x: a.clientX,
                    y: a.clientY
                }), X = !0)), g("vmouseout", e, n), Y = !1, p()
            }
        }

        function b(t) {
            var a, n = e.data(t, k);
            if (n)
                for (a in n)
                    if (n[a]) return !0;
            return !1
        }

        function $() {}

        function x(t) {
            var a = t.substr(1);
            return {
                setup: function() {
                    b(this) || e.data(this, k, {});
                    var n = e.data(this, k);
                    n[t] = !0, P[t] = (P[t] || 0) + 1, 1 === P[t] && z.bind(a, v), e(this).bind(a, $), O && (P.touchstart = (P.touchstart || 0) + 1, 1 === P.touchstart && z.bind("touchstart", h).bind("touchend", w).bind("touchmove", _).bind("scroll", m))
                },
                teardown: function() {
                    --P[t], P[t] || z.unbind(a, v), O && (--P.touchstart, P.touchstart || z.unbind("touchstart", h).unbind("touchmove", _).unbind("touchend", w).unbind("scroll", m));
                    var n = e(this),
                        s = e.data(this, k);
                    s && (s[t] = !1), n.unbind(a, $), b(this) || n.removeData(k)
                }
            }
        }
        var C, y, k = "virtualMouseBindings",
            T = "virtualTouchID",
            D = "vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel".split(" "),
            S = "clientX clientY pageX pageY screenX screenY".split(" "),
            j = e.event.mouseHooks ? e.event.mouseHooks.props : [],
            M = e.event.props.concat(j),
            P = {},
            E = 0,
            I = 0,
            N = 0,
            Y = !1,
            L = [],
            X = !1,
            U = !1,
            O = "addEventListener" in a,
            z = e(a),
            q = 1,
            Q = 0;
        for (e.vmouse = {
                moveDistanceThreshold: 10,
                clickDistanceThreshold: 10,
                resetTimerDuration: 1500
            }, y = 0; y < D.length; y++) e.event.special[D[y]] = x(D[y]);
        O && a.addEventListener("click", function(t) {
            var a, n, s, i, o, r, l = L.length,
                c = t.target;
            if (l)
                for (a = t.clientX, n = t.clientY, C = e.vmouse.clickDistanceThreshold, s = c; s;) {
                    for (i = 0; l > i; i++)
                        if (o = L[i], r = 0, s === c && Math.abs(o.x - a) < C && Math.abs(o.y - n) < C || e.data(s, T) === o.touchID) return t.preventDefault(), void t.stopPropagation();
                    s = s.parentNode
                }
        }, !0)
    }(e, t, a),
    function(e) {
        e.mobile = {}
    }(e),
    function(e) {
        var t = {
            touch: "ontouchend" in a
        };
        e.mobile.support = e.mobile.support || {}, e.extend(e.support, t), e.extend(e.mobile.support, t)
    }(e),
    function(e, t, n) {
        function s(t, a, s, i) {
            var o = s.type;
            s.type = a, i ? e.event.trigger(s, n, t) : e.event.dispatch.call(t, s), s.type = o
        }
        var i = e(a),
            o = e.mobile.support.touch,
            r = "touchmove scroll",
            l = o ? "touchstart" : "mousedown",
            c = o ? "touchend" : "mouseup",
            u = o ? "touchmove" : "mousemove";
        e.each("touchstart touchmove touchend tap taphold swipe swipeleft swiperight scrollstart scrollstop".split(" "), function(t, a) {
            e.fn[a] = function(e) {
                return e ? this.bind(a, e) : this.trigger(a)
            }, e.attrFn && (e.attrFn[a] = !0)
        }), e.event.special.scrollstart = {
            enabled: !0,
            setup: function() {
                function t(e, t) {
                    a = t, s(i, a ? "scrollstart" : "scrollstop", e)
                }
                var a, n, i = this,
                    o = e(i);
                o.bind(r, function(s) {
                    e.event.special.scrollstart.enabled && (a || t(s, !0), clearTimeout(n), n = setTimeout(function() {
                        t(s, !1)
                    }, 50))
                })
            },
            teardown: function() {
                e(this).unbind(r)
            }
        }, e.event.special.tap = {
            tapholdThreshold: 750,
            emitTapOnTaphold: !0,
            setup: function() {
                var t = this,
                    a = e(t),
                    n = !1;
                a.bind("vmousedown", function(o) {
                    function r() {
                        clearTimeout(u)
                    }

                    function l() {
                        r(), a.unbind("vclick", c).unbind("vmouseup", r), i.unbind("vmousecancel", l)
                    }

                    function c(e) {
                        l(), n || d !== e.target ? n && e.preventDefault() : s(t, "tap", e)
                    }
                    if (n = !1, o.which && 1 !== o.which) return !1;
                    var u, d = o.target;
                    a.bind("vmouseup", r).bind("vclick", c), i.bind("vmousecancel", l), u = setTimeout(function() {
                        e.event.special.tap.emitTapOnTaphold || (n = !0), s(t, "taphold", e.Event("taphold", {
                            target: d
                        }))
                    }, e.event.special.tap.tapholdThreshold)
                })
            },
            teardown: function() {
                e(this).unbind("vmousedown").unbind("vclick").unbind("vmouseup"), i.unbind("vmousecancel")
            }
        }, e.event.special.swipe = {
            scrollSupressionThreshold: 30,
            durationThreshold: 1e3,
            horizontalDistanceThreshold: 30,
            verticalDistanceThreshold: 30,
            getLocation: function(e) {
                var a = t.pageXOffset,
                    n = t.pageYOffset,
                    s = e.clientX,
                    i = e.clientY;
                return 0 === e.pageY && Math.floor(i) > Math.floor(e.pageY) || 0 === e.pageX && Math.floor(s) > Math.floor(e.pageX) ? (s -= a, i -= n) : (i < e.pageY - n || s < e.pageX - a) && (s = e.pageX - a, i = e.pageY - n), {
                    x: s,
                    y: i
                }
            },
            start: function(t) {
                var a = t.originalEvent.touches ? t.originalEvent.touches[0] : t,
                    n = e.event.special.swipe.getLocation(a);
                return {
                    time: (new Date).getTime(),
                    coords: [n.x, n.y],
                    origin: e(t.target)
                }
            },
            stop: function(t) {
                var a = t.originalEvent.touches ? t.originalEvent.touches[0] : t,
                    n = e.event.special.swipe.getLocation(a);
                return {
                    time: (new Date).getTime(),
                    coords: [n.x, n.y]
                }
            },
            handleSwipe: function(t, a, n, i) {
                if (a.time - t.time < e.event.special.swipe.durationThreshold && Math.abs(t.coords[0] - a.coords[0]) > e.event.special.swipe.horizontalDistanceThreshold && Math.abs(t.coords[1] - a.coords[1]) < e.event.special.swipe.verticalDistanceThreshold) {
                    var o = t.coords[0] > a.coords[0] ? "swipeleft" : "swiperight";
                    return s(n, "swipe", e.Event("swipe", {
                        target: i,
                        swipestart: t,
                        swipestop: a
                    }), !0), s(n, o, e.Event(o, {
                        target: i,
                        swipestart: t,
                        swipestop: a
                    }), !0), !0
                }
                return !1
            },
            eventInProgress: !1,
            setup: function() {
                var t, a = this,
                    n = e(a),
                    s = {};
                t = e.data(this, "mobile-events"), t || (t = {
                    length: 0
                }, e.data(this, "mobile-events", t)), t.length++, t.swipe = s, s.start = function(t) {
                    if (!e.event.special.swipe.eventInProgress) {
                        e.event.special.swipe.eventInProgress = !0;
                        var n, o = e.event.special.swipe.start(t),
                            r = t.target,
                            l = !1;
                        s.move = function(t) {
                            o && !t.isDefaultPrevented() && (n = e.event.special.swipe.stop(t), l || (l = e.event.special.swipe.handleSwipe(o, n, a, r), l && (e.event.special.swipe.eventInProgress = !1)), Math.abs(o.coords[0] - n.coords[0]) > e.event.special.swipe.scrollSupressionThreshold && t.preventDefault())
                        }, s.stop = function() {
                            l = !0, e.event.special.swipe.eventInProgress = !1, i.off(u, s.move), s.move = null
                        }, i.on(u, s.move).one(c, s.stop)
                    }
                }, n.on(l, s.start)
            },
            teardown: function() {
                var t, a;
                t = e.data(this, "mobile-events"), t && (a = t.swipe, delete t.swipe, t.length--, 0 === t.length && e.removeData(this, "mobile-events")), a && (a.start && e(this).off(l, a.start), a.move && i.off(u, a.move), a.stop && i.off(c, a.stop))
            }
        }, e.each({
            scrollstop: "scrollstart",
            taphold: "tap",
            swipeleft: "swipe.left",
            swiperight: "swipe.right"
        }, function(t, a) {
            e.event.special[t] = {
                setup: function() {
                    e(this).bind(a, e.noop)
                },
                teardown: function() {
                    e(this).unbind(a)
                }
            }
        })
    }(e, this)
}),
function() {
    var e = $.support.touch,
        t = e ? "touchstart" : "mousedown",
        a = e ? "touchend" : "mouseup",
        n = e ? "touchmove" : "mousemove";
    $.event.special.swipeupdown = {
        setup: function() {
            var e = this,
                s = $(e);
            s.bind(t, function(e) {
                function t(e) {
                    if (r) {
                        var t = e.originalEvent.touches ? e.originalEvent.touches[0] : e;
                        i = {
                            time: (new Date).getTime(),
                            coords: [t.pageX, t.pageY]
                        }
                    }
                }
                var i, o = e.originalEvent.touches ? e.originalEvent.touches[0] : e,
                    r = {
                        time: (new Date).getTime(),
                        coords: [o.pageX, o.pageY],
                        origin: $(e.target)
                    };
                s.bind(n, t).one(a, function() {
                    s.unbind(n, t), r && i && i.time - r.time < 1e3 && Math.abs(r.coords[1] - i.coords[1]) > 30 && Math.abs(r.coords[0] - i.coords[0]) < 75 && r.origin.trigger("swipeupdown").trigger(r.coords[1] > i.coords[1] ? "swipeup" : "swipedown"), r = i = void 0
                })
            })
        }
    }, $.each({
        swipedown: "swipeupdown",
        swipeup: "swipeupdown"
    }, function(e, t) {
        $.event.special[e] = {
            setup: function() {
                $(this).bind(t, $.noop)
            }
        }
    })
}(), jQuery.fn.extend({
    backspace: function(e, t) {
        var a;
        return a = jQuery.extend({
            callback: function() {},
            keypress: function() {},
            t: 100,
            e: .04
        }, t), this.each(function() {
            var t;
            return t = this, jQuery(t).queue(function() {
                var n, s;
                return n = t.tagName === "input".toUpperCase() || t.tagName === "textarea".toUpperCase() ? "value" : "innerHTML", (s = function(e) {
                    e ? (t[n] = t[n].slice(0, -1), a.keypress.call(t), setTimeout(function() {
                        return s(e - 1)
                    }, Math.random() * a.t)) : (a.callback.call(t), jQuery(t).dequeue())
                })(e)
            })
        })
    },
    typetype: function(e, t) {
        var a, n;
        return n = jQuery.extend({
            callback: function() {},
            keypress: function() {},
            t: 100,
            e: .04
        }, t), a = function(t) {
            return Math.random() * n.t * (e[t - 1] === e[t] ? 1.6 : "." === e[t - 1] ? 12 : "!" === e[t - 1] ? 12 : "?" === e[t - 1] ? 12 : "\n" === e[t - 1] ? 12 : "," === e[t - 1] ? 8 : ";" === e[t - 1] ? 8 : ":" === e[t - 1] ? 8 : " " === e[t - 1] ? 3 : 2)
        }, this.each(function() {
            var t;
            return t = this, jQuery(t).queue(function() {
                var s, i, o, r;
                return i = t.tagName === "input".toUpperCase() || t.tagName === "textarea".toUpperCase() ? "value" : "innerHTML", s = function(e, a) {
                    e ? (t[i] += e[0], n.keypress.call(t), setTimeout(function() {
                        return s(e.slice(1), a)
                    }, n.t)) : a()
                }, o = function(e, a) {
                    e ? (t[i] = t[i].slice(0, -1), n.keypress.call(t), setTimeout(function() {
                        return o(e - 1, a)
                    }, n.t)) : a()
                }, (r = function(l) {
                    var c, u;
                    e.length >= l ? (c = function() {
                        return setTimeout(function() {
                            return r(l)
                        }, a(l))
                    }, u = Math.random() / n.e, .3 > u && e[l - 1] !== e[l] && e.length > l + 4 ? s(e.slice(l, l + 4), function() {
                        return o(4, c)
                    }) : .7 > u && l > 1 && /[A-Z]/.test(e[l - 2] && e.length > l + 4) ? s(e[l - 1].toUpperCase() + e.slice(l, l + 4), function() {
                        return o(5, c)
                    }) : .5 > u && e[l - 1] !== e[l] && e.length > l ? s(e[l], function() {
                        return o(1, c)
                    }) : 1 > u && e[l - 1] !== e[l] && e.length > l ? s(e[l] + e[l - 1], function() {
                        return o(2, c)
                    }) : .5 > u && /[A-Z]/.test(e[l]) ? s(e[l].toLowerCase(), function() {
                        return o(1, c)
                    }) : (t[i] += e[l - 1], n.keypress.call(t), setTimeout(function() {
                        return r(l + 1)
                    }, a(l)))) : (n.callback.call(t), jQuery(t).dequeue())
                })(1)
            })
        })
    }
}), ! function(e) {
    e.preload = function() {
        var t = [],
            a = function(e) {
                for (var a = 0; a < t.length; a++)
                    if (t[a].src === e.src) return t[a];
                return t.push(e), e
            },
            n = function(e, t, a) {
                "function" == typeof t && t.call(e, a)
            };
        return function(t, s, i) {
            if ("undefined" != typeof t) {
                "string" == typeof t && (t = [t]), 2 === arguments.length && "function" == typeof s && (i = s, s = 0);
                var o, r = t.length;
                if (s > 0 && r > s && (o = t.slice(s, r), t = t.slice(0, s), r = t.length), !r) return void n(t, i, !0);
                for (var l, c = arguments.callee, u = 0, d = function() {
                        u++, u === r && (n(t, i, !o), c(o, s, i))
                    }, p = 0; p < t.length; p++) l = new Image, l.src = t[p], l = a(l), l.complete ? d() : e(l).on("load error", d)
            }
        }
    }();
    var t = function(t, a) {
        var n, s, i, o, r, l = [],
            c = new RegExp("url\\(['\"]?([^\"')]*)['\"]?\\)", "i");
        return a.recursive && (t = t.find("*").add(t)), t.each(function() {
            for (n = e(this), s = n.css("background-image") + "," + n.css("border-image-source"), s = s.split(","), r = 0; r < s.length; r++) i = s[r], -1 === i.indexOf("about:blank") && -1 === i.indexOf("data:image") && (o = c.exec(i), o && l.push(o[1]));
            "IMG" === this.nodeName && l.push(this.src)
        }), l
    };
    e.fn.preload = function() {
        var a, n;
        1 === arguments.length ? "object" == typeof arguments[0] ? a = arguments[0] : n = arguments[0] : arguments.length > 1 && (a = arguments[0], n = arguments[1]), a = e.extend({
            recursive: !0,
            part: 0
        }, a);
        var s = this,
            i = t(s, a);
        return e.preload(i, a.part, function(e) {
            e && "function" == typeof n && n.call(s.get())
        }), this
    }
}(jQuery), $(function() {
    function e(e) {
        e.mousedown(function(t) {
            e.addClass("grabbing"), t.preventDefault()
        }).mouseup(function() {
            e.removeClass("grabbing")
        })
    }

    function t() {
        d.removeClass("tealed").addClass("purpled")
    }

    function a() {
        d.removeClass("purpled").addClass("tealed")
    }

    function n() {
        p.addClass("triangling"), T.each(function(e) {
            $(this).css({
                "-webkit-transition-delay": e / M + "s",
                "transition-delay": e / M + "s"
            })
        }).delay(1e3 * D / M).queue(function() {
            p.removeClass("triangling"), T.css({
                "-webkit-transition-delay": "0s",
                "transition-delay": "0s"
            }).dequeue()
        })
    }

    function s(e) {
        var t = e;
        e > N ? e = 1 : 1 > e && (e = N), I.removeClass("prev_slide current_slide next_slide out_slide coming_up").each(function(t) {
            $(this).addClass(1 == e && t == N - 1 ? "prev_slide" : e === N && 0 === t ? "next_slide" : t == e - 2 ? "prev_slide" : t == e - 1 ? "current_slide" : t == e ? "next_slide" : "out_slide")
        }), t > P ? $(".next_slide").addClass("coming_up") : P > t && $(".prev_slide").addClass("coming_up"), t = P = e, Y.removeClass("active"), e > N ? Y.first().addClass("active") : Y.eq(e - 1).addClass("active")
    }

    function o() {
        s(P + 1)
    }

    function r() {
        s(P - 1)
    }

    function l(e) {
        w.removeClass("name_focused email_focused message_focused").addClass(e + " filling")
    }
    var c = 1e3,
        u = '<svg version="1.1" class="svg_triangle" preserveAspectRatio="xMaxYMax meet" viewBox="0 0 12.2 10" xml:space="preserve"><polygon points="0,10 6.1,0 12.2,10 " transform="scale(2) translate(-3.05,-4.98)" /></svg>',
        d = ($("#header"), $("body")),
        p = $(".page_2"),
        f = $(".page_3"),
        g = $(".page_4"),
        v = ($(".page_5"), ".pages"),
        h = ($(".pg2_article"), $(".pg2_article h1")),
        m = $(".ajax_wrapper"),
        _ = $(".cont_respond"),
        w = $("#pg5_contact"),
        b = $(".social_list"),
        x = c,
        C = function(e) {
            return d.hasClass("viewing_" + e) ? !0 : !1
        },
        y = function() {
            p.hasClass("typing_started") || C(2) && (h.empty(), p.removeClass("typing_done"))
        },
        k = function() {
            C(2) && (p.hasClass("typing_started") || p.hasClass("typing_done") || (p.addClass("typing_started"), h.empty().typetype("자주 묻는 질문", {
                t: 78,
                e: .05,
                callback: function() {
                    $(this).append("<em></em>").children("em").typetype("", {
                        t: 72,
                        callback: function() {
                            p.addClass("typing_done").removeClass("typing_started"), n()
                        }
                    })
                }
            })))
        };
    e(f), e(g), d.addClass("purpled"), f.on("swipeleft", a).on("swiperight", t), $(document).keydown(function(e) {
        C(3) && (37 == e.keyCode ? t() : 39 == e.keyCode && a())
    }), $(".arrow_left").mousedown(a), $(".arrow_right").mousedown(t);
    var T = $(".charts"),
        D = T.size(),
        S = 4,
        j = (D * S * 2 + 100) / 100,
        M = 4.7;
    T.each(function(e) {
        if (chartColor = $(this).data("color"), chartSize = $(this).data("size"), chartCover = $(this).data("cover"), chartFields = $(this).data("fields"), chartURLs = $(this).data("url"), chartSyntax = u + '<img src="images/' + chartCover + '"><ul></ul>', $(this).css("width", chartSize / D * (j / 2) + "%").prepend(chartSyntax).children("svg").css("fill", "#" + chartColor, "-webkit-transition-delay"), chartURLs)
            for (var e = 0; e < chartFields.length; e++) {
                var t = chartFields[e],
                    a = chartURLs[e];
                $(this).children("ul").append('<li class="has_link"><a href="' + a + '" target="_blank">' + t + "</a></li>")
            } else
                for (var e = 0; e < chartFields.length; e++) {
                    var n = chartFields[e];
                    $(this).children("ul").append("<li>" + n + "</li>")
                }
    }), $(".charts .svg_triangle polygon, .charts img, .charts ul, .charts h6").on("mouseenter", function() {
        $(this).closest(".charts").addClass("hoverd")
    }).on("mouseleave", function() {
        $(".charts").removeClass("hoverd")
    });
    var P = 1,
        E = $(".Abbas_slider"),
        I = $(".slides"),
        N = I.size();
    for (E.append('<nav class="slider_nav"><span class="backward"><svg xml:space="preserve" preserveAspectRatio="xMidYMax meet" viewBox="0 0 50 100"><polyline fill="none" points="50,0 15,50 50,100"/></svg></span><span class="forward"><svg xml:space="preserve" preserveAspectRatio="xMidYMax meet" viewBox="0 0 50 100"><polyline fill="none" points="0,0 35,50 0,100"/></svg></span><ul></ul></nav>'), i = 0; i < N; i++) E.children("nav").children("ul").append('<li class="slider_li_' + (i + 1) + '"><i></i></li>');
    var Y = $(".slider_nav ul li");
    Y.css("width", (102 - 2 * N) / N + "%").eq(P - 1).addClass("active"), I.each(function(e) {
        sliderImageLand = $(this).data("image-landscape"), sliderImagePort = $(this).data("image-portrait"), sliderTitle = $(this).data("title"), sliderHref = $(this).data("href"), sliderSyntax = '<img class="landscape" src="' + sliderImageLand + '"><img class="portrait" src="' + sliderImagePort + '"><span></span><i></i><figcaption>' + sliderTitle + "</figcaption>", $(this).prepend(sliderSyntax).attr("data-index", e + 1).addClass(function() {
            return 1 == P && e == N - 1 ? "prev_slide" : P === N && 0 === e ? "next_slide" : e == P - 2 ? "prev_slide" : e == P - 1 ? "current_slide" : e == P ? "next_slide" : "out_slide"
        })
    }), $(".slides i").mousedown(function() {
        var e = $(this).parent("figure");
        e.hasClass("rotated") ? e.removeClass("rotated") : e.addClass("rotated")
    }), $(".forward").mousedown(o), $(".backward").mousedown(r), Y.mousedown(function() {
        slider_num = $(this).index() + 1, s(slider_num)
    }), g.on("swipeleft", function(e) {
        Scrollable = $(e.target).parents(".scrollable").length, 1 != Scrollable && $(e.target).is(".scrollable"), Scrollable = 1, 1 != Scrollable && o()
    }).on("swiperight", function(e) {
        Scrollable = $(e.target).parents(".scrollable").length, 1 != Scrollable && $(e.target).is(".scrollable"), Scrollable = 1, 1 != Scrollable && r()
    }), $(document).keydown(function(e) {
        C(4) && (37 == e.keyCode ? r() : 39 == e.keyCode && o())
    }), m.append('<i class="close_icon"></i><section class="ajax_loading"></section><article class="ajax_article"></article>'), $(".loading_wrapper").children().clone().appendTo(".ajax_loading"), $(".slides a").click(function(e) {
        e.preventDefault();
        var t = $(e.target).attr("href");
        console.log(t);
        var a = e.target.parentNode.className,
            n = $(this).parent(".slides");
        n.hasClass("current_slide") && (a.indexOf("rotated") > -1 ? m.addClass("from_portrait").removeClass("fade_out").css("z-index", "6") : m.addClass("from_landscape").removeClass("fade_out").css("z-index", "6"), setTimeout(function() {
            g.addClass("ajax_opend")
        }, 10), $.ajax({
            url: t,
            cache: !1
        }).done(function(e) {
            m.addClass("fade_out").children(".ajax_article").html(e)
        }))
    }), $(".close_icon").click(function() {
        g.removeClass("ajax_opend"), setTimeout(function() {
            m.css("z-index", "0").removeClass("from_landscape from_portrait").children(".ajax_article").html("")
        }, 800)
    }), $(".cont_name").focus(function() {
        l("name_focused")
    }).blur(function() {
        $(this).val() || $(this).next().val() || $(this).next().next().val() || !w.hasClass("name_focused") || w.removeClass("filling")
    }), $(".cont_email").focus(function() {
        l("email_focused")
    }), $(".cont_message").focus(function() {
        l("message_focused")
    }).on("keyup focus blur mousedown", function() {
        $(this).val() ? w.addClass("filled") : w.removeClass("filled")
    }), $("#cont_form").on("keydown", "input", function(e) {
        13 == e.which && ($(this).next().focus(), e.preventDefault())
    }), $("#cont_form").submit(function(e) {
        e.preventDefault(), _.html('<mark><img src="images/form_load.gif"></mark>'), w.addClass("sent"), post_data = {
            user_name: $("input[name=name]").val(),
            user_email: $("input[name=email]").val(),
            msg: $("textarea[name=message]").val()
        }, $.post("php/contact_me.php", post_data, function(e) {
            "error" == e.type ? (output = '<mark class="error">' + e.text + "</mark>", w.addClass("back")) : output = '<mark class="success">' + e.text + "</mark>", _.html(output)
        }, "json")
    }), $(".cont_retry").click(function() {
        w.removeClass("sent back")
    }), b.mouseenter(function() {
        b.addClass("socialed"), clearTimeout(SocialTimeOut)
    }).mouseleave(function() {
        SocialTimeOut = setTimeout(function() {
            b.is(":hover") || b.removeClass("socialed")
        }, x)
    });
    var L, X, U, O;
    $(".nav_icon, #arrow_down, .forward, .backward").mousedown(function(e) {
        L = $(this), 0 === L.find(".ink").length && L.prepend("<span class='ink'></span>"), X = L.find(".ink"), X.removeClass("animate"), U = e.pageX - L.offset().left - X.width() / 2, O = e.pageY - L.offset().top - X.height() / 2, X.css({
            top: O + "px",
            left: U + "px"
        }).addClass("animate")
    });
    var z = ["images/aspireone_land.jpg", "images/pg1_left_light.svg", "images/pg1_left_dark.svg", "images/pg1_right.svg", "images/health-rnd_land.jpg", "images/slider_1_img.jpg", "images/slider_2_img.jpg", "images/slider_3_img.jpg", "images/slider_5_img.jpg", "images/pg3_bottom.jpg", "images/purple_body.svg", "images/purple_eyes.svg", "images/teal_body.svg", "images/teal_eyes.svg", "images/pg2_bg_bottom.svg", "images/slider_2_img_port.jpg", "images/slider_1_img_port.jpg", "images/slider_3_img_port.jpg"];
    $.preload(z, 9, function(e) {
        e && ($(".loading").addClass("fade_out"), setTimeout(function() {
            d.addClass("fixed")
        }, 500))
    }), $.fn.mainLayout = function(e) {
        function t(e, t) {
            deltaOfInterest = t;
            var a = (new Date).getTime();
            return l + c / 2 > a - r ? void e.preventDefault() : (deltaOfInterest < 0 ? n.moveDown() : n.moveUp(), void(r = a))
        }
        var a = e,
            n = $(".main"),
            s = $(v),
            i = s.length,
            o = 0,
            r = 0,
            l = 500;
        if ($.fn.transformPage = function(e, t) {
                d.removeClass("fixed"), $(this).css({
                    "-webkit-transform": "translate3d(0, " + t + "%, 0)",
                    transform: "translate3d(0, " + t + "%, 0)"
                }), y(), setTimeout(function() {
                    d.addClass("fixed"), k()
                }, c)
            }, $.fn.moveDown = function() {
                var e = $(this);
                index = $(v + ".active").data("page"), current = $(v + "[data-page='" + index + "']"), next = $(v + "[data-page='" + (index + 1) + "']"), next.length > 0 && (pos = 100 * index * -1, current.removeClass("active"), next.addClass("active"), d[0].className = d[0].className.replace(/\bviewing_\d.*?\b/g, ""), d.addClass("viewing_" + next.data("page")), e.transformPage(a, pos, next.data("page")))
            }, $.fn.moveUp = function() {
                var e = $(this);
                index = $(v + ".active").data("page"), current = $(v + "[data-page='" + index + "']"), next = $(v + "[data-page='" + (index - 1) + "']"), next.length > 0 && (pos = 100 * (next.data("page") - 1) * -1, current.removeClass("active"), next.addClass("active"), d[0].className = d[0].className.replace(/\bviewing_\d.*?\b/g, ""), d.addClass("viewing_" + next.data("page")), e.transformPage(a, pos, next.data("page")))
            }, $.fn.moveTo = function(e) {
                current = $(v + ".active"), next = $(v + "[data-page='" + e + "']"), next.length > 0 && (current.removeClass("active"), next.addClass("active"), d[0].className = d[0].className.replace(/\bviewing_\d.*?\b/g, ""), d.addClass("viewing_" + next.data("page")), pos = 100 * (e - 1) * -1, n.transformPage(a, pos, e))
            }, n.addClass("main-wrapper"), $.each(s, function(e) {
                $(this).css({
                    top: o + "%"
                }).addClass("section").attr("data-page", e + 1), o += 100
            }), $("#header , .pages").on("swipeup", function(e) {
                Scrollable = $(e.target).parents(".scrollable").length, 1 != Scrollable && $(e.target).is(".scrollable") && (Scrollable = 1), 1 != Scrollable && n.moveDown()
            }).on("swipedown", function(e) {
                Scrollable = $(e.target).parents(".scrollable").length, 1 != Scrollable && $(e.target).is(".scrollable") && (Scrollable = 1), 1 != Scrollable && n.moveUp()
            }), "" !== window.location.hash && "#home" !== window.location.hash) {
            switch (init_index = window.location.hash.replace("#", ""), init_index) {
                case "home":
                    init_index = 1;
                    break;
                case "about":
                    init_index = 2;
                    break;
                case "what-i-do":
                    init_index = 3;
                    break;
                case "portfolio":
                    init_index = 4;
                    break;
                case "contact":
                    init_index = 5
            }
            parseInt(init_index) <= i && parseInt(init_index) > 0 ? ($(v + "[data-page='" + init_index + "']").addClass("active"), d.addClass("viewing_" + init_index), next = $(v + "[data-page='" + init_index + "']"), next && (next.addClass("active"), d[0].className = d[0].className.replace(/\bviewing_\d.*?\b/g, ""), d.addClass("viewing_" + next.data("page"))), pos = 100 * (init_index - 1) * -1, n.transformPage(a, pos, init_index)) : ($(v + "[data-page='1']").addClass("active"), d.addClass("viewing_1"))
        } else $(v + "[data-page='1']").addClass("active"), d.addClass("viewing_1");
        return $(document).bind("mousewheel DOMMouseScroll MozMousePixelScroll", function(e) {
            if (Scrollable = $(e.target).parents(".scrollable").length, 1 != Scrollable && $(e.target).is(".scrollable") && (Scrollable = 1), 1 != Scrollable) {
                e.preventDefault();
                var a = e.originalEvent.wheelDelta || -e.originalEvent.detail;
                t(e, a)
            }
        }), $(".nav_icon").mousedown(function() {
            console.log($(this).index()), main_nav_index_num = $(this).index() < 2 ? $(this).index() + 2 : 2 === $(this).index() ? 1 : $(this).index() + 1, n.moveTo(main_nav_index_num)
        }), $("#main_logo_svg").mousedown(function() {
            n.moveTo(1)
        }), $("#arrow_down").mousedown(function() {
            n.moveTo(2)
        }), $(document).keydown(function(e) {
            var t = e.target.tagName.toLowerCase();
            switch (e.which) {
                case 38:
                    "input" != t && "textarea" != t && n.moveUp();
                    break;
                case 40:
                    "input" != t && "textarea" != t && n.moveDown();
                    break;
                case 32:
                    "input" != t && "textarea" != t && n.moveDown();
                    break;
                case 33:
                    "input" != t && "textarea" != t && n.moveUp();
                    break;
                case 34:
                    "input" != t && "textarea" != t && n.moveDown();
                    break;
                case 36:
                    n.moveTo(1);
                    break;
                case 35:
                    n.moveTo(i);
                    break;
                default:
                    return
            }
        }), !1
    }, $.fn.mainLayout()
});