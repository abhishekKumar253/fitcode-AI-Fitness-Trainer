"use client";
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var button_1 = require("@/components/ui/button");
var card_1 = require("@/components/ui/card");
var vapi_1 = require("@/lib/vapi");
var nextjs_1 = require("@clerk/nextjs");
var navigation_1 = require("next/navigation");
var react_1 = require("react");
var GenerateProgramPage = function () {
    var _a = react_1.useState(false), callActive = _a[0], setCallActive = _a[1];
    var _b = react_1.useState(false), connecting = _b[0], setConnecting = _b[1];
    var _c = react_1.useState(false), isSpeaking = _c[0], setIsSpeaking = _c[1];
    var _d = react_1.useState([]), messages = _d[0], setMessages = _d[1];
    var _e = react_1.useState(false), callEnded = _e[0], setCallEnded = _e[1];
    var user = nextjs_1.useUser().user;
    var router = navigation_1.useRouter();
    var messageContainerRef = react_1.useRef(null);
    react_1.useEffect(function () {
        var originalError = console.error;
        console.error = function (msg) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (msg &&
                (msg.includes("Meeting has ended") ||
                    (args[0] && args[0].toString().includes("Meeting has ended")))) {
                console.log("Ignoring known error: Meeting has ended");
                return; // don't pass to original handler
            }
            // pass all other errors to the original handler
            return originalError.call.apply(originalError, __spreadArrays([console, msg], args));
        };
        // restore original handler on unmount
        return function () {
            console.error = originalError;
        };
    }, []);
    // auto-scroll messages
    react_1.useEffect(function () {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    }, [messages]);
    // navigate user to profile page after the call ends
    react_1.useEffect(function () {
        if (callEnded) {
            var redirectTimer_1 = setTimeout(function () {
                router.push("/profile");
            }, 1500);
            return function () { return clearTimeout(redirectTimer_1); };
        }
    }, [callEnded, router]);
    // setup event listeners for vapi
    react_1.useEffect(function () {
        var handleCallStart = function () {
            console.log("Call started");
            setConnecting(false);
            setCallActive(true);
            setCallEnded(false);
        };
        var handleCallEnd = function () {
            console.log("Call ended");
            setCallActive(false);
            setConnecting(false);
            setIsSpeaking(false);
            setCallEnded(true);
        };
        var handleSpeechStart = function () {
            console.log("AI started Speaking");
            setIsSpeaking(true);
        };
        var handleSpeechEnd = function () {
            console.log("AI stopped Speaking");
            setIsSpeaking(false);
        };
        var handleMessage = function (message) {
            if (message.type === "transcript" && message.transcriptType === "final") {
                var newMessage_1 = { content: message.transcript, role: message.role };
                setMessages(function (prev) { return __spreadArrays(prev, [newMessage_1]); });
            }
        };
        var handleError = function (error) {
            console.log("Vapi Error", error);
            setConnecting(false);
            setCallActive(false);
        };
        vapi_1.vapi
            .on("call-start", handleCallStart)
            .on("call-end", handleCallEnd)
            .on("speech-start", handleSpeechStart)
            .on("speech-end", handleSpeechEnd)
            .on("message", handleMessage)
            .on("error", handleError);
        // cleanup event listeners on unmount
        return function () {
            vapi_1.vapi
                .off("call-start", handleCallStart)
                .off("call-end", handleCallEnd)
                .off("speech-start", handleSpeechStart)
                .off("speech-end", handleSpeechEnd)
                .off("message", handleMessage)
                .off("error", handleError);
        };
    }, []);
    var toggleCall = function () { return __awaiter(void 0, void 0, void 0, function () {
        var fullName, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!callActive) return [3 /*break*/, 1];
                    vapi_1.vapi.stop();
                    return [3 /*break*/, 4];
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    setConnecting(true);
                    setMessages([]);
                    setCallEnded(false);
                    fullName = (user === null || user === void 0 ? void 0 : user.firstName) ? (user.firstName + " " + (user.lastName || "")).trim()
                        : "There";
                    return [4 /*yield*/, vapi_1.vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID, {
                            variableValues: {
                                full_name: fullName,
                                user_id: user === null || user === void 0 ? void 0 : user.id
                            }
                        })];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.log("Failed to start call", error_1);
                    setConnecting(false);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement("div", { className: "flex flex-col min-h-screen text-foreground overflow-hidden  pb-6 pt-24" },
        React.createElement("div", { className: "container mx-auto px-4 h-full max-w-5xl" },
            React.createElement("div", { className: "text-center mb-8" },
                React.createElement("h1", { className: "text-3xl font-bold font-mono" },
                    React.createElement("span", null, "Generate Your "),
                    React.createElement("span", { className: "text-primary uppercase" }, "Fitness Program")),
                React.createElement("p", { className: "text-muted-foreground mt-2" }, "Have a voice conversation with our AI assistant to create your personalized plan")),
            React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-8" },
                React.createElement(card_1.Card, { className: "bg-card/90 backdrop-blur-sm border border-border overflow-hidden relative" },
                    React.createElement("div", { className: "aspect-video flex flex-col items-center justify-center p-6 relative" },
                        React.createElement("div", { className: "absolute inset-0 " + (isSpeaking ? "opacity-30" : "opacity-0") + " transition-opacity duration-300" },
                            React.createElement("div", { className: "absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-center items-center h-20" }, __spreadArrays(Array(5)).map(function (_, i) { return (React.createElement("div", { key: i, className: "mx-1 h-16 w-1 bg-primary rounded-full " + (isSpeaking ? "animate-sound-wave" : ""), style: {
                                    animationDelay: i * 0.1 + "s",
                                    height: isSpeaking ? Math.random() * 50 + 20 + "%" : "5%"
                                } })); }))),
                        React.createElement("div", { className: "relative size-32 mb-4" },
                            React.createElement("div", { className: "absolute inset-0 bg-primary opacity-10 rounded-full blur-lg " + (isSpeaking ? "animate-pulse" : "") }),
                            React.createElement("div", { className: "relative w-full h-full rounded-full bg-card flex items-center justify-center border border-border overflow-hidden" },
                                React.createElement("div", { className: "absolute inset-0 bg-gradient-to-b from-primary/10 to-secondary/10" }),
                                React.createElement("img", { src: "/ai-avatar.png", alt: "AI Assistant", className: "w-full h-full object-cover" }))),
                        React.createElement("h2", { className: "text-xl font-bold text-foreground" }, "CodeFlex AI"),
                        React.createElement("p", { className: "text-sm text-muted-foreground mt-1" }, "Fitness & Diet Coach"),
                        React.createElement("div", { className: "mt-4 flex items-center gap-2 px-3 py-1 rounded-full bg-card border border-border " + (isSpeaking ? "border-primary" : "") },
                            React.createElement("div", { className: "w-2 h-2 rounded-full " + (isSpeaking ? "bg-primary animate-pulse" : "bg-muted") }),
                            React.createElement("span", { className: "text-xs text-muted-foreground" }, isSpeaking
                                ? "Speaking..."
                                : callActive
                                    ? "Listening..."
                                    : callEnded
                                        ? "Redirecting to profile..."
                                        : "Waiting...")))),
                React.createElement(card_1.Card, { className: "bg-card/90 backdrop-blur-sm border overflow-hidden relative" },
                    React.createElement("div", { className: "aspect-video flex flex-col items-center justify-center p-6 relative" },
                        React.createElement("div", { className: "relative size-32 mb-4" },
                            React.createElement("img", { src: user === null || user === void 0 ? void 0 : user.imageUrl, alt: "User", 
                                // ADD THIS "size-full" class to make it rounded on all images
                                className: "size-full object-cover rounded-full" })),
                        React.createElement("h2", { className: "text-xl font-bold text-foreground" }, "You"),
                        React.createElement("p", { className: "text-sm text-muted-foreground mt-1" }, user ? (user.firstName + " " + (user.lastName || "")).trim() : "Guest"),
                        React.createElement("div", { className: "mt-4 flex items-center gap-2 px-3 py-1 rounded-full bg-card border" },
                            React.createElement("div", { className: "w-2 h-2 rounded-full bg-muted" }),
                            React.createElement("span", { className: "text-xs text-muted-foreground" }, "Ready"))))),
            messages.length > 0 && (React.createElement("div", { ref: messageContainerRef, className: "w-full bg-card/90 backdrop-blur-sm border border-border rounded-xl p-4 mb-8 h-64 overflow-y-auto transition-all duration-300 scroll-smooth" },
                React.createElement("div", { className: "space-y-3" },
                    messages.map(function (msg, index) { return (React.createElement("div", { key: index, className: "message-item animate-fadeIn" },
                        React.createElement("div", { className: "font-semibold text-xs text-muted-foreground mb-1" },
                            msg.role === "assistant" ? "CodeFlex AI" : "You",
                            ":"),
                        React.createElement("p", { className: "text-foreground" }, msg.content))); }),
                    callEnded && (React.createElement("div", { className: "message-item animate-fadeIn" },
                        React.createElement("div", { className: "font-semibold text-xs text-primary mb-1" }, "System:"),
                        React.createElement("p", { className: "text-foreground" }, "Your fitness program has been created! Redirecting to your profile...")))))),
            React.createElement("div", { className: "w-full flex justify-center gap-4" },
                React.createElement(button_1.Button, { className: "w-40 text-xl rounded-3xl " + (callActive
                        ? "bg-destructive hover:bg-destructive/90"
                        : callEnded
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-primary hover:bg-primary/90") + " text-white relative", onClick: toggleCall, disabled: connecting || callEnded },
                    connecting && (React.createElement("span", { className: "absolute inset-0 rounded-full animate-ping bg-primary/50 opacity-75" })),
                    React.createElement("span", null, callActive
                        ? "End Call"
                        : connecting
                            ? "Connecting..."
                            : callEnded
                                ? "View Profile"
                                : "Start Call"))))));
};
exports["default"] = GenerateProgramPage;
