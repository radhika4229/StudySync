import { g as getDefaultExportFromCjs } from "./react.mjs";
import require$$1 from "crypto";
import { r as requireUrlParse } from "./url-parse.mjs";
import { r as requireInherits } from "./inherits.mjs";
import require$$1$1 from "events";
import { r as requireWebsocket$2 } from "./faye-websocket.mjs";
import require$$3 from "http";
import require$$2 from "https";
import { r as requireEventsource$2 } from "./eventsource.mjs";
var event$1 = { exports: {} };
var random;
var hasRequiredRandom;
function requireRandom() {
  if (hasRequiredRandom) return random;
  hasRequiredRandom = 1;
  var crypto = require$$1;
  var _randomStringChars = "abcdefghijklmnopqrstuvwxyz012345";
  random = {
    string: function(length) {
      var max = _randomStringChars.length;
      var bytes = crypto.randomBytes(length);
      var ret = [];
      for (var i = 0; i < length; i++) {
        ret.push(_randomStringChars.substr(bytes[i] % max, 1));
      }
      return ret.join("");
    },
    number: function(max) {
      return Math.floor(Math.random() * max);
    },
    numberString: function(max) {
      var t = ("" + (max - 1)).length;
      var p = new Array(t + 1).join("0");
      return (p + this.number(max)).slice(-t);
    }
  };
  return random;
}
var hasRequiredEvent$1;
function requireEvent$1() {
  if (hasRequiredEvent$1) return event$1.exports;
  hasRequiredEvent$1 = 1;
  (function(module) {
    var random2 = requireRandom();
    var onUnload = {}, afterUnload = false, isChromePackagedApp = globalThis.chrome && globalThis.chrome.app && globalThis.chrome.app.runtime;
    module.exports = {
      attachEvent: function(event2, listener) {
        if (typeof globalThis.addEventListener !== "undefined") {
          globalThis.addEventListener(event2, listener, false);
        } else if (globalThis.document && globalThis.attachEvent) {
          globalThis.document.attachEvent("on" + event2, listener);
          globalThis.attachEvent("on" + event2, listener);
        }
      },
      detachEvent: function(event2, listener) {
        if (typeof globalThis.addEventListener !== "undefined") {
          globalThis.removeEventListener(event2, listener, false);
        } else if (globalThis.document && globalThis.detachEvent) {
          globalThis.document.detachEvent("on" + event2, listener);
          globalThis.detachEvent("on" + event2, listener);
        }
      },
      unloadAdd: function(listener) {
        if (isChromePackagedApp) {
          return null;
        }
        var ref = random2.string(8);
        onUnload[ref] = listener;
        if (afterUnload) {
          setTimeout(this.triggerUnloadCallbacks, 0);
        }
        return ref;
      },
      unloadDel: function(ref) {
        if (ref in onUnload) {
          delete onUnload[ref];
        }
      },
      triggerUnloadCallbacks: function() {
        for (var ref in onUnload) {
          onUnload[ref]();
          delete onUnload[ref];
        }
      }
    };
    var unloadTriggered = function() {
      if (afterUnload) {
        return;
      }
      afterUnload = true;
      module.exports.triggerUnloadCallbacks();
    };
    if (!isChromePackagedApp) {
      module.exports.attachEvent("unload", unloadTriggered);
    }
  })(event$1);
  return event$1.exports;
}
var url;
var hasRequiredUrl;
function requireUrl() {
  if (hasRequiredUrl) return url;
  hasRequiredUrl = 1;
  var URL = requireUrlParse();
  url = {
    getOrigin: function(url2) {
      if (!url2) {
        return null;
      }
      var p = new URL(url2);
      if (p.protocol === "file:") {
        return null;
      }
      var port = p.port;
      if (!port) {
        port = p.protocol === "https:" ? "443" : "80";
      }
      return p.protocol + "//" + p.hostname + ":" + port;
    },
    isOriginEqual: function(a, b) {
      var res = this.getOrigin(a) === this.getOrigin(b);
      return res;
    },
    isSchemeEqual: function(a, b) {
      return a.split(":")[0] === b.split(":")[0];
    },
    addPath: function(url2, path) {
      var qs = url2.split("?");
      return qs[0] + path + (qs[1] ? "?" + qs[1] : "");
    },
    addQuery: function(url2, q) {
      return url2 + (url2.indexOf("?") === -1 ? "?" + q : "&" + q);
    },
    isLoopbackAddr: function(addr) {
      return /^127\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})$/i.test(addr) || /^\[::1\]$/.test(addr);
    }
  };
  return url;
}
var websocket$1;
var hasRequiredWebsocket$1;
function requireWebsocket$1() {
  if (hasRequiredWebsocket$1) return websocket$1;
  hasRequiredWebsocket$1 = 1;
  websocket$1 = requireWebsocket$2().Client;
  return websocket$1;
}
var websocket;
var hasRequiredWebsocket;
function requireWebsocket() {
  if (hasRequiredWebsocket) return websocket;
  hasRequiredWebsocket = 1;
  var utils = requireEvent$1(), urlUtils = requireUrl(), inherits = requireInherits(), EventEmitter = require$$1$1.EventEmitter, WebsocketDriver = requireWebsocket$1();
  var debug = function() {
  };
  function WebSocketTransport(transUrl, ignore, options) {
    if (!WebSocketTransport.enabled()) {
      throw new Error("Transport created when disabled");
    }
    EventEmitter.call(this);
    var self = this;
    var url2 = urlUtils.addPath(transUrl, "/websocket");
    if (url2.slice(0, 5) === "https") {
      url2 = "wss" + url2.slice(5);
    } else {
      url2 = "ws" + url2.slice(4);
    }
    this.url = url2;
    this.ws = new WebsocketDriver(this.url, [], options);
    this.ws.onmessage = function(e) {
      debug("message event", e.data);
      self.emit("message", e.data);
    };
    this.unloadRef = utils.unloadAdd(function() {
      self.ws.close();
    });
    this.ws.onclose = function(e) {
      debug("close event", e.code, e.reason);
      self.emit("close", e.code, e.reason);
      self._cleanup();
    };
    this.ws.onerror = function(e) {
      self.emit("close", 1006, "WebSocket connection broken");
      self._cleanup();
    };
  }
  inherits(WebSocketTransport, EventEmitter);
  WebSocketTransport.prototype.send = function(data) {
    var msg = "[" + data + "]";
    this.ws.send(msg);
  };
  WebSocketTransport.prototype.close = function() {
    var ws = this.ws;
    this._cleanup();
    if (ws) {
      ws.close();
    }
  };
  WebSocketTransport.prototype._cleanup = function() {
    var ws = this.ws;
    if (ws) {
      ws.onmessage = ws.onclose = ws.onerror = null;
    }
    utils.unloadDel(this.unloadRef);
    this.unloadRef = this.ws = null;
    this.removeAllListeners();
  };
  WebSocketTransport.enabled = function() {
    return !!WebsocketDriver;
  };
  WebSocketTransport.transportName = "websocket";
  WebSocketTransport.roundTrips = 2;
  websocket = WebSocketTransport;
  return websocket;
}
var bufferedSender;
var hasRequiredBufferedSender;
function requireBufferedSender() {
  if (hasRequiredBufferedSender) return bufferedSender;
  hasRequiredBufferedSender = 1;
  var inherits = requireInherits(), EventEmitter = require$$1$1.EventEmitter;
  var debug = function() {
  };
  function BufferedSender(url2, sender) {
    EventEmitter.call(this);
    this.sendBuffer = [];
    this.sender = sender;
    this.url = url2;
  }
  inherits(BufferedSender, EventEmitter);
  BufferedSender.prototype.send = function(message) {
    this.sendBuffer.push(message);
    if (!this.sendStop) {
      this.sendSchedule();
    }
  };
  BufferedSender.prototype.sendScheduleWait = function() {
    var self = this;
    var tref;
    this.sendStop = function() {
      self.sendStop = null;
      clearTimeout(tref);
    };
    tref = setTimeout(function() {
      self.sendStop = null;
      self.sendSchedule();
    }, 25);
  };
  BufferedSender.prototype.sendSchedule = function() {
    debug("sendSchedule", this.sendBuffer.length);
    var self = this;
    if (this.sendBuffer.length > 0) {
      var payload = "[" + this.sendBuffer.join(",") + "]";
      this.sendStop = this.sender(this.url, payload, function(err) {
        self.sendStop = null;
        if (err) {
          self.emit("close", err.code || 1006, "Sending error: " + err);
          self.close();
        } else {
          self.sendScheduleWait();
        }
      });
      this.sendBuffer = [];
    }
  };
  BufferedSender.prototype._cleanup = function() {
    this.removeAllListeners();
  };
  BufferedSender.prototype.close = function() {
    this._cleanup();
    if (this.sendStop) {
      this.sendStop();
      this.sendStop = null;
    }
  };
  bufferedSender = BufferedSender;
  return bufferedSender;
}
var polling;
var hasRequiredPolling;
function requirePolling() {
  if (hasRequiredPolling) return polling;
  hasRequiredPolling = 1;
  var inherits = requireInherits(), EventEmitter = require$$1$1.EventEmitter;
  var debug = function() {
  };
  function Polling(Receiver, receiveUrl, AjaxObject) {
    EventEmitter.call(this);
    this.Receiver = Receiver;
    this.receiveUrl = receiveUrl;
    this.AjaxObject = AjaxObject;
    this._scheduleReceiver();
  }
  inherits(Polling, EventEmitter);
  Polling.prototype._scheduleReceiver = function() {
    var self = this;
    var poll = this.poll = new this.Receiver(this.receiveUrl, this.AjaxObject);
    poll.on("message", function(msg) {
      self.emit("message", msg);
    });
    poll.once("close", function(code, reason) {
      debug("close", code, reason, self.pollIsClosing);
      self.poll = poll = null;
      if (!self.pollIsClosing) {
        if (reason === "network") {
          self._scheduleReceiver();
        } else {
          self.emit("close", code || 1006, reason);
          self.removeAllListeners();
        }
      }
    });
  };
  Polling.prototype.abort = function() {
    this.removeAllListeners();
    this.pollIsClosing = true;
    if (this.poll) {
      this.poll.abort();
    }
  };
  polling = Polling;
  return polling;
}
var senderReceiver;
var hasRequiredSenderReceiver;
function requireSenderReceiver() {
  if (hasRequiredSenderReceiver) return senderReceiver;
  hasRequiredSenderReceiver = 1;
  var inherits = requireInherits(), urlUtils = requireUrl(), BufferedSender = requireBufferedSender(), Polling = requirePolling();
  function SenderReceiver(transUrl, urlSuffix, senderFunc, Receiver, AjaxObject) {
    var pollUrl = urlUtils.addPath(transUrl, urlSuffix);
    var self = this;
    BufferedSender.call(this, transUrl, senderFunc);
    this.poll = new Polling(Receiver, pollUrl, AjaxObject);
    this.poll.on("message", function(msg) {
      self.emit("message", msg);
    });
    this.poll.once("close", function(code, reason) {
      self.poll = null;
      self.emit("close", code, reason);
      self.close();
    });
  }
  inherits(SenderReceiver, BufferedSender);
  SenderReceiver.prototype.close = function() {
    BufferedSender.prototype.close.call(this);
    this.removeAllListeners();
    if (this.poll) {
      this.poll.abort();
      this.poll = null;
    }
  };
  senderReceiver = SenderReceiver;
  return senderReceiver;
}
var ajaxBased;
var hasRequiredAjaxBased;
function requireAjaxBased() {
  if (hasRequiredAjaxBased) return ajaxBased;
  hasRequiredAjaxBased = 1;
  var inherits = requireInherits(), urlUtils = requireUrl(), SenderReceiver = requireSenderReceiver();
  function createAjaxSender(AjaxObject) {
    return function(url2, payload, callback) {
      var opt = {};
      if (typeof payload === "string") {
        opt.headers = { "Content-type": "text/plain" };
      }
      var ajaxUrl = urlUtils.addPath(url2, "/xhr_send");
      var xo = new AjaxObject("POST", ajaxUrl, payload, opt);
      xo.once("finish", function(status) {
        xo = null;
        if (status !== 200 && status !== 204) {
          return callback(new Error("http status " + status));
        }
        callback();
      });
      return function() {
        xo.close();
        xo = null;
        var err = new Error("Aborted");
        err.code = 1e3;
        callback(err);
      };
    };
  }
  function AjaxBasedTransport(transUrl, urlSuffix, Receiver, AjaxObject) {
    SenderReceiver.call(this, transUrl, urlSuffix, createAjaxSender(AjaxObject), Receiver, AjaxObject);
  }
  inherits(AjaxBasedTransport, SenderReceiver);
  ajaxBased = AjaxBasedTransport;
  return ajaxBased;
}
var xhr$1;
var hasRequiredXhr$1;
function requireXhr$1() {
  if (hasRequiredXhr$1) return xhr$1;
  hasRequiredXhr$1 = 1;
  var inherits = requireInherits(), EventEmitter = require$$1$1.EventEmitter;
  function XhrReceiver(url2, AjaxObject) {
    EventEmitter.call(this);
    var self = this;
    this.bufferPosition = 0;
    this.xo = new AjaxObject("POST", url2, null);
    this.xo.on("chunk", this._chunkHandler.bind(this));
    this.xo.once("finish", function(status, text) {
      self._chunkHandler(status, text);
      self.xo = null;
      var reason = status === 200 ? "network" : "permanent";
      self.emit("close", null, reason);
      self._cleanup();
    });
  }
  inherits(XhrReceiver, EventEmitter);
  XhrReceiver.prototype._chunkHandler = function(status, text) {
    if (status !== 200 || !text) {
      return;
    }
    for (var idx = -1; ; this.bufferPosition += idx + 1) {
      var buf = text.slice(this.bufferPosition);
      idx = buf.indexOf("\n");
      if (idx === -1) {
        break;
      }
      var msg = buf.slice(0, idx);
      if (msg) {
        this.emit("message", msg);
      }
    }
  };
  XhrReceiver.prototype._cleanup = function() {
    this.removeAllListeners();
  };
  XhrReceiver.prototype.abort = function() {
    if (this.xo) {
      this.xo.close();
      this.emit("close", null, "user");
      this.xo = null;
    }
    this._cleanup();
  };
  xhr$1 = XhrReceiver;
  return xhr$1;
}
var xhr;
var hasRequiredXhr;
function requireXhr() {
  if (hasRequiredXhr) return xhr;
  hasRequiredXhr = 1;
  var EventEmitter = require$$1$1.EventEmitter, inherits = requireInherits(), http = require$$3, https = require$$2, URL = requireUrlParse();
  function XhrDriver(method, url2, payload, opts) {
    var self = this;
    EventEmitter.call(this);
    var parsedUrl = new URL(url2);
    var options = {
      method,
      hostname: parsedUrl.hostname.replace(/\[|\]/g, ""),
      port: parsedUrl.port,
      path: parsedUrl.pathname + (parsedUrl.query || ""),
      headers: opts && opts.headers
    };
    var protocol = parsedUrl.protocol === "https:" ? https : http;
    this.req = protocol.request(options, function(res) {
      res.setEncoding("utf8");
      var responseText = "";
      res.on("data", function(chunk) {
        responseText += chunk;
        self.emit("chunk", 200, responseText);
      });
      res.once("end", function() {
        self.emit("finish", res.statusCode, responseText);
        self.req = null;
      });
    });
    this.req.on("error", function(e) {
      self.emit("finish", 0, e.message);
    });
    if (payload) {
      this.req.write(payload);
    }
    this.req.end();
  }
  inherits(XhrDriver, EventEmitter);
  XhrDriver.prototype.close = function() {
    this.removeAllListeners();
    if (this.req) {
      this.req.abort();
      this.req = null;
    }
  };
  XhrDriver.enabled = true;
  XhrDriver.supportsCORS = true;
  xhr = XhrDriver;
  return xhr;
}
var xhrCors;
var hasRequiredXhrCors;
function requireXhrCors() {
  if (hasRequiredXhrCors) return xhrCors;
  hasRequiredXhrCors = 1;
  var inherits = requireInherits(), XhrDriver = requireXhr();
  function XHRCorsObject(method, url2, payload, opts) {
    XhrDriver.call(this, method, url2, payload, opts);
  }
  inherits(XHRCorsObject, XhrDriver);
  XHRCorsObject.enabled = XhrDriver.enabled && XhrDriver.supportsCORS;
  xhrCors = XHRCorsObject;
  return xhrCors;
}
var xhrLocal;
var hasRequiredXhrLocal;
function requireXhrLocal() {
  if (hasRequiredXhrLocal) return xhrLocal;
  hasRequiredXhrLocal = 1;
  var inherits = requireInherits(), XhrDriver = requireXhr();
  function XHRLocalObject(method, url2, payload) {
    XhrDriver.call(this, method, url2, payload, {
      noCredentials: true
    });
  }
  inherits(XHRLocalObject, XhrDriver);
  XHRLocalObject.enabled = XhrDriver.enabled;
  xhrLocal = XHRLocalObject;
  return xhrLocal;
}
var browser;
var hasRequiredBrowser;
function requireBrowser() {
  if (hasRequiredBrowser) return browser;
  hasRequiredBrowser = 1;
  browser = {
    isOpera: function() {
      return globalThis.navigator && /opera/i.test(globalThis.navigator.userAgent);
    },
    isKonqueror: function() {
      return globalThis.navigator && /konqueror/i.test(globalThis.navigator.userAgent);
    },
    hasDomain: function() {
      if (!globalThis.document) {
        return true;
      }
      try {
        return !!globalThis.document.domain;
      } catch (e) {
        return false;
      }
    }
  };
  return browser;
}
var xhrStreaming;
var hasRequiredXhrStreaming;
function requireXhrStreaming() {
  if (hasRequiredXhrStreaming) return xhrStreaming;
  hasRequiredXhrStreaming = 1;
  var inherits = requireInherits(), AjaxBasedTransport = requireAjaxBased(), XhrReceiver = requireXhr$1(), XHRCorsObject = requireXhrCors(), XHRLocalObject = requireXhrLocal(), browser2 = requireBrowser();
  function XhrStreamingTransport(transUrl) {
    if (!XHRLocalObject.enabled && !XHRCorsObject.enabled) {
      throw new Error("Transport created when disabled");
    }
    AjaxBasedTransport.call(this, transUrl, "/xhr_streaming", XhrReceiver, XHRCorsObject);
  }
  inherits(XhrStreamingTransport, AjaxBasedTransport);
  XhrStreamingTransport.enabled = function(info) {
    if (info.nullOrigin) {
      return false;
    }
    if (browser2.isOpera()) {
      return false;
    }
    return XHRCorsObject.enabled;
  };
  XhrStreamingTransport.transportName = "xhr-streaming";
  XhrStreamingTransport.roundTrips = 2;
  XhrStreamingTransport.needBody = !!globalThis.document;
  xhrStreaming = XhrStreamingTransport;
  return xhrStreaming;
}
var xdr;
var hasRequiredXdr;
function requireXdr() {
  if (hasRequiredXdr) return xdr;
  hasRequiredXdr = 1;
  var EventEmitter = require$$1$1.EventEmitter, inherits = requireInherits(), eventUtils = requireEvent$1(), browser2 = requireBrowser(), urlUtils = requireUrl();
  var debug = function() {
  };
  function XDRObject(method, url2, payload) {
    var self = this;
    EventEmitter.call(this);
    setTimeout(function() {
      self._start(method, url2, payload);
    }, 0);
  }
  inherits(XDRObject, EventEmitter);
  XDRObject.prototype._start = function(method, url2, payload) {
    var self = this;
    var xdr2 = new globalThis.XDomainRequest();
    url2 = urlUtils.addQuery(url2, "t=" + +/* @__PURE__ */ new Date());
    xdr2.onerror = function() {
      self._error();
    };
    xdr2.ontimeout = function() {
      self._error();
    };
    xdr2.onprogress = function() {
      debug("progress", xdr2.responseText);
      self.emit("chunk", 200, xdr2.responseText);
    };
    xdr2.onload = function() {
      self.emit("finish", 200, xdr2.responseText);
      self._cleanup(false);
    };
    this.xdr = xdr2;
    this.unloadRef = eventUtils.unloadAdd(function() {
      self._cleanup(true);
    });
    try {
      this.xdr.open(method, url2);
      if (this.timeout) {
        this.xdr.timeout = this.timeout;
      }
      this.xdr.send(payload);
    } catch (x) {
      this._error();
    }
  };
  XDRObject.prototype._error = function() {
    this.emit("finish", 0, "");
    this._cleanup(false);
  };
  XDRObject.prototype._cleanup = function(abort) {
    if (!this.xdr) {
      return;
    }
    this.removeAllListeners();
    eventUtils.unloadDel(this.unloadRef);
    this.xdr.ontimeout = this.xdr.onerror = this.xdr.onprogress = this.xdr.onload = null;
    if (abort) {
      try {
        this.xdr.abort();
      } catch (x) {
      }
    }
    this.unloadRef = this.xdr = null;
  };
  XDRObject.prototype.close = function() {
    this._cleanup(true);
  };
  XDRObject.enabled = !!(globalThis.XDomainRequest && browser2.hasDomain());
  xdr = XDRObject;
  return xdr;
}
var xdrStreaming;
var hasRequiredXdrStreaming;
function requireXdrStreaming() {
  if (hasRequiredXdrStreaming) return xdrStreaming;
  hasRequiredXdrStreaming = 1;
  var inherits = requireInherits(), AjaxBasedTransport = requireAjaxBased(), XhrReceiver = requireXhr$1(), XDRObject = requireXdr();
  function XdrStreamingTransport(transUrl) {
    if (!XDRObject.enabled) {
      throw new Error("Transport created when disabled");
    }
    AjaxBasedTransport.call(this, transUrl, "/xhr_streaming", XhrReceiver, XDRObject);
  }
  inherits(XdrStreamingTransport, AjaxBasedTransport);
  XdrStreamingTransport.enabled = function(info) {
    if (info.cookie_needed || info.nullOrigin) {
      return false;
    }
    return XDRObject.enabled && info.sameScheme;
  };
  XdrStreamingTransport.transportName = "xdr-streaming";
  XdrStreamingTransport.roundTrips = 2;
  xdrStreaming = XdrStreamingTransport;
  return xdrStreaming;
}
var eventsource$1;
var hasRequiredEventsource$1;
function requireEventsource$1() {
  if (hasRequiredEventsource$1) return eventsource$1;
  hasRequiredEventsource$1 = 1;
  var inherits = requireInherits(), EventEmitter = require$$1$1.EventEmitter, EventSourceDriver = requireEventsource$2();
  var debug = function() {
  };
  function EventSourceReceiver(url2) {
    EventEmitter.call(this);
    var self = this;
    var es = this.es = new EventSourceDriver(url2);
    es.onmessage = function(e) {
      debug("message", e.data);
      self.emit("message", decodeURI(e.data));
    };
    es.onerror = function(e) {
      debug("error", es.readyState);
      var reason = es.readyState !== 2 ? "network" : "permanent";
      self._cleanup();
      self._close(reason);
    };
  }
  inherits(EventSourceReceiver, EventEmitter);
  EventSourceReceiver.prototype.abort = function() {
    this._cleanup();
    this._close("user");
  };
  EventSourceReceiver.prototype._cleanup = function() {
    var es = this.es;
    if (es) {
      es.onmessage = es.onerror = null;
      es.close();
      this.es = null;
    }
  };
  EventSourceReceiver.prototype._close = function(reason) {
    var self = this;
    setTimeout(function() {
      self.emit("close", null, reason);
      self.removeAllListeners();
    }, 200);
  };
  eventsource$1 = EventSourceReceiver;
  return eventsource$1;
}
var eventsource;
var hasRequiredEventsource;
function requireEventsource() {
  if (hasRequiredEventsource) return eventsource;
  hasRequiredEventsource = 1;
  var inherits = requireInherits(), AjaxBasedTransport = requireAjaxBased(), EventSourceReceiver = requireEventsource$1(), XHRCorsObject = requireXhrCors(), EventSourceDriver = requireEventsource$2();
  function EventSourceTransport(transUrl) {
    if (!EventSourceTransport.enabled()) {
      throw new Error("Transport created when disabled");
    }
    AjaxBasedTransport.call(this, transUrl, "/eventsource", EventSourceReceiver, XHRCorsObject);
  }
  inherits(EventSourceTransport, AjaxBasedTransport);
  EventSourceTransport.enabled = function() {
    return !!EventSourceDriver;
  };
  EventSourceTransport.transportName = "eventsource";
  EventSourceTransport.roundTrips = 2;
  eventsource = EventSourceTransport;
  return eventsource;
}
var version;
var hasRequiredVersion;
function requireVersion() {
  if (hasRequiredVersion) return version;
  hasRequiredVersion = 1;
  version = "1.6.1";
  return version;
}
var iframe$1 = { exports: {} };
var hasRequiredIframe$1;
function requireIframe$1() {
  if (hasRequiredIframe$1) return iframe$1.exports;
  hasRequiredIframe$1 = 1;
  (function(module) {
    var eventUtils = requireEvent$1(), browser2 = requireBrowser();
    module.exports = {
      WPrefix: "_jp",
      currentWindowId: null,
      polluteGlobalNamespace: function() {
        if (!(module.exports.WPrefix in globalThis)) {
          globalThis[module.exports.WPrefix] = {};
        }
      },
      postMessage: function(type, data) {
        if (globalThis.parent !== globalThis) {
          globalThis.parent.postMessage(JSON.stringify({
            windowId: module.exports.currentWindowId,
            type,
            data: data || ""
          }), "*");
        }
      },
      createIframe: function(iframeUrl, errorCallback) {
        var iframe2 = globalThis.document.createElement("iframe");
        var tref, unloadRef;
        var unattach = function() {
          clearTimeout(tref);
          try {
            iframe2.onload = null;
          } catch (x) {
          }
          iframe2.onerror = null;
        };
        var cleanup = function() {
          if (iframe2) {
            unattach();
            setTimeout(function() {
              if (iframe2) {
                iframe2.parentNode.removeChild(iframe2);
              }
              iframe2 = null;
            }, 0);
            eventUtils.unloadDel(unloadRef);
          }
        };
        var onerror = function(err) {
          if (iframe2) {
            cleanup();
            errorCallback(err);
          }
        };
        var post = function(msg, origin) {
          setTimeout(function() {
            try {
              if (iframe2 && iframe2.contentWindow) {
                iframe2.contentWindow.postMessage(msg, origin);
              }
            } catch (x) {
            }
          }, 0);
        };
        iframe2.src = iframeUrl;
        iframe2.style.display = "none";
        iframe2.style.position = "absolute";
        iframe2.onerror = function() {
          onerror("onerror");
        };
        iframe2.onload = function() {
          clearTimeout(tref);
          tref = setTimeout(function() {
            onerror("onload timeout");
          }, 2e3);
        };
        globalThis.document.body.appendChild(iframe2);
        tref = setTimeout(function() {
          onerror("timeout");
        }, 15e3);
        unloadRef = eventUtils.unloadAdd(cleanup);
        return {
          post,
          cleanup,
          loaded: unattach
        };
      },
      createHtmlfile: function(iframeUrl, errorCallback) {
        var axo = ["Active"].concat("Object").join("X");
        var doc = new globalThis[axo]("htmlfile");
        var tref, unloadRef;
        var iframe2;
        var unattach = function() {
          clearTimeout(tref);
          iframe2.onerror = null;
        };
        var cleanup = function() {
          if (doc) {
            unattach();
            eventUtils.unloadDel(unloadRef);
            iframe2.parentNode.removeChild(iframe2);
            iframe2 = doc = null;
            CollectGarbage();
          }
        };
        var onerror = function(r) {
          if (doc) {
            cleanup();
            errorCallback(r);
          }
        };
        var post = function(msg, origin) {
          try {
            setTimeout(function() {
              if (iframe2 && iframe2.contentWindow) {
                iframe2.contentWindow.postMessage(msg, origin);
              }
            }, 0);
          } catch (x) {
          }
        };
        doc.open();
        doc.write('<html><script>document.domain="' + globalThis.document.domain + '";<\/script></html>');
        doc.close();
        doc.parentWindow[module.exports.WPrefix] = globalThis[module.exports.WPrefix];
        var c = doc.createElement("div");
        doc.body.appendChild(c);
        iframe2 = doc.createElement("iframe");
        c.appendChild(iframe2);
        iframe2.src = iframeUrl;
        iframe2.onerror = function() {
          onerror("onerror");
        };
        tref = setTimeout(function() {
          onerror("timeout");
        }, 15e3);
        unloadRef = eventUtils.unloadAdd(cleanup);
        return {
          post,
          cleanup,
          loaded: unattach
        };
      }
    };
    module.exports.iframeEnabled = false;
    if (globalThis.document) {
      module.exports.iframeEnabled = (typeof globalThis.postMessage === "function" || typeof globalThis.postMessage === "object") && !browser2.isKonqueror();
    }
  })(iframe$1);
  return iframe$1.exports;
}
var iframe;
var hasRequiredIframe;
function requireIframe() {
  if (hasRequiredIframe) return iframe;
  hasRequiredIframe = 1;
  var inherits = requireInherits(), EventEmitter = require$$1$1.EventEmitter, version2 = requireVersion(), urlUtils = requireUrl(), iframeUtils = requireIframe$1(), eventUtils = requireEvent$1(), random2 = requireRandom();
  var debug = function() {
  };
  function IframeTransport(transport2, transUrl, baseUrl) {
    if (!IframeTransport.enabled()) {
      throw new Error("Transport created when disabled");
    }
    EventEmitter.call(this);
    var self = this;
    this.origin = urlUtils.getOrigin(baseUrl);
    this.baseUrl = baseUrl;
    this.transUrl = transUrl;
    this.transport = transport2;
    this.windowId = random2.string(8);
    var iframeUrl = urlUtils.addPath(baseUrl, "/iframe.html") + "#" + this.windowId;
    this.iframeObj = iframeUtils.createIframe(iframeUrl, function(r) {
      self.emit("close", 1006, "Unable to load an iframe (" + r + ")");
      self.close();
    });
    this.onmessageCallback = this._message.bind(this);
    eventUtils.attachEvent("message", this.onmessageCallback);
  }
  inherits(IframeTransport, EventEmitter);
  IframeTransport.prototype.close = function() {
    this.removeAllListeners();
    if (this.iframeObj) {
      eventUtils.detachEvent("message", this.onmessageCallback);
      try {
        this.postMessage("c");
      } catch (x) {
      }
      this.iframeObj.cleanup();
      this.iframeObj = null;
      this.onmessageCallback = this.iframeObj = null;
    }
  };
  IframeTransport.prototype._message = function(e) {
    debug("message", e.data);
    if (!urlUtils.isOriginEqual(e.origin, this.origin)) {
      debug("not same origin", e.origin, this.origin);
      return;
    }
    var iframeMessage;
    try {
      iframeMessage = JSON.parse(e.data);
    } catch (ignored) {
      debug("bad json", e.data);
      return;
    }
    if (iframeMessage.windowId !== this.windowId) {
      debug("mismatched window id", iframeMessage.windowId, this.windowId);
      return;
    }
    switch (iframeMessage.type) {
      case "s":
        this.iframeObj.loaded();
        this.postMessage("s", JSON.stringify([
          version2,
          this.transport,
          this.transUrl,
          this.baseUrl
        ]));
        break;
      case "t":
        this.emit("message", iframeMessage.data);
        break;
      case "c":
        var cdata;
        try {
          cdata = JSON.parse(iframeMessage.data);
        } catch (ignored) {
          debug("bad json", iframeMessage.data);
          return;
        }
        this.emit("close", cdata[0], cdata[1]);
        this.close();
        break;
    }
  };
  IframeTransport.prototype.postMessage = function(type, data) {
    this.iframeObj.post(JSON.stringify({
      windowId: this.windowId,
      type,
      data: data || ""
    }), this.origin);
  };
  IframeTransport.prototype.send = function(message) {
    this.postMessage("m", message);
  };
  IframeTransport.enabled = function() {
    return iframeUtils.iframeEnabled;
  };
  IframeTransport.transportName = "iframe";
  IframeTransport.roundTrips = 2;
  iframe = IframeTransport;
  return iframe;
}
var object;
var hasRequiredObject;
function requireObject() {
  if (hasRequiredObject) return object;
  hasRequiredObject = 1;
  object = {
    isObject: function(obj) {
      var type = typeof obj;
      return type === "function" || type === "object" && !!obj;
    },
    extend: function(obj) {
      if (!this.isObject(obj)) {
        return obj;
      }
      var source, prop;
      for (var i = 1, length = arguments.length; i < length; i++) {
        source = arguments[i];
        for (prop in source) {
          if (Object.prototype.hasOwnProperty.call(source, prop)) {
            obj[prop] = source[prop];
          }
        }
      }
      return obj;
    }
  };
  return object;
}
var iframeWrap;
var hasRequiredIframeWrap;
function requireIframeWrap() {
  if (hasRequiredIframeWrap) return iframeWrap;
  hasRequiredIframeWrap = 1;
  var inherits = requireInherits(), IframeTransport = requireIframe(), objectUtils = requireObject();
  iframeWrap = function(transport2) {
    function IframeWrapTransport(transUrl, baseUrl) {
      IframeTransport.call(this, transport2.transportName, transUrl, baseUrl);
    }
    inherits(IframeWrapTransport, IframeTransport);
    IframeWrapTransport.enabled = function(url2, info) {
      if (!globalThis.document) {
        return false;
      }
      var iframeInfo = objectUtils.extend({}, info);
      iframeInfo.sameOrigin = true;
      return transport2.enabled(iframeInfo) && IframeTransport.enabled();
    };
    IframeWrapTransport.transportName = "iframe-" + transport2.transportName;
    IframeWrapTransport.needBody = true;
    IframeWrapTransport.roundTrips = IframeTransport.roundTrips + transport2.roundTrips - 1;
    IframeWrapTransport.facadeTransport = transport2;
    return IframeWrapTransport;
  };
  return iframeWrap;
}
var htmlfile$1;
var hasRequiredHtmlfile$1;
function requireHtmlfile$1() {
  if (hasRequiredHtmlfile$1) return htmlfile$1;
  hasRequiredHtmlfile$1 = 1;
  var inherits = requireInherits(), iframeUtils = requireIframe$1(), urlUtils = requireUrl(), EventEmitter = require$$1$1.EventEmitter, random2 = requireRandom();
  var debug = function() {
  };
  function HtmlfileReceiver(url2) {
    EventEmitter.call(this);
    var self = this;
    iframeUtils.polluteGlobalNamespace();
    this.id = "a" + random2.string(6);
    url2 = urlUtils.addQuery(url2, "c=" + decodeURIComponent(iframeUtils.WPrefix + "." + this.id));
    debug("using htmlfile", HtmlfileReceiver.htmlfileEnabled);
    var constructFunc = HtmlfileReceiver.htmlfileEnabled ? iframeUtils.createHtmlfile : iframeUtils.createIframe;
    globalThis[iframeUtils.WPrefix][this.id] = {
      start: function() {
        self.iframeObj.loaded();
      },
      message: function(data) {
        self.emit("message", data);
      },
      stop: function() {
        self._cleanup();
        self._close("network");
      }
    };
    this.iframeObj = constructFunc(url2, function() {
      self._cleanup();
      self._close("permanent");
    });
  }
  inherits(HtmlfileReceiver, EventEmitter);
  HtmlfileReceiver.prototype.abort = function() {
    this._cleanup();
    this._close("user");
  };
  HtmlfileReceiver.prototype._cleanup = function() {
    if (this.iframeObj) {
      this.iframeObj.cleanup();
      this.iframeObj = null;
    }
    delete globalThis[iframeUtils.WPrefix][this.id];
  };
  HtmlfileReceiver.prototype._close = function(reason) {
    this.emit("close", null, reason);
    this.removeAllListeners();
  };
  HtmlfileReceiver.htmlfileEnabled = false;
  var axo = ["Active"].concat("Object").join("X");
  if (axo in globalThis) {
    try {
      HtmlfileReceiver.htmlfileEnabled = !!new globalThis[axo]("htmlfile");
    } catch (x) {
    }
  }
  HtmlfileReceiver.enabled = HtmlfileReceiver.htmlfileEnabled || iframeUtils.iframeEnabled;
  htmlfile$1 = HtmlfileReceiver;
  return htmlfile$1;
}
var htmlfile;
var hasRequiredHtmlfile;
function requireHtmlfile() {
  if (hasRequiredHtmlfile) return htmlfile;
  hasRequiredHtmlfile = 1;
  var inherits = requireInherits(), HtmlfileReceiver = requireHtmlfile$1(), XHRLocalObject = requireXhrLocal(), AjaxBasedTransport = requireAjaxBased();
  function HtmlFileTransport(transUrl) {
    if (!HtmlfileReceiver.enabled) {
      throw new Error("Transport created when disabled");
    }
    AjaxBasedTransport.call(this, transUrl, "/htmlfile", HtmlfileReceiver, XHRLocalObject);
  }
  inherits(HtmlFileTransport, AjaxBasedTransport);
  HtmlFileTransport.enabled = function(info) {
    return HtmlfileReceiver.enabled && info.sameOrigin;
  };
  HtmlFileTransport.transportName = "htmlfile";
  HtmlFileTransport.roundTrips = 2;
  htmlfile = HtmlFileTransport;
  return htmlfile;
}
var xhrPolling;
var hasRequiredXhrPolling;
function requireXhrPolling() {
  if (hasRequiredXhrPolling) return xhrPolling;
  hasRequiredXhrPolling = 1;
  var inherits = requireInherits(), AjaxBasedTransport = requireAjaxBased(), XhrReceiver = requireXhr$1(), XHRCorsObject = requireXhrCors(), XHRLocalObject = requireXhrLocal();
  function XhrPollingTransport(transUrl) {
    if (!XHRLocalObject.enabled && !XHRCorsObject.enabled) {
      throw new Error("Transport created when disabled");
    }
    AjaxBasedTransport.call(this, transUrl, "/xhr", XhrReceiver, XHRCorsObject);
  }
  inherits(XhrPollingTransport, AjaxBasedTransport);
  XhrPollingTransport.enabled = function(info) {
    if (info.nullOrigin) {
      return false;
    }
    if (XHRLocalObject.enabled && info.sameOrigin) {
      return true;
    }
    return XHRCorsObject.enabled;
  };
  XhrPollingTransport.transportName = "xhr-polling";
  XhrPollingTransport.roundTrips = 2;
  xhrPolling = XhrPollingTransport;
  return xhrPolling;
}
var xdrPolling;
var hasRequiredXdrPolling;
function requireXdrPolling() {
  if (hasRequiredXdrPolling) return xdrPolling;
  hasRequiredXdrPolling = 1;
  var inherits = requireInherits(), AjaxBasedTransport = requireAjaxBased(), XdrStreamingTransport = requireXdrStreaming(), XhrReceiver = requireXhr$1(), XDRObject = requireXdr();
  function XdrPollingTransport(transUrl) {
    if (!XDRObject.enabled) {
      throw new Error("Transport created when disabled");
    }
    AjaxBasedTransport.call(this, transUrl, "/xhr", XhrReceiver, XDRObject);
  }
  inherits(XdrPollingTransport, AjaxBasedTransport);
  XdrPollingTransport.enabled = XdrStreamingTransport.enabled;
  XdrPollingTransport.transportName = "xdr-polling";
  XdrPollingTransport.roundTrips = 2;
  xdrPolling = XdrPollingTransport;
  return xdrPolling;
}
var jsonp$1;
var hasRequiredJsonp$1;
function requireJsonp$1() {
  if (hasRequiredJsonp$1) return jsonp$1;
  hasRequiredJsonp$1 = 1;
  var utils = requireIframe$1(), random2 = requireRandom(), browser2 = requireBrowser(), urlUtils = requireUrl(), inherits = requireInherits(), EventEmitter = require$$1$1.EventEmitter;
  var debug = function() {
  };
  function JsonpReceiver(url2) {
    var self = this;
    EventEmitter.call(this);
    utils.polluteGlobalNamespace();
    this.id = "a" + random2.string(6);
    var urlWithId = urlUtils.addQuery(url2, "c=" + encodeURIComponent(utils.WPrefix + "." + this.id));
    globalThis[utils.WPrefix][this.id] = this._callback.bind(this);
    this._createScript(urlWithId);
    this.timeoutId = setTimeout(function() {
      self._abort(new Error("JSONP script loaded abnormally (timeout)"));
    }, JsonpReceiver.timeout);
  }
  inherits(JsonpReceiver, EventEmitter);
  JsonpReceiver.prototype.abort = function() {
    if (globalThis[utils.WPrefix][this.id]) {
      var err = new Error("JSONP user aborted read");
      err.code = 1e3;
      this._abort(err);
    }
  };
  JsonpReceiver.timeout = 35e3;
  JsonpReceiver.scriptErrorTimeout = 1e3;
  JsonpReceiver.prototype._callback = function(data) {
    this._cleanup();
    if (this.aborting) {
      return;
    }
    if (data) {
      this.emit("message", data);
    }
    this.emit("close", null, "network");
    this.removeAllListeners();
  };
  JsonpReceiver.prototype._abort = function(err) {
    this._cleanup();
    this.aborting = true;
    this.emit("close", err.code, err.message);
    this.removeAllListeners();
  };
  JsonpReceiver.prototype._cleanup = function() {
    clearTimeout(this.timeoutId);
    if (this.script2) {
      this.script2.parentNode.removeChild(this.script2);
      this.script2 = null;
    }
    if (this.script) {
      var script = this.script;
      script.parentNode.removeChild(script);
      script.onreadystatechange = script.onerror = script.onload = script.onclick = null;
      this.script = null;
    }
    delete globalThis[utils.WPrefix][this.id];
  };
  JsonpReceiver.prototype._scriptError = function() {
    var self = this;
    if (this.errorTimer) {
      return;
    }
    this.errorTimer = setTimeout(function() {
      if (!self.loadedOkay) {
        self._abort(new Error("JSONP script loaded abnormally (onerror)"));
      }
    }, JsonpReceiver.scriptErrorTimeout);
  };
  JsonpReceiver.prototype._createScript = function(url2) {
    var self = this;
    var script = this.script = globalThis.document.createElement("script");
    var script2;
    script.id = "a" + random2.string(8);
    script.src = url2;
    script.type = "text/javascript";
    script.charset = "UTF-8";
    script.onerror = this._scriptError.bind(this);
    script.onload = function() {
      self._abort(new Error("JSONP script loaded abnormally (onload)"));
    };
    script.onreadystatechange = function() {
      debug("onreadystatechange", script.readyState);
      if (/loaded|closed/.test(script.readyState)) {
        if (script && script.htmlFor && script.onclick) {
          self.loadedOkay = true;
          try {
            script.onclick();
          } catch (x) {
          }
        }
        if (script) {
          self._abort(new Error("JSONP script loaded abnormally (onreadystatechange)"));
        }
      }
    };
    if (typeof script.async === "undefined" && globalThis.document.attachEvent) {
      if (!browser2.isOpera()) {
        try {
          script.htmlFor = script.id;
          script.event = "onclick";
        } catch (x) {
        }
        script.async = true;
      } else {
        script2 = this.script2 = globalThis.document.createElement("script");
        script2.text = "try{var a = document.getElementById('" + script.id + "'); if(a)a.onerror();}catch(x){};";
        script.async = script2.async = false;
      }
    }
    if (typeof script.async !== "undefined") {
      script.async = true;
    }
    var head = globalThis.document.getElementsByTagName("head")[0];
    head.insertBefore(script, head.firstChild);
    if (script2) {
      head.insertBefore(script2, head.firstChild);
    }
  };
  jsonp$1 = JsonpReceiver;
  return jsonp$1;
}
var jsonp;
var hasRequiredJsonp;
function requireJsonp() {
  if (hasRequiredJsonp) return jsonp;
  hasRequiredJsonp = 1;
  var random2 = requireRandom(), urlUtils = requireUrl();
  var debug = function() {
  };
  var form, area;
  function createIframe(id) {
    try {
      return globalThis.document.createElement('<iframe name="' + id + '">');
    } catch (x) {
      var iframe2 = globalThis.document.createElement("iframe");
      iframe2.name = id;
      return iframe2;
    }
  }
  function createForm() {
    form = globalThis.document.createElement("form");
    form.style.display = "none";
    form.style.position = "absolute";
    form.method = "POST";
    form.enctype = "application/x-www-form-urlencoded";
    form.acceptCharset = "UTF-8";
    area = globalThis.document.createElement("textarea");
    area.name = "d";
    form.appendChild(area);
    globalThis.document.body.appendChild(form);
  }
  jsonp = function(url2, payload, callback) {
    if (!form) {
      createForm();
    }
    var id = "a" + random2.string(8);
    form.target = id;
    form.action = urlUtils.addQuery(urlUtils.addPath(url2, "/jsonp_send"), "i=" + id);
    var iframe2 = createIframe(id);
    iframe2.id = id;
    iframe2.style.display = "none";
    form.appendChild(iframe2);
    try {
      area.value = payload;
    } catch (e) {
    }
    form.submit();
    var completed = function(err) {
      if (!iframe2.onerror) {
        return;
      }
      iframe2.onreadystatechange = iframe2.onerror = iframe2.onload = null;
      setTimeout(function() {
        iframe2.parentNode.removeChild(iframe2);
        iframe2 = null;
      }, 500);
      area.value = "";
      callback(err);
    };
    iframe2.onerror = function() {
      completed();
    };
    iframe2.onload = function() {
      completed();
    };
    iframe2.onreadystatechange = function(e) {
      debug("onreadystatechange", id, iframe2.readyState);
      if (iframe2.readyState === "complete") {
        completed();
      }
    };
    return function() {
      completed(new Error("Aborted"));
    };
  };
  return jsonp;
}
var jsonpPolling;
var hasRequiredJsonpPolling;
function requireJsonpPolling() {
  if (hasRequiredJsonpPolling) return jsonpPolling;
  hasRequiredJsonpPolling = 1;
  var inherits = requireInherits(), SenderReceiver = requireSenderReceiver(), JsonpReceiver = requireJsonp$1(), jsonpSender = requireJsonp();
  function JsonPTransport(transUrl) {
    if (!JsonPTransport.enabled()) {
      throw new Error("Transport created when disabled");
    }
    SenderReceiver.call(this, transUrl, "/jsonp", jsonpSender, JsonpReceiver);
  }
  inherits(JsonPTransport, SenderReceiver);
  JsonPTransport.enabled = function() {
    return !!globalThis.document;
  };
  JsonPTransport.transportName = "jsonp-polling";
  JsonPTransport.roundTrips = 1;
  JsonPTransport.needBody = true;
  jsonpPolling = JsonPTransport;
  return jsonpPolling;
}
var transportList;
var hasRequiredTransportList;
function requireTransportList() {
  if (hasRequiredTransportList) return transportList;
  hasRequiredTransportList = 1;
  transportList = [
    // streaming transports
    requireWebsocket(),
    requireXhrStreaming(),
    requireXdrStreaming(),
    requireEventsource(),
    requireIframeWrap()(requireEventsource()),
    requireHtmlfile(),
    requireIframeWrap()(requireHtmlfile()),
    requireXhrPolling(),
    requireXdrPolling(),
    requireIframeWrap()(requireXhrPolling()),
    requireJsonpPolling()
  ];
  return transportList;
}
var shims = {};
var hasRequiredShims;
function requireShims() {
  if (hasRequiredShims) return shims;
  hasRequiredShims = 1;
  var ArrayPrototype = Array.prototype;
  var ObjectPrototype = Object.prototype;
  var FunctionPrototype = Function.prototype;
  var StringPrototype = String.prototype;
  var array_slice = ArrayPrototype.slice;
  var _toString = ObjectPrototype.toString;
  var isFunction = function(val) {
    return ObjectPrototype.toString.call(val) === "[object Function]";
  };
  var isArray = function isArray2(obj) {
    return _toString.call(obj) === "[object Array]";
  };
  var isString = function isString2(obj) {
    return _toString.call(obj) === "[object String]";
  };
  var supportsDescriptors = Object.defineProperty && (function() {
    try {
      Object.defineProperty({}, "x", {});
      return true;
    } catch (e) {
      return false;
    }
  })();
  var defineProperty;
  if (supportsDescriptors) {
    defineProperty = function(object2, name, method, forceAssign) {
      if (!forceAssign && name in object2) {
        return;
      }
      Object.defineProperty(object2, name, {
        configurable: true,
        enumerable: false,
        writable: true,
        value: method
      });
    };
  } else {
    defineProperty = function(object2, name, method, forceAssign) {
      if (!forceAssign && name in object2) {
        return;
      }
      object2[name] = method;
    };
  }
  var defineProperties = function(object2, map, forceAssign) {
    for (var name in map) {
      if (ObjectPrototype.hasOwnProperty.call(map, name)) {
        defineProperty(object2, name, map[name], forceAssign);
      }
    }
  };
  var toObject = function(o) {
    if (o == null) {
      throw new TypeError("can't convert " + o + " to object");
    }
    return Object(o);
  };
  function toInteger(num) {
    var n = +num;
    if (n !== n) {
      n = 0;
    } else if (n !== 0 && n !== 1 / 0 && n !== -Infinity) {
      n = (n > 0 || -1) * Math.floor(Math.abs(n));
    }
    return n;
  }
  function ToUint32(x) {
    return x >>> 0;
  }
  function Empty() {
  }
  defineProperties(FunctionPrototype, {
    bind: function bind(that) {
      var target = this;
      if (!isFunction(target)) {
        throw new TypeError("Function.prototype.bind called on incompatible " + target);
      }
      var args = array_slice.call(arguments, 1);
      var binder = function() {
        if (this instanceof bound) {
          var result = target.apply(
            this,
            args.concat(array_slice.call(arguments))
          );
          if (Object(result) === result) {
            return result;
          }
          return this;
        } else {
          return target.apply(
            that,
            args.concat(array_slice.call(arguments))
          );
        }
      };
      var boundLength = Math.max(0, target.length - args.length);
      var boundArgs = [];
      for (var i = 0; i < boundLength; i++) {
        boundArgs.push("$" + i);
      }
      var bound = Function("binder", "return function (" + boundArgs.join(",") + "){ return binder.apply(this, arguments); }")(binder);
      if (target.prototype) {
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
      }
      return bound;
    }
  });
  defineProperties(Array, { isArray });
  var boxedString = Object("a");
  var splitString = boxedString[0] !== "a" || !(0 in boxedString);
  var properlyBoxesContext = function properlyBoxed(method) {
    var properlyBoxesNonStrict = true;
    var properlyBoxesStrict = true;
    if (method) {
      method.call("foo", function(_, __, context) {
        if (typeof context !== "object") {
          properlyBoxesNonStrict = false;
        }
      });
      method.call([1], function() {
        properlyBoxesStrict = typeof this === "string";
      }, "x");
    }
    return !!method && properlyBoxesNonStrict && properlyBoxesStrict;
  };
  defineProperties(ArrayPrototype, {
    forEach: function forEach(fun) {
      var object2 = toObject(this), self = splitString && isString(this) ? this.split("") : object2, thisp = arguments[1], i = -1, length = self.length >>> 0;
      if (!isFunction(fun)) {
        throw new TypeError();
      }
      while (++i < length) {
        if (i in self) {
          fun.call(thisp, self[i], i, object2);
        }
      }
    }
  }, !properlyBoxesContext(ArrayPrototype.forEach));
  var hasFirefox2IndexOfBug = Array.prototype.indexOf && [0, 1].indexOf(1, 2) !== -1;
  defineProperties(ArrayPrototype, {
    indexOf: function indexOf(sought) {
      var self = splitString && isString(this) ? this.split("") : toObject(this), length = self.length >>> 0;
      if (!length) {
        return -1;
      }
      var i = 0;
      if (arguments.length > 1) {
        i = toInteger(arguments[1]);
      }
      i = i >= 0 ? i : Math.max(0, length + i);
      for (; i < length; i++) {
        if (i in self && self[i] === sought) {
          return i;
        }
      }
      return -1;
    }
  }, hasFirefox2IndexOfBug);
  var string_split = StringPrototype.split;
  if ("ab".split(/(?:ab)*/).length !== 2 || ".".split(/(.?)(.?)/).length !== 4 || "tesst".split(/(s)*/)[1] === "t" || "test".split(/(?:)/, -1).length !== 4 || "".split(/.?/).length || ".".split(/()()/).length > 1) {
    (function() {
      var compliantExecNpcg = /()??/.exec("")[1] === void 0;
      StringPrototype.split = function(separator, limit) {
        var string = this;
        if (separator === void 0 && limit === 0) {
          return [];
        }
        if (_toString.call(separator) !== "[object RegExp]") {
          return string_split.call(this, separator, limit);
        }
        var output = [], flags = (separator.ignoreCase ? "i" : "") + (separator.multiline ? "m" : "") + (separator.extended ? "x" : "") + // Proposed for ES6
        (separator.sticky ? "y" : ""), lastLastIndex = 0, separator2, match, lastIndex, lastLength;
        separator = new RegExp(separator.source, flags + "g");
        string += "";
        if (!compliantExecNpcg) {
          separator2 = new RegExp("^" + separator.source + "$(?!\\s)", flags);
        }
        limit = limit === void 0 ? -1 >>> 0 : (
          // Math.pow(2, 32) - 1
          ToUint32(limit)
        );
        while (match = separator.exec(string)) {
          lastIndex = match.index + match[0].length;
          if (lastIndex > lastLastIndex) {
            output.push(string.slice(lastLastIndex, match.index));
            if (!compliantExecNpcg && match.length > 1) {
              match[0].replace(separator2, function() {
                for (var i = 1; i < arguments.length - 2; i++) {
                  if (arguments[i] === void 0) {
                    match[i] = void 0;
                  }
                }
              });
            }
            if (match.length > 1 && match.index < string.length) {
              ArrayPrototype.push.apply(output, match.slice(1));
            }
            lastLength = match[0].length;
            lastLastIndex = lastIndex;
            if (output.length >= limit) {
              break;
            }
          }
          if (separator.lastIndex === match.index) {
            separator.lastIndex++;
          }
        }
        if (lastLastIndex === string.length) {
          if (lastLength || !separator.test("")) {
            output.push("");
          }
        } else {
          output.push(string.slice(lastLastIndex));
        }
        return output.length > limit ? output.slice(0, limit) : output;
      };
    })();
  } else if ("0".split(void 0, 0).length) {
    StringPrototype.split = function split(separator, limit) {
      if (separator === void 0 && limit === 0) {
        return [];
      }
      return string_split.call(this, separator, limit);
    };
  }
  var string_substr = StringPrototype.substr;
  var hasNegativeSubstrBug = "".substr && "0b".substr(-1) !== "b";
  defineProperties(StringPrototype, {
    substr: function substr(start, length) {
      return string_substr.call(
        this,
        start < 0 ? (start = this.length + start) < 0 ? 0 : start : start,
        length
      );
    }
  }, hasNegativeSubstrBug);
  return shims;
}
var _escape;
var hasRequired_escape;
function require_escape() {
  if (hasRequired_escape) return _escape;
  hasRequired_escape = 1;
  var extraEscapable = /[\x00-\x1f\ud800-\udfff\ufffe\uffff\u0300-\u0333\u033d-\u0346\u034a-\u034c\u0350-\u0352\u0357-\u0358\u035c-\u0362\u0374\u037e\u0387\u0591-\u05af\u05c4\u0610-\u0617\u0653-\u0654\u0657-\u065b\u065d-\u065e\u06df-\u06e2\u06eb-\u06ec\u0730\u0732-\u0733\u0735-\u0736\u073a\u073d\u073f-\u0741\u0743\u0745\u0747\u07eb-\u07f1\u0951\u0958-\u095f\u09dc-\u09dd\u09df\u0a33\u0a36\u0a59-\u0a5b\u0a5e\u0b5c-\u0b5d\u0e38-\u0e39\u0f43\u0f4d\u0f52\u0f57\u0f5c\u0f69\u0f72-\u0f76\u0f78\u0f80-\u0f83\u0f93\u0f9d\u0fa2\u0fa7\u0fac\u0fb9\u1939-\u193a\u1a17\u1b6b\u1cda-\u1cdb\u1dc0-\u1dcf\u1dfc\u1dfe\u1f71\u1f73\u1f75\u1f77\u1f79\u1f7b\u1f7d\u1fbb\u1fbe\u1fc9\u1fcb\u1fd3\u1fdb\u1fe3\u1feb\u1fee-\u1fef\u1ff9\u1ffb\u1ffd\u2000-\u2001\u20d0-\u20d1\u20d4-\u20d7\u20e7-\u20e9\u2126\u212a-\u212b\u2329-\u232a\u2adc\u302b-\u302c\uaab2-\uaab3\uf900-\ufa0d\ufa10\ufa12\ufa15-\ufa1e\ufa20\ufa22\ufa25-\ufa26\ufa2a-\ufa2d\ufa30-\ufa6d\ufa70-\ufad9\ufb1d\ufb1f\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40-\ufb41\ufb43-\ufb44\ufb46-\ufb4e\ufff0-\uffff]/g, extraLookup;
  var unrollLookup = function(escapable) {
    var i;
    var unrolled = {};
    var c = [];
    for (i = 0; i < 65536; i++) {
      c.push(String.fromCharCode(i));
    }
    escapable.lastIndex = 0;
    c.join("").replace(escapable, function(a) {
      unrolled[a] = "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
      return "";
    });
    escapable.lastIndex = 0;
    return unrolled;
  };
  _escape = {
    quote: function(string) {
      var quoted = JSON.stringify(string);
      extraEscapable.lastIndex = 0;
      if (!extraEscapable.test(quoted)) {
        return quoted;
      }
      if (!extraLookup) {
        extraLookup = unrollLookup(extraEscapable);
      }
      return quoted.replace(extraEscapable, function(a) {
        return extraLookup[a];
      });
    }
  };
  return _escape;
}
var transport;
var hasRequiredTransport;
function requireTransport() {
  if (hasRequiredTransport) return transport;
  hasRequiredTransport = 1;
  var debug = function() {
  };
  transport = function(availableTransports) {
    return {
      filterToEnabled: function(transportsWhitelist, info) {
        var transports = {
          main: [],
          facade: []
        };
        if (!transportsWhitelist) {
          transportsWhitelist = [];
        } else if (typeof transportsWhitelist === "string") {
          transportsWhitelist = [transportsWhitelist];
        }
        availableTransports.forEach(function(trans) {
          if (!trans) {
            return;
          }
          if (trans.transportName === "websocket" && info.websocket === false) {
            return;
          }
          if (transportsWhitelist.length && transportsWhitelist.indexOf(trans.transportName) === -1) {
            debug("not in whitelist", trans.transportName);
            return;
          }
          if (trans.enabled(info)) {
            debug("enabled", trans.transportName);
            transports.main.push(trans);
            if (trans.facadeTransport) {
              transports.facade.push(trans.facadeTransport);
            }
          } else {
            debug("disabled", trans.transportName);
          }
        });
        return transports;
      }
    };
  };
  return transport;
}
var log;
var hasRequiredLog;
function requireLog() {
  if (hasRequiredLog) return log;
  hasRequiredLog = 1;
  var logObject = {};
  ["log", "debug", "warn"].forEach(function(level) {
    var levelExists;
    try {
      levelExists = globalThis.console && globalThis.console[level] && globalThis.console[level].apply;
    } catch (e) {
    }
    logObject[level] = levelExists ? function() {
      return globalThis.console[level].apply(globalThis.console, arguments);
    } : level === "log" ? function() {
    } : logObject.log;
  });
  log = logObject;
  return log;
}
var event;
var hasRequiredEvent;
function requireEvent() {
  if (hasRequiredEvent) return event;
  hasRequiredEvent = 1;
  function Event(eventType) {
    this.type = eventType;
  }
  Event.prototype.initEvent = function(eventType, canBubble, cancelable) {
    this.type = eventType;
    this.bubbles = canBubble;
    this.cancelable = cancelable;
    this.timeStamp = +/* @__PURE__ */ new Date();
    return this;
  };
  Event.prototype.stopPropagation = function() {
  };
  Event.prototype.preventDefault = function() {
  };
  Event.CAPTURING_PHASE = 1;
  Event.AT_TARGET = 2;
  Event.BUBBLING_PHASE = 3;
  event = Event;
  return event;
}
var eventtarget;
var hasRequiredEventtarget;
function requireEventtarget() {
  if (hasRequiredEventtarget) return eventtarget;
  hasRequiredEventtarget = 1;
  function EventTarget() {
    this._listeners = {};
  }
  EventTarget.prototype.addEventListener = function(eventType, listener) {
    if (!(eventType in this._listeners)) {
      this._listeners[eventType] = [];
    }
    var arr = this._listeners[eventType];
    if (arr.indexOf(listener) === -1) {
      arr = arr.concat([listener]);
    }
    this._listeners[eventType] = arr;
  };
  EventTarget.prototype.removeEventListener = function(eventType, listener) {
    var arr = this._listeners[eventType];
    if (!arr) {
      return;
    }
    var idx = arr.indexOf(listener);
    if (idx !== -1) {
      if (arr.length > 1) {
        this._listeners[eventType] = arr.slice(0, idx).concat(arr.slice(idx + 1));
      } else {
        delete this._listeners[eventType];
      }
      return;
    }
  };
  EventTarget.prototype.dispatchEvent = function() {
    var event2 = arguments[0];
    var t = event2.type;
    var args = arguments.length === 1 ? [event2] : Array.apply(null, arguments);
    if (this["on" + t]) {
      this["on" + t].apply(this, args);
    }
    if (t in this._listeners) {
      var listeners = this._listeners[t];
      for (var i = 0; i < listeners.length; i++) {
        listeners[i].apply(this, args);
      }
    }
  };
  eventtarget = EventTarget;
  return eventtarget;
}
var location;
var hasRequiredLocation;
function requireLocation() {
  if (hasRequiredLocation) return location;
  hasRequiredLocation = 1;
  location = globalThis.location || {
    origin: "http://localhost:80",
    protocol: "http:",
    host: "localhost",
    port: 80,
    href: "http://localhost/",
    hash: ""
  };
  return location;
}
var close;
var hasRequiredClose;
function requireClose() {
  if (hasRequiredClose) return close;
  hasRequiredClose = 1;
  var inherits = requireInherits(), Event = requireEvent();
  function CloseEvent() {
    Event.call(this);
    this.initEvent("close", false, false);
    this.wasClean = false;
    this.code = 0;
    this.reason = "";
  }
  inherits(CloseEvent, Event);
  close = CloseEvent;
  return close;
}
var transMessage;
var hasRequiredTransMessage;
function requireTransMessage() {
  if (hasRequiredTransMessage) return transMessage;
  hasRequiredTransMessage = 1;
  var inherits = requireInherits(), Event = requireEvent();
  function TransportMessageEvent(data) {
    Event.call(this);
    this.initEvent("message", false, false);
    this.data = data;
  }
  inherits(TransportMessageEvent, Event);
  transMessage = TransportMessageEvent;
  return transMessage;
}
var xhrFake;
var hasRequiredXhrFake;
function requireXhrFake() {
  if (hasRequiredXhrFake) return xhrFake;
  hasRequiredXhrFake = 1;
  var EventEmitter = require$$1$1.EventEmitter, inherits = requireInherits();
  function XHRFake() {
    var self = this;
    EventEmitter.call(this);
    this.to = setTimeout(function() {
      self.emit("finish", 200, "{}");
    }, XHRFake.timeout);
  }
  inherits(XHRFake, EventEmitter);
  XHRFake.prototype.close = function() {
    clearTimeout(this.to);
  };
  XHRFake.timeout = 2e3;
  xhrFake = XHRFake;
  return xhrFake;
}
var infoAjax;
var hasRequiredInfoAjax;
function requireInfoAjax() {
  if (hasRequiredInfoAjax) return infoAjax;
  hasRequiredInfoAjax = 1;
  var EventEmitter = require$$1$1.EventEmitter, inherits = requireInherits(), objectUtils = requireObject();
  function InfoAjax(url2, AjaxObject) {
    EventEmitter.call(this);
    var self = this;
    var t0 = +/* @__PURE__ */ new Date();
    this.xo = new AjaxObject("GET", url2);
    this.xo.once("finish", function(status, text) {
      var info, rtt;
      if (status === 200) {
        rtt = +/* @__PURE__ */ new Date() - t0;
        if (text) {
          try {
            info = JSON.parse(text);
          } catch (e) {
          }
        }
        if (!objectUtils.isObject(info)) {
          info = {};
        }
      }
      self.emit("finish", info, rtt);
      self.removeAllListeners();
    });
  }
  inherits(InfoAjax, EventEmitter);
  InfoAjax.prototype.close = function() {
    this.removeAllListeners();
    this.xo.close();
  };
  infoAjax = InfoAjax;
  return infoAjax;
}
var infoIframeReceiver;
var hasRequiredInfoIframeReceiver;
function requireInfoIframeReceiver() {
  if (hasRequiredInfoIframeReceiver) return infoIframeReceiver;
  hasRequiredInfoIframeReceiver = 1;
  var inherits = requireInherits(), EventEmitter = require$$1$1.EventEmitter, XHRLocalObject = requireXhrLocal(), InfoAjax = requireInfoAjax();
  function InfoReceiverIframe(transUrl) {
    var self = this;
    EventEmitter.call(this);
    this.ir = new InfoAjax(transUrl, XHRLocalObject);
    this.ir.once("finish", function(info, rtt) {
      self.ir = null;
      self.emit("message", JSON.stringify([info, rtt]));
    });
  }
  inherits(InfoReceiverIframe, EventEmitter);
  InfoReceiverIframe.transportName = "iframe-info-receiver";
  InfoReceiverIframe.prototype.close = function() {
    if (this.ir) {
      this.ir.close();
      this.ir = null;
    }
    this.removeAllListeners();
  };
  infoIframeReceiver = InfoReceiverIframe;
  return infoIframeReceiver;
}
var infoIframe;
var hasRequiredInfoIframe;
function requireInfoIframe() {
  if (hasRequiredInfoIframe) return infoIframe;
  hasRequiredInfoIframe = 1;
  var EventEmitter = require$$1$1.EventEmitter, inherits = requireInherits(), utils = requireEvent$1(), IframeTransport = requireIframe(), InfoReceiverIframe = requireInfoIframeReceiver();
  function InfoIframe(baseUrl, url2) {
    var self = this;
    EventEmitter.call(this);
    var go = function() {
      var ifr = self.ifr = new IframeTransport(InfoReceiverIframe.transportName, url2, baseUrl);
      ifr.once("message", function(msg) {
        if (msg) {
          var d;
          try {
            d = JSON.parse(msg);
          } catch (e) {
            self.emit("finish");
            self.close();
            return;
          }
          var info = d[0], rtt = d[1];
          self.emit("finish", info, rtt);
        }
        self.close();
      });
      ifr.once("close", function() {
        self.emit("finish");
        self.close();
      });
    };
    if (!globalThis.document.body) {
      utils.attachEvent("load", go);
    } else {
      go();
    }
  }
  inherits(InfoIframe, EventEmitter);
  InfoIframe.enabled = function() {
    return IframeTransport.enabled();
  };
  InfoIframe.prototype.close = function() {
    if (this.ifr) {
      this.ifr.close();
    }
    this.removeAllListeners();
    this.ifr = null;
  };
  infoIframe = InfoIframe;
  return infoIframe;
}
var infoReceiver;
var hasRequiredInfoReceiver;
function requireInfoReceiver() {
  if (hasRequiredInfoReceiver) return infoReceiver;
  hasRequiredInfoReceiver = 1;
  var EventEmitter = require$$1$1.EventEmitter, inherits = requireInherits(), urlUtils = requireUrl(), XDR = requireXdr(), XHRCors = requireXhrCors(), XHRLocal = requireXhrLocal(), XHRFake = requireXhrFake(), InfoIframe = requireInfoIframe(), InfoAjax = requireInfoAjax();
  function InfoReceiver(baseUrl, urlInfo) {
    var self = this;
    EventEmitter.call(this);
    setTimeout(function() {
      self.doXhr(baseUrl, urlInfo);
    }, 0);
  }
  inherits(InfoReceiver, EventEmitter);
  InfoReceiver._getReceiver = function(baseUrl, url2, urlInfo) {
    if (urlInfo.sameOrigin) {
      return new InfoAjax(url2, XHRLocal);
    }
    if (XHRCors.enabled) {
      return new InfoAjax(url2, XHRCors);
    }
    if (XDR.enabled && urlInfo.sameScheme) {
      return new InfoAjax(url2, XDR);
    }
    if (InfoIframe.enabled()) {
      return new InfoIframe(baseUrl, url2);
    }
    return new InfoAjax(url2, XHRFake);
  };
  InfoReceiver.prototype.doXhr = function(baseUrl, urlInfo) {
    var self = this, url2 = urlUtils.addPath(baseUrl, "/info");
    this.xo = InfoReceiver._getReceiver(baseUrl, url2, urlInfo);
    this.timeoutRef = setTimeout(function() {
      self._cleanup(false);
      self.emit("finish");
    }, InfoReceiver.timeout);
    this.xo.once("finish", function(info, rtt) {
      self._cleanup(true);
      self.emit("finish", info, rtt);
    });
  };
  InfoReceiver.prototype._cleanup = function(wasClean) {
    clearTimeout(this.timeoutRef);
    this.timeoutRef = null;
    if (!wasClean && this.xo) {
      this.xo.close();
    }
    this.xo = null;
  };
  InfoReceiver.prototype.close = function() {
    this.removeAllListeners();
    this._cleanup(false);
  };
  InfoReceiver.timeout = 8e3;
  infoReceiver = InfoReceiver;
  return infoReceiver;
}
var facade;
var hasRequiredFacade;
function requireFacade() {
  if (hasRequiredFacade) return facade;
  hasRequiredFacade = 1;
  var iframeUtils = requireIframe$1();
  function FacadeJS(transport2) {
    this._transport = transport2;
    transport2.on("message", this._transportMessage.bind(this));
    transport2.on("close", this._transportClose.bind(this));
  }
  FacadeJS.prototype._transportClose = function(code, reason) {
    iframeUtils.postMessage("c", JSON.stringify([code, reason]));
  };
  FacadeJS.prototype._transportMessage = function(frame) {
    iframeUtils.postMessage("t", frame);
  };
  FacadeJS.prototype._send = function(data) {
    this._transport.send(data);
  };
  FacadeJS.prototype._close = function() {
    this._transport.close();
    this._transport.removeAllListeners();
  };
  facade = FacadeJS;
  return facade;
}
var iframeBootstrap;
var hasRequiredIframeBootstrap;
function requireIframeBootstrap() {
  if (hasRequiredIframeBootstrap) return iframeBootstrap;
  hasRequiredIframeBootstrap = 1;
  var urlUtils = requireUrl(), eventUtils = requireEvent$1(), FacadeJS = requireFacade(), InfoIframeReceiver = requireInfoIframeReceiver(), iframeUtils = requireIframe$1(), loc = requireLocation();
  var debug = function() {
  };
  iframeBootstrap = function(SockJS2, availableTransports) {
    var transportMap = {};
    availableTransports.forEach(function(at) {
      if (at.facadeTransport) {
        transportMap[at.facadeTransport.transportName] = at.facadeTransport;
      }
    });
    transportMap[InfoIframeReceiver.transportName] = InfoIframeReceiver;
    var parentOrigin;
    SockJS2.bootstrap_iframe = function() {
      var facade2;
      iframeUtils.currentWindowId = loc.hash.slice(1);
      var onMessage = function(e) {
        if (e.source !== parent) {
          return;
        }
        if (typeof parentOrigin === "undefined") {
          parentOrigin = e.origin;
        }
        if (e.origin !== parentOrigin) {
          return;
        }
        var iframeMessage;
        try {
          iframeMessage = JSON.parse(e.data);
        } catch (ignored) {
          debug("bad json", e.data);
          return;
        }
        if (iframeMessage.windowId !== iframeUtils.currentWindowId) {
          return;
        }
        switch (iframeMessage.type) {
          case "s":
            var p;
            try {
              p = JSON.parse(iframeMessage.data);
            } catch (ignored) {
              debug("bad json", iframeMessage.data);
              break;
            }
            var version2 = p[0];
            var transport2 = p[1];
            var transUrl = p[2];
            var baseUrl = p[3];
            if (version2 !== SockJS2.version) {
              throw new Error('Incompatible SockJS! Main site uses: "' + version2 + '", the iframe: "' + SockJS2.version + '".');
            }
            if (!urlUtils.isOriginEqual(transUrl, loc.href) || !urlUtils.isOriginEqual(baseUrl, loc.href)) {
              throw new Error("Can't connect to different domain from within an iframe. (" + loc.href + ", " + transUrl + ", " + baseUrl + ")");
            }
            facade2 = new FacadeJS(new transportMap[transport2](transUrl, baseUrl));
            break;
          case "m":
            facade2._send(iframeMessage.data);
            break;
          case "c":
            if (facade2) {
              facade2._close();
            }
            facade2 = null;
            break;
        }
      };
      eventUtils.attachEvent("message", onMessage);
      iframeUtils.postMessage("s");
    };
  };
  return iframeBootstrap;
}
var main;
var hasRequiredMain;
function requireMain() {
  if (hasRequiredMain) return main;
  hasRequiredMain = 1;
  requireShims();
  var URL = requireUrlParse(), inherits = requireInherits(), random2 = requireRandom(), escape = require_escape(), urlUtils = requireUrl(), eventUtils = requireEvent$1(), transport2 = requireTransport(), objectUtils = requireObject(), browser2 = requireBrowser(), log2 = requireLog(), Event = requireEvent(), EventTarget = requireEventtarget(), loc = requireLocation(), CloseEvent = requireClose(), TransportMessageEvent = requireTransMessage(), InfoReceiver = requireInfoReceiver();
  var debug = function() {
  };
  var transports;
  function SockJS2(url2, protocols, options) {
    if (!(this instanceof SockJS2)) {
      return new SockJS2(url2, protocols, options);
    }
    if (arguments.length < 1) {
      throw new TypeError("Failed to construct 'SockJS: 1 argument required, but only 0 present");
    }
    EventTarget.call(this);
    this.readyState = SockJS2.CONNECTING;
    this.extensions = "";
    this.protocol = "";
    options = options || {};
    if (options.protocols_whitelist) {
      log2.warn("'protocols_whitelist' is DEPRECATED. Use 'transports' instead.");
    }
    this._transportsWhitelist = options.transports;
    this._transportOptions = options.transportOptions || {};
    this._timeout = options.timeout || 0;
    var sessionId = options.sessionId || 8;
    if (typeof sessionId === "function") {
      this._generateSessionId = sessionId;
    } else if (typeof sessionId === "number") {
      this._generateSessionId = function() {
        return random2.string(sessionId);
      };
    } else {
      throw new TypeError("If sessionId is used in the options, it needs to be a number or a function.");
    }
    this._server = options.server || random2.numberString(1e3);
    var parsedUrl = new URL(url2);
    if (!parsedUrl.host || !parsedUrl.protocol) {
      throw new SyntaxError("The URL '" + url2 + "' is invalid");
    } else if (parsedUrl.hash) {
      throw new SyntaxError("The URL must not contain a fragment");
    } else if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
      throw new SyntaxError("The URL's scheme must be either 'http:' or 'https:'. '" + parsedUrl.protocol + "' is not allowed.");
    }
    var secure = parsedUrl.protocol === "https:";
    if (loc.protocol === "https:" && !secure) {
      if (!urlUtils.isLoopbackAddr(parsedUrl.hostname)) {
        throw new Error("SecurityError: An insecure SockJS connection may not be initiated from a page loaded over HTTPS");
      }
    }
    if (!protocols) {
      protocols = [];
    } else if (!Array.isArray(protocols)) {
      protocols = [protocols];
    }
    var sortedProtocols = protocols.sort();
    sortedProtocols.forEach(function(proto, i) {
      if (!proto) {
        throw new SyntaxError("The protocols entry '" + proto + "' is invalid.");
      }
      if (i < sortedProtocols.length - 1 && proto === sortedProtocols[i + 1]) {
        throw new SyntaxError("The protocols entry '" + proto + "' is duplicated.");
      }
    });
    var o = urlUtils.getOrigin(loc.href);
    this._origin = o ? o.toLowerCase() : null;
    parsedUrl.set("pathname", parsedUrl.pathname.replace(/\/+$/, ""));
    this.url = parsedUrl.href;
    debug("using url", this.url);
    this._urlInfo = {
      nullOrigin: !browser2.hasDomain(),
      sameOrigin: urlUtils.isOriginEqual(this.url, loc.href),
      sameScheme: urlUtils.isSchemeEqual(this.url, loc.href)
    };
    this._ir = new InfoReceiver(this.url, this._urlInfo);
    this._ir.once("finish", this._receiveInfo.bind(this));
  }
  inherits(SockJS2, EventTarget);
  function userSetCode(code) {
    return code === 1e3 || code >= 3e3 && code <= 4999;
  }
  SockJS2.prototype.close = function(code, reason) {
    if (code && !userSetCode(code)) {
      throw new Error("InvalidAccessError: Invalid code");
    }
    if (reason && reason.length > 123) {
      throw new SyntaxError("reason argument has an invalid length");
    }
    if (this.readyState === SockJS2.CLOSING || this.readyState === SockJS2.CLOSED) {
      return;
    }
    var wasClean = true;
    this._close(code || 1e3, reason || "Normal closure", wasClean);
  };
  SockJS2.prototype.send = function(data) {
    if (typeof data !== "string") {
      data = "" + data;
    }
    if (this.readyState === SockJS2.CONNECTING) {
      throw new Error("InvalidStateError: The connection has not been established yet");
    }
    if (this.readyState !== SockJS2.OPEN) {
      return;
    }
    this._transport.send(escape.quote(data));
  };
  SockJS2.version = requireVersion();
  SockJS2.CONNECTING = 0;
  SockJS2.OPEN = 1;
  SockJS2.CLOSING = 2;
  SockJS2.CLOSED = 3;
  SockJS2.prototype._receiveInfo = function(info, rtt) {
    this._ir = null;
    if (!info) {
      this._close(1002, "Cannot connect to server");
      return;
    }
    this._rto = this.countRTO(rtt);
    this._transUrl = info.base_url ? info.base_url : this.url;
    info = objectUtils.extend(info, this._urlInfo);
    var enabledTransports = transports.filterToEnabled(this._transportsWhitelist, info);
    this._transports = enabledTransports.main;
    debug(this._transports.length + " enabled transports");
    this._connect();
  };
  SockJS2.prototype._connect = function() {
    for (var Transport = this._transports.shift(); Transport; Transport = this._transports.shift()) {
      debug("attempt", Transport.transportName);
      if (Transport.needBody) {
        if (!globalThis.document.body || typeof globalThis.document.readyState !== "undefined" && globalThis.document.readyState !== "complete" && globalThis.document.readyState !== "interactive") {
          this._transports.unshift(Transport);
          eventUtils.attachEvent("load", this._connect.bind(this));
          return;
        }
      }
      var timeoutMs = Math.max(this._timeout, this._rto * Transport.roundTrips || 5e3);
      this._transportTimeoutId = setTimeout(this._transportTimeout.bind(this), timeoutMs);
      var transportUrl = urlUtils.addPath(this._transUrl, "/" + this._server + "/" + this._generateSessionId());
      var options = this._transportOptions[Transport.transportName];
      var transportObj = new Transport(transportUrl, this._transUrl, options);
      transportObj.on("message", this._transportMessage.bind(this));
      transportObj.once("close", this._transportClose.bind(this));
      transportObj.transportName = Transport.transportName;
      this._transport = transportObj;
      return;
    }
    this._close(2e3, "All transports failed", false);
  };
  SockJS2.prototype._transportTimeout = function() {
    if (this.readyState === SockJS2.CONNECTING) {
      if (this._transport) {
        this._transport.close();
      }
      this._transportClose(2007, "Transport timed out");
    }
  };
  SockJS2.prototype._transportMessage = function(msg) {
    var self = this, type = msg.slice(0, 1), content = msg.slice(1), payload;
    switch (type) {
      case "o":
        this._open();
        return;
      case "h":
        this.dispatchEvent(new Event("heartbeat"));
        debug("heartbeat", this.transport);
        return;
    }
    if (content) {
      try {
        payload = JSON.parse(content);
      } catch (e) {
      }
    }
    if (typeof payload === "undefined") {
      return;
    }
    switch (type) {
      case "a":
        if (Array.isArray(payload)) {
          payload.forEach(function(p) {
            debug("message", self.transport);
            self.dispatchEvent(new TransportMessageEvent(p));
          });
        }
        break;
      case "m":
        debug("message", this.transport);
        this.dispatchEvent(new TransportMessageEvent(payload));
        break;
      case "c":
        if (Array.isArray(payload) && payload.length === 2) {
          this._close(payload[0], payload[1], true);
        }
        break;
    }
  };
  SockJS2.prototype._transportClose = function(code, reason) {
    debug("_transportClose", this.transport);
    if (this._transport) {
      this._transport.removeAllListeners();
      this._transport = null;
      this.transport = null;
    }
    if (!userSetCode(code) && code !== 2e3 && this.readyState === SockJS2.CONNECTING) {
      this._connect();
      return;
    }
    this._close(code, reason);
  };
  SockJS2.prototype._open = function() {
    debug("_open", this._transport && this._transport.transportName, this.readyState);
    if (this.readyState === SockJS2.CONNECTING) {
      if (this._transportTimeoutId) {
        clearTimeout(this._transportTimeoutId);
        this._transportTimeoutId = null;
      }
      this.readyState = SockJS2.OPEN;
      this.transport = this._transport.transportName;
      this.dispatchEvent(new Event("open"));
      debug("connected", this.transport);
    } else {
      this._close(1006, "Server lost session");
    }
  };
  SockJS2.prototype._close = function(code, reason, wasClean) {
    debug("_close", this.transport, code, reason, wasClean, this.readyState);
    var forceFail = false;
    if (this._ir) {
      forceFail = true;
      this._ir.close();
      this._ir = null;
    }
    if (this._transport) {
      this._transport.close();
      this._transport = null;
      this.transport = null;
    }
    if (this.readyState === SockJS2.CLOSED) {
      throw new Error("InvalidStateError: SockJS has already been closed");
    }
    this.readyState = SockJS2.CLOSING;
    setTimeout((function() {
      this.readyState = SockJS2.CLOSED;
      if (forceFail) {
        this.dispatchEvent(new Event("error"));
      }
      var e = new CloseEvent("close");
      e.wasClean = wasClean || false;
      e.code = code || 1e3;
      e.reason = reason;
      this.dispatchEvent(e);
      this.onmessage = this.onclose = this.onerror = null;
    }).bind(this), 0);
  };
  SockJS2.prototype.countRTO = function(rtt) {
    if (rtt > 100) {
      return 4 * rtt;
    }
    return 300 + rtt;
  };
  main = function(availableTransports) {
    transports = transport2(availableTransports);
    requireIframeBootstrap()(SockJS2, availableTransports);
    return SockJS2;
  };
  return main;
}
var entry;
var hasRequiredEntry;
function requireEntry() {
  if (hasRequiredEntry) return entry;
  hasRequiredEntry = 1;
  var transportList2 = requireTransportList();
  entry = requireMain()(transportList2);
  if ("_sockjs_onload" in globalThis) {
    setTimeout(globalThis._sockjs_onload, 1);
  }
  return entry;
}
var entryExports = requireEntry();
const SockJS = /* @__PURE__ */ getDefaultExportFromCjs(entryExports);
export {
  SockJS as S
};
