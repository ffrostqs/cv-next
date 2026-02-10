(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,88143,(e,t,r)=>{"use strict";function i({widthInt:e,heightInt:t,blurWidth:r,blurHeight:i,blurDataURL:a,objectFit:l}){let s=r?40*r:e,n=i?40*i:t,o=s&&n?`viewBox='0 0 ${s} ${n}'`:"";return`%3Csvg xmlns='http://www.w3.org/2000/svg' ${o}%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='${o?"none":"contain"===l?"xMidYMid":"cover"===l?"xMidYMid slice":"none"}' style='filter: url(%23b);' href='${a}'/%3E%3C/svg%3E`}Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"getImageBlurSvg",{enumerable:!0,get:function(){return i}})},87690,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var i={VALID_LOADERS:function(){return l},imageConfigDefault:function(){return s}};for(var a in i)Object.defineProperty(r,a,{enumerable:!0,get:i[a]});let l=["default","imgix","cloudinary","akamai","custom"],s={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],path:"/_next/image",loader:"default",loaderFile:"",domains:[],disableStaticImages:!1,minimumCacheTTL:14400,formats:["image/webp"],maximumRedirects:3,dangerouslyAllowLocalIP:!1,dangerouslyAllowSVG:!1,contentSecurityPolicy:"script-src 'none'; frame-src 'none'; sandbox;",contentDispositionType:"attachment",localPatterns:void 0,remotePatterns:[],qualities:[75],unoptimized:!1}},8927,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"getImgProps",{enumerable:!0,get:function(){return o}}),e.r(33525);let i=e.r(88143),a=e.r(87690),l=["-moz-initial","fill","none","scale-down",void 0];function s(e){return void 0!==e.default}function n(e){return void 0===e?e:"number"==typeof e?Number.isFinite(e)?e:NaN:"string"==typeof e&&/^[0-9]+$/.test(e)?parseInt(e,10):NaN}function o({src:e,sizes:t,unoptimized:r=!1,priority:o=!1,preload:c=!1,loading:d,className:u,quality:m,width:f,height:p,fill:x=!1,style:h,overrideSrc:v,onLoad:g,onLoadingComplete:b,placeholder:j="empty",blurDataURL:y,fetchPriority:w,decoding:N="async",layout:_,objectFit:k,objectPosition:S,lazyBoundary:I,lazyRoot:C,...P},O){var E;let z,R,M,{imgConf:A,showAltText:$,blurComplete:B,defaultLoader:L}=O,T=A||a.imageConfigDefault;if("allSizes"in T)z=T;else{let e=[...T.deviceSizes,...T.imageSizes].sort((e,t)=>e-t),t=T.deviceSizes.sort((e,t)=>e-t),r=T.qualities?.sort((e,t)=>e-t);z={...T,allSizes:e,deviceSizes:t,qualities:r}}if(void 0===L)throw Object.defineProperty(Error("images.loaderFile detected but the file is missing default export.\nRead more: https://nextjs.org/docs/messages/invalid-images-config"),"__NEXT_ERROR_CODE",{value:"E163",enumerable:!1,configurable:!0});let U=P.loader||L;delete P.loader,delete P.srcSet;let D="__next_img_default"in U;if(D){if("custom"===z.loader)throw Object.defineProperty(Error(`Image with src "${e}" is missing "loader" prop.
Read more: https://nextjs.org/docs/messages/next-image-missing-loader`),"__NEXT_ERROR_CODE",{value:"E252",enumerable:!1,configurable:!0})}else{let e=U;U=t=>{let{config:r,...i}=t;return e(i)}}if(_){"fill"===_&&(x=!0);let e={intrinsic:{maxWidth:"100%",height:"auto"},responsive:{width:"100%",height:"auto"}}[_];e&&(h={...h,...e});let r={responsive:"100vw",fill:"100vw"}[_];r&&!t&&(t=r)}let V="",W=n(f),q=n(p);if((E=e)&&"object"==typeof E&&(s(E)||void 0!==E.src)){let t=s(e)?e.default:e;if(!t.src)throw Object.defineProperty(Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received ${JSON.stringify(t)}`),"__NEXT_ERROR_CODE",{value:"E460",enumerable:!1,configurable:!0});if(!t.height||!t.width)throw Object.defineProperty(Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received ${JSON.stringify(t)}`),"__NEXT_ERROR_CODE",{value:"E48",enumerable:!1,configurable:!0});if(R=t.blurWidth,M=t.blurHeight,y=y||t.blurDataURL,V=t.src,!x)if(W||q){if(W&&!q){let e=W/t.width;q=Math.round(t.height*e)}else if(!W&&q){let e=q/t.height;W=Math.round(t.width*e)}}else W=t.width,q=t.height}let H=!o&&!c&&("lazy"===d||void 0===d);(!(e="string"==typeof e?e:V)||e.startsWith("data:")||e.startsWith("blob:"))&&(r=!0,H=!1),z.unoptimized&&(r=!0),D&&!z.dangerouslyAllowSVG&&e.split("?",1)[0].endsWith(".svg")&&(r=!0);let F=n(m),G=Object.assign(x?{position:"absolute",height:"100%",width:"100%",left:0,top:0,right:0,bottom:0,objectFit:k,objectPosition:S}:{},$?{}:{color:"transparent"},h),X=B||"empty"===j?null:"blur"===j?`url("data:image/svg+xml;charset=utf-8,${(0,i.getImageBlurSvg)({widthInt:W,heightInt:q,blurWidth:R,blurHeight:M,blurDataURL:y||"",objectFit:G.objectFit})}")`:`url("${j}")`,J=l.includes(G.objectFit)?"fill"===G.objectFit?"100% 100%":"cover":G.objectFit,K=X?{backgroundSize:J,backgroundPosition:G.objectPosition||"50% 50%",backgroundRepeat:"no-repeat",backgroundImage:X}:{},Q=function({config:e,src:t,unoptimized:r,width:i,quality:a,sizes:l,loader:s}){if(r)return{src:t,srcSet:void 0,sizes:void 0};let{widths:n,kind:o}=function({deviceSizes:e,allSizes:t},r,i){if(i){let r=/(^|\s)(1?\d?\d)vw/g,a=[];for(let e;e=r.exec(i);)a.push(parseInt(e[2]));if(a.length){let r=.01*Math.min(...a);return{widths:t.filter(t=>t>=e[0]*r),kind:"w"}}return{widths:t,kind:"w"}}return"number"!=typeof r?{widths:e,kind:"w"}:{widths:[...new Set([r,2*r].map(e=>t.find(t=>t>=e)||t[t.length-1]))],kind:"x"}}(e,i,l),c=n.length-1;return{sizes:l||"w"!==o?l:"100vw",srcSet:n.map((r,i)=>`${s({config:e,src:t,quality:a,width:r})} ${"w"===o?r:i+1}${o}`).join(", "),src:s({config:e,src:t,quality:a,width:n[c]})}}({config:z,src:e,unoptimized:r,width:W,quality:F,sizes:t,loader:U}),Y=H?"lazy":d;return{props:{...P,loading:Y,fetchPriority:w,width:W,height:q,decoding:N,className:u,style:{...G,...K},sizes:Q.sizes,srcSet:Q.srcSet,src:v||Q.src},meta:{unoptimized:r,preload:c||o,placeholder:j,fill:x}}}},98879,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"default",{enumerable:!0,get:function(){return n}});let i=e.r(71645),a="undefined"==typeof window,l=a?()=>{}:i.useLayoutEffect,s=a?()=>{}:i.useEffect;function n(e){let{headManager:t,reduceComponentsToState:r}=e;function n(){if(t&&t.mountedInstances){let e=i.Children.toArray(Array.from(t.mountedInstances).filter(Boolean));t.updateHead(r(e))}}return a&&(t?.mountedInstances?.add(e.children),n()),l(()=>(t?.mountedInstances?.add(e.children),()=>{t?.mountedInstances?.delete(e.children)})),l(()=>(t&&(t._pendingUpdate=n),()=>{t&&(t._pendingUpdate=n)})),s(()=>(t&&t._pendingUpdate&&(t._pendingUpdate(),t._pendingUpdate=null),()=>{t&&t._pendingUpdate&&(t._pendingUpdate(),t._pendingUpdate=null)})),null}},25633,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var i={default:function(){return x},defaultHead:function(){return u}};for(var a in i)Object.defineProperty(r,a,{enumerable:!0,get:i[a]});let l=e.r(55682),s=e.r(90809),n=e.r(43476),o=s._(e.r(71645)),c=l._(e.r(98879)),d=e.r(42732);function u(){return[(0,n.jsx)("meta",{charSet:"utf-8"},"charset"),(0,n.jsx)("meta",{name:"viewport",content:"width=device-width"},"viewport")]}function m(e,t){return"string"==typeof t||"number"==typeof t?e:t.type===o.default.Fragment?e.concat(o.default.Children.toArray(t.props.children).reduce((e,t)=>"string"==typeof t||"number"==typeof t?e:e.concat(t),[])):e.concat(t)}e.r(33525);let f=["name","httpEquiv","charSet","itemProp"];function p(e){let t,r,i,a;return e.reduce(m,[]).reverse().concat(u().reverse()).filter((t=new Set,r=new Set,i=new Set,a={},e=>{let l=!0,s=!1;if(e.key&&"number"!=typeof e.key&&e.key.indexOf("$")>0){s=!0;let r=e.key.slice(e.key.indexOf("$")+1);t.has(r)?l=!1:t.add(r)}switch(e.type){case"title":case"base":r.has(e.type)?l=!1:r.add(e.type);break;case"meta":for(let t=0,r=f.length;t<r;t++){let r=f[t];if(e.props.hasOwnProperty(r))if("charSet"===r)i.has(r)?l=!1:i.add(r);else{let t=e.props[r],i=a[r]||new Set;("name"!==r||!s)&&i.has(t)?l=!1:(i.add(t),a[r]=i)}}}return l})).reverse().map((e,t)=>{let r=e.key||t;return o.default.cloneElement(e,{key:r})})}let x=function({children:e}){let t=(0,o.useContext)(d.HeadManagerContext);return(0,n.jsx)(c.default,{reduceComponentsToState:p,headManager:t,children:e})};("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},18556,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"ImageConfigContext",{enumerable:!0,get:function(){return l}});let i=e.r(55682)._(e.r(71645)),a=e.r(87690),l=i.default.createContext(a.imageConfigDefault)},65856,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"RouterContext",{enumerable:!0,get:function(){return i}});let i=e.r(55682)._(e.r(71645)).default.createContext(null)},70965,(e,t,r)=>{"use strict";function i(e,t){let r=e||75;return t?.qualities?.length?t.qualities.reduce((e,t)=>Math.abs(t-r)<Math.abs(e-r)?t:e,0):r}Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"findClosestQuality",{enumerable:!0,get:function(){return i}})},1948,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"default",{enumerable:!0,get:function(){return l}});let i=e.r(70965);function a({config:e,src:t,width:r,quality:a}){if(t.startsWith("/")&&t.includes("?")&&e.localPatterns?.length===1&&"**"===e.localPatterns[0].pathname&&""===e.localPatterns[0].search)throw Object.defineProperty(Error(`Image with src "${t}" is using a query string which is not configured in images.localPatterns.
Read more: https://nextjs.org/docs/messages/next-image-unconfigured-localpatterns`),"__NEXT_ERROR_CODE",{value:"E871",enumerable:!1,configurable:!0});let l=(0,i.findClosestQuality)(a,e);return`${e.path}?url=${encodeURIComponent(t)}&w=${r}&q=${l}${t.startsWith("/_next/static/media/"),""}`}a.__next_img_default=!0;let l=a},85437,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"Image",{enumerable:!0,get:function(){return j}});let i=e.r(55682),a=e.r(90809),l=e.r(43476),s=a._(e.r(71645)),n=i._(e.r(74080)),o=i._(e.r(25633)),c=e.r(8927),d=e.r(87690),u=e.r(18556);e.r(33525);let m=e.r(65856),f=i._(e.r(1948)),p=e.r(18581),x={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],qualities:[75],path:"/_next/image/",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!0};function h(e,t,r,i,a,l,s){let n=e?.src;e&&e["data-loaded-src"]!==n&&(e["data-loaded-src"]=n,("decode"in e?e.decode():Promise.resolve()).catch(()=>{}).then(()=>{if(e.parentElement&&e.isConnected){if("empty"!==t&&a(!0),r?.current){let t=new Event("load");Object.defineProperty(t,"target",{writable:!1,value:e});let i=!1,a=!1;r.current({...t,nativeEvent:t,currentTarget:e,target:e,isDefaultPrevented:()=>i,isPropagationStopped:()=>a,persist:()=>{},preventDefault:()=>{i=!0,t.preventDefault()},stopPropagation:()=>{a=!0,t.stopPropagation()}})}i?.current&&i.current(e)}}))}function v(e){return s.use?{fetchPriority:e}:{fetchpriority:e}}"undefined"==typeof window&&(globalThis.__NEXT_IMAGE_IMPORTED=!0);let g=(0,s.forwardRef)(({src:e,srcSet:t,sizes:r,height:i,width:a,decoding:n,className:o,style:c,fetchPriority:d,placeholder:u,loading:m,unoptimized:f,fill:x,onLoadRef:g,onLoadingCompleteRef:b,setBlurComplete:j,setShowAltText:y,sizesInput:w,onLoad:N,onError:_,...k},S)=>{let I=(0,s.useCallback)(e=>{e&&(_&&(e.src=e.src),e.complete&&h(e,u,g,b,j,f,w))},[e,u,g,b,j,_,f,w]),C=(0,p.useMergedRef)(S,I);return(0,l.jsx)("img",{...k,...v(d),loading:m,width:a,height:i,decoding:n,"data-nimg":x?"fill":"1",className:o,style:c,sizes:r,srcSet:t,src:e,ref:C,onLoad:e=>{h(e.currentTarget,u,g,b,j,f,w)},onError:e=>{y(!0),"empty"!==u&&j(!0),_&&_(e)}})});function b({isAppRouter:e,imgAttributes:t}){let r={as:"image",imageSrcSet:t.srcSet,imageSizes:t.sizes,crossOrigin:t.crossOrigin,referrerPolicy:t.referrerPolicy,...v(t.fetchPriority)};return e&&n.default.preload?(n.default.preload(t.src,r),null):(0,l.jsx)(o.default,{children:(0,l.jsx)("link",{rel:"preload",href:t.srcSet?void 0:t.src,...r},"__nimg-"+t.src+t.srcSet+t.sizes)})}let j=(0,s.forwardRef)((e,t)=>{let r=(0,s.useContext)(m.RouterContext),i=(0,s.useContext)(u.ImageConfigContext),a=(0,s.useMemo)(()=>{let e=x||i||d.imageConfigDefault,t=[...e.deviceSizes,...e.imageSizes].sort((e,t)=>e-t),r=e.deviceSizes.sort((e,t)=>e-t),a=e.qualities?.sort((e,t)=>e-t);return{...e,allSizes:t,deviceSizes:r,qualities:a,localPatterns:"undefined"==typeof window?i?.localPatterns:e.localPatterns}},[i]),{onLoad:n,onLoadingComplete:o}=e,p=(0,s.useRef)(n);(0,s.useEffect)(()=>{p.current=n},[n]);let h=(0,s.useRef)(o);(0,s.useEffect)(()=>{h.current=o},[o]);let[v,j]=(0,s.useState)(!1),[y,w]=(0,s.useState)(!1),{props:N,meta:_}=(0,c.getImgProps)(e,{defaultLoader:f.default,imgConf:a,blurComplete:v,showAltText:y});return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(g,{...N,unoptimized:_.unoptimized,placeholder:_.placeholder,fill:_.fill,onLoadRef:p,onLoadingCompleteRef:h,setBlurComplete:j,setShowAltText:w,sizesInput:e.sizes,ref:t}),_.preload?(0,l.jsx)(b,{isAppRouter:!r,imgAttributes:N}):null]})});("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},94909,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var i={default:function(){return d},getImageProps:function(){return c}};for(var a in i)Object.defineProperty(r,a,{enumerable:!0,get:i[a]});let l=e.r(55682),s=e.r(8927),n=e.r(85437),o=l._(e.r(1948));function c(e){let{props:t}=(0,s.getImgProps)(e,{defaultLoader:o.default,imgConf:{deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],qualities:[75],path:"/_next/image/",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!0}});for(let[e,r]of Object.entries(t))void 0===r&&delete t[e];return{props:t}}let d=n.Image},57688,(e,t,r)=>{t.exports=e.r(94909)},79315,33154,e=>{"use strict";var t=e.i(43476),r=e.i(19204),i=e.i(65124),a=e.i(25913);let l=(0,a.cva)("group inline-flex transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-background",{variants:{variant:{inline:"items-center gap-2 text-[color:var(--text-muted)] hover:text-[color:var(--color-primary)] dark:text-[color:var(--text-muted)] dark:hover:text-[color:var(--color-primary)]",card:"flex-1 flex flex-col items-center text-center rounded-lg p-4 bg-[color:var(--surface-muted)] hover:bg-[color:var(--surface-accent-muted)] text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] dark:bg-[color:var(--surface-muted)] dark:hover:bg-[color:var(--surface-accent-muted)]"}},defaultVariants:{variant:"inline"}}),s=(0,a.cva)("flex items-center justify-center transition-colors",{variants:{variant:{inline:"w-10 h-10 rounded-lg border bg-[color:var(--surface-muted)] border-[color:var(--border-default)] group-hover:border-[color:var(--color-primary)] group-hover:text-[color:var(--color-primary)] dark:bg-[color:var(--surface-muted)] dark:border-[color:var(--border-default)]",card:"mx-auto mb-2 text-[color:var(--text-muted)] group-hover:text-[color:var(--color-primary)]"}},defaultVariants:{variant:"inline"}}),n=(0,a.cva)("",{variants:{variant:{inline:"hidden sm:inline text-[color:var(--text-muted)] group-hover:text-[color:var(--color-primary)]",card:"text-sm font-medium text-[color:var(--text-primary)]"}},defaultVariants:{variant:"inline"}});function o({icon:e,label:a,variant:o="inline",className:c,...d}){return(0,t.jsxs)("a",{...d,className:(0,r.cn)(l({variant:o}),c),"aria-label":a,children:[(0,t.jsx)("div",{className:s({variant:o}),children:(0,t.jsx)(i.AppIcon,{name:e,size:"card"===o?24:18,decorative:!0})}),(0,t.jsx)("span",{className:n({variant:o}),children:a})]})}e.s(["SocialLink",()=>o],33154),e.s([],79315)},28059,62368,67902,74856,98627,2701,e=>{"use strict";let t={once:!0,margin:"-100px"},r="easeOut";function i(e){return e}let a={fadeUp:i({initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:t,transition:{duration:.5,ease:r}}),fadeIn:i({initial:{opacity:0},whileInView:{opacity:1},viewport:t,transition:{duration:.4,ease:r}}),fadeLeft:i({initial:{opacity:0,x:-20},whileInView:{opacity:1,x:0},viewport:t,transition:{duration:.5,ease:r}}),fadeRight:i({initial:{opacity:0,x:20},whileInView:{opacity:1,x:0},viewport:t,transition:{duration:.5,ease:r}}),scaleIn:i({initial:{opacity:0,scale:.95},whileInView:{opacity:1,scale:1},viewport:t,transition:{duration:.45,ease:r}})};function l(e,t={}){let r=a[e];if(!r.transition)return r;let{delay:i=0,order:s,step:n=.08}=t;return{...r,transition:{...r.transition,delay:void 0!==s?s*n:i}}}e.s(["motion",()=>l],62368),e.s([],28059);var s=e.i(43476),n=e.i(19204);let o={default:"py-24",hero:"min-h-screen py-32",muted:"py-24"},c={default:"ui-surface-default ui-surface-radial",hero:"ui-surface-hero",muted:"ui-surface-muted"};var d=e.i(46932);function u({className:e}){return(0,s.jsxs)("div",{"aria-hidden":!0,className:(0,n.cn)("pointer-events-none absolute inset-0 -z-20",e),children:[(0,s.jsx)(d.motion.div,{className:" absolute left-10/12 top-[-20%] h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-gradient-accent blur-3xl ",animate:{y:[-40,0,-40],scale:[1,1.08,1],opacity:[.25,.4,.25]},transition:{duration:16,ease:"easeInOut",repeat:1/0}}),(0,s.jsx)(d.motion.div,{className:" absolute left-1/4 bottom-[-20%] h-[300px] w-[300px] rounded-full bg-gradient-accent blur-3xl ",animate:{y:[30,0,30],scale:[1,1.05,1],opacity:[.18,.3,.18]},transition:{duration:20,ease:"easeInOut",repeat:1/0}})]})}function m({children:e,id:t,variant:r="default",glow:i=!1,className:a,containerClassName:l,...d}){return(0,s.jsxs)("section",{id:t,className:(0,n.cn)("relative flex items-center justify-center",o[r],a),...d,children:[(0,s.jsx)("div",{"aria-hidden":!0,className:(0,n.cn)("absolute inset-0 -z-20",c[r])}),i&&(0,s.jsx)(u,{}),(0,s.jsx)("div",{className:(0,n.cn)("container mx-auto max-w-6xl px-4",l),children:e})]})}e.s(["Section",()=>m],67902);var f=e.i(71645);function p(e){let t=(0,f.useId)(),r=e??`section-${t}`;return{sectionId:e,titleId:`${r}-title`,descriptionId:`${r}-description`}}e.s(["useSectionIds",()=>p],74856),e.s([],98627);var x=e.i(65124);let h=(0,e.i(25913).cva)(`
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
        `,muted:"bg-transparent text-[var(--text-muted)]"}},defaultVariants:{variant:"default"}});function v({children:e,icon:t,variant:r="default",className:i}){return(0,s.jsxs)("div",{className:(0,n.cn)(h({variant:r}),i),children:[t&&(0,s.jsx)(x.AppIcon,{name:t,size:16,decorative:!0}),(0,s.jsx)("span",{children:e})]})}e.s(["InfoBadge",()=>v],2701)},6851,e=>{"use strict";var t=e.i(43476),r=e.i(57688),i=e.i(46932);e.i(28059);var a=e.i(62368);e.i(98627);var l=e.i(67902),s=e.i(74856);e.i(21351);var n=e.i(90873),o=e.i(7670),c=e.i(19056);function d(...e){return(0,c.twMerge)((0,o.clsx)(e))}var u=e.i(25913);let m=(0,u.cva)("",{variants:{variant:{horizontal:"flex flex-wrap gap-4 mb-8",vertical:"flex flex-col gap-3 mb-8"}},defaultVariants:{variant:"horizontal"}});function f({children:e,variant:r,className:i}){return(0,t.jsx)("div",{className:d(m({variant:r}),i),children:e})}e.i(79315);var p=e.i(33154);let x=(0,u.cva)("",{variants:{variant:{inline:"flex items-center gap-4 justify-center lg:justify-start",card:"grid grid-cols-1 sm:grid-cols-3 gap-4 "}},defaultVariants:{variant:"inline"}});function h({items:e,variant:r="inline",className:i}){return(0,t.jsx)("div",{className:d(x({variant:r}),i),children:e.map(e=>(0,t.jsx)(p.SocialLink,{href:e.href,icon:e.icon,label:e.label,variant:r,target:"_blank",rel:"noopener noreferrer"},e.label))})}let v=(0,u.cva)("flex items-center gap-3 rounded-2xl border p-4 shadow-xl bg-white dark:bg-slate-800",{variants:{status:{available:"border-slate-200 dark:border-slate-700",busy:"border-yellow-300 dark:border-yellow-600",offline:"border-slate-300 dark:border-slate-600"}},defaultVariants:{status:"available"}}),g=(0,u.cva)("w-3 h-3 rounded-full",{variants:{status:{available:"bg-green-400 animate-pulse",busy:"bg-yellow-400",offline:"bg-slate-400"}}});function b({status:e,title:r,subtitle:i}){return(0,t.jsxs)("div",{className:d(v({status:e})),children:[(0,t.jsx)("span",{className:g({status:e}),"aria-hidden":!0}),(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{className:"text-slate-900 dark:text-white",children:r}),i&&(0,t.jsx)("div",{className:"text-slate-500 dark:text-slate-400",children:i})]})]})}var j=e.i(19204);let y=(0,u.cva)("relative overflow-hidden p-1 rounded-2xl",{variants:{variant:{default:"relative h-full animate-surface-gradient bg-gradient-accent rounded-2xl"}},defaultVariants:{variant:"default"}}),w=(0,u.cva)("relative h-full w-full overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800");function N({children:e,variant:r,className:i}){return(0,t.jsx)("div",{className:(0,j.cn)(y({variant:r}),i),children:(0,t.jsx)("div",{className:w(),children:e})})}var _=e.i(2701);let k=[{href:"https://github.com/ffrostqs",icon:"github",label:"GitHub"},{href:"https://linkedin.com/in/fred-frost/",icon:"linkedin",label:"LinkedIn"},{href:"mailto:slivinskyi@yevhenii.v6.rocks",icon:"mail",label:"Email"}];function S({hero:e}){let{titleId:o,descriptionId:c}=(0,s.useSectionIds)("hero");return(0,t.jsxs)(l.Section,{id:"hero",variant:"hero",containerClassName:"grid grid-cols-1 items-center gap-16 lg:my-4 lg:grid-cols-2","aria-labelledby":o,"aria-describedby":c,"data-testid":"experience-section",children:[(0,t.jsx)(i.motion.div,{...(0,a.motion)("fadeLeft"),children:(0,t.jsxs)("div",{className:"relative mx-auto w-full max-w-sm",children:[(0,t.jsx)(N,{className:"aspect-[3/4]",children:(0,t.jsx)(r.default,{src:"/images/portrait.png",alt:e.name,fill:!0,priority:!0,sizes:"(max-width: 1024px) 100vw, 420px",className:"object-cover object-[50%_20%]"})}),(0,t.jsx)("div",{className:"absolute bottom-6 right-6",children:(0,t.jsx)(b,{status:"available",title:e.badge.available,subtitle:e.badge.remote})})]})}),(0,t.jsx)(i.motion.div,{...(0,a.motion)("fadeRight"),children:(0,t.jsxs)("div",{className:"text-center lg:text-left",children:[(0,t.jsx)(_.InfoBadge,{icon:"location",children:e.location}),(0,t.jsxs)("h1",{className:"ui-hero-title",id:o,children:[(0,t.jsx)("span",{className:"block",children:e.greeting}),(0,t.jsx)("span",{className:"ui-gradient-text animate-surface-gradient",children:e.name})]}),(0,t.jsx)("h2",{className:"ui-hero-subtitle",children:e.title}),(0,t.jsx)("p",{className:"ui-hero-description",id:c,children:e.description}),(0,t.jsxs)(f,{className:"mt-8 justify-center lg:justify-start",children:[(0,t.jsx)(n.Button,{asChild:!0,children:(0,t.jsx)("a",{href:"#contact","aria-label":"Scroll to contact section",children:e.getInTouch})}),(0,t.jsx)(n.Button,{variant:"outline",iconLeft:"download",asChild:!0,children:(0,t.jsx)("a",{href:e.resumeUrl,download:!0,children:e.resume})})]}),(0,t.jsx)(h,{items:k})]})})]})}e.s(["HeroClient",()=>S],6851)},61464,13345,e=>{"use strict";var t=e.i(43476),r=e.i(46932);e.i(28059);var i=e.i(62368),a=e.i(19204),l=e.i(2701);let s="text-center",n="text-left";function o({icon:e,badge:o,title:c,description:d,titleId:u,descriptionId:m,align:f="center",className:p}){return(0,t.jsxs)(r.motion.div,{...(0,i.motion)("fadeUp"),className:(0,a.cn)("mb-20","left"===f?n:s,p),children:[(0,t.jsx)(l.InfoBadge,{icon:e,children:o}),(0,t.jsx)("h2",{id:u,className:"ui-section-title mb-6",children:c}),d&&(0,t.jsx)("p",{id:m,className:"ui-text-muted max-w-2xl mx-auto",children:d})]})}e.s(["SectionHeader",()=>o],13345),e.s([],61464)},15855,e=>{"use strict";var t=e.i(43476);e.i(98627);var r=e.i(67902),i=e.i(74856);e.i(61464);var a=e.i(13345);let l={section:"",root:"relative",background:{wrapper:"pointer-events-none absolute inset-0 -z-10",glowTop:`
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
    `},companyLink:`
    ml-2
    font-medium
    transition-colors
    duration-200

    hover:text-[color:var(--color-primary)]
    focus:text-[color:var(--color-primary)]
  `,timeline:{wrapper:"relative mt-16 md:mt-24",line:`
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
    `}};var s=e.i(46932),n=e.i(19204),o=e.i(65124);e.i(28059);var c=e.i(62368);function d({item:e,index:r,isLeft:i,techStackLabel:a}){return(0,t.jsxs)(s.motion.li,{...(0,c.motion)("fadeUp",{order:r}),className:l.timeline.item,role:"listitem",children:[(0,t.jsx)("div",{"aria-hidden":!0,className:(0,n.cn)(l.timeline.iconBase),children:(0,t.jsx)(o.AppIcon,{name:e.icon??"experience",size:22,decorative:!0})}),(0,t.jsx)("div",{className:(0,n.cn)(l.timeline.itemWrapper,i?l.timelineAlign.left:l.timelineAlign.right),children:(0,t.jsxs)("div",{className:l.card.wrapper,children:[(0,t.jsxs)("h3",{className:l.card.title,children:[e.role,(0,t.jsx)("span",{children:(0,t.jsx)("a",{href:e.companyUrl,target:"_blank",rel:"noopener noreferrer",className:l.companyLink,children:e.company})})]}),(0,t.jsx)("div",{className:l.card.period,children:e.period}),(0,t.jsx)("p",{className:l.card.description,children:e.description}),(0,t.jsx)("ul",{className:l.card.list,children:e.achievements.map((e,r)=>(0,t.jsxs)("li",{className:l.card.listItem,children:[(0,t.jsx)("span",{className:(0,n.cn)(l.card.bullet)}),e]},r))}),(0,t.jsxs)("div",{className:l.card.stack,children:[(0,t.jsx)("strong",{children:a})," ",e.stack.join(", ")]})]})})]})}let u="experience";function m({experience:e}){let{titleId:s,descriptionId:n}=(0,i.useSectionIds)(u);return(0,t.jsx)(r.Section,{id:u,variant:"muted",glow:!0,"aria-labelledby":s,"aria-describedby":n,className:l.section,children:(0,t.jsxs)("div",{className:l.root,children:[(0,t.jsx)(a.SectionHeader,{icon:u,badge:e.subtitle,title:e.title,description:e.description,titleId:s,descriptionId:n}),(0,t.jsxs)("div",{className:l.timeline.wrapper,children:[(0,t.jsx)("div",{"aria-hidden":!0,className:l.timeline.line}),(0,t.jsx)("ul",{className:l.timeline.list,role:"list",children:e.items.map((r,i)=>(0,t.jsx)(d,{item:r,index:i,isLeft:i%2==0,techStackLabel:e.techStack},r.id))})]})]})})}e.s(["ExperienceClient",()=>m],15855)},29239,e=>{"use strict";var t=e.i(43476);e.i(98627);var r=e.i(67902),i=e.i(74856);e.i(61464);var a=e.i(13345),l=e.i(71645),s=e.i(19204),n=e.i(65124);let o=(0,e.i(25913).cva)("ui-surface-card flex flex-col items-start");function c({icon:e,value:r,label:i,description:a,className:l}){return(0,t.jsxs)("div",{className:(0,s.cn)(o(),l),children:[(0,t.jsx)("div",{className:"mb-3 text-[color:var(--color-primary)]","aria-hidden":!0,children:(0,t.jsx)(n.AppIcon,{name:e,size:22})}),(0,t.jsx)("div",{className:"text-3xl font-semibold text-[color:var(--text-primary)]",children:r}),(0,t.jsx)("div",{className:"mt-1 text-sm font-medium text-[color:var(--text-secondary)]",children:i}),a&&(0,t.jsx)("p",{className:"mt-2 text-sm text-[color:var(--text-secondary)]",children:a})]})}let d={1:"grid-cols-1",2:"grid-cols-2",3:"grid-cols-3",4:"grid-cols-4"},u={1:"md:grid-cols-1",2:"md:grid-cols-2",3:"md:grid-cols-3",4:"md:grid-cols-4"},m={1:"lg:grid-cols-1",2:"lg:grid-cols-2",3:"lg:grid-cols-3",4:"lg:grid-cols-4"};var f=e.i(46932);e.i(28059);var p=e.i(62368);let x={base:1,md:2,lg:3};function h({items:e,columns:r,className:i}){let a={...x,...r};return(0,t.jsx)("ul",{role:"list",className:(0,s.cn)("grid gap-6",d[a.base],u[a.md],m[a.lg],i),children:e.map((e,r)=>(0,l.createElement)(f.motion.li,{...(0,p.motion)("fadeUp",{order:r}),key:r},(0,t.jsx)(c,{...e})))})}let v="ui-surface-card mt-24",g="ui-section-title mb-8",b="grid gap-6 md:grid-cols-3",j="flex flex-col gap-3",y="flex items-center gap-3",w="font-medium",N="ui-text-muted text-sm leading-relaxed";function _({approach:e}){return(0,t.jsxs)("section",{className:v,children:[(0,t.jsx)("h3",{className:g,children:e.title}),(0,t.jsx)("ul",{className:b,children:e.items.map(e=>(0,t.jsxs)("li",{className:j,children:[(0,t.jsxs)("div",{className:y,children:[(0,t.jsx)(n.AppIcon,{name:e.icon,size:16}),(0,t.jsx)("h4",{className:w,children:e.title})]}),(0,t.jsx)("p",{className:N,children:e.description})]},e.title))})]})}let k="about";function S({about:e}){let{titleId:l,descriptionId:s}=(0,i.useSectionIds)(k);return(0,t.jsx)(r.Section,{id:k,variant:"default","aria-labelledby":l,"aria-describedby":s,children:(0,t.jsxs)("div",{className:"relative",children:[(0,t.jsx)(a.SectionHeader,{icon:k,badge:e.subtitle,title:e.title,description:e.description,titleId:l,descriptionId:s}),e.stats&&(0,t.jsx)(h,{items:e.stats,className:"mt-16"}),e.approach&&(0,t.jsx)(_,{approach:e.approach})]})})}e.s(["AboutClient",()=>S],29239)},16560,e=>{"use strict";var t=e.i(43476),r=e.i(71645),i=e.i(46932);e.i(98627);var a=e.i(67902),l=e.i(74856);e.i(61464);var s=e.i(13345),n=e.i(19204),o=e.i(25913);let c=(0,o.cva)(`
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
  `),d=(0,o.cva)(`
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
        `}},defaultVariants:{active:!1}});function u({items:e,value:r,onChange:i,className:a}){return(0,t.jsx)("div",{role:"tablist","aria-orientation":"horizontal",className:(0,n.cn)(c(),a),children:e.map(e=>{let a=e.key===r;return(0,t.jsx)("button",{role:"tab","aria-selected":a,onClick:()=>i(e.key),className:d({active:a}),children:e.label},e.key)})})}e.i(28059);var m=e.i(62368);e.i(21351);var f=e.i(90873);let p="projects",x={section:"relative",root:"space-y-12",tabsWrapper:"flex justify-center",grid:"grid gap-6 sm:grid-cols-2",showMore:"flex justify-center pt-2",card:{wrapper:`
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
      rounded-md
      px-2.5 py-1
      text-sm
      text-[color:var(--text-primary)]
      bg-[color:rgba(148,163,184,0.16)]
      border
      border-[color:var(--border-muted)]
    `,links:"mt-6 flex gap-4",link:`
      inline-flex
      items-center
      gap-1.5
      text-xs
      font-medium
      text-[color:var(--color-primary)]
      hover:underline
    `}};var h=e.i(57688),v=e.i(65124);let g="/images/default_projects.png";function b({project:e}){let[i,a]=(0,r.useState)(e.image&&""!==e.image.trim()?e.image:g);return(0,t.jsxs)("article",{className:x.card.wrapper,children:[(0,t.jsxs)("header",{className:x.card.header,children:[(0,t.jsx)("h3",{className:x.card.title,children:e.title}),e.meta&&(0,t.jsx)("span",{className:x.card.meta,children:e.meta})]}),(0,t.jsx)("p",{className:x.card.description,children:e.description}),(0,t.jsx)("div",{className:x.card.imageWrapper,children:(0,t.jsx)(h.default,{src:i,alt:e.title,fill:!0,sizes:"(max-width: 1024px) 100vw, 480px",className:x.card.image,onError:()=>{i!==g&&a(g)}})}),(0,t.jsx)("ul",{className:x.card.stack,"aria-label":"Tech stack",children:e.stack.map(e=>(0,t.jsx)("li",{className:x.card.stackItem,children:e},e))}),e.links&&(0,t.jsx)("footer",{className:x.card.links,children:e.links.map(e=>(0,t.jsxs)("a",{href:e.url,target:"_blank",rel:"noopener noreferrer",className:x.card.link,children:[(0,t.jsx)(v.AppIcon,{name:e.icon,size:14,decorative:!0}),e.label]},e.label))})]})}function j({projects:e}){let{titleId:n,descriptionId:o}=(0,l.useSectionIds)(p),[c,d]=(0,r.useState)("all"),[h,v]=(0,r.useState)(2),g=(0,r.useMemo)(()=>{let t=Array.from(new Set(e.items.map(e=>e.category)));return[{key:"all",label:e.filters.all},...t.map(e=>({key:e,label:e}))]},[e.items,e.filters.all]),j=(0,r.useMemo)(()=>"all"===c?e.items:e.items.filter(e=>e.category===c),[c,e.items]);(0,r.useEffect)(()=>{v(2)},[c]);let y=(0,r.useMemo)(()=>j.slice(0,h),[j,h]);return(0,t.jsx)(a.Section,{id:p,variant:"muted",glow:!0,"aria-labelledby":n,"aria-describedby":o,className:x.section,children:(0,t.jsxs)("div",{className:x.root,children:[(0,t.jsx)(s.SectionHeader,{icon:p,badge:e.subtitle,title:e.title,description:e.description,titleId:n,descriptionId:o}),(0,t.jsx)("div",{className:x.tabsWrapper,children:(0,t.jsx)(u,{items:g,value:c,onChange:d})}),(0,t.jsx)("ul",{className:x.grid,role:"list",children:y.map((e,r)=>(0,t.jsx)(i.motion.li,{...(0,m.motion)("fadeUp",{order:r}),role:"listitem",children:(0,t.jsx)(b,{project:e})},e.id))}),j.length>h&&(0,t.jsx)("div",{className:x.showMore,children:(0,t.jsx)(f.Button,{variant:"outline",onClick:()=>v(e=>e+2),children:e.filters.showMore})})]})})}e.s(["ProjectsClient",()=>j],16560)},61254,e=>{"use strict";var t=e.i(43476);e.i(98627);var r=e.i(67902),i=e.i(74856);e.i(61464);var a=e.i(13345),l=e.i(46932);e.i(28059);var s=e.i(62368),n=e.i(65124),o=e.i(19204);let c=(0,e.i(25913).cva)(`
    inline-flex
    items-center
    gap-1.5
    rounded-full
    px-3
    py-1.5
    text-sm
    font-medium
    border
    bg-[color:var(--surface-muted)]
    text-[color:var(--text-primary)]
    border-[color:var(--border-default)]
    transition-colors
  `,{variants:{level:{core:`
          border-[color:var(--color-primary)]
          text-[color:var(--text-primary)]
        `,advanced:`
          text-[color:var(--text-primary)]
          opacity-85
        `,familiar:`
          text-[color:var(--text-secondary)]
          opacity-90
        `},interactive:{true:`
          cursor-pointer
          hover:border-[color:var(--color-primary)]
          hover:text-[color:var(--text-primary)]
          hover:opacity-100
          hover:bg-[color:rgba(0,187,255,0.12)]
        `},highlighted:{true:`
          border-[color:var(--color-primary)]
        `}},defaultVariants:{level:"core"}});function d({children:e,level:r="core",usedIn:i,highlighted:a,onClick:l,className:s}){let n=!!l;return(0,t.jsxs)("span",{role:n?"button":void 0,tabIndex:n?0:void 0,onClick:l,className:(0,o.cn)(c({level:r,interactive:n,highlighted:a}),s),"aria-label":i?`${e}, used in ${i} projects`:e,children:[e,"number"==typeof i&&(0,t.jsxs)("span",{className:"text-[10px] opacity-70",children:["· ",i]})]})}let u={section:"py-32",grid:"grid gap-8 md:grid-cols-2",card:{wrapper:`
      ui-surface-card
      flex h-full flex-col gap-6
      rounded-xl
    `,header:"flex items-start gap-4",iconBox:`
      flex h-9 w-9 shrink-0 items-center justify-center
      rounded-lg
      ui-surface-soft
      text-[color:var(--color-primary)]
    `,title:"text-base font-semibold text-[color:var(--text-primary)]",description:"text-sm text-[color:var(--text-primary)] opacity-80",skills:"flex flex-wrap gap-2"}};function m({category:e,index:r,usage:i}){return(0,t.jsxs)(l.motion.div,{...(0,s.motion)("fadeUp",{order:r}),className:u.card.wrapper,children:[(0,t.jsxs)("div",{className:u.card.header,children:[(0,t.jsx)("div",{className:u.card.iconBox,children:(0,t.jsx)(n.AppIcon,{name:e.icon,size:20})}),(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{className:u.card.title,children:e.title}),e.description&&(0,t.jsx)("p",{className:u.card.description,children:e.description})]})]}),(0,t.jsx)("div",{className:u.card.skills,children:e.skills.map(e=>{let r=i?.[e.trim().toLowerCase()];return(0,t.jsx)(d,{usedIn:r,children:e},e)})})]})}let f="skills";function p({skills:e}){let{titleId:l,descriptionId:s}=(0,i.useSectionIds)(f);return(0,t.jsxs)(r.Section,{id:f,variant:"default",className:u.section,"aria-labelledby":l,"aria-describedby":s,children:[(0,t.jsx)(a.SectionHeader,{icon:f,badge:e.subtitle,title:e.title,description:e.description,titleId:l,descriptionId:s}),(0,t.jsx)("div",{className:u.grid,children:e.categories.map((r,i)=>(0,t.jsx)(m,{category:r,index:i,usage:e.usage},r.id))})]})}e.s(["SkillsClient",()=>p],61254)},45789,e=>{"use strict";var t=e.i(43476);e.i(98627);var r=e.i(67902),i=e.i(74856);e.i(61464);var a=e.i(13345),l=e.i(65124);e.i(21351);var s=e.i(90873);let n={wrapper:`
    ui-surface-card
    rounded-xl
    p-6
  `,title:"text-base font-semibold mb-4",list:"space-y-4",item:"flex items-start gap-3",iconBox:`
    ui-surface-soft
    flex h-9 w-9 shrink-0 items-center justify-center
    rounded-lg
    text-[color:var(--color-primary)]
  `,label:"text-sm ui-text-muted",value:"ui-text"},o={wrapper:`
    ui-surface-card
    rounded-xl
    p-6
  `,title:"text-base font-semibold mb-4",grid:"grid grid-cols-6 gap-3"},c={wrapper:`
    ui-surface-card
    rounded-xl
    p-8
    flex flex-col justify-center
  `,header:"flex items-center gap-4 mb-6",iconBox:`
    ui-surface-soft
    flex h-12 w-12 items-center justify-center
    rounded-xl
    text-[color:var(--color-primary)]
  `,title:"text-lg font-semibold",meta:"text-sm ui-text-muted",list:"space-y-2 ui-text mb-8",bullet:"text-[color:var(--color-primary)]"};function d({data:e}){return(0,t.jsxs)("div",{className:c.wrapper,children:[(0,t.jsxs)("div",{className:c.header,children:[(0,t.jsx)("div",{className:c.iconBox,children:(0,t.jsx)(l.AppIcon,{name:"download",size:22,decorative:!0})}),(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{className:c.title,children:e.title}),(0,t.jsx)("p",{className:c.meta,children:e.meta})]})]}),(0,t.jsx)("ul",{className:c.list,children:e.features.map(e=>(0,t.jsxs)("li",{className:"flex gap-2",children:[(0,t.jsx)("span",{className:c.bullet,children:"•"}),(0,t.jsx)("span",{children:e})]},e))}),(0,t.jsx)(s.Button,{asChild:!0,variant:"primary",size:"sm",iconLeft:"download",children:(0,t.jsx)("a",{href:e.fileUrl,download:!0,children:e.downloadLabel})})]})}function u({data:e}){return(0,t.jsxs)("div",{className:n.wrapper,children:[(0,t.jsx)("h3",{className:n.title,children:e.title}),(0,t.jsx)("ul",{className:n.list,children:e.items.map(e=>(0,t.jsxs)("li",{className:n.item,children:[(0,t.jsx)("div",{className:n.iconBox,children:(0,t.jsx)(l.AppIcon,{name:e.icon,size:16,decorative:!0})}),(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:n.label,children:e.label}),(0,t.jsx)("p",{className:n.value,children:e.value})]})]},e.label))})]})}e.i(79315);var m=e.i(33154);function f({data:e}){return(0,t.jsxs)("div",{className:o.wrapper,children:[(0,t.jsx)("h3",{className:o.title,children:e.title}),(0,t.jsx)("ul",{className:o.grid,children:e.items.map(e=>(0,t.jsx)("li",{children:(0,t.jsx)(m.SocialLink,{icon:e.icon,label:e.label,href:e.url,target:"_blank",variant:"card"})},e.url))})]})}function p({resume:e}){let{titleId:l,descriptionId:s}=(0,i.useSectionIds)("resume");return(0,t.jsxs)(r.Section,{id:"resume",variant:"muted",glow:!0,className:"py-32",children:[(0,t.jsx)(a.SectionHeader,{icon:"download",badge:e.subtitle,title:e.title,description:e.description,titleId:l,descriptionId:s}),(0,t.jsxs)("div",{className:"grid gap-8 lg:grid-cols-2",children:[(0,t.jsx)(d,{data:e.resume}),(0,t.jsxs)("div",{className:"grid gap-8",children:[(0,t.jsx)(u,{data:e.contact}),(0,t.jsx)(f,{data:e.socials})]})]})]})}e.s(["ResumeClient",()=>p],45789)}]);