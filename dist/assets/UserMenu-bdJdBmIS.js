import{d as g,u as h,a as v,r as k,o as x,b as p,c as a,e as c,f as _,g as l,F as b,h as w,i as B,w as M,j as y,t as C,n as S,k as V,l as N,_ as U}from"./index-Dqu81k4X.js";const D={class:"container p-0"},F={class:"row g-3 m-0 p-0 flex-grow-1"},R={key:0,class:"d-none d-lg-block col-lg-2 p-0 m-0"},j={class:"list-group userMenu mt-5"},z=g({__name:"UserMenu",setup(E){const e=h(),u=v();function i(r,n){var t;return typeof r=="string"&&typeof n=="string"?(t=r.split("er")[1])==null?void 0:t.includes(n.split("er")[1]):!1}const o=k([]),d=()=>{e.matched[0].path==="/seller"?o.value=u.sellerMenu:e.matched[0].path==="/user"&&(o.value=u.userMenu)};return x(()=>{d()}),(r,n)=>{const t=p("router-link"),f=p("router-view");return a(),c("div",D,[_("div",F,[l(e).name!=="SellerHome"?(a(),c("div",R,[_("ul",j,[(a(!0),c(b,null,w(o.value,(s,m)=>(a(),B(t,{key:m,to:s.path,class:S(["list-group-item btn btn-Bg rounded-2 text-start p-3",{"btn-Bg-active":i(l(e).name,s.path.name)}]),"aria-current":i(l(e).name,s.path.name)},{default:M(()=>[y(C(s.title),1)]),_:2},1032,["to","class","aria-current"]))),128))])])):V("",!0),N(f,{class:"col p-0 mt-5"})])])}}}),L=U(z,[["__scopeId","data-v-0ef53dcb"]]);export{L as default};