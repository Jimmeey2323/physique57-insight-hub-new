var ye=Object.defineProperty,ve=Object.defineProperties;var we=Object.getOwnPropertyDescriptors;var ce=Object.getOwnPropertySymbols;var je=Object.prototype.hasOwnProperty,Ne=Object.prototype.propertyIsEnumerable;var de=(a,l,f)=>l in a?ye(a,l,{enumerable:!0,configurable:!0,writable:!0,value:f}):a[l]=f,J=(a,l)=>{for(var f in l||(l={}))je.call(l,f)&&de(a,f,l[f]);if(ce)for(var f of ce(l))Ne.call(l,f)&&de(a,f,l[f]);return a},ee=(a,l)=>ve(a,we(l));import{x as R,r as u,j as e,a7 as ke,y as ue,U as E,T as W,h as te,z as Ce,b as Se,C as De,R as $,ao as Le}from"./react-vendor-BrAkf1Ej.js";import{C as I,c as Q,d as q,ab as H,r as me,s as fe,t as he,u as pe,W as ge,a4 as B}from"./ui-components-_bEsYxhv.js";import{c as Me,d as Te,e as Ke,f as He,g as Ae,h as Pe,i as Ee,j as Be}from"./dashboard-misc-Bo2H3bQp.js";import{j as A,t as xe,h as ae,m as _e,l as Fe,u as re,e as oe,g as Oe,r as Ve,c as V,d as Re,f as ne,k as Ye,v as $e,w as ze}from"./utils-hni-AijI.js";import{G as be,E as Ie}from"./dashboard-executive-BGxMPz5n.js";import{a as Qe}from"./dashboard-sales-nAn7jolY.js";import{F as qe,a as Xe,b as Ge,E as Ue,c as We,d as Ze,e as Je,f as et,g as tt}from"./dashboard-funnel-D50wuPDp.js";import{c as Z,S as le,U as at,a as st}from"./dashboard-classes-CN6A505j.js";import{E as nt,C as rt,a as ot,b as lt,c as it,d as ct,e as dt,f as ut,g as mt,h as ft,i as ht}from"./dashboard-clients-CNAHLONC.js";import{E as pt}from"./dashboard-trainers-1pu3sYhx.js";import{D as gt,a as xt}from"./dashboard-discounts-CmxlrDWw.js";import"./vendor-CTzDTTNf.js";import{a as bt}from"./dashboard-formats-Bew8YI_U.js";const se=u.memo(({title:a,subtitle:l})=>e.jsxs("div",{className:"relative p-6 rounded-xl bg-white/20 backdrop-blur-lg border border-white/30 transform hover:scale-105 transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/20 group",children:[e.jsx("div",{className:"absolute inset-0 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"}),e.jsxs("div",{className:"relative z-10",children:[e.jsx("div",{className:"text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent",children:a}),e.jsx("div",{className:"text-xs text-slate-600 font-medium mt-1",children:l})]}),e.jsx("div",{className:"absolute top-2 right-2 w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-60 animate-pulse"})]})),yt=()=>{const a=R(),{setLoading:l}=A(),{loading:f,error:b,refetch:g}=xe();u.useEffect(()=>{l(f,"Loading dashboard overview...")},[f,l]);const i=u.useCallback(m=>{m==="class-performance-series"?window.open("https://class-performance-series-001.vercel.app/","_blank"):a(m==="late-cancellations"?"/late-cancellations":`/${m}`)},[a]),w=u.useCallback(()=>{g()},[g]);return f?null:b?e.jsx("div",{className:"min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 flex items-center justify-center p-4",children:e.jsx(I,{className:`p-12 ${ae.card.background} backdrop-blur-sm ${ae.card.shadow} ${ae.card.border} rounded-2xl max-w-lg`,children:e.jsxs(Q,{className:"text-center space-y-6",children:[e.jsx(ke,{className:"w-16 h-16 text-red-500 mx-auto"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-xl font-semibold text-slate-800",children:"Connection Error"}),e.jsx("p",{className:"text-sm text-slate-600 mt-2",children:b})]}),e.jsxs(q,{onClick:w,className:"gap-2 bg-slate-800 hover:bg-slate-900 text-white",children:[e.jsx(ue,{className:"w-4 h-4"}),"Retry Connection"]})]})})}):e.jsxs("div",{className:"min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30 relative overflow-hidden",children:[e.jsxs("div",{className:"absolute inset-0 overflow-hidden",children:[e.jsx("div",{className:"absolute inset-0 bg-gradient-to-br from-rose-50/20 via-purple-50/10 to-pink-50/20"}),e.jsx("div",{className:"absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-200/20 to-pink-200/20 rounded-full floating-animation stagger-1"}),e.jsx("div",{className:"absolute top-60 right-20 w-96 h-96 bg-gradient-to-r from-blue-200/15 to-cyan-200/15 rounded-full floating-animation stagger-3"}),e.jsx("div",{className:"absolute bottom-20 left-1/3 w-64 h-64 bg-gradient-to-r from-emerald-200/20 to-teal-200/20 rounded-full floating-animation stagger-5"}),e.jsx("div",{className:"absolute top-32 right-1/4 w-24 h-24 bg-gradient-to-r from-violet-300/30 to-purple-300/30 rounded-full float-gentle stagger-2"}),e.jsx("div",{className:"absolute bottom-40 right-16 w-32 h-32 bg-gradient-to-r from-cyan-300/25 to-blue-300/25 rounded-full float-gentle stagger-4"}),e.jsx("div",{className:"absolute top-3/4 left-20 w-20 h-20 bg-gradient-to-r from-rose-300/35 to-pink-300/35 rounded-full float-gentle stagger-6"}),e.jsx("div",{className:"absolute top-1/4 left-3/4 w-16 h-16 bg-gradient-to-r from-amber-300/40 to-orange-300/40 rounded-full pulse-gentle stagger-1"}),e.jsx("div",{className:"absolute bottom-1/4 left-1/4 w-12 h-12 bg-gradient-to-r from-green-300/45 to-emerald-300/45 rounded-full pulse-gentle stagger-3"}),e.jsx("div",{className:"absolute top-1/2 right-1/3 w-14 h-14 bg-gradient-to-r from-indigo-300/35 to-violet-300/35 rounded-full pulse-gentle stagger-5"}),e.jsx("div",{className:"absolute top-1/3 right-1/4 w-48 h-48 bg-gradient-to-r from-indigo-300/10 to-purple-300/10 morph-shape stagger-2"}),e.jsx("div",{className:"absolute bottom-1/3 left-1/4 w-56 h-56 bg-gradient-to-r from-pink-300/10 to-rose-300/10 morph-shape stagger-4"})]}),e.jsx("div",{className:"relative z-10",children:e.jsxs("div",{className:"container mx-auto px-6 py-8",children:[e.jsxs("header",{className:"mb-8 text-center slide-in-from-left",children:[e.jsx("div",{className:"inline-flex items-center justify-center mb-4",children:e.jsx("div",{className:"bg-gradient-to-r from-slate-800 to-slate-900 text-white px-4 py-2 text-sm font-medium shadow-lg tracking-wide min-w-full w-full fixed top-0 left-0 z-50 rounded-none glass-dark",children:"Business Intelligence Dashboard"})}),e.jsxs("h1",{className:"text-4xl md:text-xl font-light text-slate-900 mb-2 tracking-tight font-serif text-center mb-4 perspective-tilt",children:[e.jsx("span",{className:"font-extralight text-8xl gradient-text-purple",children:"Physique"})," ",e.jsx("span",{className:"font-bold text-9xl animate-dynamic-color",children:"57"}),e.jsx("span",{className:"text-slate-600 font-light text-7xl",children:", India"})]}),e.jsx("p",{className:"text-lg text-slate-600 font-light mb-6 max-w-3xl mx-auto leading-relaxed mt-8 slide-in-right stagger-1",children:"Advanced Business Analytics with Real-time Insights"}),e.jsxs("div",{className:"flex flex-wrap justify-center gap-4 mb-6",children:[e.jsx("div",{className:"glass-card modern-card-hover soft-bounce stagger-1",children:e.jsx(se,{title:"Real-time",subtitle:"Data Insights"})}),e.jsx("div",{className:"glass-card modern-card-hover soft-bounce stagger-2",children:e.jsx(se,{title:"10+",subtitle:"Analytics Modules"})}),e.jsx("div",{className:"glass-card modern-card-hover soft-bounce stagger-3",children:e.jsx(se,{title:"Precision",subtitle:"Data Accuracy"})})]}),e.jsx("div",{className:"w-16 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent mx-auto mb-4 shimmer-effect"})]}),e.jsx("main",{className:"max-w-7xl mx-auto slide-in-from-right stagger-2",children:e.jsx("div",{className:"min-w-full glass-card glow-pulse rounded-2xl p-6",children:e.jsx(Me,{onButtonClick:i})})})]})}),e.jsx(H,{}),e.jsx("style",{children:`
        @keyframes color-cycle {
          0% { color: #3b82f6; }
          25% { color: #ef4444; }
          50% { color: #6366f1; }
          75% { color: #8b5cf6; }
          100% { color: #3b82f6; }
        }
        
        .animate-color-cycle {
          animation: color-cycle 4s infinite ease-in-out;
        }
      `})]})},Xt=Object.freeze(Object.defineProperty({__proto__:null,default:yt},Symbol.toStringTag,{value:"Module"})),vt=()=>e.jsx(be,{children:e.jsxs("div",{className:"min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/20",children:[e.jsx(Ie,{}),e.jsx(H,{})]})}),Gt=Object.freeze(Object.defineProperty({__proto__:null,default:vt},Symbol.toStringTag,{value:"Module"})),wt=()=>{const{data:a}=xe();return e.jsx(be,{children:e.jsxs("div",{className:"min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/20 relative overflow-hidden",children:[e.jsxs("div",{className:"absolute inset-0 overflow-hidden",children:[e.jsx("div",{className:"absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-purple-200/20 to-pink-200/20 rounded-full floating-animation stagger-1"}),e.jsx("div",{className:"absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-r from-blue-200/15 to-cyan-200/15 rounded-full floating-animation stagger-3"}),e.jsx("div",{className:"absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-r from-emerald-200/20 to-teal-200/20 rounded-full morph-shape stagger-2"})]}),e.jsx("div",{className:"relative z-10 slide-in-from-left",children:e.jsx(Qe,{data:a})}),e.jsx(H,{})]})})},Ut=Object.freeze(Object.defineProperty({__proto__:null,default:wt},Symbol.toStringTag,{value:"Module"}));function jt(){const{data:a,loading:l,error:f}=_e(),{setLoading:b}=A(),g=R();u.useEffect(()=>{b(l,"Loading funnel and lead conversion data...")},[l,b]);const[i,w]=u.useState("all"),[m,v]=u.useState(!0),[y,p]=u.useState({isOpen:!1,title:"",data:[],type:""}),N=()=>{const r=new Date,S=new Date(r.getFullYear(),r.getMonth()-1,1),M=new Date(r.getFullYear(),r.getMonth(),0),t=s=>{const x=s.getFullYear(),j=String(s.getMonth()+1).padStart(2,"0"),T=String(s.getDate()).padStart(2,"0");return`${x}-${j}-${T}`};return{start:t(S),end:t(M)}},[c,o]=u.useState(()=>({dateRange:N(),location:[],source:[],stage:[],status:[],associate:[],channel:[],trialStatus:[],conversionStatus:[],retentionStatus:[],minLTV:void 0,maxLTV:void 0})),C=u.useMemo(()=>[{id:"all",name:"All Locations",fullName:"All Locations"},{id:"kwality",name:"Kwality House",fullName:"Kwality House, Kemps Corner"},{id:"supreme",name:"Supreme HQ",fullName:"Supreme HQ, Bandra"},{id:"kenkere",name:"Kenkere House",fullName:"Kenkere House"}],[]),L=u.useMemo(()=>!a||i==="all"?a||[]:a.filter(r=>{var M;const S=((M=r.center)==null?void 0:M.toLowerCase())||"";switch(i){case"kwality":return S.includes("kwality")||S.includes("kemps");case"supreme":return S.includes("supreme")||S.includes("bandra");case"kenkere":return S.includes("kenkere");default:return!0}}),[a,i]),k=u.useMemo(()=>L?L.filter(r=>{if(c.dateRange.start||c.dateRange.end){const S=new Date(r.createdAt);if(c.dateRange.start&&S<new Date(c.dateRange.start)||c.dateRange.end&&S>new Date(c.dateRange.end))return!1}return!(c.location.length>0&&!c.location.some(S=>{var M;return(M=r.center)==null?void 0:M.toLowerCase().includes(S.toLowerCase())})||c.source.length>0&&!c.source.includes(r.source)||c.stage.length>0&&!c.stage.includes(r.stage)||c.status.length>0&&!c.status.includes(r.status)||c.associate.length>0&&!c.associate.includes(r.associate)||c.channel.length>0&&!c.channel.includes(r.channel)||c.trialStatus.length>0&&!c.trialStatus.includes(r.trialStatus)||c.conversionStatus.length>0&&!c.conversionStatus.includes(r.conversionStatus)||c.retentionStatus.length>0&&!c.retentionStatus.includes(r.retentionStatus)||c.minLTV&&r.ltv<c.minLTV||c.maxLTV&&r.ltv>c.maxLTV)}):[],[L,c]),F=u.useMemo(()=>a?{locations:[...new Set(a.map(r=>r.center).filter(Boolean))],sources:[...new Set(a.map(r=>r.source).filter(Boolean))],stages:[...new Set(a.map(r=>r.stage).filter(Boolean))],statuses:[...new Set(a.map(r=>r.status).filter(Boolean))],associates:[...new Set(a.map(r=>r.associate).filter(Boolean))],channels:[...new Set(a.map(r=>r.channel).filter(Boolean))],trialStatuses:[...new Set(a.map(r=>r.trialStatus).filter(Boolean))],conversionStatuses:[...new Set(a.map(r=>r.conversionStatus).filter(Boolean))],retentionStatuses:[...new Set(a.map(r=>r.retentionStatus).filter(Boolean))]}:{locations:[],sources:[],stages:[],statuses:[],associates:[],channels:[],trialStatuses:[],conversionStatuses:[],retentionStatuses:[]},[a]),Y=r=>{o(r)},D=(r,S,M)=>{p({isOpen:!0,title:r,data:S,type:M})};return f?e.jsx("div",{className:"min-h-screen bg-gray-50/30 flex items-center justify-center p-4",children:e.jsx(I,{className:"p-8 bg-white shadow-lg max-w-md",children:e.jsxs(Q,{className:"text-center space-y-4",children:[e.jsx(ue,{className:"w-12 h-12 text-red-600 mx-auto"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-lg font-semibold text-gray-800",children:"Connection Error"}),e.jsx("p",{className:"text-sm text-gray-600 mt-2",children:f==null?void 0:f.toString()})]})]})})}):e.jsxs("div",{className:"min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20",children:[e.jsxs("div",{className:"relative overflow-hidden bg-gradient-to-br from-red-900 via-red-800 to-red-700 text-white",children:[e.jsx("div",{className:"absolute inset-0 bg-black/30"}),e.jsxs("div",{className:"absolute inset-0 overflow-hidden",children:[e.jsx("div",{className:"absolute top-12 left-12 animate-float animate-pulse-neon",style:{animationDuration:"6s",animationDelay:"0s"},children:e.jsx(E,{className:"w-8 h-8 text-yellow-300/80 neon-glow"})}),e.jsx("div",{className:"absolute top-32 right-20 animate-float animate-pulse-neon",style:{animationDuration:"5s",animationDelay:"2s"},children:e.jsx(E,{className:"w-6 h-6 text-amber-200/70 neon-glow"})}),e.jsx("div",{className:"absolute bottom-24 left-32 animate-float animate-pulse-neon",style:{animationDuration:"7s",animationDelay:"1s"},children:e.jsx(E,{className:"w-10 h-10 text-yellow-400/60 neon-glow"})}),e.jsx("div",{className:"absolute top-20 left-1/3 animate-bounce animate-pulse-neon",style:{animationDuration:"4s",animationDelay:"1s"},children:e.jsx(W,{className:"w-12 h-12 text-orange-300/80 neon-glow"})}),e.jsx("div",{className:"absolute bottom-32 right-32 animate-float animate-pulse-neon",style:{animationDuration:"6s",animationDelay:"3s"},children:e.jsx(W,{className:"w-8 h-8 text-yellow-200/70 neon-glow"})}),e.jsx("div",{className:"absolute top-28 right-12 animate-pulse animate-pulse-neon",style:{animationDuration:"3s"},children:e.jsx(te,{className:"w-10 h-10 text-emerald-300/80 neon-glow"})}),e.jsx("div",{className:"absolute bottom-16 left-16 animate-bounce animate-pulse-neon",style:{animationDuration:"5s",animationDelay:"2.5s"},children:e.jsx(te,{className:"w-6 h-6 text-green-200/70 neon-glow"})}),e.jsx("div",{className:"absolute top-16 right-1/3 animate-float animate-pulse-neon",style:{animationDuration:"4.5s",animationDelay:"0.5s"},children:e.jsx(E,{className:"w-7 h-7 text-orange-200/60 neon-glow"})}),e.jsx("div",{className:"absolute bottom-40 left-1/4 animate-pulse animate-pulse-neon",style:{animationDuration:"3.5s",animationDelay:"1.5s"},children:e.jsx(W,{className:"w-9 h-9 text-yellow-300/70 neon-glow"})}),e.jsx("div",{className:"absolute top-2/3 right-1/4 animate-float animate-pulse-neon",style:{animationDuration:"5.5s",animationDelay:"2.8s"},children:e.jsx(te,{className:"w-8 h-8 text-amber-300/60 neon-glow"})}),e.jsx("div",{className:"absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-red-500/30 to-orange-500/20 rounded-full blur-3xl animate-pulse",style:{animationDuration:"8s"}}),e.jsx("div",{className:"absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-red-600/25 to-red-700/15 rounded-full blur-3xl animate-pulse",style:{animationDuration:"10s",animationDelay:"3s"}})]}),e.jsx("div",{className:"relative px-8 py-12",children:e.jsxs("div",{className:"max-w-7xl mx-auto",children:[e.jsx("div",{className:"flex items-center justify-between mb-8",children:e.jsxs(q,{onClick:()=>g("/"),variant:"outline",size:"sm",className:"gap-2 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:border-white/30 transition-all duration-200",children:[e.jsx(Ce,{className:"w-4 h-4"}),"Dashboard"]})}),e.jsxs("div",{className:"text-center space-y-4",children:[e.jsxs("div",{className:"inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 border border-white/20 animate-fade-in-up",children:[e.jsx(W,{className:"w-5 h-5"}),e.jsx("span",{className:"font-medium",children:"Lead Funnel Analysis"})]}),e.jsx("h1",{className:"text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent animate-fade-in-up delay-200",children:"Funnel & Leads"}),e.jsx("p",{className:"text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-300",children:"Comprehensive lead funnel analysis and conversion tracking"}),e.jsxs("div",{className:"flex items-center justify-center gap-8 mt-8 animate-fade-in-up delay-500",children:[e.jsxs("div",{className:"text-center",children:[e.jsx("div",{className:"text-3xl font-bold text-white",children:k.length.toLocaleString()}),e.jsx("div",{className:"text-sm text-blue-200",children:"Total Leads"})]}),e.jsx("div",{className:"w-px h-12 bg-white/30"}),e.jsxs("div",{className:"text-center",children:[e.jsx("div",{className:"text-3xl font-bold text-white",children:k.filter(r=>r.conversionStatus==="Converted").length}),e.jsx("div",{className:"text-sm text-blue-200",children:"Converted"})]}),e.jsx("div",{className:"w-px h-12 bg-white/30"}),e.jsxs("div",{className:"text-center",children:[e.jsxs("div",{className:"text-3xl font-bold text-white",children:[(k.filter(r=>r.conversionStatus==="Converted").length/k.length*100).toFixed(1),"%"]}),e.jsx("div",{className:"text-sm text-blue-200",children:"Conversion Rate"})]})]})]})]})})]}),e.jsx("div",{className:"max-w-7xl mx-auto px-6 py-8 space-y-8",children:e.jsx(I,{className:"bg-white/80 backdrop-blur-sm shadow-xl border-0 overflow-hidden",children:e.jsx(Q,{className:"p-2",children:e.jsxs(me,{value:i,onValueChange:w,className:"w-full",children:[e.jsx(fe,{className:"grid w-full grid-cols-4 bg-gradient-to-r from-slate-100 to-slate-200 p-2 rounded-2xl h-auto gap-2",children:C.map(r=>e.jsx(he,{value:r.id,className:"rounded-xl px-6 py-4 font-semibold text-sm transition-all duration-300",children:e.jsxs("div",{className:"text-center",children:[e.jsx("div",{className:"font-bold",children:r.name}),e.jsx("div",{className:"text-xs opacity-75",children:r.fullName})]})},r.id))}),C.map(r=>e.jsxs(pe,{value:r.id,className:"space-y-8 mt-8",children:[e.jsx(I,{className:"bg-white/90 backdrop-blur-sm shadow-sm border border-gray-200 w-full",children:e.jsxs(Q,{className:"p-6 w-full",children:[e.jsxs("div",{className:"flex items-center justify-between mb-4",children:[e.jsx("h3",{className:"text-lg font-semibold text-gray-800",children:"Advanced Filters"}),e.jsxs(q,{variant:"ghost",size:"sm",onClick:()=>v(!m),className:"gap-2",children:[m?e.jsx(Se,{className:"w-4 h-4"}):e.jsx(De,{className:"w-4 h-4"}),m?"Show Filters":"Hide Filters"]})]}),!m&&e.jsx("div",{className:"w-full",children:e.jsx(qe,{filters:c,onFiltersChange:Y,uniqueValues:F})})]})}),e.jsx(Xe,{data:k,onCardClick:D}),e.jsx(Ge,{data:k}),e.jsx(Ue,{data:k}),e.jsx(We,{data:k,onDrillDown:D}),e.jsx(Ze,{data:L}),e.jsx(Je,{allData:L,onDrillDown:D}),e.jsx(et,{data:k})]},r.id))]})})})}),e.jsx(tt,{isOpen:y.isOpen,onClose:()=>p(r=>ee(J({},r),{isOpen:!1})),title:y.title,data:y.data,type:y.type}),e.jsx("style",{children:`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        
        .animate-float {
          animation: float ease-in-out infinite;
        }
        
        .delay-200 {
          animation-delay: 0.2s;
        }
        
        .delay-300 {
          animation-delay: 0.3s;
        }
        
        .delay-500 {
          animation-delay: 0.5s;
        }
      `})]})}const Wt=Object.freeze(Object.defineProperty({__proto__:null,default:jt},Symbol.toStringTag,{value:"Module"})),Nt=()=>{const{data:a,loading:l}=Fe(),{loading:f}=re(),{data:b,isLoading:g}=oe(),{isLoading:i,setLoading:w}=A();R();const[m,v]=u.useState("All Locations"),[y,p]=u.useState("monthonmonthbytype"),[N,c]=u.useState({isOpen:!1,client:null,title:"",data:null,type:"month"}),[o,C]=u.useState(()=>({dateRange:Oe(),location:[],homeLocation:[],trainer:[],paymentMethod:[],retentionStatus:[],conversionStatus:[],isNew:[],minLTV:void 0,maxLTV:void 0}));u.useEffect(()=>{w(l||f||g,"Analyzing client conversion and retention patterns...")},[l,f,g,w]);const L=u.useMemo(()=>{if(!b||b.length===0)return{};let t=b;m!=="All Locations"&&(t=b.filter(x=>{const j=x.location||"";return m==="Kenkere House, Bengaluru"?j.toLowerCase().includes("kenkere")||j.toLowerCase().includes("bengaluru"):j===m}));const s={};return t.forEach(x=>{if(x.monthYear&&x.totalCustomers){const j=x.monthYear;s[j]=(s[j]||0)+x.totalCustomers}}),s},[b,m]),k=$.useMemo(()=>{const t=["Kwality House, Kemps Corner","Supreme HQ, Bandra","Kenkere House, Bengaluru"],s=new Set;return a.forEach(x=>{x.firstVisitLocation&&t.includes(x.firstVisitLocation)&&s.add(x.firstVisitLocation),x.homeLocation&&t.includes(x.homeLocation)&&s.add(x.homeLocation)}),Array.from(s).filter(Boolean)},[a]),F=$.useMemo(()=>{const t=new Set;return a.forEach(s=>{s.trainerName&&t.add(s.trainerName)}),Array.from(t).filter(Boolean)},[a]),Y=$.useMemo(()=>{const t=new Set;return a.forEach(s=>{s.membershipUsed&&t.add(s.membershipUsed)}),Array.from(t).filter(Boolean)},[a]),D=$.useMemo(()=>{let t=a;if(a.length>0,o.dateRange.start&&o.dateRange.end){const s=o.dateRange.start?new Date(o.dateRange.start+"T00:00:00"):null,x=o.dateRange.end?new Date(o.dateRange.end+"T23:59:59"):null;t=t.filter(j=>{if(!j.firstVisitDate)return!1;const T=Ve(j.firstVisitDate);return T?(T.setHours(0,0,0,0),(!s||T>=s)&&(!x||T<=x)):!1})}return m!=="All Locations"&&(t.length,m==="Kenkere House, Bengaluru"&&([...new Set(t.map(s=>s.firstVisitLocation).filter(Boolean))],[...new Set(t.map(s=>s.homeLocation).filter(Boolean))]),t=t.filter(s=>{const x=s.firstVisitLocation||"",j=s.homeLocation||"";if(m==="Kenkere House, Bengaluru"){const T=x.toLowerCase().includes("kenkere")||x.toLowerCase().includes("bengaluru")||x==="Kenkere House",K=j.toLowerCase().includes("kenkere")||j.toLowerCase().includes("bengaluru")||j==="Kenkere House";return T||K}return x===m||j===m})),o.location.length>0&&(t=t.filter(s=>o.location.includes(s.firstVisitLocation||"")||o.location.includes(s.homeLocation||""))),o.trainer.length>0&&(t=t.filter(s=>o.trainer.includes(s.trainerName||""))),o.conversionStatus.length>0&&(t=t.filter(s=>o.conversionStatus.includes(s.conversionStatus||""))),o.retentionStatus.length>0&&(t=t.filter(s=>o.retentionStatus.includes(s.retentionStatus||""))),o.paymentMethod.length>0&&(t=t.filter(s=>o.paymentMethod.includes(s.paymentMethod||""))),o.isNew.length>0&&(t=t.filter(s=>o.isNew.includes(s.isNew||""))),o.minLTV!==void 0&&(t=t.filter(s=>(s.ltv||0)>=o.minLTV)),o.maxLTV!==void 0&&(t=t.filter(s=>(s.ltv||0)<=o.maxLTV)),t},[a,m,o]),r=$.useMemo(()=>{let t=a;return m!=="All Locations"&&(t.length,t=t.filter(s=>{const x=s.firstVisitLocation||"",j=s.homeLocation||"";if(m==="Kenkere House, Bengaluru"){const T=x.toLowerCase().includes("kenkere")||x.toLowerCase().includes("bengaluru")||x==="Kenkere House",K=j.toLowerCase().includes("kenkere")||j.toLowerCase().includes("bengaluru")||j==="Kenkere House";return T||K}return x===m||j===m})),o.location.length>0&&(t=t.filter(s=>o.location.includes(s.firstVisitLocation||"")||o.location.includes(s.homeLocation||""))),o.trainer.length>0&&(t=t.filter(s=>o.trainer.includes(s.trainerName||""))),o.conversionStatus.length>0&&(t=t.filter(s=>o.conversionStatus.includes(s.conversionStatus||""))),o.retentionStatus.length>0&&(t=t.filter(s=>o.retentionStatus.includes(s.retentionStatus||""))),o.paymentMethod.length>0&&(t=t.filter(s=>o.paymentMethod.includes(s.paymentMethod||""))),o.isNew.length>0&&(t=t.filter(s=>o.isNew.includes(s.isNew||""))),o.minLTV!==void 0&&(t=t.filter(s=>(s.ltv||0)>=o.minLTV)),o.maxLTV!==void 0&&(t=t.filter(s=>(s.ltv||0)<=o.maxLTV)),t},[a,m,o]),S=u.useMemo(()=>!D||D.length===0?[]:[{key:"Kwality House, Kemps Corner",name:"Kwality"},{key:"Supreme HQ, Bandra",name:"Supreme"},{key:"Kenkere House, Bengaluru",name:"Kenkere"}].map(s=>{const j=D.filter(T=>{const K=T.firstVisitLocation||"",d=T.homeLocation||"";return s.key==="Kenkere House, Bengaluru"?K.toLowerCase().includes("kenkere")||K.toLowerCase().includes("bengaluru")||K==="Kenkere House"||d.toLowerCase().includes("kenkere")||d.toLowerCase().includes("bengaluru")||d==="Kenkere House":K===s.key||d===s.key}).length;return{location:s.name,label:"Filtered Clients",value:V(j)}}),[D]),M=e.jsx(ge,{newClientData:D,defaultFileName:`client-conversion-${m.replace(/\s+/g,"-").toLowerCase()}`,size:"sm",variant:"ghost"});return e.jsxs("div",{className:"min-h-screen bg-white relative overflow-hidden",children:[e.jsxs("div",{className:"absolute inset-0 overflow-hidden",children:[e.jsx("div",{className:"absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full floating-animation stagger-1"}),e.jsx("div",{className:"absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full floating-animation stagger-3"}),e.jsx("div",{className:"absolute top-1/2 left-1/3 w-72 h-72 bg-gradient-to-r from-cyan-500/10 to-teal-500/10 rounded-full morph-shape stagger-2"})]}),e.jsxs("div",{className:"relative z-10",children:[e.jsx("div",{className:"bg-white text-slate-800 slide-in-from-left",children:e.jsx(B,{title:"Client Conversion & Retention",subtitle:"Comprehensive client acquisition and retention analysis across all customer touchpoints",variant:"client",metrics:S,exportButton:M})}),e.jsxs("div",{className:"container mx-auto px-6 py-8 bg-white min-h-screen",children:[e.jsxs("main",{className:"space-y-8 slide-in-from-right stagger-1",children:[e.jsx("div",{className:"glass-card modern-card-hover p-6 rounded-2xl",children:e.jsx(nt,{filters:o,onFiltersChange:C,locations:k,trainers:F,membershipTypes:Y})}),e.jsx("div",{className:"flex justify-center mb-8",children:e.jsxs("div",{className:"glass-card glow-pulse p-2 rounded-2xl shadow-lg border border-white/30 grid grid-cols-4 w-full max-w-4xl",children:[e.jsxs("button",{onClick:()=>v("All Locations"),className:Z("px-6 py-3 rounded-xl transition-all duration-500 font-medium text-sm flex flex-col items-center gap-2 transform hover:scale-105",m==="All Locations"?"bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl":"text-slate-800 hover:text-slate-700 hover:bg-white/20 backdrop-blur-sm"),children:[e.jsx(E,{className:"w-6 h-6"}),e.jsxs("div",{className:"text-center",children:[e.jsx("div",{className:"font-bold",children:"All Locations"}),e.jsxs("div",{className:"text-xs opacity-80",children:["(",a.length,")"]})]})]}),e.jsxs("button",{onClick:()=>v("Kwality House, Kemps Corner"),className:Z("px-6 py-3 rounded-xl transition-all duration-500 font-medium text-sm flex flex-col items-center gap-2 transform hover:scale-105",m==="Kwality House, Kemps Corner"?"bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl":"text-slate-800 hover:text-slate-700 hover:bg-white/20 backdrop-blur-sm"),children:[e.jsx(E,{className:"w-6 h-6"}),e.jsxs("div",{className:"text-center",children:[e.jsx("div",{className:"font-bold",children:"Kwality House"}),e.jsxs("div",{className:"text-xs opacity-80",children:["Kemps Corner (",a.filter(t=>t.firstVisitLocation==="Kwality House, Kemps Corner"||t.homeLocation==="Kwality House, Kemps Corner").length,")"]})]})]}),e.jsxs("button",{onClick:()=>v("Supreme HQ, Bandra"),className:Z("px-6 py-3 rounded-xl transition-all duration-500 font-medium text-sm flex flex-col items-center gap-2 transform hover:scale-105",m==="Supreme HQ, Bandra"?"bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl":"text-slate-800 hover:text-slate-700 hover:bg-white/20 backdrop-blur-sm"),children:[e.jsx(E,{className:"w-6 h-6"}),e.jsxs("div",{className:"text-center",children:[e.jsx("div",{className:"font-bold",children:"Supreme HQ"}),e.jsxs("div",{className:"text-xs opacity-80",children:["Bandra (",a.filter(t=>t.firstVisitLocation==="Supreme HQ, Bandra"||t.homeLocation==="Supreme HQ, Bandra").length,")"]})]})]}),e.jsxs("button",{onClick:()=>v("Kenkere House, Bengaluru"),className:Z("px-6 py-3 rounded-xl transition-all duration-500 font-medium text-sm flex flex-col items-center gap-2 transform hover:scale-105",m==="Kenkere House"?"bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl":"text-slate-800 hover:text-slate-700 hover:bg-white/20 backdrop-blur-sm"),children:[e.jsx(E,{className:"w-6 h-6"}),e.jsxs("div",{className:"text-center",children:[e.jsx("div",{className:"font-bold",children:"Kenkere House"}),e.jsxs("div",{className:"text-xs opacity-80",children:["Bengaluru (",a.filter(t=>{const s=(t.firstVisitLocation||"").toLowerCase(),x=(t.homeLocation||"").toLowerCase();return s.includes("kenkere")||x.includes("kenkere")||s.includes("bengaluru")||x.includes("bengaluru")||t.firstVisitLocation==="Kenkere House"||t.homeLocation==="Kenkere House"}).length,")"]})]})]})]})}),e.jsx("div",{className:"glass-card modern-card-hover rounded-2xl p-6 soft-bounce stagger-2",children:e.jsx(rt,{data:D,onCardClick:(t,s,x)=>c({isOpen:!0,client:null,title:`${t} - Detailed Analysis`,data:{clients:s,metricType:x},type:"metric"})})}),e.jsx("div",{className:"glass-card modern-card-hover rounded-2xl p-6 slide-in-right stagger-3",children:e.jsx(ot,{data:D})}),e.jsx("div",{className:"space-y-4 slide-in-left stagger-4",children:e.jsx("div",{className:"glass-card rounded-2xl border-0 shadow-lg",children:e.jsxs("details",{className:"group",children:[e.jsx("summary",{className:"cursor-pointer p-6 font-semibold text-slate-800 border-b border-white/20 group-open:bg-gradient-to-r group-open:from-purple-50/50 group-open:to-pink-50/50 rounded-t-2xl transition-all duration-300",children:"📊 Interactive Charts & Visualizations"}),e.jsx("div",{className:"p-6 bg-gradient-to-br from-white to-slate-50/50",children:e.jsx(lt,{data:D})})]})})}),e.jsx("div",{className:"glass-card modern-card-hover rounded-2xl p-6 slide-in-right stagger-5",children:e.jsx(it,{activeTable:y,onTableChange:p,dataLength:D.length})}),e.jsxs("div",{className:"space-y-8",children:[y==="monthonmonthbytype"&&e.jsx(ct,{data:D,visitsSummary:L,onRowClick:t=>c({isOpen:!0,client:null,title:`${t.month} - ${t.type} Analysis`,data:t,type:"month"})}),y==="monthonmonth"&&e.jsx(dt,{data:r,visitsSummary:L,onRowClick:t=>c({isOpen:!0,client:null,title:`${t.month} Analysis`,data:t,type:"month"})}),y==="yearonyear"&&e.jsx(ut,{data:r,visitsSummary:L,onRowClick:t=>c({isOpen:!0,client:null,title:`${t.month} Year Comparison`,data:t,type:"year"})}),y==="hostedclasses"&&e.jsx(mt,{data:D,onRowClick:t=>c({isOpen:!0,client:null,title:`${t.className} - ${t.month}`,data:t,type:"class"})}),y==="memberships"&&e.jsx(ft,{data:D})]})]}),e.jsx(ht,{isOpen:N.isOpen,onClose:()=>c({isOpen:!1,client:null,title:"",data:null,type:"month"}),title:N.title,data:N.data,type:N.type})]})]}),e.jsx(H,{}),e.jsx("style",{children:`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        
        .delay-200 {
          animation-delay: 0.2s;
        }
        
        .delay-300 {
          animation-delay: 0.3s;
        }
        
        .delay-500 {
          animation-delay: 0.5s;
        }
      `})]})},Zt=Object.freeze(Object.defineProperty({__proto__:null,default:Nt},Symbol.toStringTag,{value:"Module"})),kt=()=>{const{data:a,isLoading:l}=oe(),{isLoading:f,setLoading:b}=A();u.useEffect(()=>{b(l,"Analyzing trainer performance metrics and insights...")},[l,b]);const g=u.useMemo(()=>!a||a.length===0?[]:[{key:"Kwality House, Kemps Corner",name:"Kwality"},{key:"Supreme HQ, Bandra",name:"Supreme"},{key:"Kenkere House",name:"Kenkere"}].map(w=>{const v=a.filter(y=>{var p;return w.key==="Kenkere House"?((p=y.location)==null?void 0:p.includes("Kenkere"))||y.location==="Kenkere House":y.location===w.key}).reduce((y,p)=>y+(p.cycleSessions||0),0);return{location:w.name,label:"Total Sessions",value:v.toString()}}),[a]);return f?null:e.jsxs("div",{className:"min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20",children:[e.jsx(B,{title:"Trainer Performance Analytics",subtitle:"Comprehensive trainer performance metrics, insights, and development opportunities",variant:"trainer",metrics:g,onExport:()=>{}}),e.jsx("div",{className:"container mx-auto px-6 py-8",children:e.jsx("main",{className:"space-y-8",children:e.jsx(pt,{})})}),e.jsx(H,{})]})},Jt=Object.freeze(Object.defineProperty({__proto__:null,default:kt},Symbol.toStringTag,{value:"Module"})),Ct=()=>{const{data:a}=re(),l=Re(a||[]),f=u.useMemo(()=>{if(!l||l.length===0)return[];const b=l.length,g=l.reduce((p,N)=>p+(N.checkedInCount||0),0);l.reduce((p,N)=>p+(N.capacity||0),0);const i=l.reduce((p,N)=>p+(N.totalPaid||0),0),w=b>0?g/b:0,m=[...new Set(l.map(p=>p.location))].filter(Boolean),v=[...new Set(l.map(p=>p.cleanedClass))].filter(Boolean),y=[...new Set(l.map(p=>p.trainerName))].filter(Boolean);return[{location:"Sessions",label:"Total Sessions",value:V(b),subValue:`${v.length} classes`},{location:"Attendance",label:"Total Attendance",value:V(g),subValue:`${V(w)} avg/class`},{location:"Revenue",label:"Earned Revenue",value:ne(i),subValue:`${ne(i/b)} avg/session`},{location:"Coverage",label:"Locations & Trainers",value:`${m.length} locations`,subValue:`${y.length} trainers`}]},[l]);return e.jsxs("div",{className:"min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/20",children:[e.jsx(B,{title:"Class Attendance Analytics",subtitle:"Comprehensive class utilization and attendance trend analysis across all sessions",variant:"attendance",metrics:f,onExport:()=>{}}),e.jsx("div",{className:"container mx-auto px-6 py-8",children:e.jsx(at,{})}),e.jsx(H,{})]})},St=()=>e.jsx(le,{children:e.jsx(Ct,{})}),ea=Object.freeze(Object.defineProperty({__proto__:null,default:St},Symbol.toStringTag,{value:"Module"})),Dt=()=>{R();const{setLoading:a}=A(),{data:l,loading:f,error:b}=Ye(),g=u.useMemo(()=>l?l.map(i=>{var c;const w=o=>{if(o==null||o==="")return 0;const C=o.toString().replace(/[₹,\s]/g,""),L=parseFloat(C);return isNaN(L)?0:L},m=w(i.discountAmount||i["Discount Amount -Mrp- Payment Value"]||0),v=w(i.discountPercentage||i["Discount Percentage - discount amount/mrp*100"]||0),y=w(i.paymentValue||i["Payment Value"]||0),p=w(i.mrpPreTax||i["Mrp - Pre Tax"]||0),N=w(i.mrpPostTax||i["Mrp - Post Tax"]||0);return ee(J({},i),{memberId:i.memberId||((c=i["Member ID"])==null?void 0:c.toString())||"",customerName:i.customerName||i["Customer Name"]||"",customerEmail:i.customerEmail||i["Customer Email"]||"",paymentDate:i.paymentDate||i["Payment Date"]||"",paymentValue:y,paymentMethod:i.paymentMethod||i["Payment Method"]||"",calculatedLocation:i.calculatedLocation||i["Calculated Location"]||"",cleanedProduct:i.cleanedProduct||i["Cleaned Product"]||"",cleanedCategory:i.cleanedCategory||i["Cleaned Category"]||"",soldBy:i.soldBy==="-"?"Online/System":i.soldBy||i["Sold By"]||"Unknown",discountAmount:m,discountPercentage:v,mrpPreTax:p,mrpPostTax:N,hasDiscount:m>0||v>0})}):[],[l]);return u.useMemo(()=>{if(!g||g.length===0)return[];const i=new Date,w=new Date(i.getFullYear(),i.getMonth()-1,1),m=new Date(i.getFullYear(),i.getMonth(),0),v=g.filter(p=>{if(!p.paymentDate)return!1;const N=new Date(p.paymentDate);return N>=w&&N<=m});return[{key:"Kwality House, Kemps Corner",name:"Kwality"},{key:"Supreme HQ, Bandra",name:"Supreme"},{key:"Kenkere House",name:"Kenkere"}].map(p=>{const c=v.filter(o=>{var C;return p.key==="Kenkere House"?((C=o.calculatedLocation)==null?void 0:C.includes("Kenkere"))||o.calculatedLocation==="Kenkere House":o.calculatedLocation===p.key}).reduce((o,C)=>o+(C.discountAmount||0),0);return{location:p.name,label:"Previous Month Discounts",value:ne(c)}})},[g]),u.useEffect(()=>{a(f,"Loading discount and promotional analysis...")},[f,a]),b?e.jsx("div",{className:"min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-amber-50/20",children:e.jsx("div",{className:"flex items-center justify-center min-h-screen p-4",children:e.jsxs("div",{className:"text-center",children:[e.jsx("h1",{className:"text-2xl font-bold text-red-600 mb-4",children:"Connection Error"}),e.jsx("p",{className:"text-gray-600 mb-4",children:b}),e.jsx("button",{onClick:()=>window.location.reload(),className:"bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700",children:"Retry Loading"})]})})}):e.jsxs("div",{className:"min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-amber-50/20",children:[e.jsx(gt,{data:g}),e.jsx("div",{className:"container mx-auto px-6 py-8",children:e.jsx("main",{className:"space-y-8",children:e.jsx(xt,{data:g})})}),e.jsx(H,{}),e.jsx("style",{children:`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes bounce-slow {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-15px);
          }
          60% {
            transform: translateY(-8px);
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.08);
          }
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          33% {
            transform: translateY(-12px) translateX(4px);
          }
          66% {
            transform: translateY(-6px) translateX(-4px);
          }
        }
        
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1) rotate(0deg);
          }
          25% {
            opacity: 0.9;
            transform: scale(1.3) rotate(90deg);
          }
          75% {
            opacity: 0.6;
            transform: scale(0.8) rotate(270deg);
          }
        }
        
        @keyframes drift-left {
          0%, 100% {
            transform: translateX(0px) translateY(0px);
          }
          50% {
            transform: translateX(-20px) translateY(-10px);
          }
        }
        
        @keyframes drift-right {
          0%, 100% {
            transform: translateX(0px) translateY(0px);
          }
          50% {
            transform: translateX(20px) translateY(-10px);
          }
        }
        
        @keyframes gentle-float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        
        @keyframes gentle-bounce {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-6px);
          }
        }
        
        @keyframes gentle-pulse {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.1);
          }
        }
        
        @keyframes gentle-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes gentle-drift {
          0%, 100% {
            transform: translateX(0px);
          }
          50% {
            transform: translateX(10px);
          }
        }
        
        @keyframes gentle-wave {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-5px) rotate(180deg);
          }
        }
        
        @keyframes gentle-bob {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          33% {
            transform: translateY(-4px) translateX(2px);
          }
          66% {
            transform: translateY(-2px) translateX(-2px);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 5s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }
        
        .animate-drift-left {
          animation: drift-left 6s ease-in-out infinite;
        }
        
        .animate-drift-right {
          animation: drift-right 6s ease-in-out infinite;
        }
        
        .animate-gentle-float {
          animation: gentle-float 3s ease-in-out infinite;
        }
        
        .animate-gentle-bounce {
          animation: gentle-bounce 2.5s ease-in-out infinite;
        }
        
        .animate-gentle-pulse {
          animation: gentle-pulse 4s ease-in-out infinite;
        }
        
        .animate-gentle-spin {
          animation: gentle-spin 20s linear infinite;
        }
        
        .animate-gentle-drift {
          animation: gentle-drift 5s ease-in-out infinite;
        }
        
        .animate-gentle-wave {
          animation: gentle-wave 4s ease-in-out infinite;
        }
        
        .animate-gentle-bob {
          animation: gentle-bob 3.5s ease-in-out infinite;
        }
        
        .animate-bounce-delayed {
          animation: bounce-slow 4s ease-in-out infinite;
          animation-delay: 0.8s;
        }
        
        .animate-pulse-delayed {
          animation: pulse-slow 5s ease-in-out infinite;
          animation-delay: 1.2s;
        }
        
        .animate-float-delayed {
          animation: float 4s ease-in-out infinite;
          animation-delay: 2s;
        }
        
        /* Enhanced Glow effects */
        .glow-purple {
          filter: drop-shadow(0 0 25px rgba(168, 85, 247, 0.6)) drop-shadow(0 0 50px rgba(168, 85, 247, 0.3));
        }
        
        .glow-blue {
          filter: drop-shadow(0 0 25px rgba(59, 130, 246, 0.6)) drop-shadow(0 0 50px rgba(59, 130, 246, 0.3));
        }
        
        .glow-pink {
          filter: drop-shadow(0 0 25px rgba(236, 72, 153, 0.6)) drop-shadow(0 0 50px rgba(236, 72, 153, 0.3));
        }
        
        .glow-green {
          filter: drop-shadow(0 0 25px rgba(34, 197, 94, 0.6)) drop-shadow(0 0 50px rgba(34, 197, 94, 0.3));
        }
        
        .glow-yellow {
          filter: drop-shadow(0 0 25px rgba(234, 179, 8, 0.6)) drop-shadow(0 0 50px rgba(234, 179, 8, 0.3));
        }
        
        .glow-indigo {
          filter: drop-shadow(0 0 25px rgba(99, 102, 241, 0.6)) drop-shadow(0 0 50px rgba(99, 102, 241, 0.3));
        }
        
        .glow-orange {
          filter: drop-shadow(0 0 25px rgba(249, 115, 22, 0.6)) drop-shadow(0 0 50px rgba(249, 115, 22, 0.3));
        }
        
        .glow-cyan {
          filter: drop-shadow(0 0 20px rgba(6, 182, 212, 0.5));
        }
        
        .glow-rose {
          filter: drop-shadow(0 0 20px rgba(244, 63, 94, 0.5));
        }
        
        .glow-emerald {
          filter: drop-shadow(0 0 20px rgba(16, 185, 129, 0.5));
        }
        
        .glow-violet {
          filter: drop-shadow(0 0 20px rgba(139, 69, 228, 0.5));
        }
        
        .glow-amber {
          filter: drop-shadow(0 0 20px rgba(245, 158, 11, 0.5));
        }
        
        .glow-teal {
          filter: drop-shadow(0 0 15px rgba(20, 184, 166, 0.4));
        }
        
        .glow-fuchsia {
          filter: drop-shadow(0 0 15px rgba(217, 70, 239, 0.4));
        }
        
        .glow-lime {
          filter: drop-shadow(0 0 15px rgba(132, 204, 22, 0.4));
        }
        
        .glow-sky {
          filter: drop-shadow(0 0 15px rgba(14, 165, 233, 0.4));
        }
        
        .glow-red {
          filter: drop-shadow(0 0 15px rgba(239, 68, 68, 0.4));
        }
        
        .glow-blue-light {
          filter: drop-shadow(0 0 12px rgba(147, 197, 253, 0.3));
        }
        
        .glow-purple-light {
          filter: drop-shadow(0 0 12px rgba(196, 181, 253, 0.3));
        }
        
        .delay-200 {
          animation-delay: 0.2s;
        }
        
        .delay-300 {
          animation-delay: 0.3s;
        }
        
        .delay-500 {
          animation-delay: 0.5s;
        }
      `})]})},ta=Object.freeze(Object.defineProperty({__proto__:null,default:Dt},Symbol.toStringTag,{value:"Module"})),Lt=()=>{const{data:a,loading:l}=re(),{setLoading:f}=A();u.useEffect(()=>{f(l,"Loading session analytics...")},[l,f]);const b=u.useMemo(()=>!a||a.length===0?[]:[{key:"Kwality House, Kemps Corner",name:"Kwality"},{key:"Supreme HQ, Bandra",name:"Supreme"},{key:"Kenkere House",name:"Kenkere"}].map(i=>{const m=a.filter(v=>{var y;return i.key==="Kenkere House"?((y=v.location)==null?void 0:y.includes("Kenkere"))||v.location==="Kenkere House":v.location===i.key}).reduce((v,y)=>v+(y.checkedInCount||0),0);return{location:i.name,label:"Total Check-ins",value:V(m)}}),[a]);return e.jsx(le,{children:e.jsxs("div",{className:"min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-red-50/20",children:[e.jsx(B,{title:"Sessions Analytics",subtitle:"Comprehensive analysis of class sessions, attendance patterns, and performance insights",variant:"sessions",metrics:b,onExport:()=>{}}),e.jsx("main",{children:e.jsx(st,{})}),e.jsx(H,{})]})})},aa=Object.freeze(Object.defineProperty({__proto__:null,default:Lt},Symbol.toStringTag,{value:"Module"})),Mt=()=>{const{data:a,isLoading:l}=oe(),{isLoading:f,setLoading:b}=A();return u.useEffect(()=>{l!==void 0&&b(l,"Loading PowerCycle vs Barre vs Strength performance data...")},[l,b]),e.jsxs("div",{className:"min-h-screen bg-gradient-to-br from-slate-50 via-violet-50/30 to-purple-50/20",children:[e.jsx(B,{title:"PowerCycle vs Barre vs Strength",subtitle:"Comprehensive analysis of PowerCycle, Barre, and Strength Lab class performance",variant:"powercycle",onExport:()=>{}}),e.jsx("div",{className:"container mx-auto px-6 py-8",children:e.jsx("main",{className:"space-y-8",children:e.jsx(le,{children:e.jsx(bt,{data:a||[]})})})}),e.jsx(H,{})]})},sa=Object.freeze(Object.defineProperty({__proto__:null,default:Mt},Symbol.toStringTag,{value:"Module"})),Tt=()=>{const{data:a,loading:l,error:f}=$e(),{setLoading:b}=A();return R(),u.useEffect(()=>{b(l,"Loading expirations and churn data...")},[l,b]),f?e.jsx("div",{className:"min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/20 flex items-center justify-center",children:e.jsxs("div",{className:"text-center space-y-4 max-w-lg",children:[e.jsx("h1",{className:"text-2xl font-bold text-red-600",children:"Data Access Issue"}),e.jsx("p",{className:"text-slate-600",children:f}),f.includes("Failed to fetch")&&e.jsxs("div",{className:"bg-amber-50 border border-amber-200 rounded-lg p-4 text-left",children:[e.jsx("h3",{className:"font-semibold text-amber-800 mb-2",children:"Development Environment Note:"}),e.jsxs("p",{className:"text-sm text-amber-700",children:["This appears to be a CORS/network restriction in the development environment. The integration is correctly configured for the spreadsheet:",e.jsx("br",{}),e.jsx("code",{className:"text-xs bg-amber-100 px-2 py-1 rounded mt-1 inline-block",children:"1rGMDDvvTbZfNg1dueWtRN3LhOgGQOdLg3Fd7Sn1GCZo"}),e.jsx("br",{}),e.jsx("br",{}),"In a production environment with proper CORS configuration, this should work correctly."]})]}),e.jsx(q,{onClick:()=>window.location.reload(),children:"Retry"})]})}):e.jsxs("div",{className:"min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/20",children:[e.jsx(B,{title:"Expirations & Churn",subtitle:"Comprehensive analysis of membership expirations and customer retention insights",variant:"expiration",onExport:()=>{}}),e.jsx("div",{className:"container mx-auto px-6 py-8",children:e.jsx("main",{className:"space-y-8",children:e.jsx(Te,{data:a||[]})})}),e.jsx(H,{})]})},na=Object.freeze(Object.defineProperty({__proto__:null,default:Tt},Symbol.toStringTag,{value:"Module"})),Kt=()=>{const{data:a,loading:l}=ze(),{isLoading:f,setLoading:b}=A();R();const[g,i]=u.useState("all"),[w,m]=u.useState("prev-month"),[v,y]=u.useState("all"),[p,N]=u.useState("all"),[c,o]=u.useState("all"),[C,L]=u.useState("all"),[k,F]=u.useState({start:"",end:""}),[Y,D]=u.useState(null),[r,S]=u.useState(!1),M=u.useMemo(()=>{if(!Array.isArray(a))return[];const d=Array.from(new Set(a.map(n=>n==null?void 0:n.location).filter(Boolean)));return[{id:"all",name:"All Locations"},{id:"kwality",name:"Kwality House"},{id:"supreme",name:"Supreme HQ"},{id:"kenkere",name:"Kenkere House"}].filter(n=>n.id==="all"||d.some(h=>n.id==="kwality"?h.includes("Kwality"):n.id==="supreme"?h.includes("Supreme"):n.id==="kenkere"?h.includes("Kenkere"):!1))},[a]),t=u.useMemo(()=>{if(!Array.isArray(a))return[];let d=a;if(g!=="all"&&(d=d.filter(n=>{const h=(n==null?void 0:n.location)||"";return g==="kwality"?h.includes("Kwality"):g==="supreme"?h.includes("Supreme"):g==="kenkere"?h.includes("Kenkere"):!0})),v!=="all"&&(d=d.filter(n=>(n==null?void 0:n.teacherName)===v)),p!=="all"&&(d=d.filter(n=>(n==null?void 0:n.cleanedClass)===p)),c!=="all"&&(d=d.filter(n=>(n==null?void 0:n.cleanedProduct)===c)),C!=="all"&&(d=d.filter(n=>{if(!(n!=null&&n.time))return!1;const h=parseInt(n.time.split(":")[0]);switch(C){case"morning":return h>=6&&h<12;case"afternoon":return h>=12&&h<17;case"evening":return h>=17&&h<22;case"late":return h>=22||h<6;default:return!0}})),w!=="all"){const n=new Date;let h=new Date,X=new Date;switch(w){case"1w":h.setDate(n.getDate()-7);break;case"2w":h.setDate(n.getDate()-14);break;case"1m":h.setMonth(n.getMonth()-1);break;case"prev-month":const P=new Date(n.getFullYear(),n.getMonth()-1,1),_=new Date(n.getFullYear(),n.getMonth(),0);return h=P,X=_,d=d.filter(O=>{if(!(O!=null&&O.dateIST))return!1;const G=new Date(O.dateIST);return G>=h&&G<=X}),d;case"3m":h.setMonth(n.getMonth()-3);break;case"6m":h.setMonth(n.getMonth()-6);break;case"1y":h.setFullYear(n.getFullYear()-1);break;case"custom":if(k.start||k.end){const O=k.start?new Date(k.start):new Date("2020-01-01"),G=k.end?new Date(k.end):n;d=d.filter(U=>{if(!(U!=null&&U.dateIST))return!1;const ie=new Date(U.dateIST);return ie>=O&&ie<=G})}return d;default:return d}d=d.filter(P=>{if(!(P!=null&&P.dateIST))return!1;const _=new Date(P.dateIST);return _>=h&&_<=n})}return d},[a,g,w,v,p,c,C,k]),s=()=>{m("prev-month"),y("all"),N("all"),o("all"),L("all"),F({start:"",end:""})},x=d=>{D(d),S(!0)},j=u.useMemo(()=>{if(!Array.isArray(a))return[];let d=a;return g!=="all"&&(d=d.filter(n=>{const h=(n==null?void 0:n.location)||"";return g==="kwality"?h.includes("Kwality"):g==="supreme"?h.includes("Supreme"):g==="kenkere"?h.includes("Kenkere"):!0})),v!=="all"&&(d=d.filter(n=>(n==null?void 0:n.teacherName)===v)),p!=="all"&&(d=d.filter(n=>(n==null?void 0:n.cleanedClass)===p)),c!=="all"&&(d=d.filter(n=>(n==null?void 0:n.cleanedProduct)===c)),C!=="all"&&(d=d.filter(n=>{if(!(n!=null&&n.time))return!1;const h=parseInt(n.time.split(":")[0]);switch(C){case"morning":return h>=6&&h<12;case"afternoon":return h>=12&&h<17;case"evening":return h>=17&&h<22;case"late":return h>=22||h<6;default:return!0}})),d},[a,g,v,p,c,C]),T=u.useMemo(()=>!t||t.length===0?[]:[{key:"Kwality",name:"Kwality"},{key:"Supreme",name:"Supreme"},{key:"Kenkere",name:"Kenkere"}].map(n=>{const X=t.filter(P=>{var _;return(_=P.location)==null?void 0:_.includes(n.key)}).length;return{location:n.name,label:"Filtered Cancellations",value:V(X)}}),[t]);u.useEffect(()=>{b(l,"Loading late cancellations data...")},[l,b]);const K=e.jsx(ge,{lateCancellationsData:t,defaultFileName:`late-cancellations-${g}`,size:"sm",variant:"ghost"});return e.jsxs("div",{className:"min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/20",children:[e.jsx(B,{title:"Late Cancellations",subtitle:"Comprehensive analysis of late cancellation patterns across locations, classes, trainers, and products",variant:"cancellations",metrics:T,exportButton:K}),e.jsx("div",{className:"relative",children:e.jsx("div",{className:"container mx-auto px-6 py-8",children:e.jsxs(me,{value:g,onValueChange:i,className:"w-full mb-8",children:[e.jsx("div",{className:"flex justify-center mb-8",children:e.jsx(fe,{className:"bg-white/90 backdrop-blur-sm p-2 rounded-2xl shadow-xl border-0 grid w-full max-w-4xl min-h-16 overflow-hidden",style:{gridTemplateColumns:`repeat(${M.length}, 1fr)`},children:M.map(d=>e.jsx(he,{value:d.id,className:"relative px-4 py-3 font-semibold text-gray-800 transition-all duration-300 ease-out hover:scale-105 data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-600 data-[state=active]:to-pink-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-gray-50 text-sm rounded-xl",children:d.name},d.id))})}),M.map(d=>e.jsx(pe,{value:d.id,className:"space-y-8",children:e.jsxs("div",{className:"space-y-8",children:[e.jsx(Ke,{selectedLocation:"all",onLocationChange:()=>{},selectedTimeframe:w,onTimeframeChange:m,selectedTrainer:v,onTrainerChange:y,selectedClass:p,onClassChange:N,selectedProduct:c,onProductChange:o,selectedTimeSlot:C,onTimeSlotChange:L,dateRange:k,onDateRangeChange:F,data:a,onClearFilters:s}),e.jsx(He,{data:t,onMetricClick:x}),e.jsx(Ae,{data:j}),e.jsx(Pe,{data:t}),e.jsx(Ee,{data:t,onDrillDown:x})]})},d.id))]})})}),e.jsx(Be,{isOpen:r,onClose:()=>S(!1),data:Y}),e.jsx(H,{})]})},ra=Object.freeze(Object.defineProperty({__proto__:null,default:Kt},Symbol.toStringTag,{value:"Module"})),z=[{key:"sales",title:"Sales Analytics",subtitle:"Comprehensive sales performance insights with advanced metrics and forecasting"},{key:"client",title:"Client Management",subtitle:"Track client engagement, retention rates, and conversion analytics in real-time"},{key:"trainer",title:"Trainer Performance",subtitle:"Monitor trainer effectiveness, client satisfaction, and performance metrics"},{key:"sessions",title:"Session Analytics",subtitle:"Detailed session attendance, booking patterns, and utilization insights"},{key:"discounts",title:"Promotions Hub",subtitle:"Analyze discount effectiveness, promotional campaigns, and pricing strategies"},{key:"funnel",title:"Leads & Funnel",subtitle:"Conversion funnel analysis, lead tracking, and sales pipeline optimization"},{key:"attendance",title:"Class Attendance",subtitle:"Real-time attendance tracking, capacity utilization, and engagement metrics"},{key:"powercycle",title:"Power Cycle vs Barre",subtitle:"Comparative analysis between class formats and performance insights"},{key:"expiration",title:"Membership Expiration",subtitle:"Track membership lifecycles, renewal rates, and retention strategies"},{key:"cancellations",title:"Late Cancellations",subtitle:"Monitor cancellation patterns, policy compliance, and revenue impact"},{key:"summary",title:"Executive Summary",subtitle:"High-level overview of all key performance indicators and business metrics"}];function Ht(){const[a,l]=u.useState(0),f=()=>{};return e.jsxs("div",{className:"min-h-screen bg-gradient-to-br from-gray-50 to-gray-100",children:[e.jsx(B,{title:z[a].title,subtitle:z[a].subtitle,variant:z[a].key,onExport:f}),e.jsx("div",{className:"container mx-auto px-6 py-12",children:e.jsx(I,{className:"glass-card",children:e.jsxs(Q,{className:"p-8",children:[e.jsx("h2",{className:"text-3xl font-bold mb-6 text-center bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent",children:"Hero Section Variants"}),e.jsx("p",{className:"text-center text-muted-foreground mb-8",children:"Switch between different variants to see unique gradients and animated icons"}),e.jsx("div",{className:"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3",children:z.map((b,g)=>e.jsx(q,{variant:a===g?"default":"outline",onClick:()=>l(g),className:`text-sm font-medium transition-all duration-300 ${a===g?"bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70":"hover:bg-muted/50"}`,children:b.title},b.key))}),e.jsxs("div",{className:"mt-8 p-4 bg-muted/30 rounded-lg",children:[e.jsxs("h3",{className:"font-semibold mb-2",children:["Current Variant: ",z[a].key]}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"Each variant features unique dark gradients, themed floating icons, and smooth animations. The corner buttons provide navigation and export functionality."})]})]})})})]})}const oa=Object.freeze(Object.defineProperty({__proto__:null,default:Ht},Symbol.toStringTag,{value:"Module"})),At=()=>{const a=Le();return u.useEffect(()=>{},[a.pathname]),e.jsx("div",{className:"min-h-screen flex items-center justify-center bg-gray-100",children:e.jsxs("div",{className:"text-center",children:[e.jsx("h1",{className:"text-4xl font-bold mb-4",children:"404"}),e.jsx("p",{className:"text-xl text-gray-600 mb-4",children:"Oops! Page not found"}),e.jsx("a",{href:"/",className:"text-blue-500 hover:text-blue-700 underline",children:"Return to Home"})]})})},la=Object.freeze(Object.defineProperty({__proto__:null,default:At},Symbol.toStringTag,{value:"Module"}));export{Zt as C,ta as D,Gt as E,Wt as F,oa as H,Xt as I,ra as L,la as N,sa as P,Ut as S,Jt as T,ea as a,aa as b,na as c};
