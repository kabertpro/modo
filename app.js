const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const USERS_KEY = "modo_local_users_v1";
const SESSION_KEY = "modo_local_session_v1";
let activeUser = null;
let currentCourse = null;

function getUsers(){ try{return JSON.parse(localStorage.getItem(USERS_KEY)||"[]")}catch{return []} }
function saveUsers(users){localStorage.setItem(USERS_KEY,JSON.stringify(users))}
function toast(message){const el=$("#toast");el.textContent=message;el.classList.add("show");setTimeout(()=>el.classList.remove("show"),2600)}
function escapeHTML(value){return String(value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function youtubeURL(url){
  if(!url || /VIDEO_ID|REEMPLAZAR_ID/.test(url)) return "";
  try{const u=new URL(url);let id=u.hostname.includes("youtu.be")?u.pathname.slice(1):u.searchParams.get("v");if(!id && u.pathname.includes("/embed/"))id=u.pathname.split("/embed/")[1];return id?`https://www.youtube.com/watch?v=${encodeURIComponent(id)}`:""}catch{return ""}
}
function renderCourses(){
  const grid=$("#courseGrid");
  grid.innerHTML=(window.MODO_COURSES||[]).map(c=>`<article class="course-card" data-course="${escapeHTML(c.id)}" tabindex="0" role="button" aria-label="Ver ${escapeHTML(c.title)}">
    <div class="course-cover">${c.cover && !c.cover.includes("REEMPLAZAR")?`<img src="${escapeHTML(c.cover)}" alt="" onerror="this.remove()">`:""}<span class="cover-symbol">${escapeHTML(c.symbol||"✦")}</span></div>
    <div class="course-info"><span class="course-tag">${escapeHTML(c.category||"Curso")}</span><h3>${escapeHTML(c.title)}</h3><p>${escapeHTML(c.description||"Explora este curso y aprende a tu ritmo.")}</p>
    <div class="course-bottom"><span>${(c.lessons||[]).length} ${(c.lessons||[]).length===1?"clase":"clases"} · ${escapeHTML(c.level||"Todos los niveles")}</span><span>Ver curso ↗</span></div></div></article>`).join("");
  $$(".course-card").forEach(card=>{const open=()=>showCourse(card.dataset.course);card.addEventListener("click",open);card.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();open()}})});
}
function renderPrices(){$("#pricingGrid").innerHTML=(window.MODO_PRICES||[]).map(([name,price])=>`<div class="price-item"><span>${escapeHTML(name)}</span><strong>${price} <small>Bs</small></strong></div>`).join("")}
function renderTeam(){$("#teamGrid").innerHTML=(window.MODO_TEAM||[]).map(([name,role])=>`<div class="team-card"><div class="avatar">${escapeHTML(name.split(" ").map(x=>x[0]).slice(0,2).join(""))}</div><h3>${escapeHTML(name)}</h3><p>${escapeHTML(role)}</p></div>`).join("")}
function showCourse(id){
  currentCourse=(window.MODO_COURSES||[]).find(c=>c.id===id);if(!currentCourse)return;
  const lessons=(currentCourse.lessons||[]).map((l,i)=>{const url=youtubeURL(l.youtube);return `<div class="lesson"><b>${String(i+1).padStart(2,"0")} · ${escapeHTML(l.title)}</b>${url?`<a href="${url}" target="_blank" rel="noopener">Ver en YouTube ↗</a>`:`<span class="course-tag">En preparación</span>`}</div>`}).join("");
  $("#courseDetailContent").innerHTML=`<span class="eyebrow">${escapeHTML(currentCourse.category||"CURSO MODO")}</span><h2>${escapeHTML(currentCourse.title)}</h2><p>${escapeHTML(currentCourse.description||"Contenido práctico para aprender a tu ritmo.")}</p><div class="lesson-list">${lessons}</div><p class="privacy-note">El contenido audiovisual se reproduce en YouTube. Para acceder, abre cada capítulo desde su enlace.</p>`;
  $("#courseModal").classList.remove("hidden");
}
function openAuth(tab="login"){$("#authModal").classList.remove("hidden");setAuthTab(tab);$("#authMessage").textContent=""}
function closeModal(which){$(`#${which}Modal`).classList.add("hidden")}
function setAuthTab(tab){$$(".auth-tabs button").forEach(b=>b.classList.toggle("active",b.dataset.tab===tab));$("#loginForm").classList.toggle("hidden",tab!=="login");$("#registerForm").classList.toggle("hidden",tab!=="register");$("#authTitle").textContent=tab==="login"?"Tu aprendizaje comienza aquí.":"Crea tu espacio MODO."}
function updateSessionUI(){
  $("#openAuth").classList.toggle("hidden",!!activeUser);$("#logoutBtn").classList.toggle("hidden",!activeUser);
  if(activeUser)$("#openAuth").textContent=`Hola, ${activeUser.name.split(" ")[0]}`;
}
function login(username,password){
  const user=getUsers().find(u=>u.username.toLowerCase()===username.toLowerCase()&&u.password===password);
  if(!user)return false;activeUser={name:user.name,username:user.username};sessionStorage.setItem(SESSION_KEY,JSON.stringify(activeUser));updateSessionUI();return true;
}
$("#loginForm").addEventListener("submit",e=>{e.preventDefault();const data=new FormData(e.currentTarget);if(login(data.get("username").trim(),data.get("password"))){closeModal("auth");toast(`¡Bienvenido/a a MODO, ${activeUser.name.split(" ")[0]}!`);e.currentTarget.reset()}else $("#authMessage").textContent="Usuario o contraseña incorrectos."});
$("#registerForm").addEventListener("submit",e=>{e.preventDefault();const d=new FormData(e.currentTarget),name=d.get("name").trim(),username=d.get("username").trim(),password=d.get("password"),confirm=d.get("confirm");if(password!==confirm){$("#authMessage").textContent="Las contraseñas no coinciden.";return}const users=getUsers();if(users.some(u=>u.username.toLowerCase()===username.toLowerCase())){$("#authMessage").textContent="Ese nombre de usuario ya está registrado.";return}users.push({name,username,password});saveUsers(users);login(username,password);closeModal("auth");e.currentTarget.reset();toast("¡Tu cuenta MODO fue creada en este dispositivo!")});
$("#logoutBtn").addEventListener("click",()=>{activeUser=null;sessionStorage.removeItem(SESSION_KEY);updateSessionUI();toast("Sesión cerrada.")});
$("#openAuth").addEventListener("click",()=>activeUser?toast(`Tu cuenta está activa: ${activeUser.username}`):openAuth("login"));
["#heroLogin","#ctaRegister"].forEach(s=>$(s).addEventListener("click",()=>openAuth("register")));
$$("[data-tab]").forEach(b=>b.addEventListener("click",()=>setAuthTab(b.dataset.tab)));
$$("[data-close]").forEach(b=>b.addEventListener("click",()=>closeModal(b.dataset.close)));
$("#themeToggle").addEventListener("click",()=>{const next=document.documentElement.dataset.theme==="light"?"dark":"light";document.documentElement.dataset.theme=next;localStorage.setItem("modo_theme",next);$("#themeToggle").textContent=next==="light"?"☾":"☼"});
$("#menuToggle").addEventListener("click",()=>$(".desktop-nav").classList.toggle("open"));
$$(".desktop-nav a").forEach(a=>a.addEventListener("click",()=>$(".desktop-nav").classList.remove("open")));
$("#welcomeContinue").addEventListener("click",()=>$("#welcome").classList.add("hidden"));
document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeModal("auth");closeModal("course")}});
function init(){
  const theme=localStorage.getItem("modo_theme")||"dark";document.documentElement.dataset.theme=theme;$("#themeToggle").textContent=theme==="light"?"☾":"☼";
  try{activeUser=JSON.parse(sessionStorage.getItem(SESSION_KEY)||"null")}catch{activeUser=null}
  updateSessionUI();renderCourses();renderPrices();renderTeam();$("#year").textContent=new Date().getFullYear();
  setTimeout(()=>{$("#splash").classList.add("done");if(!sessionStorage.getItem("modo_welcomed")){$("#welcome").classList.remove("hidden");sessionStorage.setItem("modo_welcomed","1")}},950);
}
init();
