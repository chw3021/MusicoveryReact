"use strict";(self.webpackChunkmusicovery_front=self.webpackChunkmusicovery_front||[]).push([[864],{486:(t,a,s)=>{s.d(a,{A:()=>n});var l=s(5043),e=s(4935),i=s(6375),c=s(579);const n=t=>{let{onSelectTrack:a}=t;const{keyword:s,setKeyword:n,results:r,handleSearch:o,isPremium:d}=(0,i.A)(),[p,m]=(0,l.useState)(!1);return(0,c.jsxs)("div",{className:"music-search",children:[d,(0,c.jsxs)("form",{onSubmit:t=>{t.preventDefault(),o(),m(!0)},children:[" ",(0,c.jsx)("input",{className:"music-search-input",type:"text",value:s,onChange:t=>n(t.target.value),placeholder:"\uc74c\uc545 \uac80\uc0c9"}),(0,c.jsx)("button",{type:"submit",children:"\ud83d\udd0e"})]}),(0,c.jsx)("div",{className:"music-search-results",children:p||0!==r.length?r.map(((t,s)=>(0,c.jsx)("div",{onClick:()=>a(t),children:(0,c.jsx)(e.A,{track:t,isPremium:d})},t.id))):(0,c.jsx)("div",{className:"music-search-placeholder",children:"\uac80\uc0c9\uc5b4 \uc785\ub825..."})})]})}},4935:(t,a,s)=>{s.d(a,{A:()=>m});var l=s(5043),e=s(7950),i=s(5026),c=s(4003),n=s(7138),r=s(9428),o=s(579);const d=l.memo((t=>{let{playlist:a,isChecked:s,onCheck:l}=t;return(0,o.jsxs)("div",{className:"playlist-modal-item",children:[(0,o.jsx)("input",{type:"checkbox",id:`playlist-${a.playlistId}`,checked:s,onChange:()=>l(a.playlistId)}),(0,o.jsxs)("label",{htmlFor:`playlist-${a.playlistId}`,className:"playlist-modal-label",children:[(0,o.jsx)("div",{className:"playlist-modal-image-container",children:(0,o.jsx)("img",{src:(0,n.V)(a.playlistPhoto),alt:a.playlistTitle,className:"playlist-modal-image"})}),(0,o.jsx)("span",{className:"playlist-modal-name",children:a.playlistTitle})]})]})})),p=l.memo((t=>{let{playlists:a,selectedPlaylists:s,loading:l,onCheck:e,onClose:i,onAdd:c}=t;return(0,o.jsx)("div",{className:"playlist-modal-overlay",onClick:i,children:(0,o.jsxs)("div",{className:"playlist-modal",onClick:t=>t.stopPropagation(),children:[(0,o.jsxs)("div",{className:"playlist-modal-header",children:[(0,o.jsx)("h3",{children:"\ud50c\ub808\uc774\ub9ac\uc2a4\ud2b8\uc5d0 \ucd94\uac00"}),(0,o.jsx)("button",{className:"playlist-modal-close",onClick:i,children:"\xd7"})]}),(0,o.jsx)("div",{className:"playlist-modal-body",children:l?(0,o.jsx)("p",{children:"\ud50c\ub808\uc774\ub9ac\uc2a4\ud2b8\ub97c \ubd88\ub7ec\uc624\ub294 \uc911..."}):0===a.length?(0,o.jsx)("p",{children:"\uc0ac\uc6a9 \uac00\ub2a5\ud55c \ud50c\ub808\uc774\ub9ac\uc2a4\ud2b8\uac00 \uc5c6\uc2b5\ub2c8\ub2e4."}):(0,o.jsx)("div",{className:"playlist-modal-list",children:a.map((t=>(0,o.jsx)(d,{playlist:t,isChecked:s.includes(t.playlistId),onCheck:e},t.playlistId)))})}),(0,o.jsx)("div",{className:"playlist-modal-footer",children:(0,o.jsx)("button",{className:"add-to-playlist-button",onClick:c,disabled:0===s.length||l,children:"\ud50c\ub808\uc774\ub9ac\uc2a4\ud2b8\uc5d0 \ucd94\uac00"})})]})})})),m=t=>{let{track:a,isPremium:s}=t;const[n,d]=(0,l.useState)({}),[m,y]=(0,l.useState)(!1),[u,h]=(0,l.useState)([]),[x,j]=(0,l.useState)([]),[g,k]=(0,l.useState)(!1),{addTrackToList:v,setIsPlaying:C,deviceReady:f}=(0,l.useContext)(r.vC),N=(0,l.useRef)(!1),b=(0,c.A)(),P=()=>{y(!1),j([])},A=(0,l.useCallback)((t=>{j((a=>a.includes(t)?a.filter((a=>a!==t)):[...a,t]))}),[]);return a&&a.album&&a.album.images&&a.album.images[0]?(0,o.jsxs)("div",{className:"track-item",onMouseEnter:t=>{const a=t.currentTarget.getBoundingClientRect();d({top:a.top-10+"px",left:`${a.left+a.width/2}px`})},onMouseLeave:()=>{d({})},children:[(0,o.jsx)("img",{className:"track-album-image-music",src:a.album.images[0].url,alt:a.name}),(0,o.jsxs)("div",{className:"track-info",children:[(0,o.jsx)("h4",{children:a.name}),(0,o.jsx)("p",{children:a.artists.map((t=>t.name)).join(", ")}),(0,o.jsxs)("div",{className:"tooltip",style:n,children:[(0,o.jsx)("h4",{children:a.name}),(0,o.jsx)("p",{children:a.artists.map((t=>t.name)).join(", ")})]})]}),(0,o.jsxs)("div",{className:"track-play-button-container",children:[(0,o.jsx)("button",{onClick:()=>(async t=>{if(s)try{v(t),f?C(!0):f||setTimeout((()=>{C(!0)}),1e3)}catch(e){var a,l;if(console.error("\ud2b8\ub799 \uc7ac\uc0dd \uc911 \uc624\ub958:",e),403===(null===(a=e.response)||void 0===a?void 0:a.status))return void window.open(t.external_urls.spotify,"_blank");404===(null===(l=e.response)||void 0===l?void 0:l.status)?alert("Spotify \ud50c\ub808\uc774\uc5b4\ub97c \ucd08\uae30\ud654 \uc911\uc785\ub2c8\ub2e4. \uc7a0\uc2dc \ud6c4\uc5d0 \ub2e4\uc2dc \uc2dc\ub3c4\ud574\uc8fc\uc138\uc694."):alert("\ud2b8\ub799\uc744 \uc7ac\uc0dd\ud560 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4. \ub2e4\uc2dc \uc2dc\ub3c4\ud574\uc8fc\uc138\uc694.")}else window.open(t.external_urls.spotify,"_blank")})(a),className:s?"premium-play":"spotify-link",children:s?"\u25b6":"LINK"}),(0,o.jsx)("button",{className:"add-track-to-playlist-button",onClick:()=>{y(!0),b&&!N.current&&(async t=>{if(t&&!N.current){k(!0);try{const a=await i.A.get(`/playlist/user/${t}`);h(a.data||[]),N.current=!0}catch(a){console.error("\ud50c\ub808\uc774\ub9ac\uc2a4\ud2b8\ub97c \ubd88\ub7ec\uc624\ub294 \ub370 \uc2e4\ud328\ud588\uc2b5\ub2c8\ub2e4:",a)}finally{k(!1)}}})(b.userId)},children:"\u2795"})]}),m&&e.createPortal((0,o.jsx)(p,{playlists:u,selectedPlaylists:x,loading:g,onCheck:A,onClose:P,onAdd:async()=>{if(0!==x.length)try{const t=x.map((t=>i.A.post(`/api/spotify/playlist/${t}/track`,null,{params:{trackId:a.id}})));await Promise.all(t),alert("\uc120\ud0dd\ud55c \ud50c\ub808\uc774\ub9ac\uc2a4\ud2b8\uc5d0 \ud2b8\ub799\uc774 \ucd94\uac00\ub418\uc5c8\uc2b5\ub2c8\ub2e4."),P()}catch(t){console.error("\ud50c\ub808\uc774\ub9ac\uc2a4\ud2b8\uc5d0 \ud2b8\ub799 \ucd94\uac00 \uc2e4\ud328:",t),alert("\ud50c\ub808\uc774\ub9ac\uc2a4\ud2b8\uc5d0 \ud2b8\ub799 \ucd94\uac00 \uc911 \uc624\ub958\uac00 \ubc1c\uc0dd\ud588\uc2b5\ub2c8\ub2e4.")}else alert("\ud50c\ub808\uc774\ub9ac\uc2a4\ud2b8\ub97c \uc120\ud0dd\ud574\uc8fc\uc138\uc694.")}}),document.body)]},a.id):null}},5928:(t,a,s)=>{s.d(a,{C:()=>l});const l=t=>("string"===typeof t?JSON.parse(t):t).items.map((t=>({id:t.track.id,...t.track})))},6375:(t,a,s)=>{s.d(a,{A:()=>c});var l=s(5043),e=s(5026),i=s(6213);const c=()=>{const[t,a]=(0,l.useState)(""),[s,c]=(0,l.useState)([]),[n,r]=(0,l.useState)(new Audio),[o,d]=(0,l.useState)(!1),[p,m]=(0,l.useState)(null);(0,l.useEffect)((()=>{(async()=>{try{const t=await e.A.get("/api/spotify/userInfo");d("premium"===t.data.product)}catch(t){}})()}),[]),(0,l.useEffect)((()=>{(async()=>{try{const t=(await e.A.get("/music/devices",{headers:{Authorization:`Bearer ${localStorage.getItem("MUSICOVERY_ACCESS_TOKEN")}`}})).data.devices;t.length>0&&(m(t[0].id),await(async t=>{try{const a="https://api.spotify.com/v1/me/player";await i.A.put(a,{device_ids:[t],play:!0},{headers:{Authorization:`Bearer ${localStorage.getItem("MUSICOVERY_ACCESS_TOKEN")}`}})}catch(a){throw console.error("Failed to transfer playback:",a),a}})(t[0].id))}catch(t){console.error("Failed to fetch devices",t)}})()}),[]);return{keyword:t,setKeyword:a,results:s,handleSearch:async a=>{try{const a=(await e.A.get(`/api/spotify/search?keyword=${t}&type=track`)).data.tracks.items.filter((t=>t.is_playable));c(a)}catch(s){console.error("Failed to search music",s),c([])}},isPremium:o,deviceId:p}}},7138:(t,a,s)=>{s.d(a,{N:()=>i,V:()=>e});const l="https://easy-turtles-flash.loca.lt/images/default.png",e=t=>t?t.startsWith("/images/")?`https://easy-turtles-flash.loca.lt${t}`:t:l,i=()=>l},8574:(t,a,s)=>{s.d(a,{A:()=>i});s(5043);var l=s(1675),e=s(579);const i=t=>{let{text:a,link:s,color:i,onClick:c=()=>{}}=t;return(0,e.jsx)(l.N_,{to:s,className:"button "+(i?"custom-color":""),onClick:c,children:a})}},8864:(t,a,s)=>{s.r(a),s.d(a,{default:()=>x});var l=s(5043),e=s(1675),i=s(5026),c=s(4935),n=s(486),r=s(6375),o=s(4003),d=s(8574),p=s(5928),m=s(7138),y=s(9428),u=s(5422),h=s(579);const x=()=>{var t;const{playlistId:a}=(0,e.g)(),s=(0,e.Zp)(),x=(0,o.A)(),{handlePlay:j,isPremium:g}=(0,r.A)(),k=!!(null===(t=(0,e.zy)().state)||void 0===t?void 0:t.friendInfo),{addTracksToList:v,setIsPlaying:C,deviceReady:f}=(0,l.useContext)(y.vC),[N,b]=(0,l.useState)({playlistTitle:"",playlistComment:"",playlistPhoto:null,playlistDate:"",tracksData:[],isEditing:!1,user:x});(0,l.useEffect)((()=>{(async()=>{try{const t=await i.A.get(`/playlist/detail/${a}`),s=(0,p.C)(t.data.tracks);b((a=>({...a,playlistTitle:t.data.playlist.playlistTitle,playlistComment:t.data.playlist.playlistComment,playlistPhoto:(0,m.V)(t.data.playlist.playlistPhoto),playlistDate:t.data.playlist.playlistDate.substring(0,10),isPublic:t.data.playlist.isPublic,tracksData:s})))}catch(t){console.error("Error fetching playlist detail",t)}})()}),[a]),(0,l.useEffect)((()=>{x&&b((t=>({...t,user:x})))}),[x]);return(0,h.jsxs)("div",{className:"container1",children:[(0,h.jsx)(u.A,{}),(0,h.jsxs)("div",{className:"playlist-detail-container",children:[(0,h.jsx)("div",{className:"playlist-detail-header",children:N.isEditing?(0,h.jsx)(h.Fragment,{children:(0,h.jsx)("input",{className:"playlist-detail-title-input",value:N.playlistTitle,onChange:t=>b((a=>({...a,playlistTitle:t.target.value})))})}):(0,h.jsx)(h.Fragment,{children:(0,h.jsx)("h2",{className:"playlist-detail-title",children:N.playlistTitle})})}),(0,h.jsxs)("div",{className:"playlist-detail-body",children:[(0,h.jsxs)("div",{className:"playlist-detail-left",children:[(0,h.jsx)("img",{src:N.playlistPhoto,alt:"Playlist",className:"playlist-detail-photo"}),N.isEditing&&(0,h.jsx)("input",{type:"file",onChange:t=>{b((a=>({...a,playlistPhoto:t.target.files[0]})))},accept:"image/*"}),(0,h.jsxs)("div",{className:"playlist-tracks-container",children:[N.isEditing&&(0,h.jsx)("div",{className:"music-search-container",children:(0,h.jsx)(n.A,{onSelectTrack:t=>{b((a=>({...a,tracksData:[...a.tracksData,t]})))}})}),(0,h.jsx)("div",{className:"playlist-tracks "+(N.isEditing?"playlist-tracks-editing":""),children:N.tracksData.length>0?N.tracksData.map(((t,s)=>{const l=`${a}-${s}`;return(0,h.jsxs)("div",{className:"list-track-item",children:[(0,h.jsx)(c.A,{track:t,handlePlay:j,isPremium:g}),N.isEditing&&(0,h.jsx)("button",{className:"playlist-update-track-remove-button",onClick:()=>{return a=t.id,void b((t=>({...t,tracksData:t.tracksData.filter((t=>t.id!==a))})));var a},children:"\u274c"})]},l)})):(0,h.jsx)("p",{children:"\ub178\ub798\uac00 \uc5c6\uc2b5\ub2c8\ub2e4."})})]})]}),(0,h.jsxs)("div",{className:"playlist-detail-right",children:[g&&(0,h.jsx)("div",{className:"playlist-play-controls",children:(0,h.jsx)("button",{className:"playlist-play-all-button",onClick:()=>{0!==N.tracksData.length?(v(N.tracksData),f?C(!0):setTimeout((()=>{C(!0)}),1e3)):alert("\uc7ac\uc0dd\ud560 \ud2b8\ub799\uc774 \uc5c6\uc2b5\ub2c8\ub2e4.")},disabled:0===N.tracksData.length,children:"\u25b6"})}),N.isEditing?(0,h.jsx)(h.Fragment,{children:(0,h.jsx)("textarea",{className:"playlist-detail-playlistComment-input",value:N.playlistComment,onChange:t=>b((a=>({...a,playlistComment:t.target.value})))})}):(0,h.jsx)(h.Fragment,{children:(0,h.jsx)("p",{className:"playlist-detail-playlistComment",children:N.playlistComment})}),(0,h.jsx)("p",{children:N.playlistDate}),(0,h.jsxs)("div",{className:"editing-button-area",children:[k?null:(0,h.jsx)(h.Fragment,{children:N.isEditing?(0,h.jsx)(d.A,{text:"\uc800\uc7a5",onClick:async()=>{const t=new FormData;t.append("playlistId",a),t.append("playlistTitle",N.playlistTitle),t.append("playlistComment",N.playlistComment),t.append("playlistDate",N.playlistDate),t.append("isPublic",N.isPublic),t.append("userId",N.user.userId),N.playlistPhoto&&"string"!==typeof N.playlistPhoto?t.append("playlistPhoto",N.playlistPhoto):t.append("existingPlaylistPhoto",N.playlistPhoto||""),t.append("tracks",N.tracksData.map((t=>t.uri)));try{await i.A.post("/playlist/update",t,{headers:{"Content-Type":"multipart/form-data"}}),b((t=>({...t,isEditing:!1}))),s("/PlaylistPage")}catch(l){console.error("Error updating playlist",l)}}}):(0,h.jsx)(d.A,{text:"\uc218\uc815",onClick:()=>{b((t=>({...t,isEditing:!0})))}})}),(0,h.jsx)(d.A,{text:"\ub4a4\ub85c\uac00\uae30",onClick:()=>{s(-1)}})]})]})]})]})]})}}}]);
//# sourceMappingURL=864.c2364517.chunk.js.map