"use strict";(self.webpackChunkmusicovery_front=self.webpackChunkmusicovery_front||[]).push([[477],{486:(e,s,a)=>{a.d(s,{A:()=>c});var t=a(5043),l=a(4935),i=a(6375),n=a(579);const c=e=>{let{onSelectTrack:s}=e;const{keyword:a,setKeyword:c,results:r,handleSearch:d,isPremium:o}=(0,i.A)(),[h,u]=(0,t.useState)(!1);return(0,n.jsxs)("div",{className:"music-search",children:[o,(0,n.jsxs)("form",{onSubmit:e=>{e.preventDefault(),d(),u(!0)},children:[" ",(0,n.jsx)("input",{className:"music-search-input",type:"text",value:a,onChange:e=>c(e.target.value),placeholder:"\uc74c\uc545 \uac80\uc0c9"}),(0,n.jsx)("button",{type:"submit",children:"\ud83d\udd0e"})]}),(0,n.jsx)("div",{className:"music-search-results",children:h||0!==r.length?r.map(((e,a)=>(0,n.jsx)("div",{onClick:()=>s(e),children:(0,n.jsx)(l.A,{track:e,isPremium:o})},e.id))):(0,n.jsx)("div",{className:"music-search-placeholder",children:"\uac80\uc0c9\uc5b4 \uc785\ub825..."})})]})}},4935:(e,s,a)=>{a.d(s,{A:()=>u});var t=a(5043),l=a(7950),i=a(5026),n=a(4003),c=a(7138),r=a(9428),d=a(579);const o=t.memo((e=>{let{playlist:s,isChecked:a,onCheck:t}=e;return(0,d.jsxs)("div",{className:"playlist-modal-item",children:[(0,d.jsx)("input",{type:"checkbox",id:`playlist-${s.playlistId}`,checked:a,onChange:()=>t(s.playlistId)}),(0,d.jsxs)("label",{htmlFor:`playlist-${s.playlistId}`,className:"playlist-modal-label",children:[(0,d.jsx)("div",{className:"playlist-modal-image-container",children:(0,d.jsx)("img",{src:(0,c.V)(s.playlistPhoto),alt:s.playlistTitle,className:"playlist-modal-image"})}),(0,d.jsx)("span",{className:"playlist-modal-name",children:s.playlistTitle})]})]})})),h=t.memo((e=>{let{playlists:s,selectedPlaylists:a,loading:t,onCheck:l,onClose:i,onAdd:n}=e;return(0,d.jsx)("div",{className:"playlist-modal-overlay",onClick:i,children:(0,d.jsxs)("div",{className:"playlist-modal",onClick:e=>e.stopPropagation(),children:[(0,d.jsxs)("div",{className:"playlist-modal-header",children:[(0,d.jsx)("h3",{children:"\ud50c\ub808\uc774\ub9ac\uc2a4\ud2b8\uc5d0 \ucd94\uac00"}),(0,d.jsx)("button",{className:"playlist-modal-close",onClick:i,children:"\xd7"})]}),(0,d.jsx)("div",{className:"playlist-modal-body",children:t?(0,d.jsx)("p",{children:"\ud50c\ub808\uc774\ub9ac\uc2a4\ud2b8\ub97c \ubd88\ub7ec\uc624\ub294 \uc911..."}):0===s.length?(0,d.jsx)("p",{children:"\uc0ac\uc6a9 \uac00\ub2a5\ud55c \ud50c\ub808\uc774\ub9ac\uc2a4\ud2b8\uac00 \uc5c6\uc2b5\ub2c8\ub2e4."}):(0,d.jsx)("div",{className:"playlist-modal-list",children:s.map((e=>(0,d.jsx)(o,{playlist:e,isChecked:a.includes(e.playlistId),onCheck:l},e.playlistId)))})}),(0,d.jsx)("div",{className:"playlist-modal-footer",children:(0,d.jsx)("button",{className:"add-to-playlist-button",onClick:n,disabled:0===a.length||t,children:"\ud50c\ub808\uc774\ub9ac\uc2a4\ud2b8\uc5d0 \ucd94\uac00"})})]})})})),u=e=>{let{track:s,isPremium:a}=e;const[c,o]=(0,t.useState)({}),[u,m]=(0,t.useState)(!1),[p,x]=(0,t.useState)([]),[j,y]=(0,t.useState)([]),[f,v]=(0,t.useState)(!1),{addTrackToList:g,setIsPlaying:b,deviceReady:N}=(0,t.useContext)(r.vC),k=(0,t.useRef)(!1),C=(0,n.A)(),A=()=>{m(!1),y([])},I=(0,t.useCallback)((e=>{y((s=>s.includes(e)?s.filter((s=>s!==e)):[...s,e]))}),[]);return s&&s.album&&s.album.images&&s.album.images[0]?(0,d.jsxs)("div",{className:"track-item",onMouseEnter:e=>{const s=e.currentTarget.getBoundingClientRect();o({top:s.top-10+"px",left:`${s.left+s.width/2}px`})},onMouseLeave:()=>{o({})},children:[(0,d.jsx)("img",{className:"track-album-image-music",src:s.album.images[0].url,alt:s.name}),(0,d.jsxs)("div",{className:"track-info",children:[(0,d.jsx)("h4",{children:s.name}),(0,d.jsx)("p",{children:s.artists.map((e=>e.name)).join(", ")}),(0,d.jsxs)("div",{className:"tooltip",style:c,children:[(0,d.jsx)("h4",{children:s.name}),(0,d.jsx)("p",{children:s.artists.map((e=>e.name)).join(", ")})]})]}),(0,d.jsxs)("div",{className:"track-play-button-container",children:[(0,d.jsx)("button",{onClick:()=>(async e=>{if(a)try{g(e),N?b(!0):N||setTimeout((()=>{b(!0)}),1e3)}catch(l){var s,t;if(console.error("\ud2b8\ub799 \uc7ac\uc0dd \uc911 \uc624\ub958:",l),403===(null===(s=l.response)||void 0===s?void 0:s.status))return void window.open(e.external_urls.spotify,"_blank");404===(null===(t=l.response)||void 0===t?void 0:t.status)?alert("Spotify \ud50c\ub808\uc774\uc5b4\ub97c \ucd08\uae30\ud654 \uc911\uc785\ub2c8\ub2e4. \uc7a0\uc2dc \ud6c4\uc5d0 \ub2e4\uc2dc \uc2dc\ub3c4\ud574\uc8fc\uc138\uc694."):alert("\ud2b8\ub799\uc744 \uc7ac\uc0dd\ud560 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4. \ub2e4\uc2dc \uc2dc\ub3c4\ud574\uc8fc\uc138\uc694.")}else window.open(e.external_urls.spotify,"_blank")})(s),className:a?"premium-play":"spotify-link",children:a?"\u25b6":"LINK"}),(0,d.jsx)("button",{className:"add-track-to-playlist-button",onClick:()=>{m(!0),C&&!k.current&&(async e=>{if(e&&!k.current){v(!0);try{const s=await i.A.get(`/playlist/user/${e}`);x(s.data||[]),k.current=!0}catch(s){console.error("\ud50c\ub808\uc774\ub9ac\uc2a4\ud2b8\ub97c \ubd88\ub7ec\uc624\ub294 \ub370 \uc2e4\ud328\ud588\uc2b5\ub2c8\ub2e4:",s)}finally{v(!1)}}})(C.userId)},children:"\u2795"})]}),u&&l.createPortal((0,d.jsx)(h,{playlists:p,selectedPlaylists:j,loading:f,onCheck:I,onClose:A,onAdd:async()=>{if(0!==j.length)try{const e=j.map((e=>i.A.post(`/api/spotify/playlist/${e}/track`,null,{params:{trackId:s.id}})));await Promise.all(e),alert("\uc120\ud0dd\ud55c \ud50c\ub808\uc774\ub9ac\uc2a4\ud2b8\uc5d0 \ud2b8\ub799\uc774 \ucd94\uac00\ub418\uc5c8\uc2b5\ub2c8\ub2e4."),A()}catch(e){console.error("\ud50c\ub808\uc774\ub9ac\uc2a4\ud2b8\uc5d0 \ud2b8\ub799 \ucd94\uac00 \uc2e4\ud328:",e),alert("\ud50c\ub808\uc774\ub9ac\uc2a4\ud2b8\uc5d0 \ud2b8\ub799 \ucd94\uac00 \uc911 \uc624\ub958\uac00 \ubc1c\uc0dd\ud588\uc2b5\ub2c8\ub2e4.")}else alert("\ud50c\ub808\uc774\ub9ac\uc2a4\ud2b8\ub97c \uc120\ud0dd\ud574\uc8fc\uc138\uc694.")}}),document.body)]},s.id):null}},5520:(e,s,a)=>{a.d(s,{A:()=>o});var t=a(5043),l=a(486),i=a(5026),n=a(4003),c=a(1675),r=a(579);const d=()=>{const e=(0,c.Zp)(),[s,a]=(0,t.useState)([]),[l,d]=(0,t.useState)([]),[o,h]=(0,t.useState)([]),[u,m]=(0,t.useState)(!1),[p,x]=(0,t.useState)(""),[j,y]=(0,t.useState)([]),[f,v]=(0,t.useState)("search"),g=(0,n.A)();(0,t.useEffect)((()=>{g&&(b(),N(),k())}),[g]);const b=async()=>{try{const e=await i.A.get(`/friends/list?userId=${g.id}`);a(e.data)}catch(e){console.error("\uce5c\uad6c \ubaa9\ub85d\uc744 \uac00\uc838\uc624\ub294 \ub370 \uc2e4\ud328\ud588\uc2b5\ub2c8\ub2e4.",e)}},N=async()=>{try{const e=await i.A.get(`/friends/friendRequests?friendId=${g.id}`);d(e.data)}catch(e){console.error("\uce5c\uad6c \uc694\uccad \ubaa9\ub85d\uc744 \uac00\uc838\uc624\ub294 \ub370 \uc2e4\ud328\ud588\uc2b5\ub2c8\ub2e4.",e)}},k=async()=>{try{const e=await i.A.get(`/friends/pendingRequests?userId=${g.id}`);h(e.data)}catch(e){console.error("\ub0b4\uac00 \uc694\uccad\ud55c \uce5c\uad6c \ubaa9\ub85d\uc744 \uac00\uc838\uc624\ub294 \ub370 \uc2e4\ud328\ud588\uc2b5\ub2c8\ub2e4.",e)}},C=e=>s.some((s=>s.friend.id===e))||l.some((s=>s.user.id===e))||o.some((s=>s.friend.id===e));return(0,r.jsxs)("div",{children:[(0,r.jsxs)("div",{className:"friends-list-container",children:[(0,r.jsx)("h2",{children:"\uce5c\uad6c \ubaa9\ub85d"}),(0,r.jsx)("button",{onClick:()=>m(!0),className:"add-friend-button",children:"\uce5c\uad6c \ucd94\uac00"}),(0,r.jsx)("div",{className:"friends-list",children:s.map((s=>(0,r.jsxs)("div",{className:"friend-item",onClick:()=>(s=>{e("/playlistPage",{state:{friendInfo:s}})})(s.friend.id===g.id?s.user:s.friend),children:[(0,r.jsxs)("p",{children:[(0,r.jsx)("strong",{children:"\uce5c\uad6c \ubcc4\uba85 :"})," ",s.friend.id===g.id?s.user.nickname:s.friend.nickname]}),(0,r.jsx)("button",{className:"friend-delete-button",onClick:e=>(async(e,s)=>{s.stopPropagation();try{await i.A.delete("/friends/delete",{params:{userId:g.id,friendId:e}}),b()}catch(a){console.error("\uce5c\uad6c \uc0ad\uc81c\uc5d0 \uc2e4\ud328\ud588\uc2b5\ub2c8\ub2e4.",a)}})(s.friend.id,e),children:"\u274c"})]},s.id)))})]}),u&&(0,r.jsx)("div",{className:"modal",children:(0,r.jsxs)("div",{className:"modal-content",children:[(0,r.jsx)("span",{className:"close",onClick:()=>m(!1),children:"\xd7"}),(0,r.jsxs)("div",{className:"modal-tabs",children:[(0,r.jsx)("button",{className:"modal-tab-button "+("search"===f?"active":""),onClick:()=>v("search"),children:"\uce5c\uad6c \uac80\uc0c9"}),(0,r.jsx)("button",{className:"modal-tab-button "+("pending"===f?"active":""),onClick:()=>v("pending"),children:"\uc694\uccad\ud55c \ubaa9\ub85d"}),(0,r.jsx)("button",{className:"modal-tab-button "+("requests"===f?"active":""),onClick:()=>v("requests"),children:"\ubc1b\uc740 \uce5c\uad6c \uc694\uccad"})]}),"search"===f&&(0,r.jsxs)("div",{className:"friendlist-search-tab",children:[(0,r.jsx)("h2",{children:"\uce5c\uad6c \ucd94\uac00"}),(0,r.jsx)("input",{type:"text",placeholder:"\uac80\uc0c9 (ID, \uc774\uba54\uc77c, \ub2c9\ub124\uc784)",value:p,onChange:e=>x(e.target.value)}),(0,r.jsx)("button",{onClick:async()=>{try{const e=await i.A.get(`/friends/search?keyword=${p}`);y(e.data)}catch(e){console.error("\uc0ac\uc6a9\uc790 \uac80\uc0c9\uc5d0 \uc2e4\ud328\ud588\uc2b5\ub2c8\ub2e4.",e)}},children:"\uac80\uc0c9"}),(0,r.jsx)("div",{className:"search-results",children:j.map((e=>(0,r.jsxs)("div",{className:"search-result-item",children:[(0,r.jsxs)("p",{children:[(0,r.jsx)("strong",{children:"ID:"})," ",e.id]}),(0,r.jsxs)("p",{children:[(0,r.jsx)("strong",{children:"\uc774\uba54\uc77c:"})," ",e.email]}),(0,r.jsxs)("p",{children:[(0,r.jsx)("strong",{children:"\ub2c9\ub124\uc784:"})," ",e.nickname]}),(0,r.jsx)("button",{onClick:()=>(async e=>{try{await i.A.post("/friends/add",{userId:g.id,friendId:e}),b(),k()}catch(s){console.error("\uce5c\uad6c \ucd94\uac00\uc5d0 \uc2e4\ud328\ud588\uc2b5\ub2c8\ub2e4.",s)}})(e.id),disabled:C(e.id),children:C(e.id)?"\uc694\uccad\ub428":"\uce5c\uad6c \ucd94\uac00"})]},e.id)))})]}),"pending"===f&&(0,r.jsxs)("div",{className:"friendlist-pending-tab",children:[(0,r.jsx)("h2",{children:"\uc694\uccad\ud55c \ubaa9\ub85d"}),(0,r.jsx)("div",{className:"pending-requests-list",children:0===o.length?(0,r.jsx)("p",{children:"\uc694\uccad\ud55c \ubaa9\ub85d\uc774 \uc5c6\uc2b5\ub2c8\ub2e4."}):o.map((e=>(console.log(e),(0,r.jsx)("div",{className:"pending-request-item",children:(0,r.jsxs)("p",{children:[(0,r.jsx)("strong",{children:"\uc694\uccad\ud55c \uc0ac\uc6a9\uc790 ID:"})," ",e.friend.nickname]})},e.id))))})]}),"requests"===f&&(0,r.jsxs)("div",{className:"friendlist-requests-tab",children:[(0,r.jsx)("h2",{children:"\ubc1b\uc740 \uce5c\uad6c \uc694\uccad"}),(0,r.jsx)("div",{className:"friend-requests-list",children:0===l.length?(0,r.jsx)("p",{children:"\ubc1b\uc740 \uc694\uccad\uc774 \uc5c6\uc2b5\ub2c8\ub2e4."}):l.map((e=>(console.log(e),(0,r.jsx)("div",{className:"friend-request-item",children:(0,r.jsxs)("p",{children:[(0,r.jsx)("strong",{children:"\uc694\uccad\ud55c \uc0ac\uc6a9\uc790:"})," ",e.user.nickname,(0,r.jsx)("button",{className:"accept-button",onClick:()=>(async e=>{try{await i.A.post("/friends/accept",null,{params:{friendRequestId:e}}),b(),N()}catch(s){console.error("\uce5c\uad6c \uc694\uccad \uc218\ub77d\uc5d0 \uc2e4\ud328\ud588\uc2b5\ub2c8\ub2e4.",s)}})(e.id),children:"\u2705"})]})},e.id))))})]})]})})]})},o=e=>{let{children:s}=e;return(0,r.jsxs)("div",{className:"sidebar-layout-layout",children:[(0,r.jsxs)("div",{className:"sidebar-layout-sidebar",children:[(0,r.jsx)(l.A,{onSelectTrack:()=>{}}),(0,r.jsx)(d,{})]}),(0,r.jsx)("div",{className:"sidebar-layout-main-content",children:s})]})}},6375:(e,s,a)=>{a.d(s,{A:()=>n});var t=a(5043),l=a(5026),i=a(6213);const n=()=>{const[e,s]=(0,t.useState)(""),[a,n]=(0,t.useState)([]),[c,r]=(0,t.useState)(new Audio),[d,o]=(0,t.useState)(!1),[h,u]=(0,t.useState)(null);(0,t.useEffect)((()=>{(async()=>{try{const e=await l.A.get("/api/spotify/userInfo");o("premium"===e.data.product)}catch(e){}})()}),[]),(0,t.useEffect)((()=>{(async()=>{try{const e=(await l.A.get("/music/devices",{headers:{Authorization:`Bearer ${localStorage.getItem("MUSICOVERY_ACCESS_TOKEN")}`}})).data.devices;e.length>0&&(u(e[0].id),await(async e=>{try{const s="https://api.spotify.com/v1/me/player";await i.A.put(s,{device_ids:[e],play:!0},{headers:{Authorization:`Bearer ${localStorage.getItem("MUSICOVERY_ACCESS_TOKEN")}`}})}catch(s){throw console.error("Failed to transfer playback:",s),s}})(e[0].id))}catch(e){console.error("Failed to fetch devices",e)}})()}),[]);return{keyword:e,setKeyword:s,results:a,handleSearch:async s=>{try{const s=(await l.A.get(`/api/spotify/search?keyword=${e}&type=track`)).data.tracks.items.filter((e=>e.is_playable));n(s)}catch(a){console.error("Failed to search music",a),n([])}},isPremium:d,deviceId:h}}},6578:()=>{},7138:(e,s,a)=>{a.d(s,{N:()=>i,V:()=>l});const t="http://211.243.7.215:8080/images/default.png",l=e=>e?e.startsWith("/images/")?`http://211.243.7.215:8080${e}`:e:t,i=()=>t},8477:(e,s,a)=>{a.r(s),a.d(s,{default:()=>o});var t=a(5422),l=a(5026),i=(a(6578),a(5043)),n=a(4003),c=a(9057),r=a(5520),d=a(579);const o=e=>{let{onStatusCange:s}=e;const[a,o]=(0,i.useState)([]),h=(0,n.A)();(0,i.useEffect)((()=>{h&&h.userId&&l.A.get("/playlist/user/"+h.userId).then((e=>{console.log("\ud83d\udce1 \ub0b4 \ud50c\ub808\uc774\ub9ac\uc2a4\ud2b8 : ",e.data),o(e.data)})).catch((e=>console.error("\u274c \ud50c\ub808\uc774\ub9ac\uc2a4\ud2b8 \uac00\uc838\uc624\uae30 \uc2e4\ud328:",e)))}),[h]);return(0,d.jsxs)("div",{className:"social-container",children:[(0,d.jsx)(t.A,{}),(0,d.jsx)(r.A,{children:(0,d.jsxs)("div",{className:"social-layout-container",children:[(0,d.jsxs)("div",{className:"Tool",children:[(0,d.jsx)("h1",{children:"\u203b \uc2a4\ud2b8\ub9ac\ubc0d \uad00\ub9ac \u203b"}),a.length>0?a.map((e=>(0,d.jsxs)("div",{className:"streaming-info",children:[(0,d.jsxs)("h2",{id:"titleColor",children:["\ud50c\ub808\uc774\ub9ac\uc2a4\ud2b8\uba85 : ",e.playlistTitle]}),(0,d.jsxs)("p",{id:"statePlace",children:["\ud604\uc7ac \uc0c1\ud0dc : ",e.isPublic?"\ud83d\udd13 \uacf5\uac1c":"\ud83d\udd12 \ube44\uacf5\uac1c"]}),(0,d.jsx)("button",{className:"toggle-button",onClick:()=>(e=>{const s=a.find((s=>s.playlistId===e));if(!s)return;console.log("\ud83d\udce1 \ud50c\ub808\uc774\ub9ac\uc2a4\ud2b8 : ",s);const t=!s.isPublic;t?l.A.post("/api/streaming/create",{playlistId:s.playlistId,hostUser:s.user,isLive:!0,isPublic:!0}).then((s=>{console.log("\u2705 \uc2a4\ud2b8\ub9ac\ubc0d \ub370\uc774\ud130 \uc800\uc7a5 \uc644\ub8cc:",s.data),o(a.map((s=>s.playlistId===e?{...s,isPublic:t}:s)))})).catch((e=>console.error("\u274c \uc2a4\ud2b8\ub9ac\ubc0d \ub370\uc774\ud130 \uc800\uc7a5 \uc2e4\ud328:",e))):l.A.post(`/api/streaming/stop/${s.playlistId}`).then((s=>{console.log("\ud83d\uddd1\ufe0f \uc2a4\ud2b8\ub9ac\ubc0d \uc0ad\uc81c \uc644\ub8cc:",s.data),o(a.map((s=>s.playlistId===e?{...s,isPublic:t}:s)))})).catch((e=>console.error("\u274c \uc2a4\ud2b8\ub9ac\ubc0d \uc0ad\uc81c \uc2e4\ud328:",e)))})(e.playlistId),children:e.isPublic?"\ube44\uacf5\uac1c\ub85c \ubcc0\uacbd":"\uacf5\uac1c\ub85c \ubcc0\uacbd"})]},e.playlistId))):(0,d.jsx)("p",{children:"\ud50c\ub808\uc774\ub9ac\uc2a4\ud2b8 \uc815\ubcf4\ub97c \ubd88\ub7ec\uc624\ub294 \uc911..."})]}),(0,d.jsx)(c.A,{})]})})]})}},9057:(e,s,a)=>{a.d(s,{A:()=>i});a(5043);var t=a(1675),l=a(579);const i=()=>(0,l.jsx)("aside",{className:"social-sidebar",children:(0,l.jsx)("nav",{className:"nav-menu",children:(0,l.jsxs)("ul",{children:[(0,l.jsx)("li",{children:(0,l.jsx)(t.N_,{to:"/quiz",children:"AI\uac00\uc0ac \ud034\uc988"})}),(0,l.jsx)("li",{children:(0,l.jsx)(t.N_,{to:"/songquiz",children:"\ub178\ub798\ud034\uc988"})}),(0,l.jsx)("li",{children:(0,l.jsx)(t.N_,{to:"/streaming",children:"\uc2a4\ud2b8\ub9ac\ubc0d"})})]})})})}}]);
//# sourceMappingURL=477.ec8f4f50.chunk.js.map