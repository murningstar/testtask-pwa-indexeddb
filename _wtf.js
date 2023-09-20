var Ss = Object.defineProperty;
var ks = (e, t, r) =>
    t in e
        ? Ss(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r })
        : (e[t] = r);
var yo = (e, t, r) => (ks(e, typeof t != "symbol" ? t + "" : t, r), r);
import {
    v as _n,
    F as Mt,
    C as si,
    z as Rs,
    A as it,
    c as K,
    d as ge,
    B as ai,
    o as er,
    b as tr,
    D as Ps,
    E as Wr,
    G as Zn,
    H as Ur,
    I as Es,
    J as Qn,
    K as ze,
    L as Ts,
    M as Wt,
    r as Q,
    N as Br,
    e as N,
    O as X,
    P as Os,
    Q as li,
    R as qr,
    S as F,
    T as I,
    U as $r,
    V as zs,
    W as et,
    X as Cn,
    Y as tt,
    Z as ui,
    _ as V,
    $ as Rt,
    a0 as Gr,
    a1 as Is,
    a2 as Ds,
    a3 as Bs,
    a4 as ci,
    a5 as $s,
    a6 as As,
    a7 as Fs,
    a8 as js,
    a9 as Ms,
    aa as Ks,
    ab as Hs,
    ac as Cr,
    ad as Ns,
    ae as Ls,
    af as Vs,
    ag as Y,
    ah as Ws,
    ai as Us,
    k as ue,
    l as he,
    m as fe,
    q as me,
    s as ye,
    aj as Ee,
    ak as ln,
    al as qs,
    am as un,
    x as Gs,
    y as Ys,
    an as Xs,
} from "./entry.d2c572b4.js";
import { _ as Zs } from "./plugin-vueexport-helper.c27b6911.js";
function Qs(e) {
    return e.composedPath()[0] || null;
}
function Js(e, t = "default", r = []) {
    const o = e.$slots[t];
    return o === void 0 ? r : o();
}
function xo(e, t = [], r) {
    const n = {};
    return (
        t.forEach((o) => {
            n[o] = e[o];
        }),
        Object.assign(n, r)
    );
}
function Ar(e, t = !0, r = []) {
    return (
        e.forEach((n) => {
            if (n !== null) {
                if (typeof n != "object") {
                    (typeof n == "string" || typeof n == "number") &&
                        r.push(_n(String(n)));
                    return;
                }
                if (Array.isArray(n)) {
                    Ar(n, t, r);
                    return;
                }
                if (n.type === Mt) {
                    if (n.children === null) return;
                    Array.isArray(n.children) && Ar(n.children, t, r);
                } else n.type !== si && r.push(n);
            }
        }),
        r
    );
}
function at(e, ...t) {
    if (Array.isArray(e)) e.forEach((r) => at(r, ...t));
    else return e(...t);
}
function Yr(e) {
    return e.some((t) =>
        Rs(t) ? !(t.type === si || (t.type === Mt && !Yr(t.children))) : !0
    )
        ? e
        : null;
}
function wo(e, t, r) {
    return (e && Yr(e(t))) || r(t);
}
function Sn(e, t) {
    const r = e && Yr(e());
    return t(r || null);
}
function ea(e) {
    return !(e && Yr(e()));
}
const ta = /^(\d|\.)+$/,
    _o = /(\d|\.)+/;
function ra(e, { c: t = 1, offset: r = 0, attachPx: n = !0 } = {}) {
    if (typeof e == "number") {
        const o = (e + r) * t;
        return o === 0 ? "0" : `${o}px`;
    } else if (typeof e == "string")
        if (ta.test(e)) {
            const o = (Number(e) + r) * t;
            return n ? (o === 0 ? "0" : `${o}px`) : `${o}`;
        } else {
            const o = _o.exec(e);
            return o ? e.replace(_o, String((Number(o[0]) + r) * t)) : e;
        }
    return e;
}
function Co(e) {
    return e.replace(/#|\(|\)|,|\s/g, "_");
}
const Xr = typeof document < "u" && typeof window < "u";
function Sr(e) {
    return e.composedPath()[0];
}
const na = { mousemoveoutside: new WeakMap(), clickoutside: new WeakMap() };
function oa(e, t, r) {
    if (e === "mousemoveoutside") {
        const n = (o) => {
            t.contains(Sr(o)) || r(o);
        };
        return { mousemove: n, touchstart: n };
    } else if (e === "clickoutside") {
        let n = !1;
        const o = (s) => {
                n = !t.contains(Sr(s));
            },
            i = (s) => {
                n && (t.contains(Sr(s)) || r(s));
            };
        return { mousedown: o, mouseup: i, touchstart: o, touchend: i };
    }
    return (
        console.error(
            `[evtd/create-trap-handler]: name \`${e}\` is invalid. This could be a bug of evtd.`
        ),
        {}
    );
}
function di(e, t, r) {
    const n = na[e];
    let o = n.get(t);
    o === void 0 && n.set(t, (o = new WeakMap()));
    let i = o.get(r);
    return i === void 0 && o.set(r, (i = oa(e, t, r))), i;
}
function ia(e, t, r, n) {
    if (e === "mousemoveoutside" || e === "clickoutside") {
        const o = di(e, t, r);
        return (
            Object.keys(o).forEach((i) => {
                _t(i, document, o[i], n);
            }),
            !0
        );
    }
    return !1;
}
function sa(e, t, r, n) {
    if (e === "mousemoveoutside" || e === "clickoutside") {
        const o = di(e, t, r);
        return (
            Object.keys(o).forEach((i) => {
                Ct(i, document, o[i], n);
            }),
            !0
        );
    }
    return !1;
}
function aa() {
    if (typeof window > "u") return { on: () => {}, off: () => {} };
    const e = new WeakMap(),
        t = new WeakMap();
    function r() {
        e.set(this, !0);
    }
    function n() {
        e.set(this, !0), t.set(this, !0);
    }
    function o(c, _, w) {
        const T = c[_];
        return (
            (c[_] = function () {
                return w.apply(c, arguments), T.apply(c, arguments);
            }),
            c
        );
    }
    function i(c, _) {
        c[_] = Event.prototype[_];
    }
    const s = new WeakMap(),
        l = Object.getOwnPropertyDescriptor(Event.prototype, "currentTarget");
    function a() {
        var c;
        return (c = s.get(this)) !== null && c !== void 0 ? c : null;
    }
    function h(c, _) {
        l !== void 0 &&
            Object.defineProperty(c, "currentTarget", {
                configurable: !0,
                enumerable: !0,
                get: _ ?? l.get,
            });
    }
    const u = { bubble: {}, capture: {} },
        d = {};
    function f() {
        const c = function (_) {
            const { type: w, eventPhase: T, bubbles: P } = _,
                z = Sr(_);
            if (T === 2) return;
            const M = T === 1 ? "capture" : "bubble";
            let $ = z;
            const U = [];
            for (; $ === null && ($ = window), U.push($), $ !== window; )
                $ = $.parentNode || null;
            const G = u.capture[w],
                A = u.bubble[w];
            if (
                (o(_, "stopPropagation", r),
                o(_, "stopImmediatePropagation", n),
                h(_, a),
                M === "capture")
            ) {
                if (G === void 0) return;
                for (let J = U.length - 1; J >= 0 && !e.has(_); --J) {
                    const ae = U[J],
                        le = G.get(ae);
                    if (le !== void 0) {
                        s.set(_, ae);
                        for (const ke of le) {
                            if (t.has(_)) break;
                            ke(_);
                        }
                    }
                    if (J === 0 && !P && A !== void 0) {
                        const ke = A.get(ae);
                        if (ke !== void 0)
                            for (const Le of ke) {
                                if (t.has(_)) break;
                                Le(_);
                            }
                    }
                }
            } else if (M === "bubble") {
                if (A === void 0) return;
                for (let J = 0; J < U.length && !e.has(_); ++J) {
                    const ae = U[J],
                        le = A.get(ae);
                    if (le !== void 0) {
                        s.set(_, ae);
                        for (const ke of le) {
                            if (t.has(_)) break;
                            ke(_);
                        }
                    }
                }
            }
            i(_, "stopPropagation"), i(_, "stopImmediatePropagation"), h(_);
        };
        return (c.displayName = "evtdUnifiedHandler"), c;
    }
    function b() {
        const c = function (_) {
            const { type: w, eventPhase: T } = _;
            if (T !== 2) return;
            const P = d[w];
            P !== void 0 && P.forEach((z) => z(_));
        };
        return (c.displayName = "evtdUnifiedWindowEventHandler"), c;
    }
    const x = f(),
        g = b();
    function m(c, _) {
        const w = u[c];
        return (
            w[_] === void 0 &&
                ((w[_] = new Map()),
                window.addEventListener(_, x, c === "capture")),
            w[_]
        );
    }
    function v(c) {
        return (
            d[c] === void 0 &&
                ((d[c] = new Set()), window.addEventListener(c, g)),
            d[c]
        );
    }
    function p(c, _) {
        let w = c.get(_);
        return w === void 0 && c.set(_, (w = new Set())), w;
    }
    function y(c, _, w, T) {
        const P = u[_][w];
        if (P !== void 0) {
            const z = P.get(c);
            if (z !== void 0 && z.has(T)) return !0;
        }
        return !1;
    }
    function C(c, _) {
        const w = d[c];
        return !!(w !== void 0 && w.has(_));
    }
    function S(c, _, w, T) {
        let P;
        if (
            (typeof T == "object" && T.once === !0
                ? (P = (G) => {
                      R(c, _, P, T), w(G);
                  })
                : (P = w),
            ia(c, _, P, T))
        )
            return;
        const M =
                T === !0 || (typeof T == "object" && T.capture === !0)
                    ? "capture"
                    : "bubble",
            $ = m(M, c),
            U = p($, _);
        if ((U.has(P) || U.add(P), _ === window)) {
            const G = v(c);
            G.has(P) || G.add(P);
        }
    }
    function R(c, _, w, T) {
        if (sa(c, _, w, T)) return;
        const z = T === !0 || (typeof T == "object" && T.capture === !0),
            M = z ? "capture" : "bubble",
            $ = m(M, c),
            U = p($, _);
        if (_ === window && !y(_, z ? "bubble" : "capture", c, w) && C(c, w)) {
            const A = d[c];
            A.delete(w),
                A.size === 0 &&
                    (window.removeEventListener(c, g), (d[c] = void 0));
        }
        U.has(w) && U.delete(w),
            U.size === 0 && $.delete(_),
            $.size === 0 &&
                (window.removeEventListener(c, x, M === "capture"),
                (u[M][c] = void 0));
    }
    return { on: S, off: R };
}
const { on: _t, off: Ct } = aa();
function Jn(e, t) {
    return (
        it(e, (r) => {
            r !== void 0 && (t.value = r);
        }),
        K(() => (e.value === void 0 ? t.value : e.value))
    );
}
function So(e, t) {
    console.error(`[vueuc/${e}]: ${t}`);
}
var lt = [],
    la = function () {
        return lt.some(function (e) {
            return e.activeTargets.length > 0;
        });
    },
    ua = function () {
        return lt.some(function (e) {
            return e.skippedTargets.length > 0;
        });
    },
    ko = "ResizeObserver loop completed with undelivered notifications.",
    ca = function () {
        var e;
        typeof ErrorEvent == "function"
            ? (e = new ErrorEvent("error", { message: ko }))
            : ((e = document.createEvent("Event")),
              e.initEvent("error", !1, !1),
              (e.message = ko)),
            window.dispatchEvent(e);
    },
    Ut;
(function (e) {
    (e.BORDER_BOX = "border-box"),
        (e.CONTENT_BOX = "content-box"),
        (e.DEVICE_PIXEL_CONTENT_BOX = "device-pixel-content-box");
})(Ut || (Ut = {}));
var ut = function (e) {
        return Object.freeze(e);
    },
    da = (function () {
        function e(t, r) {
            (this.inlineSize = t), (this.blockSize = r), ut(this);
        }
        return e;
    })(),
    fi = (function () {
        function e(t, r, n, o) {
            return (
                (this.x = t),
                (this.y = r),
                (this.width = n),
                (this.height = o),
                (this.top = this.y),
                (this.left = this.x),
                (this.bottom = this.top + this.height),
                (this.right = this.left + this.width),
                ut(this)
            );
        }
        return (
            (e.prototype.toJSON = function () {
                var t = this,
                    r = t.x,
                    n = t.y,
                    o = t.top,
                    i = t.right,
                    s = t.bottom,
                    l = t.left,
                    a = t.width,
                    h = t.height;
                return {
                    x: r,
                    y: n,
                    top: o,
                    right: i,
                    bottom: s,
                    left: l,
                    width: a,
                    height: h,
                };
            }),
            (e.fromRect = function (t) {
                return new e(t.x, t.y, t.width, t.height);
            }),
            e
        );
    })(),
    eo = function (e) {
        return e instanceof SVGElement && "getBBox" in e;
    },
    hi = function (e) {
        if (eo(e)) {
            var t = e.getBBox(),
                r = t.width,
                n = t.height;
            return !r && !n;
        }
        var o = e,
            i = o.offsetWidth,
            s = o.offsetHeight;
        return !(i || s || e.getClientRects().length);
    },
    Ro = function (e) {
        var t;
        if (e instanceof Element) return !0;
        var r =
            (t = e == null ? void 0 : e.ownerDocument) === null || t === void 0
                ? void 0
                : t.defaultView;
        return !!(r && e instanceof r.Element);
    },
    fa = function (e) {
        switch (e.tagName) {
            case "INPUT":
                if (e.type !== "image") break;
            case "VIDEO":
            case "AUDIO":
            case "EMBED":
            case "OBJECT":
            case "CANVAS":
            case "IFRAME":
            case "IMG":
                return !0;
        }
        return !1;
    },
    pi = typeof window < "u" ? window : {},
    cr = new WeakMap(),
    Po = /auto|scroll/,
    ha = /^tb|vertical/,
    pa = /msie|trident/i.test(globalThis.navigator && pi.navigator.userAgent),
    Te = function (e) {
        return parseFloat(e || "0");
    },
    Pt = function (e, t, r) {
        return (
            e === void 0 && (e = 0),
            t === void 0 && (t = 0),
            r === void 0 && (r = !1),
            new da((r ? t : e) || 0, (r ? e : t) || 0)
        );
    },
    Eo = ut({
        devicePixelContentBoxSize: Pt(),
        borderBoxSize: Pt(),
        contentBoxSize: Pt(),
        contentRect: new fi(0, 0, 0, 0),
    }),
    vi = function (e, t) {
        if ((t === void 0 && (t = !1), cr.has(e) && !t)) return cr.get(e);
        if (hi(e)) return cr.set(e, Eo), Eo;
        var r = getComputedStyle(e),
            n = eo(e) && e.ownerSVGElement && e.getBBox(),
            o = !pa && r.boxSizing === "border-box",
            i = ha.test(r.writingMode || ""),
            s = !n && Po.test(r.overflowY || ""),
            l = !n && Po.test(r.overflowX || ""),
            a = n ? 0 : Te(r.paddingTop),
            h = n ? 0 : Te(r.paddingRight),
            u = n ? 0 : Te(r.paddingBottom),
            d = n ? 0 : Te(r.paddingLeft),
            f = n ? 0 : Te(r.borderTopWidth),
            b = n ? 0 : Te(r.borderRightWidth),
            x = n ? 0 : Te(r.borderBottomWidth),
            g = n ? 0 : Te(r.borderLeftWidth),
            m = d + h,
            v = a + u,
            p = g + b,
            y = f + x,
            C = l ? e.offsetHeight - y - e.clientHeight : 0,
            S = s ? e.offsetWidth - p - e.clientWidth : 0,
            R = o ? m + p : 0,
            c = o ? v + y : 0,
            _ = n ? n.width : Te(r.width) - R - S,
            w = n ? n.height : Te(r.height) - c - C,
            T = _ + m + S + p,
            P = w + v + C + y,
            z = ut({
                devicePixelContentBoxSize: Pt(
                    Math.round(_ * devicePixelRatio),
                    Math.round(w * devicePixelRatio),
                    i
                ),
                borderBoxSize: Pt(T, P, i),
                contentBoxSize: Pt(_, w, i),
                contentRect: new fi(d, a, _, w),
            });
        return cr.set(e, z), z;
    },
    bi = function (e, t, r) {
        var n = vi(e, r),
            o = n.borderBoxSize,
            i = n.contentBoxSize,
            s = n.devicePixelContentBoxSize;
        switch (t) {
            case Ut.DEVICE_PIXEL_CONTENT_BOX:
                return s;
            case Ut.BORDER_BOX:
                return o;
            default:
                return i;
        }
    },
    va = (function () {
        function e(t) {
            var r = vi(t);
            (this.target = t),
                (this.contentRect = r.contentRect),
                (this.borderBoxSize = ut([r.borderBoxSize])),
                (this.contentBoxSize = ut([r.contentBoxSize])),
                (this.devicePixelContentBoxSize = ut([
                    r.devicePixelContentBoxSize,
                ]));
        }
        return e;
    })(),
    gi = function (e) {
        if (hi(e)) return 1 / 0;
        for (var t = 0, r = e.parentNode; r; ) (t += 1), (r = r.parentNode);
        return t;
    },
    ba = function () {
        var e = 1 / 0,
            t = [];
        lt.forEach(function (s) {
            if (s.activeTargets.length !== 0) {
                var l = [];
                s.activeTargets.forEach(function (h) {
                    var u = new va(h.target),
                        d = gi(h.target);
                    l.push(u),
                        (h.lastReportedSize = bi(h.target, h.observedBox)),
                        d < e && (e = d);
                }),
                    t.push(function () {
                        s.callback.call(s.observer, l, s.observer);
                    }),
                    s.activeTargets.splice(0, s.activeTargets.length);
            }
        });
        for (var r = 0, n = t; r < n.length; r++) {
            var o = n[r];
            o();
        }
        return e;
    },
    To = function (e) {
        lt.forEach(function (r) {
            r.activeTargets.splice(0, r.activeTargets.length),
                r.skippedTargets.splice(0, r.skippedTargets.length),
                r.observationTargets.forEach(function (o) {
                    o.isActive() &&
                        (gi(o.target) > e
                            ? r.activeTargets.push(o)
                            : r.skippedTargets.push(o));
                });
        });
    },
    ga = function () {
        var e = 0;
        for (To(e); la(); ) (e = ba()), To(e);
        return ua() && ca(), e > 0;
    },
    cn,
    mi = [],
    ma = function () {
        return mi.splice(0).forEach(function (e) {
            return e();
        });
    },
    ya = function (e) {
        if (!cn) {
            var t = 0,
                r = document.createTextNode(""),
                n = { characterData: !0 };
            new MutationObserver(function () {
                return ma();
            }).observe(r, n),
                (cn = function () {
                    r.textContent = "".concat(t ? t-- : t++);
                });
        }
        mi.push(e), cn();
    },
    xa = function (e) {
        ya(function () {
            requestAnimationFrame(e);
        });
    },
    kr = 0,
    wa = function () {
        return !!kr;
    },
    _a = 250,
    Ca = { attributes: !0, characterData: !0, childList: !0, subtree: !0 },
    Oo = [
        "resize",
        "load",
        "transitionend",
        "animationend",
        "animationstart",
        "animationiteration",
        "keyup",
        "keydown",
        "mouseup",
        "mousedown",
        "mouseover",
        "mouseout",
        "blur",
        "focus",
    ],
    zo = function (e) {
        return e === void 0 && (e = 0), Date.now() + e;
    },
    dn = !1,
    Sa = (function () {
        function e() {
            var t = this;
            (this.stopped = !0),
                (this.listener = function () {
                    return t.schedule();
                });
        }
        return (
            (e.prototype.run = function (t) {
                var r = this;
                if ((t === void 0 && (t = _a), !dn)) {
                    dn = !0;
                    var n = zo(t);
                    xa(function () {
                        var o = !1;
                        try {
                            o = ga();
                        } finally {
                            if (((dn = !1), (t = n - zo()), !wa())) return;
                            o ? r.run(1e3) : t > 0 ? r.run(t) : r.start();
                        }
                    });
                }
            }),
            (e.prototype.schedule = function () {
                this.stop(), this.run();
            }),
            (e.prototype.observe = function () {
                var t = this,
                    r = function () {
                        return (
                            t.observer && t.observer.observe(document.body, Ca)
                        );
                    };
                document.body
                    ? r()
                    : pi.addEventListener("DOMContentLoaded", r);
            }),
            (e.prototype.start = function () {
                var t = this;
                this.stopped &&
                    ((this.stopped = !1),
                    (this.observer = new MutationObserver(this.listener)),
                    this.observe(),
                    Oo.forEach(function (r) {
                        return globalThis.addEventListener(r, t.listener, !0);
                    }));
            }),
            (e.prototype.stop = function () {
                var t = this;
                this.stopped ||
                    (this.observer && this.observer.disconnect(),
                    Oo.forEach(function (r) {
                        return globalThis.removeEventListener(
                            r,
                            t.listener,
                            !0
                        );
                    }),
                    (this.stopped = !0));
            }),
            e
        );
    })(),
    kn = new Sa(),
    Io = function (e) {
        !kr && e > 0 && kn.start(), (kr += e), !kr && kn.stop();
    },
    ka = function (e) {
        return !eo(e) && !fa(e) && getComputedStyle(e).display === "inline";
    },
    Ra = (function () {
        function e(t, r) {
            (this.target = t),
                (this.observedBox = r || Ut.CONTENT_BOX),
                (this.lastReportedSize = { inlineSize: 0, blockSize: 0 });
        }
        return (
            (e.prototype.isActive = function () {
                var t = bi(this.target, this.observedBox, !0);
                return (
                    ka(this.target) && (this.lastReportedSize = t),
                    this.lastReportedSize.inlineSize !== t.inlineSize ||
                        this.lastReportedSize.blockSize !== t.blockSize
                );
            }),
            e
        );
    })(),
    Pa = (function () {
        function e(t, r) {
            (this.activeTargets = []),
                (this.skippedTargets = []),
                (this.observationTargets = []),
                (this.observer = t),
                (this.callback = r);
        }
        return e;
    })(),
    dr = new WeakMap(),
    Do = function (e, t) {
        for (var r = 0; r < e.length; r += 1) if (e[r].target === t) return r;
        return -1;
    },
    fr = (function () {
        function e() {}
        return (
            (e.connect = function (t, r) {
                var n = new Pa(t, r);
                dr.set(t, n);
            }),
            (e.observe = function (t, r, n) {
                var o = dr.get(t),
                    i = o.observationTargets.length === 0;
                Do(o.observationTargets, r) < 0 &&
                    (i && lt.push(o),
                    o.observationTargets.push(new Ra(r, n && n.box)),
                    Io(1),
                    kn.schedule());
            }),
            (e.unobserve = function (t, r) {
                var n = dr.get(t),
                    o = Do(n.observationTargets, r),
                    i = n.observationTargets.length === 1;
                o >= 0 &&
                    (i && lt.splice(lt.indexOf(n), 1),
                    n.observationTargets.splice(o, 1),
                    Io(-1));
            }),
            (e.disconnect = function (t) {
                var r = this,
                    n = dr.get(t);
                n.observationTargets.slice().forEach(function (o) {
                    return r.unobserve(t, o.target);
                }),
                    n.activeTargets.splice(0, n.activeTargets.length);
            }),
            e
        );
    })(),
    Ea = (function () {
        function e(t) {
            if (arguments.length === 0)
                throw new TypeError(
                    "Failed to construct 'ResizeObserver': 1 argument required, but only 0 present."
                );
            if (typeof t != "function")
                throw new TypeError(
                    "Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function."
                );
            fr.connect(this, t);
        }
        return (
            (e.prototype.observe = function (t, r) {
                if (arguments.length === 0)
                    throw new TypeError(
                        "Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present."
                    );
                if (!Ro(t))
                    throw new TypeError(
                        "Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element"
                    );
                fr.observe(this, t, r);
            }),
            (e.prototype.unobserve = function (t) {
                if (arguments.length === 0)
                    throw new TypeError(
                        "Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present."
                    );
                if (!Ro(t))
                    throw new TypeError(
                        "Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element"
                    );
                fr.unobserve(this, t);
            }),
            (e.prototype.disconnect = function () {
                fr.disconnect(this);
            }),
            (e.toString = function () {
                return "function ResizeObserver () { [polyfill code] }";
            }),
            e
        );
    })();
class Ta {
    constructor() {
        (this.handleResize = this.handleResize.bind(this)),
            (this.observer = new ((typeof window < "u" &&
                window.ResizeObserver) ||
                Ea)(this.handleResize)),
            (this.elHandlersMap = new Map());
    }
    handleResize(t) {
        for (const r of t) {
            const n = this.elHandlersMap.get(r.target);
            n !== void 0 && n(r);
        }
    }
    registerHandler(t, r) {
        this.elHandlersMap.set(t, r), this.observer.observe(t);
    }
    unregisterHandler(t) {
        this.elHandlersMap.has(t) &&
            (this.elHandlersMap.delete(t), this.observer.unobserve(t));
    }
}
const Bo = new Ta(),
    $o = ge({
        name: "ResizeObserver",
        props: { onResize: Function },
        setup(e) {
            let t = !1;
            const r = ai().proxy;
            function n(o) {
                const { onResize: i } = e;
                i !== void 0 && i(o);
            }
            er(() => {
                const o = r.$el;
                if (o === void 0) {
                    So("resize-observer", "$el does not exist.");
                    return;
                }
                if (
                    o.nextElementSibling !== o.nextSibling &&
                    o.nodeType === 3 &&
                    o.nodeValue !== ""
                ) {
                    So(
                        "resize-observer",
                        "$el can not be observed (it may be a text node)."
                    );
                    return;
                }
                o.nextElementSibling !== null &&
                    (Bo.registerHandler(o.nextElementSibling, n), (t = !0));
            }),
                tr(() => {
                    t && Bo.unregisterHandler(r.$el.nextElementSibling);
                });
        },
        render() {
            return Ps(this.$slots, "default");
        },
    }),
    Ao = Ur("n-form-item");
function to(
    e,
    { defaultSize: t = "medium", mergedSize: r, mergedDisabled: n } = {}
) {
    const o = Wr(Ao, null);
    Zn(Ao, null);
    const i = K(
            r
                ? () => r(o)
                : () => {
                      const { size: a } = e;
                      if (a) return a;
                      if (o) {
                          const { mergedSize: h } = o;
                          if (h.value !== void 0) return h.value;
                      }
                      return t;
                  }
        ),
        s = K(
            n
                ? () => n(o)
                : () => {
                      const { disabled: a } = e;
                      return a !== void 0 ? a : o ? o.disabled.value : !1;
                  }
        ),
        l = K(() => {
            const { status: a } = e;
            return a || (o == null ? void 0 : o.mergedValidationStatus.value);
        });
    return (
        tr(() => {
            o && o.restoreValidation();
        }),
        {
            mergedSizeRef: i,
            mergedDisabledRef: s,
            mergedStatusRef: l,
            nTriggerFormBlur() {
                o && o.handleContentBlur();
            },
            nTriggerFormChange() {
                o && o.handleContentChange();
            },
            nTriggerFormFocus() {
                o && o.handleContentFocus();
            },
            nTriggerFormInput() {
                o && o.handleContentInput();
            },
        }
    );
}
function Oa(e) {
    return Es(Qn(e).toLowerCase());
}
function za(e, t, r, n) {
    var o = -1,
        i = e == null ? 0 : e.length;
    for (n && i && (r = e[++o]); ++o < i; ) r = t(r, e[o], o, e);
    return r;
}
function Ia(e) {
    return function (t) {
        return e == null ? void 0 : e[t];
    };
}
var Da = {
        À: "A",
        Á: "A",
        Â: "A",
        Ã: "A",
        Ä: "A",
        Å: "A",
        à: "a",
        á: "a",
        â: "a",
        ã: "a",
        ä: "a",
        å: "a",
        Ç: "C",
        ç: "c",
        Ð: "D",
        ð: "d",
        È: "E",
        É: "E",
        Ê: "E",
        Ë: "E",
        è: "e",
        é: "e",
        ê: "e",
        ë: "e",
        Ì: "I",
        Í: "I",
        Î: "I",
        Ï: "I",
        ì: "i",
        í: "i",
        î: "i",
        ï: "i",
        Ñ: "N",
        ñ: "n",
        Ò: "O",
        Ó: "O",
        Ô: "O",
        Õ: "O",
        Ö: "O",
        Ø: "O",
        ò: "o",
        ó: "o",
        ô: "o",
        õ: "o",
        ö: "o",
        ø: "o",
        Ù: "U",
        Ú: "U",
        Û: "U",
        Ü: "U",
        ù: "u",
        ú: "u",
        û: "u",
        ü: "u",
        Ý: "Y",
        ý: "y",
        ÿ: "y",
        Æ: "Ae",
        æ: "ae",
        Þ: "Th",
        þ: "th",
        ß: "ss",
        Ā: "A",
        Ă: "A",
        Ą: "A",
        ā: "a",
        ă: "a",
        ą: "a",
        Ć: "C",
        Ĉ: "C",
        Ċ: "C",
        Č: "C",
        ć: "c",
        ĉ: "c",
        ċ: "c",
        č: "c",
        Ď: "D",
        Đ: "D",
        ď: "d",
        đ: "d",
        Ē: "E",
        Ĕ: "E",
        Ė: "E",
        Ę: "E",
        Ě: "E",
        ē: "e",
        ĕ: "e",
        ė: "e",
        ę: "e",
        ě: "e",
        Ĝ: "G",
        Ğ: "G",
        Ġ: "G",
        Ģ: "G",
        ĝ: "g",
        ğ: "g",
        ġ: "g",
        ģ: "g",
        Ĥ: "H",
        Ħ: "H",
        ĥ: "h",
        ħ: "h",
        Ĩ: "I",
        Ī: "I",
        Ĭ: "I",
        Į: "I",
        İ: "I",
        ĩ: "i",
        ī: "i",
        ĭ: "i",
        į: "i",
        ı: "i",
        Ĵ: "J",
        ĵ: "j",
        Ķ: "K",
        ķ: "k",
        ĸ: "k",
        Ĺ: "L",
        Ļ: "L",
        Ľ: "L",
        Ŀ: "L",
        Ł: "L",
        ĺ: "l",
        ļ: "l",
        ľ: "l",
        ŀ: "l",
        ł: "l",
        Ń: "N",
        Ņ: "N",
        Ň: "N",
        Ŋ: "N",
        ń: "n",
        ņ: "n",
        ň: "n",
        ŋ: "n",
        Ō: "O",
        Ŏ: "O",
        Ő: "O",
        ō: "o",
        ŏ: "o",
        ő: "o",
        Ŕ: "R",
        Ŗ: "R",
        Ř: "R",
        ŕ: "r",
        ŗ: "r",
        ř: "r",
        Ś: "S",
        Ŝ: "S",
        Ş: "S",
        Š: "S",
        ś: "s",
        ŝ: "s",
        ş: "s",
        š: "s",
        Ţ: "T",
        Ť: "T",
        Ŧ: "T",
        ţ: "t",
        ť: "t",
        ŧ: "t",
        Ũ: "U",
        Ū: "U",
        Ŭ: "U",
        Ů: "U",
        Ű: "U",
        Ų: "U",
        ũ: "u",
        ū: "u",
        ŭ: "u",
        ů: "u",
        ű: "u",
        ų: "u",
        Ŵ: "W",
        ŵ: "w",
        Ŷ: "Y",
        ŷ: "y",
        Ÿ: "Y",
        Ź: "Z",
        Ż: "Z",
        Ž: "Z",
        ź: "z",
        ż: "z",
        ž: "z",
        Ĳ: "IJ",
        ĳ: "ij",
        Œ: "Oe",
        œ: "oe",
        ŉ: "'n",
        ſ: "s",
    },
    Ba = Ia(Da);
const $a = Ba;
var Aa = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,
    Fa = "\\u0300-\\u036f",
    ja = "\\ufe20-\\ufe2f",
    Ma = "\\u20d0-\\u20ff",
    Ka = Fa + ja + Ma,
    Ha = "[" + Ka + "]",
    Na = RegExp(Ha, "g");
function La(e) {
    return (e = Qn(e)), e && e.replace(Aa, $a).replace(Na, "");
}
var Va = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
function Wa(e) {
    return e.match(Va) || [];
}
var Ua = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
function qa(e) {
    return Ua.test(e);
}
var yi = "\\ud800-\\udfff",
    Ga = "\\u0300-\\u036f",
    Ya = "\\ufe20-\\ufe2f",
    Xa = "\\u20d0-\\u20ff",
    Za = Ga + Ya + Xa,
    xi = "\\u2700-\\u27bf",
    wi = "a-z\\xdf-\\xf6\\xf8-\\xff",
    Qa = "\\xac\\xb1\\xd7\\xf7",
    Ja = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf",
    el = "\\u2000-\\u206f",
    tl =
        " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",
    _i = "A-Z\\xc0-\\xd6\\xd8-\\xde",
    rl = "\\ufe0e\\ufe0f",
    Ci = Qa + Ja + el + tl,
    Si = "['’]",
    Fo = "[" + Ci + "]",
    nl = "[" + Za + "]",
    ki = "\\d+",
    ol = "[" + xi + "]",
    Ri = "[" + wi + "]",
    Pi = "[^" + yi + Ci + ki + xi + wi + _i + "]",
    il = "\\ud83c[\\udffb-\\udfff]",
    sl = "(?:" + nl + "|" + il + ")",
    al = "[^" + yi + "]",
    Ei = "(?:\\ud83c[\\udde6-\\uddff]){2}",
    Ti = "[\\ud800-\\udbff][\\udc00-\\udfff]",
    St = "[" + _i + "]",
    ll = "\\u200d",
    jo = "(?:" + Ri + "|" + Pi + ")",
    ul = "(?:" + St + "|" + Pi + ")",
    Mo = "(?:" + Si + "(?:d|ll|m|re|s|t|ve))?",
    Ko = "(?:" + Si + "(?:D|LL|M|RE|S|T|VE))?",
    Oi = sl + "?",
    zi = "[" + rl + "]?",
    cl = "(?:" + ll + "(?:" + [al, Ei, Ti].join("|") + ")" + zi + Oi + ")*",
    dl = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])",
    fl = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])",
    hl = zi + Oi + cl,
    pl = "(?:" + [ol, Ei, Ti].join("|") + ")" + hl,
    vl = RegExp(
        [
            St + "?" + Ri + "+" + Mo + "(?=" + [Fo, St, "$"].join("|") + ")",
            ul + "+" + Ko + "(?=" + [Fo, St + jo, "$"].join("|") + ")",
            St + "?" + jo + "+" + Mo,
            St + "+" + Ko,
            fl,
            dl,
            ki,
            pl,
        ].join("|"),
        "g"
    );
function bl(e) {
    return e.match(vl) || [];
}
function gl(e, t, r) {
    return (
        (e = Qn(e)),
        (t = r ? void 0 : t),
        t === void 0 ? (qa(e) ? bl(e) : Wa(e)) : e.match(t) || []
    );
}
var ml = "['’]",
    yl = RegExp(ml, "g");
function xl(e) {
    return function (t) {
        return za(gl(La(t).replace(yl, "")), e, "");
    };
}
var wl = xl(function (e, t, r) {
    return (t = t.toLowerCase()), e + (r ? Oa(t) : t);
});
const Ho = wl,
    _l = ze(
        "base-wave",
        `
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
`
    ),
    Cl = ge({
        name: "BaseWave",
        props: { clsPrefix: { type: String, required: !0 } },
        setup(e) {
            Ts("-base-wave", _l, Wt(e, "clsPrefix"));
            const t = Q(null),
                r = Q(!1);
            let n = null;
            return (
                tr(() => {
                    n !== null && window.clearTimeout(n);
                }),
                {
                    active: r,
                    selfRef: t,
                    play() {
                        n !== null &&
                            (window.clearTimeout(n),
                            (r.value = !1),
                            (n = null)),
                            Br(() => {
                                var o;
                                (o = t.value) === null ||
                                    o === void 0 ||
                                    o.offsetHeight,
                                    (r.value = !0),
                                    (n = window.setTimeout(() => {
                                        (r.value = !1), (n = null);
                                    }, 1e3));
                            });
                    },
                }
            );
        },
        render() {
            const { clsPrefix: e } = this;
            return N("div", {
                ref: "selfRef",
                "aria-hidden": !0,
                class: [
                    `${e}-base-wave`,
                    this.active && `${e}-base-wave--active`,
                ],
            });
        },
    }),
    { cubicBezierEaseInOut: Ue } = Os;
function Sl({ duration: e = ".2s", delay: t = ".1s" } = {}) {
    return [
        X(
            "&.fade-in-width-expand-transition-leave-from, &.fade-in-width-expand-transition-enter-to",
            { opacity: 1 }
        ),
        X(
            "&.fade-in-width-expand-transition-leave-to, &.fade-in-width-expand-transition-enter-from",
            `
 opacity: 0!important;
 margin-left: 0!important;
 margin-right: 0!important;
 `
        ),
        X(
            "&.fade-in-width-expand-transition-leave-active",
            `
 overflow: hidden;
 transition:
 opacity ${e} ${Ue},
 max-width ${e} ${Ue} ${t},
 margin-left ${e} ${Ue} ${t},
 margin-right ${e} ${Ue} ${t};
 `
        ),
        X(
            "&.fade-in-width-expand-transition-enter-active",
            `
 overflow: hidden;
 transition:
 opacity ${e} ${Ue} ${t},
 max-width ${e} ${Ue},
 margin-left ${e} ${Ue},
 margin-right ${e} ${Ue};
 `
        ),
    ];
}
const kl = Xr && "chrome" in window;
Xr && navigator.userAgent.includes("Firefox");
const Rl = Xr && navigator.userAgent.includes("Safari") && !kl;
function nt(e) {
    return li(e, [255, 255, 255, 0.16]);
}
function hr(e) {
    return li(e, [0, 0, 0, 0.12]);
}
const Pl = Ur("n-button-group"),
    El = {
        paddingTiny: "0 6px",
        paddingSmall: "0 10px",
        paddingMedium: "0 14px",
        paddingLarge: "0 18px",
        paddingRoundTiny: "0 10px",
        paddingRoundSmall: "0 14px",
        paddingRoundMedium: "0 18px",
        paddingRoundLarge: "0 22px",
        iconMarginTiny: "6px",
        iconMarginSmall: "6px",
        iconMarginMedium: "6px",
        iconMarginLarge: "6px",
        iconSizeTiny: "14px",
        iconSizeSmall: "18px",
        iconSizeMedium: "18px",
        iconSizeLarge: "20px",
        rippleDuration: ".6s",
    },
    Tl = (e) => {
        const {
            heightTiny: t,
            heightSmall: r,
            heightMedium: n,
            heightLarge: o,
            borderRadius: i,
            fontSizeTiny: s,
            fontSizeSmall: l,
            fontSizeMedium: a,
            fontSizeLarge: h,
            opacityDisabled: u,
            textColor2: d,
            textColor3: f,
            primaryColorHover: b,
            primaryColorPressed: x,
            borderColor: g,
            primaryColor: m,
            baseColor: v,
            infoColor: p,
            infoColorHover: y,
            infoColorPressed: C,
            successColor: S,
            successColorHover: R,
            successColorPressed: c,
            warningColor: _,
            warningColorHover: w,
            warningColorPressed: T,
            errorColor: P,
            errorColorHover: z,
            errorColorPressed: M,
            fontWeight: $,
            buttonColor2: U,
            buttonColor2Hover: G,
            buttonColor2Pressed: A,
            fontWeightStrong: J,
        } = e;
        return Object.assign(Object.assign({}, El), {
            heightTiny: t,
            heightSmall: r,
            heightMedium: n,
            heightLarge: o,
            borderRadiusTiny: i,
            borderRadiusSmall: i,
            borderRadiusMedium: i,
            borderRadiusLarge: i,
            fontSizeTiny: s,
            fontSizeSmall: l,
            fontSizeMedium: a,
            fontSizeLarge: h,
            opacityDisabled: u,
            colorOpacitySecondary: "0.16",
            colorOpacitySecondaryHover: "0.22",
            colorOpacitySecondaryPressed: "0.28",
            colorSecondary: U,
            colorSecondaryHover: G,
            colorSecondaryPressed: A,
            colorTertiary: U,
            colorTertiaryHover: G,
            colorTertiaryPressed: A,
            colorQuaternary: "#0000",
            colorQuaternaryHover: G,
            colorQuaternaryPressed: A,
            color: "#0000",
            colorHover: "#0000",
            colorPressed: "#0000",
            colorFocus: "#0000",
            colorDisabled: "#0000",
            textColor: d,
            textColorTertiary: f,
            textColorHover: b,
            textColorPressed: x,
            textColorFocus: b,
            textColorDisabled: d,
            textColorText: d,
            textColorTextHover: b,
            textColorTextPressed: x,
            textColorTextFocus: b,
            textColorTextDisabled: d,
            textColorGhost: d,
            textColorGhostHover: b,
            textColorGhostPressed: x,
            textColorGhostFocus: b,
            textColorGhostDisabled: d,
            border: `1px solid ${g}`,
            borderHover: `1px solid ${b}`,
            borderPressed: `1px solid ${x}`,
            borderFocus: `1px solid ${b}`,
            borderDisabled: `1px solid ${g}`,
            rippleColor: m,
            colorPrimary: m,
            colorHoverPrimary: b,
            colorPressedPrimary: x,
            colorFocusPrimary: b,
            colorDisabledPrimary: m,
            textColorPrimary: v,
            textColorHoverPrimary: v,
            textColorPressedPrimary: v,
            textColorFocusPrimary: v,
            textColorDisabledPrimary: v,
            textColorTextPrimary: m,
            textColorTextHoverPrimary: b,
            textColorTextPressedPrimary: x,
            textColorTextFocusPrimary: b,
            textColorTextDisabledPrimary: d,
            textColorGhostPrimary: m,
            textColorGhostHoverPrimary: b,
            textColorGhostPressedPrimary: x,
            textColorGhostFocusPrimary: b,
            textColorGhostDisabledPrimary: m,
            borderPrimary: `1px solid ${m}`,
            borderHoverPrimary: `1px solid ${b}`,
            borderPressedPrimary: `1px solid ${x}`,
            borderFocusPrimary: `1px solid ${b}`,
            borderDisabledPrimary: `1px solid ${m}`,
            rippleColorPrimary: m,
            colorInfo: p,
            colorHoverInfo: y,
            colorPressedInfo: C,
            colorFocusInfo: y,
            colorDisabledInfo: p,
            textColorInfo: v,
            textColorHoverInfo: v,
            textColorPressedInfo: v,
            textColorFocusInfo: v,
            textColorDisabledInfo: v,
            textColorTextInfo: p,
            textColorTextHoverInfo: y,
            textColorTextPressedInfo: C,
            textColorTextFocusInfo: y,
            textColorTextDisabledInfo: d,
            textColorGhostInfo: p,
            textColorGhostHoverInfo: y,
            textColorGhostPressedInfo: C,
            textColorGhostFocusInfo: y,
            textColorGhostDisabledInfo: p,
            borderInfo: `1px solid ${p}`,
            borderHoverInfo: `1px solid ${y}`,
            borderPressedInfo: `1px solid ${C}`,
            borderFocusInfo: `1px solid ${y}`,
            borderDisabledInfo: `1px solid ${p}`,
            rippleColorInfo: p,
            colorSuccess: S,
            colorHoverSuccess: R,
            colorPressedSuccess: c,
            colorFocusSuccess: R,
            colorDisabledSuccess: S,
            textColorSuccess: v,
            textColorHoverSuccess: v,
            textColorPressedSuccess: v,
            textColorFocusSuccess: v,
            textColorDisabledSuccess: v,
            textColorTextSuccess: S,
            textColorTextHoverSuccess: R,
            textColorTextPressedSuccess: c,
            textColorTextFocusSuccess: R,
            textColorTextDisabledSuccess: d,
            textColorGhostSuccess: S,
            textColorGhostHoverSuccess: R,
            textColorGhostPressedSuccess: c,
            textColorGhostFocusSuccess: R,
            textColorGhostDisabledSuccess: S,
            borderSuccess: `1px solid ${S}`,
            borderHoverSuccess: `1px solid ${R}`,
            borderPressedSuccess: `1px solid ${c}`,
            borderFocusSuccess: `1px solid ${R}`,
            borderDisabledSuccess: `1px solid ${S}`,
            rippleColorSuccess: S,
            colorWarning: _,
            colorHoverWarning: w,
            colorPressedWarning: T,
            colorFocusWarning: w,
            colorDisabledWarning: _,
            textColorWarning: v,
            textColorHoverWarning: v,
            textColorPressedWarning: v,
            textColorFocusWarning: v,
            textColorDisabledWarning: v,
            textColorTextWarning: _,
            textColorTextHoverWarning: w,
            textColorTextPressedWarning: T,
            textColorTextFocusWarning: w,
            textColorTextDisabledWarning: d,
            textColorGhostWarning: _,
            textColorGhostHoverWarning: w,
            textColorGhostPressedWarning: T,
            textColorGhostFocusWarning: w,
            textColorGhostDisabledWarning: _,
            borderWarning: `1px solid ${_}`,
            borderHoverWarning: `1px solid ${w}`,
            borderPressedWarning: `1px solid ${T}`,
            borderFocusWarning: `1px solid ${w}`,
            borderDisabledWarning: `1px solid ${_}`,
            rippleColorWarning: _,
            colorError: P,
            colorHoverError: z,
            colorPressedError: M,
            colorFocusError: z,
            colorDisabledError: P,
            textColorError: v,
            textColorHoverError: v,
            textColorPressedError: v,
            textColorFocusError: v,
            textColorDisabledError: v,
            textColorTextError: P,
            textColorTextHoverError: z,
            textColorTextPressedError: M,
            textColorTextFocusError: z,
            textColorTextDisabledError: d,
            textColorGhostError: P,
            textColorGhostHoverError: z,
            textColorGhostPressedError: M,
            textColorGhostFocusError: z,
            textColorGhostDisabledError: P,
            borderError: `1px solid ${P}`,
            borderHoverError: `1px solid ${z}`,
            borderPressedError: `1px solid ${M}`,
            borderFocusError: `1px solid ${z}`,
            borderDisabledError: `1px solid ${P}`,
            rippleColorError: P,
            waveOpacity: "0.6",
            fontWeight: $,
            fontWeightStrong: J,
        });
    },
    Ol = { name: "Button", common: qr, self: Tl },
    zl = Ol,
    Il = X([
        ze(
            "button",
            `
 margin: 0;
 font-weight: var(--n-font-weight);
 line-height: 1;
 font-family: inherit;
 padding: var(--n-padding);
 height: var(--n-height);
 font-size: var(--n-font-size);
 border-radius: var(--n-border-radius);
 color: var(--n-text-color);
 background-color: var(--n-color);
 width: var(--n-width);
 white-space: nowrap;
 outline: none;
 position: relative;
 z-index: auto;
 border: none;
 display: inline-flex;
 flex-wrap: nowrap;
 flex-shrink: 0;
 align-items: center;
 justify-content: center;
 user-select: none;
 -webkit-user-select: none;
 text-align: center;
 cursor: pointer;
 text-decoration: none;
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,
            [
                F("color", [
                    I("border", { borderColor: "var(--n-border-color)" }),
                    F("disabled", [
                        I("border", {
                            borderColor: "var(--n-border-color-disabled)",
                        }),
                    ]),
                    $r("disabled", [
                        X("&:focus", [
                            I("state-border", {
                                borderColor: "var(--n-border-color-focus)",
                            }),
                        ]),
                        X("&:hover", [
                            I("state-border", {
                                borderColor: "var(--n-border-color-hover)",
                            }),
                        ]),
                        X("&:active", [
                            I("state-border", {
                                borderColor: "var(--n-border-color-pressed)",
                            }),
                        ]),
                        F("pressed", [
                            I("state-border", {
                                borderColor: "var(--n-border-color-pressed)",
                            }),
                        ]),
                    ]),
                ]),
                F(
                    "disabled",
                    {
                        backgroundColor: "var(--n-color-disabled)",
                        color: "var(--n-text-color-disabled)",
                    },
                    [I("border", { border: "var(--n-border-disabled)" })]
                ),
                $r("disabled", [
                    X(
                        "&:focus",
                        {
                            backgroundColor: "var(--n-color-focus)",
                            color: "var(--n-text-color-focus)",
                        },
                        [I("state-border", { border: "var(--n-border-focus)" })]
                    ),
                    X(
                        "&:hover",
                        {
                            backgroundColor: "var(--n-color-hover)",
                            color: "var(--n-text-color-hover)",
                        },
                        [I("state-border", { border: "var(--n-border-hover)" })]
                    ),
                    X(
                        "&:active",
                        {
                            backgroundColor: "var(--n-color-pressed)",
                            color: "var(--n-text-color-pressed)",
                        },
                        [
                            I("state-border", {
                                border: "var(--n-border-pressed)",
                            }),
                        ]
                    ),
                    F(
                        "pressed",
                        {
                            backgroundColor: "var(--n-color-pressed)",
                            color: "var(--n-text-color-pressed)",
                        },
                        [
                            I("state-border", {
                                border: "var(--n-border-pressed)",
                            }),
                        ]
                    ),
                ]),
                F("loading", "cursor: wait;"),
                ze(
                    "base-wave",
                    `
 pointer-events: none;
 top: 0;
 right: 0;
 bottom: 0;
 left: 0;
 animation-iteration-count: 1;
 animation-duration: var(--n-ripple-duration);
 animation-timing-function: var(--n-bezier-ease-out), var(--n-bezier-ease-out);
 `,
                    [
                        F("active", {
                            zIndex: 1,
                            animationName:
                                "button-wave-spread, button-wave-opacity",
                        }),
                    ]
                ),
                Xr && "MozBoxSizing" in document.createElement("div").style
                    ? X("&::moz-focus-inner", { border: 0 })
                    : null,
                I(
                    "border, state-border",
                    `
 position: absolute;
 left: 0;
 top: 0;
 right: 0;
 bottom: 0;
 border-radius: inherit;
 transition: border-color .3s var(--n-bezier);
 pointer-events: none;
 `
                ),
                I("border", { border: "var(--n-border)" }),
                I("state-border", {
                    border: "var(--n-border)",
                    borderColor: "#0000",
                    zIndex: 1,
                }),
                I(
                    "icon",
                    `
 margin: var(--n-icon-margin);
 margin-left: 0;
 height: var(--n-icon-size);
 width: var(--n-icon-size);
 max-width: var(--n-icon-size);
 font-size: var(--n-icon-size);
 position: relative;
 flex-shrink: 0;
 `,
                    [
                        ze(
                            "icon-slot",
                            `
 height: var(--n-icon-size);
 width: var(--n-icon-size);
 position: absolute;
 left: 0;
 top: 50%;
 transform: translateY(-50%);
 display: flex;
 align-items: center;
 justify-content: center;
 `,
                            [
                                zs({
                                    top: "50%",
                                    originalTransform: "translateY(-50%)",
                                }),
                            ]
                        ),
                        Sl(),
                    ]
                ),
                I(
                    "content",
                    `
 display: flex;
 align-items: center;
 flex-wrap: nowrap;
 min-width: 0;
 `,
                    [
                        X("~", [
                            I("icon", {
                                margin: "var(--n-icon-margin)",
                                marginRight: 0,
                            }),
                        ]),
                    ]
                ),
                F(
                    "block",
                    `
 display: flex;
 width: 100%;
 `
                ),
                F("dashed", [
                    I("border, state-border", {
                        borderStyle: "dashed !important",
                    }),
                ]),
                F("disabled", {
                    cursor: "not-allowed",
                    opacity: "var(--n-opacity-disabled)",
                }),
            ]
        ),
        X("@keyframes button-wave-spread", {
            from: { boxShadow: "0 0 0.5px 0 var(--n-ripple-color)" },
            to: { boxShadow: "0 0 0.5px 4.5px var(--n-ripple-color)" },
        }),
        X("@keyframes button-wave-opacity", {
            from: { opacity: "var(--n-wave-opacity)" },
            to: { opacity: 0 },
        }),
    ]),
    Dl = Object.assign(Object.assign({}, et.props), {
        color: String,
        textColor: String,
        text: Boolean,
        block: Boolean,
        loading: Boolean,
        disabled: Boolean,
        circle: Boolean,
        size: String,
        ghost: Boolean,
        round: Boolean,
        secondary: Boolean,
        tertiary: Boolean,
        quaternary: Boolean,
        strong: Boolean,
        focusable: { type: Boolean, default: !0 },
        keyboard: { type: Boolean, default: !0 },
        tag: { type: String, default: "button" },
        type: { type: String, default: "default" },
        dashed: Boolean,
        renderIcon: Function,
        iconPlacement: { type: String, default: "left" },
        attrType: { type: String, default: "button" },
        bordered: { type: Boolean, default: !0 },
        onClick: [Function, Array],
        nativeFocusBehavior: { type: Boolean, default: !Rl },
    }),
    Bl = ge({
        name: "Button",
        props: Dl,
        setup(e) {
            const t = Q(null),
                r = Q(null),
                n = Q(!1),
                o = Cn(
                    () =>
                        !e.quaternary &&
                        !e.tertiary &&
                        !e.secondary &&
                        !e.text &&
                        (!e.color || e.ghost || e.dashed) &&
                        e.bordered
                ),
                i = Wr(Pl, {}),
                { mergedSizeRef: s } = to(
                    {},
                    {
                        defaultSize: "medium",
                        mergedSize: (C) => {
                            const { size: S } = e;
                            if (S) return S;
                            const { size: R } = i;
                            if (R) return R;
                            const { mergedSize: c } = C || {};
                            return c ? c.value : "medium";
                        },
                    }
                ),
                l = K(() => e.focusable && !e.disabled),
                a = (C) => {
                    var S;
                    l.value || C.preventDefault(),
                        !e.nativeFocusBehavior &&
                            (C.preventDefault(),
                            !e.disabled &&
                                l.value &&
                                ((S = t.value) === null ||
                                    S === void 0 ||
                                    S.focus({ preventScroll: !0 })));
                },
                h = (C) => {
                    var S;
                    if (!e.disabled && !e.loading) {
                        const { onClick: R } = e;
                        R && at(R, C),
                            e.text ||
                                (S = r.value) === null ||
                                S === void 0 ||
                                S.play();
                    }
                },
                u = (C) => {
                    switch (C.key) {
                        case "Enter":
                            if (!e.keyboard) return;
                            n.value = !1;
                    }
                },
                d = (C) => {
                    switch (C.key) {
                        case "Enter":
                            if (!e.keyboard || e.loading) {
                                C.preventDefault();
                                return;
                            }
                            n.value = !0;
                    }
                },
                f = () => {
                    n.value = !1;
                },
                {
                    inlineThemeDisabled: b,
                    mergedClsPrefixRef: x,
                    mergedRtlRef: g,
                } = tt(e),
                m = et("Button", "-button", Il, zl, e, x),
                v = ui("Button", g, x),
                p = K(() => {
                    const C = m.value,
                        {
                            common: {
                                cubicBezierEaseInOut: S,
                                cubicBezierEaseOut: R,
                            },
                            self: c,
                        } = C,
                        {
                            rippleDuration: _,
                            opacityDisabled: w,
                            fontWeight: T,
                            fontWeightStrong: P,
                        } = c,
                        z = s.value,
                        {
                            dashed: M,
                            type: $,
                            ghost: U,
                            text: G,
                            color: A,
                            round: J,
                            circle: ae,
                            textColor: le,
                            secondary: ke,
                            tertiary: Le,
                            quaternary: Bt,
                            strong: bt,
                        } = e,
                        Jr = { "font-weight": bt ? P : T };
                    let ne = {
                        "--n-color": "initial",
                        "--n-color-hover": "initial",
                        "--n-color-pressed": "initial",
                        "--n-color-focus": "initial",
                        "--n-color-disabled": "initial",
                        "--n-ripple-color": "initial",
                        "--n-text-color": "initial",
                        "--n-text-color-hover": "initial",
                        "--n-text-color-pressed": "initial",
                        "--n-text-color-focus": "initial",
                        "--n-text-color-disabled": "initial",
                    };
                    const pe = $ === "tertiary",
                        Pe = $ === "default",
                        q = pe ? "default" : $;
                    if (G) {
                        const oe = le || A;
                        ne = {
                            "--n-color": "#0000",
                            "--n-color-hover": "#0000",
                            "--n-color-pressed": "#0000",
                            "--n-color-focus": "#0000",
                            "--n-color-disabled": "#0000",
                            "--n-ripple-color": "#0000",
                            "--n-text-color": oe || c[V("textColorText", q)],
                            "--n-text-color-hover": oe
                                ? nt(oe)
                                : c[V("textColorTextHover", q)],
                            "--n-text-color-pressed": oe
                                ? hr(oe)
                                : c[V("textColorTextPressed", q)],
                            "--n-text-color-focus": oe
                                ? nt(oe)
                                : c[V("textColorTextHover", q)],
                            "--n-text-color-disabled":
                                oe || c[V("textColorTextDisabled", q)],
                        };
                    } else if (U || M) {
                        const oe = le || A;
                        ne = {
                            "--n-color": "#0000",
                            "--n-color-hover": "#0000",
                            "--n-color-pressed": "#0000",
                            "--n-color-focus": "#0000",
                            "--n-color-disabled": "#0000",
                            "--n-ripple-color": A || c[V("rippleColor", q)],
                            "--n-text-color": oe || c[V("textColorGhost", q)],
                            "--n-text-color-hover": oe
                                ? nt(oe)
                                : c[V("textColorGhostHover", q)],
                            "--n-text-color-pressed": oe
                                ? hr(oe)
                                : c[V("textColorGhostPressed", q)],
                            "--n-text-color-focus": oe
                                ? nt(oe)
                                : c[V("textColorGhostHover", q)],
                            "--n-text-color-disabled":
                                oe || c[V("textColorGhostDisabled", q)],
                        };
                    } else if (ke) {
                        const oe = Pe
                                ? c.textColor
                                : pe
                                ? c.textColorTertiary
                                : c[V("color", q)],
                            se = A || oe,
                            Be = $ !== "default" && $ !== "tertiary";
                        ne = {
                            "--n-color": Be
                                ? Rt(se, {
                                      alpha: Number(c.colorOpacitySecondary),
                                  })
                                : c.colorSecondary,
                            "--n-color-hover": Be
                                ? Rt(se, {
                                      alpha: Number(
                                          c.colorOpacitySecondaryHover
                                      ),
                                  })
                                : c.colorSecondaryHover,
                            "--n-color-pressed": Be
                                ? Rt(se, {
                                      alpha: Number(
                                          c.colorOpacitySecondaryPressed
                                      ),
                                  })
                                : c.colorSecondaryPressed,
                            "--n-color-focus": Be
                                ? Rt(se, {
                                      alpha: Number(
                                          c.colorOpacitySecondaryHover
                                      ),
                                  })
                                : c.colorSecondaryHover,
                            "--n-color-disabled": c.colorSecondary,
                            "--n-ripple-color": "#0000",
                            "--n-text-color": se,
                            "--n-text-color-hover": se,
                            "--n-text-color-pressed": se,
                            "--n-text-color-focus": se,
                            "--n-text-color-disabled": se,
                        };
                    } else if (Le || Bt) {
                        const oe = Pe
                                ? c.textColor
                                : pe
                                ? c.textColorTertiary
                                : c[V("color", q)],
                            se = A || oe;
                        Le
                            ? ((ne["--n-color"] = c.colorTertiary),
                              (ne["--n-color-hover"] = c.colorTertiaryHover),
                              (ne["--n-color-pressed"] =
                                  c.colorTertiaryPressed),
                              (ne["--n-color-focus"] = c.colorSecondaryHover),
                              (ne["--n-color-disabled"] = c.colorTertiary))
                            : ((ne["--n-color"] = c.colorQuaternary),
                              (ne["--n-color-hover"] = c.colorQuaternaryHover),
                              (ne["--n-color-pressed"] =
                                  c.colorQuaternaryPressed),
                              (ne["--n-color-focus"] = c.colorQuaternaryHover),
                              (ne["--n-color-disabled"] = c.colorQuaternary)),
                            (ne["--n-ripple-color"] = "#0000"),
                            (ne["--n-text-color"] = se),
                            (ne["--n-text-color-hover"] = se),
                            (ne["--n-text-color-pressed"] = se),
                            (ne["--n-text-color-focus"] = se),
                            (ne["--n-text-color-disabled"] = se);
                    } else
                        ne = {
                            "--n-color": A || c[V("color", q)],
                            "--n-color-hover": A
                                ? nt(A)
                                : c[V("colorHover", q)],
                            "--n-color-pressed": A
                                ? hr(A)
                                : c[V("colorPressed", q)],
                            "--n-color-focus": A
                                ? nt(A)
                                : c[V("colorFocus", q)],
                            "--n-color-disabled": A || c[V("colorDisabled", q)],
                            "--n-ripple-color": A || c[V("rippleColor", q)],
                            "--n-text-color":
                                le ||
                                (A
                                    ? c.textColorPrimary
                                    : pe
                                    ? c.textColorTertiary
                                    : c[V("textColor", q)]),
                            "--n-text-color-hover":
                                le ||
                                (A
                                    ? c.textColorHoverPrimary
                                    : c[V("textColorHover", q)]),
                            "--n-text-color-pressed":
                                le ||
                                (A
                                    ? c.textColorPressedPrimary
                                    : c[V("textColorPressed", q)]),
                            "--n-text-color-focus":
                                le ||
                                (A
                                    ? c.textColorFocusPrimary
                                    : c[V("textColorFocus", q)]),
                            "--n-text-color-disabled":
                                le ||
                                (A
                                    ? c.textColorDisabledPrimary
                                    : c[V("textColorDisabled", q)]),
                        };
                    let Ve = {
                        "--n-border": "initial",
                        "--n-border-hover": "initial",
                        "--n-border-pressed": "initial",
                        "--n-border-focus": "initial",
                        "--n-border-disabled": "initial",
                    };
                    G
                        ? (Ve = {
                              "--n-border": "none",
                              "--n-border-hover": "none",
                              "--n-border-pressed": "none",
                              "--n-border-focus": "none",
                              "--n-border-disabled": "none",
                          })
                        : (Ve = {
                              "--n-border": c[V("border", q)],
                              "--n-border-hover": c[V("borderHover", q)],
                              "--n-border-pressed": c[V("borderPressed", q)],
                              "--n-border-focus": c[V("borderFocus", q)],
                              "--n-border-disabled": c[V("borderDisabled", q)],
                          });
                    const {
                            [V("height", z)]: De,
                            [V("fontSize", z)]: $t,
                            [V("padding", z)]: ir,
                            [V("paddingRound", z)]: sr,
                            [V("iconSize", z)]: rt,
                            [V("borderRadius", z)]: en,
                            [V("iconMargin", z)]: tn,
                            waveOpacity: We,
                        } = c,
                        rn = {
                            "--n-width": ae && !G ? De : "initial",
                            "--n-height": G ? "initial" : De,
                            "--n-font-size": $t,
                            "--n-padding": ae || G ? "initial" : J ? sr : ir,
                            "--n-icon-size": rt,
                            "--n-icon-margin": tn,
                            "--n-border-radius": G
                                ? "initial"
                                : ae || J
                                ? De
                                : en,
                        };
                    return Object.assign(
                        Object.assign(
                            Object.assign(
                                Object.assign(
                                    {
                                        "--n-bezier": S,
                                        "--n-bezier-ease-out": R,
                                        "--n-ripple-duration": _,
                                        "--n-opacity-disabled": w,
                                        "--n-wave-opacity": We,
                                    },
                                    Jr
                                ),
                                ne
                            ),
                            Ve
                        ),
                        rn
                    );
                }),
                y = b
                    ? Gr(
                          "button",
                          K(() => {
                              let C = "";
                              const {
                                  dashed: S,
                                  type: R,
                                  ghost: c,
                                  text: _,
                                  color: w,
                                  round: T,
                                  circle: P,
                                  textColor: z,
                                  secondary: M,
                                  tertiary: $,
                                  quaternary: U,
                                  strong: G,
                              } = e;
                              S && (C += "a"),
                                  c && (C += "b"),
                                  _ && (C += "c"),
                                  T && (C += "d"),
                                  P && (C += "e"),
                                  M && (C += "f"),
                                  $ && (C += "g"),
                                  U && (C += "h"),
                                  G && (C += "i"),
                                  w && (C += "j" + Co(w)),
                                  z && (C += "k" + Co(z));
                              const { value: A } = s;
                              return (C += "l" + A[0]), (C += "m" + R[0]), C;
                          }),
                          p,
                          e
                      )
                    : void 0;
            return {
                selfElRef: t,
                waveElRef: r,
                mergedClsPrefix: x,
                mergedFocusable: l,
                mergedSize: s,
                showBorder: o,
                enterPressed: n,
                rtlEnabled: v,
                handleMousedown: a,
                handleKeydown: d,
                handleBlur: f,
                handleKeyup: u,
                handleClick: h,
                customColorCssVars: K(() => {
                    const { color: C } = e;
                    if (!C) return null;
                    const S = nt(C);
                    return {
                        "--n-border-color": C,
                        "--n-border-color-hover": S,
                        "--n-border-color-pressed": hr(C),
                        "--n-border-color-focus": S,
                        "--n-border-color-disabled": C,
                    };
                }),
                cssVars: b ? void 0 : p,
                themeClass: y == null ? void 0 : y.themeClass,
                onRender: y == null ? void 0 : y.onRender,
            };
        },
        render() {
            const { mergedClsPrefix: e, tag: t, onRender: r } = this;
            r == null || r();
            const n = Sn(
                this.$slots.default,
                (o) => o && N("span", { class: `${e}-button__content` }, o)
            );
            return N(
                t,
                {
                    ref: "selfElRef",
                    class: [
                        this.themeClass,
                        `${e}-button`,
                        `${e}-button--${this.type}-type`,
                        `${e}-button--${this.mergedSize}-type`,
                        this.rtlEnabled && `${e}-button--rtl`,
                        this.disabled && `${e}-button--disabled`,
                        this.block && `${e}-button--block`,
                        this.enterPressed && `${e}-button--pressed`,
                        !this.text && this.dashed && `${e}-button--dashed`,
                        this.color && `${e}-button--color`,
                        this.secondary && `${e}-button--secondary`,
                        this.loading && `${e}-button--loading`,
                        this.ghost && `${e}-button--ghost`,
                    ],
                    tabindex: this.mergedFocusable ? 0 : -1,
                    type: this.attrType,
                    style: this.cssVars,
                    disabled: this.disabled,
                    onClick: this.handleClick,
                    onBlur: this.handleBlur,
                    onMousedown: this.handleMousedown,
                    onKeyup: this.handleKeyup,
                    onKeydown: this.handleKeydown,
                },
                this.iconPlacement === "right" && n,
                N(
                    Is,
                    { width: !0 },
                    {
                        default: () =>
                            Sn(
                                this.$slots.icon,
                                (o) =>
                                    (this.loading || this.renderIcon || o) &&
                                    N(
                                        "span",
                                        {
                                            class: `${e}-button__icon`,
                                            style: {
                                                margin: ea(this.$slots.default)
                                                    ? "0"
                                                    : "",
                                            },
                                        },
                                        N(Ds, null, {
                                            default: () =>
                                                this.loading
                                                    ? N(Bs, {
                                                          clsPrefix: e,
                                                          key: "loading",
                                                          class: `${e}-icon-slot`,
                                                          strokeWidth: 20,
                                                      })
                                                    : N(
                                                          "div",
                                                          {
                                                              key: "icon",
                                                              class: `${e}-icon-slot`,
                                                              role: "none",
                                                          },
                                                          this.renderIcon
                                                              ? this.renderIcon()
                                                              : o
                                                      ),
                                        })
                                    )
                            ),
                    }
                ),
                this.iconPlacement === "left" && n,
                this.text ? null : N(Cl, { ref: "waveElRef", clsPrefix: e }),
                this.showBorder
                    ? N("div", {
                          "aria-hidden": !0,
                          class: `${e}-button__border`,
                          style: this.customColorCssVars,
                      })
                    : null,
                this.showBorder
                    ? N("div", {
                          "aria-hidden": !0,
                          class: `${e}-button__state-border`,
                          style: this.customColorCssVars,
                      })
                    : null
            );
        },
    }),
    fn = Bl,
    $l = (e) => ({
        dotSize: "8px",
        dotColor: "rgba(255, 255, 255, .3)",
        dotColorActive: "rgba(255, 255, 255, 1)",
        dotColorFocus: "rgba(255, 255, 255, .5)",
        dotLineWidth: "16px",
        dotLineWidthActive: "24px",
        arrowColor: "#eee",
    }),
    Al = { name: "Carousel", common: qr, self: $l },
    Fl = Al;
function jl(e) {
    const { length: t } = e;
    return (
        t > 1 &&
            (e.push(No(e[0], 0, "append")),
            e.unshift(No(e[t - 1], t - 1, "prepend"))),
        e
    );
}
function No(e, t, r) {
    return ci(e, { key: `carousel-item-duplicate-${t}-${r}` });
}
function Lo(e, t, r) {
    return r ? (e === 0 ? t - 3 : e === t - 1 ? 0 : e - 1) : e;
}
function hn(e, t) {
    return t ? e + 1 : e;
}
function Ml(e, t, r) {
    return e < 0 ? null : e === 0 ? (r ? t - 1 : null) : e - 1;
}
function Kl(e, t, r) {
    return e > t - 1 ? null : e === t - 1 ? (r ? 0 : null) : e + 1;
}
function Hl(e, t) {
    return t && e > 3 ? e - 2 : e;
}
function Vo(e) {
    return window.TouchEvent && e instanceof window.TouchEvent;
}
function Wo(e, t) {
    let { offsetWidth: r, offsetHeight: n } = e;
    if (t) {
        const o = getComputedStyle(e);
        (r =
            r -
            parseFloat(o.getPropertyValue("padding-left")) -
            parseFloat(o.getPropertyValue("padding-right"))),
            (n =
                n -
                parseFloat(o.getPropertyValue("padding-top")) -
                parseFloat(o.getPropertyValue("padding-bottom")));
    }
    return { width: r, height: n };
}
function pr(e, t, r) {
    return e < t ? t : e > r ? r : e;
}
function Nl(e) {
    if (e === void 0) return 0;
    if (typeof e == "number") return e;
    const t = /^((\d+)?\.?\d+?)(ms|s)?$/,
        r = e.match(t);
    if (r) {
        const [, n, , o = "ms"] = r;
        return Number(n) * (o === "ms" ? 1 : 1e3);
    }
    return 0;
}
const Ii = Ur("n-carousel-methods"),
    Ll = (e) => {
        Zn(Ii, e);
    },
    ro = (e = "unknown", t = "component") => {
        const r = Wr(Ii);
        return r || $s(e, `\`${t}\` must be placed inside \`n-carousel\`.`), r;
    },
    Vl = {
        total: { type: Number, default: 0 },
        currentIndex: { type: Number, default: 0 },
        dotType: { type: String, default: "dot" },
        trigger: { type: String, default: "click" },
        keyboard: Boolean,
    },
    Wl = ge({
        name: "CarouselDots",
        props: Vl,
        setup(e) {
            const { mergedClsPrefixRef: t } = tt(e),
                r = Q([]),
                n = ro();
            function o(h, u) {
                switch (h.key) {
                    case "Enter":
                    case " ":
                        h.preventDefault(), n.to(u);
                        return;
                }
                e.keyboard && l(h);
            }
            function i(h) {
                e.trigger === "hover" && n.to(h);
            }
            function s(h) {
                e.trigger === "click" && n.to(h);
            }
            function l(h) {
                var u;
                if (h.shiftKey || h.altKey || h.ctrlKey || h.metaKey) return;
                const d =
                    (u = document.activeElement) === null || u === void 0
                        ? void 0
                        : u.nodeName.toLowerCase();
                if (d === "input" || d === "textarea") return;
                const { code: f } = h,
                    b = f === "PageUp" || f === "ArrowUp",
                    x = f === "PageDown" || f === "ArrowDown",
                    g = f === "PageUp" || f === "ArrowRight",
                    m = f === "PageDown" || f === "ArrowLeft",
                    v = n.isVertical(),
                    p = v ? b : g,
                    y = v ? x : m;
                (!p && !y) ||
                    (h.preventDefault(),
                    p && !n.isNextDisabled()
                        ? (n.next(), a(n.currentIndexRef.value))
                        : y &&
                          !n.isPrevDisabled() &&
                          (n.prev(), a(n.currentIndexRef.value)));
            }
            function a(h) {
                var u;
                (u = r.value[h]) === null || u === void 0 || u.focus();
            }
            return (
                As(() => (r.value.length = 0)),
                {
                    mergedClsPrefix: t,
                    dotEls: r,
                    handleKeydown: o,
                    handleMouseenter: i,
                    handleClick: s,
                }
            );
        },
        render() {
            const { mergedClsPrefix: e, dotEls: t } = this;
            return N(
                "div",
                {
                    class: [
                        `${e}-carousel__dots`,
                        `${e}-carousel__dots--${this.dotType}`,
                    ],
                    role: "tablist",
                },
                Fs(this.total, (r) => {
                    const n = r === this.currentIndex;
                    return N("div", {
                        "aria-selected": n,
                        ref: (o) => t.push(o),
                        role: "button",
                        tabindex: "0",
                        class: [
                            `${e}-carousel__dot`,
                            n && `${e}-carousel__dot--active`,
                        ],
                        key: r,
                        onClick: () => {
                            this.handleClick(r);
                        },
                        onMouseenter: () => {
                            this.handleMouseenter(r);
                        },
                        onKeydown: (o) => {
                            this.handleKeydown(o, r);
                        },
                    });
                })
            );
        },
    }),
    Ul = N(
        "svg",
        { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16" },
        N(
            "g",
            { fill: "none" },
            N("path", {
                d: "M10.26 3.2a.75.75 0 0 1 .04 1.06L6.773 8l3.527 3.74a.75.75 0 1 1-1.1 1.02l-4-4.25a.75.75 0 0 1 0-1.02l4-4.25a.75.75 0 0 1 1.06-.04z",
                fill: "currentColor",
            })
        )
    ),
    ql = N(
        "svg",
        { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16" },
        N(
            "g",
            { fill: "none" },
            N("path", {
                d: "M5.74 3.2a.75.75 0 0 0-.04 1.06L9.227 8L5.7 11.74a.75.75 0 1 0 1.1 1.02l4-4.25a.75.75 0 0 0 0-1.02l-4-4.25a.75.75 0 0 0-1.06-.04z",
                fill: "currentColor",
            })
        )
    ),
    Gl = ge({
        name: "CarouselArrow",
        setup(e) {
            const { mergedClsPrefixRef: t } = tt(e),
                {
                    isVertical: r,
                    isPrevDisabled: n,
                    isNextDisabled: o,
                    prev: i,
                    next: s,
                } = ro();
            return {
                mergedClsPrefix: t,
                isVertical: r,
                isPrevDisabled: n,
                isNextDisabled: o,
                prev: i,
                next: s,
            };
        },
        render() {
            const { mergedClsPrefix: e } = this;
            return N(
                "div",
                { class: `${e}-carousel__arrow-group` },
                N(
                    "div",
                    {
                        class: [
                            `${e}-carousel__arrow`,
                            this.isPrevDisabled() &&
                                `${e}-carousel__arrow--disabled`,
                        ],
                        role: "button",
                        onClick: this.prev,
                    },
                    Ul
                ),
                N(
                    "div",
                    {
                        class: [
                            `${e}-carousel__arrow`,
                            this.isNextDisabled() &&
                                `${e}-carousel__arrow--disabled`,
                        ],
                        role: "button",
                        onClick: this.next,
                    },
                    ql
                )
            );
        },
    }),
    Rr = "CarouselItem",
    Yl = (e) => {
        var t;
        return ((t = e.type) === null || t === void 0 ? void 0 : t.name) === Rr;
    },
    Xl = ge({
        name: Rr,
        setup(e) {
            const { mergedClsPrefixRef: t } = tt(e),
                r = ro(Ho(Rr), `n-${Ho(Rr)}`),
                n = Q(),
                o = K(() => {
                    const { value: u } = n;
                    return u ? r.getSlideIndex(u) : -1;
                }),
                i = K(() => r.isPrev(o.value)),
                s = K(() => r.isNext(o.value)),
                l = K(() => r.isActive(o.value)),
                a = K(() => r.getSlideStyle(o.value));
            er(() => {
                r.addSlide(n.value);
            }),
                tr(() => {
                    r.removeSlide(n.value);
                });
            function h(u) {
                const { value: d } = o;
                d !== void 0 && (r == null || r.onCarouselItemClick(d, u));
            }
            return {
                mergedClsPrefix: t,
                selfElRef: n,
                isPrev: i,
                isNext: s,
                isActive: l,
                index: o,
                style: a,
                handleClick: h,
            };
        },
        render() {
            var e;
            const {
                    $slots: t,
                    mergedClsPrefix: r,
                    isPrev: n,
                    isNext: o,
                    isActive: i,
                    index: s,
                    style: l,
                } = this,
                a = [
                    `${r}-carousel__slide`,
                    {
                        [`${r}-carousel__slide--current`]: i,
                        [`${r}-carousel__slide--prev`]: n,
                        [`${r}-carousel__slide--next`]: o,
                    },
                ];
            return N(
                "div",
                {
                    ref: "selfElRef",
                    class: a,
                    role: "option",
                    tabindex: "-1",
                    "data-index": s,
                    "aria-hidden": !i,
                    style: l,
                    onClickCapture: this.handleClick,
                },
                (e = t.default) === null || e === void 0
                    ? void 0
                    : e.call(t, { isPrev: n, isNext: o, isActive: i, index: s })
            );
        },
    }),
    Zl = ze(
        "carousel",
        `
 position: relative;
 width: 100%;
 height: 100%;
 touch-action: pan-y;
 overflow: hidden;
`,
        [
            I(
                "slides",
                `
 display: flex;
 width: 100%;
 height: 100%;
 transition-timing-function: var(--n-bezier);
 transition-property: transform;
 `,
                [
                    I(
                        "slide",
                        `
 flex-shrink: 0;
 position: relative;
 width: 100%;
 height: 100%;
 outline: none;
 overflow: hidden;
 `,
                        [
                            X(
                                "> img",
                                `
 display: block;
 `
                            ),
                        ]
                    ),
                ]
            ),
            I(
                "dots",
                `
 position: absolute;
 display: flex;
 flex-wrap: nowrap;
 `,
                [
                    F("dot", [
                        I(
                            "dot",
                            `
 height: var(--n-dot-size);
 width: var(--n-dot-size);
 background-color: var(--n-dot-color);
 border-radius: 50%;
 cursor: pointer;
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 outline: none;
 `,
                            [
                                X(
                                    "&:focus",
                                    `
 background-color: var(--n-dot-color-focus);
 `
                                ),
                                F(
                                    "active",
                                    `
 background-color: var(--n-dot-color-active);
 `
                                ),
                            ]
                        ),
                    ]),
                    F("line", [
                        I(
                            "dot",
                            `
 border-radius: 9999px;
 width: var(--n-dot-line-width);
 height: 4px;
 background-color: var(--n-dot-color);
 cursor: pointer;
 transition:
 width .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 outline: none;
 `,
                            [
                                X(
                                    "&:focus",
                                    `
 background-color: var(--n-dot-color-focus);
 `
                                ),
                                F(
                                    "active",
                                    `
 width: var(--n-dot-line-width-active);
 background-color: var(--n-dot-color-active);
 `
                                ),
                            ]
                        ),
                    ]),
                ]
            ),
            I(
                "arrow",
                `
 transition: background-color .3s var(--n-bezier);
 cursor: pointer;
 height: 28px;
 width: 28px;
 display: flex;
 align-items: center;
 justify-content: center;
 background-color: rgba(255, 255, 255, .2);
 color: var(--n-arrow-color);
 border-radius: 8px;
 user-select: none;
 -webkit-user-select: none;
 font-size: 18px;
 `,
                [
                    X(
                        "svg",
                        `
 height: 1em;
 width: 1em;
 `
                    ),
                    X(
                        "&:hover",
                        `
 background-color: rgba(255, 255, 255, .3);
 `
                    ),
                ]
            ),
            F(
                "vertical",
                `
 touch-action: pan-x;
 `,
                [
                    I(
                        "slides",
                        `
 flex-direction: column;
 `
                    ),
                    F("fade", [
                        I(
                            "slide",
                            `
 top: 50%;
 left: unset;
 transform: translateY(-50%);
 `
                        ),
                    ]),
                    F("card", [
                        I(
                            "slide",
                            `
 top: 50%;
 left: unset;
 transform: translateY(-50%) translateZ(-400px);
 `,
                            [
                                F(
                                    "current",
                                    `
 transform: translateY(-50%) translateZ(0);
 `
                                ),
                                F(
                                    "prev",
                                    `
 transform: translateY(-100%) translateZ(-200px);
 `
                                ),
                                F(
                                    "next",
                                    `
 transform: translateY(0%) translateZ(-200px);
 `
                                ),
                            ]
                        ),
                    ]),
                ]
            ),
            F("usercontrol", [
                I("slides", [
                    X(">", [
                        X(
                            "div",
                            `
 position: absolute;
 top: 50%;
 left: 50%;
 width: 100%;
 height: 100%;
 transform: translate(-50%, -50%);
 `
                        ),
                    ]),
                ]),
            ]),
            F("left", [
                I(
                    "dots",
                    `
 transform: translateY(-50%);
 top: 50%;
 left: 12px;
 flex-direction: column;
 `,
                    [
                        F("line", [
                            I(
                                "dot",
                                `
 width: 4px;
 height: var(--n-dot-line-width);
 margin: 4px 0;
 transition:
 height .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 outline: none;
 `,
                                [
                                    F(
                                        "active",
                                        `
 height: var(--n-dot-line-width-active);
 `
                                    ),
                                ]
                            ),
                        ]),
                    ]
                ),
                I(
                    "dot",
                    `
 margin: 4px 0;
 `
                ),
            ]),
            I(
                "arrow-group",
                `
 position: absolute;
 display: flex;
 flex-wrap: nowrap;
 `
            ),
            F("vertical", [
                I(
                    "arrow",
                    `
 transform: rotate(90deg);
 `
                ),
            ]),
            F("show-arrow", [
                F("bottom", [
                    I(
                        "dots",
                        `
 transform: translateX(0);
 bottom: 18px;
 left: 18px;
 `
                    ),
                ]),
                F("top", [
                    I(
                        "dots",
                        `
 transform: translateX(0);
 top: 18px;
 left: 18px;
 `
                    ),
                ]),
                F("left", [
                    I(
                        "dots",
                        `
 transform: translateX(0);
 top: 18px;
 left: 18px;
 `
                    ),
                ]),
                F("right", [
                    I(
                        "dots",
                        `
 transform: translateX(0);
 top: 18px;
 right: 18px;
 `
                    ),
                ]),
            ]),
            F("left", [
                I(
                    "arrow-group",
                    `
 bottom: 12px;
 left: 12px;
 flex-direction: column;
 `,
                    [
                        X(
                            "> *:first-child",
                            `
 margin-bottom: 12px;
 `
                        ),
                    ]
                ),
            ]),
            F("right", [
                I(
                    "dots",
                    `
 transform: translateY(-50%);
 top: 50%;
 right: 12px;
 flex-direction: column;
 `,
                    [
                        F("line", [
                            I(
                                "dot",
                                `
 width: 4px;
 height: var(--n-dot-line-width);
 margin: 4px 0;
 transition:
 height .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 outline: none;
 `,
                                [
                                    F(
                                        "active",
                                        `
 height: var(--n-dot-line-width-active);
 `
                                    ),
                                ]
                            ),
                        ]),
                    ]
                ),
                I(
                    "dot",
                    `
 margin: 4px 0;
 `
                ),
                I(
                    "arrow-group",
                    `
 bottom: 12px;
 right: 12px;
 flex-direction: column;
 `,
                    [
                        X(
                            "> *:first-child",
                            `
 margin-bottom: 12px;
 `
                        ),
                    ]
                ),
            ]),
            F("top", [
                I(
                    "dots",
                    `
 transform: translateX(-50%);
 top: 12px;
 left: 50%;
 `,
                    [
                        F("line", [
                            I(
                                "dot",
                                `
 margin: 0 4px;
 `
                            ),
                        ]),
                    ]
                ),
                I(
                    "dot",
                    `
 margin: 0 4px;
 `
                ),
                I(
                    "arrow-group",
                    `
 top: 12px;
 right: 12px;
 `,
                    [
                        X(
                            "> *:first-child",
                            `
 margin-right: 12px;
 `
                        ),
                    ]
                ),
            ]),
            F("bottom", [
                I(
                    "dots",
                    `
 transform: translateX(-50%);
 bottom: 12px;
 left: 50%;
 `,
                    [
                        F("line", [
                            I(
                                "dot",
                                `
 margin: 0 4px;
 `
                            ),
                        ]),
                    ]
                ),
                I(
                    "dot",
                    `
 margin: 0 4px;
 `
                ),
                I(
                    "arrow-group",
                    `
 bottom: 12px;
 right: 12px;
 `,
                    [
                        X(
                            "> *:first-child",
                            `
 margin-right: 12px;
 `
                        ),
                    ]
                ),
            ]),
            F("fade", [
                I(
                    "slide",
                    `
 position: absolute;
 opacity: 0;
 transition-property: opacity;
 pointer-events: none;
 `,
                    [
                        F(
                            "current",
                            `
 opacity: 1;
 pointer-events: auto;
 `
                        ),
                    ]
                ),
            ]),
            F("card", [
                I(
                    "slides",
                    `
 perspective: 1000px;
 `
                ),
                I(
                    "slide",
                    `
 position: absolute;
 left: 50%;
 opacity: 0;
 transform: translateX(-50%) translateZ(-400px);
 transition-property: opacity, transform;
 `,
                    [
                        F(
                            "current",
                            `
 opacity: 1;
 transform: translateX(-50%) translateZ(0);
 z-index: 1;
 `
                        ),
                        F(
                            "prev",
                            `
 opacity: 0.4;
 transform: translateX(-100%) translateZ(-200px);
 `
                        ),
                        F(
                            "next",
                            `
 opacity: 0.4;
 transform: translateX(0%) translateZ(-200px);
 `
                        ),
                    ]
                ),
            ]),
        ]
    ),
    Ql = ["transitionDuration", "transitionTimingFunction"],
    Jl = Object.assign(Object.assign({}, et.props), {
        defaultIndex: { type: Number, default: 0 },
        currentIndex: Number,
        showArrow: Boolean,
        dotType: { type: String, default: "dot" },
        dotPlacement: { type: String, default: "bottom" },
        slidesPerView: { type: [Number, String], default: 1 },
        spaceBetween: { type: Number, default: 0 },
        centeredSlides: Boolean,
        direction: { type: String, default: "horizontal" },
        autoplay: Boolean,
        interval: { type: Number, default: 5e3 },
        loop: { type: Boolean, default: !0 },
        effect: { type: String, default: "slide" },
        showDots: { type: Boolean, default: !0 },
        trigger: { type: String, default: "click" },
        transitionStyle: {
            type: Object,
            default: () => ({ transitionDuration: "300ms" }),
        },
        transitionProps: Object,
        draggable: Boolean,
        prevSlideStyle: [Object, String],
        nextSlideStyle: [Object, String],
        touchable: { type: Boolean, default: !0 },
        mousewheel: Boolean,
        keyboard: Boolean,
        "onUpdate:currentIndex": Function,
        onUpdateCurrentIndex: Function,
    });
let pn = !1;
const eu = ge({
    name: "Carousel",
    props: Jl,
    setup(e) {
        const { mergedClsPrefixRef: t, inlineThemeDisabled: r } = tt(e),
            n = Q(null),
            o = Q(null),
            i = Q([]),
            s = { value: [] },
            l = K(() => e.direction === "vertical"),
            a = K(() => (l.value ? "height" : "width")),
            h = K(() => (l.value ? "bottom" : "right")),
            u = K(() => e.effect === "slide"),
            d = K(() => e.loop && e.slidesPerView === 1 && u.value),
            f = K(() => e.effect === "custom"),
            b = K(() => (!u.value || e.centeredSlides ? 1 : e.slidesPerView)),
            x = K(() => (f.value ? 1 : e.slidesPerView)),
            g = K(
                () =>
                    b.value === "auto" ||
                    (e.slidesPerView === "auto" && e.centeredSlides)
            ),
            m = Q({ width: 0, height: 0 }),
            v = K(() => {
                const { value: k } = i;
                if (!k.length) return [];
                const { value: E } = g;
                if (E) return k.map((ie) => Wo(ie));
                const { value: D } = x,
                    { value: L } = m,
                    { value: W } = a;
                let H = L[W];
                if (D !== "auto") {
                    const { spaceBetween: ie } = e,
                        Se = H - (D - 1) * ie,
                        ur = 1 / Math.max(1, D);
                    H = Se * ur;
                }
                const ee = Object.assign(Object.assign({}, L), { [W]: H });
                return k.map(() => ee);
            }),
            p = K(() => {
                const { value: k } = v;
                if (!k.length) return [];
                const { centeredSlides: E, spaceBetween: D } = e,
                    { value: L } = a,
                    { [L]: W } = m.value;
                let H = 0;
                return k.map(({ [L]: ee }) => {
                    let ie = H;
                    return E && (ie += (ee - W) / 2), (H += ee + D), ie;
                });
            }),
            y = Q(!1),
            C = K(() => {
                const { transitionStyle: k } = e;
                return k ? xo(k, Ql) : {};
            }),
            S = K(() => (f.value ? 0 : Nl(C.value.transitionDuration))),
            R = K(() => {
                const { value: k } = i;
                if (!k.length) return [];
                const E = !(g.value || x.value === 1),
                    D = (ee) => {
                        if (E) {
                            const { value: ie } = a;
                            return { [ie]: `${v.value[ee][ie]}px` };
                        }
                    };
                if (f.value) return k.map((ee, ie) => D(ie));
                const { effect: L, spaceBetween: W } = e,
                    { value: H } = h;
                return k.reduce((ee, ie, Se) => {
                    const ur = Object.assign(Object.assign({}, D(Se)), {
                        [`margin-${H}`]: `${W}px`,
                    });
                    return (
                        ee.push(ur),
                        y.value &&
                            (L === "fade" || L === "card") &&
                            Object.assign(ur, C.value),
                        ee
                    );
                }, []);
            }),
            c = K(() => {
                const { value: k } = b,
                    { length: E } = i.value;
                if (k !== "auto") return Math.max(E - k, 0) + 1;
                {
                    const { value: D } = v,
                        { length: L } = D;
                    if (!L) return E;
                    const { value: W } = p,
                        { value: H } = a,
                        ee = m.value[H];
                    let ie = D[D.length - 1][H],
                        Se = L;
                    for (; Se > 1 && ie < ee; ) Se--, (ie += W[Se] - W[Se - 1]);
                    return pr(Se + 1, 1, L);
                }
            }),
            _ = K(() => Hl(c.value, d.value)),
            w = hn(e.defaultIndex, d.value),
            T = Q(Lo(w, c.value, d.value)),
            P = Jn(Wt(e, "currentIndex"), T),
            z = K(() => hn(P.value, d.value));
        function M(k) {
            var E, D;
            k = pr(k, 0, c.value - 1);
            const L = Lo(k, c.value, d.value),
                { value: W } = P;
            L !== P.value &&
                ((T.value = L),
                (E = e["onUpdate:currentIndex"]) === null ||
                    E === void 0 ||
                    E.call(e, L, W),
                (D = e.onUpdateCurrentIndex) === null ||
                    D === void 0 ||
                    D.call(e, L, W));
        }
        function $(k = z.value) {
            return Ml(k, c.value, e.loop);
        }
        function U(k = z.value) {
            return Kl(k, c.value, e.loop);
        }
        function G(k) {
            const E = We(k);
            return E !== null && $() === E;
        }
        function A(k) {
            const E = We(k);
            return E !== null && U() === E;
        }
        function J(k) {
            return z.value === We(k);
        }
        function ae(k) {
            return P.value === k;
        }
        function le() {
            return $() === null;
        }
        function ke() {
            return U() === null;
        }
        function Le(k) {
            const E = pr(hn(k, d.value), 0, c.value);
            (k !== P.value || E !== z.value) && M(E);
        }
        function Bt() {
            const k = $();
            k !== null && M(k);
        }
        function bt() {
            const k = U();
            k !== null && M(k);
        }
        function Jr() {
            (!pe || !d.value) && Bt();
        }
        function ne() {
            (!pe || !d.value) && bt();
        }
        let pe = !1,
            Pe = 0;
        const q = Q({});
        function Ve(k, E = 0) {
            q.value = Object.assign({}, C.value, {
                transform: l.value
                    ? `translateY(${-k}px)`
                    : `translateX(${-k}px)`,
                transitionDuration: `${E}ms`,
            });
        }
        function De(k = 0) {
            u.value
                ? $t(z.value, k)
                : Pe !== 0 && (!pe && k > 0 && (pe = !0), Ve((Pe = 0), k));
        }
        function $t(k, E) {
            const D = ir(k);
            D !== Pe && E > 0 && (pe = !0), (Pe = ir(z.value)), Ve(D, E);
        }
        function ir(k) {
            let E;
            return k >= c.value - 1 ? (E = sr()) : (E = p.value[k] || 0), E;
        }
        function sr() {
            if (b.value === "auto") {
                const { value: k } = a,
                    { [k]: E } = m.value,
                    { value: D } = p,
                    L = D[D.length - 1];
                let W;
                if (L === void 0) W = E;
                else {
                    const { value: H } = v;
                    W = L + H[H.length - 1][k];
                }
                return W - E;
            } else {
                const { value: k } = p;
                return k[c.value - 1] || 0;
            }
        }
        const rt = {
            currentIndexRef: P,
            to: Le,
            prev: Jr,
            next: ne,
            isVertical: () => l.value,
            isHorizontal: () => !l.value,
            isPrev: G,
            isNext: A,
            isActive: J,
            isPrevDisabled: le,
            isNextDisabled: ke,
            getSlideIndex: We,
            getSlideStyle: rn,
            addSlide: en,
            removeSlide: tn,
            onCarouselItemClick: oe,
        };
        Ll(rt);
        function en(k) {
            k && i.value.push(k);
        }
        function tn(k) {
            if (!k) return;
            const E = We(k);
            E !== -1 && i.value.splice(E, 1);
        }
        function We(k) {
            return typeof k == "number" ? k : k ? i.value.indexOf(k) : -1;
        }
        function rn(k) {
            const E = We(k);
            if (E !== -1) {
                const D = [R.value[E]],
                    L = rt.isPrev(E),
                    W = rt.isNext(E);
                return (
                    L && D.push(e.prevSlideStyle || ""),
                    W && D.push(e.nextSlideStyle || ""),
                    Ns(D)
                );
            }
        }
        function oe(k, E) {
            let D = !pe && !ar && !an;
            e.effect === "card" && D && !J(k) && (Le(k), (D = !1)),
                D || (E.preventDefault(), E.stopPropagation());
        }
        let se = null;
        function Be() {
            se && (clearInterval(se), (se = null));
        }
        function gt() {
            Be(),
                !e.autoplay ||
                    _.value < 2 ||
                    (se = window.setInterval(bt, e.interval));
        }
        let nn = 0,
            on = 0,
            $e = 0,
            sn = 0,
            ar = !1,
            an = !1;
        function bo(k) {
            var E;
            if (
                pn ||
                !(
                    !((E = o.value) === null || E === void 0) &&
                    E.contains(Qs(k))
                )
            )
                return;
            (pn = !0),
                (ar = !0),
                (an = !1),
                (sn = Date.now()),
                Be(),
                k.type !== "touchstart" &&
                    !k.target.isContentEditable &&
                    k.preventDefault();
            const D = Vo(k) ? k.touches[0] : k;
            l.value ? (on = D.clientY) : (nn = D.clientX),
                e.touchable &&
                    (_t("touchmove", document, lr, { passive: !0 }),
                    _t("touchend", document, mt),
                    _t("touchcancel", document, mt)),
                e.draggable &&
                    (_t("mousemove", document, lr),
                    _t("mouseup", document, mt));
        }
        function lr(k) {
            const { value: E } = l,
                { value: D } = a,
                L = Vo(k) ? k.touches[0] : k,
                W = E ? L.clientY - on : L.clientX - nn,
                H = m.value[D];
            ($e = pr(W, -H, H)),
                k.cancelable && k.preventDefault(),
                u.value && Ve(Pe - $e, 0);
        }
        function mt() {
            const { value: k } = z;
            let E = k;
            if (!pe && $e !== 0 && u.value) {
                const D = Pe - $e,
                    L = [...p.value.slice(0, c.value - 1), sr()];
                let W = null;
                for (let H = 0; H < L.length; H++) {
                    const ee = Math.abs(L[H] - D);
                    if (W !== null && W < ee) break;
                    (W = ee), (E = H);
                }
            }
            if (E === k) {
                const D = Date.now() - sn,
                    { value: L } = a,
                    W = m.value[L];
                $e > W / 2 || $e / D > 0.4
                    ? (E = $(k))
                    : ($e < -W / 2 || $e / D < -0.4) && (E = U(k));
            }
            E !== null && E !== k
                ? ((an = !0),
                  M(E),
                  Br(() => {
                      (!d.value || T.value !== P.value) && De(S.value);
                  }))
                : De(S.value),
                go(),
                gt();
        }
        function go() {
            ar && (pn = !1),
                (ar = !1),
                (nn = 0),
                (on = 0),
                ($e = 0),
                (sn = 0),
                Ct("touchmove", document, lr),
                Ct("touchend", document, mt),
                Ct("touchcancel", document, mt),
                Ct("mousemove", document, lr),
                Ct("mouseup", document, mt);
        }
        function hs() {
            if (u.value && pe) {
                const { value: k } = z;
                $t(k, 0);
            } else gt();
            u.value && (q.value.transitionDuration = "0ms"), (pe = !1);
        }
        function ps(k) {
            if ((k.preventDefault(), pe)) return;
            let { deltaX: E, deltaY: D } = k;
            k.shiftKey && !E && (E = D);
            const L = -1,
                W = 1,
                H = (E || D) > 0 ? W : L;
            let ee = 0,
                ie = 0;
            l.value ? (ie = H) : (ee = H);
            const Se = 10;
            (ie * D >= Se || ee * E >= Se) &&
                (H === W && !ke() ? bt() : H === L && !le() && Bt());
        }
        function vs() {
            (m.value = Wo(n.value, !0)), gt();
        }
        function bs() {
            var k, E;
            g.value &&
                ((E = (k = v.effect).scheduler) === null ||
                    E === void 0 ||
                    E.call(k),
                v.effect.run());
        }
        function gs() {
            e.autoplay && Be();
        }
        function ms() {
            e.autoplay && gt();
        }
        er(() => {
            js(gt), requestAnimationFrame(() => (y.value = !0));
        }),
            tr(() => {
                go(), Be();
            }),
            Ms(() => {
                const { value: k } = i,
                    { value: E } = s,
                    D = new Map(),
                    L = (H) => (D.has(H) ? D.get(H) : -1);
                let W = !1;
                for (let H = 0; H < k.length; H++) {
                    const ee = E.findIndex((ie) => ie.el === k[H]);
                    ee !== H && (W = !0), D.set(k[H], ee);
                }
                W && k.sort((H, ee) => L(H) - L(ee));
            }),
            it(
                z,
                (k, E) => {
                    if (k !== E)
                        if ((gt(), u.value)) {
                            if (d.value && _.value > 2) {
                                const { value: D } = c;
                                k === D - 2 && E === 1
                                    ? (k = 0)
                                    : k === 1 && E === D - 2 && (k = D - 1);
                            }
                            $t(k, S.value);
                        } else De();
                },
                { immediate: !0 }
            ),
            it(
                [d, b],
                () =>
                    void Br(() => {
                        M(z.value);
                    })
            ),
            it(
                p,
                () => {
                    u.value && De();
                },
                { deep: !0 }
            ),
            it(u, (k) => {
                k ? De() : ((pe = !1), Ve((Pe = 0)));
            });
        const ys = K(() => ({
                onTouchstartPassive: e.touchable ? bo : void 0,
                onMousedown: e.draggable ? bo : void 0,
                onWheel: e.mousewheel ? ps : void 0,
            })),
            xs = K(() =>
                Object.assign(
                    Object.assign(
                        {},
                        xo(rt, [
                            "to",
                            "prev",
                            "next",
                            "isPrevDisabled",
                            "isNextDisabled",
                        ])
                    ),
                    { total: _.value, currentIndex: P.value }
                )
            ),
            ws = K(() => ({
                total: _.value,
                currentIndex: P.value,
                to: rt.to,
            })),
            _s = { getCurrentIndex: () => P.value, to: Le, prev: Bt, next: bt },
            Cs = et("Carousel", "-carousel", Zl, Fl, e, t),
            mo = K(() => {
                const {
                    common: { cubicBezierEaseInOut: k },
                    self: {
                        dotSize: E,
                        dotColor: D,
                        dotColorActive: L,
                        dotColorFocus: W,
                        dotLineWidth: H,
                        dotLineWidthActive: ee,
                        arrowColor: ie,
                    },
                } = Cs.value;
                return {
                    "--n-bezier": k,
                    "--n-dot-color": D,
                    "--n-dot-color-focus": W,
                    "--n-dot-color-active": L,
                    "--n-dot-size": E,
                    "--n-dot-line-width": H,
                    "--n-dot-line-width-active": ee,
                    "--n-arrow-color": ie,
                };
            }),
            yt = r ? Gr("carousel", void 0, mo, e) : void 0;
        return Object.assign(
            Object.assign(
                {
                    mergedClsPrefix: t,
                    selfElRef: n,
                    slidesElRef: o,
                    slideVNodes: s,
                    duplicatedable: d,
                    userWantsControl: f,
                    autoSlideSize: g,
                    displayIndex: P,
                    realIndex: z,
                    slideStyles: R,
                    translateStyle: q,
                    slidesControlListeners: ys,
                    handleTransitionEnd: hs,
                    handleResize: vs,
                    handleSlideResize: bs,
                    handleMouseenter: gs,
                    handleMouseleave: ms,
                    isActive: ae,
                    arrowSlotProps: xs,
                    dotSlotProps: ws,
                },
                _s
            ),
            {
                cssVars: r ? void 0 : mo,
                themeClass: yt == null ? void 0 : yt.themeClass,
                onRender: yt == null ? void 0 : yt.onRender,
            }
        );
    },
    render() {
        var e;
        const {
                mergedClsPrefix: t,
                showArrow: r,
                userWantsControl: n,
                slideStyles: o,
                dotType: i,
                dotPlacement: s,
                slidesControlListeners: l,
                transitionProps: a = {},
                arrowSlotProps: h,
                dotSlotProps: u,
                $slots: { default: d, dots: f, arrow: b },
            } = this,
            x = (d && Ar(d())) || [];
        let g = tu(x);
        return (
            g.length ||
                (g = x.map((m) => N(Xl, null, { default: () => ci(m) }))),
            this.duplicatedable && (g = jl(g)),
            (this.slideVNodes.value = g),
            this.autoSlideSize &&
                (g = g.map((m) =>
                    N(
                        $o,
                        { onResize: this.handleSlideResize },
                        { default: () => m }
                    )
                )),
            (e = this.onRender) === null || e === void 0 || e.call(this),
            N(
                "div",
                Object.assign(
                    {
                        ref: "selfElRef",
                        class: [
                            this.themeClass,
                            `${t}-carousel`,
                            this.direction === "vertical" &&
                                `${t}-carousel--vertical`,
                            this.showArrow && `${t}-carousel--show-arrow`,
                            `${t}-carousel--${s}`,
                            `${t}-carousel--${this.direction}`,
                            `${t}-carousel--${this.effect}`,
                            n && `${t}-carousel--usercontrol`,
                        ],
                        style: this.cssVars,
                    },
                    l,
                    {
                        onMouseenter: this.handleMouseenter,
                        onMouseleave: this.handleMouseleave,
                    }
                ),
                N(
                    $o,
                    { onResize: this.handleResize },
                    {
                        default: () =>
                            N(
                                "div",
                                {
                                    ref: "slidesElRef",
                                    class: `${t}-carousel__slides`,
                                    role: "listbox",
                                    style: this.translateStyle,
                                    onTransitionend: this.handleTransitionEnd,
                                },
                                n
                                    ? g.map((m, v) =>
                                          N(
                                              "div",
                                              { style: o[v], key: v },
                                              Ks(
                                                  N(Cr, Object.assign({}, a), {
                                                      default: () => m,
                                                  }),
                                                  [[Hs, this.isActive(v)]]
                                              )
                                          )
                                      )
                                    : g
                            ),
                    }
                ),
                this.showDots &&
                    u.total > 1 &&
                    wo(f, u, () => [
                        N(Wl, {
                            key: i + s,
                            total: u.total,
                            currentIndex: u.currentIndex,
                            dotType: i,
                            trigger: this.trigger,
                            keyboard: this.keyboard,
                        }),
                    ]),
                r && wo(b, h, () => [N(Gl, null)])
            )
        );
    },
});
function tu(e) {
    return e.reduce((t, r) => (Yl(r) && t.push(r), t), []);
}
const ru = {
        radioSizeSmall: "14px",
        radioSizeMedium: "16px",
        radioSizeLarge: "18px",
        labelPadding: "0 8px",
        labelFontWeight: "400",
    },
    nu = (e) => {
        const {
            borderColor: t,
            primaryColor: r,
            baseColor: n,
            textColorDisabled: o,
            inputColorDisabled: i,
            textColor2: s,
            opacityDisabled: l,
            borderRadius: a,
            fontSizeSmall: h,
            fontSizeMedium: u,
            fontSizeLarge: d,
            heightSmall: f,
            heightMedium: b,
            heightLarge: x,
            lineHeight: g,
        } = e;
        return Object.assign(Object.assign({}, ru), {
            labelLineHeight: g,
            buttonHeightSmall: f,
            buttonHeightMedium: b,
            buttonHeightLarge: x,
            fontSizeSmall: h,
            fontSizeMedium: u,
            fontSizeLarge: d,
            boxShadow: `inset 0 0 0 1px ${t}`,
            boxShadowActive: `inset 0 0 0 1px ${r}`,
            boxShadowFocus: `inset 0 0 0 1px ${r}, 0 0 0 2px ${Rt(r, {
                alpha: 0.2,
            })}`,
            boxShadowHover: `inset 0 0 0 1px ${r}`,
            boxShadowDisabled: `inset 0 0 0 1px ${t}`,
            color: n,
            colorDisabled: i,
            colorActive: "#0000",
            textColor: s,
            textColorDisabled: o,
            dotColorActive: r,
            dotColorDisabled: t,
            buttonBorderColor: t,
            buttonBorderColorActive: r,
            buttonBorderColorHover: t,
            buttonColor: n,
            buttonColorActive: n,
            buttonTextColor: s,
            buttonTextColorActive: r,
            buttonTextColorHover: r,
            opacityDisabled: l,
            buttonBoxShadowFocus: `inset 0 0 0 1px ${r}, 0 0 0 2px ${Rt(r, {
                alpha: 0.3,
            })}`,
            buttonBoxShadowHover: "inset 0 0 0 1px #0000",
            buttonBoxShadow: "inset 0 0 0 1px #0000",
            buttonBorderRadius: a,
        });
    },
    ou = { name: "Radio", common: qr, self: nu },
    iu = ou,
    su = {
        name: String,
        value: { type: [String, Number, Boolean], default: "on" },
        checked: { type: Boolean, default: void 0 },
        defaultChecked: Boolean,
        disabled: { type: Boolean, default: void 0 },
        label: String,
        size: String,
        onUpdateChecked: [Function, Array],
        "onUpdate:checked": [Function, Array],
        checkedValue: { type: Boolean, default: void 0 },
    },
    Di = Ur("n-radio-group");
function au(e) {
    const t = to(e, {
            mergedSize(p) {
                const { size: y } = e;
                if (y !== void 0) return y;
                if (s) {
                    const {
                        mergedSizeRef: { value: C },
                    } = s;
                    if (C !== void 0) return C;
                }
                return p ? p.mergedSize.value : "medium";
            },
            mergedDisabled(p) {
                return !!(
                    e.disabled ||
                    (s != null && s.disabledRef.value) ||
                    (p != null && p.disabled.value)
                );
            },
        }),
        { mergedSizeRef: r, mergedDisabledRef: n } = t,
        o = Q(null),
        i = Q(null),
        s = Wr(Di, null),
        l = Q(e.defaultChecked),
        a = Wt(e, "checked"),
        h = Jn(a, l),
        u = Cn(() => (s ? s.valueRef.value === e.value : h.value)),
        d = Cn(() => {
            const { name: p } = e;
            if (p !== void 0) return p;
            if (s) return s.nameRef.value;
        }),
        f = Q(!1);
    function b() {
        if (s) {
            const { doUpdateValue: p } = s,
                { value: y } = e;
            at(p, y);
        } else {
            const { onUpdateChecked: p, "onUpdate:checked": y } = e,
                { nTriggerFormInput: C, nTriggerFormChange: S } = t;
            p && at(p, !0), y && at(y, !0), C(), S(), (l.value = !0);
        }
    }
    function x() {
        n.value || u.value || b();
    }
    function g() {
        x();
    }
    function m() {
        f.value = !1;
    }
    function v() {
        f.value = !0;
    }
    return {
        mergedClsPrefix: s ? s.mergedClsPrefixRef : tt(e).mergedClsPrefixRef,
        inputRef: o,
        labelRef: i,
        mergedName: d,
        mergedDisabled: n,
        uncontrolledChecked: l,
        renderSafeChecked: u,
        focus: f,
        mergedSize: r,
        handleRadioInputChange: g,
        handleRadioInputBlur: m,
        handleRadioInputFocus: v,
    };
}
const lu = ze(
    "radio-group",
    `
 display: inline-block;
 font-size: var(--n-font-size);
`,
    [
        I(
            "splitor",
            `
 display: inline-block;
 vertical-align: bottom;
 width: 1px;
 transition:
 background-color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 background: var(--n-button-border-color);
 `,
            [
                F("checked", {
                    backgroundColor: "var(--n-button-border-color-active)",
                }),
                F("disabled", { opacity: "var(--n-opacity-disabled)" }),
            ]
        ),
        F(
            "button-group",
            `
 white-space: nowrap;
 height: var(--n-height);
 line-height: var(--n-height);
 `,
            [
                ze("radio-button", {
                    height: "var(--n-height)",
                    lineHeight: "var(--n-height)",
                }),
                I("splitor", { height: "var(--n-height)" }),
            ]
        ),
        ze(
            "radio-button",
            `
 vertical-align: bottom;
 outline: none;
 position: relative;
 user-select: none;
 -webkit-user-select: none;
 display: inline-block;
 box-sizing: border-box;
 padding-left: 14px;
 padding-right: 14px;
 white-space: nowrap;
 transition:
 background-color .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 color: var(--n-button-text-color);
 border-top: 1px solid var(--n-button-border-color);
 border-bottom: 1px solid var(--n-button-border-color);
 `,
            [
                ze(
                    "radio-input",
                    `
 pointer-events: none;
 position: absolute;
 border: 0;
 border-radius: inherit;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 opacity: 0;
 z-index: 1;
 `
                ),
                I(
                    "state-border",
                    `
 z-index: 1;
 pointer-events: none;
 position: absolute;
 box-shadow: var(--n-button-box-shadow);
 transition: box-shadow .3s var(--n-bezier);
 left: -1px;
 bottom: -1px;
 right: -1px;
 top: -1px;
 `
                ),
                X(
                    "&:first-child",
                    `
 border-top-left-radius: var(--n-button-border-radius);
 border-bottom-left-radius: var(--n-button-border-radius);
 border-left: 1px solid var(--n-button-border-color);
 `,
                    [
                        I(
                            "state-border",
                            `
 border-top-left-radius: var(--n-button-border-radius);
 border-bottom-left-radius: var(--n-button-border-radius);
 `
                        ),
                    ]
                ),
                X(
                    "&:last-child",
                    `
 border-top-right-radius: var(--n-button-border-radius);
 border-bottom-right-radius: var(--n-button-border-radius);
 border-right: 1px solid var(--n-button-border-color);
 `,
                    [
                        I(
                            "state-border",
                            `
 border-top-right-radius: var(--n-button-border-radius);
 border-bottom-right-radius: var(--n-button-border-radius);
 `
                        ),
                    ]
                ),
                $r(
                    "disabled",
                    `
 cursor: pointer;
 `,
                    [
                        X("&:hover", [
                            I(
                                "state-border",
                                `
 transition: box-shadow .3s var(--n-bezier);
 box-shadow: var(--n-button-box-shadow-hover);
 `
                            ),
                            $r("checked", {
                                color: "var(--n-button-text-color-hover)",
                            }),
                        ]),
                        F("focus", [
                            X("&:not(:active)", [
                                I("state-border", {
                                    boxShadow:
                                        "var(--n-button-box-shadow-focus)",
                                }),
                            ]),
                        ]),
                    ]
                ),
                F(
                    "checked",
                    `
 background: var(--n-button-color-active);
 color: var(--n-button-text-color-active);
 border-color: var(--n-button-border-color-active);
 `
                ),
                F(
                    "disabled",
                    `
 cursor: not-allowed;
 opacity: var(--n-opacity-disabled);
 `
                ),
            ]
        ),
    ]
);
function uu(e, t, r) {
    var n;
    const o = [];
    let i = !1;
    for (let s = 0; s < e.length; ++s) {
        const l = e[s],
            a = (n = l.type) === null || n === void 0 ? void 0 : n.name;
        a === "RadioButton" && (i = !0);
        const h = l.props;
        if (a !== "RadioButton") {
            o.push(l);
            continue;
        }
        if (s === 0) o.push(l);
        else {
            const u = o[o.length - 1].props,
                d = t === u.value,
                f = u.disabled,
                b = t === h.value,
                x = h.disabled,
                g = (d ? 2 : 0) + (f ? 0 : 1),
                m = (b ? 2 : 0) + (x ? 0 : 1),
                v = {
                    [`${r}-radio-group__splitor--disabled`]: f,
                    [`${r}-radio-group__splitor--checked`]: d,
                },
                p = {
                    [`${r}-radio-group__splitor--disabled`]: x,
                    [`${r}-radio-group__splitor--checked`]: b,
                },
                y = g < m ? p : v;
            o.push(N("div", { class: [`${r}-radio-group__splitor`, y] }), l);
        }
    }
    return { children: o, isButtonGroup: i };
}
const cu = Object.assign(Object.assign({}, et.props), {
        name: String,
        value: [String, Number, Boolean],
        defaultValue: { type: [String, Number, Boolean], default: null },
        size: String,
        disabled: { type: Boolean, default: void 0 },
        "onUpdate:value": [Function, Array],
        onUpdateValue: [Function, Array],
    }),
    du = ge({
        name: "RadioGroup",
        props: cu,
        setup(e) {
            const t = Q(null),
                {
                    mergedSizeRef: r,
                    mergedDisabledRef: n,
                    nTriggerFormChange: o,
                    nTriggerFormInput: i,
                    nTriggerFormBlur: s,
                    nTriggerFormFocus: l,
                } = to(e),
                {
                    mergedClsPrefixRef: a,
                    inlineThemeDisabled: h,
                    mergedRtlRef: u,
                } = tt(e),
                d = et("Radio", "-radio-group", lu, iu, e, a),
                f = Q(e.defaultValue),
                b = Wt(e, "value"),
                x = Jn(b, f);
            function g(S) {
                const { onUpdateValue: R, "onUpdate:value": c } = e;
                R && at(R, S), c && at(c, S), (f.value = S), o(), i();
            }
            function m(S) {
                const { value: R } = t;
                R && (R.contains(S.relatedTarget) || l());
            }
            function v(S) {
                const { value: R } = t;
                R && (R.contains(S.relatedTarget) || s());
            }
            Zn(Di, {
                mergedClsPrefixRef: a,
                nameRef: Wt(e, "name"),
                valueRef: x,
                disabledRef: n,
                mergedSizeRef: r,
                doUpdateValue: g,
            });
            const p = ui("Radio", u, a),
                y = K(() => {
                    const { value: S } = r,
                        {
                            common: { cubicBezierEaseInOut: R },
                            self: {
                                buttonBorderColor: c,
                                buttonBorderColorActive: _,
                                buttonBorderRadius: w,
                                buttonBoxShadow: T,
                                buttonBoxShadowFocus: P,
                                buttonBoxShadowHover: z,
                                buttonColorActive: M,
                                buttonTextColor: $,
                                buttonTextColorActive: U,
                                buttonTextColorHover: G,
                                opacityDisabled: A,
                                [V("buttonHeight", S)]: J,
                                [V("fontSize", S)]: ae,
                            },
                        } = d.value;
                    return {
                        "--n-font-size": ae,
                        "--n-bezier": R,
                        "--n-button-border-color": c,
                        "--n-button-border-color-active": _,
                        "--n-button-border-radius": w,
                        "--n-button-box-shadow": T,
                        "--n-button-box-shadow-focus": P,
                        "--n-button-box-shadow-hover": z,
                        "--n-button-color-active": M,
                        "--n-button-text-color": $,
                        "--n-button-text-color-hover": G,
                        "--n-button-text-color-active": U,
                        "--n-height": J,
                        "--n-opacity-disabled": A,
                    };
                }),
                C = h
                    ? Gr(
                          "radio-group",
                          K(() => r.value[0]),
                          y,
                          e
                      )
                    : void 0;
            return {
                selfElRef: t,
                rtlEnabled: p,
                mergedClsPrefix: a,
                mergedValue: x,
                handleFocusout: v,
                handleFocusin: m,
                cssVars: h ? void 0 : y,
                themeClass: C == null ? void 0 : C.themeClass,
                onRender: C == null ? void 0 : C.onRender,
            };
        },
        render() {
            var e;
            const {
                    mergedValue: t,
                    mergedClsPrefix: r,
                    handleFocusin: n,
                    handleFocusout: o,
                } = this,
                { children: i, isButtonGroup: s } = uu(Ar(Js(this)), t, r);
            return (
                (e = this.onRender) === null || e === void 0 || e.call(this),
                N(
                    "div",
                    {
                        onFocusin: n,
                        onFocusout: o,
                        ref: "selfElRef",
                        class: [
                            `${r}-radio-group`,
                            this.rtlEnabled && `${r}-radio-group--rtl`,
                            this.themeClass,
                            s && `${r}-radio-group--button-group`,
                        ],
                        style: this.cssVars,
                    },
                    i
                )
            );
        },
    }),
    fu = ge({
        name: "RadioButton",
        props: su,
        setup: au,
        render() {
            const { mergedClsPrefix: e } = this;
            return N(
                "label",
                {
                    class: [
                        `${e}-radio-button`,
                        this.mergedDisabled && `${e}-radio-button--disabled`,
                        this.renderSafeChecked && `${e}-radio-button--checked`,
                        this.focus && [`${e}-radio-button--focus`],
                    ],
                },
                N("input", {
                    ref: "inputRef",
                    type: "radio",
                    class: `${e}-radio-input`,
                    value: this.value,
                    name: this.mergedName,
                    checked: this.renderSafeChecked,
                    disabled: this.mergedDisabled,
                    onChange: this.handleRadioInputChange,
                    onFocus: this.handleRadioInputFocus,
                    onBlur: this.handleRadioInputBlur,
                }),
                N("div", { class: `${e}-radio-button__state-border` }),
                Sn(this.$slots.default, (t) =>
                    !t && !this.label
                        ? null
                        : N(
                              "div",
                              { ref: "labelRef", class: `${e}-radio__label` },
                              t || this.label
                          )
                )
            );
        },
    }),
    hu = (e) => {
        const {
            textColorBase: t,
            opacity1: r,
            opacity2: n,
            opacity3: o,
            opacity4: i,
            opacity5: s,
        } = e;
        return {
            color: t,
            opacity1Depth: r,
            opacity2Depth: n,
            opacity3Depth: o,
            opacity4Depth: i,
            opacity5Depth: s,
        };
    },
    pu = { name: "Icon", common: qr, self: hu },
    vu = pu,
    bu = ze(
        "icon",
        `
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
 transform: translateZ(0);
`,
        [
            F("color-transition", { transition: "color .3s var(--n-bezier)" }),
            F("depth", { color: "var(--n-color)" }, [
                X("svg", {
                    opacity: "var(--n-opacity)",
                    transition: "opacity .3s var(--n-bezier)",
                }),
            ]),
            X("svg", { height: "1em", width: "1em" }),
        ]
    ),
    gu = Object.assign(Object.assign({}, et.props), {
        depth: [String, Number],
        size: [Number, String],
        color: String,
        component: Object,
    }),
    vr = ge({
        _n_icon__: !0,
        name: "Icon",
        inheritAttrs: !1,
        props: gu,
        setup(e) {
            const { mergedClsPrefixRef: t, inlineThemeDisabled: r } = tt(e),
                n = et("Icon", "-icon", bu, vu, e, t),
                o = K(() => {
                    const { depth: s } = e,
                        {
                            common: { cubicBezierEaseInOut: l },
                            self: a,
                        } = n.value;
                    if (s !== void 0) {
                        const { color: h, [`opacity${s}Depth`]: u } = a;
                        return {
                            "--n-bezier": l,
                            "--n-color": h,
                            "--n-opacity": u,
                        };
                    }
                    return {
                        "--n-bezier": l,
                        "--n-color": "",
                        "--n-opacity": "",
                    };
                }),
                i = r
                    ? Gr(
                          "icon",
                          K(() => `${e.depth || "d"}`),
                          o,
                          e
                      )
                    : void 0;
            return {
                mergedClsPrefix: t,
                mergedStyle: K(() => {
                    const { size: s, color: l } = e;
                    return { fontSize: ra(s), color: l };
                }),
                cssVars: r ? void 0 : o,
                themeClass: i == null ? void 0 : i.themeClass,
                onRender: i == null ? void 0 : i.onRender,
            };
        },
        render() {
            var e;
            const {
                $parent: t,
                depth: r,
                mergedClsPrefix: n,
                component: o,
                onRender: i,
                themeClass: s,
            } = this;
            return (
                !(
                    (e = t == null ? void 0 : t.$options) === null ||
                    e === void 0
                ) &&
                    e._n_icon__ &&
                    Ls("icon", "don't wrap `n-icon` inside `n-icon`"),
                i == null || i(),
                N(
                    "i",
                    Vs(this.$attrs, {
                        role: "img",
                        class: [
                            `${n}-icon`,
                            s,
                            {
                                [`${n}-icon--depth`]: r,
                                [`${n}-icon--color-transition`]: r !== void 0,
                            },
                        ],
                        style: [this.cssVars, this.mergedStyle],
                    }),
                    o ? N(o) : this.$slots
                )
            );
        },
    }),
    mu = "" + globalThis.__publicAssetsURL("icons/pwa-192x192.png");
function yu(e) {
    return Ws() ? (Us(e), !0) : !1;
}
function Bi(e) {
    return typeof e == "function" ? e() : Y(e);
}
const xu = typeof window < "u" && typeof document < "u",
    Uo = () => {};
function wu(e, t) {
    function r(...n) {
        return new Promise((o, i) => {
            Promise.resolve(
                e(() => t.apply(this, n), { fn: t, thisArg: this, args: n })
            )
                .then(o)
                .catch(i);
        });
    }
    return r;
}
function _u(e, t = !0, r = !0, n = !1) {
    let o = 0,
        i,
        s = !0,
        l = Uo,
        a;
    const h = () => {
        i && (clearTimeout(i), (i = void 0), l(), (l = Uo));
    };
    return (d) => {
        const f = Bi(e),
            b = Date.now() - o,
            x = () => (a = d());
        return (
            h(),
            f <= 0
                ? ((o = Date.now()), x())
                : (b > f && (r || !s)
                      ? ((o = Date.now()), x())
                      : t &&
                        (a = new Promise((g, m) => {
                            (l = n ? m : g),
                                (i = setTimeout(() => {
                                    (o = Date.now()), (s = !0), g(x()), h();
                                }, Math.max(0, f - b)));
                        })),
                  !r && !i && (i = setTimeout(() => (s = !0), f)),
                  (s = !1),
                  a)
        );
    };
}
function Cu(e, t = 200, r = !1, n = !0, o = !1) {
    return wu(_u(t, r, n, o), e);
}
function qo(e) {
    var t;
    const r = Bi(e);
    return (t = r == null ? void 0 : r.$el) != null ? t : r;
}
const Su = xu ? window : void 0;
function ku() {
    const e = Q(!1);
    return (
        ai() &&
            er(() => {
                e.value = !0;
            }),
        e
    );
}
function Ru(e) {
    const t = ku();
    return K(() => (t.value, !!e()));
}
function Pu(e, t, r = {}) {
    const { window: n = Su, ...o } = r;
    let i;
    const s = Ru(() => n && "ResizeObserver" in n),
        l = () => {
            i && (i.disconnect(), (i = void 0));
        },
        a = K(() => (Array.isArray(e) ? e.map((d) => qo(d)) : [qo(e)])),
        h = it(
            a,
            (d) => {
                if ((l(), s.value && n)) {
                    i = new ResizeObserver(t);
                    for (const f of d) f && i.observe(f, o);
                }
            },
            { immediate: !0, flush: "post", deep: !0 }
        ),
        u = () => {
            l(), h();
        };
    return yu(u), { isSupported: s, stop: u };
}
const te =
        typeof globalThis < "u"
            ? globalThis
            : typeof self < "u"
            ? self
            : typeof window < "u"
            ? window
            : global,
    ce = Object.keys,
    be = Array.isArray;
function we(e, t) {
    return (
        typeof t != "object" ||
            ce(t).forEach(function (r) {
                e[r] = t[r];
            }),
        e
    );
}
typeof Promise > "u" || te.Promise || (te.Promise = Promise);
const qt = Object.getPrototypeOf,
    Eu = {}.hasOwnProperty;
function Ce(e, t) {
    return Eu.call(e, t);
}
function zt(e, t) {
    typeof t == "function" && (t = t(qt(e))),
        (typeof Reflect > "u" ? ce : Reflect.ownKeys)(t).forEach((r) => {
            Ke(e, r, t[r]);
        });
}
const $i = Object.defineProperty;
function Ke(e, t, r, n) {
    $i(
        e,
        t,
        we(
            r && Ce(r, "get") && typeof r.get == "function"
                ? { get: r.get, set: r.set, configurable: !0 }
                : { value: r, configurable: !0, writable: !0 },
            n
        )
    );
}
function Et(e) {
    return {
        from: function (t) {
            return (
                (e.prototype = Object.create(t.prototype)),
                Ke(e.prototype, "constructor", e),
                { extend: zt.bind(null, e.prototype) }
            );
        },
    };
}
const Tu = Object.getOwnPropertyDescriptor;
function no(e, t) {
    let r;
    return Tu(e, t) || ((r = qt(e)) && no(r, t));
}
const Ou = [].slice;
function Fr(e, t, r) {
    return Ou.call(e, t, r);
}
function Ai(e, t) {
    return t(e);
}
function Ft(e) {
    if (!e) throw new Error("Assertion Failed");
}
function Fi(e) {
    te.setImmediate ? setImmediate(e) : setTimeout(e, 0);
}
function ji(e, t) {
    return e.reduce((r, n, o) => {
        var i = t(n, o);
        return i && (r[i[0]] = i[1]), r;
    }, {});
}
function He(e, t) {
    if (Ce(e, t)) return e[t];
    if (!t) return e;
    if (typeof t != "string") {
        for (var r = [], n = 0, o = t.length; n < o; ++n) {
            var i = He(e, t[n]);
            r.push(i);
        }
        return r;
    }
    var s = t.indexOf(".");
    if (s !== -1) {
        var l = e[t.substr(0, s)];
        return l === void 0 ? void 0 : He(l, t.substr(s + 1));
    }
}
function Re(e, t, r) {
    if (e && t !== void 0 && (!("isFrozen" in Object) || !Object.isFrozen(e)))
        if (typeof t != "string" && "length" in t) {
            Ft(typeof r != "string" && "length" in r);
            for (var n = 0, o = t.length; n < o; ++n) Re(e, t[n], r[n]);
        } else {
            var i = t.indexOf(".");
            if (i !== -1) {
                var s = t.substr(0, i),
                    l = t.substr(i + 1);
                if (l === "")
                    r === void 0
                        ? be(e) && !isNaN(parseInt(s))
                            ? e.splice(s, 1)
                            : delete e[s]
                        : (e[s] = r);
                else {
                    var a = e[s];
                    (a && Ce(e, s)) || (a = e[s] = {}), Re(a, l, r);
                }
            } else
                r === void 0
                    ? be(e) && !isNaN(parseInt(t))
                        ? e.splice(t, 1)
                        : delete e[t]
                    : (e[t] = r);
        }
}
function Mi(e) {
    var t = {};
    for (var r in e) Ce(e, r) && (t[r] = e[r]);
    return t;
}
const zu = [].concat;
function Ki(e) {
    return zu.apply([], e);
}
const Hi =
        "Boolean,String,Date,RegExp,Blob,File,FileList,FileSystemFileHandle,ArrayBuffer,DataView,Uint8ClampedArray,ImageBitmap,ImageData,Map,Set,CryptoKey"
            .split(",")
            .concat(
                Ki(
                    [8, 16, 32, 64].map((e) =>
                        ["Int", "Uint", "Float"].map((t) => t + e + "Array")
                    )
                )
            )
            .filter((e) => te[e]),
    Iu = Hi.map((e) => te[e]);
ji(Hi, (e) => [e, !0]);
let Ye = null;
function rr(e) {
    Ye = typeof WeakMap < "u" && new WeakMap();
    const t = Rn(e);
    return (Ye = null), t;
}
function Rn(e) {
    if (!e || typeof e != "object") return e;
    let t = Ye && Ye.get(e);
    if (t) return t;
    if (be(e)) {
        (t = []), Ye && Ye.set(e, t);
        for (var r = 0, n = e.length; r < n; ++r) t.push(Rn(e[r]));
    } else if (Iu.indexOf(e.constructor) >= 0) t = e;
    else {
        const i = qt(e);
        for (var o in ((t = i === Object.prototype ? {} : Object.create(i)),
        Ye && Ye.set(e, t),
        e))
            Ce(e, o) && (t[o] = Rn(e[o]));
    }
    return t;
}
const { toString: Du } = {};
function Pn(e) {
    return Du.call(e).slice(8, -1);
}
const En = typeof Symbol < "u" ? Symbol.iterator : "@@iterator",
    Bu =
        typeof En == "symbol"
            ? function (e) {
                  var t;
                  return e != null && (t = e[En]) && t.apply(e);
              }
            : function () {
                  return null;
              },
    kt = {};
function je(e) {
    var t, r, n, o;
    if (arguments.length === 1) {
        if (be(e)) return e.slice();
        if (this === kt && typeof e == "string") return [e];
        if ((o = Bu(e))) {
            for (r = []; !(n = o.next()).done; ) r.push(n.value);
            return r;
        }
        if (e == null) return [e];
        if (typeof (t = e.length) == "number") {
            for (r = new Array(t); t--; ) r[t] = e[t];
            return r;
        }
        return [e];
    }
    for (t = arguments.length, r = new Array(t); t--; ) r[t] = arguments[t];
    return r;
}
const oo =
    typeof Symbol < "u"
        ? (e) => e[Symbol.toStringTag] === "AsyncFunction"
        : () => !1;
var Ie =
    typeof location < "u" &&
    /^(http|https):\/\/(localhost|127\.0\.0\.1)/.test(location.href);
function Ni(e, t) {
    (Ie = e), (Li = t);
}
var Li = () => !0;
const $u = !new Error("").stack;
function vt() {
    if ($u)
        try {
            throw (vt.arguments, new Error());
        } catch (e) {
            return e;
        }
    return new Error();
}
function Tn(e, t) {
    var r = e.stack;
    return r
        ? ((t = t || 0),
          r.indexOf(e.name) === 0 &&
              (t += (e.name + e.message).split(`
`).length),
          r
              .split(
                  `
`
              )
              .slice(t)
              .filter(Li)
              .map(
                  (n) =>
                      `
` + n
              )
              .join(""))
        : "";
}
var Vi = [
        "Unknown",
        "Constraint",
        "Data",
        "TransactionInactive",
        "ReadOnly",
        "Version",
        "NotFound",
        "InvalidState",
        "InvalidAccess",
        "Abort",
        "Timeout",
        "QuotaExceeded",
        "Syntax",
        "DataClone",
    ],
    io = [
        "Modify",
        "Bulk",
        "OpenFailed",
        "VersionChange",
        "Schema",
        "Upgrade",
        "InvalidTable",
        "MissingAPI",
        "NoSuchDatabase",
        "InvalidArgument",
        "SubTransaction",
        "Unsupported",
        "Internal",
        "DatabaseClosed",
        "PrematureCommit",
        "ForeignAwait",
    ].concat(Vi),
    Au = {
        VersionChanged: "Database version changed by other database connection",
        DatabaseClosed: "Database has been closed",
        Abort: "Transaction aborted",
        TransactionInactive: "Transaction has already completed or failed",
        MissingAPI:
            "IndexedDB API missing. Please visit https://tinyurl.com/y2uuvskb",
    };
function Tt(e, t) {
    (this._e = vt()), (this.name = e), (this.message = t);
}
function Wi(e, t) {
    return (
        e +
        ". Errors: " +
        Object.keys(t)
            .map((r) => t[r].toString())
            .filter((r, n, o) => o.indexOf(r) === n).join(`
`)
    );
}
function jr(e, t, r, n) {
    (this._e = vt()),
        (this.failures = t),
        (this.failedKeys = n),
        (this.successCount = r),
        (this.message = Wi(e, t));
}
function Kt(e, t) {
    (this._e = vt()),
        (this.name = "BulkError"),
        (this.failures = Object.keys(t).map((r) => t[r])),
        (this.failuresByPos = t),
        (this.message = Wi(e, t));
}
Et(Tt)
    .from(Error)
    .extend({
        stack: {
            get: function () {
                return (
                    this._stack ||
                    (this._stack =
                        this.name + ": " + this.message + Tn(this._e, 2))
                );
            },
        },
        toString: function () {
            return this.name + ": " + this.message;
        },
    }),
    Et(jr).from(Tt),
    Et(Kt).from(Tt);
var so = io.reduce((e, t) => ((e[t] = t + "Error"), e), {});
const Fu = Tt;
var j = io.reduce((e, t) => {
    var r = t + "Error";
    function n(o, i) {
        (this._e = vt()),
            (this.name = r),
            o
                ? typeof o == "string"
                    ? ((this.message = `${o}${
                          i
                              ? `
 ` + i
                              : ""
                      }`),
                      (this.inner = i || null))
                    : typeof o == "object" &&
                      ((this.message = `${o.name} ${o.message}`),
                      (this.inner = o))
                : ((this.message = Au[t] || r), (this.inner = null));
    }
    return Et(n).from(Fu), (e[t] = n), e;
}, {});
(j.Syntax = SyntaxError), (j.Type = TypeError), (j.Range = RangeError);
var Go = Vi.reduce((e, t) => ((e[t + "Error"] = j[t]), e), {}),
    Pr = io.reduce(
        (e, t) => (
            ["Syntax", "Type", "Range"].indexOf(t) === -1 &&
                (e[t + "Error"] = j[t]),
            e
        ),
        {}
    );
function Z() {}
function Gt(e) {
    return e;
}
function ju(e, t) {
    return e == null || e === Gt
        ? t
        : function (r) {
              return t(e(r));
          };
}
function ht(e, t) {
    return function () {
        e.apply(this, arguments), t.apply(this, arguments);
    };
}
function Mu(e, t) {
    return e === Z
        ? t
        : function () {
              var r = e.apply(this, arguments);
              r !== void 0 && (arguments[0] = r);
              var n = this.onsuccess,
                  o = this.onerror;
              (this.onsuccess = null), (this.onerror = null);
              var i = t.apply(this, arguments);
              return (
                  n &&
                      (this.onsuccess = this.onsuccess
                          ? ht(n, this.onsuccess)
                          : n),
                  o && (this.onerror = this.onerror ? ht(o, this.onerror) : o),
                  i !== void 0 ? i : r
              );
          };
}
function Ku(e, t) {
    return e === Z
        ? t
        : function () {
              e.apply(this, arguments);
              var r = this.onsuccess,
                  n = this.onerror;
              (this.onsuccess = this.onerror = null),
                  t.apply(this, arguments),
                  r &&
                      (this.onsuccess = this.onsuccess
                          ? ht(r, this.onsuccess)
                          : r),
                  n && (this.onerror = this.onerror ? ht(n, this.onerror) : n);
          };
}
function Hu(e, t) {
    return e === Z
        ? t
        : function (r) {
              var n = e.apply(this, arguments);
              we(r, n);
              var o = this.onsuccess,
                  i = this.onerror;
              (this.onsuccess = null), (this.onerror = null);
              var s = t.apply(this, arguments);
              return (
                  o &&
                      (this.onsuccess = this.onsuccess
                          ? ht(o, this.onsuccess)
                          : o),
                  i && (this.onerror = this.onerror ? ht(i, this.onerror) : i),
                  n === void 0 ? (s === void 0 ? void 0 : s) : we(n, s)
              );
          };
}
function Nu(e, t) {
    return e === Z
        ? t
        : function () {
              return (
                  t.apply(this, arguments) !== !1 && e.apply(this, arguments)
              );
          };
}
function ao(e, t) {
    return e === Z
        ? t
        : function () {
              var r = e.apply(this, arguments);
              if (r && typeof r.then == "function") {
                  for (
                      var n = this, o = arguments.length, i = new Array(o);
                      o--;

                  )
                      i[o] = arguments[o];
                  return r.then(function () {
                      return t.apply(n, i);
                  });
              }
              return t.apply(this, arguments);
          };
}
(Pr.ModifyError = jr), (Pr.DexieError = Tt), (Pr.BulkError = Kt);
var Yt = {};
const Ui = 100,
    [On, Mr, zn] =
        typeof Promise > "u"
            ? []
            : (() => {
                  let e = Promise.resolve();
                  if (typeof crypto > "u" || !crypto.subtle)
                      return [e, qt(e), e];
                  const t = crypto.subtle.digest(
                      "SHA-512",
                      new Uint8Array([0])
                  );
                  return [t, qt(t), e];
              })(),
    qi = Mr && Mr.then,
    Er = On && On.constructor,
    lo = !!zn;
var In = !1,
    Lu = zn
        ? () => {
              zn.then(br);
          }
        : te.setImmediate
        ? setImmediate.bind(null, br)
        : te.MutationObserver
        ? () => {
              var e = document.createElement("div");
              new MutationObserver(() => {
                  br(), (e = null);
              }).observe(e, { attributes: !0 }),
                  e.setAttribute("i", "1");
          }
        : () => {
              setTimeout(br, 0);
          },
    Ht = function (e, t) {
        jt.push([e, t]), Kr && (Lu(), (Kr = !1));
    },
    Dn = !0,
    Kr = !0,
    ct = [],
    Tr = [],
    Bn = null,
    $n = Gt,
    Ot = {
        id: "global",
        global: !0,
        ref: 0,
        unhandleds: [],
        onunhandled: Zo,
        pgp: !1,
        env: {},
        finalize: function () {
            this.unhandleds.forEach((e) => {
                try {
                    Zo(e[0], e[1]);
                } catch {}
            });
        },
    },
    B = Ot,
    jt = [],
    dt = 0,
    Or = [];
function O(e) {
    if (typeof this != "object")
        throw new TypeError("Promises must be constructed via new");
    (this._listeners = []), (this.onuncatched = Z), (this._lib = !1);
    var t = (this._PSD = B);
    if (
        (Ie &&
            ((this._stackHolder = vt()),
            (this._prev = null),
            (this._numPrev = 0)),
        typeof e != "function")
    ) {
        if (e !== Yt) throw new TypeError("Not a function");
        return (
            (this._state = arguments[1]),
            (this._value = arguments[2]),
            void (this._state === !1 && Fn(this, this._value))
        );
    }
    (this._state = null), (this._value = null), ++t.ref, Yi(this, e);
}
const An = {
    get: function () {
        var e = B,
            t = Hr;
        function r(n, o) {
            var i = !e.global && (e !== B || t !== Hr);
            const s = i && !Ne();
            var l = new O((a, h) => {
                uo(this, new Gi(Nr(n, e, i, s), Nr(o, e, i, s), a, h, e));
            });
            return Ie && Qi(l, this), l;
        }
        return (r.prototype = Yt), r;
    },
    set: function (e) {
        Ke(
            this,
            "then",
            e && e.prototype === Yt
                ? An
                : {
                      get: function () {
                          return e;
                      },
                      set: An.set,
                  }
        );
    },
};
function Gi(e, t, r, n, o) {
    (this.onFulfilled = typeof e == "function" ? e : null),
        (this.onRejected = typeof t == "function" ? t : null),
        (this.resolve = r),
        (this.reject = n),
        (this.psd = o);
}
function Yi(e, t) {
    try {
        t((r) => {
            if (e._state === null) {
                if (r === e)
                    throw new TypeError(
                        "A promise cannot be resolved with itself."
                    );
                var n = e._lib && nr();
                r && typeof r.then == "function"
                    ? Yi(e, (o, i) => {
                          r instanceof O ? r._then(o, i) : r.then(o, i);
                      })
                    : ((e._state = !0), (e._value = r), Xi(e)),
                    n && or();
            }
        }, Fn.bind(null, e));
    } catch (r) {
        Fn(e, r);
    }
}
function Fn(e, t) {
    if ((Tr.push(t), e._state === null)) {
        var r = e._lib && nr();
        (t = $n(t)),
            (e._state = !1),
            (e._value = t),
            Ie &&
                t !== null &&
                typeof t == "object" &&
                !t._promise &&
                (function (n, o, i) {
                    try {
                        n.apply(null, i);
                    } catch (s) {
                        o && o(s);
                    }
                })(() => {
                    var n = no(t, "stack");
                    (t._promise = e),
                        Ke(t, "stack", {
                            get: () =>
                                In
                                    ? n && (n.get ? n.get.apply(t) : n.value)
                                    : e.stack,
                        });
                }),
            (function (n) {
                ct.some((o) => o._value === n._value) || ct.push(n);
            })(e),
            Xi(e),
            r && or();
    }
}
function Xi(e) {
    var t = e._listeners;
    e._listeners = [];
    for (var r = 0, n = t.length; r < n; ++r) uo(e, t[r]);
    var o = e._PSD;
    --o.ref || o.finalize(),
        dt === 0 &&
            (++dt,
            Ht(() => {
                --dt == 0 && co();
            }, []));
}
function uo(e, t) {
    if (e._state !== null) {
        var r = e._state ? t.onFulfilled : t.onRejected;
        if (r === null) return (e._state ? t.resolve : t.reject)(e._value);
        ++t.psd.ref, ++dt, Ht(Vu, [r, e, t]);
    } else e._listeners.push(t);
}
function Vu(e, t, r) {
    try {
        Bn = t;
        var n,
            o = t._value;
        t._state
            ? (n = e(o))
            : (Tr.length && (Tr = []),
              (n = e(o)),
              Tr.indexOf(o) === -1 &&
                  (function (i) {
                      for (var s = ct.length; s; )
                          if (ct[--s]._value === i._value)
                              return void ct.splice(s, 1);
                  })(t)),
            r.resolve(n);
    } catch (i) {
        r.reject(i);
    } finally {
        (Bn = null), --dt == 0 && co(), --r.psd.ref || r.psd.finalize();
    }
}
function Zi(e, t, r) {
    if (t.length === r) return t;
    var n = "";
    if (e._state === !1) {
        var o,
            i,
            s = e._value;
        s != null
            ? ((o = s.name || "Error"), (i = s.message || s), (n = Tn(s, 0)))
            : ((o = s), (i = "")),
            t.push(o + (i ? ": " + i : "") + n);
    }
    return (
        Ie &&
            ((n = Tn(e._stackHolder, 2)) && t.indexOf(n) === -1 && t.push(n),
            e._prev && Zi(e._prev, t, r)),
        t
    );
}
function Qi(e, t) {
    var r = t ? t._numPrev + 1 : 0;
    r < 100 && ((e._prev = t), (e._numPrev = r));
}
function br() {
    nr() && or();
}
function nr() {
    var e = Dn;
    return (Dn = !1), (Kr = !1), e;
}
function or() {
    var e, t, r;
    do
        for (; jt.length > 0; )
            for (e = jt, jt = [], r = e.length, t = 0; t < r; ++t) {
                var n = e[t];
                n[0].apply(null, n[1]);
            }
    while (jt.length > 0);
    (Dn = !0), (Kr = !0);
}
function co() {
    var e = ct;
    (ct = []),
        e.forEach((n) => {
            n._PSD.onunhandled.call(null, n._value, n);
        });
    for (var t = Or.slice(0), r = t.length; r; ) t[--r]();
}
function gr(e) {
    return new O(Yt, !1, e);
}
function re(e, t) {
    var r = B;
    return function () {
        var n = nr(),
            o = B;
        try {
            return Qe(r, !0), e.apply(this, arguments);
        } catch (i) {
            t && t(i);
        } finally {
            Qe(o, !1), n && or();
        }
    };
}
zt(O.prototype, {
    then: An,
    _then: function (e, t) {
        uo(this, new Gi(null, null, e, t, B));
    },
    catch: function (e) {
        if (arguments.length === 1) return this.then(null, e);
        var t = arguments[0],
            r = arguments[1];
        return typeof t == "function"
            ? this.then(null, (n) => (n instanceof t ? r(n) : gr(n)))
            : this.then(null, (n) => (n && n.name === t ? r(n) : gr(n)));
    },
    finally: function (e) {
        return this.then(
            (t) => (e(), t),
            (t) => (e(), gr(t))
        );
    },
    stack: {
        get: function () {
            if (this._stack) return this._stack;
            try {
                In = !0;
                var e = Zi(this, [], 20).join(`
From previous: `);
                return this._state !== null && (this._stack = e), e;
            } finally {
                In = !1;
            }
        },
    },
    timeout: function (e, t) {
        return e < 1 / 0
            ? new O((r, n) => {
                  var o = setTimeout(() => n(new j.Timeout(t)), e);
                  this.then(r, n).finally(clearTimeout.bind(null, o));
              })
            : this;
    },
}),
    typeof Symbol < "u" &&
        Symbol.toStringTag &&
        Ke(O.prototype, Symbol.toStringTag, "Dexie.Promise"),
    (Ot.env = Ji()),
    zt(O, {
        all: function () {
            var e = je.apply(null, arguments).map(mr);
            return new O(function (t, r) {
                e.length === 0 && t([]);
                var n = e.length;
                e.forEach((o, i) =>
                    O.resolve(o).then((s) => {
                        (e[i] = s), --n || t(e);
                    }, r)
                );
            });
        },
        resolve: (e) => {
            if (e instanceof O) return e;
            if (e && typeof e.then == "function")
                return new O((r, n) => {
                    e.then(r, n);
                });
            var t = new O(Yt, !0, e);
            return Qi(t, Bn), t;
        },
        reject: gr,
        race: function () {
            var e = je.apply(null, arguments).map(mr);
            return new O((t, r) => {
                e.map((n) => O.resolve(n).then(t, r));
            });
        },
        PSD: { get: () => B, set: (e) => (B = e) },
        totalEchoes: { get: () => Hr },
        newPSD: Ze,
        usePSD: Dt,
        scheduler: {
            get: () => Ht,
            set: (e) => {
                Ht = e;
            },
        },
        rejectionMapper: {
            get: () => $n,
            set: (e) => {
                $n = e;
            },
        },
        follow: (e, t) =>
            new O((r, n) =>
                Ze(
                    (o, i) => {
                        var s = B;
                        (s.unhandleds = []),
                            (s.onunhandled = i),
                            (s.finalize = ht(function () {
                                (function (l) {
                                    function a() {
                                        l(), Or.splice(Or.indexOf(a), 1);
                                    }
                                    Or.push(a),
                                        ++dt,
                                        Ht(() => {
                                            --dt == 0 && co();
                                        }, []);
                                })(() => {
                                    this.unhandleds.length === 0
                                        ? o()
                                        : i(this.unhandleds[0]);
                                });
                            }, s.finalize)),
                            e();
                    },
                    t,
                    r,
                    n
                )
            ),
    }),
    Er &&
        (Er.allSettled &&
            Ke(O, "allSettled", function () {
                const e = je.apply(null, arguments).map(mr);
                return new O((t) => {
                    e.length === 0 && t([]);
                    let r = e.length;
                    const n = new Array(r);
                    e.forEach((o, i) =>
                        O.resolve(o)
                            .then(
                                (s) =>
                                    (n[i] = { status: "fulfilled", value: s }),
                                (s) =>
                                    (n[i] = { status: "rejected", reason: s })
                            )
                            .then(() => --r || t(n))
                    );
                });
            }),
        Er.any &&
            typeof AggregateError < "u" &&
            Ke(O, "any", function () {
                const e = je.apply(null, arguments).map(mr);
                return new O((t, r) => {
                    e.length === 0 && r(new AggregateError([]));
                    let n = e.length;
                    const o = new Array(n);
                    e.forEach((i, s) =>
                        O.resolve(i).then(
                            (l) => t(l),
                            (l) => {
                                (o[s] = l), --n || r(new AggregateError(o));
                            }
                        )
                    );
                });
            }));
const ve = { awaits: 0, echoes: 0, id: 0 };
var Wu = 0,
    zr = [],
    vn = 0,
    Hr = 0,
    Uu = 0;
function Ze(e, t, r, n) {
    var o = B,
        i = Object.create(o);
    (i.parent = o), (i.ref = 0), (i.global = !1), (i.id = ++Uu);
    var s = Ot.env;
    (i.env = lo
        ? {
              Promise: O,
              PromiseProp: { value: O, configurable: !0, writable: !0 },
              all: O.all,
              race: O.race,
              allSettled: O.allSettled,
              any: O.any,
              resolve: O.resolve,
              reject: O.reject,
              nthen: Yo(s.nthen, i),
              gthen: Yo(s.gthen, i),
          }
        : {}),
        t && we(i, t),
        ++o.ref,
        (i.finalize = function () {
            --this.parent.ref || this.parent.finalize();
        });
    var l = Dt(i, e, r, n);
    return i.ref === 0 && i.finalize(), l;
}
function It() {
    return ve.id || (ve.id = ++Wu), ++ve.awaits, (ve.echoes += Ui), ve.id;
}
function Ne() {
    return (
        !!ve.awaits &&
        (--ve.awaits == 0 && (ve.id = 0), (ve.echoes = ve.awaits * Ui), !0)
    );
}
function mr(e) {
    return ve.echoes && e && e.constructor === Er
        ? (It(),
          e.then(
              (t) => (Ne(), t),
              (t) => (Ne(), de(t))
          ))
        : e;
}
function qu(e) {
    ++Hr,
        (ve.echoes && --ve.echoes != 0) || (ve.echoes = ve.id = 0),
        zr.push(B),
        Qe(e, !0);
}
function Gu() {
    var e = zr[zr.length - 1];
    zr.pop(), Qe(e, !1);
}
function Qe(e, t) {
    var r = B;
    if (
        ((t ? !ve.echoes || (vn++ && e === B) : !vn || (--vn && e === B)) ||
            es(t ? qu.bind(null, e) : Gu),
        e !== B && ((B = e), r === Ot && (Ot.env = Ji()), lo))
    ) {
        var n = Ot.env.Promise,
            o = e.env;
        (Mr.then = o.nthen),
            (n.prototype.then = o.gthen),
            (r.global || e.global) &&
                (Object.defineProperty(te, "Promise", o.PromiseProp),
                (n.all = o.all),
                (n.race = o.race),
                (n.resolve = o.resolve),
                (n.reject = o.reject),
                o.allSettled && (n.allSettled = o.allSettled),
                o.any && (n.any = o.any));
    }
}
function Ji() {
    var e = te.Promise;
    return lo
        ? {
              Promise: e,
              PromiseProp: Object.getOwnPropertyDescriptor(te, "Promise"),
              all: e.all,
              race: e.race,
              allSettled: e.allSettled,
              any: e.any,
              resolve: e.resolve,
              reject: e.reject,
              nthen: Mr.then,
              gthen: e.prototype.then,
          }
        : {};
}
function Dt(e, t, r, n, o) {
    var i = B;
    try {
        return Qe(e, !0), t(r, n, o);
    } finally {
        Qe(i, !1);
    }
}
function es(e) {
    qi.call(On, e);
}
function Nr(e, t, r, n) {
    return typeof e != "function"
        ? e
        : function () {
              var o = B;
              r && It(), Qe(t, !0);
              try {
                  return e.apply(this, arguments);
              } finally {
                  Qe(o, !1), n && es(Ne);
              }
          };
}
function Yo(e, t) {
    return function (r, n) {
        return e.call(this, Nr(r, t), Nr(n, t));
    };
}
("" + qi).indexOf("[native code]") === -1 && (It = Ne = Z);
const Xo = "unhandledrejection";
function Zo(e, t) {
    var r;
    try {
        r = t.onuncatched(e);
    } catch {}
    if (r !== !1)
        try {
            var n,
                o = { promise: t, reason: e };
            if (
                (te.document && document.createEvent
                    ? ((n = document.createEvent("Event")).initEvent(
                          Xo,
                          !0,
                          !0
                      ),
                      we(n, o))
                    : te.CustomEvent &&
                      we((n = new CustomEvent(Xo, { detail: o })), o),
                n &&
                    te.dispatchEvent &&
                    (dispatchEvent(n),
                    !te.PromiseRejectionEvent && te.onunhandledrejection))
            )
                try {
                    te.onunhandledrejection(n);
                } catch {}
            Ie &&
                n &&
                !n.defaultPrevented &&
                console.warn(`Unhandled rejection: ${e.stack || e}`);
        } catch {}
}
var de = O.reject;
function jn(e, t, r, n) {
    if (e.idbdb && (e._state.openComplete || B.letThrough || e._vip)) {
        var o = e._createTransaction(t, r, e._dbSchema);
        try {
            o.create(), (e._state.PR1398_maxLoop = 3);
        } catch (i) {
            return i.name === so.InvalidState &&
                e.isOpen() &&
                --e._state.PR1398_maxLoop > 0
                ? (console.warn("Dexie: Need to reopen db"),
                  e._close(),
                  e.open().then(() => jn(e, t, r, n)))
                : de(i);
        }
        return o
            ._promise(t, (i, s) => Ze(() => ((B.trans = o), n(i, s, o))))
            .then((i) => o._completion.then(() => i));
    }
    if (e._state.openComplete)
        return de(new j.DatabaseClosed(e._state.dbOpenError));
    if (!e._state.isBeingOpened) {
        if (!e._options.autoOpen) return de(new j.DatabaseClosed());
        e.open().catch(Z);
    }
    return e._state.dbReadyPromise.then(() => jn(e, t, r, n));
}
const Qo = "3.2.4",
    st = String.fromCharCode(65535),
    Mn = -1 / 0,
    Ae =
        "Invalid key provided. Keys must be of type string, number, Date or Array<string | number | Date>.",
    ts = "String expected.",
    Nt = [],
    Zr =
        typeof navigator < "u" &&
        /(MSIE|Trident|Edge)/.test(navigator.userAgent),
    Yu = Zr,
    Xu = Zr,
    rs = (e) => !/(dexie\.js|dexie\.min\.js)/.test(e),
    Qr = "__dbnames",
    bn = "readonly",
    gn = "readwrite";
function pt(e, t) {
    return e
        ? t
            ? function () {
                  return e.apply(this, arguments) && t.apply(this, arguments);
              }
            : e
        : t;
}
const ns = {
    type: 3,
    lower: -1 / 0,
    lowerOpen: !1,
    upper: [[]],
    upperOpen: !1,
};
function yr(e) {
    return typeof e != "string" || /\./.test(e)
        ? (t) => t
        : (t) => (t[e] === void 0 && e in t && delete (t = rr(t))[e], t);
}
class Zu {
    _trans(t, r, n) {
        const o = this._tx || B.trans,
            i = this.name;
        function s(a, h, u) {
            if (!u.schema[i])
                throw new j.NotFound("Table " + i + " not part of transaction");
            return r(u.idbtrans, u);
        }
        const l = nr();
        try {
            return o && o.db === this.db
                ? o === B.trans
                    ? o._promise(t, s, n)
                    : Ze(() => o._promise(t, s, n), {
                          trans: o,
                          transless: B.transless || B,
                      })
                : jn(this.db, t, [this.name], s);
        } finally {
            l && or();
        }
    }
    get(t, r) {
        return t && t.constructor === Object
            ? this.where(t).first(r)
            : this._trans("readonly", (n) =>
                  this.core
                      .get({ trans: n, key: t })
                      .then((o) => this.hook.reading.fire(o))
              ).then(r);
    }
    where(t) {
        if (typeof t == "string") return new this.db.WhereClause(this, t);
        if (be(t)) return new this.db.WhereClause(this, `[${t.join("+")}]`);
        const r = ce(t);
        if (r.length === 1) return this.where(r[0]).equals(t[r[0]]);
        const n = this.schema.indexes
            .concat(this.schema.primKey)
            .filter(
                (h) =>
                    h.compound &&
                    r.every((u) => h.keyPath.indexOf(u) >= 0) &&
                    h.keyPath.every((u) => r.indexOf(u) >= 0)
            )[0];
        if (n && this.db._maxKey !== st)
            return this.where(n.name).equals(n.keyPath.map((h) => t[h]));
        !n &&
            Ie &&
            console.warn(
                `The query ${JSON.stringify(t)} on ${
                    this.name
                } would benefit of a compound index [${r.join("+")}]`
            );
        const { idxByName: o } = this.schema,
            i = this.db._deps.indexedDB;
        function s(h, u) {
            try {
                return i.cmp(h, u) === 0;
            } catch {
                return !1;
            }
        }
        const [l, a] = r.reduce(
            ([h, u], d) => {
                const f = o[d],
                    b = t[d];
                return [
                    h || f,
                    h || !f
                        ? pt(
                              u,
                              f && f.multi
                                  ? (x) => {
                                        const g = He(x, d);
                                        return be(g) && g.some((m) => s(b, m));
                                    }
                                  : (x) => s(b, He(x, d))
                          )
                        : u,
                ];
            },
            [null, null]
        );
        return l
            ? this.where(l.name).equals(t[l.keyPath]).filter(a)
            : n
            ? this.filter(a)
            : this.where(r).equals("");
    }
    filter(t) {
        return this.toCollection().and(t);
    }
    count(t) {
        return this.toCollection().count(t);
    }
    offset(t) {
        return this.toCollection().offset(t);
    }
    limit(t) {
        return this.toCollection().limit(t);
    }
    each(t) {
        return this.toCollection().each(t);
    }
    toArray(t) {
        return this.toCollection().toArray(t);
    }
    toCollection() {
        return new this.db.Collection(new this.db.WhereClause(this));
    }
    orderBy(t) {
        return new this.db.Collection(
            new this.db.WhereClause(this, be(t) ? `[${t.join("+")}]` : t)
        );
    }
    reverse() {
        return this.toCollection().reverse();
    }
    mapToClass(t) {
        this.schema.mappedClass = t;
        const r = (n) => {
            if (!n) return n;
            const o = Object.create(t.prototype);
            for (var i in n)
                if (Ce(n, i))
                    try {
                        o[i] = n[i];
                    } catch {}
            return o;
        };
        return (
            this.schema.readHook &&
                this.hook.reading.unsubscribe(this.schema.readHook),
            (this.schema.readHook = r),
            this.hook("reading", r),
            t
        );
    }
    defineClass() {
        return this.mapToClass(function (t) {
            we(this, t);
        });
    }
    add(t, r) {
        const { auto: n, keyPath: o } = this.schema.primKey;
        let i = t;
        return (
            o && n && (i = yr(o)(t)),
            this._trans("readwrite", (s) =>
                this.core.mutate({
                    trans: s,
                    type: "add",
                    keys: r != null ? [r] : null,
                    values: [i],
                })
            )
                .then((s) =>
                    s.numFailures ? O.reject(s.failures[0]) : s.lastResult
                )
                .then((s) => {
                    if (o)
                        try {
                            Re(t, o, s);
                        } catch {}
                    return s;
                })
        );
    }
    update(t, r) {
        if (typeof t != "object" || be(t))
            return this.where(":id").equals(t).modify(r);
        {
            const n = He(t, this.schema.primKey.keyPath);
            if (n === void 0)
                return de(
                    new j.InvalidArgument(
                        "Given object does not contain its primary key"
                    )
                );
            try {
                typeof r != "function"
                    ? ce(r).forEach((o) => {
                          Re(t, o, r[o]);
                      })
                    : r(t, { value: t, primKey: n });
            } catch {}
            return this.where(":id").equals(n).modify(r);
        }
    }
    put(t, r) {
        const { auto: n, keyPath: o } = this.schema.primKey;
        let i = t;
        return (
            o && n && (i = yr(o)(t)),
            this._trans("readwrite", (s) =>
                this.core.mutate({
                    trans: s,
                    type: "put",
                    values: [i],
                    keys: r != null ? [r] : null,
                })
            )
                .then((s) =>
                    s.numFailures ? O.reject(s.failures[0]) : s.lastResult
                )
                .then((s) => {
                    if (o)
                        try {
                            Re(t, o, s);
                        } catch {}
                    return s;
                })
        );
    }
    delete(t) {
        return this._trans("readwrite", (r) =>
            this.core.mutate({ trans: r, type: "delete", keys: [t] })
        ).then((r) => (r.numFailures ? O.reject(r.failures[0]) : void 0));
    }
    clear() {
        return this._trans("readwrite", (t) =>
            this.core.mutate({ trans: t, type: "deleteRange", range: ns })
        ).then((t) => (t.numFailures ? O.reject(t.failures[0]) : void 0));
    }
    bulkGet(t) {
        return this._trans("readonly", (r) =>
            this.core
                .getMany({ keys: t, trans: r })
                .then((n) => n.map((o) => this.hook.reading.fire(o)))
        );
    }
    bulkAdd(t, r, n) {
        const o = Array.isArray(r) ? r : void 0,
            i = (n = n || (o ? void 0 : r)) ? n.allKeys : void 0;
        return this._trans("readwrite", (s) => {
            const { auto: l, keyPath: a } = this.schema.primKey;
            if (a && o)
                throw new j.InvalidArgument(
                    "bulkAdd(): keys argument invalid on tables with inbound keys"
                );
            if (o && o.length !== t.length)
                throw new j.InvalidArgument(
                    "Arguments objects and keys must have the same length"
                );
            const h = t.length;
            let u = a && l ? t.map(yr(a)) : t;
            return this.core
                .mutate({
                    trans: s,
                    type: "add",
                    keys: o,
                    values: u,
                    wantResults: i,
                })
                .then(
                    ({
                        numFailures: d,
                        results: f,
                        lastResult: b,
                        failures: x,
                    }) => {
                        if (d === 0) return i ? f : b;
                        throw new Kt(
                            `${this.name}.bulkAdd(): ${d} of ${h} operations failed`,
                            x
                        );
                    }
                );
        });
    }
    bulkPut(t, r, n) {
        const o = Array.isArray(r) ? r : void 0,
            i = (n = n || (o ? void 0 : r)) ? n.allKeys : void 0;
        return this._trans("readwrite", (s) => {
            const { auto: l, keyPath: a } = this.schema.primKey;
            if (a && o)
                throw new j.InvalidArgument(
                    "bulkPut(): keys argument invalid on tables with inbound keys"
                );
            if (o && o.length !== t.length)
                throw new j.InvalidArgument(
                    "Arguments objects and keys must have the same length"
                );
            const h = t.length;
            let u = a && l ? t.map(yr(a)) : t;
            return this.core
                .mutate({
                    trans: s,
                    type: "put",
                    keys: o,
                    values: u,
                    wantResults: i,
                })
                .then(
                    ({
                        numFailures: d,
                        results: f,
                        lastResult: b,
                        failures: x,
                    }) => {
                        if (d === 0) return i ? f : b;
                        throw new Kt(
                            `${this.name}.bulkPut(): ${d} of ${h} operations failed`,
                            x
                        );
                    }
                );
        });
    }
    bulkDelete(t) {
        const r = t.length;
        return this._trans("readwrite", (n) =>
            this.core.mutate({ trans: n, type: "delete", keys: t })
        ).then(({ numFailures: n, lastResult: o, failures: i }) => {
            if (n === 0) return o;
            throw new Kt(
                `${this.name}.bulkDelete(): ${n} of ${r} operations failed`,
                i
            );
        });
    }
}
function Lt(e) {
    var t = {},
        r = function (s, l) {
            if (l) {
                for (var a = arguments.length, h = new Array(a - 1); --a; )
                    h[a - 1] = arguments[a];
                return t[s].subscribe.apply(null, h), e;
            }
            if (typeof s == "string") return t[s];
        };
    r.addEventType = i;
    for (var n = 1, o = arguments.length; n < o; ++n) i(arguments[n]);
    return r;
    function i(s, l, a) {
        if (typeof s != "object") {
            var h;
            l || (l = Nu), a || (a = Z);
            var u = {
                subscribers: [],
                fire: a,
                subscribe: function (d) {
                    u.subscribers.indexOf(d) === -1 &&
                        (u.subscribers.push(d), (u.fire = l(u.fire, d)));
                },
                unsubscribe: function (d) {
                    (u.subscribers = u.subscribers.filter(function (f) {
                        return f !== d;
                    })),
                        (u.fire = u.subscribers.reduce(l, a));
                },
            };
            return (t[s] = r[s] = u), u;
        }
        ce((h = s)).forEach(function (d) {
            var f = h[d];
            if (be(f)) i(d, h[d][0], h[d][1]);
            else {
                if (f !== "asap")
                    throw new j.InvalidArgument("Invalid event config");
                var b = i(d, Gt, function () {
                    for (var x = arguments.length, g = new Array(x); x--; )
                        g[x] = arguments[x];
                    b.subscribers.forEach(function (m) {
                        Fi(function () {
                            m.apply(null, g);
                        });
                    });
                });
            }
        });
    }
}
function At(e, t) {
    return Et(t).from({ prototype: e }), t;
}
function xt(e, t) {
    return (
        !(e.filter || e.algorithm || e.or) &&
        (t ? e.justLimit : !e.replayFilter)
    );
}
function mn(e, t) {
    e.filter = pt(e.filter, t);
}
function yn(e, t, r) {
    var n = e.replayFilter;
    (e.replayFilter = n ? () => pt(n(), t()) : t), (e.justLimit = r && !n);
}
function Ir(e, t) {
    if (e.isPrimKey) return t.primaryKey;
    const r = t.getIndexByKeyPath(e.index);
    if (!r)
        throw new j.Schema(
            "KeyPath " +
                e.index +
                " on object store " +
                t.name +
                " is not indexed"
        );
    return r;
}
function Jo(e, t, r) {
    const n = Ir(e, t.schema);
    return t.openCursor({
        trans: r,
        values: !e.keysOnly,
        reverse: e.dir === "prev",
        unique: !!e.unique,
        query: { index: n, range: e.range },
    });
}
function xr(e, t, r, n) {
    const o = e.replayFilter ? pt(e.filter, e.replayFilter()) : e.filter;
    if (e.or) {
        const i = {},
            s = (l, a, h) => {
                if (
                    !o ||
                    o(
                        a,
                        h,
                        (f) => a.stop(f),
                        (f) => a.fail(f)
                    )
                ) {
                    var u = a.primaryKey,
                        d = "" + u;
                    d === "[object ArrayBuffer]" &&
                        (d = "" + new Uint8Array(u)),
                        Ce(i, d) || ((i[d] = !0), t(l, a, h));
                }
            };
        return Promise.all([
            e.or._iterate(s, r),
            ei(Jo(e, n, r), e.algorithm, s, !e.keysOnly && e.valueMapper),
        ]);
    }
    return ei(Jo(e, n, r), pt(e.algorithm, o), t, !e.keysOnly && e.valueMapper);
}
function ei(e, t, r, n) {
    var o = re(n ? (i, s, l) => r(n(i), s, l) : r);
    return e.then((i) => {
        if (i)
            return i.start(() => {
                var s = () => i.continue();
                (t &&
                    !t(
                        i,
                        (l) => (s = l),
                        (l) => {
                            i.stop(l), (s = Z);
                        },
                        (l) => {
                            i.fail(l), (s = Z);
                        }
                    )) ||
                    o(i.value, i, (l) => (s = l)),
                    s();
            });
    });
}
function xe(e, t) {
    try {
        const r = ti(e),
            n = ti(t);
        if (r !== n)
            return r === "Array"
                ? 1
                : n === "Array"
                ? -1
                : r === "binary"
                ? 1
                : n === "binary"
                ? -1
                : r === "string"
                ? 1
                : n === "string"
                ? -1
                : r === "Date"
                ? 1
                : n !== "Date"
                ? NaN
                : -1;
        switch (r) {
            case "number":
            case "Date":
            case "string":
                return e > t ? 1 : e < t ? -1 : 0;
            case "binary":
                return (function (o, i) {
                    const s = o.length,
                        l = i.length,
                        a = s < l ? s : l;
                    for (let h = 0; h < a; ++h)
                        if (o[h] !== i[h]) return o[h] < i[h] ? -1 : 1;
                    return s === l ? 0 : s < l ? -1 : 1;
                })(ri(e), ri(t));
            case "Array":
                return (function (o, i) {
                    const s = o.length,
                        l = i.length,
                        a = s < l ? s : l;
                    for (let h = 0; h < a; ++h) {
                        const u = xe(o[h], i[h]);
                        if (u !== 0) return u;
                    }
                    return s === l ? 0 : s < l ? -1 : 1;
                })(e, t);
        }
    } catch {}
    return NaN;
}
function ti(e) {
    const t = typeof e;
    if (t !== "object") return t;
    if (ArrayBuffer.isView(e)) return "binary";
    const r = Pn(e);
    return r === "ArrayBuffer" ? "binary" : r;
}
function ri(e) {
    return e instanceof Uint8Array
        ? e
        : ArrayBuffer.isView(e)
        ? new Uint8Array(e.buffer, e.byteOffset, e.byteLength)
        : new Uint8Array(e);
}
class Qu {
    _read(t, r) {
        var n = this._ctx;
        return n.error
            ? n.table._trans(null, de.bind(null, n.error))
            : n.table._trans("readonly", t).then(r);
    }
    _write(t) {
        var r = this._ctx;
        return r.error
            ? r.table._trans(null, de.bind(null, r.error))
            : r.table._trans("readwrite", t, "locked");
    }
    _addAlgorithm(t) {
        var r = this._ctx;
        r.algorithm = pt(r.algorithm, t);
    }
    _iterate(t, r) {
        return xr(this._ctx, t, r, this._ctx.table.core);
    }
    clone(t) {
        var r = Object.create(this.constructor.prototype),
            n = Object.create(this._ctx);
        return t && we(n, t), (r._ctx = n), r;
    }
    raw() {
        return (this._ctx.valueMapper = null), this;
    }
    each(t) {
        var r = this._ctx;
        return this._read((n) => xr(r, t, n, r.table.core));
    }
    count(t) {
        return this._read((r) => {
            const n = this._ctx,
                o = n.table.core;
            if (xt(n, !0))
                return o
                    .count({
                        trans: r,
                        query: { index: Ir(n, o.schema), range: n.range },
                    })
                    .then((s) => Math.min(s, n.limit));
            var i = 0;
            return xr(n, () => (++i, !1), r, o).then(() => i);
        }).then(t);
    }
    sortBy(t, r) {
        const n = t.split(".").reverse(),
            o = n[0],
            i = n.length - 1;
        function s(h, u) {
            return u ? s(h[n[u]], u - 1) : h[o];
        }
        var l = this._ctx.dir === "next" ? 1 : -1;
        function a(h, u) {
            var d = s(h, i),
                f = s(u, i);
            return d < f ? -l : d > f ? l : 0;
        }
        return this.toArray(function (h) {
            return h.sort(a);
        }).then(r);
    }
    toArray(t) {
        return this._read((r) => {
            var n = this._ctx;
            if (n.dir === "next" && xt(n, !0) && n.limit > 0) {
                const { valueMapper: o } = n,
                    i = Ir(n, n.table.core.schema);
                return n.table.core
                    .query({
                        trans: r,
                        limit: n.limit,
                        values: !0,
                        query: { index: i, range: n.range },
                    })
                    .then(({ result: s }) => (o ? s.map(o) : s));
            }
            {
                const o = [];
                return xr(n, (i) => o.push(i), r, n.table.core).then(() => o);
            }
        }, t);
    }
    offset(t) {
        var r = this._ctx;
        return (
            t <= 0 ||
                ((r.offset += t),
                xt(r)
                    ? yn(r, () => {
                          var n = t;
                          return (o, i) =>
                              n === 0 ||
                              (n === 1
                                  ? (--n, !1)
                                  : (i(() => {
                                        o.advance(n), (n = 0);
                                    }),
                                    !1));
                      })
                    : yn(r, () => {
                          var n = t;
                          return () => --n < 0;
                      })),
            this
        );
    }
    limit(t) {
        return (
            (this._ctx.limit = Math.min(this._ctx.limit, t)),
            yn(
                this._ctx,
                () => {
                    var r = t;
                    return function (n, o, i) {
                        return --r <= 0 && o(i), r >= 0;
                    };
                },
                !0
            ),
            this
        );
    }
    until(t, r) {
        return (
            mn(this._ctx, function (n, o, i) {
                return !t(n.value) || (o(i), r);
            }),
            this
        );
    }
    first(t) {
        return this.limit(1)
            .toArray(function (r) {
                return r[0];
            })
            .then(t);
    }
    last(t) {
        return this.reverse().first(t);
    }
    filter(t) {
        var r, n;
        return (
            mn(this._ctx, function (o) {
                return t(o.value);
            }),
            (r = this._ctx),
            (n = t),
            (r.isMatch = pt(r.isMatch, n)),
            this
        );
    }
    and(t) {
        return this.filter(t);
    }
    or(t) {
        return new this.db.WhereClause(this._ctx.table, t, this);
    }
    reverse() {
        return (
            (this._ctx.dir = this._ctx.dir === "prev" ? "next" : "prev"),
            this._ondirectionchange && this._ondirectionchange(this._ctx.dir),
            this
        );
    }
    desc() {
        return this.reverse();
    }
    eachKey(t) {
        var r = this._ctx;
        return (
            (r.keysOnly = !r.isMatch),
            this.each(function (n, o) {
                t(o.key, o);
            })
        );
    }
    eachUniqueKey(t) {
        return (this._ctx.unique = "unique"), this.eachKey(t);
    }
    eachPrimaryKey(t) {
        var r = this._ctx;
        return (
            (r.keysOnly = !r.isMatch),
            this.each(function (n, o) {
                t(o.primaryKey, o);
            })
        );
    }
    keys(t) {
        var r = this._ctx;
        r.keysOnly = !r.isMatch;
        var n = [];
        return this.each(function (o, i) {
            n.push(i.key);
        })
            .then(function () {
                return n;
            })
            .then(t);
    }
    primaryKeys(t) {
        var r = this._ctx;
        if (r.dir === "next" && xt(r, !0) && r.limit > 0)
            return this._read((o) => {
                var i = Ir(r, r.table.core.schema);
                return r.table.core.query({
                    trans: o,
                    values: !1,
                    limit: r.limit,
                    query: { index: i, range: r.range },
                });
            })
                .then(({ result: o }) => o)
                .then(t);
        r.keysOnly = !r.isMatch;
        var n = [];
        return this.each(function (o, i) {
            n.push(i.primaryKey);
        })
            .then(function () {
                return n;
            })
            .then(t);
    }
    uniqueKeys(t) {
        return (this._ctx.unique = "unique"), this.keys(t);
    }
    firstKey(t) {
        return this.limit(1)
            .keys(function (r) {
                return r[0];
            })
            .then(t);
    }
    lastKey(t) {
        return this.reverse().firstKey(t);
    }
    distinct() {
        var t = this._ctx,
            r = t.index && t.table.schema.idxByName[t.index];
        if (!r || !r.multi) return this;
        var n = {};
        return (
            mn(this._ctx, function (o) {
                var i = o.primaryKey.toString(),
                    s = Ce(n, i);
                return (n[i] = !0), !s;
            }),
            this
        );
    }
    modify(t) {
        var r = this._ctx;
        return this._write((n) => {
            var o;
            if (typeof t == "function") o = t;
            else {
                var i = ce(t),
                    s = i.length;
                o = function (g) {
                    for (var m = !1, v = 0; v < s; ++v) {
                        var p = i[v],
                            y = t[p];
                        He(g, p) !== y && (Re(g, p, y), (m = !0));
                    }
                    return m;
                };
            }
            const l = r.table.core,
                { outbound: a, extractKey: h } = l.schema.primaryKey,
                u = this.db._options.modifyChunkSize || 200,
                d = [];
            let f = 0;
            const b = [],
                x = (g, m) => {
                    const { failures: v, numFailures: p } = m;
                    f += g - p;
                    for (let y of ce(v)) d.push(v[y]);
                };
            return this.clone()
                .primaryKeys()
                .then((g) => {
                    const m = (v) => {
                        const p = Math.min(u, g.length - v);
                        return l
                            .getMany({
                                trans: n,
                                keys: g.slice(v, v + p),
                                cache: "immutable",
                            })
                            .then((y) => {
                                const C = [],
                                    S = [],
                                    R = a ? [] : null,
                                    c = [];
                                for (let w = 0; w < p; ++w) {
                                    const T = y[w],
                                        P = { value: rr(T), primKey: g[v + w] };
                                    o.call(P, P.value, P) !== !1 &&
                                        (P.value == null
                                            ? c.push(g[v + w])
                                            : a || xe(h(T), h(P.value)) === 0
                                            ? (S.push(P.value),
                                              a && R.push(g[v + w]))
                                            : (c.push(g[v + w]),
                                              C.push(P.value)));
                                }
                                const _ = xt(r) &&
                                    r.limit === 1 / 0 &&
                                    (typeof t != "function" || t === xn) && {
                                        index: r.index,
                                        range: r.range,
                                    };
                                return Promise.resolve(
                                    C.length > 0 &&
                                        l
                                            .mutate({
                                                trans: n,
                                                type: "add",
                                                values: C,
                                            })
                                            .then((w) => {
                                                for (let T in w.failures)
                                                    c.splice(parseInt(T), 1);
                                                x(C.length, w);
                                            })
                                )
                                    .then(
                                        () =>
                                            (S.length > 0 ||
                                                (_ && typeof t == "object")) &&
                                            l
                                                .mutate({
                                                    trans: n,
                                                    type: "put",
                                                    keys: R,
                                                    values: S,
                                                    criteria: _,
                                                    changeSpec:
                                                        typeof t !=
                                                            "function" && t,
                                                })
                                                .then((w) => x(S.length, w))
                                    )
                                    .then(
                                        () =>
                                            (c.length > 0 || (_ && t === xn)) &&
                                            l
                                                .mutate({
                                                    trans: n,
                                                    type: "delete",
                                                    keys: c,
                                                    criteria: _,
                                                })
                                                .then((w) => x(c.length, w))
                                    )
                                    .then(() => g.length > v + p && m(v + u));
                            });
                    };
                    return m(0).then(() => {
                        if (d.length > 0)
                            throw new jr(
                                "Error modifying one or more objects",
                                d,
                                f,
                                b
                            );
                        return g.length;
                    });
                });
        });
    }
    delete() {
        var t = this._ctx,
            r = t.range;
        return xt(t) && ((t.isPrimKey && !Xu) || r.type === 3)
            ? this._write((n) => {
                  const { primaryKey: o } = t.table.core.schema,
                      i = r;
                  return t.table.core
                      .count({ trans: n, query: { index: o, range: i } })
                      .then((s) =>
                          t.table.core
                              .mutate({
                                  trans: n,
                                  type: "deleteRange",
                                  range: i,
                              })
                              .then(
                                  ({
                                      failures: l,
                                      lastResult: a,
                                      results: h,
                                      numFailures: u,
                                  }) => {
                                      if (u)
                                          throw new jr(
                                              "Could not delete some values",
                                              Object.keys(l).map((d) => l[d]),
                                              s - u
                                          );
                                      return s - u;
                                  }
                              )
                      );
              })
            : this.modify(xn);
    }
}
const xn = (e, t) => (t.value = null);
function Ju(e, t) {
    return e < t ? -1 : e === t ? 0 : 1;
}
function ec(e, t) {
    return e > t ? -1 : e === t ? 0 : 1;
}
function _e(e, t, r) {
    var n = e instanceof is ? new e.Collection(e) : e;
    return (n._ctx.error = r ? new r(t) : new TypeError(t)), n;
}
function wt(e) {
    return new e.Collection(e, () => os("")).limit(0);
}
function tc(e, t, r, n, o, i) {
    for (var s = Math.min(e.length, n.length), l = -1, a = 0; a < s; ++a) {
        var h = t[a];
        if (h !== n[a])
            return o(e[a], r[a]) < 0
                ? e.substr(0, a) + r[a] + r.substr(a + 1)
                : o(e[a], n[a]) < 0
                ? e.substr(0, a) + n[a] + r.substr(a + 1)
                : l >= 0
                ? e.substr(0, l) + t[l] + r.substr(l + 1)
                : null;
        o(e[a], h) < 0 && (l = a);
    }
    return s < n.length && i === "next"
        ? e + r.substr(e.length)
        : s < e.length && i === "prev"
        ? e.substr(0, r.length)
        : l < 0
        ? null
        : e.substr(0, l) + n[l] + r.substr(l + 1);
}
function wr(e, t, r, n) {
    var o,
        i,
        s,
        l,
        a,
        h,
        u,
        d = r.length;
    if (!r.every((g) => typeof g == "string")) return _e(e, ts);
    function f(g) {
        (o = (function (v) {
            return v === "next"
                ? (p) => p.toUpperCase()
                : (p) => p.toLowerCase();
        })(g)),
            (i = (function (v) {
                return v === "next"
                    ? (p) => p.toLowerCase()
                    : (p) => p.toUpperCase();
            })(g)),
            (s = g === "next" ? Ju : ec);
        var m = r
            .map(function (v) {
                return { lower: i(v), upper: o(v) };
            })
            .sort(function (v, p) {
                return s(v.lower, p.lower);
            });
        (l = m.map(function (v) {
            return v.upper;
        })),
            (a = m.map(function (v) {
                return v.lower;
            })),
            (h = g),
            (u = g === "next" ? "" : n);
    }
    f("next");
    var b = new e.Collection(e, () => Ge(l[0], a[d - 1] + n));
    b._ondirectionchange = function (g) {
        f(g);
    };
    var x = 0;
    return (
        b._addAlgorithm(function (g, m, v) {
            var p = g.key;
            if (typeof p != "string") return !1;
            var y = i(p);
            if (t(y, a, x)) return !0;
            for (var C = null, S = x; S < d; ++S) {
                var R = tc(p, y, l[S], a[S], s, h);
                R === null && C === null
                    ? (x = S + 1)
                    : (C === null || s(C, R) > 0) && (C = R);
            }
            return (
                m(
                    C !== null
                        ? function () {
                              g.continue(C + u);
                          }
                        : v
                ),
                !1
            );
        }),
        b
    );
}
function Ge(e, t, r, n) {
    return { type: 2, lower: e, upper: t, lowerOpen: r, upperOpen: n };
}
function os(e) {
    return { type: 1, lower: e, upper: e };
}
class is {
    get Collection() {
        return this._ctx.table.db.Collection;
    }
    between(t, r, n, o) {
        (n = n !== !1), (o = o === !0);
        try {
            return this._cmp(t, r) > 0 ||
                (this._cmp(t, r) === 0 && (n || o) && (!n || !o))
                ? wt(this)
                : new this.Collection(this, () => Ge(t, r, !n, !o));
        } catch {
            return _e(this, Ae);
        }
    }
    equals(t) {
        return t == null
            ? _e(this, Ae)
            : new this.Collection(this, () => os(t));
    }
    above(t) {
        return t == null
            ? _e(this, Ae)
            : new this.Collection(this, () => Ge(t, void 0, !0));
    }
    aboveOrEqual(t) {
        return t == null
            ? _e(this, Ae)
            : new this.Collection(this, () => Ge(t, void 0, !1));
    }
    below(t) {
        return t == null
            ? _e(this, Ae)
            : new this.Collection(this, () => Ge(void 0, t, !1, !0));
    }
    belowOrEqual(t) {
        return t == null
            ? _e(this, Ae)
            : new this.Collection(this, () => Ge(void 0, t));
    }
    startsWith(t) {
        return typeof t != "string"
            ? _e(this, ts)
            : this.between(t, t + st, !0, !0);
    }
    startsWithIgnoreCase(t) {
        return t === ""
            ? this.startsWith(t)
            : wr(this, (r, n) => r.indexOf(n[0]) === 0, [t], st);
    }
    equalsIgnoreCase(t) {
        return wr(this, (r, n) => r === n[0], [t], "");
    }
    anyOfIgnoreCase() {
        var t = je.apply(kt, arguments);
        return t.length === 0
            ? wt(this)
            : wr(this, (r, n) => n.indexOf(r) !== -1, t, "");
    }
    startsWithAnyOfIgnoreCase() {
        var t = je.apply(kt, arguments);
        return t.length === 0
            ? wt(this)
            : wr(this, (r, n) => n.some((o) => r.indexOf(o) === 0), t, st);
    }
    anyOf() {
        const t = je.apply(kt, arguments);
        let r = this._cmp;
        try {
            t.sort(r);
        } catch {
            return _e(this, Ae);
        }
        if (t.length === 0) return wt(this);
        const n = new this.Collection(this, () => Ge(t[0], t[t.length - 1]));
        n._ondirectionchange = (i) => {
            (r = i === "next" ? this._ascending : this._descending), t.sort(r);
        };
        let o = 0;
        return (
            n._addAlgorithm((i, s, l) => {
                const a = i.key;
                for (; r(a, t[o]) > 0; )
                    if ((++o, o === t.length)) return s(l), !1;
                return (
                    r(a, t[o]) === 0 ||
                    (s(() => {
                        i.continue(t[o]);
                    }),
                    !1)
                );
            }),
            n
        );
    }
    notEqual(t) {
        return this.inAnyRange(
            [
                [Mn, t],
                [t, this.db._maxKey],
            ],
            { includeLowers: !1, includeUppers: !1 }
        );
    }
    noneOf() {
        const t = je.apply(kt, arguments);
        if (t.length === 0) return new this.Collection(this);
        try {
            t.sort(this._ascending);
        } catch {
            return _e(this, Ae);
        }
        const r = t.reduce(
            (n, o) => (n ? n.concat([[n[n.length - 1][1], o]]) : [[Mn, o]]),
            null
        );
        return (
            r.push([t[t.length - 1], this.db._maxKey]),
            this.inAnyRange(r, { includeLowers: !1, includeUppers: !1 })
        );
    }
    inAnyRange(t, r) {
        const n = this._cmp,
            o = this._ascending,
            i = this._descending,
            s = this._min,
            l = this._max;
        if (t.length === 0) return wt(this);
        if (
            !t.every(
                (p) => p[0] !== void 0 && p[1] !== void 0 && o(p[0], p[1]) <= 0
            )
        )
            return _e(
                this,
                "First argument to inAnyRange() must be an Array of two-value Arrays [lower,upper] where upper must not be lower than lower",
                j.InvalidArgument
            );
        const a = !r || r.includeLowers !== !1,
            h = r && r.includeUppers === !0;
        let u,
            d = o;
        function f(p, y) {
            return d(p[0], y[0]);
        }
        try {
            (u = t.reduce(function (p, y) {
                let C = 0,
                    S = p.length;
                for (; C < S; ++C) {
                    const R = p[C];
                    if (n(y[0], R[1]) < 0 && n(y[1], R[0]) > 0) {
                        (R[0] = s(R[0], y[0])), (R[1] = l(R[1], y[1]));
                        break;
                    }
                }
                return C === S && p.push(y), p;
            }, [])),
                u.sort(f);
        } catch {
            return _e(this, Ae);
        }
        let b = 0;
        const x = h ? (p) => o(p, u[b][1]) > 0 : (p) => o(p, u[b][1]) >= 0,
            g = a ? (p) => i(p, u[b][0]) > 0 : (p) => i(p, u[b][0]) >= 0;
        let m = x;
        const v = new this.Collection(this, () =>
            Ge(u[0][0], u[u.length - 1][1], !a, !h)
        );
        return (
            (v._ondirectionchange = (p) => {
                p === "next" ? ((m = x), (d = o)) : ((m = g), (d = i)),
                    u.sort(f);
            }),
            v._addAlgorithm((p, y, C) => {
                for (var S = p.key; m(S); )
                    if ((++b, b === u.length)) return y(C), !1;
                return (
                    !!(function (R) {
                        return !x(R) && !g(R);
                    })(S) ||
                    (this._cmp(S, u[b][1]) === 0 ||
                        this._cmp(S, u[b][0]) === 0 ||
                        y(() => {
                            d === o ? p.continue(u[b][0]) : p.continue(u[b][1]);
                        }),
                    !1)
                );
            }),
            v
        );
    }
    startsWithAnyOf() {
        const t = je.apply(kt, arguments);
        return t.every((r) => typeof r == "string")
            ? t.length === 0
                ? wt(this)
                : this.inAnyRange(t.map((r) => [r, r + st]))
            : _e(this, "startsWithAnyOf() only works with strings");
    }
}
function Oe(e) {
    return re(function (t) {
        return Xt(t), e(t.target.error), !1;
    });
}
function Xt(e) {
    e.stopPropagation && e.stopPropagation(),
        e.preventDefault && e.preventDefault();
}
const Zt = "storagemutated",
    Xe = "x-storagemutated-1",
    Je = Lt(null, Zt);
class rc {
    _lock() {
        return (
            Ft(!B.global),
            ++this._reculock,
            this._reculock !== 1 || B.global || (B.lockOwnerFor = this),
            this
        );
    }
    _unlock() {
        if ((Ft(!B.global), --this._reculock == 0))
            for (
                B.global || (B.lockOwnerFor = null);
                this._blockedFuncs.length > 0 && !this._locked();

            ) {
                var t = this._blockedFuncs.shift();
                try {
                    Dt(t[1], t[0]);
                } catch {}
            }
        return this;
    }
    _locked() {
        return this._reculock && B.lockOwnerFor !== this;
    }
    create(t) {
        if (!this.mode) return this;
        const r = this.db.idbdb,
            n = this.db._state.dbOpenError;
        if ((Ft(!this.idbtrans), !t && !r))
            switch (n && n.name) {
                case "DatabaseClosedError":
                    throw new j.DatabaseClosed(n);
                case "MissingAPIError":
                    throw new j.MissingAPI(n.message, n);
                default:
                    throw new j.OpenFailed(n);
            }
        if (!this.active) throw new j.TransactionInactive();
        return (
            Ft(this._completion._state === null),
            ((t = this.idbtrans =
                t ||
                (this.db.core
                    ? this.db.core.transaction(this.storeNames, this.mode, {
                          durability: this.chromeTransactionDurability,
                      })
                    : r.transaction(this.storeNames, this.mode, {
                          durability: this.chromeTransactionDurability,
                      }))).onerror = re((o) => {
                Xt(o), this._reject(t.error);
            })),
            (t.onabort = re((o) => {
                Xt(o),
                    this.active && this._reject(new j.Abort(t.error)),
                    (this.active = !1),
                    this.on("abort").fire(o);
            })),
            (t.oncomplete = re(() => {
                (this.active = !1),
                    this._resolve(),
                    "mutatedParts" in t &&
                        Je.storagemutated.fire(t.mutatedParts);
            })),
            this
        );
    }
    _promise(t, r, n) {
        if (t === "readwrite" && this.mode !== "readwrite")
            return de(new j.ReadOnly("Transaction is readonly"));
        if (!this.active) return de(new j.TransactionInactive());
        if (this._locked())
            return new O((i, s) => {
                this._blockedFuncs.push([
                    () => {
                        this._promise(t, r, n).then(i, s);
                    },
                    B,
                ]);
            });
        if (n)
            return Ze(() => {
                var i = new O((s, l) => {
                    this._lock();
                    const a = r(s, l, this);
                    a && a.then && a.then(s, l);
                });
                return i.finally(() => this._unlock()), (i._lib = !0), i;
            });
        var o = new O((i, s) => {
            var l = r(i, s, this);
            l && l.then && l.then(i, s);
        });
        return (o._lib = !0), o;
    }
    _root() {
        return this.parent ? this.parent._root() : this;
    }
    waitFor(t) {
        var r = this._root();
        const n = O.resolve(t);
        if (r._waitingFor) r._waitingFor = r._waitingFor.then(() => n);
        else {
            (r._waitingFor = n), (r._waitingQueue = []);
            var o = r.idbtrans.objectStore(r.storeNames[0]);
            (function s() {
                for (++r._spinCount; r._waitingQueue.length; )
                    r._waitingQueue.shift()();
                r._waitingFor && (o.get(-1 / 0).onsuccess = s);
            })();
        }
        var i = r._waitingFor;
        return new O((s, l) => {
            n.then(
                (a) => r._waitingQueue.push(re(s.bind(null, a))),
                (a) => r._waitingQueue.push(re(l.bind(null, a)))
            ).finally(() => {
                r._waitingFor === i && (r._waitingFor = null);
            });
        });
    }
    abort() {
        this.active &&
            ((this.active = !1),
            this.idbtrans && this.idbtrans.abort(),
            this._reject(new j.Abort()));
    }
    table(t) {
        const r = this._memoizedTables || (this._memoizedTables = {});
        if (Ce(r, t)) return r[t];
        const n = this.schema[t];
        if (!n) throw new j.NotFound("Table " + t + " not part of transaction");
        const o = new this.db.Table(t, n, this);
        return (o.core = this.db.core.table(t)), (r[t] = o), o;
    }
}
function Kn(e, t, r, n, o, i, s) {
    return {
        name: e,
        keyPath: t,
        unique: r,
        multi: n,
        auto: o,
        compound: i,
        src: (r && !s ? "&" : "") + (n ? "*" : "") + (o ? "++" : "") + ss(t),
    };
}
function ss(e) {
    return typeof e == "string" ? e : e ? "[" + [].join.call(e, "+") + "]" : "";
}
function as(e, t, r) {
    return {
        name: e,
        primKey: t,
        indexes: r,
        mappedClass: null,
        idxByName: ji(r, (n) => [n.name, n]),
    };
}
let Qt = (e) => {
    try {
        return e.only([[]]), (Qt = () => [[]]), [[]];
    } catch {
        return (Qt = () => st), st;
    }
};
function Hn(e) {
    return e == null
        ? () => {}
        : typeof e == "string"
        ? (function (t) {
              return t.split(".").length === 1 ? (n) => n[t] : (n) => He(n, t);
          })(e)
        : (t) => He(t, e);
}
function ni(e) {
    return [].slice.call(e);
}
let nc = 0;
function Vt(e) {
    return e == null ? ":id" : typeof e == "string" ? e : `[${e.join("+")}]`;
}
function oc(e, t, r) {
    function n(a) {
        if (a.type === 3) return null;
        if (a.type === 4)
            throw new Error("Cannot convert never type to IDBKeyRange");
        const { lower: h, upper: u, lowerOpen: d, upperOpen: f } = a;
        return h === void 0
            ? u === void 0
                ? null
                : t.upperBound(u, !!f)
            : u === void 0
            ? t.lowerBound(h, !!d)
            : t.bound(h, u, !!d, !!f);
    }
    const { schema: o, hasGetAll: i } = (function (a, h) {
            const u = ni(a.objectStoreNames);
            return {
                schema: {
                    name: a.name,
                    tables: u
                        .map((d) => h.objectStore(d))
                        .map((d) => {
                            const { keyPath: f, autoIncrement: b } = d,
                                x = be(f),
                                g = f == null,
                                m = {},
                                v = {
                                    name: d.name,
                                    primaryKey: {
                                        name: null,
                                        isPrimaryKey: !0,
                                        outbound: g,
                                        compound: x,
                                        keyPath: f,
                                        autoIncrement: b,
                                        unique: !0,
                                        extractKey: Hn(f),
                                    },
                                    indexes: ni(d.indexNames)
                                        .map((p) => d.index(p))
                                        .map((p) => {
                                            const {
                                                    name: y,
                                                    unique: C,
                                                    multiEntry: S,
                                                    keyPath: R,
                                                } = p,
                                                c = {
                                                    name: y,
                                                    compound: be(R),
                                                    keyPath: R,
                                                    unique: C,
                                                    multiEntry: S,
                                                    extractKey: Hn(R),
                                                };
                                            return (m[Vt(R)] = c), c;
                                        }),
                                    getIndexByKeyPath: (p) => m[Vt(p)],
                                };
                            return (
                                (m[":id"] = v.primaryKey),
                                f != null && (m[Vt(f)] = v.primaryKey),
                                v
                            );
                        }),
                },
                hasGetAll:
                    u.length > 0 &&
                    "getAll" in h.objectStore(u[0]) &&
                    !(
                        typeof navigator < "u" &&
                        /Safari/.test(navigator.userAgent) &&
                        !/(Chrome\/|Edge\/)/.test(navigator.userAgent) &&
                        [].concat(
                            navigator.userAgent.match(/Safari\/(\d*)/)
                        )[1] < 604
                    ),
            };
        })(e, r),
        s = o.tables.map((a) =>
            (function (h) {
                const u = h.name;
                return {
                    name: u,
                    schema: h,
                    mutate: function ({
                        trans: d,
                        type: f,
                        keys: b,
                        values: x,
                        range: g,
                    }) {
                        return new Promise((m, v) => {
                            m = re(m);
                            const p = d.objectStore(u),
                                y = p.keyPath == null,
                                C = f === "put" || f === "add";
                            if (!C && f !== "delete" && f !== "deleteRange")
                                throw new Error("Invalid operation type: " + f);
                            const { length: S } = b || x || { length: 1 };
                            if (b && x && b.length !== x.length)
                                throw new Error(
                                    "Given keys array must have same length as given values array."
                                );
                            if (S === 0)
                                return m({
                                    numFailures: 0,
                                    failures: {},
                                    results: [],
                                    lastResult: void 0,
                                });
                            let R;
                            const c = [],
                                _ = [];
                            let w = 0;
                            const T = (z) => {
                                ++w, Xt(z);
                            };
                            if (f === "deleteRange") {
                                if (g.type === 4)
                                    return m({
                                        numFailures: w,
                                        failures: _,
                                        results: [],
                                        lastResult: void 0,
                                    });
                                g.type === 3
                                    ? c.push((R = p.clear()))
                                    : c.push((R = p.delete(n(g))));
                            } else {
                                const [z, M] = C
                                    ? y
                                        ? [x, b]
                                        : [x, null]
                                    : [b, null];
                                if (C)
                                    for (let $ = 0; $ < S; ++$)
                                        c.push(
                                            (R =
                                                M && M[$] !== void 0
                                                    ? p[f](z[$], M[$])
                                                    : p[f](z[$]))
                                        ),
                                            (R.onerror = T);
                                else
                                    for (let $ = 0; $ < S; ++$)
                                        c.push((R = p[f](z[$]))),
                                            (R.onerror = T);
                            }
                            const P = (z) => {
                                const M = z.target.result;
                                c.forEach(
                                    ($, U) =>
                                        $.error != null && (_[U] = $.error)
                                ),
                                    m({
                                        numFailures: w,
                                        failures: _,
                                        results:
                                            f === "delete"
                                                ? b
                                                : c.map(($) => $.result),
                                        lastResult: M,
                                    });
                            };
                            (R.onerror = (z) => {
                                T(z), P(z);
                            }),
                                (R.onsuccess = P);
                        });
                    },
                    getMany: ({ trans: d, keys: f }) =>
                        new Promise((b, x) => {
                            b = re(b);
                            const g = d.objectStore(u),
                                m = f.length,
                                v = new Array(m);
                            let p,
                                y = 0,
                                C = 0;
                            const S = (c) => {
                                    const _ = c.target;
                                    (v[_._pos] = _.result), ++C === y && b(v);
                                },
                                R = Oe(x);
                            for (let c = 0; c < m; ++c)
                                f[c] != null &&
                                    ((p = g.get(f[c])),
                                    (p._pos = c),
                                    (p.onsuccess = S),
                                    (p.onerror = R),
                                    ++y);
                            y === 0 && b(v);
                        }),
                    get: ({ trans: d, key: f }) =>
                        new Promise((b, x) => {
                            b = re(b);
                            const g = d.objectStore(u).get(f);
                            (g.onsuccess = (m) => b(m.target.result)),
                                (g.onerror = Oe(x));
                        }),
                    query: (function (d) {
                        return (f) =>
                            new Promise((b, x) => {
                                b = re(b);
                                const {
                                        trans: g,
                                        values: m,
                                        limit: v,
                                        query: p,
                                    } = f,
                                    y = v === 1 / 0 ? void 0 : v,
                                    { index: C, range: S } = p,
                                    R = g.objectStore(u),
                                    c = C.isPrimaryKey ? R : R.index(C.name),
                                    _ = n(S);
                                if (v === 0) return b({ result: [] });
                                if (d) {
                                    const w = m
                                        ? c.getAll(_, y)
                                        : c.getAllKeys(_, y);
                                    (w.onsuccess = (T) =>
                                        b({ result: T.target.result })),
                                        (w.onerror = Oe(x));
                                } else {
                                    let w = 0;
                                    const T =
                                            m || !("openKeyCursor" in c)
                                                ? c.openCursor(_)
                                                : c.openKeyCursor(_),
                                        P = [];
                                    (T.onsuccess = (z) => {
                                        const M = T.result;
                                        return M
                                            ? (P.push(
                                                  m ? M.value : M.primaryKey
                                              ),
                                              ++w === v
                                                  ? b({ result: P })
                                                  : void M.continue())
                                            : b({ result: P });
                                    }),
                                        (T.onerror = Oe(x));
                                }
                            });
                    })(i),
                    openCursor: function ({
                        trans: d,
                        values: f,
                        query: b,
                        reverse: x,
                        unique: g,
                    }) {
                        return new Promise((m, v) => {
                            m = re(m);
                            const { index: p, range: y } = b,
                                C = d.objectStore(u),
                                S = p.isPrimaryKey ? C : C.index(p.name),
                                R = x
                                    ? g
                                        ? "prevunique"
                                        : "prev"
                                    : g
                                    ? "nextunique"
                                    : "next",
                                c =
                                    f || !("openKeyCursor" in S)
                                        ? S.openCursor(n(y), R)
                                        : S.openKeyCursor(n(y), R);
                            (c.onerror = Oe(v)),
                                (c.onsuccess = re((_) => {
                                    const w = c.result;
                                    if (!w) return void m(null);
                                    (w.___id = ++nc), (w.done = !1);
                                    const T = w.continue.bind(w);
                                    let P = w.continuePrimaryKey;
                                    P && (P = P.bind(w));
                                    const z = w.advance.bind(w),
                                        M = () => {
                                            throw new Error(
                                                "Cursor not stopped"
                                            );
                                        };
                                    (w.trans = d),
                                        (w.stop =
                                            w.continue =
                                            w.continuePrimaryKey =
                                            w.advance =
                                                () => {
                                                    throw new Error(
                                                        "Cursor not started"
                                                    );
                                                }),
                                        (w.fail = re(v)),
                                        (w.next = function () {
                                            let $ = 1;
                                            return this.start(() =>
                                                $--
                                                    ? this.continue()
                                                    : this.stop()
                                            ).then(() => this);
                                        }),
                                        (w.start = ($) => {
                                            const U = new Promise((A, J) => {
                                                    (A = re(A)),
                                                        (c.onerror = Oe(J)),
                                                        (w.fail = J),
                                                        (w.stop = (ae) => {
                                                            (w.stop =
                                                                w.continue =
                                                                w.continuePrimaryKey =
                                                                w.advance =
                                                                    M),
                                                                A(ae);
                                                        });
                                                }),
                                                G = () => {
                                                    if (c.result)
                                                        try {
                                                            $();
                                                        } catch (A) {
                                                            w.fail(A);
                                                        }
                                                    else
                                                        (w.done = !0),
                                                            (w.start = () => {
                                                                throw new Error(
                                                                    "Cursor behind last entry"
                                                                );
                                                            }),
                                                            w.stop();
                                                };
                                            return (
                                                (c.onsuccess = re((A) => {
                                                    (c.onsuccess = G), G();
                                                })),
                                                (w.continue = T),
                                                (w.continuePrimaryKey = P),
                                                (w.advance = z),
                                                G(),
                                                U
                                            );
                                        }),
                                        m(w);
                                }, v));
                        });
                    },
                    count({ query: d, trans: f }) {
                        const { index: b, range: x } = d;
                        return new Promise((g, m) => {
                            const v = f.objectStore(u),
                                p = b.isPrimaryKey ? v : v.index(b.name),
                                y = n(x),
                                C = y ? p.count(y) : p.count();
                            (C.onsuccess = re((S) => g(S.target.result))),
                                (C.onerror = Oe(m));
                        });
                    },
                };
            })(a)
        ),
        l = {};
    return (
        s.forEach((a) => (l[a.name] = a)),
        {
            stack: "dbcore",
            transaction: e.transaction.bind(e),
            table(a) {
                if (!l[a]) throw new Error(`Table '${a}' not found`);
                return l[a];
            },
            MIN_KEY: -1 / 0,
            MAX_KEY: Qt(t),
            schema: o,
        }
    );
}
function Nn({ _novip: e }, t) {
    const r = t.db,
        n = (function (o, i, { IDBKeyRange: s, indexedDB: l }, a) {
            return {
                dbcore: (function (u, d) {
                    return d.reduce(
                        (f, { create: b }) => ({ ...f, ...b(f) }),
                        u
                    );
                })(oc(i, s, a), o.dbcore),
            };
        })(e._middlewares, r, e._deps, t);
    (e.core = n.dbcore),
        e.tables.forEach((o) => {
            const i = o.name;
            e.core.schema.tables.some((s) => s.name === i) &&
                ((o.core = e.core.table(i)),
                e[i] instanceof e.Table && (e[i].core = o.core));
        });
}
function Lr({ _novip: e }, t, r, n) {
    r.forEach((o) => {
        const i = n[o];
        t.forEach((s) => {
            const l = no(s, o);
            (!l || ("value" in l && l.value === void 0)) &&
                (s === e.Transaction.prototype || s instanceof e.Transaction
                    ? Ke(s, o, {
                          get() {
                              return this.table(o);
                          },
                          set(a) {
                              $i(this, o, {
                                  value: a,
                                  writable: !0,
                                  configurable: !0,
                                  enumerable: !0,
                              });
                          },
                      })
                    : (s[o] = new e.Table(o, i)));
        });
    });
}
function Ln({ _novip: e }, t) {
    t.forEach((r) => {
        for (let n in r) r[n] instanceof e.Table && delete r[n];
    });
}
function ic(e, t) {
    return e._cfg.version - t._cfg.version;
}
function sc(e, t, r, n) {
    const o = e._dbSchema,
        i = e._createTransaction("readwrite", e._storeNames, o);
    i.create(r), i._completion.catch(n);
    const s = i._reject.bind(i),
        l = B.transless || B;
    Ze(() => {
        (B.trans = i),
            (B.transless = l),
            t === 0
                ? (ce(o).forEach((a) => {
                      wn(r, a, o[a].primKey, o[a].indexes);
                  }),
                  Nn(e, r),
                  O.follow(() => e.on.populate.fire(i)).catch(s))
                : (function ({ _novip: a }, h, u, d) {
                      const f = [],
                          b = a._versions;
                      let x = (a._dbSchema = Wn(a, a.idbdb, d)),
                          g = !1;
                      const m = b.filter((p) => p._cfg.version >= h);
                      function v() {
                          return f.length
                              ? O.resolve(f.shift()(u.idbtrans)).then(v)
                              : O.resolve();
                      }
                      return (
                          m.forEach((p) => {
                              f.push(() => {
                                  const y = x,
                                      C = p._cfg.dbschema;
                                  Un(a, y, d),
                                      Un(a, C, d),
                                      (x = a._dbSchema = C);
                                  const S = ls(y, C);
                                  S.add.forEach((c) => {
                                      wn(d, c[0], c[1].primKey, c[1].indexes);
                                  }),
                                      S.change.forEach((c) => {
                                          if (c.recreate)
                                              throw new j.Upgrade(
                                                  "Not yet support for changing primary key"
                                              );
                                          {
                                              const _ = d.objectStore(c.name);
                                              c.add.forEach((w) => Vn(_, w)),
                                                  c.change.forEach((w) => {
                                                      _.deleteIndex(w.name),
                                                          Vn(_, w);
                                                  }),
                                                  c.del.forEach((w) =>
                                                      _.deleteIndex(w)
                                                  );
                                          }
                                      });
                                  const R = p._cfg.contentUpgrade;
                                  if (R && p._cfg.version > h) {
                                      Nn(a, d),
                                          (u._memoizedTables = {}),
                                          (g = !0);
                                      let c = Mi(C);
                                      S.del.forEach((P) => {
                                          c[P] = y[P];
                                      }),
                                          Ln(a, [a.Transaction.prototype]),
                                          Lr(
                                              a,
                                              [a.Transaction.prototype],
                                              ce(c),
                                              c
                                          ),
                                          (u.schema = c);
                                      const _ = oo(R);
                                      let w;
                                      _ && It();
                                      const T = O.follow(() => {
                                          if (((w = R(u)), w && _)) {
                                              var P = Ne.bind(null, null);
                                              w.then(P, P);
                                          }
                                      });
                                      return w && typeof w.then == "function"
                                          ? O.resolve(w)
                                          : T.then(() => w);
                                  }
                              }),
                                  f.push((y) => {
                                      (!g || !Yu) &&
                                          (function (C, S) {
                                              [].slice
                                                  .call(S.db.objectStoreNames)
                                                  .forEach(
                                                      (R) =>
                                                          C[R] == null &&
                                                          S.db.deleteObjectStore(
                                                              R
                                                          )
                                                  );
                                          })(p._cfg.dbschema, y),
                                          Ln(a, [a.Transaction.prototype]),
                                          Lr(
                                              a,
                                              [a.Transaction.prototype],
                                              a._storeNames,
                                              a._dbSchema
                                          ),
                                          (u.schema = a._dbSchema);
                                  });
                          }),
                          v().then(() => {
                              var p, y;
                              (y = d),
                                  ce((p = x)).forEach((C) => {
                                      y.db.objectStoreNames.contains(C) ||
                                          wn(y, C, p[C].primKey, p[C].indexes);
                                  });
                          })
                      );
                  })(e, t, i, r).catch(s);
    });
}
function ls(e, t) {
    const r = { del: [], add: [], change: [] };
    let n;
    for (n in e) t[n] || r.del.push(n);
    for (n in t) {
        const o = e[n],
            i = t[n];
        if (o) {
            const s = {
                name: n,
                def: i,
                recreate: !1,
                del: [],
                add: [],
                change: [],
            };
            if (
                "" + (o.primKey.keyPath || "") !=
                    "" + (i.primKey.keyPath || "") ||
                (o.primKey.auto !== i.primKey.auto && !Zr)
            )
                (s.recreate = !0), r.change.push(s);
            else {
                const l = o.idxByName,
                    a = i.idxByName;
                let h;
                for (h in l) a[h] || s.del.push(h);
                for (h in a) {
                    const u = l[h],
                        d = a[h];
                    u ? u.src !== d.src && s.change.push(d) : s.add.push(d);
                }
                (s.del.length > 0 || s.add.length > 0 || s.change.length > 0) &&
                    r.change.push(s);
            }
        } else r.add.push([n, i]);
    }
    return r;
}
function wn(e, t, r, n) {
    const o = e.db.createObjectStore(
        t,
        r.keyPath
            ? { keyPath: r.keyPath, autoIncrement: r.auto }
            : { autoIncrement: r.auto }
    );
    return n.forEach((i) => Vn(o, i)), o;
}
function Vn(e, t) {
    e.createIndex(t.name, t.keyPath, { unique: t.unique, multiEntry: t.multi });
}
function Wn(e, t, r) {
    const n = {};
    return (
        Fr(t.objectStoreNames, 0).forEach((o) => {
            const i = r.objectStore(o);
            let s = i.keyPath;
            const l = Kn(
                    ss(s),
                    s || "",
                    !1,
                    !1,
                    !!i.autoIncrement,
                    s && typeof s != "string",
                    !0
                ),
                a = [];
            for (let u = 0; u < i.indexNames.length; ++u) {
                const d = i.index(i.indexNames[u]);
                s = d.keyPath;
                var h = Kn(
                    d.name,
                    s,
                    !!d.unique,
                    !!d.multiEntry,
                    !1,
                    s && typeof s != "string",
                    !1
                );
                a.push(h);
            }
            n[o] = as(o, l, a);
        }),
        n
    );
}
function Un({ _novip: e }, t, r) {
    const n = r.db.objectStoreNames;
    for (let o = 0; o < n.length; ++o) {
        const i = n[o],
            s = r.objectStore(i);
        e._hasGetAll = "getAll" in s;
        for (let l = 0; l < s.indexNames.length; ++l) {
            const a = s.indexNames[l],
                h = s.index(a).keyPath,
                u = typeof h == "string" ? h : "[" + Fr(h).join("+") + "]";
            if (t[i]) {
                const d = t[i].idxByName[u];
                d &&
                    ((d.name = a),
                    delete t[i].idxByName[u],
                    (t[i].idxByName[a] = d));
            }
        }
    }
    typeof navigator < "u" &&
        /Safari/.test(navigator.userAgent) &&
        !/(Chrome\/|Edge\/)/.test(navigator.userAgent) &&
        te.WorkerGlobalScope &&
        te instanceof te.WorkerGlobalScope &&
        [].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1] < 604 &&
        (e._hasGetAll = !1);
}
class ac {
    _parseStoresSpec(t, r) {
        ce(t).forEach((n) => {
            if (t[n] !== null) {
                var o = t[n].split(",").map((s, l) => {
                        const a = (s = s.trim()).replace(/([&*]|\+\+)/g, ""),
                            h = /^\[/.test(a)
                                ? a.match(/^\[(.*)\]$/)[1].split("+")
                                : a;
                        return Kn(
                            a,
                            h || null,
                            /\&/.test(s),
                            /\*/.test(s),
                            /\+\+/.test(s),
                            be(h),
                            l === 0
                        );
                    }),
                    i = o.shift();
                if (i.multi)
                    throw new j.Schema("Primary key cannot be multi-valued");
                o.forEach((s) => {
                    if (s.auto)
                        throw new j.Schema(
                            "Only primary key can be marked as autoIncrement (++)"
                        );
                    if (!s.keyPath)
                        throw new j.Schema(
                            "Index must have a name and cannot be an empty string"
                        );
                }),
                    (r[n] = as(n, i, o));
            }
        });
    }
    stores(t) {
        const r = this.db;
        this._cfg.storesSource = this._cfg.storesSource
            ? we(this._cfg.storesSource, t)
            : t;
        const n = r._versions,
            o = {};
        let i = {};
        return (
            n.forEach((s) => {
                we(o, s._cfg.storesSource),
                    (i = s._cfg.dbschema = {}),
                    s._parseStoresSpec(o, i);
            }),
            (r._dbSchema = i),
            Ln(r, [r._allTables, r, r.Transaction.prototype]),
            Lr(
                r,
                [r._allTables, r, r.Transaction.prototype, this._cfg.tables],
                ce(i),
                i
            ),
            (r._storeNames = ce(i)),
            this
        );
    }
    upgrade(t) {
        return (
            (this._cfg.contentUpgrade = ao(this._cfg.contentUpgrade || Z, t)),
            this
        );
    }
}
function fo(e, t) {
    let r = e._dbNamesDB;
    return (
        r ||
            ((r = e._dbNamesDB =
                new ft(Qr, { addons: [], indexedDB: e, IDBKeyRange: t })),
            r.version(1).stores({ dbnames: "name" })),
        r.table("dbnames")
    );
}
function ho(e) {
    return e && typeof e.databases == "function";
}
function qn(e) {
    return Ze(function () {
        return (B.letThrough = !0), e();
    });
}
function lc() {
    var e;
    return !navigator.userAgentData &&
        /Safari\//.test(navigator.userAgent) &&
        !/Chrom(e|ium)\//.test(navigator.userAgent) &&
        indexedDB.databases
        ? new Promise(function (t) {
              var r = function () {
                  return indexedDB.databases().finally(t);
              };
              (e = setInterval(r, 100)), r();
          }).finally(function () {
              return clearInterval(e);
          })
        : Promise.resolve();
}
function uc(e) {
    const t = e._state,
        { indexedDB: r } = e._deps;
    if (t.isBeingOpened || e.idbdb)
        return t.dbReadyPromise.then(() =>
            t.dbOpenError ? de(t.dbOpenError) : e
        );
    Ie && (t.openCanceller._stackHolder = vt()),
        (t.isBeingOpened = !0),
        (t.dbOpenError = null),
        (t.openComplete = !1);
    const n = t.openCanceller;
    function o() {
        if (t.openCanceller !== n)
            throw new j.DatabaseClosed("db.open() was cancelled");
    }
    let i = t.dbReadyResolve,
        s = null,
        l = !1;
    return O.race([
        n,
        (typeof navigator > "u" ? O.resolve() : lc()).then(
            () =>
                new O((a, h) => {
                    if ((o(), !r)) throw new j.MissingAPI();
                    const u = e.name,
                        d = t.autoSchema
                            ? r.open(u)
                            : r.open(u, Math.round(10 * e.verno));
                    if (!d) throw new j.MissingAPI();
                    (d.onerror = Oe(h)),
                        (d.onblocked = re(e._fireOnBlocked)),
                        (d.onupgradeneeded = re((f) => {
                            if (
                                ((s = d.transaction),
                                t.autoSchema && !e._options.allowEmptyDB)
                            ) {
                                (d.onerror = Xt), s.abort(), d.result.close();
                                const x = r.deleteDatabase(u);
                                x.onsuccess = x.onerror = re(() => {
                                    h(
                                        new j.NoSuchDatabase(
                                            `Database ${u} doesnt exist`
                                        )
                                    );
                                });
                            } else {
                                s.onerror = Oe(h);
                                var b =
                                    f.oldVersion > Math.pow(2, 62)
                                        ? 0
                                        : f.oldVersion;
                                (l = b < 1),
                                    (e._novip.idbdb = d.result),
                                    sc(e, b / 10, s, h);
                            }
                        }, h)),
                        (d.onsuccess = re(() => {
                            s = null;
                            const f = (e._novip.idbdb = d.result),
                                b = Fr(f.objectStoreNames);
                            if (b.length > 0)
                                try {
                                    const g = f.transaction(
                                        (x = b).length === 1 ? x[0] : x,
                                        "readonly"
                                    );
                                    t.autoSchema
                                        ? (function ({ _novip: m }, v, p) {
                                              m.verno = v.version / 10;
                                              const y = (m._dbSchema = Wn(
                                                  0,
                                                  v,
                                                  p
                                              ));
                                              (m._storeNames = Fr(
                                                  v.objectStoreNames,
                                                  0
                                              )),
                                                  Lr(
                                                      m,
                                                      [m._allTables],
                                                      ce(y),
                                                      y
                                                  );
                                          })(e, f, g)
                                        : (Un(e, e._dbSchema, g),
                                          (function (m, v) {
                                              const p = ls(
                                                  Wn(0, m.idbdb, v),
                                                  m._dbSchema
                                              );
                                              return !(
                                                  p.add.length ||
                                                  p.change.some(
                                                      (y) =>
                                                          y.add.length ||
                                                          y.change.length
                                                  )
                                              );
                                          })(e, g) ||
                                              console.warn(
                                                  "Dexie SchemaDiff: Schema was extended without increasing the number passed to db.version(). Some queries may fail."
                                              )),
                                        Nn(e, g);
                                } catch {}
                            var x;
                            Nt.push(e),
                                (f.onversionchange = re((g) => {
                                    (t.vcFired = !0),
                                        e.on("versionchange").fire(g);
                                })),
                                (f.onclose = re((g) => {
                                    e.on("close").fire(g);
                                })),
                                l &&
                                    (function (
                                        { indexedDB: g, IDBKeyRange: m },
                                        v
                                    ) {
                                        !ho(g) &&
                                            v !== Qr &&
                                            fo(g, m).put({ name: v }).catch(Z);
                                    })(e._deps, u),
                                a();
                        }, h));
                })
        ),
    ])
        .then(
            () => (
                o(),
                (t.onReadyBeingFired = []),
                O.resolve(qn(() => e.on.ready.fire(e.vip))).then(function a() {
                    if (t.onReadyBeingFired.length > 0) {
                        let h = t.onReadyBeingFired.reduce(ao, Z);
                        return (
                            (t.onReadyBeingFired = []),
                            O.resolve(qn(() => h(e.vip))).then(a)
                        );
                    }
                })
            )
        )
        .finally(() => {
            (t.onReadyBeingFired = null), (t.isBeingOpened = !1);
        })
        .then(() => e)
        .catch((a) => {
            t.dbOpenError = a;
            try {
                s && s.abort();
            } catch {}
            return n === t.openCanceller && e._close(), de(a);
        })
        .finally(() => {
            (t.openComplete = !0), i();
        });
}
function Gn(e) {
    var t = (i) => e.next(i),
        r = o(t),
        n = o((i) => e.throw(i));
    function o(i) {
        return (s) => {
            var l = i(s),
                a = l.value;
            return l.done
                ? a
                : a && typeof a.then == "function"
                ? a.then(r, n)
                : be(a)
                ? Promise.all(a).then(r, n)
                : r(a);
        };
    }
    return o(t)();
}
function cc(e, t, r) {
    var n = arguments.length;
    if (n < 2) throw new j.InvalidArgument("Too few arguments");
    for (var o = new Array(n - 1); --n; ) o[n - 1] = arguments[n];
    return (r = o.pop()), [e, Ki(o), r];
}
function us(e, t, r, n, o) {
    return O.resolve().then(() => {
        const i = B.transless || B,
            s = e._createTransaction(t, r, e._dbSchema, n),
            l = { trans: s, transless: i };
        if (n) s.idbtrans = n.idbtrans;
        else
            try {
                s.create(), (e._state.PR1398_maxLoop = 3);
            } catch (d) {
                return d.name === so.InvalidState &&
                    e.isOpen() &&
                    --e._state.PR1398_maxLoop > 0
                    ? (console.warn("Dexie: Need to reopen db"),
                      e._close(),
                      e.open().then(() => us(e, t, r, null, o)))
                    : de(d);
            }
        const a = oo(o);
        let h;
        a && It();
        const u = O.follow(() => {
            if (((h = o.call(s, s)), h))
                if (a) {
                    var d = Ne.bind(null, null);
                    h.then(d, d);
                } else
                    typeof h.next == "function" &&
                        typeof h.throw == "function" &&
                        (h = Gn(h));
        }, l);
        return (
            h && typeof h.then == "function"
                ? O.resolve(h).then((d) =>
                      s.active
                          ? d
                          : de(
                                new j.PrematureCommit(
                                    "Transaction committed too early. See http://bit.ly/2kdckMn"
                                )
                            )
                  )
                : u.then(() => h)
        )
            .then((d) => (n && s._resolve(), s._completion.then(() => d)))
            .catch((d) => (s._reject(d), de(d)));
    });
}
function _r(e, t, r) {
    const n = be(e) ? e.slice() : [e];
    for (let o = 0; o < r; ++o) n.push(t);
    return n;
}
const dc = {
    stack: "dbcore",
    name: "VirtualIndexMiddleware",
    level: 1,
    create: function (e) {
        return {
            ...e,
            table(t) {
                const r = e.table(t),
                    { schema: n } = r,
                    o = {},
                    i = [];
                function s(u, d, f) {
                    const b = Vt(u),
                        x = (o[b] = o[b] || []),
                        g = u == null ? 0 : typeof u == "string" ? 1 : u.length,
                        m = d > 0,
                        v = {
                            ...f,
                            isVirtual: m,
                            keyTail: d,
                            keyLength: g,
                            extractKey: Hn(u),
                            unique: !m && f.unique,
                        };
                    return (
                        x.push(v),
                        v.isPrimaryKey || i.push(v),
                        g > 1 &&
                            s(g === 2 ? u[0] : u.slice(0, g - 1), d + 1, f),
                        x.sort((p, y) => p.keyTail - y.keyTail),
                        v
                    );
                }
                const l = s(n.primaryKey.keyPath, 0, n.primaryKey);
                o[":id"] = [l];
                for (const u of n.indexes) s(u.keyPath, 0, u);
                function a(u) {
                    const d = u.query.index;
                    return d.isVirtual
                        ? {
                              ...u,
                              query: {
                                  index: d,
                                  range:
                                      ((f = u.query.range),
                                      (b = d.keyTail),
                                      {
                                          type: f.type === 1 ? 2 : f.type,
                                          lower: _r(
                                              f.lower,
                                              f.lowerOpen
                                                  ? e.MAX_KEY
                                                  : e.MIN_KEY,
                                              b
                                          ),
                                          lowerOpen: !0,
                                          upper: _r(
                                              f.upper,
                                              f.upperOpen
                                                  ? e.MIN_KEY
                                                  : e.MAX_KEY,
                                              b
                                          ),
                                          upperOpen: !0,
                                      }),
                              },
                          }
                        : u;
                    var f, b;
                }
                return {
                    ...r,
                    schema: {
                        ...n,
                        primaryKey: l,
                        indexes: i,
                        getIndexByKeyPath: function (u) {
                            const d = o[Vt(u)];
                            return d && d[0];
                        },
                    },
                    count: (u) => r.count(a(u)),
                    query: (u) => r.query(a(u)),
                    openCursor(u) {
                        const {
                            keyTail: d,
                            isVirtual: f,
                            keyLength: b,
                        } = u.query.index;
                        return f
                            ? r.openCursor(a(u)).then(
                                  (x) =>
                                      x &&
                                      (function (g) {
                                          return Object.create(g, {
                                              continue: {
                                                  value: function (v) {
                                                      v != null
                                                          ? g.continue(
                                                                _r(
                                                                    v,
                                                                    u.reverse
                                                                        ? e.MAX_KEY
                                                                        : e.MIN_KEY,
                                                                    d
                                                                )
                                                            )
                                                          : u.unique
                                                          ? g.continue(
                                                                g.key
                                                                    .slice(0, b)
                                                                    .concat(
                                                                        u.reverse
                                                                            ? e.MIN_KEY
                                                                            : e.MAX_KEY,
                                                                        d
                                                                    )
                                                            )
                                                          : g.continue();
                                                  },
                                              },
                                              continuePrimaryKey: {
                                                  value(v, p) {
                                                      g.continuePrimaryKey(
                                                          _r(v, e.MAX_KEY, d),
                                                          p
                                                      );
                                                  },
                                              },
                                              primaryKey: {
                                                  get: () => g.primaryKey,
                                              },
                                              key: {
                                                  get() {
                                                      const v = g.key;
                                                      return b === 1
                                                          ? v[0]
                                                          : v.slice(0, b);
                                                  },
                                              },
                                              value: { get: () => g.value },
                                          });
                                      })(x)
                              )
                            : r.openCursor(u);
                    },
                };
            },
        };
    },
};
function po(e, t, r, n) {
    return (
        (r = r || {}),
        (n = n || ""),
        ce(e).forEach((o) => {
            if (Ce(t, o)) {
                var i = e[o],
                    s = t[o];
                if (typeof i == "object" && typeof s == "object" && i && s) {
                    const l = Pn(i);
                    l !== Pn(s)
                        ? (r[n + o] = t[o])
                        : l === "Object"
                        ? po(i, s, r, n + o + ".")
                        : i !== s && (r[n + o] = t[o]);
                } else i !== s && (r[n + o] = t[o]);
            } else r[n + o] = void 0;
        }),
        ce(t).forEach((o) => {
            Ce(e, o) || (r[n + o] = t[o]);
        }),
        r
    );
}
const fc = {
    stack: "dbcore",
    name: "HooksMiddleware",
    level: 2,
    create: (e) => ({
        ...e,
        table(t) {
            const r = e.table(t),
                { primaryKey: n } = r.schema;
            return {
                ...r,
                mutate(i) {
                    const s = B.trans,
                        {
                            deleting: l,
                            creating: a,
                            updating: h,
                        } = s.table(t).hook;
                    switch (i.type) {
                        case "add":
                            if (a.fire === Z) break;
                            return s._promise("readwrite", () => u(i), !0);
                        case "put":
                            if (a.fire === Z && h.fire === Z) break;
                            return s._promise("readwrite", () => u(i), !0);
                        case "delete":
                            if (l.fire === Z) break;
                            return s._promise("readwrite", () => u(i), !0);
                        case "deleteRange":
                            if (l.fire === Z) break;
                            return s._promise(
                                "readwrite",
                                () =>
                                    (function (f) {
                                        return d(f.trans, f.range, 1e4);
                                    })(i),
                                !0
                            );
                    }
                    return r.mutate(i);
                    function u(f) {
                        const b = B.trans,
                            x =
                                f.keys ||
                                (function (g, m) {
                                    return m.type === "delete"
                                        ? m.keys
                                        : m.keys || m.values.map(g.extractKey);
                                })(n, f);
                        if (!x) throw new Error("Keys missing");
                        return (
                            (f =
                                f.type === "add" || f.type === "put"
                                    ? { ...f, keys: x }
                                    : { ...f }).type !== "delete" &&
                                (f.values = [...f.values]),
                            f.keys && (f.keys = [...f.keys]),
                            (function (g, m, v) {
                                return m.type === "add"
                                    ? Promise.resolve([])
                                    : g.getMany({
                                          trans: m.trans,
                                          keys: v,
                                          cache: "immutable",
                                      });
                            })(r, f, x).then((g) => {
                                const m = x.map((v, p) => {
                                    const y = g[p],
                                        C = { onerror: null, onsuccess: null };
                                    if (f.type === "delete")
                                        l.fire.call(C, v, y, b);
                                    else if (f.type === "add" || y === void 0) {
                                        const S = a.fire.call(
                                            C,
                                            v,
                                            f.values[p],
                                            b
                                        );
                                        v == null &&
                                            S != null &&
                                            ((v = S),
                                            (f.keys[p] = v),
                                            n.outbound ||
                                                Re(f.values[p], n.keyPath, v));
                                    } else {
                                        const S = po(y, f.values[p]),
                                            R = h.fire.call(C, S, v, y, b);
                                        if (R) {
                                            const c = f.values[p];
                                            Object.keys(R).forEach((_) => {
                                                Ce(c, _)
                                                    ? (c[_] = R[_])
                                                    : Re(c, _, R[_]);
                                            });
                                        }
                                    }
                                    return C;
                                });
                                return r
                                    .mutate(f)
                                    .then(
                                        ({
                                            failures: v,
                                            results: p,
                                            numFailures: y,
                                            lastResult: C,
                                        }) => {
                                            for (let S = 0; S < x.length; ++S) {
                                                const R = p ? p[S] : x[S],
                                                    c = m[S];
                                                R == null
                                                    ? c.onerror &&
                                                      c.onerror(v[S])
                                                    : c.onsuccess &&
                                                      c.onsuccess(
                                                          f.type === "put" &&
                                                              g[S]
                                                              ? f.values[S]
                                                              : R
                                                      );
                                            }
                                            return {
                                                failures: v,
                                                results: p,
                                                numFailures: y,
                                                lastResult: C,
                                            };
                                        }
                                    )
                                    .catch(
                                        (v) => (
                                            m.forEach(
                                                (p) => p.onerror && p.onerror(v)
                                            ),
                                            Promise.reject(v)
                                        )
                                    );
                            })
                        );
                    }
                    function d(f, b, x) {
                        return r
                            .query({
                                trans: f,
                                values: !1,
                                query: { index: n, range: b },
                                limit: x,
                            })
                            .then(({ result: g }) =>
                                u({ type: "delete", keys: g, trans: f }).then(
                                    (m) =>
                                        m.numFailures > 0
                                            ? Promise.reject(m.failures[0])
                                            : g.length < x
                                            ? {
                                                  failures: [],
                                                  numFailures: 0,
                                                  lastResult: void 0,
                                              }
                                            : d(
                                                  f,
                                                  {
                                                      ...b,
                                                      lower: g[g.length - 1],
                                                      lowerOpen: !0,
                                                  },
                                                  x
                                              )
                                )
                            );
                    }
                },
            };
        },
    }),
};
function cs(e, t, r) {
    try {
        if (!t || t.keys.length < e.length) return null;
        const n = [];
        for (let o = 0, i = 0; o < t.keys.length && i < e.length; ++o)
            xe(t.keys[o], e[i]) === 0 &&
                (n.push(r ? rr(t.values[o]) : t.values[o]), ++i);
        return n.length === e.length ? n : null;
    } catch {
        return null;
    }
}
const hc = {
    stack: "dbcore",
    level: -1,
    create: (e) => ({
        table: (t) => {
            const r = e.table(t);
            return {
                ...r,
                getMany: (n) => {
                    if (!n.cache) return r.getMany(n);
                    const o = cs(n.keys, n.trans._cache, n.cache === "clone");
                    return o
                        ? O.resolve(o)
                        : r.getMany(n).then(
                              (i) => (
                                  (n.trans._cache = {
                                      keys: n.keys,
                                      values: n.cache === "clone" ? rr(i) : i,
                                  }),
                                  i
                              )
                          );
                },
                mutate: (n) => (
                    n.type !== "add" && (n.trans._cache = null), r.mutate(n)
                ),
            };
        },
    }),
};
function vo(e) {
    return !("from" in e);
}
const Fe = function (e, t) {
    if (!this) {
        const r = new Fe();
        return e && "d" in e && we(r, e), r;
    }
    we(
        this,
        arguments.length
            ? { d: 1, from: e, to: arguments.length > 1 ? t : e }
            : { d: 0 }
    );
};
function Jt(e, t, r) {
    const n = xe(t, r);
    if (isNaN(n)) return;
    if (n > 0) throw RangeError();
    if (vo(e)) return we(e, { from: t, to: r, d: 1 });
    const o = e.l,
        i = e.r;
    if (xe(r, e.from) < 0)
        return (
            o
                ? Jt(o, t, r)
                : (e.l = { from: t, to: r, d: 1, l: null, r: null }),
            oi(e)
        );
    if (xe(t, e.to) > 0)
        return (
            i
                ? Jt(i, t, r)
                : (e.r = { from: t, to: r, d: 1, l: null, r: null }),
            oi(e)
        );
    xe(t, e.from) < 0 && ((e.from = t), (e.l = null), (e.d = i ? i.d + 1 : 1)),
        xe(r, e.to) > 0 &&
            ((e.to = r), (e.r = null), (e.d = e.l ? e.l.d + 1 : 1));
    const s = !e.r;
    o && !e.l && Vr(e, o), i && s && Vr(e, i);
}
function Vr(e, t) {
    vo(t) ||
        (function r(n, { from: o, to: i, l: s, r: l }) {
            Jt(n, o, i), s && r(n, s), l && r(n, l);
        })(e, t);
}
function pc(e, t) {
    const r = Yn(t);
    let n = r.next();
    if (n.done) return !1;
    let o = n.value;
    const i = Yn(e);
    let s = i.next(o.from),
        l = s.value;
    for (; !n.done && !s.done; ) {
        if (xe(l.from, o.to) <= 0 && xe(l.to, o.from) >= 0) return !0;
        xe(o.from, l.from) < 0
            ? (o = (n = r.next(l.from)).value)
            : (l = (s = i.next(o.from)).value);
    }
    return !1;
}
function Yn(e) {
    let t = vo(e) ? null : { s: 0, n: e };
    return {
        next(r) {
            const n = arguments.length > 0;
            for (; t; )
                switch (t.s) {
                    case 0:
                        if (((t.s = 1), n))
                            for (; t.n.l && xe(r, t.n.from) < 0; )
                                t = { up: t, n: t.n.l, s: 1 };
                        else for (; t.n.l; ) t = { up: t, n: t.n.l, s: 1 };
                    case 1:
                        if (((t.s = 2), !n || xe(r, t.n.to) <= 0))
                            return { value: t.n, done: !1 };
                    case 2:
                        if (t.n.r) {
                            (t.s = 3), (t = { up: t, n: t.n.r, s: 0 });
                            continue;
                        }
                    case 3:
                        t = t.up;
                }
            return { done: !0 };
        },
    };
}
function oi(e) {
    var t, r;
    const n =
            (((t = e.r) === null || t === void 0 ? void 0 : t.d) || 0) -
            (((r = e.l) === null || r === void 0 ? void 0 : r.d) || 0),
        o = n > 1 ? "r" : n < -1 ? "l" : "";
    if (o) {
        const i = o === "r" ? "l" : "r",
            s = { ...e },
            l = e[o];
        (e.from = l.from),
            (e.to = l.to),
            (e[o] = l[o]),
            (s[o] = l[i]),
            (e[i] = s),
            (s.d = ii(s));
    }
    e.d = ii(e);
}
function ii({ r: e, l: t }) {
    return (e ? (t ? Math.max(e.d, t.d) : e.d) : t ? t.d : 0) + 1;
}
zt(Fe.prototype, {
    add(e) {
        return Vr(this, e), this;
    },
    addKey(e) {
        return Jt(this, e, e), this;
    },
    addKeys(e) {
        return e.forEach((t) => Jt(this, t, t)), this;
    },
    [En]() {
        return Yn(this);
    },
});
const vc = {
    stack: "dbcore",
    level: 0,
    create: (e) => {
        const t = e.schema.name,
            r = new Fe(e.MIN_KEY, e.MAX_KEY);
        return {
            ...e,
            table: (n) => {
                const o = e.table(n),
                    { schema: i } = o,
                    { primaryKey: s } = i,
                    { extractKey: l, outbound: a } = s,
                    h = {
                        ...o,
                        mutate: (f) => {
                            const b = f.trans,
                                x = b.mutatedParts || (b.mutatedParts = {}),
                                g = (R) => {
                                    const c = `idb://${t}/${n}/${R}`;
                                    return x[c] || (x[c] = new Fe());
                                },
                                m = g(""),
                                v = g(":dels"),
                                { type: p } = f;
                            let [y, C] =
                                f.type === "deleteRange"
                                    ? [f.range]
                                    : f.type === "delete"
                                    ? [f.keys]
                                    : f.values.length < 50
                                    ? [[], f.values]
                                    : [];
                            const S = f.trans._cache;
                            return o.mutate(f).then((R) => {
                                if (be(y)) {
                                    p !== "delete" && (y = R.results),
                                        m.addKeys(y);
                                    const c = cs(y, S);
                                    c || p === "add" || v.addKeys(y),
                                        (c || C) &&
                                            (function (_, w, T, P) {
                                                function z(M) {
                                                    const $ = _(M.name || "");
                                                    function U(A) {
                                                        return A != null
                                                            ? M.extractKey(A)
                                                            : null;
                                                    }
                                                    const G = (A) =>
                                                        M.multiEntry && be(A)
                                                            ? A.forEach((J) =>
                                                                  $.addKey(J)
                                                              )
                                                            : $.addKey(A);
                                                    (T || P).forEach((A, J) => {
                                                        const ae = T && U(T[J]),
                                                            le = P && U(P[J]);
                                                        xe(ae, le) !== 0 &&
                                                            (ae != null &&
                                                                G(ae),
                                                            le != null &&
                                                                G(le));
                                                    });
                                                }
                                                w.indexes.forEach(z);
                                            })(g, i, c, C);
                                } else if (y) {
                                    const c = { from: y.lower, to: y.upper };
                                    v.add(c), m.add(c);
                                } else
                                    m.add(r),
                                        v.add(r),
                                        i.indexes.forEach((c) =>
                                            g(c.name).add(r)
                                        );
                                return R;
                            });
                        },
                    },
                    u = ({ query: { index: f, range: b } }) => {
                        var x, g;
                        return [
                            f,
                            new Fe(
                                (x = b.lower) !== null && x !== void 0
                                    ? x
                                    : e.MIN_KEY,
                                (g = b.upper) !== null && g !== void 0
                                    ? g
                                    : e.MAX_KEY
                            ),
                        ];
                    },
                    d = {
                        get: (f) => [s, new Fe(f.key)],
                        getMany: (f) => [s, new Fe().addKeys(f.keys)],
                        count: u,
                        query: u,
                        openCursor: u,
                    };
                return (
                    ce(d).forEach((f) => {
                        h[f] = function (b) {
                            const { subscr: x } = B;
                            if (x) {
                                const g = (C) => {
                                        const S = `idb://${t}/${n}/${C}`;
                                        return x[S] || (x[S] = new Fe());
                                    },
                                    m = g(""),
                                    v = g(":dels"),
                                    [p, y] = d[f](b);
                                if ((g(p.name || "").add(y), !p.isPrimaryKey)) {
                                    if (f !== "count") {
                                        const C =
                                            f === "query" &&
                                            a &&
                                            b.values &&
                                            o.query({ ...b, values: !1 });
                                        return o[f]
                                            .apply(this, arguments)
                                            .then((S) => {
                                                if (f === "query") {
                                                    if (a && b.values)
                                                        return C.then(
                                                            ({ result: c }) => (
                                                                m.addKeys(c), S
                                                            )
                                                        );
                                                    const R = b.values
                                                        ? S.result.map(l)
                                                        : S.result;
                                                    b.values
                                                        ? m.addKeys(R)
                                                        : v.addKeys(R);
                                                } else if (f === "openCursor") {
                                                    const R = S,
                                                        c = b.values;
                                                    return (
                                                        R &&
                                                        Object.create(R, {
                                                            key: {
                                                                get: () => (
                                                                    v.addKey(
                                                                        R.primaryKey
                                                                    ),
                                                                    R.key
                                                                ),
                                                            },
                                                            primaryKey: {
                                                                get() {
                                                                    const _ =
                                                                        R.primaryKey;
                                                                    return (
                                                                        v.addKey(
                                                                            _
                                                                        ),
                                                                        _
                                                                    );
                                                                },
                                                            },
                                                            value: {
                                                                get: () => (
                                                                    c &&
                                                                        m.addKey(
                                                                            R.primaryKey
                                                                        ),
                                                                    R.value
                                                                ),
                                                            },
                                                        })
                                                    );
                                                }
                                                return S;
                                            });
                                    }
                                    v.add(r);
                                }
                            }
                            return o[f].apply(this, arguments);
                        };
                    }),
                    h
                );
            },
        };
    },
};
class ft {
    constructor(t, r) {
        (this._middlewares = {}), (this.verno = 0);
        const n = ft.dependencies;
        (this._options = r =
            {
                addons: ft.addons,
                autoOpen: !0,
                indexedDB: n.indexedDB,
                IDBKeyRange: n.IDBKeyRange,
                ...r,
            }),
            (this._deps = {
                indexedDB: r.indexedDB,
                IDBKeyRange: r.IDBKeyRange,
            });
        const { addons: o } = r;
        (this._dbSchema = {}),
            (this._versions = []),
            (this._storeNames = []),
            (this._allTables = {}),
            (this.idbdb = null),
            (this._novip = this);
        const i = {
            dbOpenError: null,
            isBeingOpened: !1,
            onReadyBeingFired: null,
            openComplete: !1,
            dbReadyResolve: Z,
            dbReadyPromise: null,
            cancelOpen: Z,
            openCanceller: null,
            autoSchema: !0,
            PR1398_maxLoop: 3,
        };
        var s;
        (i.dbReadyPromise = new O((l) => {
            i.dbReadyResolve = l;
        })),
            (i.openCanceller = new O((l, a) => {
                i.cancelOpen = a;
            })),
            (this._state = i),
            (this.name = t),
            (this.on = Lt(
                this,
                "populate",
                "blocked",
                "versionchange",
                "close",
                { ready: [ao, Z] }
            )),
            (this.on.ready.subscribe = Ai(
                this.on.ready.subscribe,
                (l) => (a, h) => {
                    ft.vip(() => {
                        const u = this._state;
                        if (u.openComplete)
                            u.dbOpenError || O.resolve().then(a), h && l(a);
                        else if (u.onReadyBeingFired)
                            u.onReadyBeingFired.push(a), h && l(a);
                        else {
                            l(a);
                            const d = this;
                            h ||
                                l(function f() {
                                    d.on.ready.unsubscribe(a),
                                        d.on.ready.unsubscribe(f);
                                });
                        }
                    });
                }
            )),
            (this.Collection =
                ((s = this),
                At(Qu.prototype, function (l, a) {
                    this.db = s;
                    let h = ns,
                        u = null;
                    if (a)
                        try {
                            h = a();
                        } catch (x) {
                            u = x;
                        }
                    const d = l._ctx,
                        f = d.table,
                        b = f.hook.reading.fire;
                    this._ctx = {
                        table: f,
                        index: d.index,
                        isPrimKey:
                            !d.index ||
                            (f.schema.primKey.keyPath &&
                                d.index === f.schema.primKey.name),
                        range: h,
                        keysOnly: !1,
                        dir: "next",
                        unique: "",
                        algorithm: null,
                        filter: null,
                        replayFilter: null,
                        justLimit: !0,
                        isMatch: null,
                        offset: 0,
                        limit: 1 / 0,
                        error: u,
                        or: d.or,
                        valueMapper: b !== Gt ? b : null,
                    };
                }))),
            (this.Table = (function (l) {
                return At(Zu.prototype, function (a, h, u) {
                    (this.db = l),
                        (this._tx = u),
                        (this.name = a),
                        (this.schema = h),
                        (this.hook = l._allTables[a]
                            ? l._allTables[a].hook
                            : Lt(null, {
                                  creating: [Mu, Z],
                                  reading: [ju, Gt],
                                  updating: [Hu, Z],
                                  deleting: [Ku, Z],
                              }));
                });
            })(this)),
            (this.Transaction = (function (l) {
                return At(rc.prototype, function (a, h, u, d, f) {
                    (this.db = l),
                        (this.mode = a),
                        (this.storeNames = h),
                        (this.schema = u),
                        (this.chromeTransactionDurability = d),
                        (this.idbtrans = null),
                        (this.on = Lt(this, "complete", "error", "abort")),
                        (this.parent = f || null),
                        (this.active = !0),
                        (this._reculock = 0),
                        (this._blockedFuncs = []),
                        (this._resolve = null),
                        (this._reject = null),
                        (this._waitingFor = null),
                        (this._waitingQueue = null),
                        (this._spinCount = 0),
                        (this._completion = new O((b, x) => {
                            (this._resolve = b), (this._reject = x);
                        })),
                        this._completion.then(
                            () => {
                                (this.active = !1), this.on.complete.fire();
                            },
                            (b) => {
                                var x = this.active;
                                return (
                                    (this.active = !1),
                                    this.on.error.fire(b),
                                    this.parent
                                        ? this.parent._reject(b)
                                        : x &&
                                          this.idbtrans &&
                                          this.idbtrans.abort(),
                                    de(b)
                                );
                            }
                        );
                });
            })(this)),
            (this.Version = (function (l) {
                return At(ac.prototype, function (a) {
                    (this.db = l),
                        (this._cfg = {
                            version: a,
                            storesSource: null,
                            dbschema: {},
                            tables: {},
                            contentUpgrade: null,
                        });
                });
            })(this)),
            (this.WhereClause = (function (l) {
                return At(is.prototype, function (a, h, u) {
                    (this.db = l),
                        (this._ctx = {
                            table: a,
                            index: h === ":id" ? null : h,
                            or: u,
                        });
                    const d = l._deps.indexedDB;
                    if (!d) throw new j.MissingAPI();
                    (this._cmp = this._ascending = d.cmp.bind(d)),
                        (this._descending = (f, b) => d.cmp(b, f)),
                        (this._max = (f, b) => (d.cmp(f, b) > 0 ? f : b)),
                        (this._min = (f, b) => (d.cmp(f, b) < 0 ? f : b)),
                        (this._IDBKeyRange = l._deps.IDBKeyRange);
                });
            })(this)),
            this.on("versionchange", (l) => {
                l.newVersion > 0
                    ? console.warn(
                          `Another connection wants to upgrade database '${this.name}'. Closing db now to resume the upgrade.`
                      )
                    : console.warn(
                          `Another connection wants to delete database '${this.name}'. Closing db now to resume the delete request.`
                      ),
                    this.close();
            }),
            this.on("blocked", (l) => {
                !l.newVersion || l.newVersion < l.oldVersion
                    ? console.warn(`Dexie.delete('${this.name}') was blocked`)
                    : console.warn(
                          `Upgrade '${
                              this.name
                          }' blocked by other connection holding version ${
                              l.oldVersion / 10
                          }`
                      );
            }),
            (this._maxKey = Qt(r.IDBKeyRange)),
            (this._createTransaction = (l, a, h, u) =>
                new this.Transaction(
                    l,
                    a,
                    h,
                    this._options.chromeTransactionDurability,
                    u
                )),
            (this._fireOnBlocked = (l) => {
                this.on("blocked").fire(l),
                    Nt.filter(
                        (a) =>
                            a.name === this.name &&
                            a !== this &&
                            !a._state.vcFired
                    ).map((a) => a.on("versionchange").fire(l));
            }),
            this.use(dc),
            this.use(fc),
            this.use(vc),
            this.use(hc),
            (this.vip = Object.create(this, { _vip: { value: !0 } })),
            o.forEach((l) => l(this));
    }
    version(t) {
        if (isNaN(t) || t < 0.1)
            throw new j.Type("Given version is not a positive number");
        if (
            ((t = Math.round(10 * t) / 10),
            this.idbdb || this._state.isBeingOpened)
        )
            throw new j.Schema("Cannot add version when database is open");
        this.verno = Math.max(this.verno, t);
        const r = this._versions;
        var n = r.filter((o) => o._cfg.version === t)[0];
        return (
            n ||
            ((n = new this.Version(t)),
            r.push(n),
            r.sort(ic),
            n.stores({}),
            (this._state.autoSchema = !1),
            n)
        );
    }
    _whenReady(t) {
        return this.idbdb &&
            (this._state.openComplete || B.letThrough || this._vip)
            ? t()
            : new O((r, n) => {
                  if (this._state.openComplete)
                      return n(new j.DatabaseClosed(this._state.dbOpenError));
                  if (!this._state.isBeingOpened) {
                      if (!this._options.autoOpen)
                          return void n(new j.DatabaseClosed());
                      this.open().catch(Z);
                  }
                  this._state.dbReadyPromise.then(r, n);
              }).then(t);
    }
    use({ stack: t, create: r, level: n, name: o }) {
        o && this.unuse({ stack: t, name: o });
        const i = this._middlewares[t] || (this._middlewares[t] = []);
        return (
            i.push({ stack: t, create: r, level: n ?? 10, name: o }),
            i.sort((s, l) => s.level - l.level),
            this
        );
    }
    unuse({ stack: t, name: r, create: n }) {
        return (
            t &&
                this._middlewares[t] &&
                (this._middlewares[t] = this._middlewares[t].filter((o) =>
                    n ? o.create !== n : !!r && o.name !== r
                )),
            this
        );
    }
    open() {
        return uc(this);
    }
    _close() {
        const t = this._state,
            r = Nt.indexOf(this);
        if ((r >= 0 && Nt.splice(r, 1), this.idbdb)) {
            try {
                this.idbdb.close();
            } catch {}
            this._novip.idbdb = null;
        }
        (t.dbReadyPromise = new O((n) => {
            t.dbReadyResolve = n;
        })),
            (t.openCanceller = new O((n, o) => {
                t.cancelOpen = o;
            }));
    }
    close() {
        this._close();
        const t = this._state;
        (this._options.autoOpen = !1),
            (t.dbOpenError = new j.DatabaseClosed()),
            t.isBeingOpened && t.cancelOpen(t.dbOpenError);
    }
    delete() {
        const t = arguments.length > 0,
            r = this._state;
        return new O((n, o) => {
            const i = () => {
                this.close();
                var s = this._deps.indexedDB.deleteDatabase(this.name);
                (s.onsuccess = re(() => {
                    (function ({ indexedDB: l, IDBKeyRange: a }, h) {
                        !ho(l) && h !== Qr && fo(l, a).delete(h).catch(Z);
                    })(this._deps, this.name),
                        n();
                })),
                    (s.onerror = Oe(o)),
                    (s.onblocked = this._fireOnBlocked);
            };
            if (t)
                throw new j.InvalidArgument(
                    "Arguments not allowed in db.delete()"
                );
            r.isBeingOpened ? r.dbReadyPromise.then(i) : i();
        });
    }
    backendDB() {
        return this.idbdb;
    }
    isOpen() {
        return this.idbdb !== null;
    }
    hasBeenClosed() {
        const t = this._state.dbOpenError;
        return t && t.name === "DatabaseClosed";
    }
    hasFailed() {
        return this._state.dbOpenError !== null;
    }
    dynamicallyOpened() {
        return this._state.autoSchema;
    }
    get tables() {
        return ce(this._allTables).map((t) => this._allTables[t]);
    }
    transaction() {
        const t = cc.apply(this, arguments);
        return this._transaction.apply(this, t);
    }
    _transaction(t, r, n) {
        let o = B.trans;
        (o && o.db === this && t.indexOf("!") === -1) || (o = null);
        const i = t.indexOf("?") !== -1;
        let s, l;
        t = t.replace("!", "").replace("?", "");
        try {
            if (
                ((l = r.map((h) => {
                    var u = h instanceof this.Table ? h.name : h;
                    if (typeof u != "string")
                        throw new TypeError(
                            "Invalid table argument to Dexie.transaction(). Only Table or String are allowed"
                        );
                    return u;
                })),
                t == "r" || t === bn)
            )
                s = bn;
            else {
                if (t != "rw" && t != gn)
                    throw new j.InvalidArgument(
                        "Invalid transaction mode: " + t
                    );
                s = gn;
            }
            if (o) {
                if (o.mode === bn && s === gn) {
                    if (!i)
                        throw new j.SubTransaction(
                            "Cannot enter a sub-transaction with READWRITE mode when parent transaction is READONLY"
                        );
                    o = null;
                }
                o &&
                    l.forEach((h) => {
                        if (o && o.storeNames.indexOf(h) === -1) {
                            if (!i)
                                throw new j.SubTransaction(
                                    "Table " +
                                        h +
                                        " not included in parent transaction."
                                );
                            o = null;
                        }
                    }),
                    i && o && !o.active && (o = null);
            }
        } catch (h) {
            return o
                ? o._promise(null, (u, d) => {
                      d(h);
                  })
                : de(h);
        }
        const a = us.bind(null, this, s, l, o, n);
        return o
            ? o._promise(s, a, "lock")
            : B.trans
            ? Dt(B.transless, () => this._whenReady(a))
            : this._whenReady(a);
    }
    table(t) {
        if (!Ce(this._allTables, t))
            throw new j.InvalidTable(`Table ${t} does not exist`);
        return this._allTables[t];
    }
}
const bc =
    typeof Symbol < "u" && "observable" in Symbol
        ? Symbol.observable
        : "@@observable";
class gc {
    constructor(t) {
        this._subscribe = t;
    }
    subscribe(t, r, n) {
        return this._subscribe(
            t && typeof t != "function" ? t : { next: t, error: r, complete: n }
        );
    }
    [bc]() {
        return this;
    }
}
function ds(e, t) {
    return (
        ce(t).forEach((r) => {
            Vr(e[r] || (e[r] = new Fe()), t[r]);
        }),
        e
    );
}
function mc(e) {
    let t,
        r = !1;
    const n = new gc((o) => {
        const i = oo(e);
        let s = !1,
            l = {},
            a = {};
        const h = {
            get closed() {
                return s;
            },
            unsubscribe: () => {
                (s = !0), Je.storagemutated.unsubscribe(b);
            },
        };
        o.start && o.start(h);
        let u = !1,
            d = !1;
        function f() {
            return ce(a).some((g) => l[g] && pc(l[g], a[g]));
        }
        const b = (g) => {
                ds(l, g), f() && x();
            },
            x = () => {
                if (u || s) return;
                l = {};
                const g = {},
                    m = (function (v) {
                        i && It();
                        const p = () => Ze(e, { subscr: v, trans: null }),
                            y = B.trans ? Dt(B.transless, p) : p();
                        return i && y.then(Ne, Ne), y;
                    })(g);
                d || (Je(Zt, b), (d = !0)),
                    (u = !0),
                    Promise.resolve(m).then(
                        (v) => {
                            (r = !0),
                                (t = v),
                                (u = !1),
                                s ||
                                    (f()
                                        ? x()
                                        : ((l = {}),
                                          (a = g),
                                          o.next && o.next(v)));
                        },
                        (v) => {
                            (u = !1),
                                (r = !1),
                                o.error && o.error(v),
                                h.unsubscribe();
                        }
                    );
            };
        return x(), h;
    });
    return (n.hasValue = () => r), (n.getValue = () => t), n;
}
let Xn;
try {
    Xn = {
        indexedDB:
            te.indexedDB ||
            te.mozIndexedDB ||
            te.webkitIndexedDB ||
            te.msIndexedDB,
        IDBKeyRange: te.IDBKeyRange || te.webkitIDBKeyRange,
    };
} catch {
    Xn = { indexedDB: null, IDBKeyRange: null };
}
const ot = ft;
function Dr(e) {
    let t = Me;
    try {
        (Me = !0), Je.storagemutated.fire(e);
    } finally {
        Me = t;
    }
}
zt(ot, {
    ...Pr,
    delete: (e) => new ot(e, { addons: [] }).delete(),
    exists: (e) =>
        new ot(e, { addons: [] })
            .open()
            .then((t) => (t.close(), !0))
            .catch("NoSuchDatabaseError", () => !1),
    getDatabaseNames(e) {
        try {
            return (function ({ indexedDB: t, IDBKeyRange: r }) {
                return ho(t)
                    ? Promise.resolve(t.databases()).then((n) =>
                          n.map((o) => o.name).filter((o) => o !== Qr)
                      )
                    : fo(t, r).toCollection().primaryKeys();
            })(ot.dependencies).then(e);
        } catch {
            return de(new j.MissingAPI());
        }
    },
    defineClass: () =>
        function (e) {
            we(this, e);
        },
    ignoreTransaction: (e) => (B.trans ? Dt(B.transless, e) : e()),
    vip: qn,
    async: function (e) {
        return function () {
            try {
                var t = Gn(e.apply(this, arguments));
                return t && typeof t.then == "function" ? t : O.resolve(t);
            } catch (r) {
                return de(r);
            }
        };
    },
    spawn: function (e, t, r) {
        try {
            var n = Gn(e.apply(r, t || []));
            return n && typeof n.then == "function" ? n : O.resolve(n);
        } catch (o) {
            return de(o);
        }
    },
    currentTransaction: { get: () => B.trans || null },
    waitFor: function (e, t) {
        const r = O.resolve(
            typeof e == "function" ? ot.ignoreTransaction(e) : e
        ).timeout(t || 6e4);
        return B.trans ? B.trans.waitFor(r) : r;
    },
    Promise: O,
    debug: {
        get: () => Ie,
        set: (e) => {
            Ni(e, e === "dexie" ? () => !0 : rs);
        },
    },
    derive: Et,
    extend: we,
    props: zt,
    override: Ai,
    Events: Lt,
    on: Je,
    liveQuery: mc,
    extendObservabilitySet: ds,
    getByKeyPath: He,
    setByKeyPath: Re,
    delByKeyPath: function (e, t) {
        typeof t == "string"
            ? Re(e, t, void 0)
            : "length" in t &&
              [].map.call(t, function (r) {
                  Re(e, r, void 0);
              });
    },
    shallowClone: Mi,
    deepClone: rr,
    getObjectDiff: po,
    cmp: xe,
    asap: Fi,
    minKey: Mn,
    addons: [],
    connections: Nt,
    errnames: so,
    dependencies: Xn,
    semVer: Qo,
    version: Qo.split(".")
        .map((e) => parseInt(e))
        .reduce((e, t, r) => e + t / Math.pow(10, 2 * r)),
}),
    (ot.maxKey = Qt(ot.dependencies.IDBKeyRange)),
    typeof dispatchEvent < "u" &&
        typeof addEventListener < "u" &&
        (Je(Zt, (e) => {
            if (!Me) {
                let t;
                Zr
                    ? ((t = document.createEvent("CustomEvent")),
                      t.initCustomEvent(Xe, !0, !0, e))
                    : (t = new CustomEvent(Xe, { detail: e })),
                    (Me = !0),
                    dispatchEvent(t),
                    (Me = !1);
            }
        }),
        addEventListener(Xe, ({ detail: e }) => {
            Me || Dr(e);
        }));
let Me = !1;
if (typeof BroadcastChannel < "u") {
    const e = new BroadcastChannel(Xe);
    typeof e.unref == "function" && e.unref(),
        Je(Zt, (t) => {
            Me || e.postMessage(t);
        }),
        (e.onmessage = (t) => {
            t.data && Dr(t.data);
        });
} else if (typeof self < "u" && typeof navigator < "u") {
    Je(Zt, (t) => {
        try {
            Me ||
                (typeof localStorage < "u" &&
                    localStorage.setItem(
                        Xe,
                        JSON.stringify({ trig: Math.random(), changedParts: t })
                    ),
                typeof self.clients == "object" &&
                    [
                        ...self.clients.matchAll({ includeUncontrolled: !0 }),
                    ].forEach((r) =>
                        r.postMessage({ type: Xe, changedParts: t })
                    ));
        } catch {}
    }),
        typeof addEventListener < "u" &&
            addEventListener("storage", (t) => {
                if (t.key === Xe) {
                    const r = JSON.parse(t.newValue);
                    r && Dr(r.changedParts);
                }
            });
    const e = self.document && navigator.serviceWorker;
    e &&
        e.addEventListener("message", function ({ data: t }) {
            t && t.type === Xe && Dr(t.changedParts);
        });
}
(O.rejectionMapper = function (e, t) {
    if (
        !e ||
        e instanceof Tt ||
        e instanceof TypeError ||
        e instanceof SyntaxError ||
        !e.name ||
        !Go[e.name]
    )
        return e;
    var r = new Go[e.name](t || e.message, e);
    return (
        "stack" in e &&
            Ke(r, "stack", {
                get: function () {
                    return this.inner.stack;
                },
            }),
        r
    );
}),
    Ni(Ie, rs);
class yc extends ft {
    constructor() {
        super("userImages");
        yo(this, "imageFile");
        this.version(1).stores({
            imageFile: "++id, webkitRelativePath, name, lastModified",
        });
    }
}
const qe = new yc(),
    xc = {
        xmlns: "http://www.w3.org/2000/svg",
        "xmlns:xlink": "http://www.w3.org/1999/xlink",
        viewBox: "0 0 24 24",
    },
    wc = fe(
        "path",
        {
            d: "M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10zM8 13.01l1.41 1.41L11 12.84V17h2v-4.16l1.59 1.59L16 13.01L12.01 9L8 13.01z",
            fill: "currentColor",
        },
        null,
        -1
    ),
    _c = [wc],
    Cc = ge({
        name: "DriveFolderUploadFilled",
        render: function (t, r) {
            return ue(), he("svg", xc, _c);
        },
    }),
    Sc = {
        xmlns: "http://www.w3.org/2000/svg",
        "xmlns:xlink": "http://www.w3.org/1999/xlink",
        viewBox: "0 0 512 512",
    },
    kc = fe(
        "path",
        {
            fill: "none",
            stroke: "currentColor",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "48",
            d: "M244 400L100 256l144-144",
        },
        null,
        -1
    ),
    Rc = fe(
        "path",
        {
            fill: "none",
            stroke: "currentColor",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "48",
            d: "M120 256h292",
        },
        null,
        -1
    ),
    Pc = [kc, Rc],
    Ec = ge({
        name: "ArrowBack",
        render: function (t, r) {
            return ue(), he("svg", Sc, Pc);
        },
    }),
    Tc = {
        xmlns: "http://www.w3.org/2000/svg",
        "xmlns:xlink": "http://www.w3.org/1999/xlink",
        viewBox: "0 0 512 512",
    },
    Oc = fe(
        "path",
        {
            fill: "none",
            stroke: "currentColor",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "48",
            d: "M268 112l144 144l-144 144",
        },
        null,
        -1
    ),
    zc = fe(
        "path",
        {
            fill: "none",
            stroke: "currentColor",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "48",
            d: "M392 256H100",
        },
        null,
        -1
    ),
    Ic = [Oc, zc],
    Dc = ge({
        name: "ArrowForward",
        render: function (t, r) {
            return ue(), he("svg", Tc, Ic);
        },
    }),
    Bc = {
        xmlns: "http://www.w3.org/2000/svg",
        "xmlns:xlink": "http://www.w3.org/1999/xlink",
        viewBox: "0 0 1024 1024",
    },
    $c = fe(
        "path",
        {
            d: "M391 240.9c-.8-6.6-8.9-9.4-13.6-4.7l-43.7 43.7L200 146.3a8.03 8.03 0 0 0-11.3 0l-42.4 42.3a8.03 8.03 0 0 0 0 11.3L280 333.6l-43.9 43.9a8.01 8.01 0 0 0 4.7 13.6L401 410c5.1.6 9.5-3.7 8.9-8.9L391 240.9zm10.1 373.2L240.8 633c-6.6.8-9.4 8.9-4.7 13.6l43.9 43.9L146.3 824a8.03 8.03 0 0 0 0 11.3l42.4 42.3c3.1 3.1 8.2 3.1 11.3 0L333.7 744l43.7 43.7A8.01 8.01 0 0 0 391 783l18.9-160.1c.6-5.1-3.7-9.4-8.8-8.8zm221.8-204.2L783.2 391c6.6-.8 9.4-8.9 4.7-13.6L744 333.6L877.7 200c3.1-3.1 3.1-8.2 0-11.3l-42.4-42.3a8.03 8.03 0 0 0-11.3 0L690.3 279.9l-43.7-43.7a8.01 8.01 0 0 0-13.6 4.7L614.1 401c-.6 5.2 3.7 9.5 8.8 8.9zM744 690.4l43.9-43.9a8.01 8.01 0 0 0-4.7-13.6L623 614c-5.1-.6-9.5 3.7-8.9 8.9L633 783.1c.8 6.6 8.9 9.4 13.6 4.7l43.7-43.7L824 877.7c3.1 3.1 8.2 3.1 11.3 0l42.4-42.3c3.1-3.1 3.1-8.2 0-11.3L744 690.4z",
            fill: "currentColor",
        },
        null,
        -1
    ),
    Ac = [$c],
    Fc = ge({
        name: "FullscreenExitOutlined",
        render: function (t, r) {
            return ue(), he("svg", Bc, Ac);
        },
    }),
    jc = {
        xmlns: "http://www.w3.org/2000/svg",
        "xmlns:xlink": "http://www.w3.org/1999/xlink",
        viewBox: "0 0 1024 1024",
    },
    Mc = fe(
        "path",
        {
            d: "M290 236.4l43.9-43.9a8.01 8.01 0 0 0-4.7-13.6L169 160c-5.1-.6-9.5 3.7-8.9 8.9L179 329.1c.8 6.6 8.9 9.4 13.6 4.7l43.7-43.7L370 423.7c3.1 3.1 8.2 3.1 11.3 0l42.4-42.3c3.1-3.1 3.1-8.2 0-11.3L290 236.4zm352.7 187.3c3.1 3.1 8.2 3.1 11.3 0l133.7-133.6l43.7 43.7a8.01 8.01 0 0 0 13.6-4.7L863.9 169c.6-5.1-3.7-9.5-8.9-8.9L694.8 179c-6.6.8-9.4 8.9-4.7 13.6l43.9 43.9L600.3 370a8.03 8.03 0 0 0 0 11.3l42.4 42.4zM845 694.9c-.8-6.6-8.9-9.4-13.6-4.7l-43.7 43.7L654 600.3a8.03 8.03 0 0 0-11.3 0l-42.4 42.3a8.03 8.03 0 0 0 0 11.3L734 787.6l-43.9 43.9a8.01 8.01 0 0 0 4.7 13.6L855 864c5.1.6 9.5-3.7 8.9-8.9L845 694.9zm-463.7-94.6a8.03 8.03 0 0 0-11.3 0L236.3 733.9l-43.7-43.7a8.01 8.01 0 0 0-13.6 4.7L160.1 855c-.6 5.1 3.7 9.5 8.9 8.9L329.2 845c6.6-.8 9.4-8.9 4.7-13.6L290 787.6L423.7 654c3.1-3.1 3.1-8.2 0-11.3l-42.4-42.4z",
            fill: "currentColor",
        },
        null,
        -1
    ),
    Kc = [Mc],
    Hc = ge({
        name: "FullscreenOutlined",
        render: function (t, r) {
            return ue(), he("svg", jc, Kc);
        },
    }),
    fs = (e) => (Gs("data-v-7bc51657"), (e = e()), Ys(), e),
    Nc = { class: "pageWrapper" },
    Lc = { class: "header" },
    Vc = fs(() => fe("img", { class: "logo", src: mu, alt: "" }, null, -1)),
    Wc = fs(() =>
        fe(
            "label",
            {
                for: "fileInput",
                class: "fileInputLabel",
                style: { cursor: "pointer" },
            },
            null,
            -1
        )
    ),
    Uc = { key: 0, class: "arrows" },
    qc = { key: 0, class: "modes" },
    Gc = { key: 0 },
    Yc = { key: 1 },
    Xc = { key: 2, class: "fallbackTxt" },
    Zc = ["src"],
    Qc = { class: "custom-arrow" },
    Jc = ["onClick"],
    ed = ["onClick"],
    td = { class: "custom-dots" },
    rd = ["onClick"],
    nd = ge({
        __name: "index",
        setup(e) {
            const t = Q(!1),
                r = K(() => n.value.length > 0),
                n = Q([]),
                o = Q(0),
                i = Q(),
                s = Q([]),
                l = [
                    { value: "fitfull", label: "Fit entire" },
                    { value: "fitvert", label: "Fit vertically" },
                    { value: "fithor", label: "Fit horizontally" },
                    { value: "fitsquare", label: "Fit squared" },
                ],
                a = Q("fitfull");
            function h() {
                t.value = !t.value;
            }
            it([a, t, o], () => {
                u();
            }),
                er(async () => {
                    Pu(i, (v) => {
                        Cu(() => u, 150);
                    });
                    const m = (await qe.imageFile.count()) == 0;
                    if ((console.log("indexeddbEmpty: ", m), !m)) {
                        const p = (await qe.imageFile.toArray()).map((y) =>
                            URL.createObjectURL(y)
                        );
                        (n.value = p), u();
                    }
                });
            async function u() {
                if (!r.value || !t.value) return;
                const m = new Image();
                (m.src = n.value[o.value]),
                    await Br(),
                    console.log(i.value),
                    await new Promise((c) => (m.onload = c));
                const { width: v, height: p } = i.value.getBoundingClientRect(),
                    y = m.width,
                    C = m.height;
                (i.value.width = v), (i.value.height = p);
                const S = v / p,
                    R = y / C;
                switch (
                    (i.value.getContext("2d").clearRect(0, 0, v, p), a.value)
                ) {
                    case "fitfull":
                        {
                            let c,
                                _,
                                w = 0,
                                T = 0;
                            S > R
                                ? ((_ = p),
                                  (c = p * R),
                                  (w = Math.abs((v - c) / 2)))
                                : ((c = v),
                                  (_ = v / R),
                                  (T = Math.abs((p - _) / 2))),
                                i.value
                                    .getContext("2d")
                                    .drawImage(m, w, T, c, _);
                        }
                        break;
                    case "fithor":
                        {
                            const c = v,
                                _ = v / R;
                            let w = 0,
                                T = (p - _) / 2;
                            i.value.getContext("2d").drawImage(m, w, T, c, _);
                        }
                        break;
                    case "fitvert":
                        {
                            const c = p * R,
                                _ = p;
                            let w = (v - c) / 2,
                                T = 0;
                            i.value.getContext("2d").drawImage(m, w, T, c, _);
                        }
                        break;
                    case "fitsquare":
                        {
                            const c = v > p ? p : v,
                                _ = v > p ? "height" : "width";
                            let w = _ == "width" ? 0 : (v - c) / 2,
                                T = _ == "height" ? 0 : (p - c) / 2;
                            i.value.getContext("2d").drawImage(m, w, T, c, c);
                        }
                        break;
                }
            }
            async function d(m) {
                console.log("File input changed");
                const v = m.target;
                if ((console.log(155), !v.files)) return;
                const p = [...v.files].filter(
                    (y) => y.type === "image/jpeg" || y.type === "image/png"
                );
                console.log(162, p);
                try {
                    console.log(
                        164,
                        "indexeddb: ",
                        await qe.imageFile.toArray(),
                        "files: ",
                        p
                    ),
                        await qe.imageFile.clear(),
                        console.log(
                            166,
                            "indexeddb: ",
                            await qe.imageFile.toArray(),
                            "files: ",
                            p
                        ),
                        await qe.imageFile.bulkAdd(p),
                        console.log(
                            168,
                            "indexeddb: ",
                            await qe.imageFile.toArray(),
                            "files: ",
                            p
                        ),
                        p.forEach((y) => {
                            const C = URL.createObjectURL(y);
                            n.value.push(C);
                        }),
                        await u();
                } catch (y) {
                    console.group("Error happened"),
                        console.log("error: ", y),
                        console.groupEnd();
                }
            }
            async function f(m) {
                console.log("File input clicked");
            }
            async function b() {
                console.group("Files in Indexeddb:"),
                    console.log(await qe.imageFile.toArray()),
                    console.groupEnd();
            }
            function x(m) {
                m == "left" &&
                    (o.value > 0 ? o.value-- : (o.value = n.value.length - 1)),
                    m == "right" &&
                        (o.value < n.value.length - 1
                            ? o.value++
                            : (o.value = 0));
            }
            function g(m) {
                o.value = m;
            }
            return (m, v) => (
                ue(),
                he("div", Nc, [
                    fe("header", Lc, [
                        Vc,
                        me(
                            Y(fn),
                            { "icon-placement": "left", type: "primary" },
                            {
                                icon: ye(() => [
                                    me(Y(vr), null, {
                                        default: ye(() => [me(Y(Cc))]),
                                        _: 1,
                                    }),
                                ]),
                                default: ye(() => [
                                    _n(" Upload "),
                                    Wc,
                                    fe(
                                        "input",
                                        {
                                            type: "file",
                                            ref: "inputRef",
                                            id: "fileInput",
                                            multiple: "true",
                                            webkitdirectory: "true",
                                            accept: "image/png, image/jpeg",
                                            onChange: d,
                                            onClick: f,
                                        },
                                        null,
                                        544
                                    ),
                                ]),
                                _: 1,
                            }
                        ),
                        me(
                            Y(fn),
                            { type: "primary", onClick: b },
                            {
                                default: ye(() => [
                                    _n(
                                        " Console.log all files from indexeddb "
                                    ),
                                ]),
                                _: 1,
                            }
                        ),
                        me(
                            Y(fn),
                            { ghost: "", type: "primary", onClick: h },
                            {
                                default: ye(() => [
                                    me(Y(vr), null, {
                                        default: ye(() => [
                                            Y(t)
                                                ? Ee("", !0)
                                                : (ue(), ln(Y(Hc), { key: 0 })),
                                            Y(t)
                                                ? (ue(), ln(Y(Fc), { key: 1 }))
                                                : Ee("", !0),
                                        ]),
                                        _: 1,
                                    }),
                                ]),
                                _: 1,
                            }
                        ),
                    ]),
                    fe("main", null, [
                        me(Cr, null, {
                            default: ye(() => [
                                Y(t)
                                    ? (ue(),
                                      he(
                                          "canvas",
                                          {
                                              key: 0,
                                              ref_key: "canvasRef",
                                              ref: i,
                                          },
                                          null,
                                          512
                                      ))
                                    : Ee("", !0),
                            ]),
                            _: 1,
                        }),
                        me(Cr, null, {
                            default: ye(() => [
                                Y(t) && Y(r)
                                    ? (ue(),
                                      he("div", Uc, [
                                          fe(
                                              "div",
                                              {
                                                  class: "arrows__item",
                                                  onClick:
                                                      v[0] ||
                                                      (v[0] = (p) => x("left")),
                                              },
                                              " ⬅️ "
                                          ),
                                          fe(
                                              "div",
                                              {
                                                  class: "arrows__item",
                                                  onClick:
                                                      v[1] ||
                                                      (v[1] = (p) =>
                                                          x("right")),
                                              },
                                              " ➡️ "
                                          ),
                                      ]))
                                    : Ee("", !0),
                            ]),
                            _: 1,
                        }),
                        me(Cr, null, {
                            default: ye(() => [
                                Y(t)
                                    ? (ue(),
                                      he("div", qc, [
                                          me(
                                              Y(du),
                                              {
                                                  name: "radiobuttongroup1",
                                                  value: Y(a),
                                                  "onUpdate:value":
                                                      v[2] ||
                                                      (v[2] = (p) =>
                                                          qs(a)
                                                              ? (a.value = p)
                                                              : null),
                                              },
                                              {
                                                  default: ye(() => [
                                                      (ue(),
                                                      he(
                                                          Mt,
                                                          null,
                                                          un(
                                                              l,
                                                              ({
                                                                  label: p,
                                                                  value: y,
                                                              }) =>
                                                                  me(
                                                                      Y(fu),
                                                                      {
                                                                          value: y,
                                                                          label: p,
                                                                      },
                                                                      null,
                                                                      8,
                                                                      [
                                                                          "value",
                                                                          "label",
                                                                      ]
                                                                  )
                                                          ),
                                                          64
                                                      )),
                                                  ]),
                                                  _: 1,
                                              },
                                              8,
                                              ["value"]
                                          ),
                                      ]))
                                    : Ee("", !0),
                            ]),
                            _: 1,
                        }),
                        Y(r)
                            ? Ee("", !0)
                            : (ue(), he("h1", Gc, " Новый диск тестовое ")),
                        Y(r) && !Y(t)
                            ? (ue(), he("h1", Yc, " Preview mode "))
                            : Ee("", !0),
                        Y(r)
                            ? Ee("", !0)
                            : (ue(),
                              he("p", Xc, " Upload some images first! ")),
                        Y(r) && !Y(t)
                            ? (ue(),
                              ln(
                                  Y(eu),
                                  {
                                      key: 3,
                                      "onUpdate:currentIndex":
                                          v[3] || (v[3] = (p) => (o.value = p)),
                                      "current-index": Y(o),
                                      class: "carousel",
                                      direction: "horizontal",
                                      "show-arrow": !0,
                                      draggable: "",
                                      "dot-type": "dot",
                                      "dot-placement": "bottom",
                                      effect: "card",
                                      "centered-slides": !0,
                                      style: { height: "200px" },
                                      onUpdateCurrentIndex: g,
                                  },
                                  {
                                      arrow: ye(({ prev: p, next: y }) => [
                                          fe("div", Qc, [
                                              fe(
                                                  "button",
                                                  {
                                                      type: "button",
                                                      class: "custom-arrow--left",
                                                      onClick: p,
                                                  },
                                                  [
                                                      me(Y(vr), null, {
                                                          default: ye(() => [
                                                              me(Y(Ec)),
                                                          ]),
                                                          _: 1,
                                                      }),
                                                  ],
                                                  8,
                                                  Jc
                                              ),
                                              fe(
                                                  "button",
                                                  {
                                                      type: "button",
                                                      class: "custom-arrow--right",
                                                      onClick: y,
                                                  },
                                                  [
                                                      me(Y(vr), null, {
                                                          default: ye(() => [
                                                              me(Y(Dc)),
                                                          ]),
                                                          _: 1,
                                                      }),
                                                  ],
                                                  8,
                                                  ed
                                              ),
                                          ]),
                                      ]),
                                      dots: ye(
                                          ({
                                              total: p,
                                              currentIndex: y,
                                              to: C,
                                          }) => [
                                              fe("ul", td, [
                                                  (ue(!0),
                                                  he(
                                                      Mt,
                                                      null,
                                                      un(
                                                          p,
                                                          (S) => (
                                                              ue(),
                                                              he(
                                                                  "li",
                                                                  {
                                                                      key: S,
                                                                      class: Xs(
                                                                          {
                                                                              "is-active":
                                                                                  y ===
                                                                                  S -
                                                                                      1,
                                                                          }
                                                                      ),
                                                                      onClick: (
                                                                          R
                                                                      ) =>
                                                                          C(
                                                                              S -
                                                                                  1
                                                                          ),
                                                                  },
                                                                  null,
                                                                  10,
                                                                  rd
                                                              )
                                                          )
                                                      ),
                                                      128
                                                  )),
                                              ]),
                                          ]
                                      ),
                                      default: ye(() => [
                                          Y(t)
                                              ? Ee("", !0)
                                              : (ue(!0),
                                                he(
                                                    Mt,
                                                    { key: 0 },
                                                    un(
                                                        Y(n),
                                                        (p, y) => (
                                                            ue(),
                                                            he(
                                                                "img",
                                                                {
                                                                    key: y,
                                                                    src: p,
                                                                    alt: "",
                                                                    ref_for: !0,
                                                                    ref_key:
                                                                        "userimagesRef",
                                                                    ref: s,
                                                                    class: "carousel-img",
                                                                },
                                                                null,
                                                                8,
                                                                Zc
                                                            )
                                                        )
                                                    ),
                                                    128
                                                )),
                                      ]),
                                      _: 1,
                                  },
                                  8,
                                  ["current-index"]
                              ))
                            : Ee("", !0),
                    ]),
                ])
            );
        },
    });
const ad = Zs(nd, [["__scopeId", "data-v-7bc51657"]]);
export { ad as default };
