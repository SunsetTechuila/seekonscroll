(async()=>{for(;!Spicetify.React||!Spicetify.ReactDOM;)await new Promise(e=>setTimeout(e,10));var i,a,l,r,s,o,e,t,n,d,c,u;async function p(){let i,s,n,a=new u("Seek on scroll","seekOnScroll");function l(){var e=document.querySelector(".playback-bar .playback-progressbar-isInteractive .progress-bar"),t=document.querySelector(".playback-bar .playback-progressbar-isInteractive .progress-bar__slider");e instanceof HTMLDivElement&&t instanceof HTMLDivElement?((s=e).addEventListener("wheel",t=>{var n=Number.parseInt(a.getFieldValue("skipPercent"));if(0!==n){i&&clearTimeout(i),s.className.includes("isDragging")||(()=>{document.addEventListener("mousemove",d),document.addEventListener("pointermove",d);var{x:e,y:t}=o();c("down",Math.floor(e),t)})();let e=-t.deltaY;a.getFieldValue("invertScroll")&&(e=-e),(e=>{var t=s.getBoundingClientRect().width,{x:n,y:i}=o(),e=n+(t=t*e/100);c("move",Math.floor(e),i)})(n*(0<e?1:-1)),i=setTimeout(r,300)}}),n=t):setTimeout(l,300)}function r(){var{x:e,y:t}=o();c("up",Math.floor(e),t),document.removeEventListener("mousemove",d),document.removeEventListener("pointermove",d)}function o(){var e=n.getBoundingClientRect();return{x:e.x+e.width/2,y:e.y+e.height/2}}function d(e){999!==e.buttons&&e.stopImmediatePropagation()}function c(e,t,n){t={clientX:t,clientY:n,screenX:t,screenY:n,buttons:999,view:window,bubbles:!0},n=new MouseEvent("mouse"+e,t),e=new PointerEvent("pointer"+e,t);s.dispatchEvent(n),s.dispatchEvent(e)}a.addInput("skipPercent","Set percentage of track time to skip on each scroll (1-100)","3",void 0,"number"),a.addToggle("invertScroll","Invert scroll direction",!1),await a.pushSettings(),l(),document.addEventListener("fullscreenchange",l)}i=Object.create,a=Object.defineProperty,l=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,s=Object.getPrototypeOf,o=Object.prototype.hasOwnProperty,n=(e=(e,t)=>function(){return t||(0,e[r(e)[0]])((t={exports:{}}).exports,t),t.exports})({"external-global-plugin:react-dom"(e,t){t.exports=Spicetify.ReactDOM}}),d=(t=(e,t,n)=>(n=null!=e?i(s(e)):{},((t,n,i,s)=>{if(n&&"object"==typeof n||"function"==typeof n)for(let e of r(n))o.call(t,e)||e===i||a(t,e,{get:()=>n[e],enumerable:!(s=l(n,e))||s.enumerable});return t})(!t&&e&&e.__esModule?n:a(n,"default",{value:e,enumerable:!0}),e)))(e({"external-global-plugin:react"(e,t){t.exports=Spicetify.React}})()),c=t(n()),u=class{constructor(e,t,n={}){this.name=e,this.settingsId=t,this.initialSettingsFields=n,this.settingsFields=this.initialSettingsFields,this.setRerender=null,this.pushSettings=async()=>{for(Object.entries(this.settingsFields).forEach(([e,t])=>{"button"!==t.type&&void 0===this.getFieldValue(e)&&this.setFieldValue(e,t.defaultValue)});!Spicetify?.Platform?.History?.listen;)await new Promise(e=>setTimeout(e,100));this.stopHistoryListener&&this.stopHistoryListener(),this.stopHistoryListener=Spicetify.Platform.History.listen(e=>{"/preferences"===e.pathname&&this.render()}),"/preferences"===Spicetify.Platform.History.location.pathname&&await this.render()},this.rerender=()=>{this.setRerender&&this.setRerender(Math.random())},this.render=async()=>{for(;!document.getElementById("desktop.settings.selectLanguage");){if("/preferences"!==Spicetify.Platform.History.location.pathname)return;await new Promise(e=>setTimeout(e,100))}var e=document.querySelector(".main-view-container__scroll-node-child main div");if(!e)return console.error("[spcr-settings] settings container not found");let t=Array.from(e.children).find(e=>e.id===this.settingsId);t?console.log(t):((t=document.createElement("div")).id=this.settingsId,e.appendChild(t)),c.default.render(d.default.createElement(this.FieldsContainer,null),t)},this.addButton=(e,t,n,i,s)=>{this.settingsFields[e]={type:"button",description:t,value:n,events:{onClick:i,...s}}},this.addInput=(e,t,n,i,s,a)=>{this.settingsFields[e]={type:"input",description:t,defaultValue:n,inputType:s,events:{onChange:i,...a}}},this.addHidden=(e,t)=>{this.settingsFields[e]={type:"hidden",defaultValue:t}},this.addToggle=(e,t,n,i,s)=>{this.settingsFields[e]={type:"toggle",description:t,defaultValue:n,events:{onChange:i,...s}}},this.addDropDown=(e,t,n,i,s,a)=>{this.settingsFields[e]={type:"dropdown",description:t,defaultValue:n[i],options:n,events:{onSelect:s,...a}}},this.getFieldValue=e=>JSON.parse(Spicetify.LocalStorage.get(this.settingsId+"."+e)||"{}")?.value,this.setFieldValue=(e,t)=>{Spicetify.LocalStorage.set(this.settingsId+"."+e,JSON.stringify({value:t}))},this.FieldsContainer=()=>{var[e,t]=(0,d.useState)(0);return this.setRerender=t,d.default.createElement("div",{className:"x-settings-section",key:e},d.default.createElement("h2",{className:"TypeElement-cello-textBase-type"},this.name),Object.entries(this.settingsFields).map(([e,t])=>d.default.createElement(this.Field,{nameId:e,field:t})))},this.Field=n=>{var e=this.settingsId+"."+n.nameId;let t;if(t="button"===n.field.type?n.field.value:this.getFieldValue(n.nameId),"hidden"===n.field.type)return d.default.createElement(d.default.Fragment,null);let[i,s]=(0,d.useState)(t),a=e=>{void 0!==e&&(s(e),this.setFieldValue(n.nameId,e))};return d.default.createElement("div",{className:"x-settings-row"},d.default.createElement("div",{className:"x-settings-firstColumn"},d.default.createElement("label",{className:"TypeElement-viola-textSubdued-type",htmlFor:e},n.field.description||"")),d.default.createElement("div",{className:"x-settings-secondColumn"},"input"===n.field.type?d.default.createElement("input",{className:"x-settings-input",id:e,dir:"ltr",value:i,type:n.field.inputType||"text",...n.field.events,onChange:e=>{a(e.currentTarget.value);var t=n.field.events?.onChange;t&&t(e)}}):"button"===n.field.type?d.default.createElement("span",null,d.default.createElement("button",{id:e,className:"Button-sc-y0gtbx-0 Button-small-buttonSecondary-useBrowserDefaultFocusStyle x-settings-button",...n.field.events,onClick:e=>{a();var t=n.field.events?.onClick;t&&t(e)},type:"button"},i)):"toggle"===n.field.type?d.default.createElement("label",{className:"x-settings-secondColumn x-toggle-wrapper"},d.default.createElement("input",{id:e,className:"x-toggle-input",type:"checkbox",checked:i,...n.field.events,onClick:e=>{a(e.currentTarget.checked);var t=n.field.events?.onClick;t&&t(e)}}),d.default.createElement("span",{className:"x-toggle-indicatorWrapper"},d.default.createElement("span",{className:"x-toggle-indicator"}))):"dropdown"===n.field.type?d.default.createElement("select",{className:"main-dropDown-dropDown",id:e,...n.field.events,onChange:e=>{a(n.field.options[e.currentTarget.selectedIndex]);var t=n.field.events?.onChange;t&&t(e)}},n.field.options.map((e,t)=>d.default.createElement("option",{selected:e===i,value:t+1},e))):d.default.createElement(d.default.Fragment,null)))}}},(async()=>{await p()})()})();