import{u as j,r as l,c as b,d as y,j as e,b as w,a as c,e as t,f as C,g as N,h as v,L as S}from"./index-CGAI1unE.js";import{G as P}from"./iconBase-C-KAd6xH.js";import{O,P as L}from"./OTPVerification-Bo0YXMxk.js";function M(a){return P({attr:{viewBox:"0 0 24 24",fill:"none"},child:[{tag:"path",attr:{opacity:"0.2",fillRule:"evenodd",clipRule:"evenodd",d:"M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z",fill:"currentColor"},child:[]},{tag:"path",attr:{d:"M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z",fill:"currentColor"},child:[]}]})(a)}const T=()=>{const a=j(),[o,u]=l.useState(""),[i,n]=l.useState(!1),[d,m]=l.useState(!1),g=b(s=>{var r;return(r=s==null?void 0:s.order)==null?void 0:r.orders}),h=y(),f=async()=>{n(!0);try{const{data:s}=await c.post("/auth/login",{mobileNumber:o.slice(-10)});s.success?(t.success(s.message),m(!0)):t.error(s.error||"Something went wrong")}catch(s){t.error(s.response.data.message)}finally{n(!1)}},x=async()=>{try{const s=await N(g);s&&a(v(s))}catch(s){console.log(s)}},p=async s=>{n(!0);try{const{data:r}=await c.post("/auth/verify-otp",{mobileNumber:o.slice(-10),otp:s});r.success?(t.success(r==null?void 0:r.message),a(C(r==null?void 0:r.user)),x(),h("/")):t.error(r.error||"Something went wrong")}catch(r){t.error(r.response.data.message)}finally{n(!1)}};return i?e.jsx(w,{}):e.jsx(e.Fragment,{children:d?e.jsx(O,{onOTPVerify:p}):e.jsx("div",{className:"flex justify-center items-center min-h-screen bg-gray-100",children:e.jsxs("div",{className:"bg-white p-8 rounded-lg shadow-lg max-w-md w-full",children:[e.jsx("h2",{className:"text-2xl font-bold text-center text-orange-500",children:"Login"}),e.jsxs("div",{className:"mt-6",children:[e.jsx("div",{className:"mb-4 w-full",children:e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsx("label",{className:"text-lg",children:"Mobile Number"}),e.jsx(L,{country:"in",value:o,onChange:u,inputProps:{name:"mobileNumber",required:!0,autoFocus:!1,placeholder:"Enter your Mobile Number"},inputClass:"!w-full !py-6 !text-lg"})]})}),e.jsxs("button",{onClick:f,className:"w-full flex gap-1 items-center justify-center bg-orange-500 text-white py-2 rounded-full hover:bg-orange-600 transition-colors",children:[i&&e.jsx(M,{size:20,className:"mt-1 animate-spin"}),e.jsx("span",{children:"Send OTP"})]})]}),e.jsxs("p",{className:"mt-4 text-center text-gray-600",children:["Don't have an account?"," ",e.jsx(S,{to:"/signup",className:"text-orange-500 hover:underline",children:"Sign Up"})]})]})})})},R=()=>e.jsx(T,{});export{R as default};
