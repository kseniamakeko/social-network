"use strict";(self.webpackChunksocial_network=self.webpackChunksocial_network||[]).push([[147],{147:(s,t,e)=>{e.r(t),e.d(t,{default:()=>N});var a=e(43),o=e(598);const i={ava:"InfoProfile_ava__Ui5kv",status:"InfoProfile_status__MpLO9",aboutme:"InfoProfile_aboutme__npv1j",avatar:"InfoProfile_avatar__uu5vH"};var r=e(579);const l=s=>{const[t,e]=(0,a.useState)(!1),[o,l]=(0,a.useState)(s.status);(0,a.useEffect)((()=>{l(s.status)}),[s.status]);return(0,r.jsxs)("div",{className:i.status,children:[!t&&(0,r.jsx)("div",{children:(0,r.jsx)("span",{onDoubleClick:()=>{e(!0)},children:s.status||"--"})}),t&&(0,r.jsx)("div",{children:(0,r.jsx)("input",{autoFocus:!0,onBlur:()=>{e(!1),s.updateStatus(o)},onChange:s=>{l(s.target.value)},value:o})})]})};var n=e(139);const c=s=>{let{profile:t,status:e,updateStatus:a,isOwner:c,savePhoto:u}=s;return t?(0,r.jsxs)("div",{children:[(0,r.jsx)("div",{className:i.main}),(0,r.jsxs)("div",{className:i.ava,children:[(0,r.jsx)("div",{children:(0,r.jsx)("h2",{className:i.name,children:t.fullName})}),(0,r.jsx)("img",{src:t.photos.large||n,alt:"profilePhoto",className:i.avatar}),c&&(0,r.jsx)("input",{type:"file",onChange:s=>{s.target.files.length&&u(s.target.files[0])}}),(0,r.jsx)(l,{status:e,updateStatus:a,savePhoto:u,className:i.status}),(0,r.jsx)("div",{children:t.contacts.facebook}),(0,r.jsx)("div",{children:t.contacts.vk}),(0,r.jsx)("div",{children:t.contacts.twitter})]})]}):(0,r.jsx)(o.A,{})};var u=e(477),d=e(3),h=e(892);const m={item:"Post_item__W5CBq",likes:"Post_likes__WKbkj"},x=s=>(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)("div",{className:m.posts,children:[(0,r.jsxs)("div",{className:m.item,children:[(0,r.jsx)("img",{src:"https://images.unsplash.com/photo-1475518112798-86ae358241eb?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",alt:"avatar"}),s.message]}),(0,r.jsx)("div",{className:m.likes,children:(0,r.jsx)("span",{children:s.like})})]})});var f=e(899);const p=f.Ik().shape({post:f.Yj().min(1,"Post must be at least 10 characters").max(100,"Must be shorter than 10000 characters").required("Post is required")});var v=e(304);const j="MyPosts_postBlock__a8-sP",A="MyPosts_form__container__Yt4-k",P="MyPosts_form__post__YT1F5",k="MyPosts_textarea__post__rxtpn",g="MyPosts_buttonPost__eBhN5",S="MyPosts_buttonPostDisabled__5XkXZ",D=()=>{const s=(0,d.wA)();return(0,r.jsx)(h.l1,{initialValues:{post:""},validationSchema:p,onSubmit:(t,e)=>{let{resetForm:a}=e;s((0,u.oL)(t.post)),a()},children:s=>{let{isValid:t}=s;return(0,r.jsxs)(h.lV,{className:P,children:[(0,r.jsx)("div",{className:A,children:(0,r.jsx)(h.D0,{className:k,component:v.T,name:"post",placeholder:"Post message"})}),(0,r.jsx)("div",{children:(0,r.jsx)("button",{className:"".concat(g," ").concat(t?"":S),type:"submit",disabled:!t,children:"Add Post"})})]})}})},I=()=>{let s=(0,d.d4)((s=>s.profile.posts)).map((s=>(0,r.jsx)(x,{message:s.message,like:s.likesCount},s.id)));return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("div",{className:j,children:(0,r.jsx)("h3",{children:"My posts"})}),(0,r.jsx)("div",{children:(0,r.jsx)(D,{})}),s]})},V=(0,d.Ng)((s=>({posts:s.profile.posts})),(s=>({addPost:()=>{s((0,u.oL)())}})))(I),C=s=>(0,r.jsxs)("div",{children:[(0,r.jsx)(c,{isOwner:s.isOwner,profile:s.profile,status:s.status,updateStatus:s.updateStatus,savePhoto:s.savePhoto}),(0,r.jsx)(V,{})]});var R=e(906);const N=(0,e(923).Zz)((0,d.Ng)((s=>({profile:s.profile.profile,status:s.profile.status,authorizedUserId:s.auth.userId,isAuth:s.auth.isAuth})),{getUserProfile:u.VM,getStatus:u.BS,updateStatus:u.yB,savePhoto:u.Ah}))((function(s){const{userId:t}=(0,R.g)(),e=(0,R.Zp)(),o=t||s.authorizedUserId,i=o===s.authorizedUserId;return(0,a.useEffect)((()=>{s.isAuth?(s.getUserProfile(o),s.getStatus(o)):e("/login")}),[o,s.isAuth,e]),(0,r.jsx)("div",{children:(0,r.jsx)(C,{isOwner:i,...s,profile:s.profile,status:s.status,updateStatus:s.updateStatus,savePhoto:s.savePhoto})})}))},304:(s,t,e)=>{e.d(t,{p:()=>c,T:()=>n});e(43);const a="FormsControls_form-control__KOICr",o="FormsControls_error__wukgD",i="FormsControls_formField__Z4Rfv";var r=e(579);const l=s=>{let{field:t,form:e,...i}=s;const l=e.touched[t.name]&&e.errors[t.name];return(0,r.jsxs)("div",{className:a+" "+(l?o:""),children:[(0,r.jsx)("div",{children:i.children}),l&&(0,r.jsx)("span",{children:e.errors[t.name]})]})},n=s=>{const{field:t,form:e,child:a,...o}=s;return(0,r.jsx)(l,{...s,children:(0,r.jsx)("textarea",{...t,...o})})},c=s=>{const{field:t,form:e,child:a,...o}=s;return(0,r.jsx)(l,{...s,children:(0,r.jsx)("div",{className:i,children:(0,r.jsx)("input",{...t,...o})})})}},139:s=>{s.exports="data:image/png;base64,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"}}]);
//# sourceMappingURL=147.066abb13.chunk.js.map