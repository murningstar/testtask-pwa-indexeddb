var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { v as createTextVNode, F as Fragment, C as Comment, z as isVNode, A as watch, c as computed, d as defineComponent, B as getCurrentInstance, o as onMounted, b as onBeforeUnmount, D as renderSlot, E as inject, G as provide, H as createInjectionKey, I as upperFirst, J as toString, K as cB, L as useStyle, M as toRef, r as ref, N as nextTick, e as h$1, O as c$1, P as commonVariables$2, Q as composite, R as commonLight, S as cM, T as cE, U as cNotM, V as iconSwitchTransition, W as useTheme, X as useMemo, Y as useConfig, Z as useRtl, _ as createKey, $ as changeColor, a0 as useThemeClass, a1 as NFadeInExpandTransition, a2 as NIconSwitchTransition, a3 as NBaseLoading, a4 as cloneVNode, a5 as throwError, a6 as onBeforeUpdate, a7 as indexMap, a8 as watchEffect, a9 as onUpdated, aa as withDirectives, ab as vShow, ac as Transition, ad as normalizeStyle, ae as warn$1, af as mergeProps, ag as unref, ah as getCurrentScope, ai as onScopeDispose, k as openBlock, l as createElementBlock, m as createBaseVNode, q as createVNode, s as withCtx, aj as createCommentVNode, ak as createBlock, al as isRef, am as renderList, x as pushScopeId, y as popScopeId, an as normalizeClass } from "./entry.1de5eede.js";
import { _ as _export_sfc } from "./plugin-vueexport-helper.cc2b3d55.js";
function getPreciseEventTarget(event) {
  return event.composedPath()[0] || null;
}
function getSlot(instance, slotName = "default", fallback = []) {
  const slots = instance.$slots;
  const slot = slots[slotName];
  if (slot === void 0)
    return fallback;
  return slot();
}
function keep(object, keys = [], rest) {
  const keepedObject = {};
  keys.forEach((key) => {
    keepedObject[key] = object[key];
  });
  return Object.assign(keepedObject, rest);
}
function flatten(vNodes, filterCommentNode = true, result = []) {
  vNodes.forEach((vNode) => {
    if (vNode === null)
      return;
    if (typeof vNode !== "object") {
      if (typeof vNode === "string" || typeof vNode === "number") {
        result.push(createTextVNode(String(vNode)));
      }
      return;
    }
    if (Array.isArray(vNode)) {
      flatten(vNode, filterCommentNode, result);
      return;
    }
    if (vNode.type === Fragment) {
      if (vNode.children === null)
        return;
      if (Array.isArray(vNode.children)) {
        flatten(vNode.children, filterCommentNode, result);
      }
    } else if (vNode.type !== Comment) {
      result.push(vNode);
    }
  });
  return result;
}
function call(funcs, ...args) {
  if (Array.isArray(funcs)) {
    funcs.forEach((func) => call(func, ...args));
  } else
    return funcs(...args);
}
function ensureValidVNode(vnodes) {
  return vnodes.some((child) => {
    if (!isVNode(child)) {
      return true;
    }
    if (child.type === Comment) {
      return false;
    }
    if (child.type === Fragment && !ensureValidVNode(child.children)) {
      return false;
    }
    return true;
  }) ? vnodes : null;
}
function resolveSlotWithProps(slot, props, fallback) {
  return slot && ensureValidVNode(slot(props)) || fallback(props);
}
function resolveWrappedSlot(slot, wrapper) {
  const children = slot && ensureValidVNode(slot());
  return wrapper(children || null);
}
function isSlotEmpty(slot) {
  return !(slot && ensureValidVNode(slot()));
}
const pureNumberRegex = /^(\d|\.)+$/;
const numberRegex = /(\d|\.)+/;
function formatLength(length, { c: c2 = 1, offset = 0, attachPx = true } = {}) {
  if (typeof length === "number") {
    const result = (length + offset) * c2;
    if (result === 0)
      return "0";
    return `${result}px`;
  } else if (typeof length === "string") {
    if (pureNumberRegex.test(length)) {
      const result = (Number(length) + offset) * c2;
      if (attachPx) {
        if (result === 0)
          return "0";
        return `${result}px`;
      } else {
        return `${result}`;
      }
    } else {
      const result = numberRegex.exec(length);
      if (!result)
        return length;
      return length.replace(numberRegex, String((Number(result[0]) + offset) * c2));
    }
  }
  return length;
}
function color2Class(color) {
  return color.replace(/#|\(|\)|,|\s/g, "_");
}
const isBrowser = typeof document !== "undefined" && typeof window !== "undefined";
function getEventTarget(e2) {
  const path = e2.composedPath();
  return path[0];
}
const traps = {
  mousemoveoutside: /* @__PURE__ */ new WeakMap(),
  clickoutside: /* @__PURE__ */ new WeakMap()
};
function createTrapHandler(name, el, originalHandler) {
  if (name === "mousemoveoutside") {
    const moveHandler = (e2) => {
      if (el.contains(getEventTarget(e2)))
        return;
      originalHandler(e2);
    };
    return {
      mousemove: moveHandler,
      touchstart: moveHandler
    };
  } else if (name === "clickoutside") {
    let mouseDownOutside = false;
    const downHandler = (e2) => {
      mouseDownOutside = !el.contains(getEventTarget(e2));
    };
    const upHanlder = (e2) => {
      if (!mouseDownOutside)
        return;
      if (el.contains(getEventTarget(e2)))
        return;
      originalHandler(e2);
    };
    return {
      mousedown: downHandler,
      mouseup: upHanlder,
      touchstart: downHandler,
      touchend: upHanlder
    };
  }
  console.error(
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    `[evtd/create-trap-handler]: name \`${name}\` is invalid. This could be a bug of evtd.`
  );
  return {};
}
function ensureTrapHandlers(name, el, handler) {
  const handlers = traps[name];
  let elHandlers = handlers.get(el);
  if (elHandlers === void 0) {
    handlers.set(el, elHandlers = /* @__PURE__ */ new WeakMap());
  }
  let trapHandler = elHandlers.get(handler);
  if (trapHandler === void 0) {
    elHandlers.set(handler, trapHandler = createTrapHandler(name, el, handler));
  }
  return trapHandler;
}
function trapOn(name, el, handler, options) {
  if (name === "mousemoveoutside" || name === "clickoutside") {
    const trapHandlers = ensureTrapHandlers(name, el, handler);
    Object.keys(trapHandlers).forEach((key) => {
      on$1(key, document, trapHandlers[key], options);
    });
    return true;
  }
  return false;
}
function trapOff(name, el, handler, options) {
  if (name === "mousemoveoutside" || name === "clickoutside") {
    const trapHandlers = ensureTrapHandlers(name, el, handler);
    Object.keys(trapHandlers).forEach((key) => {
      off(key, document, trapHandlers[key], options);
    });
    return true;
  }
  return false;
}
function createDelegate() {
  if (typeof window === "undefined") {
    return {
      on: () => {
      },
      off: () => {
      }
    };
  }
  const propagationStopped = /* @__PURE__ */ new WeakMap();
  const immediatePropagationStopped = /* @__PURE__ */ new WeakMap();
  function trackPropagation() {
    propagationStopped.set(this, true);
  }
  function trackImmediate() {
    propagationStopped.set(this, true);
    immediatePropagationStopped.set(this, true);
  }
  function spy(event, propName, fn2) {
    const source = event[propName];
    event[propName] = function() {
      fn2.apply(event, arguments);
      return source.apply(event, arguments);
    };
    return event;
  }
  function unspy(event, propName) {
    event[propName] = Event.prototype[propName];
  }
  const currentTargets = /* @__PURE__ */ new WeakMap();
  const currentTargetDescriptor = Object.getOwnPropertyDescriptor(Event.prototype, "currentTarget");
  function getCurrentTarget() {
    var _a;
    return (_a = currentTargets.get(this)) !== null && _a !== void 0 ? _a : null;
  }
  function defineCurrentTarget(event, getter) {
    if (currentTargetDescriptor === void 0)
      return;
    Object.defineProperty(event, "currentTarget", {
      configurable: true,
      enumerable: true,
      get: getter !== null && getter !== void 0 ? getter : currentTargetDescriptor.get
    });
  }
  const phaseToTypeToElToHandlers = {
    bubble: {},
    capture: {}
  };
  const typeToWindowEventHandlers = {};
  function createUnifiedHandler() {
    const delegeteHandler = function(e2) {
      const { type, eventPhase, bubbles } = e2;
      const target = getEventTarget(e2);
      if (eventPhase === 2)
        return;
      const phase = eventPhase === 1 ? "capture" : "bubble";
      let cursor = target;
      const path = [];
      while (true) {
        if (cursor === null)
          cursor = window;
        path.push(cursor);
        if (cursor === window) {
          break;
        }
        cursor = cursor.parentNode || null;
      }
      const captureElToHandlers = phaseToTypeToElToHandlers.capture[type];
      const bubbleElToHandlers = phaseToTypeToElToHandlers.bubble[type];
      spy(e2, "stopPropagation", trackPropagation);
      spy(e2, "stopImmediatePropagation", trackImmediate);
      defineCurrentTarget(e2, getCurrentTarget);
      if (phase === "capture") {
        if (captureElToHandlers === void 0)
          return;
        for (let i2 = path.length - 1; i2 >= 0; --i2) {
          if (propagationStopped.has(e2))
            break;
          const target2 = path[i2];
          const handlers = captureElToHandlers.get(target2);
          if (handlers !== void 0) {
            currentTargets.set(e2, target2);
            for (const handler of handlers) {
              if (immediatePropagationStopped.has(e2))
                break;
              handler(e2);
            }
          }
          if (i2 === 0 && !bubbles && bubbleElToHandlers !== void 0) {
            const bubbleHandlers = bubbleElToHandlers.get(target2);
            if (bubbleHandlers !== void 0) {
              for (const handler of bubbleHandlers) {
                if (immediatePropagationStopped.has(e2))
                  break;
                handler(e2);
              }
            }
          }
        }
      } else if (phase === "bubble") {
        if (bubbleElToHandlers === void 0)
          return;
        for (let i2 = 0; i2 < path.length; ++i2) {
          if (propagationStopped.has(e2))
            break;
          const target2 = path[i2];
          const handlers = bubbleElToHandlers.get(target2);
          if (handlers !== void 0) {
            currentTargets.set(e2, target2);
            for (const handler of handlers) {
              if (immediatePropagationStopped.has(e2))
                break;
              handler(e2);
            }
          }
        }
      }
      unspy(e2, "stopPropagation");
      unspy(e2, "stopImmediatePropagation");
      defineCurrentTarget(e2);
    };
    delegeteHandler.displayName = "evtdUnifiedHandler";
    return delegeteHandler;
  }
  function createUnifiedWindowEventHandler() {
    const delegateHandler = function(e2) {
      const { type, eventPhase } = e2;
      if (eventPhase !== 2)
        return;
      const handlers = typeToWindowEventHandlers[type];
      if (handlers === void 0)
        return;
      handlers.forEach((handler) => handler(e2));
    };
    delegateHandler.displayName = "evtdUnifiedWindowEventHandler";
    return delegateHandler;
  }
  const unifiedHandler = createUnifiedHandler();
  const unfiendWindowEventHandler = createUnifiedWindowEventHandler();
  function ensureElToHandlers(phase, type) {
    const phaseHandlers = phaseToTypeToElToHandlers[phase];
    if (phaseHandlers[type] === void 0) {
      phaseHandlers[type] = /* @__PURE__ */ new Map();
      window.addEventListener(type, unifiedHandler, phase === "capture");
    }
    return phaseHandlers[type];
  }
  function ensureWindowEventHandlers(type) {
    const windowEventHandlers = typeToWindowEventHandlers[type];
    if (windowEventHandlers === void 0) {
      typeToWindowEventHandlers[type] = /* @__PURE__ */ new Set();
      window.addEventListener(type, unfiendWindowEventHandler);
    }
    return typeToWindowEventHandlers[type];
  }
  function ensureHandlers(elToHandlers, el) {
    let elHandlers = elToHandlers.get(el);
    if (elHandlers === void 0) {
      elToHandlers.set(el, elHandlers = /* @__PURE__ */ new Set());
    }
    return elHandlers;
  }
  function handlerExist(el, phase, type, handler) {
    const elToHandlers = phaseToTypeToElToHandlers[phase][type];
    if (elToHandlers !== void 0) {
      const handlers = elToHandlers.get(el);
      if (handlers !== void 0) {
        if (handlers.has(handler))
          return true;
      }
    }
    return false;
  }
  function windowEventHandlerExist(type, handler) {
    const handlers = typeToWindowEventHandlers[type];
    if (handlers !== void 0) {
      if (handlers.has(handler)) {
        return true;
      }
    }
    return false;
  }
  function on2(type, el, handler, options) {
    let mergedHandler;
    if (typeof options === "object" && options.once === true) {
      mergedHandler = (e2) => {
        off2(type, el, mergedHandler, options);
        handler(e2);
      };
    } else {
      mergedHandler = handler;
    }
    const trapped = trapOn(type, el, mergedHandler, options);
    if (trapped)
      return;
    const phase = options === true || typeof options === "object" && options.capture === true ? "capture" : "bubble";
    const elToHandlers = ensureElToHandlers(phase, type);
    const handlers = ensureHandlers(elToHandlers, el);
    if (!handlers.has(mergedHandler))
      handlers.add(mergedHandler);
    if (el === window) {
      const windowEventHandlers = ensureWindowEventHandlers(type);
      if (!windowEventHandlers.has(mergedHandler)) {
        windowEventHandlers.add(mergedHandler);
      }
    }
  }
  function off2(type, el, handler, options) {
    const trapped = trapOff(type, el, handler, options);
    if (trapped)
      return;
    const capture = options === true || typeof options === "object" && options.capture === true;
    const phase = capture ? "capture" : "bubble";
    const elToHandlers = ensureElToHandlers(phase, type);
    const handlers = ensureHandlers(elToHandlers, el);
    if (el === window) {
      const mirrorPhase = capture ? "bubble" : "capture";
      if (!handlerExist(el, mirrorPhase, type, handler) && windowEventHandlerExist(type, handler)) {
        const windowEventHandlers = typeToWindowEventHandlers[type];
        windowEventHandlers.delete(handler);
        if (windowEventHandlers.size === 0) {
          window.removeEventListener(type, unfiendWindowEventHandler);
          typeToWindowEventHandlers[type] = void 0;
        }
      }
    }
    if (handlers.has(handler))
      handlers.delete(handler);
    if (handlers.size === 0) {
      elToHandlers.delete(el);
    }
    if (elToHandlers.size === 0) {
      window.removeEventListener(type, unifiedHandler, phase === "capture");
      phaseToTypeToElToHandlers[phase][type] = void 0;
    }
  }
  return {
    on: on2,
    off: off2
  };
}
const { on: on$1, off } = createDelegate();
function useMergedState(controlledStateRef, uncontrolledStateRef) {
  watch(controlledStateRef, (value) => {
    if (value !== void 0) {
      uncontrolledStateRef.value = value;
    }
  });
  return computed(() => {
    if (controlledStateRef.value === void 0) {
      return uncontrolledStateRef.value;
    }
    return controlledStateRef.value;
  });
}
function warn(location2, message) {
  console.error(`[vueuc/${location2}]: ${message}`);
}
var resizeObservers = [];
var hasActiveObservations = function() {
  return resizeObservers.some(function(ro) {
    return ro.activeTargets.length > 0;
  });
};
var hasSkippedObservations = function() {
  return resizeObservers.some(function(ro) {
    return ro.skippedTargets.length > 0;
  });
};
var msg = "ResizeObserver loop completed with undelivered notifications.";
var deliverResizeLoopError = function() {
  var event;
  if (typeof ErrorEvent === "function") {
    event = new ErrorEvent("error", {
      message: msg
    });
  } else {
    event = document.createEvent("Event");
    event.initEvent("error", false, false);
    event.message = msg;
  }
  window.dispatchEvent(event);
};
var ResizeObserverBoxOptions;
(function(ResizeObserverBoxOptions2) {
  ResizeObserverBoxOptions2["BORDER_BOX"] = "border-box";
  ResizeObserverBoxOptions2["CONTENT_BOX"] = "content-box";
  ResizeObserverBoxOptions2["DEVICE_PIXEL_CONTENT_BOX"] = "device-pixel-content-box";
})(ResizeObserverBoxOptions || (ResizeObserverBoxOptions = {}));
var freeze = function(obj) {
  return Object.freeze(obj);
};
var ResizeObserverSize = function() {
  function ResizeObserverSize2(inlineSize, blockSize) {
    this.inlineSize = inlineSize;
    this.blockSize = blockSize;
    freeze(this);
  }
  return ResizeObserverSize2;
}();
var DOMRectReadOnly = function() {
  function DOMRectReadOnly2(x2, y2, width, height) {
    this.x = x2;
    this.y = y2;
    this.width = width;
    this.height = height;
    this.top = this.y;
    this.left = this.x;
    this.bottom = this.top + this.height;
    this.right = this.left + this.width;
    return freeze(this);
  }
  DOMRectReadOnly2.prototype.toJSON = function() {
    var _a = this, x2 = _a.x, y2 = _a.y, top = _a.top, right = _a.right, bottom = _a.bottom, left = _a.left, width = _a.width, height = _a.height;
    return { x: x2, y: y2, top, right, bottom, left, width, height };
  };
  DOMRectReadOnly2.fromRect = function(rectangle) {
    return new DOMRectReadOnly2(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
  };
  return DOMRectReadOnly2;
}();
var isSVG = function(target) {
  return target instanceof SVGElement && "getBBox" in target;
};
var isHidden = function(target) {
  if (isSVG(target)) {
    var _a = target.getBBox(), width = _a.width, height = _a.height;
    return !width && !height;
  }
  var _b = target, offsetWidth = _b.offsetWidth, offsetHeight = _b.offsetHeight;
  return !(offsetWidth || offsetHeight || target.getClientRects().length);
};
var isElement = function(obj) {
  var _a;
  if (obj instanceof Element) {
    return true;
  }
  var scope = (_a = obj === null || obj === void 0 ? void 0 : obj.ownerDocument) === null || _a === void 0 ? void 0 : _a.defaultView;
  return !!(scope && obj instanceof scope.Element);
};
var isReplacedElement = function(target) {
  switch (target.tagName) {
    case "INPUT":
      if (target.type !== "image") {
        break;
      }
    case "VIDEO":
    case "AUDIO":
    case "EMBED":
    case "OBJECT":
    case "CANVAS":
    case "IFRAME":
    case "IMG":
      return true;
  }
  return false;
};
var global$1 = typeof window !== "undefined" ? window : {};
var cache = /* @__PURE__ */ new WeakMap();
var scrollRegexp = /auto|scroll/;
var verticalRegexp = /^tb|vertical/;
var IE = /msie|trident/i.test(globalThis.navigator && global$1.navigator.userAgent);
var parseDimension = function(pixel) {
  return parseFloat(pixel || "0");
};
var size = function(inlineSize, blockSize, switchSizes) {
  if (inlineSize === void 0) {
    inlineSize = 0;
  }
  if (blockSize === void 0) {
    blockSize = 0;
  }
  if (switchSizes === void 0) {
    switchSizes = false;
  }
  return new ResizeObserverSize((switchSizes ? blockSize : inlineSize) || 0, (switchSizes ? inlineSize : blockSize) || 0);
};
var zeroBoxes = freeze({
  devicePixelContentBoxSize: size(),
  borderBoxSize: size(),
  contentBoxSize: size(),
  contentRect: new DOMRectReadOnly(0, 0, 0, 0)
});
var calculateBoxSizes = function(target, forceRecalculation) {
  if (forceRecalculation === void 0) {
    forceRecalculation = false;
  }
  if (cache.has(target) && !forceRecalculation) {
    return cache.get(target);
  }
  if (isHidden(target)) {
    cache.set(target, zeroBoxes);
    return zeroBoxes;
  }
  var cs = getComputedStyle(target);
  var svg = isSVG(target) && target.ownerSVGElement && target.getBBox();
  var removePadding = !IE && cs.boxSizing === "border-box";
  var switchSizes = verticalRegexp.test(cs.writingMode || "");
  var canScrollVertically = !svg && scrollRegexp.test(cs.overflowY || "");
  var canScrollHorizontally = !svg && scrollRegexp.test(cs.overflowX || "");
  var paddingTop = svg ? 0 : parseDimension(cs.paddingTop);
  var paddingRight = svg ? 0 : parseDimension(cs.paddingRight);
  var paddingBottom = svg ? 0 : parseDimension(cs.paddingBottom);
  var paddingLeft = svg ? 0 : parseDimension(cs.paddingLeft);
  var borderTop = svg ? 0 : parseDimension(cs.borderTopWidth);
  var borderRight = svg ? 0 : parseDimension(cs.borderRightWidth);
  var borderBottom = svg ? 0 : parseDimension(cs.borderBottomWidth);
  var borderLeft = svg ? 0 : parseDimension(cs.borderLeftWidth);
  var horizontalPadding = paddingLeft + paddingRight;
  var verticalPadding = paddingTop + paddingBottom;
  var horizontalBorderArea = borderLeft + borderRight;
  var verticalBorderArea = borderTop + borderBottom;
  var horizontalScrollbarThickness = !canScrollHorizontally ? 0 : target.offsetHeight - verticalBorderArea - target.clientHeight;
  var verticalScrollbarThickness = !canScrollVertically ? 0 : target.offsetWidth - horizontalBorderArea - target.clientWidth;
  var widthReduction = removePadding ? horizontalPadding + horizontalBorderArea : 0;
  var heightReduction = removePadding ? verticalPadding + verticalBorderArea : 0;
  var contentWidth = svg ? svg.width : parseDimension(cs.width) - widthReduction - verticalScrollbarThickness;
  var contentHeight = svg ? svg.height : parseDimension(cs.height) - heightReduction - horizontalScrollbarThickness;
  var borderBoxWidth = contentWidth + horizontalPadding + verticalScrollbarThickness + horizontalBorderArea;
  var borderBoxHeight = contentHeight + verticalPadding + horizontalScrollbarThickness + verticalBorderArea;
  var boxes = freeze({
    devicePixelContentBoxSize: size(Math.round(contentWidth * devicePixelRatio), Math.round(contentHeight * devicePixelRatio), switchSizes),
    borderBoxSize: size(borderBoxWidth, borderBoxHeight, switchSizes),
    contentBoxSize: size(contentWidth, contentHeight, switchSizes),
    contentRect: new DOMRectReadOnly(paddingLeft, paddingTop, contentWidth, contentHeight)
  });
  cache.set(target, boxes);
  return boxes;
};
var calculateBoxSize = function(target, observedBox, forceRecalculation) {
  var _a = calculateBoxSizes(target, forceRecalculation), borderBoxSize = _a.borderBoxSize, contentBoxSize = _a.contentBoxSize, devicePixelContentBoxSize = _a.devicePixelContentBoxSize;
  switch (observedBox) {
    case ResizeObserverBoxOptions.DEVICE_PIXEL_CONTENT_BOX:
      return devicePixelContentBoxSize;
    case ResizeObserverBoxOptions.BORDER_BOX:
      return borderBoxSize;
    default:
      return contentBoxSize;
  }
};
var ResizeObserverEntry = function() {
  function ResizeObserverEntry2(target) {
    var boxes = calculateBoxSizes(target);
    this.target = target;
    this.contentRect = boxes.contentRect;
    this.borderBoxSize = freeze([boxes.borderBoxSize]);
    this.contentBoxSize = freeze([boxes.contentBoxSize]);
    this.devicePixelContentBoxSize = freeze([boxes.devicePixelContentBoxSize]);
  }
  return ResizeObserverEntry2;
}();
var calculateDepthForNode = function(node) {
  if (isHidden(node)) {
    return Infinity;
  }
  var depth = 0;
  var parent = node.parentNode;
  while (parent) {
    depth += 1;
    parent = parent.parentNode;
  }
  return depth;
};
var broadcastActiveObservations = function() {
  var shallowestDepth = Infinity;
  var callbacks2 = [];
  resizeObservers.forEach(function processObserver(ro) {
    if (ro.activeTargets.length === 0) {
      return;
    }
    var entries = [];
    ro.activeTargets.forEach(function processTarget(ot2) {
      var entry = new ResizeObserverEntry(ot2.target);
      var targetDepth = calculateDepthForNode(ot2.target);
      entries.push(entry);
      ot2.lastReportedSize = calculateBoxSize(ot2.target, ot2.observedBox);
      if (targetDepth < shallowestDepth) {
        shallowestDepth = targetDepth;
      }
    });
    callbacks2.push(function resizeObserverCallback() {
      ro.callback.call(ro.observer, entries, ro.observer);
    });
    ro.activeTargets.splice(0, ro.activeTargets.length);
  });
  for (var _i = 0, callbacks_1 = callbacks2; _i < callbacks_1.length; _i++) {
    var callback = callbacks_1[_i];
    callback();
  }
  return shallowestDepth;
};
var gatherActiveObservationsAtDepth = function(depth) {
  resizeObservers.forEach(function processObserver(ro) {
    ro.activeTargets.splice(0, ro.activeTargets.length);
    ro.skippedTargets.splice(0, ro.skippedTargets.length);
    ro.observationTargets.forEach(function processTarget(ot2) {
      if (ot2.isActive()) {
        if (calculateDepthForNode(ot2.target) > depth) {
          ro.activeTargets.push(ot2);
        } else {
          ro.skippedTargets.push(ot2);
        }
      }
    });
  });
};
var process = function() {
  var depth = 0;
  gatherActiveObservationsAtDepth(depth);
  while (hasActiveObservations()) {
    depth = broadcastActiveObservations();
    gatherActiveObservationsAtDepth(depth);
  }
  if (hasSkippedObservations()) {
    deliverResizeLoopError();
  }
  return depth > 0;
};
var trigger;
var callbacks = [];
var notify = function() {
  return callbacks.splice(0).forEach(function(cb) {
    return cb();
  });
};
var queueMicroTask = function(callback) {
  if (!trigger) {
    var toggle_1 = 0;
    var el_1 = document.createTextNode("");
    var config = { characterData: true };
    new MutationObserver(function() {
      return notify();
    }).observe(el_1, config);
    trigger = function() {
      el_1.textContent = "".concat(toggle_1 ? toggle_1-- : toggle_1++);
    };
  }
  callbacks.push(callback);
  trigger();
};
var queueResizeObserver = function(cb) {
  queueMicroTask(function ResizeObserver2() {
    requestAnimationFrame(cb);
  });
};
var watching = 0;
var isWatching = function() {
  return !!watching;
};
var CATCH_PERIOD = 250;
var observerConfig = { attributes: true, characterData: true, childList: true, subtree: true };
var events = [
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
  "focus"
];
var time = function(timeout) {
  if (timeout === void 0) {
    timeout = 0;
  }
  return Date.now() + timeout;
};
var scheduled = false;
var Scheduler = function() {
  function Scheduler2() {
    var _this = this;
    this.stopped = true;
    this.listener = function() {
      return _this.schedule();
    };
  }
  Scheduler2.prototype.run = function(timeout) {
    var _this = this;
    if (timeout === void 0) {
      timeout = CATCH_PERIOD;
    }
    if (scheduled) {
      return;
    }
    scheduled = true;
    var until = time(timeout);
    queueResizeObserver(function() {
      var elementsHaveResized = false;
      try {
        elementsHaveResized = process();
      } finally {
        scheduled = false;
        timeout = until - time();
        if (!isWatching()) {
          return;
        }
        if (elementsHaveResized) {
          _this.run(1e3);
        } else if (timeout > 0) {
          _this.run(timeout);
        } else {
          _this.start();
        }
      }
    });
  };
  Scheduler2.prototype.schedule = function() {
    this.stop();
    this.run();
  };
  Scheduler2.prototype.observe = function() {
    var _this = this;
    var cb = function() {
      return _this.observer && _this.observer.observe(document.body, observerConfig);
    };
    document.body ? cb() : global$1.addEventListener("DOMContentLoaded", cb);
  };
  Scheduler2.prototype.start = function() {
    var _this = this;
    if (this.stopped) {
      this.stopped = false;
      this.observer = new MutationObserver(this.listener);
      this.observe();
      events.forEach(function(name) {
        return globalThis.addEventListener(name, _this.listener, true);
      });
    }
  };
  Scheduler2.prototype.stop = function() {
    var _this = this;
    if (!this.stopped) {
      this.observer && this.observer.disconnect();
      events.forEach(function(name) {
        return globalThis.removeEventListener(name, _this.listener, true);
      });
      this.stopped = true;
    }
  };
  return Scheduler2;
}();
var scheduler = new Scheduler();
var updateCount = function(n2) {
  !watching && n2 > 0 && scheduler.start();
  watching += n2;
  !watching && scheduler.stop();
};
var skipNotifyOnElement = function(target) {
  return !isSVG(target) && !isReplacedElement(target) && getComputedStyle(target).display === "inline";
};
var ResizeObservation = function() {
  function ResizeObservation2(target, observedBox) {
    this.target = target;
    this.observedBox = observedBox || ResizeObserverBoxOptions.CONTENT_BOX;
    this.lastReportedSize = {
      inlineSize: 0,
      blockSize: 0
    };
  }
  ResizeObservation2.prototype.isActive = function() {
    var size2 = calculateBoxSize(this.target, this.observedBox, true);
    if (skipNotifyOnElement(this.target)) {
      this.lastReportedSize = size2;
    }
    if (this.lastReportedSize.inlineSize !== size2.inlineSize || this.lastReportedSize.blockSize !== size2.blockSize) {
      return true;
    }
    return false;
  };
  return ResizeObservation2;
}();
var ResizeObserverDetail = function() {
  function ResizeObserverDetail2(resizeObserver, callback) {
    this.activeTargets = [];
    this.skippedTargets = [];
    this.observationTargets = [];
    this.observer = resizeObserver;
    this.callback = callback;
  }
  return ResizeObserverDetail2;
}();
var observerMap = /* @__PURE__ */ new WeakMap();
var getObservationIndex = function(observationTargets, target) {
  for (var i2 = 0; i2 < observationTargets.length; i2 += 1) {
    if (observationTargets[i2].target === target) {
      return i2;
    }
  }
  return -1;
};
var ResizeObserverController = function() {
  function ResizeObserverController2() {
  }
  ResizeObserverController2.connect = function(resizeObserver, callback) {
    var detail = new ResizeObserverDetail(resizeObserver, callback);
    observerMap.set(resizeObserver, detail);
  };
  ResizeObserverController2.observe = function(resizeObserver, target, options) {
    var detail = observerMap.get(resizeObserver);
    var firstObservation = detail.observationTargets.length === 0;
    if (getObservationIndex(detail.observationTargets, target) < 0) {
      firstObservation && resizeObservers.push(detail);
      detail.observationTargets.push(new ResizeObservation(target, options && options.box));
      updateCount(1);
      scheduler.schedule();
    }
  };
  ResizeObserverController2.unobserve = function(resizeObserver, target) {
    var detail = observerMap.get(resizeObserver);
    var index2 = getObservationIndex(detail.observationTargets, target);
    var lastObservation = detail.observationTargets.length === 1;
    if (index2 >= 0) {
      lastObservation && resizeObservers.splice(resizeObservers.indexOf(detail), 1);
      detail.observationTargets.splice(index2, 1);
      updateCount(-1);
    }
  };
  ResizeObserverController2.disconnect = function(resizeObserver) {
    var _this = this;
    var detail = observerMap.get(resizeObserver);
    detail.observationTargets.slice().forEach(function(ot2) {
      return _this.unobserve(resizeObserver, ot2.target);
    });
    detail.activeTargets.splice(0, detail.activeTargets.length);
  };
  return ResizeObserverController2;
}();
var ResizeObserver$1 = function() {
  function ResizeObserver2(callback) {
    if (arguments.length === 0) {
      throw new TypeError("Failed to construct 'ResizeObserver': 1 argument required, but only 0 present.");
    }
    if (typeof callback !== "function") {
      throw new TypeError("Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function.");
    }
    ResizeObserverController.connect(this, callback);
  }
  ResizeObserver2.prototype.observe = function(target, options) {
    if (arguments.length === 0) {
      throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present.");
    }
    if (!isElement(target)) {
      throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element");
    }
    ResizeObserverController.observe(this, target, options);
  };
  ResizeObserver2.prototype.unobserve = function(target) {
    if (arguments.length === 0) {
      throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present.");
    }
    if (!isElement(target)) {
      throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element");
    }
    ResizeObserverController.unobserve(this, target);
  };
  ResizeObserver2.prototype.disconnect = function() {
    ResizeObserverController.disconnect(this);
  };
  ResizeObserver2.toString = function() {
    return "function ResizeObserver () { [polyfill code] }";
  };
  return ResizeObserver2;
}();
class ResizeObserverDelegate {
  constructor() {
    this.handleResize = this.handleResize.bind(this);
    this.observer = new (typeof window !== "undefined" && window.ResizeObserver || ResizeObserver$1)(this.handleResize);
    this.elHandlersMap = /* @__PURE__ */ new Map();
  }
  handleResize(entries) {
    for (const entry of entries) {
      const handler = this.elHandlersMap.get(entry.target);
      if (handler !== void 0) {
        handler(entry);
      }
    }
  }
  registerHandler(el, handler) {
    this.elHandlersMap.set(el, handler);
    this.observer.observe(el);
  }
  unregisterHandler(el) {
    if (!this.elHandlersMap.has(el)) {
      return;
    }
    this.elHandlersMap.delete(el);
    this.observer.unobserve(el);
  }
}
const resizeObserverManager = new ResizeObserverDelegate();
const VResizeObserver = /* @__PURE__ */ defineComponent({
  name: "ResizeObserver",
  props: {
    onResize: Function
  },
  setup(props) {
    let registered = false;
    const proxy = getCurrentInstance().proxy;
    function handleResize(entry) {
      const { onResize } = props;
      if (onResize !== void 0)
        onResize(entry);
    }
    onMounted(() => {
      const el = proxy.$el;
      if (el === void 0) {
        warn("resize-observer", "$el does not exist.");
        return;
      }
      if (el.nextElementSibling !== el.nextSibling) {
        if (el.nodeType === 3 && el.nodeValue !== "") {
          warn("resize-observer", "$el can not be observed (it may be a text node).");
          return;
        }
      }
      if (el.nextElementSibling !== null) {
        resizeObserverManager.registerHandler(el.nextElementSibling, handleResize);
        registered = true;
      }
    });
    onBeforeUnmount(() => {
      if (registered) {
        resizeObserverManager.unregisterHandler(proxy.$el.nextElementSibling);
      }
    });
  },
  render() {
    return renderSlot(this.$slots, "default");
  }
});
const formItemInjectionKey = createInjectionKey("n-form-item");
function useFormItem(props, { defaultSize = "medium", mergedSize, mergedDisabled } = {}) {
  const NFormItem = inject(formItemInjectionKey, null);
  provide(formItemInjectionKey, null);
  const mergedSizeRef = computed(mergedSize ? () => mergedSize(NFormItem) : () => {
    const { size: size2 } = props;
    if (size2)
      return size2;
    if (NFormItem) {
      const { mergedSize: mergedSize2 } = NFormItem;
      if (mergedSize2.value !== void 0) {
        return mergedSize2.value;
      }
    }
    return defaultSize;
  });
  const mergedDisabledRef = computed(mergedDisabled ? () => mergedDisabled(NFormItem) : () => {
    const { disabled } = props;
    if (disabled !== void 0) {
      return disabled;
    }
    if (NFormItem) {
      return NFormItem.disabled.value;
    }
    return false;
  });
  const mergedStatusRef = computed(() => {
    const { status } = props;
    if (status)
      return status;
    return NFormItem === null || NFormItem === void 0 ? void 0 : NFormItem.mergedValidationStatus.value;
  });
  onBeforeUnmount(() => {
    if (NFormItem) {
      NFormItem.restoreValidation();
    }
  });
  return {
    mergedSizeRef,
    mergedDisabledRef,
    mergedStatusRef,
    nTriggerFormBlur() {
      if (NFormItem) {
        NFormItem.handleContentBlur();
      }
    },
    nTriggerFormChange() {
      if (NFormItem) {
        NFormItem.handleContentChange();
      }
    },
    nTriggerFormFocus() {
      if (NFormItem) {
        NFormItem.handleContentFocus();
      }
    },
    nTriggerFormInput() {
      if (NFormItem) {
        NFormItem.handleContentInput();
      }
    }
  };
}
function capitalize(string) {
  return upperFirst(toString(string).toLowerCase());
}
function arrayReduce(array, iteratee, accumulator, initAccum) {
  var index2 = -1, length = array == null ? 0 : array.length;
  if (initAccum && length) {
    accumulator = array[++index2];
  }
  while (++index2 < length) {
    accumulator = iteratee(accumulator, array[index2], index2, array);
  }
  return accumulator;
}
function basePropertyOf(object) {
  return function(key) {
    return object == null ? void 0 : object[key];
  };
}
var deburredLetters = {
  // Latin-1 Supplement block.
  "À": "A",
  "Á": "A",
  "Â": "A",
  "Ã": "A",
  "Ä": "A",
  "Å": "A",
  "à": "a",
  "á": "a",
  "â": "a",
  "ã": "a",
  "ä": "a",
  "å": "a",
  "Ç": "C",
  "ç": "c",
  "Ð": "D",
  "ð": "d",
  "È": "E",
  "É": "E",
  "Ê": "E",
  "Ë": "E",
  "è": "e",
  "é": "e",
  "ê": "e",
  "ë": "e",
  "Ì": "I",
  "Í": "I",
  "Î": "I",
  "Ï": "I",
  "ì": "i",
  "í": "i",
  "î": "i",
  "ï": "i",
  "Ñ": "N",
  "ñ": "n",
  "Ò": "O",
  "Ó": "O",
  "Ô": "O",
  "Õ": "O",
  "Ö": "O",
  "Ø": "O",
  "ò": "o",
  "ó": "o",
  "ô": "o",
  "õ": "o",
  "ö": "o",
  "ø": "o",
  "Ù": "U",
  "Ú": "U",
  "Û": "U",
  "Ü": "U",
  "ù": "u",
  "ú": "u",
  "û": "u",
  "ü": "u",
  "Ý": "Y",
  "ý": "y",
  "ÿ": "y",
  "Æ": "Ae",
  "æ": "ae",
  "Þ": "Th",
  "þ": "th",
  "ß": "ss",
  // Latin Extended-A block.
  "Ā": "A",
  "Ă": "A",
  "Ą": "A",
  "ā": "a",
  "ă": "a",
  "ą": "a",
  "Ć": "C",
  "Ĉ": "C",
  "Ċ": "C",
  "Č": "C",
  "ć": "c",
  "ĉ": "c",
  "ċ": "c",
  "č": "c",
  "Ď": "D",
  "Đ": "D",
  "ď": "d",
  "đ": "d",
  "Ē": "E",
  "Ĕ": "E",
  "Ė": "E",
  "Ę": "E",
  "Ě": "E",
  "ē": "e",
  "ĕ": "e",
  "ė": "e",
  "ę": "e",
  "ě": "e",
  "Ĝ": "G",
  "Ğ": "G",
  "Ġ": "G",
  "Ģ": "G",
  "ĝ": "g",
  "ğ": "g",
  "ġ": "g",
  "ģ": "g",
  "Ĥ": "H",
  "Ħ": "H",
  "ĥ": "h",
  "ħ": "h",
  "Ĩ": "I",
  "Ī": "I",
  "Ĭ": "I",
  "Į": "I",
  "İ": "I",
  "ĩ": "i",
  "ī": "i",
  "ĭ": "i",
  "į": "i",
  "ı": "i",
  "Ĵ": "J",
  "ĵ": "j",
  "Ķ": "K",
  "ķ": "k",
  "ĸ": "k",
  "Ĺ": "L",
  "Ļ": "L",
  "Ľ": "L",
  "Ŀ": "L",
  "Ł": "L",
  "ĺ": "l",
  "ļ": "l",
  "ľ": "l",
  "ŀ": "l",
  "ł": "l",
  "Ń": "N",
  "Ņ": "N",
  "Ň": "N",
  "Ŋ": "N",
  "ń": "n",
  "ņ": "n",
  "ň": "n",
  "ŋ": "n",
  "Ō": "O",
  "Ŏ": "O",
  "Ő": "O",
  "ō": "o",
  "ŏ": "o",
  "ő": "o",
  "Ŕ": "R",
  "Ŗ": "R",
  "Ř": "R",
  "ŕ": "r",
  "ŗ": "r",
  "ř": "r",
  "Ś": "S",
  "Ŝ": "S",
  "Ş": "S",
  "Š": "S",
  "ś": "s",
  "ŝ": "s",
  "ş": "s",
  "š": "s",
  "Ţ": "T",
  "Ť": "T",
  "Ŧ": "T",
  "ţ": "t",
  "ť": "t",
  "ŧ": "t",
  "Ũ": "U",
  "Ū": "U",
  "Ŭ": "U",
  "Ů": "U",
  "Ű": "U",
  "Ų": "U",
  "ũ": "u",
  "ū": "u",
  "ŭ": "u",
  "ů": "u",
  "ű": "u",
  "ų": "u",
  "Ŵ": "W",
  "ŵ": "w",
  "Ŷ": "Y",
  "ŷ": "y",
  "Ÿ": "Y",
  "Ź": "Z",
  "Ż": "Z",
  "Ž": "Z",
  "ź": "z",
  "ż": "z",
  "ž": "z",
  "Ĳ": "IJ",
  "ĳ": "ij",
  "Œ": "Oe",
  "œ": "oe",
  "ŉ": "'n",
  "ſ": "s"
};
var deburrLetter = basePropertyOf(deburredLetters);
const deburrLetter$1 = deburrLetter;
var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
var rsComboMarksRange$1 = "\\u0300-\\u036f", reComboHalfMarksRange$1 = "\\ufe20-\\ufe2f", rsComboSymbolsRange$1 = "\\u20d0-\\u20ff", rsComboRange$1 = rsComboMarksRange$1 + reComboHalfMarksRange$1 + rsComboSymbolsRange$1;
var rsCombo$1 = "[" + rsComboRange$1 + "]";
var reComboMark = RegExp(rsCombo$1, "g");
function deburr(string) {
  string = toString(string);
  return string && string.replace(reLatin, deburrLetter$1).replace(reComboMark, "");
}
var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
function asciiWords(string) {
  return string.match(reAsciiWord) || [];
}
var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
function hasUnicodeWord(string) {
  return reHasUnicodeWord.test(string);
}
var rsAstralRange = "\\ud800-\\udfff", rsComboMarksRange = "\\u0300-\\u036f", reComboHalfMarksRange = "\\ufe20-\\ufe2f", rsComboSymbolsRange = "\\u20d0-\\u20ff", rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange, rsDingbatRange = "\\u2700-\\u27bf", rsLowerRange = "a-z\\xdf-\\xf6\\xf8-\\xff", rsMathOpRange = "\\xac\\xb1\\xd7\\xf7", rsNonCharRange = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", rsPunctuationRange = "\\u2000-\\u206f", rsSpaceRange = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", rsUpperRange = "A-Z\\xc0-\\xd6\\xd8-\\xde", rsVarRange = "\\ufe0e\\ufe0f", rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
var rsApos$1 = "['’]", rsBreak = "[" + rsBreakRange + "]", rsCombo = "[" + rsComboRange + "]", rsDigits = "\\d+", rsDingbat = "[" + rsDingbatRange + "]", rsLower = "[" + rsLowerRange + "]", rsMisc = "[^" + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + "]", rsFitz = "\\ud83c[\\udffb-\\udfff]", rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")", rsNonAstral = "[^" + rsAstralRange + "]", rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsUpper = "[" + rsUpperRange + "]", rsZWJ = "\\u200d";
var rsMiscLower = "(?:" + rsLower + "|" + rsMisc + ")", rsMiscUpper = "(?:" + rsUpper + "|" + rsMisc + ")", rsOptContrLower = "(?:" + rsApos$1 + "(?:d|ll|m|re|s|t|ve))?", rsOptContrUpper = "(?:" + rsApos$1 + "(?:D|LL|M|RE|S|T|VE))?", reOptMod = rsModifier + "?", rsOptVar = "[" + rsVarRange + "]?", rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*", rsOrdLower = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", rsOrdUpper = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", rsSeq = rsOptVar + reOptMod + rsOptJoin, rsEmoji = "(?:" + [rsDingbat, rsRegional, rsSurrPair].join("|") + ")" + rsSeq;
var reUnicodeWord = RegExp([
  rsUpper + "?" + rsLower + "+" + rsOptContrLower + "(?=" + [rsBreak, rsUpper, "$"].join("|") + ")",
  rsMiscUpper + "+" + rsOptContrUpper + "(?=" + [rsBreak, rsUpper + rsMiscLower, "$"].join("|") + ")",
  rsUpper + "?" + rsMiscLower + "+" + rsOptContrLower,
  rsUpper + "+" + rsOptContrUpper,
  rsOrdUpper,
  rsOrdLower,
  rsDigits,
  rsEmoji
].join("|"), "g");
function unicodeWords(string) {
  return string.match(reUnicodeWord) || [];
}
function words(string, pattern, guard) {
  string = toString(string);
  pattern = guard ? void 0 : pattern;
  if (pattern === void 0) {
    return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
  }
  return string.match(pattern) || [];
}
var rsApos = "['’]";
var reApos = RegExp(rsApos, "g");
function createCompounder(callback) {
  return function(string) {
    return arrayReduce(words(deburr(string).replace(reApos, "")), callback, "");
  };
}
var camelCase = createCompounder(function(result, word, index2) {
  word = word.toLowerCase();
  return result + (index2 ? capitalize(word) : word);
});
const camelCase$1 = camelCase;
const style$4 = cB("base-wave", `
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
`);
const NBaseWave = /* @__PURE__ */ defineComponent({
  name: "BaseWave",
  props: {
    clsPrefix: {
      type: String,
      required: true
    }
  },
  setup(props) {
    useStyle("-base-wave", style$4, toRef(props, "clsPrefix"));
    const selfRef = ref(null);
    const activeRef = ref(false);
    let animationTimerId = null;
    onBeforeUnmount(() => {
      if (animationTimerId !== null) {
        window.clearTimeout(animationTimerId);
      }
    });
    return {
      active: activeRef,
      selfRef,
      play() {
        if (animationTimerId !== null) {
          window.clearTimeout(animationTimerId);
          activeRef.value = false;
          animationTimerId = null;
        }
        void nextTick(() => {
          var _a;
          void ((_a = selfRef.value) === null || _a === void 0 ? void 0 : _a.offsetHeight);
          activeRef.value = true;
          animationTimerId = window.setTimeout(() => {
            activeRef.value = false;
            animationTimerId = null;
          }, 1e3);
        });
      }
    };
  },
  render() {
    const { clsPrefix } = this;
    return h$1("div", { ref: "selfRef", "aria-hidden": true, class: [
      `${clsPrefix}-base-wave`,
      this.active && `${clsPrefix}-base-wave--active`
    ] });
  }
});
const {
  cubicBezierEaseInOut
} = commonVariables$2;
function fadeInWidthExpandTransition({
  duration = ".2s",
  delay = ".1s"
} = {}) {
  return [c$1("&.fade-in-width-expand-transition-leave-from, &.fade-in-width-expand-transition-enter-to", {
    opacity: 1
  }), c$1("&.fade-in-width-expand-transition-leave-to, &.fade-in-width-expand-transition-enter-from", `
 opacity: 0!important;
 margin-left: 0!important;
 margin-right: 0!important;
 `), c$1("&.fade-in-width-expand-transition-leave-active", `
 overflow: hidden;
 transition:
 opacity ${duration} ${cubicBezierEaseInOut},
 max-width ${duration} ${cubicBezierEaseInOut} ${delay},
 margin-left ${duration} ${cubicBezierEaseInOut} ${delay},
 margin-right ${duration} ${cubicBezierEaseInOut} ${delay};
 `), c$1("&.fade-in-width-expand-transition-enter-active", `
 overflow: hidden;
 transition:
 opacity ${duration} ${cubicBezierEaseInOut} ${delay},
 max-width ${duration} ${cubicBezierEaseInOut},
 margin-left ${duration} ${cubicBezierEaseInOut},
 margin-right ${duration} ${cubicBezierEaseInOut};
 `)];
}
const isChrome = isBrowser && "chrome" in window;
isBrowser && navigator.userAgent.includes("Firefox");
const isSafari = isBrowser && navigator.userAgent.includes("Safari") && !isChrome;
function createHoverColor(rgb) {
  return composite(rgb, [255, 255, 255, 0.16]);
}
function createPressedColor(rgb) {
  return composite(rgb, [0, 0, 0, 0.12]);
}
const buttonGroupInjectionKey = createInjectionKey("n-button-group");
const commonVariables$1 = {
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
  rippleDuration: ".6s"
};
const self$4 = (vars) => {
  const { heightTiny, heightSmall, heightMedium, heightLarge, borderRadius, fontSizeTiny, fontSizeSmall, fontSizeMedium, fontSizeLarge, opacityDisabled, textColor2, textColor3, primaryColorHover, primaryColorPressed, borderColor, primaryColor, baseColor, infoColor, infoColorHover, infoColorPressed, successColor, successColorHover, successColorPressed, warningColor, warningColorHover, warningColorPressed, errorColor, errorColorHover, errorColorPressed, fontWeight, buttonColor2, buttonColor2Hover, buttonColor2Pressed, fontWeightStrong } = vars;
  return Object.assign(Object.assign({}, commonVariables$1), {
    heightTiny,
    heightSmall,
    heightMedium,
    heightLarge,
    borderRadiusTiny: borderRadius,
    borderRadiusSmall: borderRadius,
    borderRadiusMedium: borderRadius,
    borderRadiusLarge: borderRadius,
    fontSizeTiny,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    opacityDisabled,
    // secondary
    colorOpacitySecondary: "0.16",
    colorOpacitySecondaryHover: "0.22",
    colorOpacitySecondaryPressed: "0.28",
    colorSecondary: buttonColor2,
    colorSecondaryHover: buttonColor2Hover,
    colorSecondaryPressed: buttonColor2Pressed,
    // tertiary
    colorTertiary: buttonColor2,
    colorTertiaryHover: buttonColor2Hover,
    colorTertiaryPressed: buttonColor2Pressed,
    // quaternary
    colorQuaternary: "#0000",
    colorQuaternaryHover: buttonColor2Hover,
    colorQuaternaryPressed: buttonColor2Pressed,
    // default type
    color: "#0000",
    colorHover: "#0000",
    colorPressed: "#0000",
    colorFocus: "#0000",
    colorDisabled: "#0000",
    textColor: textColor2,
    textColorTertiary: textColor3,
    textColorHover: primaryColorHover,
    textColorPressed: primaryColorPressed,
    textColorFocus: primaryColorHover,
    textColorDisabled: textColor2,
    textColorText: textColor2,
    textColorTextHover: primaryColorHover,
    textColorTextPressed: primaryColorPressed,
    textColorTextFocus: primaryColorHover,
    textColorTextDisabled: textColor2,
    textColorGhost: textColor2,
    textColorGhostHover: primaryColorHover,
    textColorGhostPressed: primaryColorPressed,
    textColorGhostFocus: primaryColorHover,
    textColorGhostDisabled: textColor2,
    border: `1px solid ${borderColor}`,
    borderHover: `1px solid ${primaryColorHover}`,
    borderPressed: `1px solid ${primaryColorPressed}`,
    borderFocus: `1px solid ${primaryColorHover}`,
    borderDisabled: `1px solid ${borderColor}`,
    rippleColor: primaryColor,
    // primary
    colorPrimary: primaryColor,
    colorHoverPrimary: primaryColorHover,
    colorPressedPrimary: primaryColorPressed,
    colorFocusPrimary: primaryColorHover,
    colorDisabledPrimary: primaryColor,
    textColorPrimary: baseColor,
    textColorHoverPrimary: baseColor,
    textColorPressedPrimary: baseColor,
    textColorFocusPrimary: baseColor,
    textColorDisabledPrimary: baseColor,
    textColorTextPrimary: primaryColor,
    textColorTextHoverPrimary: primaryColorHover,
    textColorTextPressedPrimary: primaryColorPressed,
    textColorTextFocusPrimary: primaryColorHover,
    textColorTextDisabledPrimary: textColor2,
    textColorGhostPrimary: primaryColor,
    textColorGhostHoverPrimary: primaryColorHover,
    textColorGhostPressedPrimary: primaryColorPressed,
    textColorGhostFocusPrimary: primaryColorHover,
    textColorGhostDisabledPrimary: primaryColor,
    borderPrimary: `1px solid ${primaryColor}`,
    borderHoverPrimary: `1px solid ${primaryColorHover}`,
    borderPressedPrimary: `1px solid ${primaryColorPressed}`,
    borderFocusPrimary: `1px solid ${primaryColorHover}`,
    borderDisabledPrimary: `1px solid ${primaryColor}`,
    rippleColorPrimary: primaryColor,
    // info
    colorInfo: infoColor,
    colorHoverInfo: infoColorHover,
    colorPressedInfo: infoColorPressed,
    colorFocusInfo: infoColorHover,
    colorDisabledInfo: infoColor,
    textColorInfo: baseColor,
    textColorHoverInfo: baseColor,
    textColorPressedInfo: baseColor,
    textColorFocusInfo: baseColor,
    textColorDisabledInfo: baseColor,
    textColorTextInfo: infoColor,
    textColorTextHoverInfo: infoColorHover,
    textColorTextPressedInfo: infoColorPressed,
    textColorTextFocusInfo: infoColorHover,
    textColorTextDisabledInfo: textColor2,
    textColorGhostInfo: infoColor,
    textColorGhostHoverInfo: infoColorHover,
    textColorGhostPressedInfo: infoColorPressed,
    textColorGhostFocusInfo: infoColorHover,
    textColorGhostDisabledInfo: infoColor,
    borderInfo: `1px solid ${infoColor}`,
    borderHoverInfo: `1px solid ${infoColorHover}`,
    borderPressedInfo: `1px solid ${infoColorPressed}`,
    borderFocusInfo: `1px solid ${infoColorHover}`,
    borderDisabledInfo: `1px solid ${infoColor}`,
    rippleColorInfo: infoColor,
    // success
    colorSuccess: successColor,
    colorHoverSuccess: successColorHover,
    colorPressedSuccess: successColorPressed,
    colorFocusSuccess: successColorHover,
    colorDisabledSuccess: successColor,
    textColorSuccess: baseColor,
    textColorHoverSuccess: baseColor,
    textColorPressedSuccess: baseColor,
    textColorFocusSuccess: baseColor,
    textColorDisabledSuccess: baseColor,
    textColorTextSuccess: successColor,
    textColorTextHoverSuccess: successColorHover,
    textColorTextPressedSuccess: successColorPressed,
    textColorTextFocusSuccess: successColorHover,
    textColorTextDisabledSuccess: textColor2,
    textColorGhostSuccess: successColor,
    textColorGhostHoverSuccess: successColorHover,
    textColorGhostPressedSuccess: successColorPressed,
    textColorGhostFocusSuccess: successColorHover,
    textColorGhostDisabledSuccess: successColor,
    borderSuccess: `1px solid ${successColor}`,
    borderHoverSuccess: `1px solid ${successColorHover}`,
    borderPressedSuccess: `1px solid ${successColorPressed}`,
    borderFocusSuccess: `1px solid ${successColorHover}`,
    borderDisabledSuccess: `1px solid ${successColor}`,
    rippleColorSuccess: successColor,
    // warning
    colorWarning: warningColor,
    colorHoverWarning: warningColorHover,
    colorPressedWarning: warningColorPressed,
    colorFocusWarning: warningColorHover,
    colorDisabledWarning: warningColor,
    textColorWarning: baseColor,
    textColorHoverWarning: baseColor,
    textColorPressedWarning: baseColor,
    textColorFocusWarning: baseColor,
    textColorDisabledWarning: baseColor,
    textColorTextWarning: warningColor,
    textColorTextHoverWarning: warningColorHover,
    textColorTextPressedWarning: warningColorPressed,
    textColorTextFocusWarning: warningColorHover,
    textColorTextDisabledWarning: textColor2,
    textColorGhostWarning: warningColor,
    textColorGhostHoverWarning: warningColorHover,
    textColorGhostPressedWarning: warningColorPressed,
    textColorGhostFocusWarning: warningColorHover,
    textColorGhostDisabledWarning: warningColor,
    borderWarning: `1px solid ${warningColor}`,
    borderHoverWarning: `1px solid ${warningColorHover}`,
    borderPressedWarning: `1px solid ${warningColorPressed}`,
    borderFocusWarning: `1px solid ${warningColorHover}`,
    borderDisabledWarning: `1px solid ${warningColor}`,
    rippleColorWarning: warningColor,
    // error
    colorError: errorColor,
    colorHoverError: errorColorHover,
    colorPressedError: errorColorPressed,
    colorFocusError: errorColorHover,
    colorDisabledError: errorColor,
    textColorError: baseColor,
    textColorHoverError: baseColor,
    textColorPressedError: baseColor,
    textColorFocusError: baseColor,
    textColorDisabledError: baseColor,
    textColorTextError: errorColor,
    textColorTextHoverError: errorColorHover,
    textColorTextPressedError: errorColorPressed,
    textColorTextFocusError: errorColorHover,
    textColorTextDisabledError: textColor2,
    textColorGhostError: errorColor,
    textColorGhostHoverError: errorColorHover,
    textColorGhostPressedError: errorColorPressed,
    textColorGhostFocusError: errorColorHover,
    textColorGhostDisabledError: errorColor,
    borderError: `1px solid ${errorColor}`,
    borderHoverError: `1px solid ${errorColorHover}`,
    borderPressedError: `1px solid ${errorColorPressed}`,
    borderFocusError: `1px solid ${errorColorHover}`,
    borderDisabledError: `1px solid ${errorColor}`,
    rippleColorError: errorColor,
    waveOpacity: "0.6",
    fontWeight,
    fontWeightStrong
  });
};
const buttonLight = {
  name: "Button",
  common: commonLight,
  self: self$4
};
const buttonLight$1 = buttonLight;
const style$3 = c$1([cB("button", `
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
 `, [cM("color", [cE("border", {
  borderColor: "var(--n-border-color)"
}), cM("disabled", [cE("border", {
  borderColor: "var(--n-border-color-disabled)"
})]), cNotM("disabled", [c$1("&:focus", [cE("state-border", {
  borderColor: "var(--n-border-color-focus)"
})]), c$1("&:hover", [cE("state-border", {
  borderColor: "var(--n-border-color-hover)"
})]), c$1("&:active", [cE("state-border", {
  borderColor: "var(--n-border-color-pressed)"
})]), cM("pressed", [cE("state-border", {
  borderColor: "var(--n-border-color-pressed)"
})])])]), cM("disabled", {
  backgroundColor: "var(--n-color-disabled)",
  color: "var(--n-text-color-disabled)"
}, [cE("border", {
  border: "var(--n-border-disabled)"
})]), cNotM("disabled", [c$1("&:focus", {
  backgroundColor: "var(--n-color-focus)",
  color: "var(--n-text-color-focus)"
}, [cE("state-border", {
  border: "var(--n-border-focus)"
})]), c$1("&:hover", {
  backgroundColor: "var(--n-color-hover)",
  color: "var(--n-text-color-hover)"
}, [cE("state-border", {
  border: "var(--n-border-hover)"
})]), c$1("&:active", {
  backgroundColor: "var(--n-color-pressed)",
  color: "var(--n-text-color-pressed)"
}, [cE("state-border", {
  border: "var(--n-border-pressed)"
})]), cM("pressed", {
  backgroundColor: "var(--n-color-pressed)",
  color: "var(--n-text-color-pressed)"
}, [cE("state-border", {
  border: "var(--n-border-pressed)"
})])]), cM("loading", "cursor: wait;"), cB("base-wave", `
 pointer-events: none;
 top: 0;
 right: 0;
 bottom: 0;
 left: 0;
 animation-iteration-count: 1;
 animation-duration: var(--n-ripple-duration);
 animation-timing-function: var(--n-bezier-ease-out), var(--n-bezier-ease-out);
 `, [cM("active", {
  zIndex: 1,
  animationName: "button-wave-spread, button-wave-opacity"
})]), isBrowser && "MozBoxSizing" in document.createElement("div").style ? c$1("&::moz-focus-inner", {
  border: 0
}) : null, cE("border, state-border", `
 position: absolute;
 left: 0;
 top: 0;
 right: 0;
 bottom: 0;
 border-radius: inherit;
 transition: border-color .3s var(--n-bezier);
 pointer-events: none;
 `), cE("border", {
  border: "var(--n-border)"
}), cE("state-border", {
  border: "var(--n-border)",
  borderColor: "#0000",
  zIndex: 1
}), cE("icon", `
 margin: var(--n-icon-margin);
 margin-left: 0;
 height: var(--n-icon-size);
 width: var(--n-icon-size);
 max-width: var(--n-icon-size);
 font-size: var(--n-icon-size);
 position: relative;
 flex-shrink: 0;
 `, [cB("icon-slot", `
 height: var(--n-icon-size);
 width: var(--n-icon-size);
 position: absolute;
 left: 0;
 top: 50%;
 transform: translateY(-50%);
 display: flex;
 align-items: center;
 justify-content: center;
 `, [iconSwitchTransition({
  top: "50%",
  originalTransform: "translateY(-50%)"
})]), fadeInWidthExpandTransition()]), cE("content", `
 display: flex;
 align-items: center;
 flex-wrap: nowrap;
 min-width: 0;
 `, [c$1("~", [cE("icon", {
  margin: "var(--n-icon-margin)",
  marginRight: 0
})])]), cM("block", `
 display: flex;
 width: 100%;
 `), cM("dashed", [cE("border, state-border", {
  borderStyle: "dashed !important"
})]), cM("disabled", {
  cursor: "not-allowed",
  opacity: "var(--n-opacity-disabled)"
})]), c$1("@keyframes button-wave-spread", {
  from: {
    boxShadow: "0 0 0.5px 0 var(--n-ripple-color)"
  },
  to: {
    // don't use exact 5px since chrome will display the animation with glitches
    boxShadow: "0 0 0.5px 4.5px var(--n-ripple-color)"
  }
}), c$1("@keyframes button-wave-opacity", {
  from: {
    opacity: "var(--n-wave-opacity)"
  },
  to: {
    opacity: 0
  }
})]);
const buttonProps = Object.assign(Object.assign({}, useTheme.props), { color: String, textColor: String, text: Boolean, block: Boolean, loading: Boolean, disabled: Boolean, circle: Boolean, size: String, ghost: Boolean, round: Boolean, secondary: Boolean, tertiary: Boolean, quaternary: Boolean, strong: Boolean, focusable: {
  type: Boolean,
  default: true
}, keyboard: {
  type: Boolean,
  default: true
}, tag: {
  type: String,
  default: "button"
}, type: {
  type: String,
  default: "default"
}, dashed: Boolean, renderIcon: Function, iconPlacement: {
  type: String,
  default: "left"
}, attrType: {
  type: String,
  default: "button"
}, bordered: {
  type: Boolean,
  default: true
}, onClick: [Function, Array], nativeFocusBehavior: {
  type: Boolean,
  default: !isSafari
} });
const Button = /* @__PURE__ */ defineComponent({
  name: "Button",
  props: buttonProps,
  setup(props) {
    const selfElRef = ref(null);
    const waveElRef = ref(null);
    const enterPressedRef = ref(false);
    const showBorderRef = useMemo(() => {
      return !props.quaternary && !props.tertiary && !props.secondary && !props.text && (!props.color || props.ghost || props.dashed) && props.bordered;
    });
    const NButtonGroup = inject(buttonGroupInjectionKey, {});
    const { mergedSizeRef } = useFormItem({}, {
      defaultSize: "medium",
      mergedSize: (NFormItem) => {
        const { size: size2 } = props;
        if (size2)
          return size2;
        const { size: buttonGroupSize } = NButtonGroup;
        if (buttonGroupSize)
          return buttonGroupSize;
        const { mergedSize: formItemSize } = NFormItem || {};
        if (formItemSize) {
          return formItemSize.value;
        }
        return "medium";
      }
    });
    const mergedFocusableRef = computed(() => {
      return props.focusable && !props.disabled;
    });
    const handleMousedown = (e2) => {
      var _a;
      if (!mergedFocusableRef.value) {
        e2.preventDefault();
      }
      if (props.nativeFocusBehavior) {
        return;
      }
      e2.preventDefault();
      if (props.disabled) {
        return;
      }
      if (mergedFocusableRef.value) {
        (_a = selfElRef.value) === null || _a === void 0 ? void 0 : _a.focus({ preventScroll: true });
      }
    };
    const handleClick = (e2) => {
      var _a;
      if (!props.disabled && !props.loading) {
        const { onClick } = props;
        if (onClick)
          call(onClick, e2);
        if (!props.text) {
          (_a = waveElRef.value) === null || _a === void 0 ? void 0 : _a.play();
        }
      }
    };
    const handleKeyup = (e2) => {
      switch (e2.key) {
        case "Enter":
          if (!props.keyboard) {
            return;
          }
          enterPressedRef.value = false;
      }
    };
    const handleKeydown = (e2) => {
      switch (e2.key) {
        case "Enter":
          if (!props.keyboard || props.loading) {
            e2.preventDefault();
            return;
          }
          enterPressedRef.value = true;
      }
    };
    const handleBlur = () => {
      enterPressedRef.value = false;
    };
    const { inlineThemeDisabled, mergedClsPrefixRef, mergedRtlRef } = useConfig(props);
    const themeRef = useTheme("Button", "-button", style$3, buttonLight$1, props, mergedClsPrefixRef);
    const rtlEnabledRef = useRtl("Button", mergedRtlRef, mergedClsPrefixRef);
    const cssVarsRef = computed(() => {
      const theme = themeRef.value;
      const { common: { cubicBezierEaseInOut: cubicBezierEaseInOut2, cubicBezierEaseOut }, self: self2 } = theme;
      const { rippleDuration, opacityDisabled, fontWeight, fontWeightStrong } = self2;
      const size2 = mergedSizeRef.value;
      const { dashed, type, ghost, text, color, round, circle, textColor, secondary, tertiary, quaternary, strong } = props;
      const fontProps = {
        "font-weight": strong ? fontWeightStrong : fontWeight
      };
      let colorProps = {
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
        "--n-text-color-disabled": "initial"
      };
      const typeIsTertiary = type === "tertiary";
      const typeIsDefault = type === "default";
      const mergedType = typeIsTertiary ? "default" : type;
      if (text) {
        const propTextColor = textColor || color;
        const mergedTextColor = propTextColor || self2[createKey("textColorText", mergedType)];
        colorProps = {
          "--n-color": "#0000",
          "--n-color-hover": "#0000",
          "--n-color-pressed": "#0000",
          "--n-color-focus": "#0000",
          "--n-color-disabled": "#0000",
          "--n-ripple-color": "#0000",
          "--n-text-color": mergedTextColor,
          "--n-text-color-hover": propTextColor ? createHoverColor(propTextColor) : self2[createKey("textColorTextHover", mergedType)],
          "--n-text-color-pressed": propTextColor ? createPressedColor(propTextColor) : self2[createKey("textColorTextPressed", mergedType)],
          "--n-text-color-focus": propTextColor ? createHoverColor(propTextColor) : self2[createKey("textColorTextHover", mergedType)],
          "--n-text-color-disabled": propTextColor || self2[createKey("textColorTextDisabled", mergedType)]
        };
      } else if (ghost || dashed) {
        const mergedTextColor = textColor || color;
        colorProps = {
          "--n-color": "#0000",
          "--n-color-hover": "#0000",
          "--n-color-pressed": "#0000",
          "--n-color-focus": "#0000",
          "--n-color-disabled": "#0000",
          "--n-ripple-color": color || self2[createKey("rippleColor", mergedType)],
          "--n-text-color": mergedTextColor || self2[createKey("textColorGhost", mergedType)],
          "--n-text-color-hover": mergedTextColor ? createHoverColor(mergedTextColor) : self2[createKey("textColorGhostHover", mergedType)],
          "--n-text-color-pressed": mergedTextColor ? createPressedColor(mergedTextColor) : self2[createKey("textColorGhostPressed", mergedType)],
          "--n-text-color-focus": mergedTextColor ? createHoverColor(mergedTextColor) : self2[createKey("textColorGhostHover", mergedType)],
          "--n-text-color-disabled": mergedTextColor || self2[createKey("textColorGhostDisabled", mergedType)]
        };
      } else if (secondary) {
        const typeTextColor = typeIsDefault ? self2.textColor : typeIsTertiary ? self2.textColorTertiary : self2[createKey("color", mergedType)];
        const mergedTextColor = color || typeTextColor;
        const isColoredType = type !== "default" && type !== "tertiary";
        colorProps = {
          "--n-color": isColoredType ? changeColor(mergedTextColor, {
            alpha: Number(self2.colorOpacitySecondary)
          }) : self2.colorSecondary,
          "--n-color-hover": isColoredType ? changeColor(mergedTextColor, {
            alpha: Number(self2.colorOpacitySecondaryHover)
          }) : self2.colorSecondaryHover,
          "--n-color-pressed": isColoredType ? changeColor(mergedTextColor, {
            alpha: Number(self2.colorOpacitySecondaryPressed)
          }) : self2.colorSecondaryPressed,
          "--n-color-focus": isColoredType ? changeColor(mergedTextColor, {
            alpha: Number(self2.colorOpacitySecondaryHover)
          }) : self2.colorSecondaryHover,
          "--n-color-disabled": self2.colorSecondary,
          "--n-ripple-color": "#0000",
          "--n-text-color": mergedTextColor,
          "--n-text-color-hover": mergedTextColor,
          "--n-text-color-pressed": mergedTextColor,
          "--n-text-color-focus": mergedTextColor,
          "--n-text-color-disabled": mergedTextColor
        };
      } else if (tertiary || quaternary) {
        const typeColor = typeIsDefault ? self2.textColor : typeIsTertiary ? self2.textColorTertiary : self2[createKey("color", mergedType)];
        const mergedColor = color || typeColor;
        if (tertiary) {
          colorProps["--n-color"] = self2.colorTertiary;
          colorProps["--n-color-hover"] = self2.colorTertiaryHover;
          colorProps["--n-color-pressed"] = self2.colorTertiaryPressed;
          colorProps["--n-color-focus"] = self2.colorSecondaryHover;
          colorProps["--n-color-disabled"] = self2.colorTertiary;
        } else {
          colorProps["--n-color"] = self2.colorQuaternary;
          colorProps["--n-color-hover"] = self2.colorQuaternaryHover;
          colorProps["--n-color-pressed"] = self2.colorQuaternaryPressed;
          colorProps["--n-color-focus"] = self2.colorQuaternaryHover;
          colorProps["--n-color-disabled"] = self2.colorQuaternary;
        }
        colorProps["--n-ripple-color"] = "#0000";
        colorProps["--n-text-color"] = mergedColor;
        colorProps["--n-text-color-hover"] = mergedColor;
        colorProps["--n-text-color-pressed"] = mergedColor;
        colorProps["--n-text-color-focus"] = mergedColor;
        colorProps["--n-text-color-disabled"] = mergedColor;
      } else {
        colorProps = {
          "--n-color": color || self2[createKey("color", mergedType)],
          "--n-color-hover": color ? createHoverColor(color) : self2[createKey("colorHover", mergedType)],
          "--n-color-pressed": color ? createPressedColor(color) : self2[createKey("colorPressed", mergedType)],
          "--n-color-focus": color ? createHoverColor(color) : self2[createKey("colorFocus", mergedType)],
          "--n-color-disabled": color || self2[createKey("colorDisabled", mergedType)],
          "--n-ripple-color": color || self2[createKey("rippleColor", mergedType)],
          "--n-text-color": textColor || (color ? self2.textColorPrimary : typeIsTertiary ? self2.textColorTertiary : self2[createKey("textColor", mergedType)]),
          "--n-text-color-hover": textColor || (color ? self2.textColorHoverPrimary : self2[createKey("textColorHover", mergedType)]),
          "--n-text-color-pressed": textColor || (color ? self2.textColorPressedPrimary : self2[createKey("textColorPressed", mergedType)]),
          "--n-text-color-focus": textColor || (color ? self2.textColorFocusPrimary : self2[createKey("textColorFocus", mergedType)]),
          "--n-text-color-disabled": textColor || (color ? self2.textColorDisabledPrimary : self2[createKey("textColorDisabled", mergedType)])
        };
      }
      let borderProps = {
        "--n-border": "initial",
        "--n-border-hover": "initial",
        "--n-border-pressed": "initial",
        "--n-border-focus": "initial",
        "--n-border-disabled": "initial"
      };
      if (text) {
        borderProps = {
          "--n-border": "none",
          "--n-border-hover": "none",
          "--n-border-pressed": "none",
          "--n-border-focus": "none",
          "--n-border-disabled": "none"
        };
      } else {
        borderProps = {
          "--n-border": self2[createKey("border", mergedType)],
          "--n-border-hover": self2[createKey("borderHover", mergedType)],
          "--n-border-pressed": self2[createKey("borderPressed", mergedType)],
          "--n-border-focus": self2[createKey("borderFocus", mergedType)],
          "--n-border-disabled": self2[createKey("borderDisabled", mergedType)]
        };
      }
      const { [createKey("height", size2)]: height, [createKey("fontSize", size2)]: fontSize, [createKey("padding", size2)]: padding, [createKey("paddingRound", size2)]: paddingRound, [createKey("iconSize", size2)]: iconSize, [createKey("borderRadius", size2)]: borderRadius, [createKey("iconMargin", size2)]: iconMargin, waveOpacity } = self2;
      const sizeProps = {
        "--n-width": circle && !text ? height : "initial",
        "--n-height": text ? "initial" : height,
        "--n-font-size": fontSize,
        "--n-padding": circle ? "initial" : text ? "initial" : round ? paddingRound : padding,
        "--n-icon-size": iconSize,
        "--n-icon-margin": iconMargin,
        "--n-border-radius": text ? "initial" : circle || round ? height : borderRadius
      };
      return Object.assign(Object.assign(Object.assign(Object.assign({ "--n-bezier": cubicBezierEaseInOut2, "--n-bezier-ease-out": cubicBezierEaseOut, "--n-ripple-duration": rippleDuration, "--n-opacity-disabled": opacityDisabled, "--n-wave-opacity": waveOpacity }, fontProps), colorProps), borderProps), sizeProps);
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass("button", computed(() => {
      let hash = "";
      const { dashed, type, ghost, text, color, round, circle, textColor, secondary, tertiary, quaternary, strong } = props;
      if (dashed)
        hash += "a";
      if (ghost)
        hash += "b";
      if (text)
        hash += "c";
      if (round)
        hash += "d";
      if (circle)
        hash += "e";
      if (secondary)
        hash += "f";
      if (tertiary)
        hash += "g";
      if (quaternary)
        hash += "h";
      if (strong)
        hash += "i";
      if (color)
        hash += "j" + color2Class(color);
      if (textColor)
        hash += "k" + color2Class(textColor);
      const { value: size2 } = mergedSizeRef;
      hash += "l" + size2[0];
      hash += "m" + type[0];
      return hash;
    }), cssVarsRef, props) : void 0;
    return {
      selfElRef,
      waveElRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedFocusable: mergedFocusableRef,
      mergedSize: mergedSizeRef,
      showBorder: showBorderRef,
      enterPressed: enterPressedRef,
      rtlEnabled: rtlEnabledRef,
      handleMousedown,
      handleKeydown,
      handleBlur,
      handleKeyup,
      handleClick,
      customColorCssVars: computed(() => {
        const { color } = props;
        if (!color)
          return null;
        const hoverColor = createHoverColor(color);
        return {
          "--n-border-color": color,
          "--n-border-color-hover": hoverColor,
          "--n-border-color-pressed": createPressedColor(color),
          "--n-border-color-focus": hoverColor,
          "--n-border-color-disabled": color
        };
      }),
      cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    };
  },
  render() {
    const { mergedClsPrefix, tag: Component, onRender } = this;
    onRender === null || onRender === void 0 ? void 0 : onRender();
    const children = resolveWrappedSlot(this.$slots.default, (children2) => children2 && h$1("span", { class: `${mergedClsPrefix}-button__content` }, children2));
    return h$1(
      Component,
      { ref: "selfElRef", class: [
        this.themeClass,
        `${mergedClsPrefix}-button`,
        `${mergedClsPrefix}-button--${this.type}-type`,
        `${mergedClsPrefix}-button--${this.mergedSize}-type`,
        this.rtlEnabled && `${mergedClsPrefix}-button--rtl`,
        this.disabled && `${mergedClsPrefix}-button--disabled`,
        this.block && `${mergedClsPrefix}-button--block`,
        this.enterPressed && `${mergedClsPrefix}-button--pressed`,
        !this.text && this.dashed && `${mergedClsPrefix}-button--dashed`,
        this.color && `${mergedClsPrefix}-button--color`,
        this.secondary && `${mergedClsPrefix}-button--secondary`,
        this.loading && `${mergedClsPrefix}-button--loading`,
        this.ghost && `${mergedClsPrefix}-button--ghost`
        // required for button group border collapse
      ], tabindex: this.mergedFocusable ? 0 : -1, type: this.attrType, style: this.cssVars, disabled: this.disabled, onClick: this.handleClick, onBlur: this.handleBlur, onMousedown: this.handleMousedown, onKeyup: this.handleKeyup, onKeydown: this.handleKeydown },
      this.iconPlacement === "right" && children,
      h$1(NFadeInExpandTransition, { width: true }, {
        default: () => resolveWrappedSlot(this.$slots.icon, (children2) => (this.loading || this.renderIcon || children2) && h$1(
          "span",
          { class: `${mergedClsPrefix}-button__icon`, style: {
            margin: isSlotEmpty(this.$slots.default) ? "0" : ""
          } },
          h$1(NIconSwitchTransition, null, {
            default: () => this.loading ? h$1(NBaseLoading, { clsPrefix: mergedClsPrefix, key: "loading", class: `${mergedClsPrefix}-icon-slot`, strokeWidth: 20 }) : h$1("div", { key: "icon", class: `${mergedClsPrefix}-icon-slot`, role: "none" }, this.renderIcon ? this.renderIcon() : children2)
          })
        ))
      }),
      this.iconPlacement === "left" && children,
      !this.text ? h$1(NBaseWave, { ref: "waveElRef", clsPrefix: mergedClsPrefix }) : null,
      this.showBorder ? h$1("div", { "aria-hidden": true, class: `${mergedClsPrefix}-button__border`, style: this.customColorCssVars }) : null,
      this.showBorder ? h$1("div", { "aria-hidden": true, class: `${mergedClsPrefix}-button__state-border`, style: this.customColorCssVars }) : null
    );
  }
});
const NButton = Button;
const self$3 = (vars) => {
  return {
    dotSize: "8px",
    dotColor: "rgba(255, 255, 255, .3)",
    dotColorActive: "rgba(255, 255, 255, 1)",
    dotColorFocus: "rgba(255, 255, 255, .5)",
    dotLineWidth: "16px",
    dotLineWidthActive: "24px",
    arrowColor: "#eee"
  };
};
const carouselLight = {
  name: "Carousel",
  common: commonLight,
  self: self$3
};
const carouselLight$1 = carouselLight;
function addDuplicateSlides(slides) {
  const { length } = slides;
  if (length > 1) {
    slides.push(duplicateSlide(slides[0], 0, "append"));
    slides.unshift(duplicateSlide(slides[length - 1], length - 1, "prepend"));
    return slides;
  }
  return slides;
}
function duplicateSlide(child, index2, position) {
  return cloneVNode(child, {
    // for patch
    key: `carousel-item-duplicate-${index2}-${position}`
  });
}
function getDisplayIndex(current, length, duplicatedable) {
  return !duplicatedable ? current : current === 0 ? length - 3 : current === length - 1 ? 0 : current - 1;
}
function getRealIndex(current, duplicatedable) {
  return !duplicatedable ? current : current + 1;
}
function getPrevIndex(current, length, duplicatedable) {
  if (current < 0)
    return null;
  return current === 0 ? duplicatedable ? length - 1 : null : current - 1;
}
function getNextIndex(current, length, duplicatedable) {
  if (current > length - 1)
    return null;
  return current === length - 1 ? duplicatedable ? 0 : null : current + 1;
}
function getDisplayTotalView(total, duplicatedable) {
  return duplicatedable && total > 3 ? total - 2 : total;
}
function isTouchEvent(e2) {
  return window.TouchEvent && e2 instanceof window.TouchEvent;
}
function calculateSize(element, innerOnly) {
  let { offsetWidth: width, offsetHeight: height } = element;
  if (innerOnly) {
    const style2 = getComputedStyle(element);
    width = width - parseFloat(style2.getPropertyValue("padding-left")) - parseFloat(style2.getPropertyValue("padding-right"));
    height = height - parseFloat(style2.getPropertyValue("padding-top")) - parseFloat(style2.getPropertyValue("padding-bottom"));
  }
  return { width, height };
}
function clampValue(value, min, max) {
  return value < min ? min : value > max ? max : value;
}
function resolveSpeed(value) {
  if (value === void 0)
    return 0;
  if (typeof value === "number")
    return value;
  const timeRE = /^((\d+)?\.?\d+?)(ms|s)?$/;
  const match = value.match(timeRE);
  if (match) {
    const [, number, , unit = "ms"] = match;
    return Number(number) * (unit === "ms" ? 1 : 1e3);
  }
  return 0;
}
const carouselMethodsInjectionKey = createInjectionKey("n-carousel-methods");
const provideCarouselContext = (contextValue) => {
  provide(carouselMethodsInjectionKey, contextValue);
};
const useCarouselContext = (location2 = "unknown", component = "component") => {
  const CarouselContext = inject(carouselMethodsInjectionKey);
  if (!CarouselContext) {
    throwError(location2, `\`${component}\` must be placed inside \`n-carousel\`.`);
  }
  return CarouselContext;
};
const carouselDotsProps = {
  total: {
    type: Number,
    default: 0
  },
  currentIndex: {
    type: Number,
    default: 0
  },
  dotType: {
    type: String,
    default: "dot"
  },
  trigger: {
    type: String,
    default: "click"
  },
  keyboard: Boolean
};
const NCarouselDots = /* @__PURE__ */ defineComponent({
  name: "CarouselDots",
  props: carouselDotsProps,
  setup(props) {
    const { mergedClsPrefixRef } = useConfig(props);
    const dotElsRef = ref([]);
    const NCarousel2 = useCarouselContext();
    function handleKeydown(e2, current) {
      switch (e2.key) {
        case "Enter":
        case " ":
          e2.preventDefault();
          NCarousel2.to(current);
          return;
      }
      if (props.keyboard) {
        handleKeyboard(e2);
      }
    }
    function handleMouseenter(current) {
      if (props.trigger === "hover") {
        NCarousel2.to(current);
      }
    }
    function handleClick(current) {
      if (props.trigger === "click") {
        NCarousel2.to(current);
      }
    }
    function handleKeyboard(e2) {
      var _a;
      if (e2.shiftKey || e2.altKey || e2.ctrlKey || e2.metaKey) {
        return;
      }
      const nodeName = (_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.nodeName.toLowerCase();
      if (nodeName === "input" || nodeName === "textarea") {
        return;
      }
      const { code: keycode } = e2;
      const isVerticalNext = keycode === "PageUp" || keycode === "ArrowUp";
      const isVerticalPrev = keycode === "PageDown" || keycode === "ArrowDown";
      const isHorizontalNext = keycode === "PageUp" || keycode === "ArrowRight";
      const isHorizontalPrev = keycode === "PageDown" || keycode === "ArrowLeft";
      const vertical = NCarousel2.isVertical();
      const wantToNext = vertical ? isVerticalNext : isHorizontalNext;
      const wantToPrev = vertical ? isVerticalPrev : isHorizontalPrev;
      if (!wantToNext && !wantToPrev) {
        return;
      }
      e2.preventDefault();
      if (wantToNext && !NCarousel2.isNextDisabled()) {
        NCarousel2.next();
        focusDot(NCarousel2.currentIndexRef.value);
      } else if (wantToPrev && !NCarousel2.isPrevDisabled()) {
        NCarousel2.prev();
        focusDot(NCarousel2.currentIndexRef.value);
      }
    }
    function focusDot(index2) {
      var _a;
      (_a = dotElsRef.value[index2]) === null || _a === void 0 ? void 0 : _a.focus();
    }
    onBeforeUpdate(() => dotElsRef.value.length = 0);
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      dotEls: dotElsRef,
      handleKeydown,
      handleMouseenter,
      handleClick
    };
  },
  render() {
    const { mergedClsPrefix, dotEls } = this;
    return h$1("div", { class: [
      `${mergedClsPrefix}-carousel__dots`,
      `${mergedClsPrefix}-carousel__dots--${this.dotType}`
    ], role: "tablist" }, indexMap(this.total, (i2) => {
      const selected = i2 === this.currentIndex;
      return h$1("div", { "aria-selected": selected, ref: (el) => dotEls.push(el), role: "button", tabindex: "0", class: [
        `${mergedClsPrefix}-carousel__dot`,
        selected && `${mergedClsPrefix}-carousel__dot--active`
      ], key: i2, onClick: () => {
        this.handleClick(i2);
      }, onMouseenter: () => {
        this.handleMouseenter(i2);
      }, onKeydown: (e2) => {
        this.handleKeydown(e2, i2);
      } });
    }));
  }
});
const backwardIcon = h$1(
  "svg",
  { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16" },
  h$1(
    "g",
    { fill: "none" },
    h$1("path", { d: "M10.26 3.2a.75.75 0 0 1 .04 1.06L6.773 8l3.527 3.74a.75.75 0 1 1-1.1 1.02l-4-4.25a.75.75 0 0 1 0-1.02l4-4.25a.75.75 0 0 1 1.06-.04z", fill: "currentColor" })
  )
);
const forwardIcon = h$1(
  "svg",
  { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16" },
  h$1(
    "g",
    { fill: "none" },
    h$1("path", { d: "M5.74 3.2a.75.75 0 0 0-.04 1.06L9.227 8L5.7 11.74a.75.75 0 1 0 1.1 1.02l4-4.25a.75.75 0 0 0 0-1.02l-4-4.25a.75.75 0 0 0-1.06-.04z", fill: "currentColor" })
  )
);
const NCarouselArrow = /* @__PURE__ */ defineComponent({
  name: "CarouselArrow",
  setup(props) {
    const { mergedClsPrefixRef } = useConfig(props);
    const { isVertical, isPrevDisabled, isNextDisabled, prev, next } = useCarouselContext();
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      isVertical,
      isPrevDisabled,
      isNextDisabled,
      prev,
      next
    };
  },
  render() {
    const { mergedClsPrefix } = this;
    return h$1(
      "div",
      { class: `${mergedClsPrefix}-carousel__arrow-group` },
      h$1("div", { class: [
        `${mergedClsPrefix}-carousel__arrow`,
        this.isPrevDisabled() && `${mergedClsPrefix}-carousel__arrow--disabled`
      ], role: "button", onClick: this.prev }, backwardIcon),
      h$1("div", { class: [
        `${mergedClsPrefix}-carousel__arrow`,
        this.isNextDisabled() && `${mergedClsPrefix}-carousel__arrow--disabled`
      ], role: "button", onClick: this.next }, forwardIcon)
    );
  }
});
const CarouselItemName = "CarouselItem";
const isCarouselItem = (child) => {
  var _a;
  return ((_a = child.type) === null || _a === void 0 ? void 0 : _a.name) === CarouselItemName;
};
const NCarouselItem = /* @__PURE__ */ defineComponent({
  name: CarouselItemName,
  setup(props) {
    const { mergedClsPrefixRef } = useConfig(props);
    const NCarousel2 = useCarouselContext(camelCase$1(CarouselItemName), `n-${camelCase$1(CarouselItemName)}`);
    const selfElRef = ref();
    const indexRef = computed(() => {
      const { value: selfEl } = selfElRef;
      return selfEl ? NCarousel2.getSlideIndex(selfEl) : -1;
    });
    const isPrevRef = computed(() => NCarousel2.isPrev(indexRef.value));
    const isNextRef = computed(() => NCarousel2.isNext(indexRef.value));
    const isActiveRef = computed(() => NCarousel2.isActive(indexRef.value));
    const styleRef = computed(() => NCarousel2.getSlideStyle(indexRef.value));
    onMounted(() => {
      NCarousel2.addSlide(selfElRef.value);
    });
    onBeforeUnmount(() => {
      NCarousel2.removeSlide(selfElRef.value);
    });
    function handleClick(event) {
      const { value: index2 } = indexRef;
      if (index2 !== void 0) {
        NCarousel2 === null || NCarousel2 === void 0 ? void 0 : NCarousel2.onCarouselItemClick(index2, event);
      }
    }
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      selfElRef,
      isPrev: isPrevRef,
      isNext: isNextRef,
      isActive: isActiveRef,
      index: indexRef,
      style: styleRef,
      handleClick
    };
  },
  render() {
    var _a;
    const { $slots: slots, mergedClsPrefix, isPrev, isNext, isActive, index: index2, style: style2 } = this;
    const className = [
      `${mergedClsPrefix}-carousel__slide`,
      {
        [`${mergedClsPrefix}-carousel__slide--current`]: isActive,
        [`${mergedClsPrefix}-carousel__slide--prev`]: isPrev,
        [`${mergedClsPrefix}-carousel__slide--next`]: isNext
      }
    ];
    return h$1("div", {
      ref: "selfElRef",
      class: className,
      role: "option",
      tabindex: "-1",
      "data-index": index2,
      "aria-hidden": !isActive,
      style: style2,
      // We use ts-ignore for vue-tsc, since it seems to patch native event
      // for vue components
      // @ts-expect-error vue's tsx has type for capture events
      onClickCapture: this.handleClick
    }, (_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots, {
      isPrev,
      isNext,
      isActive,
      index: index2
    }));
  }
});
const style$2 = cB("carousel", `
 position: relative;
 width: 100%;
 height: 100%;
 touch-action: pan-y;
 overflow: hidden;
`, [cE("slides", `
 display: flex;
 width: 100%;
 height: 100%;
 transition-timing-function: var(--n-bezier);
 transition-property: transform;
 `, [cE("slide", `
 flex-shrink: 0;
 position: relative;
 width: 100%;
 height: 100%;
 outline: none;
 overflow: hidden;
 `, [c$1("> img", `
 display: block;
 `)])]), cE("dots", `
 position: absolute;
 display: flex;
 flex-wrap: nowrap;
 `, [cM("dot", [cE("dot", `
 height: var(--n-dot-size);
 width: var(--n-dot-size);
 background-color: var(--n-dot-color);
 border-radius: 50%;
 cursor: pointer;
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 outline: none;
 `, [c$1("&:focus", `
 background-color: var(--n-dot-color-focus);
 `), cM("active", `
 background-color: var(--n-dot-color-active);
 `)])]), cM("line", [cE("dot", `
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
 `, [c$1("&:focus", `
 background-color: var(--n-dot-color-focus);
 `), cM("active", `
 width: var(--n-dot-line-width-active);
 background-color: var(--n-dot-color-active);
 `)])])]), cE("arrow", `
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
 `, [c$1("svg", `
 height: 1em;
 width: 1em;
 `), c$1("&:hover", `
 background-color: rgba(255, 255, 255, .3);
 `)]), cM("vertical", `
 touch-action: pan-x;
 `, [cE("slides", `
 flex-direction: column;
 `), cM("fade", [cE("slide", `
 top: 50%;
 left: unset;
 transform: translateY(-50%);
 `)]), cM("card", [cE("slide", `
 top: 50%;
 left: unset;
 transform: translateY(-50%) translateZ(-400px);
 `, [cM("current", `
 transform: translateY(-50%) translateZ(0);
 `), cM("prev", `
 transform: translateY(-100%) translateZ(-200px);
 `), cM("next", `
 transform: translateY(0%) translateZ(-200px);
 `)])])]), cM("usercontrol", [cE("slides", [c$1(">", [c$1("div", `
 position: absolute;
 top: 50%;
 left: 50%;
 width: 100%;
 height: 100%;
 transform: translate(-50%, -50%);
 `)])])]), cM("left", [cE("dots", `
 transform: translateY(-50%);
 top: 50%;
 left: 12px;
 flex-direction: column;
 `, [cM("line", [cE("dot", `
 width: 4px;
 height: var(--n-dot-line-width);
 margin: 4px 0;
 transition:
 height .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 outline: none;
 `, [cM("active", `
 height: var(--n-dot-line-width-active);
 `)])])]), cE("dot", `
 margin: 4px 0;
 `)]), cE("arrow-group", `
 position: absolute;
 display: flex;
 flex-wrap: nowrap;
 `), cM("vertical", [cE("arrow", `
 transform: rotate(90deg);
 `)]), cM("show-arrow", [cM("bottom", [cE("dots", `
 transform: translateX(0);
 bottom: 18px;
 left: 18px;
 `)]), cM("top", [cE("dots", `
 transform: translateX(0);
 top: 18px;
 left: 18px;
 `)]), cM("left", [cE("dots", `
 transform: translateX(0);
 top: 18px;
 left: 18px;
 `)]), cM("right", [cE("dots", `
 transform: translateX(0);
 top: 18px;
 right: 18px;
 `)])]), cM("left", [cE("arrow-group", `
 bottom: 12px;
 left: 12px;
 flex-direction: column;
 `, [c$1("> *:first-child", `
 margin-bottom: 12px;
 `)])]), cM("right", [cE("dots", `
 transform: translateY(-50%);
 top: 50%;
 right: 12px;
 flex-direction: column;
 `, [cM("line", [cE("dot", `
 width: 4px;
 height: var(--n-dot-line-width);
 margin: 4px 0;
 transition:
 height .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 outline: none;
 `, [cM("active", `
 height: var(--n-dot-line-width-active);
 `)])])]), cE("dot", `
 margin: 4px 0;
 `), cE("arrow-group", `
 bottom: 12px;
 right: 12px;
 flex-direction: column;
 `, [c$1("> *:first-child", `
 margin-bottom: 12px;
 `)])]), cM("top", [cE("dots", `
 transform: translateX(-50%);
 top: 12px;
 left: 50%;
 `, [cM("line", [cE("dot", `
 margin: 0 4px;
 `)])]), cE("dot", `
 margin: 0 4px;
 `), cE("arrow-group", `
 top: 12px;
 right: 12px;
 `, [c$1("> *:first-child", `
 margin-right: 12px;
 `)])]), cM("bottom", [cE("dots", `
 transform: translateX(-50%);
 bottom: 12px;
 left: 50%;
 `, [cM("line", [cE("dot", `
 margin: 0 4px;
 `)])]), cE("dot", `
 margin: 0 4px;
 `), cE("arrow-group", `
 bottom: 12px;
 right: 12px;
 `, [c$1("> *:first-child", `
 margin-right: 12px;
 `)])]), cM("fade", [cE("slide", `
 position: absolute;
 opacity: 0;
 transition-property: opacity;
 pointer-events: none;
 `, [cM("current", `
 opacity: 1;
 pointer-events: auto;
 `)])]), cM("card", [cE("slides", `
 perspective: 1000px;
 `), cE("slide", `
 position: absolute;
 left: 50%;
 opacity: 0;
 transform: translateX(-50%) translateZ(-400px);
 transition-property: opacity, transform;
 `, [cM("current", `
 opacity: 1;
 transform: translateX(-50%) translateZ(0);
 z-index: 1;
 `), cM("prev", `
 opacity: 0.4;
 transform: translateX(-100%) translateZ(-200px);
 `), cM("next", `
 opacity: 0.4;
 transform: translateX(0%) translateZ(-200px);
 `)])])]);
const transitionProperties = [
  "transitionDuration",
  "transitionTimingFunction"
];
const carouselProps = Object.assign(Object.assign({}, useTheme.props), { defaultIndex: {
  type: Number,
  default: 0
}, currentIndex: Number, showArrow: Boolean, dotType: {
  type: String,
  default: "dot"
}, dotPlacement: {
  type: String,
  default: "bottom"
}, slidesPerView: {
  type: [Number, String],
  default: 1
}, spaceBetween: {
  type: Number,
  default: 0
}, centeredSlides: Boolean, direction: {
  type: String,
  default: "horizontal"
}, autoplay: Boolean, interval: {
  type: Number,
  default: 5e3
}, loop: {
  type: Boolean,
  default: true
}, effect: {
  type: String,
  default: "slide"
}, showDots: {
  type: Boolean,
  default: true
}, trigger: {
  type: String,
  default: "click"
}, transitionStyle: {
  type: Object,
  default: () => ({
    transitionDuration: "300ms"
  })
}, transitionProps: Object, draggable: Boolean, prevSlideStyle: [Object, String], nextSlideStyle: [Object, String], touchable: {
  type: Boolean,
  default: true
}, mousewheel: Boolean, keyboard: Boolean, "onUpdate:currentIndex": Function, onUpdateCurrentIndex: Function });
let globalDragging = false;
const NCarousel = /* @__PURE__ */ defineComponent({
  name: "Carousel",
  props: carouselProps,
  setup(props) {
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props);
    const selfElRef = ref(null);
    const slidesElRef = ref(null);
    const slideElsRef = ref([]);
    const slideVNodesRef = { value: [] };
    const verticalRef = computed(() => props.direction === "vertical");
    const sizeAxisRef = computed(() => verticalRef.value ? "height" : "width");
    const spaceAxisRef = computed(() => verticalRef.value ? "bottom" : "right");
    const sequenceLayoutRef = computed(() => props.effect === "slide");
    const duplicatedableRef = computed(
      // duplicate the copy operation in `slide` mode,
      // because only its DOM is sequence layout
      () => props.loop && props.slidesPerView === 1 && sequenceLayoutRef.value
    );
    const userWantsControlRef = computed(() => props.effect === "custom");
    const displaySlidesPerViewRef = computed(() => !sequenceLayoutRef.value || props.centeredSlides ? 1 : props.slidesPerView);
    const realSlidesPerViewRef = computed(() => userWantsControlRef.value ? 1 : props.slidesPerView);
    const autoSlideSizeRef = computed(() => displaySlidesPerViewRef.value === "auto" || props.slidesPerView === "auto" && props.centeredSlides);
    const perViewSizeRef = ref({ width: 0, height: 0 });
    const slideSizesRef = computed(() => {
      const { value: slidesEls } = slideElsRef;
      if (!slidesEls.length)
        return [];
      const { value: autoSlideSize } = autoSlideSizeRef;
      if (autoSlideSize) {
        return slidesEls.map((slide) => calculateSize(slide));
      }
      const { value: slidesPerView } = realSlidesPerViewRef;
      const { value: perViewSize } = perViewSizeRef;
      const { value: axis } = sizeAxisRef;
      let axisSize = perViewSize[axis];
      if (slidesPerView !== "auto") {
        const { spaceBetween } = props;
        const remaining = axisSize - (slidesPerView - 1) * spaceBetween;
        const percentage = 1 / Math.max(1, slidesPerView);
        axisSize = remaining * percentage;
      }
      const slideSize = Object.assign(Object.assign({}, perViewSize), { [axis]: axisSize });
      return slidesEls.map(() => slideSize);
    });
    const slideTranlatesRef = computed(() => {
      const { value: slideSizes } = slideSizesRef;
      if (!slideSizes.length)
        return [];
      const { centeredSlides, spaceBetween } = props;
      const { value: axis } = sizeAxisRef;
      const { [axis]: perViewSize } = perViewSizeRef.value;
      let previousTranslate2 = 0;
      return slideSizes.map(({ [axis]: slideSize }) => {
        let translate = previousTranslate2;
        if (centeredSlides) {
          translate += (slideSize - perViewSize) / 2;
        }
        previousTranslate2 += slideSize + spaceBetween;
        return translate;
      });
    });
    const isMountedRef = ref(false);
    const transitionStyleRef = computed(() => {
      const { transitionStyle } = props;
      return transitionStyle ? keep(transitionStyle, transitionProperties) : {};
    });
    const speedRef = computed(() => userWantsControlRef.value ? 0 : resolveSpeed(transitionStyleRef.value.transitionDuration));
    const slideStylesRef = computed(() => {
      const { value: slidesEls } = slideElsRef;
      if (!slidesEls.length)
        return [];
      const useComputedSize = !(autoSlideSizeRef.value || realSlidesPerViewRef.value === 1);
      const getSlideSize = (index2) => {
        if (useComputedSize) {
          const { value: axis } = sizeAxisRef;
          return {
            [axis]: `${slideSizesRef.value[index2][axis]}px`
          };
        }
      };
      if (userWantsControlRef.value) {
        return slidesEls.map((_2, i2) => getSlideSize(i2));
      }
      const { effect, spaceBetween } = props;
      const { value: spaceAxis } = spaceAxisRef;
      return slidesEls.reduce((styles, _2, i2) => {
        const style2 = Object.assign(Object.assign({}, getSlideSize(i2)), { [`margin-${spaceAxis}`]: `${spaceBetween}px` });
        styles.push(style2);
        if (isMountedRef.value && (effect === "fade" || effect === "card")) {
          Object.assign(style2, transitionStyleRef.value);
        }
        return styles;
      }, []);
    });
    const totalViewRef = computed(() => {
      const { value: slidesPerView } = displaySlidesPerViewRef;
      const { length: totalSlides } = slideElsRef.value;
      if (slidesPerView !== "auto") {
        return Math.max(totalSlides - slidesPerView, 0) + 1;
      } else {
        const { value: slideSizes } = slideSizesRef;
        const { length } = slideSizes;
        if (!length)
          return totalSlides;
        const { value: translates } = slideTranlatesRef;
        const { value: axis } = sizeAxisRef;
        const perViewSize = perViewSizeRef.value[axis];
        let lastViewSize = slideSizes[slideSizes.length - 1][axis];
        let i2 = length;
        while (i2 > 1 && lastViewSize < perViewSize) {
          i2--;
          lastViewSize += translates[i2] - translates[i2 - 1];
        }
        return clampValue(i2 + 1, 1, length);
      }
    });
    const displayTotalViewRef = computed(() => getDisplayTotalView(totalViewRef.value, duplicatedableRef.value));
    const defaultRealIndex = getRealIndex(props.defaultIndex, duplicatedableRef.value);
    const uncontrolledDisplayIndexRef = ref(getDisplayIndex(defaultRealIndex, totalViewRef.value, duplicatedableRef.value));
    const mergedDisplayIndexRef = useMergedState(toRef(props, "currentIndex"), uncontrolledDisplayIndexRef);
    const realIndexRef = computed(() => getRealIndex(mergedDisplayIndexRef.value, duplicatedableRef.value));
    function toRealIndex(index2) {
      var _a, _b;
      index2 = clampValue(index2, 0, totalViewRef.value - 1);
      const displayIndex = getDisplayIndex(index2, totalViewRef.value, duplicatedableRef.value);
      const { value: lastDisplayIndex } = mergedDisplayIndexRef;
      if (displayIndex !== mergedDisplayIndexRef.value) {
        uncontrolledDisplayIndexRef.value = displayIndex;
        (_a = props["onUpdate:currentIndex"]) === null || _a === void 0 ? void 0 : _a.call(props, displayIndex, lastDisplayIndex);
        (_b = props.onUpdateCurrentIndex) === null || _b === void 0 ? void 0 : _b.call(props, displayIndex, lastDisplayIndex);
      }
    }
    function getRealPrevIndex(index2 = realIndexRef.value) {
      return getPrevIndex(index2, totalViewRef.value, props.loop);
    }
    function getRealNextIndex(index2 = realIndexRef.value) {
      return getNextIndex(index2, totalViewRef.value, props.loop);
    }
    function isRealPrev(slideOrIndex) {
      const index2 = getSlideIndex(slideOrIndex);
      return index2 !== null && getRealPrevIndex() === index2;
    }
    function isRealNext(slideOrIndex) {
      const index2 = getSlideIndex(slideOrIndex);
      return index2 !== null && getRealNextIndex() === index2;
    }
    function isRealActive(slideOrIndex) {
      return realIndexRef.value === getSlideIndex(slideOrIndex);
    }
    function isDisplayActive(index2) {
      return mergedDisplayIndexRef.value === index2;
    }
    function isPrevDisabled() {
      return getRealPrevIndex() === null;
    }
    function isNextDisabled() {
      return getRealNextIndex() === null;
    }
    function to(index2) {
      const realIndex = clampValue(getRealIndex(index2, duplicatedableRef.value), 0, totalViewRef.value);
      if (index2 !== mergedDisplayIndexRef.value || realIndex !== realIndexRef.value) {
        toRealIndex(realIndex);
      }
    }
    function prev() {
      const prevIndex = getRealPrevIndex();
      if (prevIndex !== null)
        toRealIndex(prevIndex);
    }
    function next() {
      const nextIndex = getRealNextIndex();
      if (nextIndex !== null)
        toRealIndex(nextIndex);
    }
    function prevIfSlideTransitionEnd() {
      if (!inTransition || !duplicatedableRef.value)
        prev();
    }
    function nextIfSlideTransitionEnd() {
      if (!inTransition || !duplicatedableRef.value)
        next();
    }
    let inTransition = false;
    let previousTranslate = 0;
    const translateStyleRef = ref({});
    function updateTranslate(translate, speed = 0) {
      translateStyleRef.value = Object.assign({}, transitionStyleRef.value, {
        transform: verticalRef.value ? `translateY(${-translate}px)` : `translateX(${-translate}px)`,
        transitionDuration: `${speed}ms`
      });
    }
    function fixTranslate(speed = 0) {
      if (sequenceLayoutRef.value) {
        translateTo(realIndexRef.value, speed);
      } else if (previousTranslate !== 0) {
        if (!inTransition && speed > 0) {
          inTransition = true;
        }
        updateTranslate(previousTranslate = 0, speed);
      }
    }
    function translateTo(index2, speed) {
      const translate = getTranslate(index2);
      if (translate !== previousTranslate && speed > 0) {
        inTransition = true;
      }
      previousTranslate = getTranslate(realIndexRef.value);
      updateTranslate(translate, speed);
    }
    function getTranslate(index2) {
      let translate;
      if (index2 >= totalViewRef.value - 1) {
        translate = getLastViewTranslate();
      } else {
        translate = slideTranlatesRef.value[index2] || 0;
      }
      return translate;
    }
    function getLastViewTranslate() {
      if (displaySlidesPerViewRef.value === "auto") {
        const { value: axis } = sizeAxisRef;
        const { [axis]: perViewSize } = perViewSizeRef.value;
        const { value: translates } = slideTranlatesRef;
        const lastTranslate = translates[translates.length - 1];
        let overallSize;
        if (lastTranslate === void 0) {
          overallSize = perViewSize;
        } else {
          const { value: slideSizes } = slideSizesRef;
          overallSize = lastTranslate + slideSizes[slideSizes.length - 1][axis];
        }
        return overallSize - perViewSize;
      } else {
        const { value: translates } = slideTranlatesRef;
        return translates[totalViewRef.value - 1] || 0;
      }
    }
    const carouselContext = {
      currentIndexRef: mergedDisplayIndexRef,
      to,
      prev: prevIfSlideTransitionEnd,
      next: nextIfSlideTransitionEnd,
      isVertical: () => verticalRef.value,
      isHorizontal: () => !verticalRef.value,
      isPrev: isRealPrev,
      isNext: isRealNext,
      isActive: isRealActive,
      isPrevDisabled,
      isNextDisabled,
      getSlideIndex,
      getSlideStyle,
      addSlide,
      removeSlide,
      onCarouselItemClick
    };
    provideCarouselContext(carouselContext);
    function addSlide(slide) {
      if (!slide)
        return;
      slideElsRef.value.push(slide);
    }
    function removeSlide(slide) {
      if (!slide)
        return;
      const index2 = getSlideIndex(slide);
      if (index2 !== -1) {
        slideElsRef.value.splice(index2, 1);
      }
    }
    function getSlideIndex(slideOrIndex) {
      return typeof slideOrIndex === "number" ? slideOrIndex : slideOrIndex ? slideElsRef.value.indexOf(slideOrIndex) : -1;
    }
    function getSlideStyle(slide) {
      const index2 = getSlideIndex(slide);
      if (index2 !== -1) {
        const styles = [slideStylesRef.value[index2]];
        const isPrev = carouselContext.isPrev(index2);
        const isNext = carouselContext.isNext(index2);
        if (isPrev) {
          styles.push(props.prevSlideStyle || "");
        }
        if (isNext) {
          styles.push(props.nextSlideStyle || "");
        }
        return normalizeStyle(styles);
      }
    }
    function onCarouselItemClick(index2, event) {
      let allowClick = !inTransition && !dragging && !isEffectiveDrag;
      if (props.effect === "card" && allowClick && !isRealActive(index2)) {
        to(index2);
        allowClick = false;
      }
      if (!allowClick) {
        event.preventDefault();
        event.stopPropagation();
      }
    }
    let autoplayTimer = null;
    function stopAutoplay() {
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    }
    function resetAutoplay() {
      stopAutoplay();
      const disabled = !props.autoplay || displayTotalViewRef.value < 2;
      if (!disabled) {
        autoplayTimer = window.setInterval(next, props.interval);
      }
    }
    let dragStartX = 0;
    let dragStartY = 0;
    let dragOffset = 0;
    let dragStartTime = 0;
    let dragging = false;
    let isEffectiveDrag = false;
    function handleTouchstart(event) {
      var _a;
      if (globalDragging)
        return;
      if (!((_a = slidesElRef.value) === null || _a === void 0 ? void 0 : _a.contains(getPreciseEventTarget(event)))) {
        return;
      }
      globalDragging = true;
      dragging = true;
      isEffectiveDrag = false;
      dragStartTime = Date.now();
      stopAutoplay();
      if (event.type !== "touchstart" && !event.target.isContentEditable) {
        event.preventDefault();
      }
      const touchEvent = isTouchEvent(event) ? event.touches[0] : event;
      if (verticalRef.value) {
        dragStartY = touchEvent.clientY;
      } else {
        dragStartX = touchEvent.clientX;
      }
      if (props.touchable) {
        on$1("touchmove", document, handleTouchmove, { passive: true });
        on$1("touchend", document, handleTouchend);
        on$1("touchcancel", document, handleTouchend);
      }
      if (props.draggable) {
        on$1("mousemove", document, handleTouchmove);
        on$1("mouseup", document, handleTouchend);
      }
    }
    function handleTouchmove(event) {
      const { value: vertical } = verticalRef;
      const { value: axis } = sizeAxisRef;
      const touchEvent = isTouchEvent(event) ? event.touches[0] : event;
      const offset = vertical ? touchEvent.clientY - dragStartY : touchEvent.clientX - dragStartX;
      const perViewSize = perViewSizeRef.value[axis];
      dragOffset = clampValue(offset, -perViewSize, perViewSize);
      if (event.cancelable) {
        event.preventDefault();
      }
      if (sequenceLayoutRef.value) {
        updateTranslate(previousTranslate - dragOffset, 0);
      }
    }
    function handleTouchend() {
      const { value: realIndex } = realIndexRef;
      let currentIndex = realIndex;
      if (!inTransition && dragOffset !== 0 && sequenceLayoutRef.value) {
        const currentTranslate = previousTranslate - dragOffset;
        const translates = [
          ...slideTranlatesRef.value.slice(0, totalViewRef.value - 1),
          getLastViewTranslate()
        ];
        let prevOffset = null;
        for (let i2 = 0; i2 < translates.length; i2++) {
          const offset = Math.abs(translates[i2] - currentTranslate);
          if (prevOffset !== null && prevOffset < offset) {
            break;
          }
          prevOffset = offset;
          currentIndex = i2;
        }
      }
      if (currentIndex === realIndex) {
        const timeElapsed = Date.now() - dragStartTime;
        const { value: axis } = sizeAxisRef;
        const perViewSize = perViewSizeRef.value[axis];
        if (dragOffset > perViewSize / 2 || dragOffset / timeElapsed > 0.4) {
          currentIndex = getRealPrevIndex(realIndex);
        } else if (dragOffset < -perViewSize / 2 || dragOffset / timeElapsed < -0.4) {
          currentIndex = getRealNextIndex(realIndex);
        }
      }
      if (currentIndex !== null && currentIndex !== realIndex) {
        isEffectiveDrag = true;
        toRealIndex(currentIndex);
        void nextTick(() => {
          if (!duplicatedableRef.value || uncontrolledDisplayIndexRef.value !== mergedDisplayIndexRef.value) {
            fixTranslate(speedRef.value);
          }
        });
      } else {
        fixTranslate(speedRef.value);
      }
      resetDragStatus();
      resetAutoplay();
    }
    function resetDragStatus() {
      if (dragging) {
        globalDragging = false;
      }
      dragging = false;
      dragStartX = 0;
      dragStartY = 0;
      dragOffset = 0;
      dragStartTime = 0;
      off("touchmove", document, handleTouchmove);
      off("touchend", document, handleTouchend);
      off("touchcancel", document, handleTouchend);
      off("mousemove", document, handleTouchmove);
      off("mouseup", document, handleTouchend);
    }
    function handleTransitionEnd() {
      if (sequenceLayoutRef.value && inTransition) {
        const { value: realIndex } = realIndexRef;
        translateTo(realIndex, 0);
      } else {
        resetAutoplay();
      }
      if (sequenceLayoutRef.value) {
        translateStyleRef.value.transitionDuration = "0ms";
      }
      inTransition = false;
    }
    function handleMousewheel(event) {
      event.preventDefault();
      if (inTransition)
        return;
      let { deltaX, deltaY } = event;
      if (event.shiftKey && !deltaX) {
        deltaX = deltaY;
      }
      const prevMultiplier = -1;
      const nextMultiplier = 1;
      const m2 = (deltaX || deltaY) > 0 ? nextMultiplier : prevMultiplier;
      let rx = 0;
      let ry = 0;
      if (verticalRef.value) {
        ry = m2;
      } else {
        rx = m2;
      }
      const responseStep = 10;
      if (ry * deltaY >= responseStep || rx * deltaX >= responseStep) {
        if (m2 === nextMultiplier && !isNextDisabled()) {
          next();
        } else if (m2 === prevMultiplier && !isPrevDisabled()) {
          prev();
        }
      }
    }
    function handleResize() {
      perViewSizeRef.value = calculateSize(selfElRef.value, true);
      resetAutoplay();
    }
    function handleSlideResize() {
      var _a, _b;
      if (autoSlideSizeRef.value) {
        (_b = (_a = slideSizesRef.effect).scheduler) === null || _b === void 0 ? void 0 : _b.call(_a);
        slideSizesRef.effect.run();
      }
    }
    function handleMouseenter() {
      if (props.autoplay) {
        stopAutoplay();
      }
    }
    function handleMouseleave() {
      if (props.autoplay) {
        resetAutoplay();
      }
    }
    onMounted(() => {
      watchEffect(resetAutoplay);
      requestAnimationFrame(() => isMountedRef.value = true);
    });
    onBeforeUnmount(() => {
      resetDragStatus();
      stopAutoplay();
    });
    onUpdated(() => {
      const { value: slidesEls } = slideElsRef;
      const { value: slideVNodes } = slideVNodesRef;
      const indexMap2 = /* @__PURE__ */ new Map();
      const getDisplayIndex2 = (el) => (
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        indexMap2.has(el) ? indexMap2.get(el) : -1
      );
      let isChanged = false;
      for (let i2 = 0; i2 < slidesEls.length; i2++) {
        const index2 = slideVNodes.findIndex((v2) => v2.el === slidesEls[i2]);
        if (index2 !== i2) {
          isChanged = true;
        }
        indexMap2.set(slidesEls[i2], index2);
      }
      if (isChanged) {
        slidesEls.sort((a2, b2) => getDisplayIndex2(a2) - getDisplayIndex2(b2));
      }
    });
    watch(realIndexRef, (realIndex, lastRealIndex) => {
      if (realIndex === lastRealIndex)
        return;
      resetAutoplay();
      if (sequenceLayoutRef.value) {
        if (duplicatedableRef.value && displayTotalViewRef.value > 2) {
          const { value: length } = totalViewRef;
          if (realIndex === length - 2 && lastRealIndex === 1) {
            realIndex = 0;
          } else if (realIndex === 1 && lastRealIndex === length - 2) {
            realIndex = length - 1;
          }
        }
        translateTo(realIndex, speedRef.value);
      } else {
        fixTranslate();
      }
    }, { immediate: true });
    watch([duplicatedableRef, displaySlidesPerViewRef], () => void nextTick(() => {
      toRealIndex(realIndexRef.value);
    }));
    watch(slideTranlatesRef, () => {
      sequenceLayoutRef.value && fixTranslate();
    }, {
      deep: true
    });
    watch(sequenceLayoutRef, (value) => {
      if (!value) {
        inTransition = false;
        updateTranslate(previousTranslate = 0);
      } else {
        fixTranslate();
      }
    });
    const slidesControlListenersRef = computed(() => {
      return {
        onTouchstartPassive: props.touchable ? handleTouchstart : void 0,
        onMousedown: props.draggable ? handleTouchstart : void 0,
        onWheel: props.mousewheel ? handleMousewheel : void 0
      };
    });
    const arrowSlotPropsRef = computed(() => Object.assign(Object.assign({}, keep(carouselContext, [
      "to",
      "prev",
      "next",
      "isPrevDisabled",
      "isNextDisabled"
    ])), { total: displayTotalViewRef.value, currentIndex: mergedDisplayIndexRef.value }));
    const dotSlotPropsRef = computed(() => ({
      total: displayTotalViewRef.value,
      currentIndex: mergedDisplayIndexRef.value,
      to: carouselContext.to
    }));
    const caroulseExposedMethod = {
      getCurrentIndex: () => mergedDisplayIndexRef.value,
      to,
      prev,
      next
    };
    const themeRef = useTheme("Carousel", "-carousel", style$2, carouselLight$1, props, mergedClsPrefixRef);
    const cssVarsRef = computed(() => {
      const { common: { cubicBezierEaseInOut: cubicBezierEaseInOut2 }, self: { dotSize, dotColor, dotColorActive, dotColorFocus, dotLineWidth, dotLineWidthActive, arrowColor } } = themeRef.value;
      return {
        "--n-bezier": cubicBezierEaseInOut2,
        "--n-dot-color": dotColor,
        "--n-dot-color-focus": dotColorFocus,
        "--n-dot-color-active": dotColorActive,
        "--n-dot-size": dotSize,
        "--n-dot-line-width": dotLineWidth,
        "--n-dot-line-width-active": dotLineWidthActive,
        "--n-arrow-color": arrowColor
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass("carousel", void 0, cssVarsRef, props) : void 0;
    return Object.assign(Object.assign({
      mergedClsPrefix: mergedClsPrefixRef,
      selfElRef,
      slidesElRef,
      slideVNodes: slideVNodesRef,
      duplicatedable: duplicatedableRef,
      userWantsControl: userWantsControlRef,
      autoSlideSize: autoSlideSizeRef,
      displayIndex: mergedDisplayIndexRef,
      realIndex: realIndexRef,
      slideStyles: slideStylesRef,
      translateStyle: translateStyleRef,
      slidesControlListeners: slidesControlListenersRef,
      handleTransitionEnd,
      handleResize,
      handleSlideResize,
      handleMouseenter,
      handleMouseleave,
      isActive: isDisplayActive,
      arrowSlotProps: arrowSlotPropsRef,
      dotSlotProps: dotSlotPropsRef
    }, caroulseExposedMethod), { cssVars: inlineThemeDisabled ? void 0 : cssVarsRef, themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass, onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender });
  },
  render() {
    var _a;
    const { mergedClsPrefix, showArrow, userWantsControl, slideStyles, dotType, dotPlacement, slidesControlListeners, transitionProps = {}, arrowSlotProps, dotSlotProps, $slots: { default: defaultSlot, dots: dotsSlot, arrow: arrowSlot } } = this;
    const children = defaultSlot && flatten(defaultSlot()) || [];
    let slides = filterCarouselItem(children);
    if (!slides.length) {
      slides = children.map((ch) => h$1(NCarouselItem, null, {
        default: () => cloneVNode(ch)
      }));
    }
    if (this.duplicatedable) {
      slides = addDuplicateSlides(slides);
    }
    this.slideVNodes.value = slides;
    if (this.autoSlideSize) {
      slides = slides.map((slide) => h$1(VResizeObserver, { onResize: this.handleSlideResize }, {
        default: () => slide
      }));
    }
    (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
    return h$1(
      "div",
      Object.assign({ ref: "selfElRef", class: [
        this.themeClass,
        `${mergedClsPrefix}-carousel`,
        this.direction === "vertical" && `${mergedClsPrefix}-carousel--vertical`,
        this.showArrow && `${mergedClsPrefix}-carousel--show-arrow`,
        `${mergedClsPrefix}-carousel--${dotPlacement}`,
        `${mergedClsPrefix}-carousel--${this.direction}`,
        `${mergedClsPrefix}-carousel--${this.effect}`,
        userWantsControl && `${mergedClsPrefix}-carousel--usercontrol`
      ], style: this.cssVars }, slidesControlListeners, { onMouseenter: this.handleMouseenter, onMouseleave: this.handleMouseleave }),
      h$1(VResizeObserver, { onResize: this.handleResize }, {
        default: () => h$1("div", { ref: "slidesElRef", class: `${mergedClsPrefix}-carousel__slides`, role: "listbox", style: this.translateStyle, onTransitionend: this.handleTransitionEnd }, userWantsControl ? slides.map((slide, i2) => h$1("div", { style: slideStyles[i2], key: i2 }, withDirectives(h$1(Transition, Object.assign({}, transitionProps), {
          default: () => slide
        }), [[vShow, this.isActive(i2)]]))) : slides)
      }),
      this.showDots && dotSlotProps.total > 1 && resolveSlotWithProps(dotsSlot, dotSlotProps, () => [
        h$1(NCarouselDots, { key: dotType + dotPlacement, total: dotSlotProps.total, currentIndex: dotSlotProps.currentIndex, dotType, trigger: this.trigger, keyboard: this.keyboard })
      ]),
      showArrow && resolveSlotWithProps(arrowSlot, arrowSlotProps, () => [
        h$1(NCarouselArrow, null)
      ])
    );
  }
});
function filterCarouselItem(vnodes) {
  return vnodes.reduce((carouselItems, vnode) => {
    if (isCarouselItem(vnode)) {
      carouselItems.push(vnode);
    }
    return carouselItems;
  }, []);
}
const commonVariables = {
  radioSizeSmall: "14px",
  radioSizeMedium: "16px",
  radioSizeLarge: "18px",
  labelPadding: "0 8px",
  labelFontWeight: "400"
};
const self$2 = (vars) => {
  const { borderColor, primaryColor, baseColor, textColorDisabled, inputColorDisabled, textColor2, opacityDisabled, borderRadius, fontSizeSmall, fontSizeMedium, fontSizeLarge, heightSmall, heightMedium, heightLarge, lineHeight } = vars;
  return Object.assign(Object.assign({}, commonVariables), {
    labelLineHeight: lineHeight,
    buttonHeightSmall: heightSmall,
    buttonHeightMedium: heightMedium,
    buttonHeightLarge: heightLarge,
    fontSizeSmall,
    fontSizeMedium,
    fontSizeLarge,
    boxShadow: `inset 0 0 0 1px ${borderColor}`,
    boxShadowActive: `inset 0 0 0 1px ${primaryColor}`,
    boxShadowFocus: `inset 0 0 0 1px ${primaryColor}, 0 0 0 2px ${changeColor(primaryColor, { alpha: 0.2 })}`,
    boxShadowHover: `inset 0 0 0 1px ${primaryColor}`,
    boxShadowDisabled: `inset 0 0 0 1px ${borderColor}`,
    color: baseColor,
    colorDisabled: inputColorDisabled,
    colorActive: "#0000",
    textColor: textColor2,
    textColorDisabled,
    dotColorActive: primaryColor,
    dotColorDisabled: borderColor,
    buttonBorderColor: borderColor,
    buttonBorderColorActive: primaryColor,
    buttonBorderColorHover: borderColor,
    buttonColor: baseColor,
    buttonColorActive: baseColor,
    buttonTextColor: textColor2,
    buttonTextColorActive: primaryColor,
    buttonTextColorHover: primaryColor,
    opacityDisabled,
    buttonBoxShadowFocus: `inset 0 0 0 1px ${primaryColor}, 0 0 0 2px ${changeColor(primaryColor, { alpha: 0.3 })}`,
    buttonBoxShadowHover: "inset 0 0 0 1px #0000",
    buttonBoxShadow: "inset 0 0 0 1px #0000",
    buttonBorderRadius: borderRadius
  });
};
const radioLight = {
  name: "Radio",
  common: commonLight,
  self: self$2
};
const radioLight$1 = radioLight;
const radioProps = {
  name: String,
  value: {
    type: [String, Number, Boolean],
    default: "on"
  },
  checked: {
    type: Boolean,
    default: void 0
  },
  defaultChecked: Boolean,
  disabled: {
    type: Boolean,
    default: void 0
  },
  label: String,
  size: String,
  onUpdateChecked: [Function, Array],
  "onUpdate:checked": [Function, Array],
  // deprecated
  checkedValue: {
    type: Boolean,
    default: void 0
  }
};
const radioGroupInjectionKey = createInjectionKey("n-radio-group");
function setup(props) {
  const formItem = useFormItem(props, {
    mergedSize(NFormItem) {
      const { size: size2 } = props;
      if (size2 !== void 0)
        return size2;
      if (NRadioGroup2) {
        const { mergedSizeRef: { value: mergedSize } } = NRadioGroup2;
        if (mergedSize !== void 0) {
          return mergedSize;
        }
      }
      if (NFormItem) {
        return NFormItem.mergedSize.value;
      }
      return "medium";
    },
    mergedDisabled(NFormItem) {
      if (props.disabled)
        return true;
      if (NRadioGroup2 === null || NRadioGroup2 === void 0 ? void 0 : NRadioGroup2.disabledRef.value)
        return true;
      if (NFormItem === null || NFormItem === void 0 ? void 0 : NFormItem.disabled.value)
        return true;
      return false;
    }
  });
  const { mergedSizeRef, mergedDisabledRef } = formItem;
  const inputRef = ref(null);
  const labelRef = ref(null);
  const NRadioGroup2 = inject(radioGroupInjectionKey, null);
  const uncontrolledCheckedRef = ref(props.defaultChecked);
  const controlledCheckedRef = toRef(props, "checked");
  const mergedCheckedRef = useMergedState(controlledCheckedRef, uncontrolledCheckedRef);
  const renderSafeCheckedRef = useMemo(() => {
    if (NRadioGroup2)
      return NRadioGroup2.valueRef.value === props.value;
    return mergedCheckedRef.value;
  });
  const mergedNameRef = useMemo(() => {
    const { name } = props;
    if (name !== void 0)
      return name;
    if (NRadioGroup2)
      return NRadioGroup2.nameRef.value;
  });
  const focusRef = ref(false);
  function doUpdateChecked() {
    if (NRadioGroup2) {
      const { doUpdateValue } = NRadioGroup2;
      const { value } = props;
      call(doUpdateValue, value);
    } else {
      const { onUpdateChecked, "onUpdate:checked": _onUpdateChecked } = props;
      const { nTriggerFormInput, nTriggerFormChange } = formItem;
      if (onUpdateChecked)
        call(onUpdateChecked, true);
      if (_onUpdateChecked)
        call(_onUpdateChecked, true);
      nTriggerFormInput();
      nTriggerFormChange();
      uncontrolledCheckedRef.value = true;
    }
  }
  function toggle() {
    if (mergedDisabledRef.value)
      return;
    if (!renderSafeCheckedRef.value) {
      doUpdateChecked();
    }
  }
  function handleRadioInputChange() {
    toggle();
  }
  function handleRadioInputBlur() {
    focusRef.value = false;
  }
  function handleRadioInputFocus() {
    focusRef.value = true;
  }
  return {
    mergedClsPrefix: NRadioGroup2 ? NRadioGroup2.mergedClsPrefixRef : useConfig(props).mergedClsPrefixRef,
    inputRef,
    labelRef,
    mergedName: mergedNameRef,
    mergedDisabled: mergedDisabledRef,
    uncontrolledChecked: uncontrolledCheckedRef,
    renderSafeChecked: renderSafeCheckedRef,
    focus: focusRef,
    mergedSize: mergedSizeRef,
    handleRadioInputChange,
    handleRadioInputBlur,
    handleRadioInputFocus
  };
}
const style$1 = cB("radio-group", `
 display: inline-block;
 font-size: var(--n-font-size);
`, [cE("splitor", `
 display: inline-block;
 vertical-align: bottom;
 width: 1px;
 transition:
 background-color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 background: var(--n-button-border-color);
 `, [cM("checked", {
  backgroundColor: "var(--n-button-border-color-active)"
}), cM("disabled", {
  opacity: "var(--n-opacity-disabled)"
})]), cM("button-group", `
 white-space: nowrap;
 height: var(--n-height);
 line-height: var(--n-height);
 `, [cB("radio-button", {
  height: "var(--n-height)",
  lineHeight: "var(--n-height)"
}), cE("splitor", {
  height: "var(--n-height)"
})]), cB("radio-button", `
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
 `, [cB("radio-input", `
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
 `), cE("state-border", `
 z-index: 1;
 pointer-events: none;
 position: absolute;
 box-shadow: var(--n-button-box-shadow);
 transition: box-shadow .3s var(--n-bezier);
 left: -1px;
 bottom: -1px;
 right: -1px;
 top: -1px;
 `), c$1("&:first-child", `
 border-top-left-radius: var(--n-button-border-radius);
 border-bottom-left-radius: var(--n-button-border-radius);
 border-left: 1px solid var(--n-button-border-color);
 `, [cE("state-border", `
 border-top-left-radius: var(--n-button-border-radius);
 border-bottom-left-radius: var(--n-button-border-radius);
 `)]), c$1("&:last-child", `
 border-top-right-radius: var(--n-button-border-radius);
 border-bottom-right-radius: var(--n-button-border-radius);
 border-right: 1px solid var(--n-button-border-color);
 `, [cE("state-border", `
 border-top-right-radius: var(--n-button-border-radius);
 border-bottom-right-radius: var(--n-button-border-radius);
 `)]), cNotM("disabled", `
 cursor: pointer;
 `, [c$1("&:hover", [cE("state-border", `
 transition: box-shadow .3s var(--n-bezier);
 box-shadow: var(--n-button-box-shadow-hover);
 `), cNotM("checked", {
  color: "var(--n-button-text-color-hover)"
})]), cM("focus", [c$1("&:not(:active)", [cE("state-border", {
  boxShadow: "var(--n-button-box-shadow-focus)"
})])])]), cM("checked", `
 background: var(--n-button-color-active);
 color: var(--n-button-text-color-active);
 border-color: var(--n-button-border-color-active);
 `), cM("disabled", `
 cursor: not-allowed;
 opacity: var(--n-opacity-disabled);
 `)])]);
function mapSlot(defaultSlot, value, clsPrefix) {
  var _a;
  const children = [];
  let isButtonGroup = false;
  for (let i2 = 0; i2 < defaultSlot.length; ++i2) {
    const wrappedInstance = defaultSlot[i2];
    const name = (_a = wrappedInstance.type) === null || _a === void 0 ? void 0 : _a.name;
    if (name === "RadioButton") {
      isButtonGroup = true;
    }
    const instanceProps = wrappedInstance.props;
    if (name !== "RadioButton") {
      children.push(wrappedInstance);
      continue;
    }
    if (i2 === 0) {
      children.push(wrappedInstance);
    } else {
      const lastInstanceProps = children[children.length - 1].props;
      const lastInstanceChecked = value === lastInstanceProps.value;
      const lastInstanceDisabled = lastInstanceProps.disabled;
      const currentInstanceChecked = value === instanceProps.value;
      const currentInstanceDisabled = instanceProps.disabled;
      const lastInstancePriority = (lastInstanceChecked ? 2 : 0) + (!lastInstanceDisabled ? 1 : 0);
      const currentInstancePriority = (currentInstanceChecked ? 2 : 0) + (!currentInstanceDisabled ? 1 : 0);
      const lastInstanceClass = {
        [`${clsPrefix}-radio-group__splitor--disabled`]: lastInstanceDisabled,
        [`${clsPrefix}-radio-group__splitor--checked`]: lastInstanceChecked
      };
      const currentInstanceClass = {
        [`${clsPrefix}-radio-group__splitor--disabled`]: currentInstanceDisabled,
        [`${clsPrefix}-radio-group__splitor--checked`]: currentInstanceChecked
      };
      const splitorClass = lastInstancePriority < currentInstancePriority ? currentInstanceClass : lastInstanceClass;
      children.push(h$1("div", { class: [`${clsPrefix}-radio-group__splitor`, splitorClass] }), wrappedInstance);
    }
  }
  return {
    children,
    isButtonGroup
  };
}
const radioGroupProps = Object.assign(Object.assign({}, useTheme.props), { name: String, value: [String, Number, Boolean], defaultValue: {
  type: [String, Number, Boolean],
  default: null
}, size: String, disabled: {
  type: Boolean,
  default: void 0
}, "onUpdate:value": [Function, Array], onUpdateValue: [Function, Array] });
const NRadioGroup = /* @__PURE__ */ defineComponent({
  name: "RadioGroup",
  props: radioGroupProps,
  setup(props) {
    const selfElRef = ref(null);
    const { mergedSizeRef, mergedDisabledRef, nTriggerFormChange, nTriggerFormInput, nTriggerFormBlur, nTriggerFormFocus } = useFormItem(props);
    const { mergedClsPrefixRef, inlineThemeDisabled, mergedRtlRef } = useConfig(props);
    const themeRef = useTheme("Radio", "-radio-group", style$1, radioLight$1, props, mergedClsPrefixRef);
    const uncontrolledValueRef = ref(props.defaultValue);
    const controlledValueRef = toRef(props, "value");
    const mergedValueRef = useMergedState(controlledValueRef, uncontrolledValueRef);
    function doUpdateValue(value) {
      const { onUpdateValue, "onUpdate:value": _onUpdateValue } = props;
      if (onUpdateValue) {
        call(onUpdateValue, value);
      }
      if (_onUpdateValue) {
        call(_onUpdateValue, value);
      }
      uncontrolledValueRef.value = value;
      nTriggerFormChange();
      nTriggerFormInput();
    }
    function handleFocusin(e2) {
      const { value: selfEl } = selfElRef;
      if (!selfEl)
        return;
      if (selfEl.contains(e2.relatedTarget))
        return;
      nTriggerFormFocus();
    }
    function handleFocusout(e2) {
      const { value: selfEl } = selfElRef;
      if (!selfEl)
        return;
      if (selfEl.contains(e2.relatedTarget))
        return;
      nTriggerFormBlur();
    }
    provide(radioGroupInjectionKey, {
      mergedClsPrefixRef,
      nameRef: toRef(props, "name"),
      valueRef: mergedValueRef,
      disabledRef: mergedDisabledRef,
      mergedSizeRef,
      doUpdateValue
    });
    const rtlEnabledRef = useRtl("Radio", mergedRtlRef, mergedClsPrefixRef);
    const cssVarsRef = computed(() => {
      const { value: size2 } = mergedSizeRef;
      const { common: { cubicBezierEaseInOut: cubicBezierEaseInOut2 }, self: { buttonBorderColor, buttonBorderColorActive, buttonBorderRadius, buttonBoxShadow, buttonBoxShadowFocus, buttonBoxShadowHover, buttonColorActive, buttonTextColor, buttonTextColorActive, buttonTextColorHover, opacityDisabled, [createKey("buttonHeight", size2)]: height, [createKey("fontSize", size2)]: fontSize } } = themeRef.value;
      return {
        "--n-font-size": fontSize,
        "--n-bezier": cubicBezierEaseInOut2,
        "--n-button-border-color": buttonBorderColor,
        "--n-button-border-color-active": buttonBorderColorActive,
        "--n-button-border-radius": buttonBorderRadius,
        "--n-button-box-shadow": buttonBoxShadow,
        "--n-button-box-shadow-focus": buttonBoxShadowFocus,
        "--n-button-box-shadow-hover": buttonBoxShadowHover,
        "--n-button-color-active": buttonColorActive,
        "--n-button-text-color": buttonTextColor,
        "--n-button-text-color-hover": buttonTextColorHover,
        "--n-button-text-color-active": buttonTextColorActive,
        "--n-height": height,
        "--n-opacity-disabled": opacityDisabled
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass("radio-group", computed(() => mergedSizeRef.value[0]), cssVarsRef, props) : void 0;
    return {
      selfElRef,
      rtlEnabled: rtlEnabledRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedValue: mergedValueRef,
      handleFocusout,
      handleFocusin,
      cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    };
  },
  render() {
    var _a;
    const { mergedValue, mergedClsPrefix, handleFocusin, handleFocusout } = this;
    const { children, isButtonGroup } = mapSlot(flatten(getSlot(this)), mergedValue, mergedClsPrefix);
    (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
    return h$1("div", { onFocusin: handleFocusin, onFocusout: handleFocusout, ref: "selfElRef", class: [
      `${mergedClsPrefix}-radio-group`,
      this.rtlEnabled && `${mergedClsPrefix}-radio-group--rtl`,
      this.themeClass,
      isButtonGroup && `${mergedClsPrefix}-radio-group--button-group`
    ], style: this.cssVars }, children);
  }
});
const NRadioButton = /* @__PURE__ */ defineComponent({
  name: "RadioButton",
  props: radioProps,
  setup,
  render() {
    const { mergedClsPrefix } = this;
    return h$1(
      "label",
      { class: [
        `${mergedClsPrefix}-radio-button`,
        this.mergedDisabled && `${mergedClsPrefix}-radio-button--disabled`,
        this.renderSafeChecked && `${mergedClsPrefix}-radio-button--checked`,
        this.focus && [`${mergedClsPrefix}-radio-button--focus`]
      ] },
      h$1("input", { ref: "inputRef", type: "radio", class: `${mergedClsPrefix}-radio-input`, value: this.value, name: this.mergedName, checked: this.renderSafeChecked, disabled: this.mergedDisabled, onChange: this.handleRadioInputChange, onFocus: this.handleRadioInputFocus, onBlur: this.handleRadioInputBlur }),
      h$1("div", { class: `${mergedClsPrefix}-radio-button__state-border` }),
      resolveWrappedSlot(this.$slots.default, (children) => {
        if (!children && !this.label)
          return null;
        return h$1("div", { ref: "labelRef", class: `${mergedClsPrefix}-radio__label` }, children || this.label);
      })
    );
  }
});
const self$1 = (vars) => {
  const { textColorBase, opacity1, opacity2, opacity3, opacity4, opacity5 } = vars;
  return {
    color: textColorBase,
    opacity1Depth: opacity1,
    opacity2Depth: opacity2,
    opacity3Depth: opacity3,
    opacity4Depth: opacity4,
    opacity5Depth: opacity5
  };
};
const iconLight = {
  name: "Icon",
  common: commonLight,
  self: self$1
};
const iconLight$1 = iconLight;
const style = cB("icon", `
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
 transform: translateZ(0);
`, [cM("color-transition", {
  transition: "color .3s var(--n-bezier)"
}), cM("depth", {
  color: "var(--n-color)"
}, [c$1("svg", {
  opacity: "var(--n-opacity)",
  transition: "opacity .3s var(--n-bezier)"
})]), c$1("svg", {
  height: "1em",
  width: "1em"
})]);
const iconProps = Object.assign(Object.assign({}, useTheme.props), { depth: [String, Number], size: [Number, String], color: String, component: Object });
const NIcon = /* @__PURE__ */ defineComponent({
  _n_icon__: true,
  name: "Icon",
  inheritAttrs: false,
  props: iconProps,
  setup(props) {
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props);
    const themeRef = useTheme("Icon", "-icon", style, iconLight$1, props, mergedClsPrefixRef);
    const cssVarsRef = computed(() => {
      const { depth } = props;
      const { common: { cubicBezierEaseInOut: cubicBezierEaseInOut2 }, self: self2 } = themeRef.value;
      if (depth !== void 0) {
        const { color, [`opacity${depth}Depth`]: opacity } = self2;
        return {
          "--n-bezier": cubicBezierEaseInOut2,
          "--n-color": color,
          "--n-opacity": opacity
        };
      }
      return {
        "--n-bezier": cubicBezierEaseInOut2,
        "--n-color": "",
        "--n-opacity": ""
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass("icon", computed(() => `${props.depth || "d"}`), cssVarsRef, props) : void 0;
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      mergedStyle: computed(() => {
        const { size: size2, color } = props;
        return {
          fontSize: formatLength(size2),
          color
        };
      }),
      cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    };
  },
  render() {
    var _a;
    const { $parent, depth, mergedClsPrefix, component, onRender, themeClass } = this;
    if ((_a = $parent === null || $parent === void 0 ? void 0 : $parent.$options) === null || _a === void 0 ? void 0 : _a._n_icon__) {
      warn$1("icon", "don't wrap `n-icon` inside `n-icon`");
    }
    onRender === null || onRender === void 0 ? void 0 : onRender();
    return h$1("i", mergeProps(this.$attrs, {
      role: "img",
      class: [
        `${mergedClsPrefix}-icon`,
        themeClass,
        {
          [`${mergedClsPrefix}-icon--depth`]: depth,
          [`${mergedClsPrefix}-icon--color-transition`]: depth !== void 0
        }
      ],
      style: [this.cssVars, this.mergedStyle]
    }), component ? h$1(component) : this.$slots);
  }
});
const _imports_0 = "" + globalThis.__publicAssetsURL("icons/pwa-192x192.png");
function tryOnScopeDispose(fn2) {
  if (getCurrentScope()) {
    onScopeDispose(fn2);
    return true;
  }
  return false;
}
function toValue(r2) {
  return typeof r2 === "function" ? r2() : unref(r2);
}
const isClient = typeof window !== "undefined" && typeof document !== "undefined";
const noop = () => {
};
function createFilterWrapper(filter, fn2) {
  function wrapper(...args) {
    return new Promise((resolve, reject) => {
      Promise.resolve(filter(() => fn2.apply(this, args), { fn: fn2, thisArg: this, args })).then(resolve).catch(reject);
    });
  }
  return wrapper;
}
function throttleFilter(ms, trailing = true, leading = true, rejectOnCancel = false) {
  let lastExec = 0;
  let timer;
  let isLeading = true;
  let lastRejector = noop;
  let lastValue;
  const clear = () => {
    if (timer) {
      clearTimeout(timer);
      timer = void 0;
      lastRejector();
      lastRejector = noop;
    }
  };
  const filter = (_invoke) => {
    const duration = toValue(ms);
    const elapsed = Date.now() - lastExec;
    const invoke = () => {
      return lastValue = _invoke();
    };
    clear();
    if (duration <= 0) {
      lastExec = Date.now();
      return invoke();
    }
    if (elapsed > duration && (leading || !isLeading)) {
      lastExec = Date.now();
      invoke();
    } else if (trailing) {
      lastValue = new Promise((resolve, reject) => {
        lastRejector = rejectOnCancel ? reject : resolve;
        timer = setTimeout(() => {
          lastExec = Date.now();
          isLeading = true;
          resolve(invoke());
          clear();
        }, Math.max(0, duration - elapsed));
      });
    }
    if (!leading && !timer)
      timer = setTimeout(() => isLeading = true, duration);
    isLeading = false;
    return lastValue;
  };
  return filter;
}
function useThrottleFn(fn2, ms = 200, trailing = false, leading = true, rejectOnCancel = false) {
  return createFilterWrapper(
    throttleFilter(ms, trailing, leading, rejectOnCancel),
    fn2
  );
}
function unrefElement(elRef) {
  var _a;
  const plain = toValue(elRef);
  return (_a = plain == null ? void 0 : plain.$el) != null ? _a : plain;
}
const defaultWindow = isClient ? window : void 0;
function useMounted() {
  const isMounted = ref(false);
  if (getCurrentInstance()) {
    onMounted(() => {
      isMounted.value = true;
    });
  }
  return isMounted;
}
function useSupported(callback) {
  const isMounted = useMounted();
  return computed(() => {
    isMounted.value;
    return Boolean(callback());
  });
}
function useResizeObserver(target, callback, options = {}) {
  const { window: window2 = defaultWindow, ...observerOptions } = options;
  let observer;
  const isSupported = useSupported(() => window2 && "ResizeObserver" in window2);
  const cleanup = () => {
    if (observer) {
      observer.disconnect();
      observer = void 0;
    }
  };
  const targets = computed(
    () => Array.isArray(target) ? target.map((el) => unrefElement(el)) : [unrefElement(target)]
  );
  const stopWatch = watch(
    targets,
    (els) => {
      cleanup();
      if (isSupported.value && window2) {
        observer = new ResizeObserver(callback);
        for (const _el of els)
          _el && observer.observe(_el, observerOptions);
      }
    },
    { immediate: true, flush: "post", deep: true }
  );
  const stop = () => {
    cleanup();
    stopWatch();
  };
  tryOnScopeDispose(stop);
  return {
    isSupported,
    stop
  };
}
const e = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : "undefined" != typeof window ? window : global, t = Object.keys, n = Array.isArray;
function r(e2, n2) {
  return "object" != typeof n2 || t(n2).forEach(function(t2) {
    e2[t2] = n2[t2];
  }), e2;
}
"undefined" == typeof Promise || e.Promise || (e.Promise = Promise);
const s = Object.getPrototypeOf, i = {}.hasOwnProperty;
function o(e2, t2) {
  return i.call(e2, t2);
}
function a(e2, n2) {
  "function" == typeof n2 && (n2 = n2(s(e2))), ("undefined" == typeof Reflect ? t : Reflect.ownKeys)(n2).forEach((t2) => {
    l(e2, t2, n2[t2]);
  });
}
const u = Object.defineProperty;
function l(e2, t2, n2, s2) {
  u(e2, t2, r(n2 && o(n2, "get") && "function" == typeof n2.get ? { get: n2.get, set: n2.set, configurable: true } : { value: n2, configurable: true, writable: true }, s2));
}
function c(e2) {
  return { from: function(t2) {
    return e2.prototype = Object.create(t2.prototype), l(e2.prototype, "constructor", e2), { extend: a.bind(null, e2.prototype) };
  } };
}
const h = Object.getOwnPropertyDescriptor;
function d(e2, t2) {
  let n2;
  return h(e2, t2) || (n2 = s(e2)) && d(n2, t2);
}
const f = [].slice;
function p(e2, t2, n2) {
  return f.call(e2, t2, n2);
}
function y(e2, t2) {
  return t2(e2);
}
function m(e2) {
  if (!e2)
    throw new Error("Assertion Failed");
}
function v(t2) {
  e.setImmediate ? setImmediate(t2) : setTimeout(t2, 0);
}
function g(e2, t2) {
  return e2.reduce((e3, n2, r2) => {
    var s2 = t2(n2, r2);
    return s2 && (e3[s2[0]] = s2[1]), e3;
  }, {});
}
function b(e2, t2) {
  if (o(e2, t2))
    return e2[t2];
  if (!t2)
    return e2;
  if ("string" != typeof t2) {
    for (var n2 = [], r2 = 0, s2 = t2.length; r2 < s2; ++r2) {
      var i2 = b(e2, t2[r2]);
      n2.push(i2);
    }
    return n2;
  }
  var a2 = t2.indexOf(".");
  if (-1 !== a2) {
    var u2 = e2[t2.substr(0, a2)];
    return void 0 === u2 ? void 0 : b(u2, t2.substr(a2 + 1));
  }
}
function _(e2, t2, r2) {
  if (e2 && void 0 !== t2 && (!("isFrozen" in Object) || !Object.isFrozen(e2)))
    if ("string" != typeof t2 && "length" in t2) {
      m("string" != typeof r2 && "length" in r2);
      for (var s2 = 0, i2 = t2.length; s2 < i2; ++s2)
        _(e2, t2[s2], r2[s2]);
    } else {
      var a2 = t2.indexOf(".");
      if (-1 !== a2) {
        var u2 = t2.substr(0, a2), l2 = t2.substr(a2 + 1);
        if ("" === l2)
          void 0 === r2 ? n(e2) && !isNaN(parseInt(u2)) ? e2.splice(u2, 1) : delete e2[u2] : e2[u2] = r2;
        else {
          var c2 = e2[u2];
          c2 && o(e2, u2) || (c2 = e2[u2] = {}), _(c2, l2, r2);
        }
      } else
        void 0 === r2 ? n(e2) && !isNaN(parseInt(t2)) ? e2.splice(t2, 1) : delete e2[t2] : e2[t2] = r2;
    }
}
function w(e2) {
  var t2 = {};
  for (var n2 in e2)
    o(e2, n2) && (t2[n2] = e2[n2]);
  return t2;
}
const x = [].concat;
function k(e2) {
  return x.apply([], e2);
}
const E = "Boolean,String,Date,RegExp,Blob,File,FileList,FileSystemFileHandle,ArrayBuffer,DataView,Uint8ClampedArray,ImageBitmap,ImageData,Map,Set,CryptoKey".split(",").concat(k([8, 16, 32, 64].map((e2) => ["Int", "Uint", "Float"].map((t2) => t2 + e2 + "Array")))).filter((t2) => e[t2]), P = E.map((t2) => e[t2]);
g(E, (e2) => [e2, true]);
let K = null;
function O(e2) {
  K = "undefined" != typeof WeakMap && /* @__PURE__ */ new WeakMap();
  const t2 = S(e2);
  return K = null, t2;
}
function S(e2) {
  if (!e2 || "object" != typeof e2)
    return e2;
  let t2 = K && K.get(e2);
  if (t2)
    return t2;
  if (n(e2)) {
    t2 = [], K && K.set(e2, t2);
    for (var r2 = 0, i2 = e2.length; r2 < i2; ++r2)
      t2.push(S(e2[r2]));
  } else if (P.indexOf(e2.constructor) >= 0)
    t2 = e2;
  else {
    const n2 = s(e2);
    for (var a2 in t2 = n2 === Object.prototype ? {} : Object.create(n2), K && K.set(e2, t2), e2)
      o(e2, a2) && (t2[a2] = S(e2[a2]));
  }
  return t2;
}
const { toString: A } = {};
function C(e2) {
  return A.call(e2).slice(8, -1);
}
const j = "undefined" != typeof Symbol ? Symbol.iterator : "@@iterator", D = "symbol" == typeof j ? function(e2) {
  var t2;
  return null != e2 && (t2 = e2[j]) && t2.apply(e2);
} : function() {
  return null;
}, I = {};
function B(e2) {
  var t2, r2, s2, i2;
  if (1 === arguments.length) {
    if (n(e2))
      return e2.slice();
    if (this === I && "string" == typeof e2)
      return [e2];
    if (i2 = D(e2)) {
      for (r2 = []; !(s2 = i2.next()).done; )
        r2.push(s2.value);
      return r2;
    }
    if (null == e2)
      return [e2];
    if ("number" == typeof (t2 = e2.length)) {
      for (r2 = new Array(t2); t2--; )
        r2[t2] = e2[t2];
      return r2;
    }
    return [e2];
  }
  for (t2 = arguments.length, r2 = new Array(t2); t2--; )
    r2[t2] = arguments[t2];
  return r2;
}
const T = "undefined" != typeof Symbol ? (e2) => "AsyncFunction" === e2[Symbol.toStringTag] : () => false;
var R = "undefined" != typeof location && /^(http|https):\/\/(localhost|127\.0\.0\.1)/.test(location.href);
function F(e2, t2) {
  R = e2, M = t2;
}
var M = () => true;
const N = !new Error("").stack;
function q() {
  if (N)
    try {
      throw q.arguments, new Error();
    } catch (e2) {
      return e2;
    }
  return new Error();
}
function $(e2, t2) {
  var n2 = e2.stack;
  return n2 ? (t2 = t2 || 0, 0 === n2.indexOf(e2.name) && (t2 += (e2.name + e2.message).split("\n").length), n2.split("\n").slice(t2).filter(M).map((e3) => "\n" + e3).join("")) : "";
}
var U = ["Unknown", "Constraint", "Data", "TransactionInactive", "ReadOnly", "Version", "NotFound", "InvalidState", "InvalidAccess", "Abort", "Timeout", "QuotaExceeded", "Syntax", "DataClone"], L = ["Modify", "Bulk", "OpenFailed", "VersionChange", "Schema", "Upgrade", "InvalidTable", "MissingAPI", "NoSuchDatabase", "InvalidArgument", "SubTransaction", "Unsupported", "Internal", "DatabaseClosed", "PrematureCommit", "ForeignAwait"].concat(U), V = { VersionChanged: "Database version changed by other database connection", DatabaseClosed: "Database has been closed", Abort: "Transaction aborted", TransactionInactive: "Transaction has already completed or failed", MissingAPI: "IndexedDB API missing. Please visit https://tinyurl.com/y2uuvskb" };
function W(e2, t2) {
  this._e = q(), this.name = e2, this.message = t2;
}
function Y(e2, t2) {
  return e2 + ". Errors: " + Object.keys(t2).map((e3) => t2[e3].toString()).filter((e3, t3, n2) => n2.indexOf(e3) === t3).join("\n");
}
function z(e2, t2, n2, r2) {
  this._e = q(), this.failures = t2, this.failedKeys = r2, this.successCount = n2, this.message = Y(e2, t2);
}
function G(e2, t2) {
  this._e = q(), this.name = "BulkError", this.failures = Object.keys(t2).map((e3) => t2[e3]), this.failuresByPos = t2, this.message = Y(e2, t2);
}
c(W).from(Error).extend({ stack: { get: function() {
  return this._stack || (this._stack = this.name + ": " + this.message + $(this._e, 2));
} }, toString: function() {
  return this.name + ": " + this.message;
} }), c(z).from(W), c(G).from(W);
var H = L.reduce((e2, t2) => (e2[t2] = t2 + "Error", e2), {});
const Q = W;
var X = L.reduce((e2, t2) => {
  var n2 = t2 + "Error";
  function r2(e3, r3) {
    this._e = q(), this.name = n2, e3 ? "string" == typeof e3 ? (this.message = `${e3}${r3 ? "\n " + r3 : ""}`, this.inner = r3 || null) : "object" == typeof e3 && (this.message = `${e3.name} ${e3.message}`, this.inner = e3) : (this.message = V[t2] || n2, this.inner = null);
  }
  return c(r2).from(Q), e2[t2] = r2, e2;
}, {});
X.Syntax = SyntaxError, X.Type = TypeError, X.Range = RangeError;
var J = U.reduce((e2, t2) => (e2[t2 + "Error"] = X[t2], e2), {});
var Z = L.reduce((e2, t2) => (-1 === ["Syntax", "Type", "Range"].indexOf(t2) && (e2[t2 + "Error"] = X[t2]), e2), {});
function ee() {
}
function te(e2) {
  return e2;
}
function ne(e2, t2) {
  return null == e2 || e2 === te ? t2 : function(n2) {
    return t2(e2(n2));
  };
}
function re(e2, t2) {
  return function() {
    e2.apply(this, arguments), t2.apply(this, arguments);
  };
}
function se(e2, t2) {
  return e2 === ee ? t2 : function() {
    var n2 = e2.apply(this, arguments);
    void 0 !== n2 && (arguments[0] = n2);
    var r2 = this.onsuccess, s2 = this.onerror;
    this.onsuccess = null, this.onerror = null;
    var i2 = t2.apply(this, arguments);
    return r2 && (this.onsuccess = this.onsuccess ? re(r2, this.onsuccess) : r2), s2 && (this.onerror = this.onerror ? re(s2, this.onerror) : s2), void 0 !== i2 ? i2 : n2;
  };
}
function ie(e2, t2) {
  return e2 === ee ? t2 : function() {
    e2.apply(this, arguments);
    var n2 = this.onsuccess, r2 = this.onerror;
    this.onsuccess = this.onerror = null, t2.apply(this, arguments), n2 && (this.onsuccess = this.onsuccess ? re(n2, this.onsuccess) : n2), r2 && (this.onerror = this.onerror ? re(r2, this.onerror) : r2);
  };
}
function oe(e2, t2) {
  return e2 === ee ? t2 : function(n2) {
    var s2 = e2.apply(this, arguments);
    r(n2, s2);
    var i2 = this.onsuccess, o2 = this.onerror;
    this.onsuccess = null, this.onerror = null;
    var a2 = t2.apply(this, arguments);
    return i2 && (this.onsuccess = this.onsuccess ? re(i2, this.onsuccess) : i2), o2 && (this.onerror = this.onerror ? re(o2, this.onerror) : o2), void 0 === s2 ? void 0 === a2 ? void 0 : a2 : r(s2, a2);
  };
}
function ae(e2, t2) {
  return e2 === ee ? t2 : function() {
    return false !== t2.apply(this, arguments) && e2.apply(this, arguments);
  };
}
function ue(e2, t2) {
  return e2 === ee ? t2 : function() {
    var n2 = e2.apply(this, arguments);
    if (n2 && "function" == typeof n2.then) {
      for (var r2 = this, s2 = arguments.length, i2 = new Array(s2); s2--; )
        i2[s2] = arguments[s2];
      return n2.then(function() {
        return t2.apply(r2, i2);
      });
    }
    return t2.apply(this, arguments);
  };
}
Z.ModifyError = z, Z.DexieError = W, Z.BulkError = G;
var le = {};
const ce = 100, [he, de, fe] = "undefined" == typeof Promise ? [] : (() => {
  let e2 = Promise.resolve();
  if ("undefined" == typeof crypto || !crypto.subtle)
    return [e2, s(e2), e2];
  const t2 = crypto.subtle.digest("SHA-512", new Uint8Array([0]));
  return [t2, s(t2), e2];
})(), pe = de && de.then, ye = he && he.constructor, me = !!fe;
var ve = false, ge = fe ? () => {
  fe.then($e);
} : e.setImmediate ? setImmediate.bind(null, $e) : e.MutationObserver ? () => {
  var e2 = document.createElement("div");
  new MutationObserver(() => {
    $e(), e2 = null;
  }).observe(e2, { attributes: true }), e2.setAttribute("i", "1");
} : () => {
  setTimeout($e, 0);
}, be = function(e2, t2) {
  Se.push([e2, t2]), we && (ge(), we = false);
}, _e = true, we = true, xe = [], ke = [], Ee = null, Pe = te, Ke = { id: "global", global: true, ref: 0, unhandleds: [], onunhandled: dt, pgp: false, env: {}, finalize: function() {
  this.unhandleds.forEach((e2) => {
    try {
      dt(e2[0], e2[1]);
    } catch (e3) {
    }
  });
} }, Oe = Ke, Se = [], Ae = 0, Ce = [];
function je(e2) {
  if ("object" != typeof this)
    throw new TypeError("Promises must be constructed via new");
  this._listeners = [], this.onuncatched = ee, this._lib = false;
  var t2 = this._PSD = Oe;
  if (R && (this._stackHolder = q(), this._prev = null, this._numPrev = 0), "function" != typeof e2) {
    if (e2 !== le)
      throw new TypeError("Not a function");
    return this._state = arguments[1], this._value = arguments[2], void (false === this._state && Te(this, this._value));
  }
  this._state = null, this._value = null, ++t2.ref, Be(this, e2);
}
const De = { get: function() {
  var e2 = Oe, t2 = Xe;
  function n2(n3, r2) {
    var s2 = !e2.global && (e2 !== Oe || t2 !== Xe);
    const i2 = s2 && !tt();
    var o2 = new je((t3, o3) => {
      Fe(this, new Ie(lt(n3, e2, s2, i2), lt(r2, e2, s2, i2), t3, o3, e2));
    });
    return R && qe(o2, this), o2;
  }
  return n2.prototype = le, n2;
}, set: function(e2) {
  l(this, "then", e2 && e2.prototype === le ? De : { get: function() {
    return e2;
  }, set: De.set });
} };
function Ie(e2, t2, n2, r2, s2) {
  this.onFulfilled = "function" == typeof e2 ? e2 : null, this.onRejected = "function" == typeof t2 ? t2 : null, this.resolve = n2, this.reject = r2, this.psd = s2;
}
function Be(e2, t2) {
  try {
    t2((t3) => {
      if (null === e2._state) {
        if (t3 === e2)
          throw new TypeError("A promise cannot be resolved with itself.");
        var n2 = e2._lib && Ue();
        t3 && "function" == typeof t3.then ? Be(e2, (e3, n3) => {
          t3 instanceof je ? t3._then(e3, n3) : t3.then(e3, n3);
        }) : (e2._state = true, e2._value = t3, Re(e2)), n2 && Le();
      }
    }, Te.bind(null, e2));
  } catch (t3) {
    Te(e2, t3);
  }
}
function Te(e2, t2) {
  if (ke.push(t2), null === e2._state) {
    var n2 = e2._lib && Ue();
    t2 = Pe(t2), e2._state = false, e2._value = t2, R && null !== t2 && "object" == typeof t2 && !t2._promise && function(e3, t3, n3) {
      try {
        e3.apply(null, n3);
      } catch (e4) {
        t3 && t3(e4);
      }
    }(() => {
      var n3 = d(t2, "stack");
      t2._promise = e2, l(t2, "stack", { get: () => ve ? n3 && (n3.get ? n3.get.apply(t2) : n3.value) : e2.stack });
    }), function(e3) {
      xe.some((t3) => t3._value === e3._value) || xe.push(e3);
    }(e2), Re(e2), n2 && Le();
  }
}
function Re(e2) {
  var t2 = e2._listeners;
  e2._listeners = [];
  for (var n2 = 0, r2 = t2.length; n2 < r2; ++n2)
    Fe(e2, t2[n2]);
  var s2 = e2._PSD;
  --s2.ref || s2.finalize(), 0 === Ae && (++Ae, be(() => {
    0 == --Ae && Ve();
  }, []));
}
function Fe(e2, t2) {
  if (null !== e2._state) {
    var n2 = e2._state ? t2.onFulfilled : t2.onRejected;
    if (null === n2)
      return (e2._state ? t2.resolve : t2.reject)(e2._value);
    ++t2.psd.ref, ++Ae, be(Me, [n2, e2, t2]);
  } else
    e2._listeners.push(t2);
}
function Me(e2, t2, n2) {
  try {
    Ee = t2;
    var r2, s2 = t2._value;
    t2._state ? r2 = e2(s2) : (ke.length && (ke = []), r2 = e2(s2), -1 === ke.indexOf(s2) && function(e3) {
      var t3 = xe.length;
      for (; t3; )
        if (xe[--t3]._value === e3._value)
          return void xe.splice(t3, 1);
    }(t2)), n2.resolve(r2);
  } catch (e3) {
    n2.reject(e3);
  } finally {
    Ee = null, 0 == --Ae && Ve(), --n2.psd.ref || n2.psd.finalize();
  }
}
function Ne(e2, t2, n2) {
  if (t2.length === n2)
    return t2;
  var r2 = "";
  if (false === e2._state) {
    var s2, i2, o2 = e2._value;
    null != o2 ? (s2 = o2.name || "Error", i2 = o2.message || o2, r2 = $(o2, 0)) : (s2 = o2, i2 = ""), t2.push(s2 + (i2 ? ": " + i2 : "") + r2);
  }
  return R && ((r2 = $(e2._stackHolder, 2)) && -1 === t2.indexOf(r2) && t2.push(r2), e2._prev && Ne(e2._prev, t2, n2)), t2;
}
function qe(e2, t2) {
  var n2 = t2 ? t2._numPrev + 1 : 0;
  n2 < 100 && (e2._prev = t2, e2._numPrev = n2);
}
function $e() {
  Ue() && Le();
}
function Ue() {
  var e2 = _e;
  return _e = false, we = false, e2;
}
function Le() {
  var e2, t2, n2;
  do {
    for (; Se.length > 0; )
      for (e2 = Se, Se = [], n2 = e2.length, t2 = 0; t2 < n2; ++t2) {
        var r2 = e2[t2];
        r2[0].apply(null, r2[1]);
      }
  } while (Se.length > 0);
  _e = true, we = true;
}
function Ve() {
  var e2 = xe;
  xe = [], e2.forEach((e3) => {
    e3._PSD.onunhandled.call(null, e3._value, e3);
  });
  for (var t2 = Ce.slice(0), n2 = t2.length; n2; )
    t2[--n2]();
}
function We(e2) {
  return new je(le, false, e2);
}
function Ye(e2, t2) {
  var n2 = Oe;
  return function() {
    var r2 = Ue(), s2 = Oe;
    try {
      return it(n2, true), e2.apply(this, arguments);
    } catch (e3) {
      t2 && t2(e3);
    } finally {
      it(s2, false), r2 && Le();
    }
  };
}
a(je.prototype, { then: De, _then: function(e2, t2) {
  Fe(this, new Ie(null, null, e2, t2, Oe));
}, catch: function(e2) {
  if (1 === arguments.length)
    return this.then(null, e2);
  var t2 = arguments[0], n2 = arguments[1];
  return "function" == typeof t2 ? this.then(null, (e3) => e3 instanceof t2 ? n2(e3) : We(e3)) : this.then(null, (e3) => e3 && e3.name === t2 ? n2(e3) : We(e3));
}, finally: function(e2) {
  return this.then((t2) => (e2(), t2), (t2) => (e2(), We(t2)));
}, stack: { get: function() {
  if (this._stack)
    return this._stack;
  try {
    ve = true;
    var e2 = Ne(this, [], 20).join("\nFrom previous: ");
    return null !== this._state && (this._stack = e2), e2;
  } finally {
    ve = false;
  }
} }, timeout: function(e2, t2) {
  return e2 < 1 / 0 ? new je((n2, r2) => {
    var s2 = setTimeout(() => r2(new X.Timeout(t2)), e2);
    this.then(n2, r2).finally(clearTimeout.bind(null, s2));
  }) : this;
} }), "undefined" != typeof Symbol && Symbol.toStringTag && l(je.prototype, Symbol.toStringTag, "Dexie.Promise"), Ke.env = ot(), a(je, { all: function() {
  var e2 = B.apply(null, arguments).map(nt);
  return new je(function(t2, n2) {
    0 === e2.length && t2([]);
    var r2 = e2.length;
    e2.forEach((s2, i2) => je.resolve(s2).then((n3) => {
      e2[i2] = n3, --r2 || t2(e2);
    }, n2));
  });
}, resolve: (e2) => {
  if (e2 instanceof je)
    return e2;
  if (e2 && "function" == typeof e2.then)
    return new je((t3, n2) => {
      e2.then(t3, n2);
    });
  var t2 = new je(le, true, e2);
  return qe(t2, Ee), t2;
}, reject: We, race: function() {
  var e2 = B.apply(null, arguments).map(nt);
  return new je((t2, n2) => {
    e2.map((e3) => je.resolve(e3).then(t2, n2));
  });
}, PSD: { get: () => Oe, set: (e2) => Oe = e2 }, totalEchoes: { get: () => Xe }, newPSD: Ze, usePSD: at, scheduler: { get: () => be, set: (e2) => {
  be = e2;
} }, rejectionMapper: { get: () => Pe, set: (e2) => {
  Pe = e2;
} }, follow: (e2, t2) => new je((n2, r2) => Ze((t3, n3) => {
  var r3 = Oe;
  r3.unhandleds = [], r3.onunhandled = n3, r3.finalize = re(function() {
    !function(e3) {
      function t4() {
        e3(), Ce.splice(Ce.indexOf(t4), 1);
      }
      Ce.push(t4), ++Ae, be(() => {
        0 == --Ae && Ve();
      }, []);
    }(() => {
      0 === this.unhandleds.length ? t3() : n3(this.unhandleds[0]);
    });
  }, r3.finalize), e2();
}, t2, n2, r2)) }), ye && (ye.allSettled && l(je, "allSettled", function() {
  const e2 = B.apply(null, arguments).map(nt);
  return new je((t2) => {
    0 === e2.length && t2([]);
    let n2 = e2.length;
    const r2 = new Array(n2);
    e2.forEach((e3, s2) => je.resolve(e3).then((e4) => r2[s2] = { status: "fulfilled", value: e4 }, (e4) => r2[s2] = { status: "rejected", reason: e4 }).then(() => --n2 || t2(r2)));
  });
}), ye.any && "undefined" != typeof AggregateError && l(je, "any", function() {
  const e2 = B.apply(null, arguments).map(nt);
  return new je((t2, n2) => {
    0 === e2.length && n2(new AggregateError([]));
    let r2 = e2.length;
    const s2 = new Array(r2);
    e2.forEach((e3, i2) => je.resolve(e3).then((e4) => t2(e4), (e4) => {
      s2[i2] = e4, --r2 || n2(new AggregateError(s2));
    }));
  });
}));
const ze = { awaits: 0, echoes: 0, id: 0 };
var Ge = 0, He = [], Qe = 0, Xe = 0, Je = 0;
function Ze(e2, t2, n2, s2) {
  var i2 = Oe, o2 = Object.create(i2);
  o2.parent = i2, o2.ref = 0, o2.global = false, o2.id = ++Je;
  var a2 = Ke.env;
  o2.env = me ? { Promise: je, PromiseProp: { value: je, configurable: true, writable: true }, all: je.all, race: je.race, allSettled: je.allSettled, any: je.any, resolve: je.resolve, reject: je.reject, nthen: ct(a2.nthen, o2), gthen: ct(a2.gthen, o2) } : {}, t2 && r(o2, t2), ++i2.ref, o2.finalize = function() {
    --this.parent.ref || this.parent.finalize();
  };
  var u2 = at(o2, e2, n2, s2);
  return 0 === o2.ref && o2.finalize(), u2;
}
function et() {
  return ze.id || (ze.id = ++Ge), ++ze.awaits, ze.echoes += ce, ze.id;
}
function tt() {
  return !!ze.awaits && (0 == --ze.awaits && (ze.id = 0), ze.echoes = ze.awaits * ce, true);
}
function nt(e2) {
  return ze.echoes && e2 && e2.constructor === ye ? (et(), e2.then((e3) => (tt(), e3), (e3) => (tt(), ft(e3)))) : e2;
}
function rt(e2) {
  ++Xe, ze.echoes && 0 != --ze.echoes || (ze.echoes = ze.id = 0), He.push(Oe), it(e2, true);
}
function st() {
  var e2 = He[He.length - 1];
  He.pop(), it(e2, false);
}
function it(t2, n2) {
  var r2 = Oe;
  if ((n2 ? !ze.echoes || Qe++ && t2 === Oe : !Qe || --Qe && t2 === Oe) || ut(n2 ? rt.bind(null, t2) : st), t2 !== Oe && (Oe = t2, r2 === Ke && (Ke.env = ot()), me)) {
    var s2 = Ke.env.Promise, i2 = t2.env;
    de.then = i2.nthen, s2.prototype.then = i2.gthen, (r2.global || t2.global) && (Object.defineProperty(e, "Promise", i2.PromiseProp), s2.all = i2.all, s2.race = i2.race, s2.resolve = i2.resolve, s2.reject = i2.reject, i2.allSettled && (s2.allSettled = i2.allSettled), i2.any && (s2.any = i2.any));
  }
}
function ot() {
  var t2 = e.Promise;
  return me ? { Promise: t2, PromiseProp: Object.getOwnPropertyDescriptor(e, "Promise"), all: t2.all, race: t2.race, allSettled: t2.allSettled, any: t2.any, resolve: t2.resolve, reject: t2.reject, nthen: de.then, gthen: t2.prototype.then } : {};
}
function at(e2, t2, n2, r2, s2) {
  var i2 = Oe;
  try {
    return it(e2, true), t2(n2, r2, s2);
  } finally {
    it(i2, false);
  }
}
function ut(e2) {
  pe.call(he, e2);
}
function lt(e2, t2, n2, r2) {
  return "function" != typeof e2 ? e2 : function() {
    var s2 = Oe;
    n2 && et(), it(t2, true);
    try {
      return e2.apply(this, arguments);
    } finally {
      it(s2, false), r2 && ut(tt);
    }
  };
}
function ct(e2, t2) {
  return function(n2, r2) {
    return e2.call(this, lt(n2, t2), lt(r2, t2));
  };
}
-1 === ("" + pe).indexOf("[native code]") && (et = tt = ee);
const ht = "unhandledrejection";
function dt(t2, n2) {
  var s2;
  try {
    s2 = n2.onuncatched(t2);
  } catch (e2) {
  }
  if (false !== s2)
    try {
      var i2, o2 = { promise: n2, reason: t2 };
      if (e.document && document.createEvent ? ((i2 = document.createEvent("Event")).initEvent(ht, true, true), r(i2, o2)) : e.CustomEvent && r(i2 = new CustomEvent(ht, { detail: o2 }), o2), i2 && e.dispatchEvent && (dispatchEvent(i2), !e.PromiseRejectionEvent && e.onunhandledrejection))
        try {
          e.onunhandledrejection(i2);
        } catch (e2) {
        }
      R && i2 && !i2.defaultPrevented && console.warn(`Unhandled rejection: ${t2.stack || t2}`);
    } catch (e2) {
    }
}
var ft = je.reject;
function pt(e2, t2, n2, r2) {
  if (e2.idbdb && (e2._state.openComplete || Oe.letThrough || e2._vip)) {
    var s2 = e2._createTransaction(t2, n2, e2._dbSchema);
    try {
      s2.create(), e2._state.PR1398_maxLoop = 3;
    } catch (s3) {
      return s3.name === H.InvalidState && e2.isOpen() && --e2._state.PR1398_maxLoop > 0 ? (console.warn("Dexie: Need to reopen db"), e2._close(), e2.open().then(() => pt(e2, t2, n2, r2))) : ft(s3);
    }
    return s2._promise(t2, (e3, t3) => Ze(() => (Oe.trans = s2, r2(e3, t3, s2)))).then((e3) => s2._completion.then(() => e3));
  }
  if (e2._state.openComplete)
    return ft(new X.DatabaseClosed(e2._state.dbOpenError));
  if (!e2._state.isBeingOpened) {
    if (!e2._options.autoOpen)
      return ft(new X.DatabaseClosed());
    e2.open().catch(ee);
  }
  return e2._state.dbReadyPromise.then(() => pt(e2, t2, n2, r2));
}
const yt = "3.2.4", mt = String.fromCharCode(65535), vt = -1 / 0, gt = "Invalid key provided. Keys must be of type string, number, Date or Array<string | number | Date>.", bt = "String expected.", _t = [], wt = "undefined" != typeof navigator && /(MSIE|Trident|Edge)/.test(navigator.userAgent), xt = wt, kt = wt, Et = (e2) => !/(dexie\.js|dexie\.min\.js)/.test(e2), Pt = "__dbnames", Kt = "readonly", Ot = "readwrite";
function St(e2, t2) {
  return e2 ? t2 ? function() {
    return e2.apply(this, arguments) && t2.apply(this, arguments);
  } : e2 : t2;
}
const At = { type: 3, lower: -1 / 0, lowerOpen: false, upper: [[]], upperOpen: false };
function Ct(e2) {
  return "string" != typeof e2 || /\./.test(e2) ? (e3) => e3 : (t2) => (void 0 === t2[e2] && e2 in t2 && delete (t2 = O(t2))[e2], t2);
}
class jt {
  _trans(e2, t2, n2) {
    const r2 = this._tx || Oe.trans, s2 = this.name;
    function i2(e3, n3, r3) {
      if (!r3.schema[s2])
        throw new X.NotFound("Table " + s2 + " not part of transaction");
      return t2(r3.idbtrans, r3);
    }
    const o2 = Ue();
    try {
      return r2 && r2.db === this.db ? r2 === Oe.trans ? r2._promise(e2, i2, n2) : Ze(() => r2._promise(e2, i2, n2), { trans: r2, transless: Oe.transless || Oe }) : pt(this.db, e2, [this.name], i2);
    } finally {
      o2 && Le();
    }
  }
  get(e2, t2) {
    return e2 && e2.constructor === Object ? this.where(e2).first(t2) : this._trans("readonly", (t3) => this.core.get({ trans: t3, key: e2 }).then((e3) => this.hook.reading.fire(e3))).then(t2);
  }
  where(e2) {
    if ("string" == typeof e2)
      return new this.db.WhereClause(this, e2);
    if (n(e2))
      return new this.db.WhereClause(this, `[${e2.join("+")}]`);
    const r2 = t(e2);
    if (1 === r2.length)
      return this.where(r2[0]).equals(e2[r2[0]]);
    const s2 = this.schema.indexes.concat(this.schema.primKey).filter((e3) => e3.compound && r2.every((t2) => e3.keyPath.indexOf(t2) >= 0) && e3.keyPath.every((e4) => r2.indexOf(e4) >= 0))[0];
    if (s2 && this.db._maxKey !== mt)
      return this.where(s2.name).equals(s2.keyPath.map((t2) => e2[t2]));
    !s2 && R && console.warn(`The query ${JSON.stringify(e2)} on ${this.name} would benefit of a compound index [${r2.join("+")}]`);
    const { idxByName: i2 } = this.schema, o2 = this.db._deps.indexedDB;
    function a2(e3, t2) {
      try {
        return 0 === o2.cmp(e3, t2);
      } catch (e4) {
        return false;
      }
    }
    const [u2, l2] = r2.reduce(([t2, r3], s3) => {
      const o3 = i2[s3], u3 = e2[s3];
      return [t2 || o3, t2 || !o3 ? St(r3, o3 && o3.multi ? (e3) => {
        const t3 = b(e3, s3);
        return n(t3) && t3.some((e4) => a2(u3, e4));
      } : (e3) => a2(u3, b(e3, s3))) : r3];
    }, [null, null]);
    return u2 ? this.where(u2.name).equals(e2[u2.keyPath]).filter(l2) : s2 ? this.filter(l2) : this.where(r2).equals("");
  }
  filter(e2) {
    return this.toCollection().and(e2);
  }
  count(e2) {
    return this.toCollection().count(e2);
  }
  offset(e2) {
    return this.toCollection().offset(e2);
  }
  limit(e2) {
    return this.toCollection().limit(e2);
  }
  each(e2) {
    return this.toCollection().each(e2);
  }
  toArray(e2) {
    return this.toCollection().toArray(e2);
  }
  toCollection() {
    return new this.db.Collection(new this.db.WhereClause(this));
  }
  orderBy(e2) {
    return new this.db.Collection(new this.db.WhereClause(this, n(e2) ? `[${e2.join("+")}]` : e2));
  }
  reverse() {
    return this.toCollection().reverse();
  }
  mapToClass(e2) {
    this.schema.mappedClass = e2;
    const t2 = (t3) => {
      if (!t3)
        return t3;
      const n2 = Object.create(e2.prototype);
      for (var r2 in t3)
        if (o(t3, r2))
          try {
            n2[r2] = t3[r2];
          } catch (e3) {
          }
      return n2;
    };
    return this.schema.readHook && this.hook.reading.unsubscribe(this.schema.readHook), this.schema.readHook = t2, this.hook("reading", t2), e2;
  }
  defineClass() {
    return this.mapToClass(function(e2) {
      r(this, e2);
    });
  }
  add(e2, t2) {
    const { auto: n2, keyPath: r2 } = this.schema.primKey;
    let s2 = e2;
    return r2 && n2 && (s2 = Ct(r2)(e2)), this._trans("readwrite", (e3) => this.core.mutate({ trans: e3, type: "add", keys: null != t2 ? [t2] : null, values: [s2] })).then((e3) => e3.numFailures ? je.reject(e3.failures[0]) : e3.lastResult).then((t3) => {
      if (r2)
        try {
          _(e2, r2, t3);
        } catch (e3) {
        }
      return t3;
    });
  }
  update(e2, r2) {
    if ("object" != typeof e2 || n(e2))
      return this.where(":id").equals(e2).modify(r2);
    {
      const n2 = b(e2, this.schema.primKey.keyPath);
      if (void 0 === n2)
        return ft(new X.InvalidArgument("Given object does not contain its primary key"));
      try {
        "function" != typeof r2 ? t(r2).forEach((t2) => {
          _(e2, t2, r2[t2]);
        }) : r2(e2, { value: e2, primKey: n2 });
      } catch (e3) {
      }
      return this.where(":id").equals(n2).modify(r2);
    }
  }
  put(e2, t2) {
    const { auto: n2, keyPath: r2 } = this.schema.primKey;
    let s2 = e2;
    return r2 && n2 && (s2 = Ct(r2)(e2)), this._trans("readwrite", (e3) => this.core.mutate({ trans: e3, type: "put", values: [s2], keys: null != t2 ? [t2] : null })).then((e3) => e3.numFailures ? je.reject(e3.failures[0]) : e3.lastResult).then((t3) => {
      if (r2)
        try {
          _(e2, r2, t3);
        } catch (e3) {
        }
      return t3;
    });
  }
  delete(e2) {
    return this._trans("readwrite", (t2) => this.core.mutate({ trans: t2, type: "delete", keys: [e2] })).then((e3) => e3.numFailures ? je.reject(e3.failures[0]) : void 0);
  }
  clear() {
    return this._trans("readwrite", (e2) => this.core.mutate({ trans: e2, type: "deleteRange", range: At })).then((e2) => e2.numFailures ? je.reject(e2.failures[0]) : void 0);
  }
  bulkGet(e2) {
    return this._trans("readonly", (t2) => this.core.getMany({ keys: e2, trans: t2 }).then((e3) => e3.map((e4) => this.hook.reading.fire(e4))));
  }
  bulkAdd(e2, t2, n2) {
    const r2 = Array.isArray(t2) ? t2 : void 0, s2 = (n2 = n2 || (r2 ? void 0 : t2)) ? n2.allKeys : void 0;
    return this._trans("readwrite", (t3) => {
      const { auto: n3, keyPath: i2 } = this.schema.primKey;
      if (i2 && r2)
        throw new X.InvalidArgument("bulkAdd(): keys argument invalid on tables with inbound keys");
      if (r2 && r2.length !== e2.length)
        throw new X.InvalidArgument("Arguments objects and keys must have the same length");
      const o2 = e2.length;
      let a2 = i2 && n3 ? e2.map(Ct(i2)) : e2;
      return this.core.mutate({ trans: t3, type: "add", keys: r2, values: a2, wantResults: s2 }).then(({ numFailures: e3, results: t4, lastResult: n4, failures: r3 }) => {
        if (0 === e3)
          return s2 ? t4 : n4;
        throw new G(`${this.name}.bulkAdd(): ${e3} of ${o2} operations failed`, r3);
      });
    });
  }
  bulkPut(e2, t2, n2) {
    const r2 = Array.isArray(t2) ? t2 : void 0, s2 = (n2 = n2 || (r2 ? void 0 : t2)) ? n2.allKeys : void 0;
    return this._trans("readwrite", (t3) => {
      const { auto: n3, keyPath: i2 } = this.schema.primKey;
      if (i2 && r2)
        throw new X.InvalidArgument("bulkPut(): keys argument invalid on tables with inbound keys");
      if (r2 && r2.length !== e2.length)
        throw new X.InvalidArgument("Arguments objects and keys must have the same length");
      const o2 = e2.length;
      let a2 = i2 && n3 ? e2.map(Ct(i2)) : e2;
      return this.core.mutate({ trans: t3, type: "put", keys: r2, values: a2, wantResults: s2 }).then(({ numFailures: e3, results: t4, lastResult: n4, failures: r3 }) => {
        if (0 === e3)
          return s2 ? t4 : n4;
        throw new G(`${this.name}.bulkPut(): ${e3} of ${o2} operations failed`, r3);
      });
    });
  }
  bulkDelete(e2) {
    const t2 = e2.length;
    return this._trans("readwrite", (t3) => this.core.mutate({ trans: t3, type: "delete", keys: e2 })).then(({ numFailures: e3, lastResult: n2, failures: r2 }) => {
      if (0 === e3)
        return n2;
      throw new G(`${this.name}.bulkDelete(): ${e3} of ${t2} operations failed`, r2);
    });
  }
}
function Dt(e2) {
  var r2 = {}, s2 = function(t2, n2) {
    if (n2) {
      for (var s3 = arguments.length, i3 = new Array(s3 - 1); --s3; )
        i3[s3 - 1] = arguments[s3];
      return r2[t2].subscribe.apply(null, i3), e2;
    }
    if ("string" == typeof t2)
      return r2[t2];
  };
  s2.addEventType = a2;
  for (var i2 = 1, o2 = arguments.length; i2 < o2; ++i2)
    a2(arguments[i2]);
  return s2;
  function a2(e3, i3, o3) {
    if ("object" != typeof e3) {
      var u2;
      i3 || (i3 = ae), o3 || (o3 = ee);
      var l2 = { subscribers: [], fire: o3, subscribe: function(e4) {
        -1 === l2.subscribers.indexOf(e4) && (l2.subscribers.push(e4), l2.fire = i3(l2.fire, e4));
      }, unsubscribe: function(e4) {
        l2.subscribers = l2.subscribers.filter(function(t2) {
          return t2 !== e4;
        }), l2.fire = l2.subscribers.reduce(i3, o3);
      } };
      return r2[e3] = s2[e3] = l2, l2;
    }
    t(u2 = e3).forEach(function(e4) {
      var t2 = u2[e4];
      if (n(t2))
        a2(e4, u2[e4][0], u2[e4][1]);
      else {
        if ("asap" !== t2)
          throw new X.InvalidArgument("Invalid event config");
        var r3 = a2(e4, te, function() {
          for (var e5 = arguments.length, t3 = new Array(e5); e5--; )
            t3[e5] = arguments[e5];
          r3.subscribers.forEach(function(e6) {
            v(function() {
              e6.apply(null, t3);
            });
          });
        });
      }
    });
  }
}
function It(e2, t2) {
  return c(t2).from({ prototype: e2 }), t2;
}
function Bt(e2, t2) {
  return !(e2.filter || e2.algorithm || e2.or) && (t2 ? e2.justLimit : !e2.replayFilter);
}
function Tt(e2, t2) {
  e2.filter = St(e2.filter, t2);
}
function Rt(e2, t2, n2) {
  var r2 = e2.replayFilter;
  e2.replayFilter = r2 ? () => St(r2(), t2()) : t2, e2.justLimit = n2 && !r2;
}
function Ft(e2, t2) {
  if (e2.isPrimKey)
    return t2.primaryKey;
  const n2 = t2.getIndexByKeyPath(e2.index);
  if (!n2)
    throw new X.Schema("KeyPath " + e2.index + " on object store " + t2.name + " is not indexed");
  return n2;
}
function Mt(e2, t2, n2) {
  const r2 = Ft(e2, t2.schema);
  return t2.openCursor({ trans: n2, values: !e2.keysOnly, reverse: "prev" === e2.dir, unique: !!e2.unique, query: { index: r2, range: e2.range } });
}
function Nt(e2, t2, n2, r2) {
  const s2 = e2.replayFilter ? St(e2.filter, e2.replayFilter()) : e2.filter;
  if (e2.or) {
    const i2 = {}, a2 = (e3, n3, r3) => {
      if (!s2 || s2(n3, r3, (e4) => n3.stop(e4), (e4) => n3.fail(e4))) {
        var a3 = n3.primaryKey, u2 = "" + a3;
        "[object ArrayBuffer]" === u2 && (u2 = "" + new Uint8Array(a3)), o(i2, u2) || (i2[u2] = true, t2(e3, n3, r3));
      }
    };
    return Promise.all([e2.or._iterate(a2, n2), qt(Mt(e2, r2, n2), e2.algorithm, a2, !e2.keysOnly && e2.valueMapper)]);
  }
  return qt(Mt(e2, r2, n2), St(e2.algorithm, s2), t2, !e2.keysOnly && e2.valueMapper);
}
function qt(e2, t2, n2, r2) {
  var s2 = Ye(r2 ? (e3, t3, s3) => n2(r2(e3), t3, s3) : n2);
  return e2.then((e3) => {
    if (e3)
      return e3.start(() => {
        var n3 = () => e3.continue();
        t2 && !t2(e3, (e4) => n3 = e4, (t3) => {
          e3.stop(t3), n3 = ee;
        }, (t3) => {
          e3.fail(t3), n3 = ee;
        }) || s2(e3.value, e3, (e4) => n3 = e4), n3();
      });
  });
}
function $t(e2, t2) {
  try {
    const n2 = Ut(e2), r2 = Ut(t2);
    if (n2 !== r2)
      return "Array" === n2 ? 1 : "Array" === r2 ? -1 : "binary" === n2 ? 1 : "binary" === r2 ? -1 : "string" === n2 ? 1 : "string" === r2 ? -1 : "Date" === n2 ? 1 : "Date" !== r2 ? NaN : -1;
    switch (n2) {
      case "number":
      case "Date":
      case "string":
        return e2 > t2 ? 1 : e2 < t2 ? -1 : 0;
      case "binary":
        return function(e3, t3) {
          const n3 = e3.length, r3 = t3.length, s2 = n3 < r3 ? n3 : r3;
          for (let n4 = 0; n4 < s2; ++n4)
            if (e3[n4] !== t3[n4])
              return e3[n4] < t3[n4] ? -1 : 1;
          return n3 === r3 ? 0 : n3 < r3 ? -1 : 1;
        }(Lt(e2), Lt(t2));
      case "Array":
        return function(e3, t3) {
          const n3 = e3.length, r3 = t3.length, s2 = n3 < r3 ? n3 : r3;
          for (let n4 = 0; n4 < s2; ++n4) {
            const r4 = $t(e3[n4], t3[n4]);
            if (0 !== r4)
              return r4;
          }
          return n3 === r3 ? 0 : n3 < r3 ? -1 : 1;
        }(e2, t2);
    }
  } catch (e3) {
  }
  return NaN;
}
function Ut(e2) {
  const t2 = typeof e2;
  if ("object" !== t2)
    return t2;
  if (ArrayBuffer.isView(e2))
    return "binary";
  const n2 = C(e2);
  return "ArrayBuffer" === n2 ? "binary" : n2;
}
function Lt(e2) {
  return e2 instanceof Uint8Array ? e2 : ArrayBuffer.isView(e2) ? new Uint8Array(e2.buffer, e2.byteOffset, e2.byteLength) : new Uint8Array(e2);
}
class Vt {
  _read(e2, t2) {
    var n2 = this._ctx;
    return n2.error ? n2.table._trans(null, ft.bind(null, n2.error)) : n2.table._trans("readonly", e2).then(t2);
  }
  _write(e2) {
    var t2 = this._ctx;
    return t2.error ? t2.table._trans(null, ft.bind(null, t2.error)) : t2.table._trans("readwrite", e2, "locked");
  }
  _addAlgorithm(e2) {
    var t2 = this._ctx;
    t2.algorithm = St(t2.algorithm, e2);
  }
  _iterate(e2, t2) {
    return Nt(this._ctx, e2, t2, this._ctx.table.core);
  }
  clone(e2) {
    var t2 = Object.create(this.constructor.prototype), n2 = Object.create(this._ctx);
    return e2 && r(n2, e2), t2._ctx = n2, t2;
  }
  raw() {
    return this._ctx.valueMapper = null, this;
  }
  each(e2) {
    var t2 = this._ctx;
    return this._read((n2) => Nt(t2, e2, n2, t2.table.core));
  }
  count(e2) {
    return this._read((e3) => {
      const t2 = this._ctx, n2 = t2.table.core;
      if (Bt(t2, true))
        return n2.count({ trans: e3, query: { index: Ft(t2, n2.schema), range: t2.range } }).then((e4) => Math.min(e4, t2.limit));
      var r2 = 0;
      return Nt(t2, () => (++r2, false), e3, n2).then(() => r2);
    }).then(e2);
  }
  sortBy(e2, t2) {
    const n2 = e2.split(".").reverse(), r2 = n2[0], s2 = n2.length - 1;
    function i2(e3, t3) {
      return t3 ? i2(e3[n2[t3]], t3 - 1) : e3[r2];
    }
    var o2 = "next" === this._ctx.dir ? 1 : -1;
    function a2(e3, t3) {
      var n3 = i2(e3, s2), r3 = i2(t3, s2);
      return n3 < r3 ? -o2 : n3 > r3 ? o2 : 0;
    }
    return this.toArray(function(e3) {
      return e3.sort(a2);
    }).then(t2);
  }
  toArray(e2) {
    return this._read((e3) => {
      var t2 = this._ctx;
      if ("next" === t2.dir && Bt(t2, true) && t2.limit > 0) {
        const { valueMapper: n2 } = t2, r2 = Ft(t2, t2.table.core.schema);
        return t2.table.core.query({ trans: e3, limit: t2.limit, values: true, query: { index: r2, range: t2.range } }).then(({ result: e4 }) => n2 ? e4.map(n2) : e4);
      }
      {
        const n2 = [];
        return Nt(t2, (e4) => n2.push(e4), e3, t2.table.core).then(() => n2);
      }
    }, e2);
  }
  offset(e2) {
    var t2 = this._ctx;
    return e2 <= 0 || (t2.offset += e2, Bt(t2) ? Rt(t2, () => {
      var t3 = e2;
      return (e3, n2) => 0 === t3 || (1 === t3 ? (--t3, false) : (n2(() => {
        e3.advance(t3), t3 = 0;
      }), false));
    }) : Rt(t2, () => {
      var t3 = e2;
      return () => --t3 < 0;
    })), this;
  }
  limit(e2) {
    return this._ctx.limit = Math.min(this._ctx.limit, e2), Rt(this._ctx, () => {
      var t2 = e2;
      return function(e3, n2, r2) {
        return --t2 <= 0 && n2(r2), t2 >= 0;
      };
    }, true), this;
  }
  until(e2, t2) {
    return Tt(this._ctx, function(n2, r2, s2) {
      return !e2(n2.value) || (r2(s2), t2);
    }), this;
  }
  first(e2) {
    return this.limit(1).toArray(function(e3) {
      return e3[0];
    }).then(e2);
  }
  last(e2) {
    return this.reverse().first(e2);
  }
  filter(e2) {
    var t2, n2;
    return Tt(this._ctx, function(t3) {
      return e2(t3.value);
    }), t2 = this._ctx, n2 = e2, t2.isMatch = St(t2.isMatch, n2), this;
  }
  and(e2) {
    return this.filter(e2);
  }
  or(e2) {
    return new this.db.WhereClause(this._ctx.table, e2, this);
  }
  reverse() {
    return this._ctx.dir = "prev" === this._ctx.dir ? "next" : "prev", this._ondirectionchange && this._ondirectionchange(this._ctx.dir), this;
  }
  desc() {
    return this.reverse();
  }
  eachKey(e2) {
    var t2 = this._ctx;
    return t2.keysOnly = !t2.isMatch, this.each(function(t3, n2) {
      e2(n2.key, n2);
    });
  }
  eachUniqueKey(e2) {
    return this._ctx.unique = "unique", this.eachKey(e2);
  }
  eachPrimaryKey(e2) {
    var t2 = this._ctx;
    return t2.keysOnly = !t2.isMatch, this.each(function(t3, n2) {
      e2(n2.primaryKey, n2);
    });
  }
  keys(e2) {
    var t2 = this._ctx;
    t2.keysOnly = !t2.isMatch;
    var n2 = [];
    return this.each(function(e3, t3) {
      n2.push(t3.key);
    }).then(function() {
      return n2;
    }).then(e2);
  }
  primaryKeys(e2) {
    var t2 = this._ctx;
    if ("next" === t2.dir && Bt(t2, true) && t2.limit > 0)
      return this._read((e3) => {
        var n3 = Ft(t2, t2.table.core.schema);
        return t2.table.core.query({ trans: e3, values: false, limit: t2.limit, query: { index: n3, range: t2.range } });
      }).then(({ result: e3 }) => e3).then(e2);
    t2.keysOnly = !t2.isMatch;
    var n2 = [];
    return this.each(function(e3, t3) {
      n2.push(t3.primaryKey);
    }).then(function() {
      return n2;
    }).then(e2);
  }
  uniqueKeys(e2) {
    return this._ctx.unique = "unique", this.keys(e2);
  }
  firstKey(e2) {
    return this.limit(1).keys(function(e3) {
      return e3[0];
    }).then(e2);
  }
  lastKey(e2) {
    return this.reverse().firstKey(e2);
  }
  distinct() {
    var e2 = this._ctx, t2 = e2.index && e2.table.schema.idxByName[e2.index];
    if (!t2 || !t2.multi)
      return this;
    var n2 = {};
    return Tt(this._ctx, function(e3) {
      var t3 = e3.primaryKey.toString(), r2 = o(n2, t3);
      return n2[t3] = true, !r2;
    }), this;
  }
  modify(e2) {
    var n2 = this._ctx;
    return this._write((r2) => {
      var s2;
      if ("function" == typeof e2)
        s2 = e2;
      else {
        var i2 = t(e2), o2 = i2.length;
        s2 = function(t2) {
          for (var n3 = false, r3 = 0; r3 < o2; ++r3) {
            var s3 = i2[r3], a3 = e2[s3];
            b(t2, s3) !== a3 && (_(t2, s3, a3), n3 = true);
          }
          return n3;
        };
      }
      const a2 = n2.table.core, { outbound: u2, extractKey: l2 } = a2.schema.primaryKey, c2 = this.db._options.modifyChunkSize || 200, h2 = [];
      let d2 = 0;
      const f2 = [], p2 = (e3, n3) => {
        const { failures: r3, numFailures: s3 } = n3;
        d2 += e3 - s3;
        for (let e4 of t(r3))
          h2.push(r3[e4]);
      };
      return this.clone().primaryKeys().then((t2) => {
        const i3 = (o3) => {
          const h3 = Math.min(c2, t2.length - o3);
          return a2.getMany({ trans: r2, keys: t2.slice(o3, o3 + h3), cache: "immutable" }).then((d3) => {
            const f3 = [], y2 = [], m2 = u2 ? [] : null, v2 = [];
            for (let e3 = 0; e3 < h3; ++e3) {
              const n3 = d3[e3], r3 = { value: O(n3), primKey: t2[o3 + e3] };
              false !== s2.call(r3, r3.value, r3) && (null == r3.value ? v2.push(t2[o3 + e3]) : u2 || 0 === $t(l2(n3), l2(r3.value)) ? (y2.push(r3.value), u2 && m2.push(t2[o3 + e3])) : (v2.push(t2[o3 + e3]), f3.push(r3.value)));
            }
            const g2 = Bt(n2) && n2.limit === 1 / 0 && ("function" != typeof e2 || e2 === Wt) && { index: n2.index, range: n2.range };
            return Promise.resolve(f3.length > 0 && a2.mutate({ trans: r2, type: "add", values: f3 }).then((e3) => {
              for (let t3 in e3.failures)
                v2.splice(parseInt(t3), 1);
              p2(f3.length, e3);
            })).then(() => (y2.length > 0 || g2 && "object" == typeof e2) && a2.mutate({ trans: r2, type: "put", keys: m2, values: y2, criteria: g2, changeSpec: "function" != typeof e2 && e2 }).then((e3) => p2(y2.length, e3))).then(() => (v2.length > 0 || g2 && e2 === Wt) && a2.mutate({ trans: r2, type: "delete", keys: v2, criteria: g2 }).then((e3) => p2(v2.length, e3))).then(() => t2.length > o3 + h3 && i3(o3 + c2));
          });
        };
        return i3(0).then(() => {
          if (h2.length > 0)
            throw new z("Error modifying one or more objects", h2, d2, f2);
          return t2.length;
        });
      });
    });
  }
  delete() {
    var e2 = this._ctx, t2 = e2.range;
    return Bt(e2) && (e2.isPrimKey && !kt || 3 === t2.type) ? this._write((n2) => {
      const { primaryKey: r2 } = e2.table.core.schema, s2 = t2;
      return e2.table.core.count({ trans: n2, query: { index: r2, range: s2 } }).then((t3) => e2.table.core.mutate({ trans: n2, type: "deleteRange", range: s2 }).then(({ failures: e3, lastResult: n3, results: r3, numFailures: s3 }) => {
        if (s3)
          throw new z("Could not delete some values", Object.keys(e3).map((t4) => e3[t4]), t3 - s3);
        return t3 - s3;
      }));
    }) : this.modify(Wt);
  }
}
const Wt = (e2, t2) => t2.value = null;
function Yt(e2, t2) {
  return e2 < t2 ? -1 : e2 === t2 ? 0 : 1;
}
function zt(e2, t2) {
  return e2 > t2 ? -1 : e2 === t2 ? 0 : 1;
}
function Gt(e2, t2, n2) {
  var r2 = e2 instanceof en ? new e2.Collection(e2) : e2;
  return r2._ctx.error = n2 ? new n2(t2) : new TypeError(t2), r2;
}
function Ht(e2) {
  return new e2.Collection(e2, () => Zt("")).limit(0);
}
function Qt(e2, t2, n2, r2, s2, i2) {
  for (var o2 = Math.min(e2.length, r2.length), a2 = -1, u2 = 0; u2 < o2; ++u2) {
    var l2 = t2[u2];
    if (l2 !== r2[u2])
      return s2(e2[u2], n2[u2]) < 0 ? e2.substr(0, u2) + n2[u2] + n2.substr(u2 + 1) : s2(e2[u2], r2[u2]) < 0 ? e2.substr(0, u2) + r2[u2] + n2.substr(u2 + 1) : a2 >= 0 ? e2.substr(0, a2) + t2[a2] + n2.substr(a2 + 1) : null;
    s2(e2[u2], l2) < 0 && (a2 = u2);
  }
  return o2 < r2.length && "next" === i2 ? e2 + n2.substr(e2.length) : o2 < e2.length && "prev" === i2 ? e2.substr(0, n2.length) : a2 < 0 ? null : e2.substr(0, a2) + r2[a2] + n2.substr(a2 + 1);
}
function Xt(e2, t2, n2, r2) {
  var s2, i2, o2, a2, u2, l2, c2, h2 = n2.length;
  if (!n2.every((e3) => "string" == typeof e3))
    return Gt(e2, bt);
  function d2(e3) {
    s2 = function(e4) {
      return "next" === e4 ? (e5) => e5.toUpperCase() : (e5) => e5.toLowerCase();
    }(e3), i2 = function(e4) {
      return "next" === e4 ? (e5) => e5.toLowerCase() : (e5) => e5.toUpperCase();
    }(e3), o2 = "next" === e3 ? Yt : zt;
    var t3 = n2.map(function(e4) {
      return { lower: i2(e4), upper: s2(e4) };
    }).sort(function(e4, t4) {
      return o2(e4.lower, t4.lower);
    });
    a2 = t3.map(function(e4) {
      return e4.upper;
    }), u2 = t3.map(function(e4) {
      return e4.lower;
    }), l2 = e3, c2 = "next" === e3 ? "" : r2;
  }
  d2("next");
  var f2 = new e2.Collection(e2, () => Jt(a2[0], u2[h2 - 1] + r2));
  f2._ondirectionchange = function(e3) {
    d2(e3);
  };
  var p2 = 0;
  return f2._addAlgorithm(function(e3, n3, r3) {
    var s3 = e3.key;
    if ("string" != typeof s3)
      return false;
    var d3 = i2(s3);
    if (t2(d3, u2, p2))
      return true;
    for (var f3 = null, y2 = p2; y2 < h2; ++y2) {
      var m2 = Qt(s3, d3, a2[y2], u2[y2], o2, l2);
      null === m2 && null === f3 ? p2 = y2 + 1 : (null === f3 || o2(f3, m2) > 0) && (f3 = m2);
    }
    return n3(null !== f3 ? function() {
      e3.continue(f3 + c2);
    } : r3), false;
  }), f2;
}
function Jt(e2, t2, n2, r2) {
  return { type: 2, lower: e2, upper: t2, lowerOpen: n2, upperOpen: r2 };
}
function Zt(e2) {
  return { type: 1, lower: e2, upper: e2 };
}
class en {
  get Collection() {
    return this._ctx.table.db.Collection;
  }
  between(e2, t2, n2, r2) {
    n2 = false !== n2, r2 = true === r2;
    try {
      return this._cmp(e2, t2) > 0 || 0 === this._cmp(e2, t2) && (n2 || r2) && (!n2 || !r2) ? Ht(this) : new this.Collection(this, () => Jt(e2, t2, !n2, !r2));
    } catch (e3) {
      return Gt(this, gt);
    }
  }
  equals(e2) {
    return null == e2 ? Gt(this, gt) : new this.Collection(this, () => Zt(e2));
  }
  above(e2) {
    return null == e2 ? Gt(this, gt) : new this.Collection(this, () => Jt(e2, void 0, true));
  }
  aboveOrEqual(e2) {
    return null == e2 ? Gt(this, gt) : new this.Collection(this, () => Jt(e2, void 0, false));
  }
  below(e2) {
    return null == e2 ? Gt(this, gt) : new this.Collection(this, () => Jt(void 0, e2, false, true));
  }
  belowOrEqual(e2) {
    return null == e2 ? Gt(this, gt) : new this.Collection(this, () => Jt(void 0, e2));
  }
  startsWith(e2) {
    return "string" != typeof e2 ? Gt(this, bt) : this.between(e2, e2 + mt, true, true);
  }
  startsWithIgnoreCase(e2) {
    return "" === e2 ? this.startsWith(e2) : Xt(this, (e3, t2) => 0 === e3.indexOf(t2[0]), [e2], mt);
  }
  equalsIgnoreCase(e2) {
    return Xt(this, (e3, t2) => e3 === t2[0], [e2], "");
  }
  anyOfIgnoreCase() {
    var e2 = B.apply(I, arguments);
    return 0 === e2.length ? Ht(this) : Xt(this, (e3, t2) => -1 !== t2.indexOf(e3), e2, "");
  }
  startsWithAnyOfIgnoreCase() {
    var e2 = B.apply(I, arguments);
    return 0 === e2.length ? Ht(this) : Xt(this, (e3, t2) => t2.some((t3) => 0 === e3.indexOf(t3)), e2, mt);
  }
  anyOf() {
    const e2 = B.apply(I, arguments);
    let t2 = this._cmp;
    try {
      e2.sort(t2);
    } catch (e3) {
      return Gt(this, gt);
    }
    if (0 === e2.length)
      return Ht(this);
    const n2 = new this.Collection(this, () => Jt(e2[0], e2[e2.length - 1]));
    n2._ondirectionchange = (n3) => {
      t2 = "next" === n3 ? this._ascending : this._descending, e2.sort(t2);
    };
    let r2 = 0;
    return n2._addAlgorithm((n3, s2, i2) => {
      const o2 = n3.key;
      for (; t2(o2, e2[r2]) > 0; )
        if (++r2, r2 === e2.length)
          return s2(i2), false;
      return 0 === t2(o2, e2[r2]) || (s2(() => {
        n3.continue(e2[r2]);
      }), false);
    }), n2;
  }
  notEqual(e2) {
    return this.inAnyRange([[vt, e2], [e2, this.db._maxKey]], { includeLowers: false, includeUppers: false });
  }
  noneOf() {
    const e2 = B.apply(I, arguments);
    if (0 === e2.length)
      return new this.Collection(this);
    try {
      e2.sort(this._ascending);
    } catch (e3) {
      return Gt(this, gt);
    }
    const t2 = e2.reduce((e3, t3) => e3 ? e3.concat([[e3[e3.length - 1][1], t3]]) : [[vt, t3]], null);
    return t2.push([e2[e2.length - 1], this.db._maxKey]), this.inAnyRange(t2, { includeLowers: false, includeUppers: false });
  }
  inAnyRange(e2, t2) {
    const n2 = this._cmp, r2 = this._ascending, s2 = this._descending, i2 = this._min, o2 = this._max;
    if (0 === e2.length)
      return Ht(this);
    if (!e2.every((e3) => void 0 !== e3[0] && void 0 !== e3[1] && r2(e3[0], e3[1]) <= 0))
      return Gt(this, "First argument to inAnyRange() must be an Array of two-value Arrays [lower,upper] where upper must not be lower than lower", X.InvalidArgument);
    const a2 = !t2 || false !== t2.includeLowers, u2 = t2 && true === t2.includeUppers;
    let l2, c2 = r2;
    function h2(e3, t3) {
      return c2(e3[0], t3[0]);
    }
    try {
      l2 = e2.reduce(function(e3, t3) {
        let r3 = 0, s3 = e3.length;
        for (; r3 < s3; ++r3) {
          const s4 = e3[r3];
          if (n2(t3[0], s4[1]) < 0 && n2(t3[1], s4[0]) > 0) {
            s4[0] = i2(s4[0], t3[0]), s4[1] = o2(s4[1], t3[1]);
            break;
          }
        }
        return r3 === s3 && e3.push(t3), e3;
      }, []), l2.sort(h2);
    } catch (e3) {
      return Gt(this, gt);
    }
    let d2 = 0;
    const f2 = u2 ? (e3) => r2(e3, l2[d2][1]) > 0 : (e3) => r2(e3, l2[d2][1]) >= 0, p2 = a2 ? (e3) => s2(e3, l2[d2][0]) > 0 : (e3) => s2(e3, l2[d2][0]) >= 0;
    let y2 = f2;
    const m2 = new this.Collection(this, () => Jt(l2[0][0], l2[l2.length - 1][1], !a2, !u2));
    return m2._ondirectionchange = (e3) => {
      "next" === e3 ? (y2 = f2, c2 = r2) : (y2 = p2, c2 = s2), l2.sort(h2);
    }, m2._addAlgorithm((e3, t3, n3) => {
      for (var s3 = e3.key; y2(s3); )
        if (++d2, d2 === l2.length)
          return t3(n3), false;
      return !!function(e4) {
        return !f2(e4) && !p2(e4);
      }(s3) || (0 === this._cmp(s3, l2[d2][1]) || 0 === this._cmp(s3, l2[d2][0]) || t3(() => {
        c2 === r2 ? e3.continue(l2[d2][0]) : e3.continue(l2[d2][1]);
      }), false);
    }), m2;
  }
  startsWithAnyOf() {
    const e2 = B.apply(I, arguments);
    return e2.every((e3) => "string" == typeof e3) ? 0 === e2.length ? Ht(this) : this.inAnyRange(e2.map((e3) => [e3, e3 + mt])) : Gt(this, "startsWithAnyOf() only works with strings");
  }
}
function tn(e2) {
  return Ye(function(t2) {
    return nn(t2), e2(t2.target.error), false;
  });
}
function nn(e2) {
  e2.stopPropagation && e2.stopPropagation(), e2.preventDefault && e2.preventDefault();
}
const rn = "storagemutated", sn = "x-storagemutated-1", on = Dt(null, rn);
class an {
  _lock() {
    return m(!Oe.global), ++this._reculock, 1 !== this._reculock || Oe.global || (Oe.lockOwnerFor = this), this;
  }
  _unlock() {
    if (m(!Oe.global), 0 == --this._reculock)
      for (Oe.global || (Oe.lockOwnerFor = null); this._blockedFuncs.length > 0 && !this._locked(); ) {
        var e2 = this._blockedFuncs.shift();
        try {
          at(e2[1], e2[0]);
        } catch (e3) {
        }
      }
    return this;
  }
  _locked() {
    return this._reculock && Oe.lockOwnerFor !== this;
  }
  create(e2) {
    if (!this.mode)
      return this;
    const t2 = this.db.idbdb, n2 = this.db._state.dbOpenError;
    if (m(!this.idbtrans), !e2 && !t2)
      switch (n2 && n2.name) {
        case "DatabaseClosedError":
          throw new X.DatabaseClosed(n2);
        case "MissingAPIError":
          throw new X.MissingAPI(n2.message, n2);
        default:
          throw new X.OpenFailed(n2);
      }
    if (!this.active)
      throw new X.TransactionInactive();
    return m(null === this._completion._state), (e2 = this.idbtrans = e2 || (this.db.core ? this.db.core.transaction(this.storeNames, this.mode, { durability: this.chromeTransactionDurability }) : t2.transaction(this.storeNames, this.mode, { durability: this.chromeTransactionDurability }))).onerror = Ye((t3) => {
      nn(t3), this._reject(e2.error);
    }), e2.onabort = Ye((t3) => {
      nn(t3), this.active && this._reject(new X.Abort(e2.error)), this.active = false, this.on("abort").fire(t3);
    }), e2.oncomplete = Ye(() => {
      this.active = false, this._resolve(), "mutatedParts" in e2 && on.storagemutated.fire(e2.mutatedParts);
    }), this;
  }
  _promise(e2, t2, n2) {
    if ("readwrite" === e2 && "readwrite" !== this.mode)
      return ft(new X.ReadOnly("Transaction is readonly"));
    if (!this.active)
      return ft(new X.TransactionInactive());
    if (this._locked())
      return new je((r3, s2) => {
        this._blockedFuncs.push([() => {
          this._promise(e2, t2, n2).then(r3, s2);
        }, Oe]);
      });
    if (n2)
      return Ze(() => {
        var e3 = new je((e4, n3) => {
          this._lock();
          const r3 = t2(e4, n3, this);
          r3 && r3.then && r3.then(e4, n3);
        });
        return e3.finally(() => this._unlock()), e3._lib = true, e3;
      });
    var r2 = new je((e3, n3) => {
      var r3 = t2(e3, n3, this);
      r3 && r3.then && r3.then(e3, n3);
    });
    return r2._lib = true, r2;
  }
  _root() {
    return this.parent ? this.parent._root() : this;
  }
  waitFor(e2) {
    var t2 = this._root();
    const n2 = je.resolve(e2);
    if (t2._waitingFor)
      t2._waitingFor = t2._waitingFor.then(() => n2);
    else {
      t2._waitingFor = n2, t2._waitingQueue = [];
      var r2 = t2.idbtrans.objectStore(t2.storeNames[0]);
      !function e3() {
        for (++t2._spinCount; t2._waitingQueue.length; )
          t2._waitingQueue.shift()();
        t2._waitingFor && (r2.get(-1 / 0).onsuccess = e3);
      }();
    }
    var s2 = t2._waitingFor;
    return new je((e3, r3) => {
      n2.then((n3) => t2._waitingQueue.push(Ye(e3.bind(null, n3))), (e4) => t2._waitingQueue.push(Ye(r3.bind(null, e4)))).finally(() => {
        t2._waitingFor === s2 && (t2._waitingFor = null);
      });
    });
  }
  abort() {
    this.active && (this.active = false, this.idbtrans && this.idbtrans.abort(), this._reject(new X.Abort()));
  }
  table(e2) {
    const t2 = this._memoizedTables || (this._memoizedTables = {});
    if (o(t2, e2))
      return t2[e2];
    const n2 = this.schema[e2];
    if (!n2)
      throw new X.NotFound("Table " + e2 + " not part of transaction");
    const r2 = new this.db.Table(e2, n2, this);
    return r2.core = this.db.core.table(e2), t2[e2] = r2, r2;
  }
}
function un(e2, t2, n2, r2, s2, i2, o2) {
  return { name: e2, keyPath: t2, unique: n2, multi: r2, auto: s2, compound: i2, src: (n2 && !o2 ? "&" : "") + (r2 ? "*" : "") + (s2 ? "++" : "") + ln(t2) };
}
function ln(e2) {
  return "string" == typeof e2 ? e2 : e2 ? "[" + [].join.call(e2, "+") + "]" : "";
}
function cn(e2, t2, n2) {
  return { name: e2, primKey: t2, indexes: n2, mappedClass: null, idxByName: g(n2, (e3) => [e3.name, e3]) };
}
let hn = (e2) => {
  try {
    return e2.only([[]]), hn = () => [[]], [[]];
  } catch (e3) {
    return hn = () => mt, mt;
  }
};
function dn(e2) {
  return null == e2 ? () => {
  } : "string" == typeof e2 ? function(e3) {
    const t2 = e3.split(".");
    return 1 === t2.length ? (t3) => t3[e3] : (t3) => b(t3, e3);
  }(e2) : (t2) => b(t2, e2);
}
function fn(e2) {
  return [].slice.call(e2);
}
let pn = 0;
function yn(e2) {
  return null == e2 ? ":id" : "string" == typeof e2 ? e2 : `[${e2.join("+")}]`;
}
function mn(e2, t2, r2) {
  function s2(e3) {
    if (3 === e3.type)
      return null;
    if (4 === e3.type)
      throw new Error("Cannot convert never type to IDBKeyRange");
    const { lower: n2, upper: r3, lowerOpen: s3, upperOpen: i3 } = e3;
    return void 0 === n2 ? void 0 === r3 ? null : t2.upperBound(r3, !!i3) : void 0 === r3 ? t2.lowerBound(n2, !!s3) : t2.bound(n2, r3, !!s3, !!i3);
  }
  const { schema: i2, hasGetAll: o2 } = function(e3, t3) {
    const r3 = fn(e3.objectStoreNames);
    return { schema: { name: e3.name, tables: r3.map((e4) => t3.objectStore(e4)).map((e4) => {
      const { keyPath: t4, autoIncrement: r4 } = e4, s3 = n(t4), i3 = null == t4, o3 = {}, a3 = { name: e4.name, primaryKey: { name: null, isPrimaryKey: true, outbound: i3, compound: s3, keyPath: t4, autoIncrement: r4, unique: true, extractKey: dn(t4) }, indexes: fn(e4.indexNames).map((t5) => e4.index(t5)).map((e5) => {
        const { name: t5, unique: r5, multiEntry: s4, keyPath: i4 } = e5, a4 = { name: t5, compound: n(i4), keyPath: i4, unique: r5, multiEntry: s4, extractKey: dn(i4) };
        return o3[yn(i4)] = a4, a4;
      }), getIndexByKeyPath: (e5) => o3[yn(e5)] };
      return o3[":id"] = a3.primaryKey, null != t4 && (o3[yn(t4)] = a3.primaryKey), a3;
    }) }, hasGetAll: r3.length > 0 && "getAll" in t3.objectStore(r3[0]) && !("undefined" != typeof navigator && /Safari/.test(navigator.userAgent) && !/(Chrome\/|Edge\/)/.test(navigator.userAgent) && [].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1] < 604) };
  }(e2, r2), a2 = i2.tables.map((e3) => function(e4) {
    const t3 = e4.name;
    return { name: t3, schema: e4, mutate: function({ trans: e5, type: n2, keys: r3, values: i3, range: o3 }) {
      return new Promise((a3, u3) => {
        a3 = Ye(a3);
        const l2 = e5.objectStore(t3), c2 = null == l2.keyPath, h2 = "put" === n2 || "add" === n2;
        if (!h2 && "delete" !== n2 && "deleteRange" !== n2)
          throw new Error("Invalid operation type: " + n2);
        const { length: d2 } = r3 || i3 || { length: 1 };
        if (r3 && i3 && r3.length !== i3.length)
          throw new Error("Given keys array must have same length as given values array.");
        if (0 === d2)
          return a3({ numFailures: 0, failures: {}, results: [], lastResult: void 0 });
        let f2;
        const p2 = [], y2 = [];
        let m2 = 0;
        const v2 = (e6) => {
          ++m2, nn(e6);
        };
        if ("deleteRange" === n2) {
          if (4 === o3.type)
            return a3({ numFailures: m2, failures: y2, results: [], lastResult: void 0 });
          3 === o3.type ? p2.push(f2 = l2.clear()) : p2.push(f2 = l2.delete(s2(o3)));
        } else {
          const [e6, t4] = h2 ? c2 ? [i3, r3] : [i3, null] : [r3, null];
          if (h2)
            for (let r4 = 0; r4 < d2; ++r4)
              p2.push(f2 = t4 && void 0 !== t4[r4] ? l2[n2](e6[r4], t4[r4]) : l2[n2](e6[r4])), f2.onerror = v2;
          else
            for (let t5 = 0; t5 < d2; ++t5)
              p2.push(f2 = l2[n2](e6[t5])), f2.onerror = v2;
        }
        const g2 = (e6) => {
          const t4 = e6.target.result;
          p2.forEach((e7, t5) => null != e7.error && (y2[t5] = e7.error)), a3({ numFailures: m2, failures: y2, results: "delete" === n2 ? r3 : p2.map((e7) => e7.result), lastResult: t4 });
        };
        f2.onerror = (e6) => {
          v2(e6), g2(e6);
        }, f2.onsuccess = g2;
      });
    }, getMany: ({ trans: e5, keys: n2 }) => new Promise((r3, s3) => {
      r3 = Ye(r3);
      const i3 = e5.objectStore(t3), o3 = n2.length, a3 = new Array(o3);
      let u3, l2 = 0, c2 = 0;
      const h2 = (e6) => {
        const t4 = e6.target;
        a3[t4._pos] = t4.result, ++c2 === l2 && r3(a3);
      }, d2 = tn(s3);
      for (let e6 = 0; e6 < o3; ++e6)
        null != n2[e6] && (u3 = i3.get(n2[e6]), u3._pos = e6, u3.onsuccess = h2, u3.onerror = d2, ++l2);
      0 === l2 && r3(a3);
    }), get: ({ trans: e5, key: n2 }) => new Promise((r3, s3) => {
      r3 = Ye(r3);
      const i3 = e5.objectStore(t3).get(n2);
      i3.onsuccess = (e6) => r3(e6.target.result), i3.onerror = tn(s3);
    }), query: function(e5) {
      return (n2) => new Promise((r3, i3) => {
        r3 = Ye(r3);
        const { trans: o3, values: a3, limit: u3, query: l2 } = n2, c2 = u3 === 1 / 0 ? void 0 : u3, { index: h2, range: d2 } = l2, f2 = o3.objectStore(t3), p2 = h2.isPrimaryKey ? f2 : f2.index(h2.name), y2 = s2(d2);
        if (0 === u3)
          return r3({ result: [] });
        if (e5) {
          const e6 = a3 ? p2.getAll(y2, c2) : p2.getAllKeys(y2, c2);
          e6.onsuccess = (e7) => r3({ result: e7.target.result }), e6.onerror = tn(i3);
        } else {
          let e6 = 0;
          const t4 = a3 || !("openKeyCursor" in p2) ? p2.openCursor(y2) : p2.openKeyCursor(y2), n3 = [];
          t4.onsuccess = (s3) => {
            const i4 = t4.result;
            return i4 ? (n3.push(a3 ? i4.value : i4.primaryKey), ++e6 === u3 ? r3({ result: n3 }) : void i4.continue()) : r3({ result: n3 });
          }, t4.onerror = tn(i3);
        }
      });
    }(o2), openCursor: function({ trans: e5, values: n2, query: r3, reverse: i3, unique: o3 }) {
      return new Promise((a3, u3) => {
        a3 = Ye(a3);
        const { index: l2, range: c2 } = r3, h2 = e5.objectStore(t3), d2 = l2.isPrimaryKey ? h2 : h2.index(l2.name), f2 = i3 ? o3 ? "prevunique" : "prev" : o3 ? "nextunique" : "next", p2 = n2 || !("openKeyCursor" in d2) ? d2.openCursor(s2(c2), f2) : d2.openKeyCursor(s2(c2), f2);
        p2.onerror = tn(u3), p2.onsuccess = Ye((t4) => {
          const n3 = p2.result;
          if (!n3)
            return void a3(null);
          n3.___id = ++pn, n3.done = false;
          const r4 = n3.continue.bind(n3);
          let s3 = n3.continuePrimaryKey;
          s3 && (s3 = s3.bind(n3));
          const i4 = n3.advance.bind(n3), o4 = () => {
            throw new Error("Cursor not stopped");
          };
          n3.trans = e5, n3.stop = n3.continue = n3.continuePrimaryKey = n3.advance = () => {
            throw new Error("Cursor not started");
          }, n3.fail = Ye(u3), n3.next = function() {
            let e6 = 1;
            return this.start(() => e6-- ? this.continue() : this.stop()).then(() => this);
          }, n3.start = (e6) => {
            const t5 = new Promise((e7, t6) => {
              e7 = Ye(e7), p2.onerror = tn(t6), n3.fail = t6, n3.stop = (t7) => {
                n3.stop = n3.continue = n3.continuePrimaryKey = n3.advance = o4, e7(t7);
              };
            }), a4 = () => {
              if (p2.result)
                try {
                  e6();
                } catch (e7) {
                  n3.fail(e7);
                }
              else
                n3.done = true, n3.start = () => {
                  throw new Error("Cursor behind last entry");
                }, n3.stop();
            };
            return p2.onsuccess = Ye((e7) => {
              p2.onsuccess = a4, a4();
            }), n3.continue = r4, n3.continuePrimaryKey = s3, n3.advance = i4, a4(), t5;
          }, a3(n3);
        }, u3);
      });
    }, count({ query: e5, trans: n2 }) {
      const { index: r3, range: i3 } = e5;
      return new Promise((e6, o3) => {
        const a3 = n2.objectStore(t3), u3 = r3.isPrimaryKey ? a3 : a3.index(r3.name), l2 = s2(i3), c2 = l2 ? u3.count(l2) : u3.count();
        c2.onsuccess = Ye((t4) => e6(t4.target.result)), c2.onerror = tn(o3);
      });
    } };
  }(e3)), u2 = {};
  return a2.forEach((e3) => u2[e3.name] = e3), { stack: "dbcore", transaction: e2.transaction.bind(e2), table(e3) {
    if (!u2[e3])
      throw new Error(`Table '${e3}' not found`);
    return u2[e3];
  }, MIN_KEY: -1 / 0, MAX_KEY: hn(t2), schema: i2 };
}
function vn({ _novip: e2 }, t2) {
  const n2 = t2.db, r2 = function(e3, t3, { IDBKeyRange: n3, indexedDB: r3 }, s2) {
    const i2 = function(e4, t4) {
      return t4.reduce((e5, { create: t5 }) => ({ ...e5, ...t5(e5) }), e4);
    }(mn(t3, n3, s2), e3.dbcore);
    return { dbcore: i2 };
  }(e2._middlewares, n2, e2._deps, t2);
  e2.core = r2.dbcore, e2.tables.forEach((t3) => {
    const n3 = t3.name;
    e2.core.schema.tables.some((e3) => e3.name === n3) && (t3.core = e2.core.table(n3), e2[n3] instanceof e2.Table && (e2[n3].core = t3.core));
  });
}
function gn({ _novip: e2 }, t2, n2, r2) {
  n2.forEach((n3) => {
    const s2 = r2[n3];
    t2.forEach((t3) => {
      const r3 = d(t3, n3);
      (!r3 || "value" in r3 && void 0 === r3.value) && (t3 === e2.Transaction.prototype || t3 instanceof e2.Transaction ? l(t3, n3, { get() {
        return this.table(n3);
      }, set(e3) {
        u(this, n3, { value: e3, writable: true, configurable: true, enumerable: true });
      } }) : t3[n3] = new e2.Table(n3, s2));
    });
  });
}
function bn({ _novip: e2 }, t2) {
  t2.forEach((t3) => {
    for (let n2 in t3)
      t3[n2] instanceof e2.Table && delete t3[n2];
  });
}
function _n(e2, t2) {
  return e2._cfg.version - t2._cfg.version;
}
function wn(e2, n2, r2, s2) {
  const i2 = e2._dbSchema, o2 = e2._createTransaction("readwrite", e2._storeNames, i2);
  o2.create(r2), o2._completion.catch(s2);
  const a2 = o2._reject.bind(o2), u2 = Oe.transless || Oe;
  Ze(() => {
    Oe.trans = o2, Oe.transless = u2, 0 === n2 ? (t(i2).forEach((e3) => {
      kn(r2, e3, i2[e3].primKey, i2[e3].indexes);
    }), vn(e2, r2), je.follow(() => e2.on.populate.fire(o2)).catch(a2)) : function({ _novip: e3 }, n3, r3, s3) {
      const i3 = [], o3 = e3._versions;
      let a3 = e3._dbSchema = Pn(e3, e3.idbdb, s3), u3 = false;
      const l2 = o3.filter((e4) => e4._cfg.version >= n3);
      function c2() {
        return i3.length ? je.resolve(i3.shift()(r3.idbtrans)).then(c2) : je.resolve();
      }
      return l2.forEach((o4) => {
        i3.push(() => {
          const i4 = a3, l3 = o4._cfg.dbschema;
          Kn(e3, i4, s3), Kn(e3, l3, s3), a3 = e3._dbSchema = l3;
          const c3 = xn(i4, l3);
          c3.add.forEach((e4) => {
            kn(s3, e4[0], e4[1].primKey, e4[1].indexes);
          }), c3.change.forEach((e4) => {
            if (e4.recreate)
              throw new X.Upgrade("Not yet support for changing primary key");
            {
              const t2 = s3.objectStore(e4.name);
              e4.add.forEach((e5) => En(t2, e5)), e4.change.forEach((e5) => {
                t2.deleteIndex(e5.name), En(t2, e5);
              }), e4.del.forEach((e5) => t2.deleteIndex(e5));
            }
          });
          const h2 = o4._cfg.contentUpgrade;
          if (h2 && o4._cfg.version > n3) {
            vn(e3, s3), r3._memoizedTables = {}, u3 = true;
            let n4 = w(l3);
            c3.del.forEach((e4) => {
              n4[e4] = i4[e4];
            }), bn(e3, [e3.Transaction.prototype]), gn(e3, [e3.Transaction.prototype], t(n4), n4), r3.schema = n4;
            const o5 = T(h2);
            let a4;
            o5 && et();
            const d2 = je.follow(() => {
              if (a4 = h2(r3), a4 && o5) {
                var e4 = tt.bind(null, null);
                a4.then(e4, e4);
              }
            });
            return a4 && "function" == typeof a4.then ? je.resolve(a4) : d2.then(() => a4);
          }
        }), i3.push((t2) => {
          if (!u3 || !xt) {
            !function(e4, t3) {
              [].slice.call(t3.db.objectStoreNames).forEach((n4) => null == e4[n4] && t3.db.deleteObjectStore(n4));
            }(o4._cfg.dbschema, t2);
          }
          bn(e3, [e3.Transaction.prototype]), gn(e3, [e3.Transaction.prototype], e3._storeNames, e3._dbSchema), r3.schema = e3._dbSchema;
        });
      }), c2().then(() => {
        var e4, n4;
        n4 = s3, t(e4 = a3).forEach((t2) => {
          n4.db.objectStoreNames.contains(t2) || kn(n4, t2, e4[t2].primKey, e4[t2].indexes);
        });
      });
    }(e2, n2, o2, r2).catch(a2);
  });
}
function xn(e2, t2) {
  const n2 = { del: [], add: [], change: [] };
  let r2;
  for (r2 in e2)
    t2[r2] || n2.del.push(r2);
  for (r2 in t2) {
    const s2 = e2[r2], i2 = t2[r2];
    if (s2) {
      const e3 = { name: r2, def: i2, recreate: false, del: [], add: [], change: [] };
      if ("" + (s2.primKey.keyPath || "") != "" + (i2.primKey.keyPath || "") || s2.primKey.auto !== i2.primKey.auto && !wt)
        e3.recreate = true, n2.change.push(e3);
      else {
        const t3 = s2.idxByName, r3 = i2.idxByName;
        let o2;
        for (o2 in t3)
          r3[o2] || e3.del.push(o2);
        for (o2 in r3) {
          const n3 = t3[o2], s3 = r3[o2];
          n3 ? n3.src !== s3.src && e3.change.push(s3) : e3.add.push(s3);
        }
        (e3.del.length > 0 || e3.add.length > 0 || e3.change.length > 0) && n2.change.push(e3);
      }
    } else
      n2.add.push([r2, i2]);
  }
  return n2;
}
function kn(e2, t2, n2, r2) {
  const s2 = e2.db.createObjectStore(t2, n2.keyPath ? { keyPath: n2.keyPath, autoIncrement: n2.auto } : { autoIncrement: n2.auto });
  return r2.forEach((e3) => En(s2, e3)), s2;
}
function En(e2, t2) {
  e2.createIndex(t2.name, t2.keyPath, { unique: t2.unique, multiEntry: t2.multi });
}
function Pn(e2, t2, n2) {
  const r2 = {};
  return p(t2.objectStoreNames, 0).forEach((e3) => {
    const t3 = n2.objectStore(e3);
    let s2 = t3.keyPath;
    const i2 = un(ln(s2), s2 || "", false, false, !!t3.autoIncrement, s2 && "string" != typeof s2, true), o2 = [];
    for (let e4 = 0; e4 < t3.indexNames.length; ++e4) {
      const n3 = t3.index(t3.indexNames[e4]);
      s2 = n3.keyPath;
      var a2 = un(n3.name, s2, !!n3.unique, !!n3.multiEntry, false, s2 && "string" != typeof s2, false);
      o2.push(a2);
    }
    r2[e3] = cn(e3, i2, o2);
  }), r2;
}
function Kn({ _novip: t2 }, n2, r2) {
  const s2 = r2.db.objectStoreNames;
  for (let e2 = 0; e2 < s2.length; ++e2) {
    const i2 = s2[e2], o2 = r2.objectStore(i2);
    t2._hasGetAll = "getAll" in o2;
    for (let e3 = 0; e3 < o2.indexNames.length; ++e3) {
      const t3 = o2.indexNames[e3], r3 = o2.index(t3).keyPath, s3 = "string" == typeof r3 ? r3 : "[" + p(r3).join("+") + "]";
      if (n2[i2]) {
        const e4 = n2[i2].idxByName[s3];
        e4 && (e4.name = t3, delete n2[i2].idxByName[s3], n2[i2].idxByName[t3] = e4);
      }
    }
  }
  "undefined" != typeof navigator && /Safari/.test(navigator.userAgent) && !/(Chrome\/|Edge\/)/.test(navigator.userAgent) && e.WorkerGlobalScope && e instanceof e.WorkerGlobalScope && [].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1] < 604 && (t2._hasGetAll = false);
}
class On {
  _parseStoresSpec(e2, r2) {
    t(e2).forEach((t2) => {
      if (null !== e2[t2]) {
        var s2 = e2[t2].split(",").map((e3, t3) => {
          const r3 = (e3 = e3.trim()).replace(/([&*]|\+\+)/g, ""), s3 = /^\[/.test(r3) ? r3.match(/^\[(.*)\]$/)[1].split("+") : r3;
          return un(r3, s3 || null, /\&/.test(e3), /\*/.test(e3), /\+\+/.test(e3), n(s3), 0 === t3);
        }), i2 = s2.shift();
        if (i2.multi)
          throw new X.Schema("Primary key cannot be multi-valued");
        s2.forEach((e3) => {
          if (e3.auto)
            throw new X.Schema("Only primary key can be marked as autoIncrement (++)");
          if (!e3.keyPath)
            throw new X.Schema("Index must have a name and cannot be an empty string");
        }), r2[t2] = cn(t2, i2, s2);
      }
    });
  }
  stores(e2) {
    const n2 = this.db;
    this._cfg.storesSource = this._cfg.storesSource ? r(this._cfg.storesSource, e2) : e2;
    const s2 = n2._versions, i2 = {};
    let o2 = {};
    return s2.forEach((e3) => {
      r(i2, e3._cfg.storesSource), o2 = e3._cfg.dbschema = {}, e3._parseStoresSpec(i2, o2);
    }), n2._dbSchema = o2, bn(n2, [n2._allTables, n2, n2.Transaction.prototype]), gn(n2, [n2._allTables, n2, n2.Transaction.prototype, this._cfg.tables], t(o2), o2), n2._storeNames = t(o2), this;
  }
  upgrade(e2) {
    return this._cfg.contentUpgrade = ue(this._cfg.contentUpgrade || ee, e2), this;
  }
}
function Sn(e2, t2) {
  let n2 = e2._dbNamesDB;
  return n2 || (n2 = e2._dbNamesDB = new Xn(Pt, { addons: [], indexedDB: e2, IDBKeyRange: t2 }), n2.version(1).stores({ dbnames: "name" })), n2.table("dbnames");
}
function An(e2) {
  return e2 && "function" == typeof e2.databases;
}
function Cn(e2) {
  return Ze(function() {
    return Oe.letThrough = true, e2();
  });
}
function jn() {
  var e2;
  return !navigator.userAgentData && /Safari\//.test(navigator.userAgent) && !/Chrom(e|ium)\//.test(navigator.userAgent) && indexedDB.databases ? new Promise(function(t2) {
    var n2 = function() {
      return indexedDB.databases().finally(t2);
    };
    e2 = setInterval(n2, 100), n2();
  }).finally(function() {
    return clearInterval(e2);
  }) : Promise.resolve();
}
function Dn(e2) {
  const n2 = e2._state, { indexedDB: r2 } = e2._deps;
  if (n2.isBeingOpened || e2.idbdb)
    return n2.dbReadyPromise.then(() => n2.dbOpenError ? ft(n2.dbOpenError) : e2);
  R && (n2.openCanceller._stackHolder = q()), n2.isBeingOpened = true, n2.dbOpenError = null, n2.openComplete = false;
  const s2 = n2.openCanceller;
  function i2() {
    if (n2.openCanceller !== s2)
      throw new X.DatabaseClosed("db.open() was cancelled");
  }
  let o2 = n2.dbReadyResolve, a2 = null, u2 = false;
  return je.race([s2, ("undefined" == typeof navigator ? je.resolve() : jn()).then(() => new je((s3, o3) => {
    if (i2(), !r2)
      throw new X.MissingAPI();
    const l2 = e2.name, c2 = n2.autoSchema ? r2.open(l2) : r2.open(l2, Math.round(10 * e2.verno));
    if (!c2)
      throw new X.MissingAPI();
    c2.onerror = tn(o3), c2.onblocked = Ye(e2._fireOnBlocked), c2.onupgradeneeded = Ye((t2) => {
      if (a2 = c2.transaction, n2.autoSchema && !e2._options.allowEmptyDB) {
        c2.onerror = nn, a2.abort(), c2.result.close();
        const e3 = r2.deleteDatabase(l2);
        e3.onsuccess = e3.onerror = Ye(() => {
          o3(new X.NoSuchDatabase(`Database ${l2} doesnt exist`));
        });
      } else {
        a2.onerror = tn(o3);
        var s4 = t2.oldVersion > Math.pow(2, 62) ? 0 : t2.oldVersion;
        u2 = s4 < 1, e2._novip.idbdb = c2.result, wn(e2, s4 / 10, a2, o3);
      }
    }, o3), c2.onsuccess = Ye(() => {
      a2 = null;
      const r3 = e2._novip.idbdb = c2.result, i3 = p(r3.objectStoreNames);
      if (i3.length > 0)
        try {
          const s4 = r3.transaction(1 === (o4 = i3).length ? o4[0] : o4, "readonly");
          n2.autoSchema ? function({ _novip: e3 }, n3, r4) {
            e3.verno = n3.version / 10;
            const s5 = e3._dbSchema = Pn(0, n3, r4);
            e3._storeNames = p(n3.objectStoreNames, 0), gn(e3, [e3._allTables], t(s5), s5);
          }(e2, r3, s4) : (Kn(e2, e2._dbSchema, s4), function(e3, t2) {
            const n3 = xn(Pn(0, e3.idbdb, t2), e3._dbSchema);
            return !(n3.add.length || n3.change.some((e4) => e4.add.length || e4.change.length));
          }(e2, s4) || console.warn("Dexie SchemaDiff: Schema was extended without increasing the number passed to db.version(). Some queries may fail.")), vn(e2, s4);
        } catch (e3) {
        }
      var o4;
      _t.push(e2), r3.onversionchange = Ye((t2) => {
        n2.vcFired = true, e2.on("versionchange").fire(t2);
      }), r3.onclose = Ye((t2) => {
        e2.on("close").fire(t2);
      }), u2 && function({ indexedDB: e3, IDBKeyRange: t2 }, n3) {
        !An(e3) && n3 !== Pt && Sn(e3, t2).put({ name: n3 }).catch(ee);
      }(e2._deps, l2), s3();
    }, o3);
  }))]).then(() => (i2(), n2.onReadyBeingFired = [], je.resolve(Cn(() => e2.on.ready.fire(e2.vip))).then(function t2() {
    if (n2.onReadyBeingFired.length > 0) {
      let r3 = n2.onReadyBeingFired.reduce(ue, ee);
      return n2.onReadyBeingFired = [], je.resolve(Cn(() => r3(e2.vip))).then(t2);
    }
  }))).finally(() => {
    n2.onReadyBeingFired = null, n2.isBeingOpened = false;
  }).then(() => e2).catch((t2) => {
    n2.dbOpenError = t2;
    try {
      a2 && a2.abort();
    } catch (e3) {
    }
    return s2 === n2.openCanceller && e2._close(), ft(t2);
  }).finally(() => {
    n2.openComplete = true, o2();
  });
}
function In(e2) {
  var t2 = (t3) => e2.next(t3), r2 = i2(t2), s2 = i2((t3) => e2.throw(t3));
  function i2(e3) {
    return (t3) => {
      var i3 = e3(t3), o2 = i3.value;
      return i3.done ? o2 : o2 && "function" == typeof o2.then ? o2.then(r2, s2) : n(o2) ? Promise.all(o2).then(r2, s2) : r2(o2);
    };
  }
  return i2(t2)();
}
function Bn(e2, t2, n2) {
  var r2 = arguments.length;
  if (r2 < 2)
    throw new X.InvalidArgument("Too few arguments");
  for (var s2 = new Array(r2 - 1); --r2; )
    s2[r2 - 1] = arguments[r2];
  return n2 = s2.pop(), [e2, k(s2), n2];
}
function Tn(e2, t2, n2, r2, s2) {
  return je.resolve().then(() => {
    const i2 = Oe.transless || Oe, o2 = e2._createTransaction(t2, n2, e2._dbSchema, r2), a2 = { trans: o2, transless: i2 };
    if (r2)
      o2.idbtrans = r2.idbtrans;
    else
      try {
        o2.create(), e2._state.PR1398_maxLoop = 3;
      } catch (r3) {
        return r3.name === H.InvalidState && e2.isOpen() && --e2._state.PR1398_maxLoop > 0 ? (console.warn("Dexie: Need to reopen db"), e2._close(), e2.open().then(() => Tn(e2, t2, n2, null, s2))) : ft(r3);
      }
    const u2 = T(s2);
    let l2;
    u2 && et();
    const c2 = je.follow(() => {
      if (l2 = s2.call(o2, o2), l2)
        if (u2) {
          var e3 = tt.bind(null, null);
          l2.then(e3, e3);
        } else
          "function" == typeof l2.next && "function" == typeof l2.throw && (l2 = In(l2));
    }, a2);
    return (l2 && "function" == typeof l2.then ? je.resolve(l2).then((e3) => o2.active ? e3 : ft(new X.PrematureCommit("Transaction committed too early. See http://bit.ly/2kdckMn"))) : c2.then(() => l2)).then((e3) => (r2 && o2._resolve(), o2._completion.then(() => e3))).catch((e3) => (o2._reject(e3), ft(e3)));
  });
}
function Rn(e2, t2, r2) {
  const s2 = n(e2) ? e2.slice() : [e2];
  for (let e3 = 0; e3 < r2; ++e3)
    s2.push(t2);
  return s2;
}
const Fn = { stack: "dbcore", name: "VirtualIndexMiddleware", level: 1, create: function(e2) {
  return { ...e2, table(t2) {
    const n2 = e2.table(t2), { schema: r2 } = n2, s2 = {}, i2 = [];
    function o2(e3, t3, n3) {
      const r3 = yn(e3), a3 = s2[r3] = s2[r3] || [], u3 = null == e3 ? 0 : "string" == typeof e3 ? 1 : e3.length, l3 = t3 > 0, c2 = { ...n3, isVirtual: l3, keyTail: t3, keyLength: u3, extractKey: dn(e3), unique: !l3 && n3.unique };
      if (a3.push(c2), c2.isPrimaryKey || i2.push(c2), u3 > 1) {
        o2(2 === u3 ? e3[0] : e3.slice(0, u3 - 1), t3 + 1, n3);
      }
      return a3.sort((e4, t4) => e4.keyTail - t4.keyTail), c2;
    }
    const a2 = o2(r2.primaryKey.keyPath, 0, r2.primaryKey);
    s2[":id"] = [a2];
    for (const e3 of r2.indexes)
      o2(e3.keyPath, 0, e3);
    function u2(t3) {
      const n3 = t3.query.index;
      return n3.isVirtual ? { ...t3, query: { index: n3, range: (r3 = t3.query.range, s3 = n3.keyTail, { type: 1 === r3.type ? 2 : r3.type, lower: Rn(r3.lower, r3.lowerOpen ? e2.MAX_KEY : e2.MIN_KEY, s3), lowerOpen: true, upper: Rn(r3.upper, r3.upperOpen ? e2.MIN_KEY : e2.MAX_KEY, s3), upperOpen: true }) } } : t3;
      var r3, s3;
    }
    const l2 = { ...n2, schema: { ...r2, primaryKey: a2, indexes: i2, getIndexByKeyPath: function(e3) {
      const t3 = s2[yn(e3)];
      return t3 && t3[0];
    } }, count: (e3) => n2.count(u2(e3)), query: (e3) => n2.query(u2(e3)), openCursor(t3) {
      const { keyTail: r3, isVirtual: s3, keyLength: i3 } = t3.query.index;
      if (!s3)
        return n2.openCursor(t3);
      return n2.openCursor(u2(t3)).then((n3) => n3 && function(n4) {
        const s4 = Object.create(n4, { continue: { value: function(s5) {
          null != s5 ? n4.continue(Rn(s5, t3.reverse ? e2.MAX_KEY : e2.MIN_KEY, r3)) : t3.unique ? n4.continue(n4.key.slice(0, i3).concat(t3.reverse ? e2.MIN_KEY : e2.MAX_KEY, r3)) : n4.continue();
        } }, continuePrimaryKey: { value(t4, s5) {
          n4.continuePrimaryKey(Rn(t4, e2.MAX_KEY, r3), s5);
        } }, primaryKey: { get: () => n4.primaryKey }, key: { get() {
          const e3 = n4.key;
          return 1 === i3 ? e3[0] : e3.slice(0, i3);
        } }, value: { get: () => n4.value } });
        return s4;
      }(n3));
    } };
    return l2;
  } };
} };
function Mn(e2, n2, r2, s2) {
  return r2 = r2 || {}, s2 = s2 || "", t(e2).forEach((t2) => {
    if (o(n2, t2)) {
      var i2 = e2[t2], a2 = n2[t2];
      if ("object" == typeof i2 && "object" == typeof a2 && i2 && a2) {
        const e3 = C(i2);
        e3 !== C(a2) ? r2[s2 + t2] = n2[t2] : "Object" === e3 ? Mn(i2, a2, r2, s2 + t2 + ".") : i2 !== a2 && (r2[s2 + t2] = n2[t2]);
      } else
        i2 !== a2 && (r2[s2 + t2] = n2[t2]);
    } else
      r2[s2 + t2] = void 0;
  }), t(n2).forEach((t2) => {
    o(e2, t2) || (r2[s2 + t2] = n2[t2]);
  }), r2;
}
const Nn = { stack: "dbcore", name: "HooksMiddleware", level: 2, create: (e2) => ({ ...e2, table(t2) {
  const n2 = e2.table(t2), { primaryKey: r2 } = n2.schema, s2 = { ...n2, mutate(e3) {
    const s3 = Oe.trans, { deleting: i2, creating: a2, updating: u2 } = s3.table(t2).hook;
    switch (e3.type) {
      case "add":
        if (a2.fire === ee)
          break;
        return s3._promise("readwrite", () => l2(e3), true);
      case "put":
        if (a2.fire === ee && u2.fire === ee)
          break;
        return s3._promise("readwrite", () => l2(e3), true);
      case "delete":
        if (i2.fire === ee)
          break;
        return s3._promise("readwrite", () => l2(e3), true);
      case "deleteRange":
        if (i2.fire === ee)
          break;
        return s3._promise("readwrite", () => function(e4) {
          return c2(e4.trans, e4.range, 1e4);
        }(e3), true);
    }
    return n2.mutate(e3);
    function l2(e4) {
      const t3 = Oe.trans, s4 = e4.keys || function(e5, t4) {
        return "delete" === t4.type ? t4.keys : t4.keys || t4.values.map(e5.extractKey);
      }(r2, e4);
      if (!s4)
        throw new Error("Keys missing");
      return "delete" !== (e4 = "add" === e4.type || "put" === e4.type ? { ...e4, keys: s4 } : { ...e4 }).type && (e4.values = [...e4.values]), e4.keys && (e4.keys = [...e4.keys]), function(e5, t4, n3) {
        return "add" === t4.type ? Promise.resolve([]) : e5.getMany({ trans: t4.trans, keys: n3, cache: "immutable" });
      }(n2, e4, s4).then((l3) => {
        const c3 = s4.map((n3, s5) => {
          const c4 = l3[s5], h2 = { onerror: null, onsuccess: null };
          if ("delete" === e4.type)
            i2.fire.call(h2, n3, c4, t3);
          else if ("add" === e4.type || void 0 === c4) {
            const i3 = a2.fire.call(h2, n3, e4.values[s5], t3);
            null == n3 && null != i3 && (n3 = i3, e4.keys[s5] = n3, r2.outbound || _(e4.values[s5], r2.keyPath, n3));
          } else {
            const r3 = Mn(c4, e4.values[s5]), i3 = u2.fire.call(h2, r3, n3, c4, t3);
            if (i3) {
              const t4 = e4.values[s5];
              Object.keys(i3).forEach((e5) => {
                o(t4, e5) ? t4[e5] = i3[e5] : _(t4, e5, i3[e5]);
              });
            }
          }
          return h2;
        });
        return n2.mutate(e4).then(({ failures: t4, results: n3, numFailures: r3, lastResult: i3 }) => {
          for (let r4 = 0; r4 < s4.length; ++r4) {
            const i4 = n3 ? n3[r4] : s4[r4], o2 = c3[r4];
            null == i4 ? o2.onerror && o2.onerror(t4[r4]) : o2.onsuccess && o2.onsuccess("put" === e4.type && l3[r4] ? e4.values[r4] : i4);
          }
          return { failures: t4, results: n3, numFailures: r3, lastResult: i3 };
        }).catch((e5) => (c3.forEach((t4) => t4.onerror && t4.onerror(e5)), Promise.reject(e5)));
      });
    }
    function c2(e4, t3, s4) {
      return n2.query({ trans: e4, values: false, query: { index: r2, range: t3 }, limit: s4 }).then(({ result: n3 }) => l2({ type: "delete", keys: n3, trans: e4 }).then((r3) => r3.numFailures > 0 ? Promise.reject(r3.failures[0]) : n3.length < s4 ? { failures: [], numFailures: 0, lastResult: void 0 } : c2(e4, { ...t3, lower: n3[n3.length - 1], lowerOpen: true }, s4)));
    }
  } };
  return s2;
} }) };
function qn(e2, t2, n2) {
  try {
    if (!t2)
      return null;
    if (t2.keys.length < e2.length)
      return null;
    const r2 = [];
    for (let s2 = 0, i2 = 0; s2 < t2.keys.length && i2 < e2.length; ++s2)
      0 === $t(t2.keys[s2], e2[i2]) && (r2.push(n2 ? O(t2.values[s2]) : t2.values[s2]), ++i2);
    return r2.length === e2.length ? r2 : null;
  } catch (e3) {
    return null;
  }
}
const $n = { stack: "dbcore", level: -1, create: (e2) => ({ table: (t2) => {
  const n2 = e2.table(t2);
  return { ...n2, getMany: (e3) => {
    if (!e3.cache)
      return n2.getMany(e3);
    const t3 = qn(e3.keys, e3.trans._cache, "clone" === e3.cache);
    return t3 ? je.resolve(t3) : n2.getMany(e3).then((t4) => (e3.trans._cache = { keys: e3.keys, values: "clone" === e3.cache ? O(t4) : t4 }, t4));
  }, mutate: (e3) => ("add" !== e3.type && (e3.trans._cache = null), n2.mutate(e3)) };
} }) };
function Un(e2) {
  return !("from" in e2);
}
const Ln = function(e2, t2) {
  if (!this) {
    const t3 = new Ln();
    return e2 && "d" in e2 && r(t3, e2), t3;
  }
  r(this, arguments.length ? { d: 1, from: e2, to: arguments.length > 1 ? t2 : e2 } : { d: 0 });
};
function Vn(e2, t2, n2) {
  const s2 = $t(t2, n2);
  if (isNaN(s2))
    return;
  if (s2 > 0)
    throw RangeError();
  if (Un(e2))
    return r(e2, { from: t2, to: n2, d: 1 });
  const i2 = e2.l, o2 = e2.r;
  if ($t(n2, e2.from) < 0)
    return i2 ? Vn(i2, t2, n2) : e2.l = { from: t2, to: n2, d: 1, l: null, r: null }, Gn(e2);
  if ($t(t2, e2.to) > 0)
    return o2 ? Vn(o2, t2, n2) : e2.r = { from: t2, to: n2, d: 1, l: null, r: null }, Gn(e2);
  $t(t2, e2.from) < 0 && (e2.from = t2, e2.l = null, e2.d = o2 ? o2.d + 1 : 1), $t(n2, e2.to) > 0 && (e2.to = n2, e2.r = null, e2.d = e2.l ? e2.l.d + 1 : 1);
  const a2 = !e2.r;
  i2 && !e2.l && Wn(e2, i2), o2 && a2 && Wn(e2, o2);
}
function Wn(e2, t2) {
  Un(t2) || function e3(t3, { from: n2, to: r2, l: s2, r: i2 }) {
    Vn(t3, n2, r2), s2 && e3(t3, s2), i2 && e3(t3, i2);
  }(e2, t2);
}
function Yn(e2, t2) {
  const n2 = zn(t2);
  let r2 = n2.next();
  if (r2.done)
    return false;
  let s2 = r2.value;
  const i2 = zn(e2);
  let o2 = i2.next(s2.from), a2 = o2.value;
  for (; !r2.done && !o2.done; ) {
    if ($t(a2.from, s2.to) <= 0 && $t(a2.to, s2.from) >= 0)
      return true;
    $t(s2.from, a2.from) < 0 ? s2 = (r2 = n2.next(a2.from)).value : a2 = (o2 = i2.next(s2.from)).value;
  }
  return false;
}
function zn(e2) {
  let t2 = Un(e2) ? null : { s: 0, n: e2 };
  return { next(e3) {
    const n2 = arguments.length > 0;
    for (; t2; )
      switch (t2.s) {
        case 0:
          if (t2.s = 1, n2)
            for (; t2.n.l && $t(e3, t2.n.from) < 0; )
              t2 = { up: t2, n: t2.n.l, s: 1 };
          else
            for (; t2.n.l; )
              t2 = { up: t2, n: t2.n.l, s: 1 };
        case 1:
          if (t2.s = 2, !n2 || $t(e3, t2.n.to) <= 0)
            return { value: t2.n, done: false };
        case 2:
          if (t2.n.r) {
            t2.s = 3, t2 = { up: t2, n: t2.n.r, s: 0 };
            continue;
          }
        case 3:
          t2 = t2.up;
      }
    return { done: true };
  } };
}
function Gn(e2) {
  var t2, n2;
  const r2 = ((null === (t2 = e2.r) || void 0 === t2 ? void 0 : t2.d) || 0) - ((null === (n2 = e2.l) || void 0 === n2 ? void 0 : n2.d) || 0), s2 = r2 > 1 ? "r" : r2 < -1 ? "l" : "";
  if (s2) {
    const t3 = "r" === s2 ? "l" : "r", n3 = { ...e2 }, r3 = e2[s2];
    e2.from = r3.from, e2.to = r3.to, e2[s2] = r3[s2], n3[s2] = r3[t3], e2[t3] = n3, n3.d = Hn(n3);
  }
  e2.d = Hn(e2);
}
function Hn({ r: e2, l: t2 }) {
  return (e2 ? t2 ? Math.max(e2.d, t2.d) : e2.d : t2 ? t2.d : 0) + 1;
}
a(Ln.prototype, { add(e2) {
  return Wn(this, e2), this;
}, addKey(e2) {
  return Vn(this, e2, e2), this;
}, addKeys(e2) {
  return e2.forEach((e3) => Vn(this, e3, e3)), this;
}, [j]() {
  return zn(this);
} });
const Qn = { stack: "dbcore", level: 0, create: (e2) => {
  const r2 = e2.schema.name, s2 = new Ln(e2.MIN_KEY, e2.MAX_KEY);
  return { ...e2, table: (i2) => {
    const o2 = e2.table(i2), { schema: a2 } = o2, { primaryKey: u2 } = a2, { extractKey: l2, outbound: c2 } = u2, h2 = { ...o2, mutate: (e3) => {
      const t2 = e3.trans, u3 = t2.mutatedParts || (t2.mutatedParts = {}), l3 = (e4) => {
        const t3 = `idb://${r2}/${i2}/${e4}`;
        return u3[t3] || (u3[t3] = new Ln());
      }, c3 = l3(""), h3 = l3(":dels"), { type: d3 } = e3;
      let [f3, p2] = "deleteRange" === e3.type ? [e3.range] : "delete" === e3.type ? [e3.keys] : e3.values.length < 50 ? [[], e3.values] : [];
      const y2 = e3.trans._cache;
      return o2.mutate(e3).then((e4) => {
        if (n(f3)) {
          "delete" !== d3 && (f3 = e4.results), c3.addKeys(f3);
          const t3 = qn(f3, y2);
          t3 || "add" === d3 || h3.addKeys(f3), (t3 || p2) && function(e5, t4, r3, s3) {
            function i3(t5) {
              const i4 = e5(t5.name || "");
              function o3(e6) {
                return null != e6 ? t5.extractKey(e6) : null;
              }
              const a3 = (e6) => t5.multiEntry && n(e6) ? e6.forEach((e7) => i4.addKey(e7)) : i4.addKey(e6);
              (r3 || s3).forEach((e6, t6) => {
                const n2 = r3 && o3(r3[t6]), i5 = s3 && o3(s3[t6]);
                0 !== $t(n2, i5) && (null != n2 && a3(n2), null != i5 && a3(i5));
              });
            }
            t4.indexes.forEach(i3);
          }(l3, a2, t3, p2);
        } else if (f3) {
          const e5 = { from: f3.lower, to: f3.upper };
          h3.add(e5), c3.add(e5);
        } else
          c3.add(s2), h3.add(s2), a2.indexes.forEach((e5) => l3(e5.name).add(s2));
        return e4;
      });
    } }, d2 = ({ query: { index: t2, range: n2 } }) => {
      var r3, s3;
      return [t2, new Ln(null !== (r3 = n2.lower) && void 0 !== r3 ? r3 : e2.MIN_KEY, null !== (s3 = n2.upper) && void 0 !== s3 ? s3 : e2.MAX_KEY)];
    }, f2 = { get: (e3) => [u2, new Ln(e3.key)], getMany: (e3) => [u2, new Ln().addKeys(e3.keys)], count: d2, query: d2, openCursor: d2 };
    return t(f2).forEach((e3) => {
      h2[e3] = function(t2) {
        const { subscr: n2 } = Oe;
        if (n2) {
          const a3 = (e4) => {
            const t3 = `idb://${r2}/${i2}/${e4}`;
            return n2[t3] || (n2[t3] = new Ln());
          }, u3 = a3(""), h3 = a3(":dels"), [d3, p2] = f2[e3](t2);
          if (a3(d3.name || "").add(p2), !d3.isPrimaryKey) {
            if ("count" !== e3) {
              const n3 = "query" === e3 && c2 && t2.values && o2.query({ ...t2, values: false });
              return o2[e3].apply(this, arguments).then((r3) => {
                if ("query" === e3) {
                  if (c2 && t2.values)
                    return n3.then(({ result: e5 }) => (u3.addKeys(e5), r3));
                  const e4 = t2.values ? r3.result.map(l2) : r3.result;
                  t2.values ? u3.addKeys(e4) : h3.addKeys(e4);
                } else if ("openCursor" === e3) {
                  const e4 = r3, n4 = t2.values;
                  return e4 && Object.create(e4, { key: { get: () => (h3.addKey(e4.primaryKey), e4.key) }, primaryKey: { get() {
                    const t3 = e4.primaryKey;
                    return h3.addKey(t3), t3;
                  } }, value: { get: () => (n4 && u3.addKey(e4.primaryKey), e4.value) } });
                }
                return r3;
              });
            }
            h3.add(s2);
          }
        }
        return o2[e3].apply(this, arguments);
      };
    }), h2;
  } };
} };
class Xn {
  constructor(e2, t2) {
    this._middlewares = {}, this.verno = 0;
    const n2 = Xn.dependencies;
    this._options = t2 = { addons: Xn.addons, autoOpen: true, indexedDB: n2.indexedDB, IDBKeyRange: n2.IDBKeyRange, ...t2 }, this._deps = { indexedDB: t2.indexedDB, IDBKeyRange: t2.IDBKeyRange };
    const { addons: r2 } = t2;
    this._dbSchema = {}, this._versions = [], this._storeNames = [], this._allTables = {}, this.idbdb = null, this._novip = this;
    const s2 = { dbOpenError: null, isBeingOpened: false, onReadyBeingFired: null, openComplete: false, dbReadyResolve: ee, dbReadyPromise: null, cancelOpen: ee, openCanceller: null, autoSchema: true, PR1398_maxLoop: 3 };
    var i2;
    s2.dbReadyPromise = new je((e3) => {
      s2.dbReadyResolve = e3;
    }), s2.openCanceller = new je((e3, t3) => {
      s2.cancelOpen = t3;
    }), this._state = s2, this.name = e2, this.on = Dt(this, "populate", "blocked", "versionchange", "close", { ready: [ue, ee] }), this.on.ready.subscribe = y(this.on.ready.subscribe, (e3) => (t3, n3) => {
      Xn.vip(() => {
        const r3 = this._state;
        if (r3.openComplete)
          r3.dbOpenError || je.resolve().then(t3), n3 && e3(t3);
        else if (r3.onReadyBeingFired)
          r3.onReadyBeingFired.push(t3), n3 && e3(t3);
        else {
          e3(t3);
          const r4 = this;
          n3 || e3(function e4() {
            r4.on.ready.unsubscribe(t3), r4.on.ready.unsubscribe(e4);
          });
        }
      });
    }), this.Collection = (i2 = this, It(Vt.prototype, function(e3, t3) {
      this.db = i2;
      let n3 = At, r3 = null;
      if (t3)
        try {
          n3 = t3();
        } catch (e4) {
          r3 = e4;
        }
      const s3 = e3._ctx, o2 = s3.table, a2 = o2.hook.reading.fire;
      this._ctx = { table: o2, index: s3.index, isPrimKey: !s3.index || o2.schema.primKey.keyPath && s3.index === o2.schema.primKey.name, range: n3, keysOnly: false, dir: "next", unique: "", algorithm: null, filter: null, replayFilter: null, justLimit: true, isMatch: null, offset: 0, limit: 1 / 0, error: r3, or: s3.or, valueMapper: a2 !== te ? a2 : null };
    })), this.Table = function(e3) {
      return It(jt.prototype, function(t3, n3, r3) {
        this.db = e3, this._tx = r3, this.name = t3, this.schema = n3, this.hook = e3._allTables[t3] ? e3._allTables[t3].hook : Dt(null, { creating: [se, ee], reading: [ne, te], updating: [oe, ee], deleting: [ie, ee] });
      });
    }(this), this.Transaction = function(e3) {
      return It(an.prototype, function(t3, n3, r3, s3, i3) {
        this.db = e3, this.mode = t3, this.storeNames = n3, this.schema = r3, this.chromeTransactionDurability = s3, this.idbtrans = null, this.on = Dt(this, "complete", "error", "abort"), this.parent = i3 || null, this.active = true, this._reculock = 0, this._blockedFuncs = [], this._resolve = null, this._reject = null, this._waitingFor = null, this._waitingQueue = null, this._spinCount = 0, this._completion = new je((e4, t4) => {
          this._resolve = e4, this._reject = t4;
        }), this._completion.then(() => {
          this.active = false, this.on.complete.fire();
        }, (e4) => {
          var t4 = this.active;
          return this.active = false, this.on.error.fire(e4), this.parent ? this.parent._reject(e4) : t4 && this.idbtrans && this.idbtrans.abort(), ft(e4);
        });
      });
    }(this), this.Version = function(e3) {
      return It(On.prototype, function(t3) {
        this.db = e3, this._cfg = { version: t3, storesSource: null, dbschema: {}, tables: {}, contentUpgrade: null };
      });
    }(this), this.WhereClause = function(e3) {
      return It(en.prototype, function(t3, n3, r3) {
        this.db = e3, this._ctx = { table: t3, index: ":id" === n3 ? null : n3, or: r3 };
        const s3 = e3._deps.indexedDB;
        if (!s3)
          throw new X.MissingAPI();
        this._cmp = this._ascending = s3.cmp.bind(s3), this._descending = (e4, t4) => s3.cmp(t4, e4), this._max = (e4, t4) => s3.cmp(e4, t4) > 0 ? e4 : t4, this._min = (e4, t4) => s3.cmp(e4, t4) < 0 ? e4 : t4, this._IDBKeyRange = e3._deps.IDBKeyRange;
      });
    }(this), this.on("versionchange", (e3) => {
      e3.newVersion > 0 ? console.warn(`Another connection wants to upgrade database '${this.name}'. Closing db now to resume the upgrade.`) : console.warn(`Another connection wants to delete database '${this.name}'. Closing db now to resume the delete request.`), this.close();
    }), this.on("blocked", (e3) => {
      !e3.newVersion || e3.newVersion < e3.oldVersion ? console.warn(`Dexie.delete('${this.name}') was blocked`) : console.warn(`Upgrade '${this.name}' blocked by other connection holding version ${e3.oldVersion / 10}`);
    }), this._maxKey = hn(t2.IDBKeyRange), this._createTransaction = (e3, t3, n3, r3) => new this.Transaction(e3, t3, n3, this._options.chromeTransactionDurability, r3), this._fireOnBlocked = (e3) => {
      this.on("blocked").fire(e3), _t.filter((e4) => e4.name === this.name && e4 !== this && !e4._state.vcFired).map((t3) => t3.on("versionchange").fire(e3));
    }, this.use(Fn), this.use(Nn), this.use(Qn), this.use($n), this.vip = Object.create(this, { _vip: { value: true } }), r2.forEach((e3) => e3(this));
  }
  version(e2) {
    if (isNaN(e2) || e2 < 0.1)
      throw new X.Type("Given version is not a positive number");
    if (e2 = Math.round(10 * e2) / 10, this.idbdb || this._state.isBeingOpened)
      throw new X.Schema("Cannot add version when database is open");
    this.verno = Math.max(this.verno, e2);
    const t2 = this._versions;
    var n2 = t2.filter((t3) => t3._cfg.version === e2)[0];
    return n2 || (n2 = new this.Version(e2), t2.push(n2), t2.sort(_n), n2.stores({}), this._state.autoSchema = false, n2);
  }
  _whenReady(e2) {
    return this.idbdb && (this._state.openComplete || Oe.letThrough || this._vip) ? e2() : new je((e3, t2) => {
      if (this._state.openComplete)
        return t2(new X.DatabaseClosed(this._state.dbOpenError));
      if (!this._state.isBeingOpened) {
        if (!this._options.autoOpen)
          return void t2(new X.DatabaseClosed());
        this.open().catch(ee);
      }
      this._state.dbReadyPromise.then(e3, t2);
    }).then(e2);
  }
  use({ stack: e2, create: t2, level: n2, name: r2 }) {
    r2 && this.unuse({ stack: e2, name: r2 });
    const s2 = this._middlewares[e2] || (this._middlewares[e2] = []);
    return s2.push({ stack: e2, create: t2, level: null == n2 ? 10 : n2, name: r2 }), s2.sort((e3, t3) => e3.level - t3.level), this;
  }
  unuse({ stack: e2, name: t2, create: n2 }) {
    return e2 && this._middlewares[e2] && (this._middlewares[e2] = this._middlewares[e2].filter((e3) => n2 ? e3.create !== n2 : !!t2 && e3.name !== t2)), this;
  }
  open() {
    return Dn(this);
  }
  _close() {
    const e2 = this._state, t2 = _t.indexOf(this);
    if (t2 >= 0 && _t.splice(t2, 1), this.idbdb) {
      try {
        this.idbdb.close();
      } catch (e3) {
      }
      this._novip.idbdb = null;
    }
    e2.dbReadyPromise = new je((t3) => {
      e2.dbReadyResolve = t3;
    }), e2.openCanceller = new je((t3, n2) => {
      e2.cancelOpen = n2;
    });
  }
  close() {
    this._close();
    const e2 = this._state;
    this._options.autoOpen = false, e2.dbOpenError = new X.DatabaseClosed(), e2.isBeingOpened && e2.cancelOpen(e2.dbOpenError);
  }
  delete() {
    const e2 = arguments.length > 0, t2 = this._state;
    return new je((n2, r2) => {
      const s2 = () => {
        this.close();
        var e3 = this._deps.indexedDB.deleteDatabase(this.name);
        e3.onsuccess = Ye(() => {
          !function({ indexedDB: e4, IDBKeyRange: t3 }, n3) {
            !An(e4) && n3 !== Pt && Sn(e4, t3).delete(n3).catch(ee);
          }(this._deps, this.name), n2();
        }), e3.onerror = tn(r2), e3.onblocked = this._fireOnBlocked;
      };
      if (e2)
        throw new X.InvalidArgument("Arguments not allowed in db.delete()");
      t2.isBeingOpened ? t2.dbReadyPromise.then(s2) : s2();
    });
  }
  backendDB() {
    return this.idbdb;
  }
  isOpen() {
    return null !== this.idbdb;
  }
  hasBeenClosed() {
    const e2 = this._state.dbOpenError;
    return e2 && "DatabaseClosed" === e2.name;
  }
  hasFailed() {
    return null !== this._state.dbOpenError;
  }
  dynamicallyOpened() {
    return this._state.autoSchema;
  }
  get tables() {
    return t(this._allTables).map((e2) => this._allTables[e2]);
  }
  transaction() {
    const e2 = Bn.apply(this, arguments);
    return this._transaction.apply(this, e2);
  }
  _transaction(e2, t2, n2) {
    let r2 = Oe.trans;
    r2 && r2.db === this && -1 === e2.indexOf("!") || (r2 = null);
    const s2 = -1 !== e2.indexOf("?");
    let i2, o2;
    e2 = e2.replace("!", "").replace("?", "");
    try {
      if (o2 = t2.map((e3) => {
        var t3 = e3 instanceof this.Table ? e3.name : e3;
        if ("string" != typeof t3)
          throw new TypeError("Invalid table argument to Dexie.transaction(). Only Table or String are allowed");
        return t3;
      }), "r" == e2 || e2 === Kt)
        i2 = Kt;
      else {
        if ("rw" != e2 && e2 != Ot)
          throw new X.InvalidArgument("Invalid transaction mode: " + e2);
        i2 = Ot;
      }
      if (r2) {
        if (r2.mode === Kt && i2 === Ot) {
          if (!s2)
            throw new X.SubTransaction("Cannot enter a sub-transaction with READWRITE mode when parent transaction is READONLY");
          r2 = null;
        }
        r2 && o2.forEach((e3) => {
          if (r2 && -1 === r2.storeNames.indexOf(e3)) {
            if (!s2)
              throw new X.SubTransaction("Table " + e3 + " not included in parent transaction.");
            r2 = null;
          }
        }), s2 && r2 && !r2.active && (r2 = null);
      }
    } catch (e3) {
      return r2 ? r2._promise(null, (t3, n3) => {
        n3(e3);
      }) : ft(e3);
    }
    const a2 = Tn.bind(null, this, i2, o2, r2, n2);
    return r2 ? r2._promise(i2, a2, "lock") : Oe.trans ? at(Oe.transless, () => this._whenReady(a2)) : this._whenReady(a2);
  }
  table(e2) {
    if (!o(this._allTables, e2))
      throw new X.InvalidTable(`Table ${e2} does not exist`);
    return this._allTables[e2];
  }
}
const Jn = "undefined" != typeof Symbol && "observable" in Symbol ? Symbol.observable : "@@observable";
class Zn {
  constructor(e2) {
    this._subscribe = e2;
  }
  subscribe(e2, t2, n2) {
    return this._subscribe(e2 && "function" != typeof e2 ? e2 : { next: e2, error: t2, complete: n2 });
  }
  [Jn]() {
    return this;
  }
}
function er(e2, n2) {
  return t(n2).forEach((t2) => {
    Wn(e2[t2] || (e2[t2] = new Ln()), n2[t2]);
  }), e2;
}
function tr(e2) {
  let n2, r2 = false;
  const s2 = new Zn((s3) => {
    const i2 = T(e2);
    let o2 = false, a2 = {}, u2 = {};
    const l2 = { get closed() {
      return o2;
    }, unsubscribe: () => {
      o2 = true, on.storagemutated.unsubscribe(f2);
    } };
    s3.start && s3.start(l2);
    let c2 = false, h2 = false;
    function d2() {
      return t(u2).some((e3) => a2[e3] && Yn(a2[e3], u2[e3]));
    }
    const f2 = (e3) => {
      er(a2, e3), d2() && p2();
    }, p2 = () => {
      if (c2 || o2)
        return;
      a2 = {};
      const t2 = {}, y2 = function(t3) {
        i2 && et();
        const n3 = () => Ze(e2, { subscr: t3, trans: null }), r3 = Oe.trans ? at(Oe.transless, n3) : n3();
        return i2 && r3.then(tt, tt), r3;
      }(t2);
      h2 || (on(rn, f2), h2 = true), c2 = true, Promise.resolve(y2).then((e3) => {
        r2 = true, n2 = e3, c2 = false, o2 || (d2() ? p2() : (a2 = {}, u2 = t2, s3.next && s3.next(e3)));
      }, (e3) => {
        c2 = false, r2 = false, s3.error && s3.error(e3), l2.unsubscribe();
      });
    };
    return p2(), l2;
  });
  return s2.hasValue = () => r2, s2.getValue = () => n2, s2;
}
let nr;
try {
  nr = { indexedDB: e.indexedDB || e.mozIndexedDB || e.webkitIndexedDB || e.msIndexedDB, IDBKeyRange: e.IDBKeyRange || e.webkitIDBKeyRange };
} catch (e2) {
  nr = { indexedDB: null, IDBKeyRange: null };
}
const rr = Xn;
function sr(e2) {
  let t2 = ir;
  try {
    ir = true, on.storagemutated.fire(e2);
  } finally {
    ir = t2;
  }
}
a(rr, { ...Z, delete: (e2) => new rr(e2, { addons: [] }).delete(), exists: (e2) => new rr(e2, { addons: [] }).open().then((e3) => (e3.close(), true)).catch("NoSuchDatabaseError", () => false), getDatabaseNames(e2) {
  try {
    return function({ indexedDB: e3, IDBKeyRange: t2 }) {
      return An(e3) ? Promise.resolve(e3.databases()).then((e4) => e4.map((e5) => e5.name).filter((e5) => e5 !== Pt)) : Sn(e3, t2).toCollection().primaryKeys();
    }(rr.dependencies).then(e2);
  } catch (e3) {
    return ft(new X.MissingAPI());
  }
}, defineClass: () => function(e2) {
  r(this, e2);
}, ignoreTransaction: (e2) => Oe.trans ? at(Oe.transless, e2) : e2(), vip: Cn, async: function(e2) {
  return function() {
    try {
      var t2 = In(e2.apply(this, arguments));
      return t2 && "function" == typeof t2.then ? t2 : je.resolve(t2);
    } catch (e3) {
      return ft(e3);
    }
  };
}, spawn: function(e2, t2, n2) {
  try {
    var r2 = In(e2.apply(n2, t2 || []));
    return r2 && "function" == typeof r2.then ? r2 : je.resolve(r2);
  } catch (e3) {
    return ft(e3);
  }
}, currentTransaction: { get: () => Oe.trans || null }, waitFor: function(e2, t2) {
  const n2 = je.resolve("function" == typeof e2 ? rr.ignoreTransaction(e2) : e2).timeout(t2 || 6e4);
  return Oe.trans ? Oe.trans.waitFor(n2) : n2;
}, Promise: je, debug: { get: () => R, set: (e2) => {
  F(e2, "dexie" === e2 ? () => true : Et);
} }, derive: c, extend: r, props: a, override: y, Events: Dt, on, liveQuery: tr, extendObservabilitySet: er, getByKeyPath: b, setByKeyPath: _, delByKeyPath: function(e2, t2) {
  "string" == typeof t2 ? _(e2, t2, void 0) : "length" in t2 && [].map.call(t2, function(t3) {
    _(e2, t3, void 0);
  });
}, shallowClone: w, deepClone: O, getObjectDiff: Mn, cmp: $t, asap: v, minKey: vt, addons: [], connections: _t, errnames: H, dependencies: nr, semVer: yt, version: yt.split(".").map((e2) => parseInt(e2)).reduce((e2, t2, n2) => e2 + t2 / Math.pow(10, 2 * n2)) }), rr.maxKey = hn(rr.dependencies.IDBKeyRange), "undefined" != typeof dispatchEvent && "undefined" != typeof addEventListener && (on(rn, (e2) => {
  if (!ir) {
    let t2;
    wt ? (t2 = document.createEvent("CustomEvent"), t2.initCustomEvent(sn, true, true, e2)) : t2 = new CustomEvent(sn, { detail: e2 }), ir = true, dispatchEvent(t2), ir = false;
  }
}), addEventListener(sn, ({ detail: e2 }) => {
  ir || sr(e2);
}));
let ir = false;
if ("undefined" != typeof BroadcastChannel) {
  const e2 = new BroadcastChannel(sn);
  "function" == typeof e2.unref && e2.unref(), on(rn, (t2) => {
    ir || e2.postMessage(t2);
  }), e2.onmessage = (e3) => {
    e3.data && sr(e3.data);
  };
} else if ("undefined" != typeof self && "undefined" != typeof navigator) {
  on(rn, (e3) => {
    try {
      ir || ("undefined" != typeof localStorage && localStorage.setItem(sn, JSON.stringify({ trig: Math.random(), changedParts: e3 })), "object" == typeof self.clients && [...self.clients.matchAll({ includeUncontrolled: true })].forEach((t2) => t2.postMessage({ type: sn, changedParts: e3 })));
    } catch (e4) {
    }
  }), "undefined" != typeof addEventListener && addEventListener("storage", (e3) => {
    if (e3.key === sn) {
      const t2 = JSON.parse(e3.newValue);
      t2 && sr(t2.changedParts);
    }
  });
  const e2 = self.document && navigator.serviceWorker;
  e2 && e2.addEventListener("message", function({ data: e3 }) {
    e3 && e3.type === sn && sr(e3.changedParts);
  });
}
je.rejectionMapper = function(e2, t2) {
  if (!e2 || e2 instanceof W || e2 instanceof TypeError || e2 instanceof SyntaxError || !e2.name || !J[e2.name])
    return e2;
  var n2 = new J[e2.name](t2 || e2.message, e2);
  return "stack" in e2 && l(n2, "stack", { get: function() {
    return this.inner.stack;
  } }), n2;
}, F(R, Et);
class MySubClassedDexie extends Xn {
  constructor() {
    super("userImages");
    // 'friends' is added by dexie when declaring the stores()
    // We just tell the typing system this is the case
    __publicField(this, "imageFile");
    this.version(1).stores({
      imageFile: "++id, webkitRelativePath, name, lastModified"
    });
  }
}
const db = new MySubClassedDexie();
const _hoisted_1$5 = {
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  viewBox: "0 0 24 24"
};
const _hoisted_2$5 = /* @__PURE__ */ createBaseVNode(
  "path",
  {
    d: "M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10zM8 13.01l1.41 1.41L11 12.84V17h2v-4.16l1.59 1.59L16 13.01L12.01 9L8 13.01z",
    fill: "currentColor"
  },
  null,
  -1
  /* HOISTED */
);
const _hoisted_3$5 = [_hoisted_2$5];
const DriveFolderUploadFilled = /* @__PURE__ */ defineComponent({
  name: "DriveFolderUploadFilled",
  render: function render(_ctx, _cache) {
    return openBlock(), createElementBlock("svg", _hoisted_1$5, _hoisted_3$5);
  }
});
const _hoisted_1$4 = {
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  viewBox: "0 0 512 512"
};
const _hoisted_2$4 = /* @__PURE__ */ createBaseVNode(
  "path",
  {
    fill: "none",
    stroke: "currentColor",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-width": "48",
    d: "M244 400L100 256l144-144"
  },
  null,
  -1
  /* HOISTED */
);
const _hoisted_3$4 = /* @__PURE__ */ createBaseVNode(
  "path",
  {
    fill: "none",
    stroke: "currentColor",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-width": "48",
    d: "M120 256h292"
  },
  null,
  -1
  /* HOISTED */
);
const _hoisted_4$2 = [_hoisted_2$4, _hoisted_3$4];
const ArrowBack = /* @__PURE__ */ defineComponent({
  name: "ArrowBack",
  render: function render2(_ctx, _cache) {
    return openBlock(), createElementBlock("svg", _hoisted_1$4, _hoisted_4$2);
  }
});
const _hoisted_1$3 = {
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  viewBox: "0 0 512 512"
};
const _hoisted_2$3 = /* @__PURE__ */ createBaseVNode(
  "path",
  {
    fill: "none",
    stroke: "currentColor",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-width": "48",
    d: "M268 112l144 144l-144 144"
  },
  null,
  -1
  /* HOISTED */
);
const _hoisted_3$3 = /* @__PURE__ */ createBaseVNode(
  "path",
  {
    fill: "none",
    stroke: "currentColor",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-width": "48",
    d: "M392 256H100"
  },
  null,
  -1
  /* HOISTED */
);
const _hoisted_4$1 = [_hoisted_2$3, _hoisted_3$3];
const ArrowForward = /* @__PURE__ */ defineComponent({
  name: "ArrowForward",
  render: function render3(_ctx, _cache) {
    return openBlock(), createElementBlock("svg", _hoisted_1$3, _hoisted_4$1);
  }
});
const _hoisted_1$2 = {
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  viewBox: "0 0 1024 1024"
};
const _hoisted_2$2 = /* @__PURE__ */ createBaseVNode(
  "path",
  {
    d: "M391 240.9c-.8-6.6-8.9-9.4-13.6-4.7l-43.7 43.7L200 146.3a8.03 8.03 0 0 0-11.3 0l-42.4 42.3a8.03 8.03 0 0 0 0 11.3L280 333.6l-43.9 43.9a8.01 8.01 0 0 0 4.7 13.6L401 410c5.1.6 9.5-3.7 8.9-8.9L391 240.9zm10.1 373.2L240.8 633c-6.6.8-9.4 8.9-4.7 13.6l43.9 43.9L146.3 824a8.03 8.03 0 0 0 0 11.3l42.4 42.3c3.1 3.1 8.2 3.1 11.3 0L333.7 744l43.7 43.7A8.01 8.01 0 0 0 391 783l18.9-160.1c.6-5.1-3.7-9.4-8.8-8.8zm221.8-204.2L783.2 391c6.6-.8 9.4-8.9 4.7-13.6L744 333.6L877.7 200c3.1-3.1 3.1-8.2 0-11.3l-42.4-42.3a8.03 8.03 0 0 0-11.3 0L690.3 279.9l-43.7-43.7a8.01 8.01 0 0 0-13.6 4.7L614.1 401c-.6 5.2 3.7 9.5 8.8 8.9zM744 690.4l43.9-43.9a8.01 8.01 0 0 0-4.7-13.6L623 614c-5.1-.6-9.5 3.7-8.9 8.9L633 783.1c.8 6.6 8.9 9.4 13.6 4.7l43.7-43.7L824 877.7c3.1 3.1 8.2 3.1 11.3 0l42.4-42.3c3.1-3.1 3.1-8.2 0-11.3L744 690.4z",
    fill: "currentColor"
  },
  null,
  -1
  /* HOISTED */
);
const _hoisted_3$2 = [_hoisted_2$2];
const FullscreenExitOutlined = /* @__PURE__ */ defineComponent({
  name: "FullscreenExitOutlined",
  render: function render4(_ctx, _cache) {
    return openBlock(), createElementBlock("svg", _hoisted_1$2, _hoisted_3$2);
  }
});
const _hoisted_1$1 = {
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  viewBox: "0 0 1024 1024"
};
const _hoisted_2$1 = /* @__PURE__ */ createBaseVNode(
  "path",
  {
    d: "M290 236.4l43.9-43.9a8.01 8.01 0 0 0-4.7-13.6L169 160c-5.1-.6-9.5 3.7-8.9 8.9L179 329.1c.8 6.6 8.9 9.4 13.6 4.7l43.7-43.7L370 423.7c3.1 3.1 8.2 3.1 11.3 0l42.4-42.3c3.1-3.1 3.1-8.2 0-11.3L290 236.4zm352.7 187.3c3.1 3.1 8.2 3.1 11.3 0l133.7-133.6l43.7 43.7a8.01 8.01 0 0 0 13.6-4.7L863.9 169c.6-5.1-3.7-9.5-8.9-8.9L694.8 179c-6.6.8-9.4 8.9-4.7 13.6l43.9 43.9L600.3 370a8.03 8.03 0 0 0 0 11.3l42.4 42.4zM845 694.9c-.8-6.6-8.9-9.4-13.6-4.7l-43.7 43.7L654 600.3a8.03 8.03 0 0 0-11.3 0l-42.4 42.3a8.03 8.03 0 0 0 0 11.3L734 787.6l-43.9 43.9a8.01 8.01 0 0 0 4.7 13.6L855 864c5.1.6 9.5-3.7 8.9-8.9L845 694.9zm-463.7-94.6a8.03 8.03 0 0 0-11.3 0L236.3 733.9l-43.7-43.7a8.01 8.01 0 0 0-13.6 4.7L160.1 855c-.6 5.1 3.7 9.5 8.9 8.9L329.2 845c6.6-.8 9.4-8.9 4.7-13.6L290 787.6L423.7 654c3.1-3.1 3.1-8.2 0-11.3l-42.4-42.4z",
    fill: "currentColor"
  },
  null,
  -1
  /* HOISTED */
);
const _hoisted_3$1 = [_hoisted_2$1];
const FullscreenOutlined = /* @__PURE__ */ defineComponent({
  name: "FullscreenOutlined",
  render: function render5(_ctx, _cache) {
    return openBlock(), createElementBlock("svg", _hoisted_1$1, _hoisted_3$1);
  }
});
const _withScopeId = (n2) => (pushScopeId("data-v-41f19470"), n2 = n2(), popScopeId(), n2);
const _hoisted_1 = { class: "pageWrapper" };
const _hoisted_2 = { class: "header" };
const _hoisted_3 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("img", {
  class: "logo",
  src: _imports_0,
  alt: ""
}, null, -1));
const _hoisted_4 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("label", {
  for: "fileInput",
  class: "fileInputLabel",
  style: { "cursor": "pointer" }
}, null, -1));
const _hoisted_5 = {
  key: 0,
  class: "arrows"
};
const _hoisted_6 = {
  key: 0,
  class: "modes"
};
const _hoisted_7 = { key: 0 };
const _hoisted_8 = { key: 1 };
const _hoisted_9 = {
  key: 2,
  class: "fallbackTxt"
};
const _hoisted_10 = ["src"];
const _hoisted_11 = { class: "custom-arrow" };
const _hoisted_12 = ["onClick"];
const _hoisted_13 = ["onClick"];
const _hoisted_14 = { class: "custom-dots" };
const _hoisted_15 = ["onClick"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  setup(__props) {
    const fullscreenOn = ref(false);
    const filesUploaded = computed(() => imgsrcList.value.length > 0);
    const imgsrcList = ref([]);
    const currentIndex = ref(0);
    const canvasRef = ref();
    const userimagesRef = ref([]);
    const modes = [
      {
        value: "fitfull",
        label: "Fit entire"
      },
      {
        value: "fitvert",
        label: "Fit vertically"
      },
      {
        value: "fithor",
        label: "Fit horizontally"
      },
      {
        value: "fitsquare",
        label: "Fit squared"
      }
    ];
    const currentMode = ref("fitfull");
    function toggleFullscreen() {
      fullscreenOn.value = !fullscreenOn.value;
    }
    watch([currentMode, fullscreenOn, currentIndex], () => {
      drawImage();
    });
    onMounted(async () => {
      useResizeObserver(canvasRef, (entries) => {
        useThrottleFn(() => drawImage, 150);
      });
      const indexeddbEmpty = await db.imageFile.count() == 0;
      console.log("indexeddbEmpty: ", indexeddbEmpty);
      if (!indexeddbEmpty) {
        const files = await db.imageFile.toArray();
        const urls = files.map((file) => URL.createObjectURL(file));
        imgsrcList.value = urls;
        drawImage();
      }
    });
    async function drawImage() {
      if (!filesUploaded.value || !fullscreenOn.value) {
        return;
      }
      const imgToDraw = new Image();
      imgToDraw.src = imgsrcList.value[currentIndex.value];
      await nextTick();
      console.log(canvasRef.value);
      await new Promise((r2) => imgToDraw.onload = r2);
      const { width: cWidth, height: cHeight } = canvasRef.value.getBoundingClientRect();
      const iWidth = imgToDraw.width;
      const iHeight = imgToDraw.height;
      canvasRef.value.width = cWidth;
      canvasRef.value.height = cHeight;
      const canvasRatio = cWidth / cHeight;
      const imageRatio = iWidth / iHeight;
      canvasRef.value.getContext("2d").clearRect(0, 0, cWidth, cHeight);
      switch (currentMode.value) {
        case "fitfull":
          {
            let newImgWidth;
            let newImgHeight;
            let startX = 0;
            let startY = 0;
            if (canvasRatio > imageRatio) {
              newImgHeight = cHeight;
              newImgWidth = cHeight * imageRatio;
              startX = Math.abs((cWidth - newImgWidth) / 2);
            } else {
              newImgWidth = cWidth;
              newImgHeight = cWidth / imageRatio;
              startY = Math.abs((cHeight - newImgHeight) / 2);
            }
            canvasRef.value.getContext("2d").drawImage(
              imgToDraw,
              startX,
              startY,
              newImgWidth,
              newImgHeight
            );
          }
          break;
        case "fithor":
          {
            const newImgWidth = cWidth;
            const newImgHeight = cWidth / imageRatio;
            let startX = 0;
            let startY = (cHeight - newImgHeight) / 2;
            canvasRef.value.getContext("2d").drawImage(
              imgToDraw,
              startX,
              startY,
              newImgWidth,
              newImgHeight
            );
          }
          break;
        case "fitvert":
          {
            const newImgWidth = cHeight * imageRatio;
            const newImgHeight = cHeight;
            let startX = (cWidth - newImgWidth) / 2;
            let startY = 0;
            canvasRef.value.getContext("2d").drawImage(
              imgToDraw,
              startX,
              startY,
              newImgWidth,
              newImgHeight
            );
          }
          break;
        case "fitsquare":
          {
            const lowestSideSize = cWidth > cHeight ? cHeight : cWidth;
            const lowestSide = cWidth > cHeight ? "height" : "width";
            let startX = lowestSide == "width" ? 0 : (cWidth - lowestSideSize) / 2;
            let startY = lowestSide == "height" ? 0 : (cHeight - lowestSideSize) / 2;
            canvasRef.value.getContext("2d").drawImage(
              imgToDraw,
              startX,
              startY,
              lowestSideSize,
              lowestSideSize
            );
          }
          break;
      }
    }
    async function onChangeFileInput(e2) {
      console.log("File input changed");
      const target = e2.target;
      console.log(155);
      if (!target.files) {
        return;
      }
      const files = [...target.files].filter((file) => {
        return file.type === "image/jpeg" || file.type === "image/png";
      });
      console.log(162, files);
      try {
        await await db.imageFile.clear().catch((error) => {
          log("clear error", error);
        }).finally(() => {
          log("clear finally");
        });
        await await db.imageFile.bulkAdd(files).catch((error) => {
          log("bulkAdd error", error);
        }).finally(() => {
          log("bulkAdd finally");
        });
        files.forEach((file) => {
          const url = URL.createObjectURL(file);
          imgsrcList.value.push(url);
        });
        await drawImage();
      } catch (error) {
        console.group("Error happened");
        console.log("error: ", error);
        console.groupEnd();
      }
    }
    function debugFileInput(e2) {
      console.log("File input clicked");
    }
    function log(...args) {
      console.log(...args);
    }
    async function logIDB() {
      console.group("Files in Indexeddb:");
      console.log(await db.imageFile.toArray());
      console.groupEnd();
    }
    function onClickArrow(direction) {
      if (direction == "left")
        currentIndex.value > 0 ? currentIndex.value-- : currentIndex.value = imgsrcList.value.length - 1;
      if (direction == "right")
        currentIndex.value < imgsrcList.value.length - 1 ? currentIndex.value++ : currentIndex.value = 0;
    }
    function updateIndex(index2) {
      currentIndex.value = index2;
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("header", _hoisted_2, [
          _hoisted_3,
          createVNode(unref(NButton), {
            "icon-placement": "left",
            type: "primary"
          }, {
            icon: withCtx(() => [
              createVNode(unref(NIcon), null, {
                default: withCtx(() => [
                  createVNode(unref(DriveFolderUploadFilled))
                ]),
                _: 1
              })
            ]),
            default: withCtx(() => [
              createTextVNode(" Upload "),
              _hoisted_4,
              createBaseVNode("input", {
                type: "file",
                ref: "inputRef",
                id: "fileInput",
                multiple: "true",
                webkitdirectory: "true",
                accept: "image/png, image/jpeg",
                onChange: onChangeFileInput,
                onClick: debugFileInput
              }, null, 544)
            ]),
            _: 1
          }),
          createVNode(unref(NButton), {
            type: "primary",
            onClick: logIDB
          }, {
            default: withCtx(() => [
              createTextVNode(" Console.log all files from indexeddb ")
            ]),
            _: 1
          }),
          createVNode(unref(NButton), {
            ghost: "",
            type: "primary",
            onClick: toggleFullscreen
          }, {
            default: withCtx(() => [
              createVNode(unref(NIcon), null, {
                default: withCtx(() => [
                  !unref(fullscreenOn) ? (openBlock(), createBlock(unref(FullscreenOutlined), { key: 0 })) : createCommentVNode("", true),
                  unref(fullscreenOn) ? (openBlock(), createBlock(unref(FullscreenExitOutlined), { key: 1 })) : createCommentVNode("", true)
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        createBaseVNode("main", null, [
          createVNode(Transition, null, {
            default: withCtx(() => [
              unref(fullscreenOn) ? (openBlock(), createElementBlock("canvas", {
                key: 0,
                ref_key: "canvasRef",
                ref: canvasRef
              }, null, 512)) : createCommentVNode("", true)
            ]),
            _: 1
          }),
          createVNode(Transition, null, {
            default: withCtx(() => [
              unref(fullscreenOn) && unref(filesUploaded) ? (openBlock(), createElementBlock("div", _hoisted_5, [
                createBaseVNode("div", {
                  class: "arrows__item",
                  onClick: _cache[0] || (_cache[0] = ($event) => onClickArrow("left"))
                }, " ⬅️ "),
                createBaseVNode("div", {
                  class: "arrows__item",
                  onClick: _cache[1] || (_cache[1] = ($event) => onClickArrow("right"))
                }, " ➡️ ")
              ])) : createCommentVNode("", true)
            ]),
            _: 1
          }),
          createVNode(Transition, null, {
            default: withCtx(() => [
              unref(fullscreenOn) ? (openBlock(), createElementBlock("div", _hoisted_6, [
                createVNode(unref(NRadioGroup), {
                  name: "radiobuttongroup1",
                  value: unref(currentMode),
                  "onUpdate:value": _cache[2] || (_cache[2] = ($event) => isRef(currentMode) ? currentMode.value = $event : null)
                }, {
                  default: withCtx(() => [
                    (openBlock(), createElementBlock(Fragment, null, renderList(modes, ({ label, value }) => {
                      return createVNode(unref(NRadioButton), {
                        value,
                        label
                      }, null, 8, ["value", "label"]);
                    }), 64))
                  ]),
                  _: 1
                }, 8, ["value"])
              ])) : createCommentVNode("", true)
            ]),
            _: 1
          }),
          !unref(filesUploaded) ? (openBlock(), createElementBlock("h1", _hoisted_7, " Новый диск тестовое ")) : createCommentVNode("", true),
          unref(filesUploaded) && !unref(fullscreenOn) ? (openBlock(), createElementBlock("h1", _hoisted_8, " Preview mode ")) : createCommentVNode("", true),
          !unref(filesUploaded) ? (openBlock(), createElementBlock("p", _hoisted_9, " Upload some images first! ")) : createCommentVNode("", true),
          unref(filesUploaded) && !unref(fullscreenOn) ? (openBlock(), createBlock(unref(NCarousel), {
            key: 3,
            "onUpdate:currentIndex": _cache[3] || (_cache[3] = ($event) => currentIndex.value = $event),
            "current-index": unref(currentIndex),
            class: "carousel",
            direction: "horizontal",
            "show-arrow": true,
            draggable: "",
            "dot-type": "dot",
            "dot-placement": "bottom",
            effect: "card",
            "centered-slides": true,
            style: { "height": "200px" },
            onUpdateCurrentIndex: updateIndex
          }, {
            arrow: withCtx(({ prev, next }) => [
              createBaseVNode("div", _hoisted_11, [
                createBaseVNode("button", {
                  type: "button",
                  class: "custom-arrow--left",
                  onClick: prev
                }, [
                  createVNode(unref(NIcon), null, {
                    default: withCtx(() => [
                      createVNode(unref(ArrowBack))
                    ]),
                    _: 1
                  })
                ], 8, _hoisted_12),
                createBaseVNode("button", {
                  type: "button",
                  class: "custom-arrow--right",
                  onClick: next
                }, [
                  createVNode(unref(NIcon), null, {
                    default: withCtx(() => [
                      createVNode(unref(ArrowForward))
                    ]),
                    _: 1
                  })
                ], 8, _hoisted_13)
              ])
            ]),
            dots: withCtx(({ total, currentIndex: currentIndex2, to }) => [
              createBaseVNode("ul", _hoisted_14, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(total, (index2) => {
                  return openBlock(), createElementBlock("li", {
                    key: index2,
                    class: normalizeClass({ ["is-active"]: currentIndex2 === index2 - 1 }),
                    onClick: ($event) => to(index2 - 1)
                  }, null, 10, _hoisted_15);
                }), 128))
              ])
            ]),
            default: withCtx(() => [
              !unref(fullscreenOn) ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(unref(imgsrcList), (src, index2) => {
                return openBlock(), createElementBlock("img", {
                  key: index2,
                  src,
                  alt: "",
                  ref_for: true,
                  ref_key: "userimagesRef",
                  ref: userimagesRef,
                  class: "carousel-img"
                }, null, 8, _hoisted_10);
              }), 128)) : createCommentVNode("", true)
            ]),
            _: 1
          }, 8, ["current-index"])) : createCommentVNode("", true)
        ])
      ]);
    };
  }
});
const index_vue_vue_type_style_index_0_scoped_41f19470_lang = "";
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-41f19470"]]);
export {
  index as default
};
