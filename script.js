const products=[
{id:1,name:"Ivory Wedding Ensemble",cat:["Women","Wedding"],img:"626038710_18081032747193296_1587293074799372638_n.jpg",tag:"COUTURE"},
{id:2,name:"Mustard Festive Set",cat:["Women","Wedding"],img:"626183580_18081155915193296_2832862436693088000_n.jpg",tag:"FESTIVE"},
{id:3,name:"Gold Embroidered Bridal Look",cat:["Women","Wedding"],img:"626294608_18080978651193296_7805835366663932288_n.jpg",tag:"BRIDAL"},
{id:4,name:"Mustard Prince Coat",cat:["Men","Formal","Wedding"],img:"626297744_18081155945193296_8158350962270473658_n.jpg",tag:"SIGNATURE"},
{id:5,name:"Taupe Evening Tuxedo",cat:["Men","Formal"],img:"710461216_2020855708798519_5883179824207797009_n.jpg",tag:"FORMAL"},
{id:6,name:"Ivory Prince Coat",cat:["Men","Formal","Wedding"],img:"710474436_2019814612235962_3796484283593010039_n.jpg",tag:"FORMAL"},
{id:7,name:"Black Embroidered Prince Coat",cat:["Men","Formal","Wedding"],img:"710746163_2020590085491748_7607637603483815601_n.jpg",tag:"SIGNATURE"},
{id:8,name:"Midnight Navy Tuxedo",cat:["Men","Formal"],img:"710799735_2020385658845524_5102280619454772089_n.jpg",tag:"FORMAL"},
{id:9,name:"Classic White Tuxedo",cat:["Men","Formal","Wedding"],img:"712410485_2020851665465590_3351328608685112765_n.jpg",tag:"WEDDING"},
{id:10,name:"White Black-Lapel Tuxedo",cat:["Men","Formal","Wedding"],img:"712664188_2020845925466164_2434579657070343685_n.jpg",tag:"FORMAL"}];
let bag=JSON.parse(localStorage.getItem("sh_bag")||"[]"), active="All";
const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
function renderProducts(){
 let q=($("#searchInput")?.value||"").toLowerCase();
 let list=products.filter(p=>(active==="All"||p.cat.includes(active))&&(!q||p.name.toLowerCase().includes(q)||p.cat.join(" ").toLowerCase().includes(q)));
 const sort=$("#sort")?.value;if(sort==="az") list.sort((a,b)=>a.name.localeCompare(b.name));
 $("#products").innerHTML=list.map(p=>`<article class="product-card"><div class="product-img"><img src="${p.img}" alt="${p.name}" loading="lazy"><span class="product-tag">${p.tag}</span><button class="quick" onclick="openProduct(${p.id})">View details</button></div><div class="product-info"><h3>${p.name}</h3><p>${p.cat.join(" · ")}</p><p class="price">Price on request</p></div></article>`).join("")||"<p>No pieces found. Try another search.</p>";
}
function renderBag(){
 $("#bagCount").textContent=bag.length;
 $("#bagItems").innerHTML=bag.length?bag.map((p,i)=>`<div class="bag-row"><img src="${p.img}"><div><h4>${p.name}</h4><p>Price on request</p><button class="remove" onclick="removeBag(${i})">Remove</button></div></div>`).join(""):"<p class='notice'>Your bag is empty. Add pieces you’d like to discuss with the studio.</p>";
 $("#bagTotal").textContent=bag.length+" piece"+(bag.length===1?"":"s");
 localStorage.setItem("sh_bag",JSON.stringify(bag));
}
function openBag(){renderBag();$("#overlay").classList.add("open");$("#bagDrawer").classList.add("open")}
function closeAll(){$$(".overlay,.drawer,.search-panel,.modal").forEach(x=>x.classList.remove("open"))}
function openProduct(id){const p=products.find(x=>x.id===id);$("#modalContent").innerHTML=`<div class="detail"><img src="${p.img}" alt="${p.name}"><div><p class="eyebrow">${p.tag}</p><h2>${p.name}</h2><p>A signature piece from the Sobia Hamza Couture Studio edit. Availability, fabric options, sizing and final price are confirmed personally by the studio.</p><div class="notice">Made-to-measure and custom requests are welcome. For current availability, message the studio on WhatsApp.</div><br><button class="btn dark" onclick="addBag(${p.id});closeAll()">Add to bag</button></div></div>`;$("#modal").classList.add("open")}
function addBag(id){bag.push(products.find(p=>p.id===id));renderBag();openBag()}
function removeBag(i){bag.splice(i,1);renderBag()}
$("#chips").addEventListener("click",e=>{if(e.target.classList.contains("chip")){$$(".chip").forEach(x=>x.classList.remove("active"));e.target.classList.add("active");active=e.target.dataset.cat;renderProducts()}});
$("#sort").addEventListener("change",renderProducts);$("#bagBtn").onclick=openBag;$("#searchBtn").onclick=()=>{$("#overlay").classList.add("open");$("#searchPanel").classList.add("open");$("#searchInput").focus()};
$("#searchInput").addEventListener("input",()=>{renderProducts();$("#searchResults").innerHTML=products.filter(p=>p.name.toLowerCase().includes($("#searchInput").value.toLowerCase())).slice(0,5).map(p=>`<button class="search-result" onclick="openProduct(${p.id})"><img src="${p.img}"><span>${p.name}</span></button>`).join("")});
$$("[data-close]").forEach(b=>b.onclick=closeAll);$("#overlay").onclick=closeAll;
$("#checkout").onclick=()=>{if(!bag.length)return;let text="Assalam o Alaikum, I would like to inquire about:%0A"+bag.map((p,i)=>`${i+1}. ${p.name}`).join("%0A")+"%0A%0APlease share availability, sizing and final pricing.";window.open("https://wa.me/923070650032?text="+text,"_blank")};
$("#findBtn").onclick=()=>{let w=$("#forWho").value,o=$("#occasion").value;let preferred=w==="Women"?products.filter(p=>p.cat.includes("Women")):w==="Men"?products.filter(p=>p.cat.includes("Men")):products.filter(p=>p.cat.includes("Wedding")); if(o==="Formal dinner")preferred=products.filter(p=>p.cat.includes("Formal")); if(o==="Wedding")preferred=products.filter(p=>p.cat.includes("Wedding")); $("#modalContent").innerHTML=`<p class="eyebrow">YOUR EDIT</p><h2 style="font:500 42px 'Playfair Display',serif">We'd start with these.</h2><div class="product-grid">${preferred.slice(0,4).map(p=>`<article class="product-card"><div class="product-img"><img src="${p.img}"></div><div class="product-info"><h3>${p.name}</h3><button class="text-btn" onclick="addBag(${p.id});closeAll()">Add to bag →</button></div></article>`).join("")}</div>`;$("#modal").classList.add("open")};
$("#menuBtn").onclick=()=>{let n=document.querySelector(".header nav");n.style.display=n.style.display==="flex"?"none":"flex";n.style.position="absolute";n.style.top="72px";n.style.left="0";n.style.right="0";n.style.padding="25px";n.style.background="#fff";n.style.flexDirection="column"};
$("#year").textContent=new Date().getFullYear();renderProducts();renderBag();


/* ===== INTERACTION + MOTION ===== */
(function(){
  const dot=document.getElementById('cursorDot'), ring=document.getElementById('cursorRing'), label=document.getElementById('cursorLabel');
  const progress=document.getElementById('scrollProgress');
  const header=document.querySelector('.header');
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let mx=window.innerWidth/2,my=window.innerHeight/2,rx=mx,ry=my,visible=false;

  function cursorMove(e){
    mx=e.clientX; my=e.clientY;
    if(!visible){visible=true;dot.style.opacity='1';ring.style.opacity='1'}
    dot.style.left=mx+'px'; dot.style.top=my+'px';
  }
  function cursorLoop(){
    rx += (mx-rx)*.16; ry += (my-ry)*.16;
    ring.style.left=rx+'px'; ring.style.top=ry+'px';
    label.style.left=rx+'px'; label.style.top=ry+'px';
    requestAnimationFrame(cursorLoop);
  }
  if(!reduce && window.innerWidth>900){
    document.addEventListener('mousemove',cursorMove,{passive:true});
    document.addEventListener('mouseleave',()=>{dot.style.opacity='0';ring.style.opacity='0';label.style.opacity='0'});
    document.addEventListener('mouseenter',()=>{dot.style.opacity='1';ring.style.opacity='1'});
    cursorLoop();
    document.addEventListener('mousedown',()=>ring.classList.add('click'));
    document.addEventListener('mouseup',()=>ring.classList.remove('click'));
    const refreshCursorTargets=()=>document.querySelectorAll('a,button,.product-card,.look-card,.hero-image,.editorial-image,select,input').forEach(el=>{
      if(el.dataset.cursorBound)return; el.dataset.cursorBound='1';
      el.addEventListener('mouseenter',()=>{ring.classList.add('hover'); if(el.classList.contains('product-card')||el.classList.contains('look-card')){label.textContent='VIEW';label.style.opacity='1'}});
      el.addEventListener('mouseleave',()=>{ring.classList.remove('hover');label.style.opacity='0'});
    });
    refreshCursorTargets();
    const observer=new MutationObserver(refreshCursorTargets); observer.observe(document.body,{childList:true,subtree:true});
  }

  function onScroll(){
    const h=document.documentElement.scrollHeight-window.innerHeight;
    if(progress)progress.style.width=(h>0?(window.scrollY/h)*100:0)+'%';
    if(header)header.classList.toggle('scrolled',window.scrollY>20);
  }
  window.addEventListener('scroll',onScroll,{passive:true}); onScroll();

  // Scroll reveal
  const revealEls=document.querySelectorAll('.section,.editorial,.about-grid,.lookbook,.finder,.studio,.contact,.product-card,.hero-copy,.hero-image');
  revealEls.forEach((el,i)=>{el.classList.add('reveal'); if(i%4===1)el.classList.add('reveal-delay-1'); if(i%4===2)el.classList.add('reveal-delay-2'); if(i%4===3)el.classList.add('reveal-delay-3')});
  if('IntersectionObserver' in window){
    const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.1,rootMargin:'0px 0px -50px'});
    revealEls.forEach(el=>io.observe(el));
  }else revealEls.forEach(el=>el.classList.add('visible'));

  // Subtle hero image parallax
  const heroImg=document.querySelector('.hero-image img');
  if(heroImg && !reduce && window.innerWidth>900){
    window.addEventListener('scroll',()=>{
      const y=Math.min(window.scrollY*.055,35);
      heroImg.style.transform=`scale(1.055) translateY(${y}px)`;
    },{passive:true});
  }
})();
