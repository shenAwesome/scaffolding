!function(e){function t(t){for(var r,i,l=t[0],c=t[1],s=t[2],p=0,m=[];p<l.length;p++)i=l[p],a[i]&&m.push(a[i][0]),a[i]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);for(u&&u(t);m.length;)m.shift()();return o.push.apply(o,s||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,l=1;l<n.length;l++){var c=n[l];0!==a[c]&&(r=!1)}r&&(o.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},a={0:0},o=[];function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="";var l=window.webpackJsonp=window.webpackJsonp||[],c=l.push.bind(l);l.push=t,l=l.slice();for(var s=0;s<l.length;s++)t(l[s]);var u=c;o.push([666,1]),n()}({461:function(e,t,n){var r=n(462);"string"==typeof r&&(r=[[e.i,r,""]]);var a={hmr:!0,transform:void 0,insertInto:void 0};n(135)(r,a);r.locals&&(e.exports=r.locals)},462:function(e,t,n){var r=n(463);(e.exports=n(134)(!1)).push([e.i,".mainMenu > a {\n  text-decoration: none; }\n\n.secondaryMenu > a {\n  text-decoration: none; }\n\n.imageDiv {\n  background-color: silver;\n  background-image: url("+r(n(464))+");\n  background-size: cover;\n  width: 200px;\n  height: 200px; }\n",""])},464:function(e,t,n){e.exports=n.p+"media/test.8040596e.jpeg"},666:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n(15),o=n(8),i=n.n(o),l=n(48),c=n(244),s=n.n(c),u=n(250),p=n.n(u),m=n(245),d=n.n(m),f=n(246),h=n.n(f),E=n(164),b=n.n(E),y=n(62),v=n.n(y),g=n(163),w=n.n(g),O=n(110),_=n.n(O),j=n(248),x=n.n(j),N=n(247),S=n.n(N),P=n(251),C=n.n(P),B=n(249),W=n.n(B),k=n(80),D=n.n(k),M=n(81),I=n.n(M),H=n(82),L=n.n(H),z=n(237),A=n.n(z),F=n(233),G=n.n(F),T=n(235),J=n.n(T),X=n(236),R=n.n(X),q=n(109),Y=n.n(q),K=n(73),Q=function(){return function(e,t,n){this.path=e,this.label=t,this.icon=n}}(),U=[new Q("/","Home",G.a),new Q("/Dashboard","Dashboard",J.a),new Q("/Orders","Orders",R.a)].map(function(e){return r.createElement(K.a,{to:e.path,key:e.path},r.createElement(D.a,{button:!0,className:"ListItem"},r.createElement(I.a,null,r.createElement(e.icon,null)),r.createElement(L.a,{primary:e.label})))}),V=r.createElement("div",{className:"mainMenu"},U),Z=r.createElement("div",{className:"secondaryMenu"},r.createElement(A.a,{inset:!0},"Saved reports"),r.createElement(D.a,{button:!0},r.createElement(I.a,null,r.createElement(Y.a,null)),r.createElement(L.a,{primary:"Current month"})),r.createElement(D.a,{button:!0},r.createElement(I.a,null,r.createElement(Y.a,null)),r.createElement(L.a,{primary:"Last quarter"})),r.createElement(D.a,{button:!0},r.createElement(I.a,null,r.createElement(Y.a,null)),r.createElement(L.a,{primary:"Year-end sale"}))),$=n(238),ee=n(239),te=n.n(ee),ne=(n(446),function(){var e=function(t,n){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(t,n)};return function(t,n){function r(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}()),re=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return ne(t,e),t.prototype.render=function(){return r.createElement("div",null,"This is the HOME page so fast!!",r.createElement(te.a,{idProperty:"id",dataSource:[{id:"1",firstName:"John",lastName:"Bobson"},{id:"2",firstName:"Bob",lastName:"Mclaren"}],columns:[{name:"firstName"},{name:"lastName"}]}),r.createElement("div",{className:"imageDiv"}))},t}(r.Component),ae=Object(l.withStyles)(function(e){return{}})(re),oe=n(240),ie=n.n(oe);n(453);var le=function(){return r.createElement("div",null,r.createElement(ie.a,{data:{labels:["W1","W2","W3","W4","W5","W6","W7","W8","W9","W10"],series:[[1,2,4,8,6,-2,-1,-4,-6,-2]]},options:{high:10,low:-10,axisX:{labelInterpolationFnc:function(e,t){return t%2==0?e:null}}},type:"Bar"}))},ce=n(241),se=n.n(ce),ue=n(243),pe=n.n(ue),me=n(35),de=n.n(me),fe=n(242),he=n.n(fe),Ee=n(162),be=n.n(Ee),ye=n(108),ve=n.n(ye),ge=0;function we(e,t,n,r,a){return{id:ge+=1,name:e,calories:t,fat:n,carbs:r,protein:a}}var Oe=[we("Frozen yoghurt",159,6,24,4),we("Ice cream sandwich",237,9,37,4.3),we("Eclair",262,16,24,6),we("Cupcake",305,3.7,67,4.3),we("Gingerbread",356,16,49,3.9)];var _e=Object(l.withStyles)({root:{width:"100%",overflowX:"auto"},table:{minWidth:700}})(function(e){var t=e.classes;return r.createElement(ve.a,{className:t.root},r.createElement(se.a,{className:t.table},r.createElement(he.a,null,r.createElement(be.a,null,r.createElement(de.a,null,"Dessert (100g serving)"),r.createElement(de.a,{numeric:!0},"Calories"),r.createElement(de.a,{numeric:!0},"Fat (g)"),r.createElement(de.a,{numeric:!0},"Carbs (g)"),r.createElement(de.a,{numeric:!0},"Protein (g)"))),r.createElement(pe.a,null,Oe.map(function(e){return r.createElement(be.a,{key:e.id},r.createElement(de.a,{component:"th",scope:"row"},e.name),r.createElement(de.a,{numeric:!0},e.calories),r.createElement(de.a,{numeric:!0},e.fat),r.createElement(de.a,{numeric:!0},e.carbs),r.createElement(de.a,{numeric:!0},e.protein))}))))}),je=function(){var e=function(t,n){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(t,n)};return function(t,n){function r(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),xe=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return je(t,e),t.prototype.render=function(){var e=this.props.classes;return r.createElement(r.Fragment,null,r.createElement(v.a,{variant:"display1",gutterBottom:!0},"Orders"),r.createElement(v.a,{component:"div",className:e.chartContainer},r.createElement(le,null)),r.createElement(v.a,{variant:"display1",gutterBottom:!0},"Products"),r.createElement("div",{className:e.tableContainer},r.createElement(_e,null)))},t}(r.Component),Ne=Object(l.withStyles)(function(e){return{chartContainer:{marginLeft:-22},tableContainer:{height:320}}})(xe),Se=(n(461),function(){var e=function(t,n){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(t,n)};return function(t,n){function r(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}()),Pe=function(){return(Pe=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)},Ce=Object($.a)(),Be=Object(K.d)(Ce),We=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.state={open:!0},t.openDrawer=function(){t.setState({open:!0})},t.closeDrawer=function(){t.setState({open:!1})},t}return Se(t,e),t.prototype.render=function(){return r.createElement(K.b,{history:Be},r.createElement(s.a,null),this.main())},t.prototype.main=function(){var e=this.props.classes,t=this.state.open;return r.createElement("div",{className:e.root},r.createElement(d.a,{position:"absolute",className:i()("AppBar",e.appBar,t&&e.appBarShift)},r.createElement(h.a,{disableGutters:!t,className:e.toolbar},r.createElement(_.a,{color:"inherit","aria-label":"Open drawer",onClick:this.openDrawer,className:i()(e.menuButton,t&&e.menuButtonHidden)},r.createElement(S.a,null)),r.createElement(v.a,{variant:"title",color:"inherit",noWrap:!0,className:e.title},"Todo"),r.createElement(_.a,{color:"inherit"},r.createElement(x.a,{badgeContent:4,color:"secondary"},r.createElement(W.a,null))))),r.createElement(p.a,{variant:"permanent",classes:{paper:i()(e.drawerPaper,!t&&e.drawerPaperClose)},open:t},r.createElement("div",{className:e.toolbarIcon},r.createElement(_.a,{onClick:this.closeDrawer},r.createElement(C.a,null))),r.createElement(w.a,null),r.createElement(b.a,null,V),r.createElement(w.a,null),r.createElement(b.a,null,Z)),r.createElement("main",{className:i()(e.content,"page")},r.createElement("div",{className:e.appBarSpacer}),r.createElement(K.c,null,r.createElement(ae,{path:"/"}),r.createElement(Ne,{path:"Dashboard"}))))},t}(r.Component),ke=Object(l.withStyles)(function(e){var t;return{root:{display:"flex"},toolbar:{paddingRight:24},toolbarIcon:Pe({display:"flex",alignItems:"center",justifyContent:"flex-end",padding:"0 8px"},e.mixins.toolbar),appBar:{zIndex:e.zIndex.drawer+1,transition:e.transitions.create(["width","margin"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen})},appBarSpacer:e.mixins.toolbar,appBarShift:{marginLeft:240,width:"calc(100% - 240px)",transition:e.transitions.create(["width","margin"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.enteringScreen})},menuButton:{marginLeft:12,marginRight:36},menuButtonHidden:{display:"none"},title:{flexGrow:1},drawerPaper:{position:"relative",whiteSpace:"nowrap",width:240,transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.enteringScreen})},drawerPaperClose:(t={overflowX:"hidden",transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen}),width:7*e.spacing.unit},t[e.breakpoints.up("sm")]={width:9*e.spacing.unit},t),content:{flexGrow:1,padding:3*e.spacing.unit,minHeight:"100vh",overflow:"visible"}}})(We),De=(n(500),document.createElement("div"));document.body.appendChild(De),a.render(r.createElement(ke,null),De)}});