function c(e,n){for(var i=0;i<n.length;i++){const t=n[i];if(typeof t!="string"&&!Array.isArray(t)){for(const r in t)if(r!=="default"&&!(r in e)){const a=Object.getOwnPropertyDescriptor(t,r);a&&Object.defineProperty(e,r,a.get?a:{enumerable:!0,get:()=>t[r]})}}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}var o,s;function f(){if(s)return o;s=1,o=e,e.displayName="ini",e.aliases=[];function e(n){n.languages.ini={comment:/^[ \t]*[;#].*$/m,selector:/^[ \t]*\[.*?\]/m,constant:/^[ \t]*[^\s=]+?(?=[ \t]*=)/m,"attr-value":{pattern:/=.*/,inside:{punctuation:/^[=]/}}}}return o}var u=f();const l=c({__proto__:null,default:u},[u]);export{l as i};
