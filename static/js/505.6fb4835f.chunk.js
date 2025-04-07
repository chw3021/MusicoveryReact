"use strict";(self.webpackChunkmusicovery_front=self.webpackChunkmusicovery_front||[]).push([[505],{486:(e,s,a)=>{a.d(s,{A:()=>c});var t=a(5043),l=a(4935),i=a(6375),n=a(579);const c=e=>{let{onSelectTrack:s}=e;const{keyword:a,setKeyword:c,results:r,handleSearch:d,isPremium:o}=(0,i.A)(),[h,m]=(0,t.useState)(!1);return(0,n.jsxs)("div",{className:"music-search",children:[o,(0,n.jsxs)("form",{onSubmit:e=>{e.preventDefault(),d(),m(!0)},children:[" ",(0,n.jsx)("input",{className:"music-search-input",type:"text",value:a,onChange:e=>c(e.target.value),placeholder:"\uc74c\uc545 \uac80\uc0c9"}),(0,n.jsx)("button",{type:"submit",children:"\ud83d\udd0e"})]}),(0,n.jsx)("div",{className:"music-search-results",children:h||0!==r.length?r.map(((e,a)=>(0,n.jsx)("div",{onClick:()=>s(e),children:(0,n.jsx)(l.A,{track:e,isPremium:o})},e.id))):(0,n.jsx)("div",{className:"music-search-placeholder",children:"\uac80\uc0c9\uc5b4 \uc785\ub825..."})})]})}},4935:(e,s,a)=>{a.d(s,{A:()=>m});var t=a(5043),l=a(7950),i=a(5026),n=a(4003),c=a(7138),r=a(9428),d=a(579);const o=t.memo((e=>{let{playlist:s,isChecked:a,onCheck:t}=e;return(0,d.jsxs)("div",{className:"playlist-modal-item",children:[(0,d.jsx)("input",{type:"checkbox",id:`playlist-${s.playlistId}`,checked:a,onChange:()=>t(s.playlistId)}),(0,d.jsxs)("label",{htmlFor:`playlist-${s.playlistId}`,className:"playlist-modal-label",children:[(0,d.jsx)("div",{className:"playlist-modal-image-container",children:(0,d.jsx)("img",{src:(0,c.V)(s.playlistPhoto),alt:s.playlistTitle,className:"playlist-modal-image"})}),(0,d.jsx)("span",{className:"playlist-modal-name",children:s.playlistTitle})]})]})})),h=t.memo((e=>{let{playlists:s,selectedPlaylists:a,loading:t,onCheck:l,onClose:i,onAdd:n}=e;return(0,d.jsx)("div",{className:"playlist-modal-overlay",onClick:i,children:(0,d.jsxs)("div",{className:"playlist-modal",onClick:e=>e.stopPropagation(),children:[(0,d.jsxs)("div",{className:"playlist-modal-header",children:[(0,d.jsx)("h3",{children:"\ud50c\ub808\uc774\ub9ac\uc2a4\ud2b8\uc5d0 \ucd94\uac00"}),(0,d.jsx)("button",{className:"playlist-modal-close",onClick:i,children:"\xd7"})]}),(0,d.jsx)("div",{className:"playlist-modal-body",children:t?(0,d.jsx)("p",{children:"\ud50c\ub808\uc774\ub9ac\uc2a4\ud2b8\ub97c \ubd88\ub7ec\uc624\ub294 \uc911..."}):0===s.length?(0,d.jsx)("p",{children:"\uc0ac\uc6a9 \uac00\ub2a5\ud55c \ud50c\ub808\uc774\ub9ac\uc2a4\ud2b8\uac00 \uc5c6\uc2b5\ub2c8\ub2e4."}):(0,d.jsx)("div",{className:"playlist-modal-list",children:s.map((e=>(0,d.jsx)(o,{playlist:e,isChecked:a.includes(e.playlistId),onCheck:l},e.playlistId)))})}),(0,d.jsx)("div",{className:"playlist-modal-footer",children:(0,d.jsx)("button",{className:"add-to-playlist-button",onClick:n,disabled:0===a.length||t,children:"\ud50c\ub808\uc774\ub9ac\uc2a4\ud2b8\uc5d0 \ucd94\uac00"})})]})})})),m=e=>{let{track:s,isPremium:a}=e;const[c,o]=(0,t.useState)({}),[m,u]=(0,t.useState)(!1),[p,x]=(0,t.useState)([]),[y,j]=(0,t.useState)([]),[v,g]=(0,t.useState)(!1),{addTrackToList:f,setIsPlaying:N,deviceReady:k}=(0,t.useContext)(r.vC),b=(0,t.useRef)(!1),S=(0,n.A)(),C=()=>{u(!1),j([])},w=(0,t.useCallback)((e=>{j((s=>s.includes(e)?s.filter((s=>s!==e)):[...s,e]))}),[]);return s&&s.album&&s.album.images&&s.album.images[0]?(0,d.jsxs)("div",{className:"track-item",onMouseEnter:e=>{const s=e.currentTarget.getBoundingClientRect();o({top:s.top-10+"px",left:`${s.left+s.width/2}px`})},onMouseLeave:()=>{o({})},children:[(0,d.jsx)("img",{className:"track-album-image-music",src:s.album.images[0].url,alt:s.name}),(0,d.jsxs)("div",{className:"track-info",children:[(0,d.jsx)("h4",{children:s.name}),(0,d.jsx)("p",{children:s.artists.map((e=>e.name)).join(", ")}),(0,d.jsxs)("div",{className:"tooltip",style:c,children:[(0,d.jsx)("h4",{children:s.name}),(0,d.jsx)("p",{children:s.artists.map((e=>e.name)).join(", ")})]})]}),(0,d.jsxs)("div",{className:"track-play-button-container",children:[(0,d.jsx)("button",{onClick:()=>(async e=>{if(a)try{f(e),k?N(!0):k||setTimeout((()=>{N(!0)}),1e3)}catch(l){var s,t;if(console.error("\ud2b8\ub799 \uc7ac\uc0dd \uc911 \uc624\ub958:",l),403===(null===(s=l.response)||void 0===s?void 0:s.status))return void window.open(e.external_urls.spotify,"_blank");404===(null===(t=l.response)||void 0===t?void 0:t.status)?alert("Spotify \ud50c\ub808\uc774\uc5b4\ub97c \ucd08\uae30\ud654 \uc911\uc785\ub2c8\ub2e4. \uc7a0\uc2dc \ud6c4\uc5d0 \ub2e4\uc2dc \uc2dc\ub3c4\ud574\uc8fc\uc138\uc694."):alert("\ud2b8\ub799\uc744 \uc7ac\uc0dd\ud560 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4. \ub2e4\uc2dc \uc2dc\ub3c4\ud574\uc8fc\uc138\uc694.")}else window.open(e.external_urls.spotify,"_blank")})(s),className:a?"premium-play":"spotify-link",children:a?"\u25b6":"LINK"}),(0,d.jsx)("button",{className:"add-track-to-playlist-button",onClick:()=>{u(!0),S&&!b.current&&(async e=>{if(e&&!b.current){g(!0);try{const s=await i.A.get(`/playlist/user/${e}`);x(s.data||[]),b.current=!0}catch(s){console.error("\ud50c\ub808\uc774\ub9ac\uc2a4\ud2b8\ub97c \ubd88\ub7ec\uc624\ub294 \ub370 \uc2e4\ud328\ud588\uc2b5\ub2c8\ub2e4:",s)}finally{g(!1)}}})(S.userId)},children:"\u2795"})]}),m&&l.createPortal((0,d.jsx)(h,{playlists:p,selectedPlaylists:y,loading:v,onCheck:w,onClose:C,onAdd:async()=>{if(0!==y.length)try{const e=y.map((e=>i.A.post(`/api/spotify/playlist/${e}/track`,null,{params:{trackId:s.id}})));await Promise.all(e),alert("\uc120\ud0dd\ud55c \ud50c\ub808\uc774\ub9ac\uc2a4\ud2b8\uc5d0 \ud2b8\ub799\uc774 \ucd94\uac00\ub418\uc5c8\uc2b5\ub2c8\ub2e4."),C()}catch(e){console.error("\ud50c\ub808\uc774\ub9ac\uc2a4\ud2b8\uc5d0 \ud2b8\ub799 \ucd94\uac00 \uc2e4\ud328:",e),alert("\ud50c\ub808\uc774\ub9ac\uc2a4\ud2b8\uc5d0 \ud2b8\ub799 \ucd94\uac00 \uc911 \uc624\ub958\uac00 \ubc1c\uc0dd\ud588\uc2b5\ub2c8\ub2e4.")}else alert("\ud50c\ub808\uc774\ub9ac\uc2a4\ud2b8\ub97c \uc120\ud0dd\ud574\uc8fc\uc138\uc694.")}}),document.body)]},s.id):null}},5505:(e,s,a)=>{a.r(s),a.d(s,{default:()=>y});var t=a(5043),l=a(1675),i=a(5422),n=a(9057),c=a(5026),r=a(5081),d=a.n(r),o=a(7285),h=a(5928),m=a(4935),u=a(7138),p=a(5520),x=a(579);const y=()=>{var e;const{streamId:s}=(0,l.g)(),[a,r]=(0,t.useState)([]),[y,j]=(0,t.useState)(""),[v,g]=(0,t.useState)(null),[f,N]=(0,t.useState)(null),[k,b]=(0,t.useState)(null),S=(0,t.useRef)(null),[C,w]=(0,t.useState)(null),[A,I]=(0,t.useState)(!1);(0,t.useEffect)((()=>{(async()=>{try{const e=await c.A.get(`/api/streaming/${s}`);N(e.data)}catch(e){console.error("\uc2a4\ud2b8\ub9ac\ubc0d \uc815\ubcf4\ub97c \uac00\uc838\uc624\ub294 \ub370 \uc2e4\ud328:",e)}})(),(async()=>{try{const e=await c.A.get("/api/spotify/userInfo");g(e.data)}catch(e){console.error("\uc720\uc800 \uc815\ubcf4\ub97c \uac00\uc838\uc624\ub294 \ub370 \uc2e4\ud328:",e)}})();const e=new(d())("https://211.243.7.215:8080/chat"),a=new o.K({webSocketFactory:()=>e,connectHeaders:{login:"user",passcode:"password"},onConnect:()=>{console.log("STOMP \uc5f0\uacb0 \uc131\uacf5"),a.subscribe(`/topic/chat/${s}`,(e=>{const s=JSON.parse(e.body);r((e=>[...e,s]))}))},onStompError:e=>{console.error("STOMP \uc624\ub958:",e.headers.message)},onWebSocketError:e=>{console.error("WebSocket \uc624\ub958:",e)},debug:e=>{console.log(e)}});return b(a),a.activate(),()=>{a.deactivate()}}),[s]),(0,t.useEffect)((()=>{(async()=>{if(f&&f.playlist)try{const e=await c.A.get(`/playlist/detail/${f.playlist.playlistId}`),s=(0,h.C)(e.data.tracks);w({...e.data.playlist,tracksData:s,playlistPhoto:e.data.playlist.playlistPhoto||(0,u.N)()})}catch(e){console.error("Error fetching playlist detail",e)}})()}),[f]),(0,t.useEffect)((()=>{S.current&&S.current.scrollIntoView({behavior:"smooth"})}),[a]);const $=()=>{if(!y.trim())return;const e={streamId:s,sender:v?v.display_name:"Unknown User",content:y,receiver:"receiver_nickname"};k&&k.connected?(k.publish({destination:`/app/chat/${s}`,body:JSON.stringify(e)}),j(""),c.A.post(`/api/streaming/${s}/lastMessage`,{lastMessage:e.content}).catch((e=>console.error("\ub9c8\uc9c0\ub9c9 \uba54\uc2dc\uc9c0\ub97c \uc800\uc7a5\ud558\ub294 \ub370 \uc2e4\ud328:",e)))):console.error("STOMP \ud074\ub77c\uc774\uc5b8\ud2b8\uac00 \uc5f0\uacb0\ub418\uc5b4 \uc788\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4.")};return(0,x.jsxs)("div",{className:"chat-container",children:[(0,x.jsx)(i.A,{}),(0,x.jsx)(p.A,{children:(0,x.jsxs)("div",{className:"social-layout",children:[(0,x.jsx)("div",{children:(0,x.jsxs)("div",{className:"chat-wrapper",children:[(0,x.jsx)("div",{className:"exit",children:(0,x.jsxs)("h2",{className:"chat-title",children:[f?`${null===(e=f.hostUser)||void 0===e?void 0:e.nickname}\uc758 \uc2a4\ud2b8\ub9ac\ubc0d`:"\ub85c\ub529 \uc911...",(0,x.jsx)(l.N_,{to:"/social",children:(0,x.jsx)("button",{children:"\ub098\uac00\uae30"})})]})}),C?(0,x.jsxs)("div",{className:"streaming-playlist-info",children:[(0,x.jsxs)("div",{className:"playlist-info-place",children:[(0,x.jsxs)("p",{id:"explain",children:[(0,x.jsx)("strong",{children:"\uc124\uba85:"})," ",C.playlistComment||"\uc124\uba85\uc774 \uc5c6\uc2b5\ub2c8\ub2e4."]}),(0,x.jsxs)("p",{children:[(0,x.jsx)("strong",{children:"\ud2b8\ub799 \uc218:"})," ",C.tracksData?C.tracksData.length:0,"\uace1"]}),(0,x.jsxs)("button",{onClick:()=>{I(!A)},children:[A?"\uc811\uae30":"\ud3bc\uccd0\ubcf4\uae30"," "]})]}),A&&(0,x.jsx)("div",{className:"content-nav2",children:(0,x.jsx)("div",{className:"streaming-tracks",children:C.tracksData.map(((e,s)=>(0,x.jsx)(m.A,{track:e},s)))})})]}):(0,x.jsx)("p",{className:"playlist-info-place",children:"\ud50c\ub808\uc774\ub9ac\uc2a4\ud2b8 \uc815\ubcf4\uac00 \uc5c6\uc2b5\ub2c8\ub2e4."}),(0,x.jsxs)("div",{className:"chat-messages-input-wrapper",children:[(0,x.jsxs)("div",{className:"chat-messages",children:[a.length>0?a.map(((e,s)=>(0,x.jsxs)("div",{className:"chat-message "+(e.sender===(v?v.display_name:"Unknown User")?"my-message":"other-message"),children:[(0,x.jsxs)("strong",{children:[e.sender,":"]})," ",(0,x.jsx)("span",{children:e.content})]},s))):(0,x.jsx)("div",{className:"no-messages",children:"\uba54\uc2dc\uc9c0\uac00 \uc5c6\uc2b5\ub2c8\ub2e4."}),(0,x.jsx)("div",{ref:S})," "]}),(0,x.jsxs)("div",{className:"chat-input",children:[(0,x.jsx)("input",{type:"text",value:y,onChange:e=>j(e.target.value),onKeyDown:e=>{"Enter"===e.key&&$()},placeholder:"\uba54\uc2dc\uc9c0\ub97c \uc785\ub825\ud558\uc138\uc694..."}),(0,x.jsx)("button",{onClick:$,children:"\uc804\uc1a1"})]})]})]})}),(0,x.jsx)(n.A,{})]})})]})}},5520:(e,s,a)=>{a.d(s,{A:()=>o});var t=a(5043),l=a(486),i=a(5026),n=a(4003),c=a(1675),r=a(579);const d=()=>{const e=(0,c.Zp)(),[s,a]=(0,t.useState)([]),[l,d]=(0,t.useState)([]),[o,h]=(0,t.useState)([]),[m,u]=(0,t.useState)(!1),[p,x]=(0,t.useState)(""),[y,j]=(0,t.useState)([]),[v,g]=(0,t.useState)("search"),f=(0,n.A)();(0,t.useEffect)((()=>{f&&(N(),k(),b())}),[f]);const N=async()=>{try{const e=await i.A.get(`/friends/list?userId=${f.id}`);a(e.data)}catch(e){console.error("\uce5c\uad6c \ubaa9\ub85d\uc744 \uac00\uc838\uc624\ub294 \ub370 \uc2e4\ud328\ud588\uc2b5\ub2c8\ub2e4.",e)}},k=async()=>{try{const e=await i.A.get(`/friends/friendRequests?friendId=${f.id}`);d(e.data)}catch(e){console.error("\uce5c\uad6c \uc694\uccad \ubaa9\ub85d\uc744 \uac00\uc838\uc624\ub294 \ub370 \uc2e4\ud328\ud588\uc2b5\ub2c8\ub2e4.",e)}},b=async()=>{try{const e=await i.A.get(`/friends/pendingRequests?userId=${f.id}`);h(e.data)}catch(e){console.error("\ub0b4\uac00 \uc694\uccad\ud55c \uce5c\uad6c \ubaa9\ub85d\uc744 \uac00\uc838\uc624\ub294 \ub370 \uc2e4\ud328\ud588\uc2b5\ub2c8\ub2e4.",e)}},S=e=>s.some((s=>s.friend.id===e))||l.some((s=>s.user.id===e))||o.some((s=>s.friend.id===e));return(0,r.jsxs)("div",{children:[(0,r.jsxs)("div",{className:"friends-list-container",children:[(0,r.jsx)("h2",{children:"\uce5c\uad6c \ubaa9\ub85d"}),(0,r.jsx)("button",{onClick:()=>u(!0),className:"add-friend-button",children:"\uce5c\uad6c \ucd94\uac00"}),(0,r.jsx)("div",{className:"friends-list",children:s.map((s=>(0,r.jsxs)("div",{className:"friend-item",onClick:()=>(s=>{e("/playlistPage",{state:{friendInfo:s}})})(s.friend.id===f.id?s.user:s.friend),children:[(0,r.jsxs)("p",{children:[(0,r.jsx)("strong",{children:"\uce5c\uad6c \ubcc4\uba85 :"})," ",s.friend.id===f.id?s.user.nickname:s.friend.nickname]}),(0,r.jsx)("button",{className:"friend-delete-button",onClick:e=>(async(e,s)=>{s.stopPropagation();try{await i.A.delete("/friends/delete",{params:{userId:f.id,friendId:e}}),N()}catch(a){console.error("\uce5c\uad6c \uc0ad\uc81c\uc5d0 \uc2e4\ud328\ud588\uc2b5\ub2c8\ub2e4.",a)}})(s.friend.id,e),children:"\u274c"})]},s.id)))})]}),m&&(0,r.jsx)("div",{className:"modal",children:(0,r.jsxs)("div",{className:"modal-content",children:[(0,r.jsx)("span",{className:"close",onClick:()=>u(!1),children:"\xd7"}),(0,r.jsxs)("div",{className:"modal-tabs",children:[(0,r.jsx)("button",{className:"modal-tab-button "+("search"===v?"active":""),onClick:()=>g("search"),children:"\uce5c\uad6c \uac80\uc0c9"}),(0,r.jsx)("button",{className:"modal-tab-button "+("pending"===v?"active":""),onClick:()=>g("pending"),children:"\uc694\uccad\ud55c \ubaa9\ub85d"}),(0,r.jsx)("button",{className:"modal-tab-button "+("requests"===v?"active":""),onClick:()=>g("requests"),children:"\ubc1b\uc740 \uce5c\uad6c \uc694\uccad"})]}),"search"===v&&(0,r.jsxs)("div",{className:"friendlist-search-tab",children:[(0,r.jsx)("h2",{children:"\uce5c\uad6c \ucd94\uac00"}),(0,r.jsx)("input",{type:"text",placeholder:"\uac80\uc0c9 (ID, \uc774\uba54\uc77c, \ub2c9\ub124\uc784)",value:p,onChange:e=>x(e.target.value)}),(0,r.jsx)("button",{onClick:async()=>{try{const e=await i.A.get(`/friends/search?keyword=${p}`);j(e.data)}catch(e){console.error("\uc0ac\uc6a9\uc790 \uac80\uc0c9\uc5d0 \uc2e4\ud328\ud588\uc2b5\ub2c8\ub2e4.",e)}},children:"\uac80\uc0c9"}),(0,r.jsx)("div",{className:"search-results",children:y.map((e=>(0,r.jsxs)("div",{className:"search-result-item",children:[(0,r.jsxs)("p",{children:[(0,r.jsx)("strong",{children:"ID:"})," ",e.id]}),(0,r.jsxs)("p",{children:[(0,r.jsx)("strong",{children:"\uc774\uba54\uc77c:"})," ",e.email]}),(0,r.jsxs)("p",{children:[(0,r.jsx)("strong",{children:"\ub2c9\ub124\uc784:"})," ",e.nickname]}),(0,r.jsx)("button",{onClick:()=>(async e=>{try{await i.A.post("/friends/add",{userId:f.id,friendId:e}),N(),b()}catch(s){console.error("\uce5c\uad6c \ucd94\uac00\uc5d0 \uc2e4\ud328\ud588\uc2b5\ub2c8\ub2e4.",s)}})(e.id),disabled:S(e.id),children:S(e.id)?"\uc694\uccad\ub428":"\uce5c\uad6c \ucd94\uac00"})]},e.id)))})]}),"pending"===v&&(0,r.jsxs)("div",{className:"friendlist-pending-tab",children:[(0,r.jsx)("h2",{children:"\uc694\uccad\ud55c \ubaa9\ub85d"}),(0,r.jsx)("div",{className:"pending-requests-list",children:0===o.length?(0,r.jsx)("p",{children:"\uc694\uccad\ud55c \ubaa9\ub85d\uc774 \uc5c6\uc2b5\ub2c8\ub2e4."}):o.map((e=>(console.log(e),(0,r.jsx)("div",{className:"pending-request-item",children:(0,r.jsxs)("p",{children:[(0,r.jsx)("strong",{children:"\uc694\uccad\ud55c \uc0ac\uc6a9\uc790 ID:"})," ",e.friend.nickname]})},e.id))))})]}),"requests"===v&&(0,r.jsxs)("div",{className:"friendlist-requests-tab",children:[(0,r.jsx)("h2",{children:"\ubc1b\uc740 \uce5c\uad6c \uc694\uccad"}),(0,r.jsx)("div",{className:"friend-requests-list",children:0===l.length?(0,r.jsx)("p",{children:"\ubc1b\uc740 \uc694\uccad\uc774 \uc5c6\uc2b5\ub2c8\ub2e4."}):l.map((e=>(console.log(e),(0,r.jsx)("div",{className:"friend-request-item",children:(0,r.jsxs)("p",{children:[(0,r.jsx)("strong",{children:"\uc694\uccad\ud55c \uc0ac\uc6a9\uc790:"})," ",e.user.nickname,(0,r.jsx)("button",{className:"accept-button",onClick:()=>(async e=>{try{await i.A.post("/friends/accept",null,{params:{friendRequestId:e}}),N(),k()}catch(s){console.error("\uce5c\uad6c \uc694\uccad \uc218\ub77d\uc5d0 \uc2e4\ud328\ud588\uc2b5\ub2c8\ub2e4.",s)}})(e.id),children:"\u2705"})]})},e.id))))})]})]})})]})},o=e=>{let{children:s}=e;return(0,r.jsxs)("div",{className:"sidebar-layout-layout",children:[(0,r.jsxs)("div",{className:"sidebar-layout-sidebar",children:[(0,r.jsx)(l.A,{onSelectTrack:()=>{}}),(0,r.jsx)(d,{})]}),(0,r.jsx)("div",{className:"sidebar-layout-main-content",children:s})]})}},5928:(e,s,a)=>{a.d(s,{C:()=>t});const t=e=>("string"===typeof e?JSON.parse(e):e).items.map((e=>({id:e.track.id,...e.track})))},6375:(e,s,a)=>{a.d(s,{A:()=>n});var t=a(5043),l=a(5026),i=a(6213);const n=()=>{const[e,s]=(0,t.useState)(""),[a,n]=(0,t.useState)([]),[c,r]=(0,t.useState)(new Audio),[d,o]=(0,t.useState)(!1),[h,m]=(0,t.useState)(null);(0,t.useEffect)((()=>{(async()=>{try{const e=await l.A.get("/api/spotify/userInfo");o("premium"===e.data.product)}catch(e){}})()}),[]),(0,t.useEffect)((()=>{(async()=>{try{const e=(await l.A.get("/music/devices",{headers:{Authorization:`Bearer ${localStorage.getItem("MUSICOVERY_ACCESS_TOKEN")}`}})).data.devices;e.length>0&&(m(e[0].id),await(async e=>{try{const s="https://api.spotify.com/v1/me/player";await i.A.put(s,{device_ids:[e],play:!0},{headers:{Authorization:`Bearer ${localStorage.getItem("MUSICOVERY_ACCESS_TOKEN")}`}})}catch(s){throw console.error("Failed to transfer playback:",s),s}})(e[0].id))}catch(e){console.error("Failed to fetch devices",e)}})()}),[]);return{keyword:e,setKeyword:s,results:a,handleSearch:async s=>{try{const s=(await l.A.get(`/api/spotify/search?keyword=${e}&type=track`)).data.tracks.items.filter((e=>e.is_playable));n(s)}catch(a){console.error("Failed to search music",a),n([])}},isPremium:d,deviceId:h}}},7138:(e,s,a)=>{a.d(s,{N:()=>i,V:()=>l});const t="https://211.243.7.215:8080/images/default.png",l=e=>e?e.startsWith("/images/")?`https://211.243.7.215:8080${e}`:e:t,i=()=>t},9057:(e,s,a)=>{a.d(s,{A:()=>i});a(5043);var t=a(1675),l=a(579);const i=()=>(0,l.jsx)("aside",{className:"social-sidebar",children:(0,l.jsx)("nav",{className:"nav-menu",children:(0,l.jsxs)("ul",{children:[(0,l.jsx)("li",{children:(0,l.jsx)(t.N_,{to:"/quiz",children:"AI\uac00\uc0ac \ud034\uc988"})}),(0,l.jsx)("li",{children:(0,l.jsx)(t.N_,{to:"/songquiz",children:"\ub178\ub798\ud034\uc988"})}),(0,l.jsx)("li",{children:(0,l.jsx)(t.N_,{to:"/streaming",children:"\uc2a4\ud2b8\ub9ac\ubc0d"})})]})})})}}]);
//# sourceMappingURL=505.6fb4835f.chunk.js.map