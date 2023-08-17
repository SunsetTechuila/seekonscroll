!async function(){for(;!Spicetify.React||!Spicetify.ReactDOM;)await new Promise(e=>setTimeout(e,10));var r,o,d,c,u,p,e,t,i,l,n,s,a;r=Object.create,o=Object.defineProperty,d=Object.getOwnPropertyDescriptor,c=Object.getOwnPropertyNames,u=Object.getPrototypeOf,p=Object.prototype.hasOwnProperty,i=(e=(e,t)=>function(){return t||(0,e[c(e)[0]])((t={exports:{}}).exports,t),t.exports})({"external-global-plugin:react-dom"(e,t){t.exports=Spicetify.ReactDOM}}),l=(t=(e,t,i)=>{i=null!=e?r(u(e)):{};var n=!t&&e&&e.__esModule?i:o(i,"default",{value:e,enumerable:!0}),s=e,a=void 0,l=void 0;if(s&&"object"==typeof s||"function"==typeof s)for(let e of c(s))p.call(n,e)||e===a||o(n,e,{get:()=>s[e],enumerable:!(l=d(s,e))||l.enumerable});return n})(e({"external-global-plugin:react"(e,t){t.exports=Spicetify.React}})()),n=t(i()),s=class{constructor(e,t,i={}){this.name=e,this.settingsId=t,this.initialSettingsFields=i,this.settingsFields=this.initialSettingsFields,this.setRerender=null,this.pushSettings=async()=>{for(Object.entries(this.settingsFields).forEach(([e,t])=>{"button"!==t.type&&void 0===this.getFieldValue(e)&&this.setFieldValue(e,t.defaultValue)});!Spicetify?.Platform?.History?.listen;)await new Promise(e=>setTimeout(e,100));this.stopHistoryListener&&this.stopHistoryListener(),this.stopHistoryListener=Spicetify.Platform.History.listen(e=>{"/preferences"===e.pathname&&this.render()}),"/preferences"===Spicetify.Platform.History.location.pathname&&await this.render()},this.rerender=()=>{this.setRerender&&this.setRerender(Math.random())},this.render=async()=>{for(;!document.getElementById("desktop.settings.selectLanguage");){if("/preferences"!==Spicetify.Platform.History.location.pathname)return;await new Promise(e=>setTimeout(e,100))}var e=document.querySelector(".main-view-container__scroll-node-child main div");if(!e)return console.error("[spcr-settings] settings container not found");let t=Array.from(e.children).find(e=>e.id===this.settingsId);t?console.log(t):((t=document.createElement("div")).id=this.settingsId,e.appendChild(t)),n.default.render(l.default.createElement(this.FieldsContainer,null),t)},this.addButton=(e,t,i,n,s)=>{this.settingsFields[e]={type:"button",description:t,value:i,events:{onClick:n,...s}}},this.addInput=(e,t,i,n,s,a)=>{this.settingsFields[e]={type:"input",description:t,defaultValue:i,properties:s,events:{onChange:n,...a}}},this.addHidden=(e,t)=>{this.settingsFields[e]={type:"hidden",defaultValue:t}},this.addToggle=(e,t,i,n,s)=>{this.settingsFields[e]={type:"toggle",description:t,defaultValue:i,events:{onChange:n,...s}}},this.addDropDown=(e,t,i,n,s,a)=>{this.settingsFields[e]={type:"dropdown",description:t,defaultValue:i[n],options:i,events:{onSelect:s,...a}}},this.getFieldValue=e=>JSON.parse(Spicetify.LocalStorage.get(this.settingsId+"."+e)||"{}")?.value,this.setFieldValue=(e,t)=>{Spicetify.LocalStorage.set(this.settingsId+"."+e,JSON.stringify({value:t}))},this.FieldsContainer=()=>{var[e,t]=(0,l.useState)(0);return this.setRerender=t,l.default.createElement("div",{className:"x-settings-section",key:e},l.default.createElement("h2",{className:"TypeElement-cello-textBase-type"},this.name),Object.entries(this.settingsFields).map(([e,t])=>l.default.createElement(this.Field,{nameId:e,field:t})))},this.Field=i=>{var e=this.settingsId+"."+i.nameId;let t;if(t="button"===i.field.type?i.field.value:this.getFieldValue(i.nameId),"hidden"===i.field.type)return l.default.createElement(l.default.Fragment,null);const[n,s]=(0,l.useState)(t),a=e=>{void 0!==e&&(s(e),this.setFieldValue(i.nameId,e))};return l.default.createElement("div",{className:"x-settings-row"},l.default.createElement("div",{className:"x-settings-firstColumn"},l.default.createElement("label",{className:"TypeElement-viola-textSubdued-type",htmlFor:e},i.field.description||"")),l.default.createElement("div",{className:"x-settings-secondColumn"},"input"===i.field.type?l.default.createElement("input",{className:"x-settings-input",id:e,dir:"ltr",value:n,...i.field.properties||{},...i.field.events,onChange:e=>{a(e.currentTarget.value);var t=i.field.events?.onChange;t&&t(e)}}):"button"===i.field.type?l.default.createElement("span",null,l.default.createElement("button",{id:e,className:"Button-sm-buttonSecondary-isUsingKeyboard-useBrowserDefaultFocusStyle x-settings-button",...i.field.events,onClick:e=>{a();var t=i.field.events?.onClick;t&&t(e)},type:"button"},n)):"toggle"===i.field.type?l.default.createElement("label",{className:"x-settings-secondColumn x-toggle-wrapper"},l.default.createElement("input",{id:e,className:"x-toggle-input",type:"checkbox",checked:n,...i.field.events,onClick:e=>{a(e.currentTarget.checked);var t=i.field.events?.onClick;t&&t(e)}}),l.default.createElement("span",{className:"x-toggle-indicatorWrapper"},l.default.createElement("span",{className:"x-toggle-indicator"}))):"dropdown"===i.field.type?l.default.createElement("select",{className:"main-dropDown-dropDown",id:e,...i.field.events,onChange:e=>{a(i.field.options[e.currentTarget.selectedIndex]);var t=i.field.events?.onChange;t&&t(e)}},i.field.options.map((e,t)=>l.default.createElement("option",{selected:e===n,value:t+1},e))):l.default.createElement(l.default.Fragment,null)))}}},a=function(){const r=Spicetify["Player"];let o,d,c,u,p;const f=new s("Seek on scroll","seekOnScroll");function m(e){r.seek(e),d&&r.play(),d=null}function e(){u=document.querySelector(".playback-bar__progress-time-elapsed"),p=document.querySelector(".main-playbackBarRemainingTime-container"),c.addEventListener("wheel",i=>{{o&&clearTimeout(o);var n=((n=r.isPlaying())&&r.pause(),null==d&&(d=n),c)["style"];let e=i["deltaY"];f.getFieldValue("invertScroll")&&(e=-e);var s=parseInt(f.getFieldValue("skipPercent"),10),a=parseFloat(n.getPropertyValue("--progress-bar-transform"));let t;switch(!0){case 0<e:(t=a-s)<0&&(t=0);break;case e<0:100<(t=a+s)&&(t=100);break;default:return}var i=r.getDuration(),l=Math.floor(t/100*i);p.innerHTML.startsWith("-")&&(i=i-l,p.innerHTML="-"+r.formatTime(i)),u.innerHTML=r.formatTime(l),n.setProperty("--progress-bar-transform",t+"%"),o=setTimeout(m,400,l)}})}function t(){(c=document.querySelector(".playback-bar .playback-progressbar-isInteractive .progress-bar"))?e():setTimeout(t,100)}f.addInput("skipPercent","Set percentage of track time to skip on each scroll (1-100 int)","3",void 0,{type:"number",max:"100",min:"1",placeholder:"Default is 3"}),f.addToggle("invertScroll","Invert scroll direction",!1),f.pushSettings(),t(),document.addEventListener("fullscreenchange",()=>{setTimeout(t,300)})},(async()=>{await a()})()}();