"use strict";(self.webpackChunkmusicovery_front=self.webpackChunkmusicovery_front||[]).push([[553],{486:(e,s,t)=>{t.d(s,{A:()=>c});var a=t(5043),i=t(4935),l=t(6375),n=t(579);const c=e=>{let{onSelectTrack:s}=e;const{keyword:t,setKeyword:c,results:r,handleSearch:o,isPremium:d}=(0,l.A)(),[h,u]=(0,a.useState)(!1);return(0,n.jsxs)("div",{className:"music-search",children:[d,(0,n.jsxs)("form",{onSubmit:e=>{e.preventDefault(),o(),u(!0)},children:[" ",(0,n.jsx)("input",{className:"music-search-input",type:"text",value:t,onChange:e=>c(e.target.value),placeholder:"\uc74c\uc545 \uac80\uc0c9"}),(0,n.jsx)("button",{type:"submit",children:"\ud83d\udd0e"})]}),(0,n.jsx)("div",{className:"music-search-results",children:h||0!==r.length?r.map(((e,t)=>(0,n.jsx)("div",{onClick:()=>s(e),children:(0,n.jsx)(i.A,{track:e,isPremium:d})},e.id))):(0,n.jsx)("div",{className:"music-search-placeholder",children:"\uac80\uc0c9\uc5b4 \uc785\ub825..."})})]})}},4553:(e,s,t)=>{t.r(s),t.d(s,{default:()=>o});var a=t(5043),i=(t(6680),t(5026)),l=t(5422),n=t(5520),c=t(9057),r=t(579);const o=()=>{const[e,s]=(0,a.useState)(""),[t,o]=(0,a.useState)([]),[d,h]=(0,a.useState)(null),[u,m]=(0,a.useState)(!1),[p,y]=(0,a.useState)(!1),[x,j]=(0,a.useState)(""),v=localStorage.getItem("MUSICOVERY_ACCESS_TOKEN"),[g,f]=(0,a.useState)(null),[N,b]=(0,a.useState)(!1),[k,C]=(0,a.useState)([]);(0,a.useEffect)((()=>{const e=document.createElement("script");e.src="https://sdk.scdn.co/spotify-player.js",e.async=!0,document.body.appendChild(e),window.onSpotifyWebPlaybackSDKReady=()=>{const e=new window.Spotify.Player({name:"SongQuiz Web Player",getOAuthToken:e=>{e(v)},volume:.5});e.addListener("ready",(e=>{let{device_id:s}=e;console.log("\u2705 Web Playback SDK \ud65c\uc131\ud654\ub428, Device ID:",s),f(s),S(s)})),e.addListener("not_ready",(e=>{let{device_id:s}=e;console.log("\u274c \ub514\ubc14\uc774\uc2a4 \uc900\ube44 \uc548\ub428:",s)})),e.addListener("initialization_error",(e=>{let{message:s}=e;console.error("\ucd08\uae30\ud654 \uc624\ub958:",s)})),e.addListener("authentication_error",(e=>{let{message:s}=e;console.error("\uc778\uc99d \uc624\ub958:",s)})),e.connect()}}),[v]);const S=async e=>{try{await fetch("https://api.spotify.com/v1/me/player",{method:"PUT",headers:{Authorization:`Bearer ${v}`,"Content-Type":"application/json"},body:JSON.stringify({device_ids:[e],play:!1})});console.log(`\ud83c\udfa7 \ub514\ubc14\uc774\uc2a4 \ud65c\uc131\ud654 \uc131\uacf5: ${e}`)}catch(s){console.error("\ud83d\udd34 \ub514\ubc14\uc774\uc2a4 \ud65c\uc131\ud654 \uc2e4\ud328:",s)}};(0,a.useEffect)((()=>{(async()=>{try{const e=await fetch("https://api.spotify.com/v1/me/player/devices",{headers:{Authorization:`Bearer ${v}`,"Content-Type":"application/json"}}),s=await e.json();console.log("\uc0ac\uc6a9 \uac00\ub2a5\ud55c \ub514\ubc14\uc774\uc2a4:",s);const t=s.devices.find((e=>e.name.includes("Web Player")||e.is_active));t?(f(t.id),console.log(`\ud83c\udfb5 \uc0ac\uc6a9 \uc911\uc778 \ub514\ubc14\uc774\uc2a4: ${t.name}`),S(t.id)):console.error("\u274c Spotify \ub514\ubc14\uc774\uc2a4\uac00 \uc5c6\uc2b5\ub2c8\ub2e4. \uc6f9 \ud50c\ub808\uc774\uc5b4\ub098 \ub370\uc2a4\ud06c\ud1b1 \uc571\uc744 \uc2e4\ud589\ud558\uc138\uc694.")}catch(e){console.error("\ub514\ubc14\uc774\uc2a4 \uac00\uc838\uc624\uae30 \uc2e4\ud328:",e)}})()}),[]);const w=async(e,s)=>{if(d&&g)try{await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${g}`,{method:"PUT",headers:{Authorization:`Bearer ${v}`,"Content-Type":"application/json"},body:JSON.stringify({uris:[d.uri],position_ms:e})}),console.log(`\ud83c\udfb5 ${e/1e3}\ucd08\ubd80\ud130 \uc7ac\uc0dd \uc2dc\uc791!`),setTimeout((async()=>{await fetch(`https://api.spotify.com/v1/me/player/pause?device_id=${g}`,{method:"PUT",headers:{Authorization:`Bearer ${v}`,"Content-Type":"application/json"}}),console.log(`\u23f8\ufe0f ${s/1e3}\ucd08 \ud6c4 \uc790\ub3d9 \uc815\uc9c0\ub428!`)}),s)}catch(t){console.error("\ud83d\udd34 \uc7ac\uc0dd \uc911 \uc624\ub958 \ubc1c\uc0dd:",t)}else console.error("\u274c \ud2b8\ub799 \ub610\ub294 \ub514\ubc14\uc774\uc2a4 ID \uc5c6\uc74c")};return(0,r.jsxs)("div",{className:"song-quiz-container",children:[(0,r.jsx)(l.A,{}),(0,r.jsx)(n.A,{children:(0,r.jsxs)("div",{className:"song-quiz-social-layout",children:[(0,r.jsxs)("div",{className:"song-quiz",children:[(0,r.jsx)("h1",{className:"song-quiz-title",children:"1\ucd08 \ub4e3\uace0 \ub178\ub798 \ub9de\ucd94\uae30 Quiz !"}),(0,r.jsxs)("h2",{className:"artistTitle",children:["1\ucd08 \ub3d9\uc548 \ub098\uc624\ub294 \ub178\ub798\ub97c \uc798 \ub4e3\uace0 ",(0,r.jsx)("br",{}),"\ub178\ub798 \uc81c\ubaa9\uc744 \ub9de\ucdb0\ubcf4\uc138\uc694 !"]}),(0,r.jsxs)("div",{className:"artistSelect",children:[(0,r.jsx)("h4",{className:"artistTitle",children:"\uc544\ud2f0\uc2a4\ud2b8 \uc120\ud0dd\ud558\uae30 \u25b6"}),(0,r.jsxs)("div",{className:"artistSelectIn",children:[(0,r.jsx)("input",{type:"text",placeholder:"\uc544\ud2f0\uc2a4\ud2b8 \uc774\ub984 \uc785\ub825",value:e,className:"forBorder",onChange:e=>s(e.target.value)}),(0,r.jsx)("button",{className:"song-quiz-button",onClick:async()=>{try{var s,t;const a=await i.A.get(`/api/spotify/searchArtist?query=${encodeURIComponent(e)}`);console.log("\uac80\uc0c9 \uacb0\uacfc:",a.data),(null===(s=a.data)||void 0===s||null===(t=s.tracks)||void 0===t?void 0:t.length)>0?(o(a.data.tracks),h(a.data.tracks[0])):console.log("\ud2b8\ub799\uc774 \uc5c6\uc2b5\ub2c8\ub2e4.")}catch(a){console.error("\uc544\ud2f0\uc2a4\ud2b8 \uac80\uc0c9 \uc2e4\ud328:",a)}},children:"\uac80\uc0c9"})]})]}),d&&(0,r.jsxs)("div",{className:"SendBtn",children:[(0,r.jsx)("h4",{className:"artistTitle",children:"\uc774 \uace1\uc758 \uc81c\ubaa9\uc740 ? "}),(0,r.jsxs)("div",{className:"resultTool",children:[(0,r.jsx)("input",{type:"text",placeholder:"\uc815\ub2f5\uc744 \uc785\ub825\ud558\uc138\uc694",value:x,className:"forBorder",onChange:e=>j(e.target.value)}),(0,r.jsx)("button",{className:"song-quiz-button",onClick:async()=>{const e=x.trim().toLowerCase(),s=d.name.toLowerCase();try{console.log(`/api/sometitle \uc694\uccad: title=${d.name}`);const a=await i.A.get("/api/sometitle",{params:{title:d.name}});console.log("/api/sometitle \uc751\ub2f5:",a.data);const l=(a.data||[]).map((e=>e.trim().toLowerCase()));if(e===s||l.includes(e)){alert("\uc815\ub2f5\uc785\ub2c8\ub2e4! \uac19\uc740 \uc544\ud2f0\uc2a4\ud2b8\uc758 \ub2e4\ub978 \uace1\uc744 \ub9de\ucdb0\ubcf4\uc138\uc694."),j(""),C((e=>[...e,d.name]));const e=t.findIndex((e=>e.id===d.id))+1;e<t.length?(h(t[e]),y(!1)):console.log("\ud83c\udf89 \ud034\uc988 \uc885\ub8cc")}else alert("\ud2c0\ub838\uc2b5\ub2c8\ub2e4. \ub2e4\uc2dc \uc2dc\ub3c4\ud574 \ubcf4\uc138\uc694."),j("")}catch(a){console.error("\ub300\uccb4 \uc81c\ubaa9\uc744 \uac00\uc838\uc624\ub294 \uc911 \uc624\ub958 \ubc1c\uc0dd:",a),alert("\uc624\ub958\uac00 \ubc1c\uc0dd\ud588\uc2b5\ub2c8\ub2e4. \ub2e4\uc2dc \uc2dc\ub3c4\ud574 \uc8fc\uc138\uc694.")}},children:"\uc815\ub2f5 \uc81c\ucd9c"}),(0,r.jsx)("button",{className:"song-quiz-button",onClick:()=>{N||(b(!0),w(6e4,1e3),setTimeout((()=>b(!1)),1e3),setTimeout((()=>y(!0)),2e4))},children:"\uc7ac\uc0dd"}),p&&(0,r.jsx)("button",{className:"song-quiz-button",onClick:()=>{w(6e4,3e3)},children:"\ud78c\ud2b8"})]})]})]}),(0,r.jsx)(c.A,{})]})})]})}},4935:(e,s,t)=>{t.d(s,{A:()=>u});var a=t(5043),i=t(7950),l=t(5026),n=t(4003),c=t(7138),r=t(9428),o=t(579);const d=a.memo((e=>{let{playlist:s,isChecked:t,onCheck:a}=e;return(0,o.jsxs)("div",{className:"playlist-modal-item",children:[(0,o.jsx)("input",{type:"checkbox",id:`playlist-${s.playlistId}`,checked:t,onChange:()=>a(s.playlistId)}),(0,o.jsxs)("label",{htmlFor:`playlist-${s.playlistId}`,className:"playlist-modal-label",children:[(0,o.jsx)("div",{className:"playlist-modal-image-container",children:(0,o.jsx)("img",{src:(0,c.V)(s.playlistPhoto),alt:s.playlistTitle,className:"playlist-modal-image"})}),(0,o.jsx)("span",{className:"playlist-modal-name",children:s.playlistTitle})]})]})})),h=a.memo((e=>{let{playlists:s,selectedPlaylists:t,loading:a,onCheck:i,onClose:l,onAdd:n}=e;return(0,o.jsx)("div",{className:"playlist-modal-overlay",onClick:l,children:(0,o.jsxs)("div",{className:"playlist-modal",onClick:e=>e.stopPropagation(),children:[(0,o.jsxs)("div",{className:"playlist-modal-header",children:[(0,o.jsx)("h3",{children:"\ud50c\ub808\uc774\ub9ac\uc2a4\ud2b8\uc5d0 \ucd94\uac00"}),(0,o.jsx)("button",{className:"playlist-modal-close",onClick:l,children:"\xd7"})]}),(0,o.jsx)("div",{className:"playlist-modal-body",children:a?(0,o.jsx)("p",{children:"\ud50c\ub808\uc774\ub9ac\uc2a4\ud2b8\ub97c \ubd88\ub7ec\uc624\ub294 \uc911..."}):0===s.length?(0,o.jsx)("p",{children:"\uc0ac\uc6a9 \uac00\ub2a5\ud55c \ud50c\ub808\uc774\ub9ac\uc2a4\ud2b8\uac00 \uc5c6\uc2b5\ub2c8\ub2e4."}):(0,o.jsx)("div",{className:"playlist-modal-list",children:s.map((e=>(0,o.jsx)(d,{playlist:e,isChecked:t.includes(e.playlistId),onCheck:i},e.playlistId)))})}),(0,o.jsx)("div",{className:"playlist-modal-footer",children:(0,o.jsx)("button",{className:"add-to-playlist-button",onClick:n,disabled:0===t.length||a,children:"\ud50c\ub808\uc774\ub9ac\uc2a4\ud2b8\uc5d0 \ucd94\uac00"})})]})})})),u=e=>{let{track:s,isPremium:t}=e;const[c,d]=(0,a.useState)({}),[u,m]=(0,a.useState)(!1),[p,y]=(0,a.useState)([]),[x,j]=(0,a.useState)([]),[v,g]=(0,a.useState)(!1),{addTrackToList:f,setIsPlaying:N,deviceReady:b}=(0,a.useContext)(r.vC),k=(0,a.useRef)(!1),C=(0,n.A)(),S=()=>{m(!1),j([])},w=(0,a.useCallback)((e=>{j((s=>s.includes(e)?s.filter((s=>s!==e)):[...s,e]))}),[]);return s&&s.album&&s.album.images&&s.album.images[0]?(0,o.jsxs)("div",{className:"track-item",onMouseEnter:e=>{const s=e.currentTarget.getBoundingClientRect();d({top:s.top-10+"px",left:`${s.left+s.width/2}px`})},onMouseLeave:()=>{d({})},children:[(0,o.jsx)("img",{className:"track-album-image-music",src:s.album.images[0].url,alt:s.name}),(0,o.jsxs)("div",{className:"track-info",children:[(0,o.jsx)("h4",{children:s.name}),(0,o.jsx)("p",{children:s.artists.map((e=>e.name)).join(", ")}),(0,o.jsxs)("div",{className:"tooltip",style:c,children:[(0,o.jsx)("h4",{children:s.name}),(0,o.jsx)("p",{children:s.artists.map((e=>e.name)).join(", ")})]})]}),(0,o.jsxs)("div",{className:"track-play-button-container",children:[(0,o.jsx)("button",{onClick:()=>(async e=>{if(t)try{f(e),b?N(!0):b||setTimeout((()=>{N(!0)}),1e3)}catch(i){var s,a;if(console.error("\ud2b8\ub799 \uc7ac\uc0dd \uc911 \uc624\ub958:",i),403===(null===(s=i.response)||void 0===s?void 0:s.status))return void window.open(e.external_urls.spotify,"_blank");404===(null===(a=i.response)||void 0===a?void 0:a.status)?alert("Spotify \ud50c\ub808\uc774\uc5b4\ub97c \ucd08\uae30\ud654 \uc911\uc785\ub2c8\ub2e4. \uc7a0\uc2dc \ud6c4\uc5d0 \ub2e4\uc2dc \uc2dc\ub3c4\ud574\uc8fc\uc138\uc694."):alert("\ud2b8\ub799\uc744 \uc7ac\uc0dd\ud560 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4. \ub2e4\uc2dc \uc2dc\ub3c4\ud574\uc8fc\uc138\uc694.")}else window.open(e.external_urls.spotify,"_blank")})(s),className:t?"premium-play":"spotify-link",children:t?"\u25b6":"LINK"}),(0,o.jsx)("button",{className:"add-track-to-playlist-button",onClick:()=>{m(!0),C&&!k.current&&(async e=>{if(e&&!k.current){g(!0);try{const s=await l.A.get(`/playlist/user/${e}`);y(s.data||[]),k.current=!0}catch(s){console.error("\ud50c\ub808\uc774\ub9ac\uc2a4\ud2b8\ub97c \ubd88\ub7ec\uc624\ub294 \ub370 \uc2e4\ud328\ud588\uc2b5\ub2c8\ub2e4:",s)}finally{g(!1)}}})(C.userId)},children:"\u2795"})]}),u&&i.createPortal((0,o.jsx)(h,{playlists:p,selectedPlaylists:x,loading:v,onCheck:w,onClose:S,onAdd:async()=>{if(0!==x.length)try{const e=x.map((e=>l.A.post(`/api/spotify/playlist/${e}/track`,null,{params:{trackId:s.id}})));await Promise.all(e),alert("\uc120\ud0dd\ud55c \ud50c\ub808\uc774\ub9ac\uc2a4\ud2b8\uc5d0 \ud2b8\ub799\uc774 \ucd94\uac00\ub418\uc5c8\uc2b5\ub2c8\ub2e4."),S()}catch(e){console.error("\ud50c\ub808\uc774\ub9ac\uc2a4\ud2b8\uc5d0 \ud2b8\ub799 \ucd94\uac00 \uc2e4\ud328:",e),alert("\ud50c\ub808\uc774\ub9ac\uc2a4\ud2b8\uc5d0 \ud2b8\ub799 \ucd94\uac00 \uc911 \uc624\ub958\uac00 \ubc1c\uc0dd\ud588\uc2b5\ub2c8\ub2e4.")}else alert("\ud50c\ub808\uc774\ub9ac\uc2a4\ud2b8\ub97c \uc120\ud0dd\ud574\uc8fc\uc138\uc694.")}}),document.body)]},s.id):null}},5520:(e,s,t)=>{t.d(s,{A:()=>d});var a=t(5043),i=t(486),l=t(5026),n=t(4003),c=t(1675),r=t(579);const o=()=>{const e=(0,c.Zp)(),[s,t]=(0,a.useState)([]),[i,o]=(0,a.useState)([]),[d,h]=(0,a.useState)([]),[u,m]=(0,a.useState)(!1),[p,y]=(0,a.useState)(""),[x,j]=(0,a.useState)([]),[v,g]=(0,a.useState)("search"),f=(0,n.A)();(0,a.useEffect)((()=>{f&&(N(),b(),k())}),[f]);const N=async()=>{try{const e=await l.A.get(`/friends/list?userId=${f.id}`);t(e.data)}catch(e){console.error("\uce5c\uad6c \ubaa9\ub85d\uc744 \uac00\uc838\uc624\ub294 \ub370 \uc2e4\ud328\ud588\uc2b5\ub2c8\ub2e4.",e)}},b=async()=>{try{const e=await l.A.get(`/friends/friendRequests?friendId=${f.id}`);o(e.data)}catch(e){console.error("\uce5c\uad6c \uc694\uccad \ubaa9\ub85d\uc744 \uac00\uc838\uc624\ub294 \ub370 \uc2e4\ud328\ud588\uc2b5\ub2c8\ub2e4.",e)}},k=async()=>{try{const e=await l.A.get(`/friends/pendingRequests?userId=${f.id}`);h(e.data)}catch(e){console.error("\ub0b4\uac00 \uc694\uccad\ud55c \uce5c\uad6c \ubaa9\ub85d\uc744 \uac00\uc838\uc624\ub294 \ub370 \uc2e4\ud328\ud588\uc2b5\ub2c8\ub2e4.",e)}},C=e=>s.some((s=>s.friend.id===e))||i.some((s=>s.user.id===e))||d.some((s=>s.friend.id===e));return(0,r.jsxs)("div",{children:[(0,r.jsxs)("div",{className:"friends-list-container",children:[(0,r.jsx)("h2",{children:"\uce5c\uad6c \ubaa9\ub85d"}),(0,r.jsx)("button",{onClick:()=>m(!0),className:"add-friend-button",children:"\uce5c\uad6c \ucd94\uac00"}),(0,r.jsx)("div",{className:"friends-list",children:s.map((s=>(0,r.jsxs)("div",{className:"friend-item",onClick:()=>(s=>{e("/playlistPage",{state:{friendInfo:s}})})(s.friend.id===f.id?s.user:s.friend),children:[(0,r.jsxs)("p",{children:[(0,r.jsx)("strong",{children:"\uce5c\uad6c \ubcc4\uba85 :"})," ",s.friend.id===f.id?s.user.nickname:s.friend.nickname]}),(0,r.jsx)("button",{className:"friend-delete-button",onClick:e=>(async(e,s)=>{s.stopPropagation();try{await l.A.delete("/friends/delete",{params:{userId:f.id,friendId:e}}),N()}catch(t){console.error("\uce5c\uad6c \uc0ad\uc81c\uc5d0 \uc2e4\ud328\ud588\uc2b5\ub2c8\ub2e4.",t)}})(s.friend.id,e),children:"\u274c"})]},s.id)))})]}),u&&(0,r.jsx)("div",{className:"modal",children:(0,r.jsxs)("div",{className:"modal-content",children:[(0,r.jsx)("span",{className:"close",onClick:()=>m(!1),children:"\xd7"}),(0,r.jsxs)("div",{className:"modal-tabs",children:[(0,r.jsx)("button",{className:"modal-tab-button "+("search"===v?"active":""),onClick:()=>g("search"),children:"\uce5c\uad6c \uac80\uc0c9"}),(0,r.jsx)("button",{className:"modal-tab-button "+("pending"===v?"active":""),onClick:()=>g("pending"),children:"\uc694\uccad\ud55c \ubaa9\ub85d"}),(0,r.jsx)("button",{className:"modal-tab-button "+("requests"===v?"active":""),onClick:()=>g("requests"),children:"\ubc1b\uc740 \uce5c\uad6c \uc694\uccad"})]}),"search"===v&&(0,r.jsxs)("div",{className:"friendlist-search-tab",children:[(0,r.jsx)("h2",{children:"\uce5c\uad6c \ucd94\uac00"}),(0,r.jsx)("input",{type:"text",placeholder:"\uac80\uc0c9 (ID, \uc774\uba54\uc77c, \ub2c9\ub124\uc784)",value:p,onChange:e=>y(e.target.value)}),(0,r.jsx)("button",{onClick:async()=>{try{const e=await l.A.get(`/friends/search?keyword=${p}`);j(e.data)}catch(e){console.error("\uc0ac\uc6a9\uc790 \uac80\uc0c9\uc5d0 \uc2e4\ud328\ud588\uc2b5\ub2c8\ub2e4.",e)}},children:"\uac80\uc0c9"}),(0,r.jsx)("div",{className:"search-results",children:x.map((e=>(0,r.jsxs)("div",{className:"search-result-item",children:[(0,r.jsxs)("p",{children:[(0,r.jsx)("strong",{children:"ID:"})," ",e.id]}),(0,r.jsxs)("p",{children:[(0,r.jsx)("strong",{children:"\uc774\uba54\uc77c:"})," ",e.email]}),(0,r.jsxs)("p",{children:[(0,r.jsx)("strong",{children:"\ub2c9\ub124\uc784:"})," ",e.nickname]}),(0,r.jsx)("button",{onClick:()=>(async e=>{try{await l.A.post("/friends/add",{userId:f.id,friendId:e}),N(),k()}catch(s){console.error("\uce5c\uad6c \ucd94\uac00\uc5d0 \uc2e4\ud328\ud588\uc2b5\ub2c8\ub2e4.",s)}})(e.id),disabled:C(e.id),children:C(e.id)?"\uc694\uccad\ub428":"\uce5c\uad6c \ucd94\uac00"})]},e.id)))})]}),"pending"===v&&(0,r.jsxs)("div",{className:"friendlist-pending-tab",children:[(0,r.jsx)("h2",{children:"\uc694\uccad\ud55c \ubaa9\ub85d"}),(0,r.jsx)("div",{className:"pending-requests-list",children:0===d.length?(0,r.jsx)("p",{children:"\uc694\uccad\ud55c \ubaa9\ub85d\uc774 \uc5c6\uc2b5\ub2c8\ub2e4."}):d.map((e=>(console.log(e),(0,r.jsx)("div",{className:"pending-request-item",children:(0,r.jsxs)("p",{children:[(0,r.jsx)("strong",{children:"\uc694\uccad\ud55c \uc0ac\uc6a9\uc790 ID:"})," ",e.friend.nickname]})},e.id))))})]}),"requests"===v&&(0,r.jsxs)("div",{className:"friendlist-requests-tab",children:[(0,r.jsx)("h2",{children:"\ubc1b\uc740 \uce5c\uad6c \uc694\uccad"}),(0,r.jsx)("div",{className:"friend-requests-list",children:0===i.length?(0,r.jsx)("p",{children:"\ubc1b\uc740 \uc694\uccad\uc774 \uc5c6\uc2b5\ub2c8\ub2e4."}):i.map((e=>(console.log(e),(0,r.jsx)("div",{className:"friend-request-item",children:(0,r.jsxs)("p",{children:[(0,r.jsx)("strong",{children:"\uc694\uccad\ud55c \uc0ac\uc6a9\uc790:"})," ",e.user.nickname,(0,r.jsx)("button",{className:"accept-button",onClick:()=>(async e=>{try{await l.A.post("/friends/accept",null,{params:{friendRequestId:e}}),N(),b()}catch(s){console.error("\uce5c\uad6c \uc694\uccad \uc218\ub77d\uc5d0 \uc2e4\ud328\ud588\uc2b5\ub2c8\ub2e4.",s)}})(e.id),children:"\u2705"})]})},e.id))))})]})]})})]})},d=e=>{let{children:s}=e;return(0,r.jsxs)("div",{className:"sidebar-layout-layout",children:[(0,r.jsxs)("div",{className:"sidebar-layout-sidebar",children:[(0,r.jsx)(i.A,{onSelectTrack:()=>{}}),(0,r.jsx)(o,{})]}),(0,r.jsx)("div",{className:"sidebar-layout-main-content",children:s})]})}},6375:(e,s,t)=>{t.d(s,{A:()=>n});var a=t(5043),i=t(5026),l=t(6213);const n=()=>{const[e,s]=(0,a.useState)(""),[t,n]=(0,a.useState)([]),[c,r]=(0,a.useState)(new Audio),[o,d]=(0,a.useState)(!1),[h,u]=(0,a.useState)(null);(0,a.useEffect)((()=>{(async()=>{try{const e=await i.A.get("/api/spotify/userInfo");d("premium"===e.data.product)}catch(e){}})()}),[]),(0,a.useEffect)((()=>{(async()=>{try{const e=(await i.A.get("/music/devices",{headers:{Authorization:`Bearer ${localStorage.getItem("MUSICOVERY_ACCESS_TOKEN")}`}})).data.devices;e.length>0&&(u(e[0].id),await(async e=>{try{const s="https://api.spotify.com/v1/me/player";await l.A.put(s,{device_ids:[e],play:!0},{headers:{Authorization:`Bearer ${localStorage.getItem("MUSICOVERY_ACCESS_TOKEN")}`}})}catch(s){throw console.error("Failed to transfer playback:",s),s}})(e[0].id))}catch(e){console.error("Failed to fetch devices",e)}})()}),[]);return{keyword:e,setKeyword:s,results:t,handleSearch:async s=>{try{const s=(await i.A.get(`/api/spotify/search?keyword=${e}&type=track`)).data.tracks.items.filter((e=>e.is_playable));n(s)}catch(t){console.error("Failed to search music",t),n([])}},isPremium:o,deviceId:h}}},7138:(e,s,t)=>{t.d(s,{N:()=>l,V:()=>i});const a="http://211.243.7.215:8080/images/default.png",i=e=>e?e.startsWith("/images/")?`http://211.243.7.215:8080${e}`:e:a,l=()=>a},9057:(e,s,t)=>{t.d(s,{A:()=>l});t(5043);var a=t(1675),i=t(579);const l=()=>(0,i.jsx)("aside",{className:"social-sidebar",children:(0,i.jsx)("nav",{className:"nav-menu",children:(0,i.jsxs)("ul",{children:[(0,i.jsx)("li",{children:(0,i.jsx)(a.N_,{to:"/quiz",children:"AI\uac00\uc0ac \ud034\uc988"})}),(0,i.jsx)("li",{children:(0,i.jsx)(a.N_,{to:"/songquiz",children:"\ub178\ub798\ud034\uc988"})}),(0,i.jsx)("li",{children:(0,i.jsx)(a.N_,{to:"/streaming",children:"\uc2a4\ud2b8\ub9ac\ubc0d"})})]})})})}}]);
//# sourceMappingURL=553.2a4282b2.chunk.js.map