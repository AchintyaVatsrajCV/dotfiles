(self.webpackChunk=self.webpackChunk||[]).push([[751],{36412:(e,n,t)=>{t.d(n,{h4:()=>i,uT:()=>s,Zz:()=>l});var a=t(27378),o=t(67166),r=t(9206);const i=({sanitizedTitle:e})=>a.createElement("div",{className:r.header},a.createElement("div",{className:r.flag},a.createElement("div",{className:r.flagTop}),a.createElement("div",{className:r.flagBottom})),a.createElement("div",{className:r.title,dangerouslySetInnerHTML:{__html:e}})),s=({sanitizedBody:e})=>a.createElement(a.Fragment,null,e.map((e=>a.createElement("p",{key:e,className:r.paragraph,dangerouslySetInnerHTML:{__html:e}})))),l=e=>a.createElement(o.X,{style:{width:280},onClose:e.onClose,includeMainContentPadding:!1,mainContent:a.createElement("div",{className:r.content,"data-has-footer":e.popupFooter?"true":"false"},a.createElement(i,{sanitizedTitle:e.sanitizedPopupTitle}),a.createElement(s,{sanitizedBody:e.sanitizedPopupBody}),e.popupFooter?e.popupFooter:null)})},11731:(e,n,t)=>{t.d(n,{c:()=>a});var a,o=t(31699);!function(e){e.sanitizeSuspendTitle=function(e){return e?(0,o.sanitize)(e):"Grammarly is unavailable in your country"},e.sanitizeSuspendBody=function(e){return e?e.map(o.sanitize):["In response to Russia’s invasion of Ukraine, we have suspended service to accounts in Russia and Belarus."]},e.sanitizeSuspendLearnMoreLabel=function(e){return e?(0,o.sanitize)(e):"Learn more"}}(a||(a={}))},72998:(e,n,t)=>{t.r(n),t.d(n,{StandWithUkraineGrammarlySuspendedPopup:()=>p,StandWithUkraineSuspendFooter:()=>d});var a=t(27378),o=t(11731),r=t(24606),i=t(19106),s=t(36412),l=t(90930);const p=e=>(a.useEffect((()=>{i.J.standWithUkraineSuspendPopupShow()}),[]),a.createElement(s.Zz,{onClose:()=>{e.onClose(),i.J.standWithUkraineSuspendCloseButtonClick()},sanitizedPopupTitle:o.c.sanitizeSuspendTitle(e.popupTitleHTML),sanitizedPopupBody:o.c.sanitizeSuspendBody(e.popupBodyHTML),popupFooter:a.createElement(d,{onLearnMore:()=>{e.onLearnMore(),i.J.standWithUkraineSuspendLearnMoreButtonClick()},sanitizedLearnMoreButtonLabelHTML:o.c.sanitizeSuspendLearnMoreLabel(e.popupLearnMoreButtonLabelHTML)})})),d=e=>a.createElement(r.z,{className:l.learnMoreButton,onClick:e.onLearnMore},a.createElement("span",{dangerouslySetInnerHTML:{__html:e.sanitizedLearnMoreButtonLabelHTML}}))},9206:e=>{e.exports={content:"_24e-G",paragraph:"_3dyOl",header:"_1NccA",flag:"_35Fsc",flagTop:"tjZEv",flagBottom:"_2FXeS",title:"pX6I3"}},90930:e=>{e.exports={learnMoreButton:"_1vdTn"}}}]);