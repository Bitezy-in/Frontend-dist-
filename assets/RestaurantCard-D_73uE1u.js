import{j as s}from"./index-CGAI1unE.js";import{c as l}from"./capitalizeWords-COkigvu9.js";import{b as m}from"./Container-CJ2ajp-G.js";import"./iconBase-C-KAd6xH.js";import"./index-DXpTgGh4.js";function o(){const i=Math.random()*1+3.8;return Math.round(i*10)/10}const x=({restaurant:e})=>s.jsxs("div",{className:`max-w-sm overflow-hidden bg-white h-full rounded-lg shadow-md ${e.isOpen?"cursor-pointer transform transition-transform duration-300 hover:scale-95":" "}`,children:[s.jsx("div",{className:"relative overflow-hidden",children:s.jsx("img",{src:(e==null?void 0:e.imageUrl)||"https://assets.cntraveller.in/photos/63d8e5103d7229d4cf308f01/16:9/w_1024%2Cc_limit/Prequel-lead.jpg",alt:"Restaurant",className:`w-full h-40 object-cover ${e!=null&&e.isOpen?"":"filter grayscale"}`})}),s.jsxs("div",{className:"p-4 rounded-b-lg",children:[s.jsx("h3",{className:"text-lg font-bold truncate",children:e.name}),s.jsxs("div",{className:"flex items-center text-slate-700 mt-2",children:[s.jsx(m,{className:"text-green-500 mr-1"}),s.jsx("span",{className:"text-sm",children:o()})]}),s.jsx("p",{className:"text-sm text-slate-700 mt-2",children:l((e==null?void 0:e.categories.slice(0,3).join(","))||"Indian, Italian")}),s.jsx("p",{className:"text-sm text-slate-700 mt-1",children:e.address.addressLine1})]})]});export{x as default};
