function d(e,a){for(var s=0;s<a.length;s++){const t=a[s];if(typeof t!="string"&&!Array.isArray(t)){for(const r in t)if(r!=="default"&&!(r in e)){const n=Object.getOwnPropertyDescriptor(t,r);n&&Object.defineProperty(e,r,n.get?n:{enumerable:!0,get:()=>t[r]})}}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}var i,o;function l(){if(o)return i;o=1,i=e,e.displayName="sas",e.aliases=[];function e(a){a.languages.sas={datalines:{pattern:/^\s*(?:(?:data)?lines|cards);[\s\S]+?(?:\r?\n|\r);/im,alias:"string",inside:{keyword:{pattern:/^(\s*)(?:(?:data)?lines|cards)/i,lookbehind:!0},punctuation:/;/}},comment:[{pattern:/(^\s*|;\s*)\*.*;/m,lookbehind:!0},/\/\*[\s\S]+?\*\//],datetime:{pattern:/'[^']+'(?:dt?|t)\b/i,alias:"number"},string:{pattern:/(["'])(?:\1\1|(?!\1)[\s\S])*\1/,greedy:!0},keyword:/\b(?:data|else|format|if|input|proc\s\w+|quit|run|then|libname|set|output|options)\b/i,number:/\b(?:[\da-f]+x|\d+(?:\.\d+)?(?:e[+-]?\d+)?)/i,operator:/\*\*?|\|\|?|!!?|¦¦?|<[>=]?|>[<=]?|[-+\/=&]|[~¬^]=?|\b(?:eq|ne|gt|lt|ge|le|in|not)\b/i,punctuation:/[$%@.(){}\[\];,\\]/}}return i}var u=l();const p=d({__proto__:null,default:u},[u]);export{p as s};
