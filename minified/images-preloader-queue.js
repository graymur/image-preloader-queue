!function(n,t){"function"==typeof define&&define.amd?define([],t):n.imagePreloaderQueue=t()}(this,function(){"use strict";return function(){function n(){var n,e=t(arguments);for(n=0;n<e.length;n++){if("string"!=typeof e[n])throw new Error("ImagePreloaderQueue only accepts strings");A.push(e[n])}}function t(n){var t,e=[];for(t=0;t<n.length;t++)"[object Array]"===Object.prototype.toString.call(n[t])?e=e.concat(n[t]):e.push(n[t]);return e}function e(){if(w&&!o())u(v);else{if(0===L.length&&0===A.length&&!v)throw new Error("You must add images to queue");0===A.length?m(S):o()||(v=A.splice(0,1)[0],u(v))}}function o(){return q}function u(n){q=!0,m(P,[n]),w=new Image,w.onload=function(){r(n)},w.onerror=function(){i(n,arguments[0])},w.src=n}function r(n){m(b,[n]),m(j,[n]),L.push(n),f(),e()}function i(n){m(E,[n]),m(j,[n]),Q.push(n),f(),e()}function f(){w=null,v=null,q=!1}function c(){q=!1,w&&(w.src="")}function s(n){c(),setTimeout(e,n)}function a(n){E.push(n)}function l(n){P.push(n)}function g(n){b.push(n)}function h(n){j.push(n)}function p(n){S.push(n)}function d(){var n=L.length+Q.length;return n/(n+A.length)}function m(n,t){for(var e=0;e<n.length;e++)"function"==typeof n[e]&&n[e].apply(null,t)}function y(){return L}function I(){return A}var v,w,L=[],Q=[],A=[],E=[],P=[],b=[],j=[],S=[],q=!1;return{add:n,start:e,pause:c,pauseFor:s,onAfterItem:h,onItemError:a,onBeforeItemLoad:l,onAfterItemLoad:g,onQueueLoad:p,getProgress:d,getLoaded:y,getQueue:I,isStarted:o}}});