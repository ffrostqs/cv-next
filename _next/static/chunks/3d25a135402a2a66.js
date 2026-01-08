(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,88143,(e,t,i)=>{"use strict";function r({widthInt:e,heightInt:t,blurWidth:i,blurHeight:r,blurDataURL:a,objectFit:l}){let s=i?40*i:e,n=r?40*r:t,o=s&&n?`viewBox='0 0 ${s} ${n}'`:"";return`%3Csvg xmlns='http://www.w3.org/2000/svg' ${o}%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='${o?"none":"contain"===l?"xMidYMid":"cover"===l?"xMidYMid slice":"none"}' style='filter: url(%23b);' href='${a}'/%3E%3C/svg%3E`}Object.defineProperty(i,"__esModule",{value:!0}),Object.defineProperty(i,"getImageBlurSvg",{enumerable:!0,get:function(){return r}})},87690,(e,t,i)=>{"use strict";Object.defineProperty(i,"__esModule",{value:!0});var r={VALID_LOADERS:function(){return l},imageConfigDefault:function(){return s}};for(var a in r)Object.defineProperty(i,a,{enumerable:!0,get:r[a]});let l=["default","imgix","cloudinary","akamai","custom"],s={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],path:"/_next/image",loader:"default",loaderFile:"",domains:[],disableStaticImages:!1,minimumCacheTTL:14400,formats:["image/webp"],maximumRedirects:3,dangerouslyAllowLocalIP:!1,dangerouslyAllowSVG:!1,contentSecurityPolicy:"script-src 'none'; frame-src 'none'; sandbox;",contentDispositionType:"attachment",localPatterns:void 0,remotePatterns:[],qualities:[75],unoptimized:!1}},8927,(e,t,i)=>{"use strict";Object.defineProperty(i,"__esModule",{value:!0}),Object.defineProperty(i,"getImgProps",{enumerable:!0,get:function(){return o}}),e.r(33525);let r=e.r(88143),a=e.r(87690),l=["-moz-initial","fill","none","scale-down",void 0];function s(e){return void 0!==e.default}function n(e){return void 0===e?e:"number"==typeof e?Number.isFinite(e)?e:NaN:"string"==typeof e&&/^[0-9]+$/.test(e)?parseInt(e,10):NaN}function o({src:e,sizes:t,unoptimized:i=!1,priority:o=!1,preload:c=!1,loading:d,className:u,quality:m,width:p,height:f,fill:x=!1,style:h,overrideSrc:g,onLoad:v,onLoadingComplete:b,placeholder:j="empty",blurDataURL:y,fetchPriority:w,decoding:N="async",layout:k,objectFit:_,objectPosition:S,lazyBoundary:I,lazyRoot:C,...P},O){var E;let z,R,A,{imgConf:M,showAltText:L,blurComplete:$,defaultLoader:B}=O,U=M||a.imageConfigDefault;if("allSizes"in U)z=U;else{let e=[...U.deviceSizes,...U.imageSizes].sort((e,t)=>e-t),t=U.deviceSizes.sort((e,t)=>e-t),i=U.qualities?.sort((e,t)=>e-t);z={...U,allSizes:e,deviceSizes:t,qualities:i}}if(void 0===B)throw Object.defineProperty(Error("images.loaderFile detected but the file is missing default export.\nRead more: https://nextjs.org/docs/messages/invalid-images-config"),"__NEXT_ERROR_CODE",{value:"E163",enumerable:!1,configurable:!0});let T=P.loader||B;delete P.loader,delete P.srcSet;let D="__next_img_default"in T;if(D){if("custom"===z.loader)throw Object.defineProperty(Error(`Image with src "${e}" is missing "loader" prop.
Read more: https://nextjs.org/docs/messages/next-image-missing-loader`),"__NEXT_ERROR_CODE",{value:"E252",enumerable:!1,configurable:!0})}else{let e=T;T=t=>{let{config:i,...r}=t;return e(r)}}if(k){"fill"===k&&(x=!0);let e={intrinsic:{maxWidth:"100%",height:"auto"},responsive:{width:"100%",height:"auto"}}[k];e&&(h={...h,...e});let i={responsive:"100vw",fill:"100vw"}[k];i&&!t&&(t=i)}let V="",W=n(p),q=n(f);if((E=e)&&"object"==typeof E&&(s(E)||void 0!==E.src)){let t=s(e)?e.default:e;if(!t.src)throw Object.defineProperty(Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received ${JSON.stringify(t)}`),"__NEXT_ERROR_CODE",{value:"E460",enumerable:!1,configurable:!0});if(!t.height||!t.width)throw Object.defineProperty(Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received ${JSON.stringify(t)}`),"__NEXT_ERROR_CODE",{value:"E48",enumerable:!1,configurable:!0});if(R=t.blurWidth,A=t.blurHeight,y=y||t.blurDataURL,V=t.src,!x)if(W||q){if(W&&!q){let e=W/t.width;q=Math.round(t.height*e)}else if(!W&&q){let e=q/t.height;W=Math.round(t.width*e)}}else W=t.width,q=t.height}let H=!o&&!c&&("lazy"===d||void 0===d);(!(e="string"==typeof e?e:V)||e.startsWith("data:")||e.startsWith("blob:"))&&(i=!0,H=!1),z.unoptimized&&(i=!0),D&&!z.dangerouslyAllowSVG&&e.split("?",1)[0].endsWith(".svg")&&(i=!0);let F=n(m),G=Object.assign(x?{position:"absolute",height:"100%",width:"100%",left:0,top:0,right:0,bottom:0,objectFit:_,objectPosition:S}:{},L?{}:{color:"transparent"},h),X=$||"empty"===j?null:"blur"===j?`url("data:image/svg+xml;charset=utf-8,${(0,r.getImageBlurSvg)({widthInt:W,heightInt:q,blurWidth:R,blurHeight:A,blurDataURL:y||"",objectFit:G.objectFit})}")`:`url("${j}")`,J=l.includes(G.objectFit)?"fill"===G.objectFit?"100% 100%":"cover":G.objectFit,K=X?{backgroundSize:J,backgroundPosition:G.objectPosition||"50% 50%",backgroundRepeat:"no-repeat",backgroundImage:X}:{},Q=function({config:e,src:t,unoptimized:i,width:r,quality:a,sizes:l,loader:s}){if(i)return{src:t,srcSet:void 0,sizes:void 0};let{widths:n,kind:o}=function({deviceSizes:e,allSizes:t},i,r){if(r){let i=/(^|\s)(1?\d?\d)vw/g,a=[];for(let e;e=i.exec(r);)a.push(parseInt(e[2]));if(a.length){let i=.01*Math.min(...a);return{widths:t.filter(t=>t>=e[0]*i),kind:"w"}}return{widths:t,kind:"w"}}return"number"!=typeof i?{widths:e,kind:"w"}:{widths:[...new Set([i,2*i].map(e=>t.find(t=>t>=e)||t[t.length-1]))],kind:"x"}}(e,r,l),c=n.length-1;return{sizes:l||"w"!==o?l:"100vw",srcSet:n.map((i,r)=>`${s({config:e,src:t,quality:a,width:i})} ${"w"===o?i:r+1}${o}`).join(", "),src:s({config:e,src:t,quality:a,width:n[c]})}}({config:z,src:e,unoptimized:i,width:W,quality:F,sizes:t,loader:T}),Y=H?"lazy":d;return{props:{...P,loading:Y,fetchPriority:w,width:W,height:q,decoding:N,className:u,style:{...G,...K},sizes:Q.sizes,srcSet:Q.srcSet,src:g||Q.src},meta:{unoptimized:i,preload:c||o,placeholder:j,fill:x}}}},98879,(e,t,i)=>{"use strict";Object.defineProperty(i,"__esModule",{value:!0}),Object.defineProperty(i,"default",{enumerable:!0,get:function(){return n}});let r=e.r(71645),a="undefined"==typeof window,l=a?()=>{}:r.useLayoutEffect,s=a?()=>{}:r.useEffect;function n(e){let{headManager:t,reduceComponentsToState:i}=e;function n(){if(t&&t.mountedInstances){let e=r.Children.toArray(Array.from(t.mountedInstances).filter(Boolean));t.updateHead(i(e))}}return a&&(t?.mountedInstances?.add(e.children),n()),l(()=>(t?.mountedInstances?.add(e.children),()=>{t?.mountedInstances?.delete(e.children)})),l(()=>(t&&(t._pendingUpdate=n),()=>{t&&(t._pendingUpdate=n)})),s(()=>(t&&t._pendingUpdate&&(t._pendingUpdate(),t._pendingUpdate=null),()=>{t&&t._pendingUpdate&&(t._pendingUpdate(),t._pendingUpdate=null)})),null}},25633,(e,t,i)=>{"use strict";Object.defineProperty(i,"__esModule",{value:!0});var r={default:function(){return x},defaultHead:function(){return u}};for(var a in r)Object.defineProperty(i,a,{enumerable:!0,get:r[a]});let l=e.r(55682),s=e.r(90809),n=e.r(43476),o=s._(e.r(71645)),c=l._(e.r(98879)),d=e.r(42732);function u(){return[(0,n.jsx)("meta",{charSet:"utf-8"},"charset"),(0,n.jsx)("meta",{name:"viewport",content:"width=device-width"},"viewport")]}function m(e,t){return"string"==typeof t||"number"==typeof t?e:t.type===o.default.Fragment?e.concat(o.default.Children.toArray(t.props.children).reduce((e,t)=>"string"==typeof t||"number"==typeof t?e:e.concat(t),[])):e.concat(t)}e.r(33525);let p=["name","httpEquiv","charSet","itemProp"];function f(e){let t,i,r,a;return e.reduce(m,[]).reverse().concat(u().reverse()).filter((t=new Set,i=new Set,r=new Set,a={},e=>{let l=!0,s=!1;if(e.key&&"number"!=typeof e.key&&e.key.indexOf("$")>0){s=!0;let i=e.key.slice(e.key.indexOf("$")+1);t.has(i)?l=!1:t.add(i)}switch(e.type){case"title":case"base":i.has(e.type)?l=!1:i.add(e.type);break;case"meta":for(let t=0,i=p.length;t<i;t++){let i=p[t];if(e.props.hasOwnProperty(i))if("charSet"===i)r.has(i)?l=!1:r.add(i);else{let t=e.props[i],r=a[i]||new Set;("name"!==i||!s)&&r.has(t)?l=!1:(r.add(t),a[i]=r)}}}return l})).reverse().map((e,t)=>{let i=e.key||t;return o.default.cloneElement(e,{key:i})})}let x=function({children:e}){let t=(0,o.useContext)(d.HeadManagerContext);return(0,n.jsx)(c.default,{reduceComponentsToState:f,headManager:t,children:e})};("function"==typeof i.default||"object"==typeof i.default&&null!==i.default)&&void 0===i.default.__esModule&&(Object.defineProperty(i.default,"__esModule",{value:!0}),Object.assign(i.default,i),t.exports=i.default)},18556,(e,t,i)=>{"use strict";Object.defineProperty(i,"__esModule",{value:!0}),Object.defineProperty(i,"ImageConfigContext",{enumerable:!0,get:function(){return l}});let r=e.r(55682)._(e.r(71645)),a=e.r(87690),l=r.default.createContext(a.imageConfigDefault)},65856,(e,t,i)=>{"use strict";Object.defineProperty(i,"__esModule",{value:!0}),Object.defineProperty(i,"RouterContext",{enumerable:!0,get:function(){return r}});let r=e.r(55682)._(e.r(71645)).default.createContext(null)},70965,(e,t,i)=>{"use strict";function r(e,t){let i=e||75;return t?.qualities?.length?t.qualities.reduce((e,t)=>Math.abs(t-i)<Math.abs(e-i)?t:e,0):i}Object.defineProperty(i,"__esModule",{value:!0}),Object.defineProperty(i,"findClosestQuality",{enumerable:!0,get:function(){return r}})},1948,(e,t,i)=>{"use strict";Object.defineProperty(i,"__esModule",{value:!0}),Object.defineProperty(i,"default",{enumerable:!0,get:function(){return l}});let r=e.r(70965);function a({config:e,src:t,width:i,quality:a}){if(t.startsWith("/")&&t.includes("?")&&e.localPatterns?.length===1&&"**"===e.localPatterns[0].pathname&&""===e.localPatterns[0].search)throw Object.defineProperty(Error(`Image with src "${t}" is using a query string which is not configured in images.localPatterns.
Read more: https://nextjs.org/docs/messages/next-image-unconfigured-localpatterns`),"__NEXT_ERROR_CODE",{value:"E871",enumerable:!1,configurable:!0});let l=(0,r.findClosestQuality)(a,e);return`${e.path}?url=${encodeURIComponent(t)}&w=${i}&q=${l}${t.startsWith("/_next/static/media/"),""}`}a.__next_img_default=!0;let l=a},85437,(e,t,i)=>{"use strict";Object.defineProperty(i,"__esModule",{value:!0}),Object.defineProperty(i,"Image",{enumerable:!0,get:function(){return j}});let r=e.r(55682),a=e.r(90809),l=e.r(43476),s=a._(e.r(71645)),n=r._(e.r(74080)),o=r._(e.r(25633)),c=e.r(8927),d=e.r(87690),u=e.r(18556);e.r(33525);let m=e.r(65856),p=r._(e.r(1948)),f=e.r(18581),x={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],qualities:[75],path:"/_next/image/",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!0};function h(e,t,i,r,a,l,s){let n=e?.src;e&&e["data-loaded-src"]!==n&&(e["data-loaded-src"]=n,("decode"in e?e.decode():Promise.resolve()).catch(()=>{}).then(()=>{if(e.parentElement&&e.isConnected){if("empty"!==t&&a(!0),i?.current){let t=new Event("load");Object.defineProperty(t,"target",{writable:!1,value:e});let r=!1,a=!1;i.current({...t,nativeEvent:t,currentTarget:e,target:e,isDefaultPrevented:()=>r,isPropagationStopped:()=>a,persist:()=>{},preventDefault:()=>{r=!0,t.preventDefault()},stopPropagation:()=>{a=!0,t.stopPropagation()}})}r?.current&&r.current(e)}}))}function g(e){return s.use?{fetchPriority:e}:{fetchpriority:e}}"undefined"==typeof window&&(globalThis.__NEXT_IMAGE_IMPORTED=!0);let v=(0,s.forwardRef)(({src:e,srcSet:t,sizes:i,height:r,width:a,decoding:n,className:o,style:c,fetchPriority:d,placeholder:u,loading:m,unoptimized:p,fill:x,onLoadRef:v,onLoadingCompleteRef:b,setBlurComplete:j,setShowAltText:y,sizesInput:w,onLoad:N,onError:k,..._},S)=>{let I=(0,s.useCallback)(e=>{e&&(k&&(e.src=e.src),e.complete&&h(e,u,v,b,j,p,w))},[e,u,v,b,j,k,p,w]),C=(0,f.useMergedRef)(S,I);return(0,l.jsx)("img",{..._,...g(d),loading:m,width:a,height:r,decoding:n,"data-nimg":x?"fill":"1",className:o,style:c,sizes:i,srcSet:t,src:e,ref:C,onLoad:e=>{h(e.currentTarget,u,v,b,j,p,w)},onError:e=>{y(!0),"empty"!==u&&j(!0),k&&k(e)}})});function b({isAppRouter:e,imgAttributes:t}){let i={as:"image",imageSrcSet:t.srcSet,imageSizes:t.sizes,crossOrigin:t.crossOrigin,referrerPolicy:t.referrerPolicy,...g(t.fetchPriority)};return e&&n.default.preload?(n.default.preload(t.src,i),null):(0,l.jsx)(o.default,{children:(0,l.jsx)("link",{rel:"preload",href:t.srcSet?void 0:t.src,...i},"__nimg-"+t.src+t.srcSet+t.sizes)})}let j=(0,s.forwardRef)((e,t)=>{let i=(0,s.useContext)(m.RouterContext),r=(0,s.useContext)(u.ImageConfigContext),a=(0,s.useMemo)(()=>{let e=x||r||d.imageConfigDefault,t=[...e.deviceSizes,...e.imageSizes].sort((e,t)=>e-t),i=e.deviceSizes.sort((e,t)=>e-t),a=e.qualities?.sort((e,t)=>e-t);return{...e,allSizes:t,deviceSizes:i,qualities:a,localPatterns:"undefined"==typeof window?r?.localPatterns:e.localPatterns}},[r]),{onLoad:n,onLoadingComplete:o}=e,f=(0,s.useRef)(n);(0,s.useEffect)(()=>{f.current=n},[n]);let h=(0,s.useRef)(o);(0,s.useEffect)(()=>{h.current=o},[o]);let[g,j]=(0,s.useState)(!1),[y,w]=(0,s.useState)(!1),{props:N,meta:k}=(0,c.getImgProps)(e,{defaultLoader:p.default,imgConf:a,blurComplete:g,showAltText:y});return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(v,{...N,unoptimized:k.unoptimized,placeholder:k.placeholder,fill:k.fill,onLoadRef:f,onLoadingCompleteRef:h,setBlurComplete:j,setShowAltText:w,sizesInput:e.sizes,ref:t}),k.preload?(0,l.jsx)(b,{isAppRouter:!i,imgAttributes:N}):null]})});("function"==typeof i.default||"object"==typeof i.default&&null!==i.default)&&void 0===i.default.__esModule&&(Object.defineProperty(i.default,"__esModule",{value:!0}),Object.assign(i.default,i),t.exports=i.default)},94909,(e,t,i)=>{"use strict";Object.defineProperty(i,"__esModule",{value:!0});var r={default:function(){return d},getImageProps:function(){return c}};for(var a in r)Object.defineProperty(i,a,{enumerable:!0,get:r[a]});let l=e.r(55682),s=e.r(8927),n=e.r(85437),o=l._(e.r(1948));function c(e){let{props:t}=(0,s.getImgProps)(e,{defaultLoader:o.default,imgConf:{deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],qualities:[75],path:"/_next/image/",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!0}});for(let[e,i]of Object.entries(t))void 0===i&&delete t[e];return{props:t}}let d=n.Image},57688,(e,t,i)=>{t.exports=e.r(94909)},79315,33154,e=>{"use strict";var t=e.i(43476),i=e.i(19204),r=e.i(65124),a=e.i(25913);let l=(0,a.cva)("group inline-flex transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-background",{variants:{variant:{inline:"items-center gap-2 text-[color:var(--text-muted)] hover:text-[color:var(--color-primary)] dark:text-[color:var(--text-muted)] dark:hover:text-[color:var(--color-primary)]",card:"flex-1 flex flex-col items-center text-center rounded-lg p-4 bg-[color:var(--surface-muted)] hover:bg-[color:var(--surface-accent-muted)] text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] dark:bg-[color:var(--surface-muted)] dark:hover:bg-[color:var(--surface-accent-muted)]"}},defaultVariants:{variant:"inline"}}),s=(0,a.cva)("flex items-center justify-center transition-colors",{variants:{variant:{inline:"w-10 h-10 rounded-lg border bg-[color:var(--surface-muted)] border-[color:var(--border-default)] group-hover:border-[color:var(--color-primary)] group-hover:text-[color:var(--color-primary)] dark:bg-[color:var(--surface-muted)] dark:border-[color:var(--border-default)]",card:"mx-auto mb-2 text-[color:var(--text-muted)] group-hover:text-[color:var(--color-primary)]"}},defaultVariants:{variant:"inline"}}),n=(0,a.cva)("",{variants:{variant:{inline:"hidden sm:inline text-[color:var(--text-muted)] group-hover:text-[color:var(--color-primary)]",card:"text-sm font-medium text-[color:var(--text-primary)]"}},defaultVariants:{variant:"inline"}});function o({icon:e,label:a,variant:o="inline",className:c,...d}){return(0,t.jsxs)("a",{...d,className:(0,i.cn)(l({variant:o}),c),"aria-label":a,children:[(0,t.jsx)("div",{className:s({variant:o}),children:(0,t.jsx)(r.AppIcon,{name:e,size:"card"===o?24:18,decorative:!0})}),(0,t.jsx)("span",{className:n({variant:o}),children:a})]})}e.s(["SocialLink",()=>o],33154),e.s([],79315)},28059,62368,67902,74856,98627,2701,e=>{"use strict";let t={once:!0,margin:"-100px"},i="easeOut";function r(e){return e}let a={fadeUp:r({initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:t,transition:{duration:.5,ease:i}}),fadeIn:r({initial:{opacity:0},whileInView:{opacity:1},viewport:t,transition:{duration:.4,ease:i}}),fadeLeft:r({initial:{opacity:0,x:-20},whileInView:{opacity:1,x:0},viewport:t,transition:{duration:.5,ease:i}}),fadeRight:r({initial:{opacity:0,x:20},whileInView:{opacity:1,x:0},viewport:t,transition:{duration:.5,ease:i}}),scaleIn:r({initial:{opacity:0,scale:.95},whileInView:{opacity:1,scale:1},viewport:t,transition:{duration:.45,ease:i}})};function l(e,t={}){let i=a[e];if(!i.transition)return i;let{delay:r=0,order:s,step:n=.08}=t;return{...i,transition:{...i.transition,delay:void 0!==s?s*n:r}}}e.s(["motion",()=>l],62368),e.s([],28059);var s=e.i(43476),n=e.i(19204);let o={default:"py-24",hero:"min-h-screen py-32",muted:"py-24"},c={default:"ui-surface-default ui-surface-radial",hero:"ui-surface-hero",muted:"ui-surface-muted"};var d=e.i(46932);function u({className:e}){return(0,s.jsxs)("div",{"aria-hidden":!0,className:(0,n.cn)("pointer-events-none absolute inset-0 -z-20",e),children:[(0,s.jsx)(d.motion.div,{className:" absolute left-10/12 top-[-20%] h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-gradient-accent blur-3xl ",animate:{y:[-40,0,-40],scale:[1,1.08,1],opacity:[.25,.4,.25]},transition:{duration:16,ease:"easeInOut",repeat:1/0}}),(0,s.jsx)(d.motion.div,{className:" absolute left-1/4 bottom-[-20%] h-[300px] w-[300px] rounded-full bg-gradient-accent blur-3xl ",animate:{y:[30,0,30],scale:[1,1.05,1],opacity:[.18,.3,.18]},transition:{duration:20,ease:"easeInOut",repeat:1/0}})]})}function m({children:e,id:t,variant:i="default",glow:r=!1,className:a,containerClassName:l,...d}){return(0,s.jsxs)("section",{id:t,className:(0,n.cn)("relative flex items-center justify-center",o[i],a),...d,children:[(0,s.jsx)("div",{"aria-hidden":!0,className:(0,n.cn)("absolute inset-0 -z-20",c[i])}),r&&(0,s.jsx)(u,{}),(0,s.jsx)("div",{className:(0,n.cn)("container mx-auto max-w-6xl px-4",l),children:e})]})}e.s(["Section",()=>m],67902);var p=e.i(71645);function f(e){let t=(0,p.useId)(),i=e??`section-${t}`;return{sectionId:e,titleId:`${i}-title`,descriptionId:`${i}-description`}}e.s(["useSectionIds",()=>f],74856),e.s([],98627);var x=e.i(65124);let h=(0,e.i(25913).cva)(`
    inline-flex items-center gap-2
    rounded-full px-4 py-2
    text-sm font-medium
    transition-colors
    mb-6
  `,{variants:{variant:{default:`
          bg-cyan-500/10 text-cyan-600
          dark:text-cyan-400
        `,accent:`
          bg-purple-500/10 text-purple-600
          dark:text-purple-400
        `,muted:"bg-transparent text-[var(--text-muted)]"}},defaultVariants:{variant:"default"}});function g({children:e,icon:t,variant:i="default",className:r}){return(0,s.jsxs)("div",{className:(0,n.cn)(h({variant:i}),r),children:[t&&(0,s.jsx)(x.AppIcon,{name:t,size:16,decorative:!0}),(0,s.jsx)("span",{children:e})]})}e.s(["InfoBadge",()=>g],2701)},54901,e=>{"use strict";var t=e.i(43476),i=e.i(57688),r=e.i(46932);e.i(28059);var a=e.i(62368);e.i(98627);var l=e.i(67902),s=e.i(74856);e.i(21351);var n=e.i(90873),o=e.i(7670),c=e.i(19056);function d(...e){return(0,c.twMerge)((0,o.clsx)(e))}var u=e.i(25913);let m=(0,u.cva)("",{variants:{variant:{horizontal:"flex flex-wrap gap-4 mb-8",vertical:"flex flex-col gap-3 mb-8"}},defaultVariants:{variant:"horizontal"}});function p({children:e,variant:i,className:r}){return(0,t.jsx)("div",{className:d(m({variant:i}),r),children:e})}e.i(79315);var f=e.i(33154);let x=(0,u.cva)("",{variants:{variant:{inline:"flex items-center gap-4 justify-center lg:justify-start",card:"grid grid-cols-1 sm:grid-cols-3 gap-4 "}},defaultVariants:{variant:"inline"}});function h({items:e,variant:i="inline",className:r}){return(0,t.jsx)("div",{className:d(x({variant:i}),r),children:e.map(e=>(0,t.jsx)(f.SocialLink,{href:e.href,icon:e.icon,label:e.label,variant:i,target:"_blank",rel:"noopener noreferrer"},e.label))})}let g=(0,u.cva)("flex items-center gap-3 rounded-2xl border p-4 shadow-xl bg-white dark:bg-slate-800",{variants:{status:{available:"border-slate-200 dark:border-slate-700",busy:"border-yellow-300 dark:border-yellow-600",offline:"border-slate-300 dark:border-slate-600"}},defaultVariants:{status:"available"}}),v=(0,u.cva)("w-3 h-3 rounded-full",{variants:{status:{available:"bg-green-400 animate-pulse",busy:"bg-yellow-400",offline:"bg-slate-400"}}});function b({status:e,title:i,subtitle:r}){return(0,t.jsxs)("div",{className:d(g({status:e})),children:[(0,t.jsx)("span",{className:v({status:e}),"aria-hidden":!0}),(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{className:"text-slate-900 dark:text-white",children:i}),r&&(0,t.jsx)("div",{className:"text-slate-500 dark:text-slate-400",children:r})]})]})}var j=e.i(19204);let y=(0,u.cva)("relative overflow-hidden p-1 rounded-2xl",{variants:{variant:{default:"relative h-full animate-surface-gradient bg-gradient-accent rounded-2xl"}},defaultVariants:{variant:"default"}}),w=(0,u.cva)("relative h-full w-full overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800");function N({children:e,variant:i,className:r}){return(0,t.jsx)("div",{className:(0,j.cn)(y({variant:i}),r),children:(0,t.jsx)("div",{className:w(),children:e})})}var k=e.i(2701);let _=[{href:"https://github.com/ffrostqs",icon:"github",label:"GitHub"},{href:"https://linkedin.com/in/fred-frost/",icon:"linkedin",label:"LinkedIn"},{href:"mailto:slivinskyi@yevhenii.v6.rocks",icon:"mail",label:"Email"}];function S({hero:e}){let{titleId:o,descriptionId:c}=(0,s.useSectionIds)("hero");return(0,t.jsxs)(l.Section,{id:"hero",variant:"hero",containerClassName:"grid grid-cols-1 items-center gap-16 lg:my-4 lg:grid-cols-2","aria-labelledby":o,"aria-describedby":c,"data-testid":"experience-section",children:[(0,t.jsx)(r.motion.div,{...(0,a.motion)("fadeLeft"),children:(0,t.jsxs)("div",{className:"relative mx-auto w-full max-w-sm",children:[(0,t.jsx)(N,{className:"aspect-[3/4]",children:(0,t.jsx)(i.default,{src:"/images/portrait.png",alt:e.name,fill:!0,priority:!0,sizes:"(max-width: 1024px) 100vw, 420px",className:"object-cover object-[50%_20%]"})}),(0,t.jsx)("div",{className:"absolute bottom-6 right-6",children:(0,t.jsx)(b,{status:"available",title:e.badge.available,subtitle:e.badge.remote})})]})}),(0,t.jsx)(r.motion.div,{...(0,a.motion)("fadeRight"),children:(0,t.jsxs)("div",{className:"text-center lg:text-left",children:[(0,t.jsx)(k.InfoBadge,{icon:"location",children:e.location}),(0,t.jsxs)("h1",{className:"ui-hero-title",id:o,children:[(0,t.jsx)("span",{className:"block",children:e.greeting}),(0,t.jsx)("span",{className:"ui-gradient-text animate-surface-gradient",children:e.name})]}),(0,t.jsx)("h2",{className:"ui-hero-subtitle",children:e.title}),(0,t.jsx)("p",{className:"ui-hero-description",id:c,children:e.description}),(0,t.jsxs)(p,{className:"mt-8 justify-center lg:justify-start",children:[(0,t.jsx)(n.Button,{asChild:!0,children:(0,t.jsx)("a",{href:"#contact","aria-label":"Scroll to contact section",children:e.getInTouch})}),(0,t.jsx)(n.Button,{variant:"outline",iconLeft:"download",asChild:!0,children:(0,t.jsx)("a",{href:e.resumeUrl,download:!0,children:e.resume})})]}),(0,t.jsx)(h,{items:_})]})})]})}var I=e.i(11110);function C(){var e;let{tn:i}=(0,I.useLanguage)(),r={greeting:(e=i("hero")).greeting,name:e.name,title:e.title,description:e.description,contact:e.contact,resume:e.resume,resumeUrl:e.resumeUrl,location:e.location,badge:{available:e.available,remote:e.remote},getInTouch:e.getInTouch};return(0,t.jsx)(S,{hero:r})}e.s(["Hero",()=>C],54901)},61464,13345,e=>{"use strict";var t=e.i(43476),i=e.i(46932);e.i(28059);var r=e.i(62368),a=e.i(19204),l=e.i(2701);let s="text-center",n="text-left";function o({icon:e,badge:o,title:c,description:d,titleId:u,descriptionId:m,align:p="center",className:f}){return(0,t.jsxs)(i.motion.div,{...(0,r.motion)("fadeUp"),className:(0,a.cn)("mb-20","left"===p?n:s,f),children:[(0,t.jsx)(l.InfoBadge,{icon:e,children:o}),(0,t.jsx)("h2",{id:u,className:"ui-section-title mb-6",children:c}),d&&(0,t.jsx)("p",{id:m,className:"ui-text-muted max-w-2xl mx-auto",children:d})]})}e.s(["SectionHeader",()=>o],13345),e.s([],61464)},1210,e=>{"use strict";var t=e.i(43476),i=e.i(11110);e.i(98627);var r=e.i(67902),a=e.i(74856);e.i(61464);var l=e.i(13345);let s={section:"",root:"relative",background:{wrapper:"pointer-events-none absolute inset-0 -z-10",glowTop:`
      absolute left-1/2 top-[-10%]
      h-[220px] w-[220px]
      -translate-x-1/2
      rounded-full
      opacity-20
      blur-3xl
      bg-gradient-accent

      md:h-[320px] md:w-[320px]
      md:opacity-30
    `,glowBottom:`
      absolute left-1/4 bottom-[-10%]
      h-[180px] w-[180px]
      rounded-full
      opacity-15
      blur-3xl
      bg-gradient-accent

      md:h-[260px] md:w-[260px]
      md:opacity-20
    `},timeline:{wrapper:"relative mt-16 md:mt-24",line:`
      hidden
      md:block
      absolute left-1/2 top-0
      h-full w-px
      -translate-x-1/2
      bg-[color:var(--border-muted)]
    `,list:"relative flex flex-col gap-12 md:gap-16",item:"relative flex",iconBase:`
      absolute
      left-0
      top-0
      z-10
      flex
      h-10 w-10
      items-center
      justify-center
      rounded-full
      bg-[color:var(--surface-card)]
      shadow-md

      md:left-1/2
      md:h-12 md:w-12
      md:-translate-x-1/2
    `,itemWrapper:`
      relative
      w-full
      pl-14
      md:pl-0
    `},card:{wrapper:`
      ui-surface-card
      relative
      w-full
      max-w-xl
      overflow-hidden
      transition-all
      duration-300

      md:hover:-translate-y-1
      md:hover:shadow-xl
    `,title:`
    flex
    justify-between
      text-lg
      md:text-xl
      font-semibold
      leading-tight
      text-[color:var(--text-primary)]
    `,period:`
      mt-1
      text-xs
      uppercase
      tracking-wide
      text-[color:var(--text-secondary)]
    `,description:`
      mt-4
      md:mt-5
      text-sm
      leading-relaxed
      text-[color:var(--text-secondary)]
    `,list:"mt-4 space-y-3",listItem:`
      relative
      pl-5
      text-sm
      leading-snug
      text-[color:var(--text-secondary)]
    `,bullet:`
      absolute
      left-0
      top-[0.45rem]
      h-1.5
      w-1.5
      rounded-full
      bg-[color:var(--color-primary)]
    `,stack:`
      mt-6
      pt-4
      border-t
      border-[color:var(--border-muted)]
      text-xs
      font-medium
      text-[color:var(--text-secondary)]
    `},timelineAlign:{left:`
      w-full
      text-left

      md:pr-[calc(50%+2rem)]
    `,right:`
      w-full
      text-left

      md:pl-[calc(50%+2rem)]
    `}};var n=e.i(46932),o=e.i(19204),c=e.i(65124);e.i(28059);var d=e.i(62368);function u({item:e,index:i,isLeft:r,techStackLabel:a}){return(0,t.jsxs)(n.motion.li,{...(0,d.motion)("fadeUp",{order:i}),className:s.timeline.item,role:"listitem",children:[(0,t.jsx)("div",{"aria-hidden":!0,className:(0,o.cn)(s.timeline.iconBase),children:(0,t.jsx)(c.AppIcon,{name:e.icon??"experience",size:22,decorative:!0})}),(0,t.jsx)("div",{className:(0,o.cn)(s.timeline.itemWrapper,r?s.timelineAlign.left:s.timelineAlign.right),children:(0,t.jsxs)("div",{className:s.card.wrapper,children:[(0,t.jsxs)("h3",{className:s.card.title,children:[e.role,(0,t.jsx)("span",{children:e.company})]}),(0,t.jsx)("div",{className:s.card.period,children:e.period}),(0,t.jsx)("p",{className:s.card.description,children:e.description}),(0,t.jsx)("ul",{className:s.card.list,children:e.achievements.map((e,i)=>(0,t.jsxs)("li",{className:s.card.listItem,children:[(0,t.jsx)("span",{className:(0,o.cn)(s.card.bullet)}),e]},i))}),(0,t.jsxs)("div",{className:s.card.stack,children:[(0,t.jsx)("strong",{children:a})," ",e.stack.join(", ")]})]})})]})}let m="experience";function p({experience:e}){let{titleId:i,descriptionId:n}=(0,a.useSectionIds)(m);return(0,t.jsx)(r.Section,{id:m,variant:"muted",glow:!0,"aria-labelledby":i,"aria-describedby":n,className:s.section,children:(0,t.jsxs)("div",{className:s.root,children:[(0,t.jsx)(l.SectionHeader,{icon:m,badge:e.subtitle,title:e.title,description:e.description,titleId:i,descriptionId:n}),(0,t.jsxs)("div",{className:s.timeline.wrapper,children:[(0,t.jsx)("div",{"aria-hidden":!0,className:s.timeline.line}),(0,t.jsx)("ul",{className:s.timeline.list,role:"list",children:e.items.map((i,r)=>(0,t.jsx)(u,{item:i,index:r,isLeft:r%2==0,techStackLabel:e.techStack},i.id))})]})]})})}function f(){var e;let{tn:r}=(0,i.useLanguage)(),a={title:(e=r("experience")).title,subtitle:e.subtitle,description:e.description,techStack:e.techStack,items:e.items.map((e,t)=>({id:e.id??`experience-${t}`,role:e.role,company:e.company,period:e.period,description:e.description,achievements:e.achievements,stack:e.stack,icon:e.icon}))};return(0,t.jsx)(p,{experience:a})}e.s(["Experience",()=>f],1210)},14864,e=>{"use strict";var t=e.i(43476);e.i(98627);var i=e.i(67902),r=e.i(74856);e.i(61464);var a=e.i(13345),l=e.i(71645),s=e.i(19204),n=e.i(65124);let o=(0,e.i(25913).cva)("ui-surface-card flex flex-col items-start");function c({icon:e,value:i,label:r,description:a,className:l}){return(0,t.jsxs)("div",{className:(0,s.cn)(o(),l),children:[(0,t.jsx)("div",{className:"mb-3 text-[color:var(--color-primary)]","aria-hidden":!0,children:(0,t.jsx)(n.AppIcon,{name:e,size:22})}),(0,t.jsx)("div",{className:"text-3xl font-semibold text-[color:var(--text-primary)]",children:i}),(0,t.jsx)("div",{className:"mt-1 text-sm font-medium text-[color:var(--text-secondary)]",children:r}),a&&(0,t.jsx)("p",{className:"mt-2 text-sm text-[color:var(--text-secondary)]",children:a})]})}let d={1:"grid-cols-1",2:"grid-cols-2",3:"grid-cols-3",4:"grid-cols-4"},u={1:"md:grid-cols-1",2:"md:grid-cols-2",3:"md:grid-cols-3",4:"md:grid-cols-4"},m={1:"lg:grid-cols-1",2:"lg:grid-cols-2",3:"lg:grid-cols-3",4:"lg:grid-cols-4"};var p=e.i(46932);e.i(28059);var f=e.i(62368);let x={base:1,md:2,lg:3};function h({items:e,columns:i,className:r}){let a={...x,...i};return(0,t.jsx)("ul",{role:"list",className:(0,s.cn)("grid gap-6",d[a.base],u[a.md],m[a.lg],r),children:e.map((e,i)=>(0,l.createElement)(p.motion.li,{...(0,f.motion)("fadeUp",{order:i}),key:i},(0,t.jsx)(c,{...e})))})}let g="ui-surface-card mt-24",v="ui-section-title mb-8",b="grid gap-6 md:grid-cols-3",j="flex flex-col gap-3",y="flex items-center gap-3",w="font-medium",N="ui-text-muted text-sm leading-relaxed";function k({approach:e}){return(0,t.jsxs)("section",{className:g,children:[(0,t.jsx)("h3",{className:v,children:e.title}),(0,t.jsx)("ul",{className:b,children:e.items.map(e=>(0,t.jsxs)("li",{className:j,children:[(0,t.jsxs)("div",{className:y,children:[(0,t.jsx)(n.AppIcon,{name:e.icon,size:16}),(0,t.jsx)("h4",{className:w,children:e.title})]}),(0,t.jsx)("p",{className:N,children:e.description})]},e.title))})]})}let _="about";function S({about:e}){let{titleId:l,descriptionId:s}=(0,r.useSectionIds)(_);return(0,t.jsx)(i.Section,{id:_,variant:"default","aria-labelledby":l,"aria-describedby":s,children:(0,t.jsxs)("div",{className:"relative",children:[(0,t.jsx)(a.SectionHeader,{icon:_,badge:e.subtitle,title:e.title,description:e.description,titleId:l,descriptionId:s}),e.stats&&(0,t.jsx)(h,{items:e.stats,className:"mt-16"}),e.approach&&(0,t.jsx)(k,{approach:e.approach})]})})}var I=e.i(11110);function C({variant:e}){let{tn:i}=(0,I.useLanguage)(),r=i("about")?.[e];if(!r)return null;let a={subtitle:r.subtitle,title:r.title,description:r.description,stats:r.stats?.map(e=>({id:e.id,icon:e.icon,value:e.value,label:e.label})),approach:r.approach?{title:r.approach.title,items:r.approach.items.map(e=>({icon:e.icon,title:e.title,description:e.description}))}:void 0};return(0,t.jsx)(S,{about:a})}e.s(["About",()=>C],14864)},55409,e=>{"use strict";function t(e){return{subtitle:e.subtitle,title:e.title,description:e.description,items:e.items.map((e,t)=>({id:e.id,category:e.category,title:e.title,meta:e.meta,image:e.image,description:e.description,stack:e.stack,links:e.links?.map((e,i)=>({id:`project-${t}-link-${i}`,label:e.label,url:e.url,icon:e.icon}))}))}}e.s(["adaptProjects",()=>t])},98262,e=>{"use strict";var t=e.i(43476),i=e.i(11110),r=e.i(55409),a=e.i(71645),l=e.i(46932);e.i(98627);var s=e.i(67902),n=e.i(74856);e.i(61464);var o=e.i(13345),c=e.i(19204),d=e.i(25913);let u=(0,d.cva)(`
    inline-flex
    max-w-full
    overflow-x-auto
    overscroll-x-contain
    gap-1
    rounded-lg
    border border-white/10
    bg-white/[0.03]
    p-0.5

    sm:gap-2
    sm:p-1

    /* scrollbar hide */
    [-ms-overflow-style:none]
    [scrollbar-width:none]
    [&::-webkit-scrollbar]:hidden
  `),m=(0,d.cva)(`
    relative
    inline-flex
    items-center
    justify-center
    whitespace-nowrap
    rounded-md

    px-2.5
    py-1
    min-h-[32px]
    text-[11px]
    font-medium

    transition-colors

    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-[color:var(--color-primary)]
    focus-visible:ring-offset-2
    focus-visible:ring-offset-background

    sm:px-3
    sm:py-1.5
    sm:text-xs
  `,{variants:{active:{true:`
          bg-white/[0.06]
          text-white
        `,false:`
          text-white/60
          hover:text-white
        `}},defaultVariants:{active:!1}});function p({items:e,value:i,onChange:r,className:a}){return(0,t.jsx)("div",{role:"tablist","aria-orientation":"horizontal",className:(0,c.cn)(u(),a),children:e.map(e=>{let a=e.key===i;return(0,t.jsx)("button",{role:"tab","aria-selected":a,onClick:()=>r(e.key),className:m({active:a}),children:e.label},e.key)})})}e.i(28059);var f=e.i(62368);let x="projects",h={section:"relative",root:"space-y-12",tabsWrapper:"flex justify-center",grid:"grid gap-6 sm:grid-cols-2",card:{wrapper:`
      ui-surface-card
      flex h-full flex-col
      rounded-xl
      p-6
      transition-colors
      hover:border-[color:var(--color-primary)]
    `,header:"flex items-start justify-between gap-4",title:"text-base font-semibold leading-tight",meta:`
      ui-surface-soft
      ui-text-muted
      rounded-md
      px-2 py-0.5
      text-xs
    `,description:`
      ui-text-muted
      mt-3
      text-sm
      leading-relaxed
    `,imageWrapper:`
      ui-surface-soft
      relative
      mt-4
      aspect-video
      overflow-hidden
      rounded-lg
    `,image:"object-cover",stack:"mt-4 flex flex-wrap gap-2",stackItem:`
      ui-surface-soft
      ui-text-muted
      rounded-md
      px-2 py-0.5
      text-xs
    `,links:"mt-6 flex gap-4",link:`
      inline-flex
      items-center
      gap-1.5
      text-xs
      font-medium
      text-[color:var(--color-primary)]
      hover:underline
    `}};var g=e.i(57688),v=e.i(65124);let b="/images/default_projects.png";function j({project:e}){let[i,r]=(0,a.useState)(e.image&&""!==e.image.trim()?e.image:b);return(0,t.jsxs)("article",{className:h.card.wrapper,children:[(0,t.jsxs)("header",{className:h.card.header,children:[(0,t.jsx)("h3",{className:h.card.title,children:e.title}),e.meta&&(0,t.jsx)("span",{className:h.card.meta,children:e.meta})]}),(0,t.jsx)("p",{className:h.card.description,children:e.description}),(0,t.jsx)("div",{className:h.card.imageWrapper,children:(0,t.jsx)(g.default,{src:i,alt:e.title,fill:!0,sizes:"(max-width: 1024px) 100vw, 480px",className:h.card.image,onError:()=>{i!==b&&r(b)}})}),(0,t.jsx)("ul",{className:h.card.stack,"aria-label":"Tech stack",children:e.stack.map(e=>(0,t.jsx)("li",{className:h.card.stackItem,children:e},e))}),e.links&&(0,t.jsx)("footer",{className:h.card.links,children:e.links.map(e=>(0,t.jsxs)("a",{href:e.url,target:"_blank",rel:"noopener noreferrer",className:h.card.link,children:[(0,t.jsx)(v.AppIcon,{name:e.icon,size:14,decorative:!0}),e.label]},e.label))})]})}function y({projects:e}){let{titleId:i,descriptionId:r}=(0,n.useSectionIds)(x),[c,d]=(0,a.useState)("all"),u=(0,a.useMemo)(()=>[{key:"all",label:"All"},...Array.from(new Set(e.items.map(e=>e.category))).map(e=>({key:e,label:e}))],[e.items]),m=(0,a.useMemo)(()=>"all"===c?e.items:e.items.filter(e=>e.category===c),[c,e.items]);return(0,t.jsx)(s.Section,{id:x,variant:"muted",glow:!0,"aria-labelledby":i,"aria-describedby":r,className:h.section,children:(0,t.jsxs)("div",{className:h.root,children:[(0,t.jsx)(o.SectionHeader,{icon:x,badge:e.subtitle,title:e.title,description:e.description,titleId:i,descriptionId:r}),(0,t.jsx)("div",{className:h.tabsWrapper,children:(0,t.jsx)(p,{items:u,value:c,onChange:d})}),(0,t.jsx)("ul",{className:h.grid,role:"list",children:m.map((e,i)=>(0,t.jsx)(l.motion.li,{...(0,f.motion)("fadeUp",{order:i}),role:"listitem",children:(0,t.jsx)(j,{project:e})},e.id))})]})})}function w(){let{tn:e}=(0,i.useLanguage)(),a=(0,r.adaptProjects)(e("projects"));return(0,t.jsx)(y,{projects:a})}e.s(["Projects",()=>w],98262)},48119,e=>{"use strict";var t=e.i(43476),i=e.i(11110);e.i(98627);var r=e.i(67902),a=e.i(74856);e.i(61464);var l=e.i(13345),s=e.i(46932);e.i(28059);var n=e.i(62368),o=e.i(65124),c=e.i(19204);let d=(0,e.i(25913).cva)(`
    inline-flex
    items-center
    gap-1.5
    rounded-full
    px-3
    py-1
    text-xs
    font-medium
    border
    ui-surface-soft
    ui-text-muted
    transition-colors
  `,{variants:{level:{core:`
          ui-text-strong
          border-[color:var(--color-primary)]
        `,advanced:`
          ui-text
        `,familiar:`
          ui-text-muted
        `},interactive:{true:`
          cursor-pointer
          hover:border-[color:var(--color-primary)]
          hover:ui-text-strong
        `},highlighted:{true:`
          border-[color:var(--color-primary)]
        `}},defaultVariants:{level:"core"}});function u({children:e,level:i="core",usedIn:r,highlighted:a,onClick:l,className:s}){let n=!!l;return(0,t.jsxs)("span",{role:n?"button":void 0,tabIndex:n?0:void 0,onClick:l,className:(0,c.cn)(d({level:i,interactive:n,highlighted:a}),s),"aria-label":r?`${e}, used in ${r} projects`:e,children:[e,"number"==typeof r&&(0,t.jsxs)("span",{className:"text-[10px] opacity-70",children:["· ",r]})]})}let m={section:"py-32",grid:"grid gap-8 md:grid-cols-2",card:{wrapper:`
      ui-surface-card
      flex h-full flex-col gap-6
      rounded-xl
    `,header:"flex items-start gap-4",iconBox:`
      flex h-9 w-9 shrink-0 items-center justify-center
      rounded-lg
      ui-surface-soft
      text-[color:var(--color-primary)]
    `,title:"text-base font-semibold",description:"ui-text-muted text-sm",skills:"flex flex-wrap gap-2"}};function p(e){return e.trim().toLowerCase()}function f({category:e,index:i,usage:r}){return(0,t.jsxs)(s.motion.div,{...(0,n.motion)("fadeUp",{order:i}),className:m.card.wrapper,children:[(0,t.jsxs)("div",{className:m.card.header,children:[(0,t.jsx)("div",{className:m.card.iconBox,children:(0,t.jsx)(o.AppIcon,{name:e.icon,size:20})}),(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{className:m.card.title,children:e.title}),e.description&&(0,t.jsx)("p",{className:m.card.description,children:e.description})]})]}),(0,t.jsx)("div",{className:m.card.skills,children:e.skills.map(e=>{let i=r?.[p(e)];return(0,t.jsx)(u,{usedIn:i,children:e},e)})})]})}let x="skills";function h({skills:e}){let{titleId:i,descriptionId:s}=(0,a.useSectionIds)(x);return(0,t.jsxs)(r.Section,{id:x,variant:"default",className:m.section,"aria-labelledby":i,"aria-describedby":s,children:[(0,t.jsx)(l.SectionHeader,{icon:x,badge:e.subtitle,title:e.title,description:e.description,titleId:i,descriptionId:s}),(0,t.jsx)("div",{className:m.grid,children:e.categories.map((i,r)=>(0,t.jsx)(f,{category:i,index:r,usage:e.usage},i.id))})]})}var g=e.i(55409);function v(){var e;let{tn:r}=(0,i.useLanguage)(),a=function(e){let t={};for(let i of e)for(let e of i.stack){let i=p(e);t[i]=(t[i]??0)+1}return t}((0,g.adaptProjects)(r("projects")).items),l={subtitle:(e=r("skills")).subtitle,title:e.title,description:e.description,categories:e.categories.map(e=>({id:e.id,icon:e.icon,title:e.title,description:e.description,skills:e.skills}))};return(0,t.jsx)(h,{skills:{...l,usage:a}})}e.s(["Skills",()=>v],48119)},15076,e=>{"use strict";var t=e.i(43476),i=e.i(11110);e.i(98627);var r=e.i(67902),a=e.i(74856);e.i(61464);var l=e.i(13345),s=e.i(65124);e.i(21351);var n=e.i(90873);let o={wrapper:`
    ui-surface-card
    rounded-xl
    p-6
  `,title:"text-base font-semibold mb-4",list:"space-y-4",item:"flex items-start gap-3",iconBox:`
    ui-surface-soft
    flex h-9 w-9 shrink-0 items-center justify-center
    rounded-lg
    text-[color:var(--color-primary)]
  `,label:"text-sm ui-text-muted",value:"ui-text"},c={wrapper:`
    ui-surface-card
    rounded-xl
    p-6
  `,title:"text-base font-semibold mb-4",grid:"grid grid-cols-6 gap-3"},d={wrapper:`
    ui-surface-card
    rounded-xl
    p-8
    flex flex-col justify-center
  `,header:"flex items-center gap-4 mb-6",iconBox:`
    ui-surface-soft
    flex h-12 w-12 items-center justify-center
    rounded-xl
    text-[color:var(--color-primary)]
  `,title:"text-lg font-semibold",meta:"text-sm ui-text-muted",list:"space-y-2 ui-text mb-8",bullet:"text-[color:var(--color-primary)]"};function u({data:e}){return(0,t.jsxs)("div",{className:d.wrapper,children:[(0,t.jsxs)("div",{className:d.header,children:[(0,t.jsx)("div",{className:d.iconBox,children:(0,t.jsx)(s.AppIcon,{name:"download",size:22,decorative:!0})}),(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{className:d.title,children:e.title}),(0,t.jsx)("p",{className:d.meta,children:e.meta})]})]}),(0,t.jsx)("ul",{className:d.list,children:e.features.map(e=>(0,t.jsxs)("li",{className:"flex gap-2",children:[(0,t.jsx)("span",{className:d.bullet,children:"•"}),(0,t.jsx)("span",{children:e})]},e))}),(0,t.jsx)(n.Button,{asChild:!0,variant:"primary",size:"lg",iconLeft:"download",children:(0,t.jsx)("a",{href:e.fileUrl,download:!0,children:e.downloadLabel})})]})}function m({data:e}){return(0,t.jsxs)("div",{className:o.wrapper,children:[(0,t.jsx)("h3",{className:o.title,children:e.title}),(0,t.jsx)("ul",{className:o.list,children:e.items.map(e=>(0,t.jsxs)("li",{className:o.item,children:[(0,t.jsx)("div",{className:o.iconBox,children:(0,t.jsx)(s.AppIcon,{name:e.icon,size:16,decorative:!0})}),(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:o.label,children:e.label}),(0,t.jsx)("p",{className:o.value,children:e.value})]})]},e.label))})]})}e.i(79315);var p=e.i(33154);function f({data:e}){return(0,t.jsxs)("div",{className:c.wrapper,children:[(0,t.jsx)("h3",{className:c.title,children:e.title}),(0,t.jsx)("ul",{className:c.grid,children:e.items.map(e=>(0,t.jsx)("li",{children:(0,t.jsx)(p.SocialLink,{icon:e.icon,label:e.label,href:e.url,target:"_blank",variant:"card"})},e.url))})]})}function x({resume:e}){let{titleId:i,descriptionId:s}=(0,a.useSectionIds)("resume");return(0,t.jsxs)(r.Section,{id:"resume",variant:"muted",glow:!0,className:"py-32",children:[(0,t.jsx)(l.SectionHeader,{icon:"download",badge:e.subtitle,title:e.title,description:e.description,titleId:i,descriptionId:s}),(0,t.jsxs)("div",{className:"grid gap-8 lg:grid-cols-2",children:[(0,t.jsx)(u,{data:e.resume}),(0,t.jsxs)("div",{className:"grid gap-8",children:[(0,t.jsx)(m,{data:e.contact}),(0,t.jsx)(f,{data:e.socials})]})]})]})}function h(){var e;let{tn:r}=(0,i.useLanguage)(),a={subtitle:(e=r("resume")).subtitle,title:e.title,description:e.description,resume:{title:e.resumeCard.title,meta:e.resumeCard.meta,features:e.resumeCard.features,downloadLabel:e.resumeCard.downloadLabel,fileUrl:e.resumeCard.fileUrl},contact:{title:e.contactCard.title,items:e.contactCard.items.map(e=>({icon:e.icon,label:e.label,value:e.value}))},socials:{title:e.socialCard.title,items:e.socialCard.items.map(e=>({icon:e.icon,label:e.label,url:e.url}))}};return(0,t.jsx)(x,{resume:a})}e.s(["Resume",()=>h],15076)}]);