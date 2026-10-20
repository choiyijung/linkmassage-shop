      const vipShops = [{"name":"한국미인스타마사지","area":"청주","address":"청주 추천 업체입니다. 상세페이지에서 코스와 이용 안내를 확인해보세요.","price":"상세페이지 확인","image":"assets/images/shops/room-1.jpg","link":"/cheongju/cheongwon-gu/shops/한국미인스타마사지/","type":"VIP","sort":1},{"name":"JujuQueen마사지","area":"청주","address":"청주 추천 업체입니다. 상세페이지에서 코스와 이용 안내를 확인해보세요.","price":"상세페이지 확인","image":"assets/images/shops/room-2.jpg","link":"/cheongju/cheongwon-gu/shops/JujuQueen마사지/","type":"VIP","sort":2},{"name":"한국골든스타","area":"청주","address":"청주 추천 업체입니다. 상세페이지에서 코스와 이용 안내를 확인해보세요.","price":"상세페이지 확인","image":"assets/images/shops/room-3.jpg","link":"/cheongju/cheongwon-gu/내덕동/shops/한국골든스타/","type":"VIP","sort":3},{"name":"한국미인테라피","area":"청주","address":"청주 추천 업체입니다. 상세페이지에서 코스와 이용 안내를 확인해보세요.","price":"상세페이지 확인","image":"assets/images/shops/room-4.jpg","link":"/cheongju/cheongwon-gu/내덕동/shops/한국미인테라피/","type":"VIP","sort":4},{"name":"QueenRose마사지","area":"청주","address":"청주 추천 업체입니다. 상세페이지에서 코스와 이용 안내를 확인해보세요.","price":"상세페이지 확인","image":"assets/images/shops/room-5.jpg","link":"/cheongju/cheongwon-gu/내수읍/shops/QueenRose마사지/","type":"VIP","sort":5}];
      const premiumShops = [{"name":"나이트마사지","area":"청주","address":"청주 추천 업체입니다. 상세페이지에서 코스와 이용 안내를 확인해보세요.","price":"상세페이지 확인","image":"assets/images/shops/room-6.jpg","link":"/cheongju/cheongwon-gu/북이면/shops/나이트마사지/","type":"PICK","sort":1},{"name":"퀸","area":"청주","address":"청주 추천 업체입니다. 상세페이지에서 코스와 이용 안내를 확인해보세요.","price":"상세페이지 확인","image":"assets/images/shops/room-7.jpg","link":"/cheongju/cheongwon-gu/북이면/shops/퀸/","type":"PICK","sort":2},{"name":"GoodNight마사지","area":"청주","address":"청주 추천 업체입니다. 상세페이지에서 코스와 이용 안내를 확인해보세요.","price":"상세페이지 확인","image":"assets/images/shops/room-8.jpg","link":"/cheongju/cheongwon-gu/오근장동/shops/GoodNight마사지/","type":"PICK","sort":3}];

      const shops = [...vipShops, ...premiumShops];

const card = (s, type, idx=0) => `
<article class="card">
  <div class="thumb">
    <img src="${s.image || ('assets/images/shops/room-' + ((idx % 8) + 1) + '.jpg')}" alt="${s.name} 추천 이미지">
    <span class="badge" data-label="${type}" aria-label="${type}"></span>
    <div class="thumb-title">${s.area}</div>
  </div>
  <div class="card-body">
    <h3>${s.name}</h3>
    <div class="card-sub">${s.area}</div>
    <div class="stats"><span>${type}</span><span>테라피 안내</span></div>
    
    <div class="address">${s.address}</div>
    <div class="card-bottom">
      <div class="price">${s.price}</div>
            <a href="${s.link || '#'}" class="detail-btn">자세히 보기</a>
    </div>
  </div>
</article>`;

function mlShufflePerDevice(list,key){
  const base=[...list];
  const prevKey=key+"-prev";
  const deviceKey=key+"-device";

  let deviceId=localStorage.getItem(deviceKey);
  if(!deviceId){
    const id=new Uint32Array(4);
    crypto.getRandomValues(id);
    deviceId=Array.from(id,n=>n.toString(16).padStart(8,"0")).join("");
    localStorage.setItem(deviceKey,deviceId);
  }

  let deviceHash=2166136261;
  for(const c of deviceId){
    deviceHash^=c.charCodeAt(0);
    deviceHash=Math.imul(deviceHash,16777619)>>>0;
  }

  const randomInt=(max)=>{
    const a=new Uint32Array(1);
    crypto.getRandomValues(a);
    return ((a[0]^deviceHash)>>>0)%max;
  };

  const prev=localStorage.getItem(prevKey)||"";
  let out=[...base];
  let sig="";

  for(let attempt=0;attempt<30;attempt++){
    out=[...base];

    for(let i=out.length-1;i>0;i--){
      const j=randomInt(i+1);
      [out[i],out[j]]=[out[j],out[i]];
    }

    sig=out.map(x=>x.name||x.shop||"").join("|");

    if(sig!==prev) break;
  }

  if(sig===prev && out.length>1){
    out.push(out.shift());
    sig=out.map(x=>x.name||x.shop||"").join("|");
  }

  localStorage.setItem(prevKey,sig);
  return out;
}

document.querySelector("#vipCards").innerHTML =
  mlShufflePerDevice(vipShops,"ml-vip-order")
    .map((s,i)=>card(s,"VIP",i))
    .join("");

document.querySelector("#premiumCards").innerHTML = premiumShops.map((s,i)=>card(s,"PICK",i+4)).join("");

const regions = {"서울":[{"name":"코리아골드마사지","area":"서울","price":"상세페이지 확인","link":"/dongdaemun-gu/제기동/shops/코리아골드마사지/"},{"name":"JuJuHome마사지","area":"서울","price":"상세페이지 확인","link":"/gangbuk-gu/번동/shops/JuJuHome마사지/"}],"경기":[{"name":"샛별마사지","area":"경기 안산","price":"상세페이지 확인","link":"/ansan/danwon-gu/shops/샛별마사지/"},{"name":"문빛테라피","area":"경기 안산","price":"상세페이지 확인","link":"/ansan/danwon-gu/shops/문빛테라피/"},{"name":"별온마사지","area":"경기 안산","price":"상세페이지 확인","link":"/ansan/danwon-gu/shops/별온마사지/"},{"name":"은하테라피","area":"경기 안산","price":"상세페이지 확인","link":"/ansan/danwon-gu/shops/은하테라피/"},{"name":"오로라케어","area":"경기 안산","price":"상세페이지 확인","link":"/ansan/danwon-gu/shops/오로라케어/"}],"인천":[{"name":"퀸즈","area":"인천","price":"상세페이지 확인","link":"/bupyeong-gu/부개동/shops/퀸즈/"},{"name":"KoreaBeauty테라피","area":"인천","price":"상세페이지 확인","link":"/bupyeong-gu/부평동/shops/KoreaBeauty테라피/"},{"name":"KoreaMiin테라피","area":"인천","price":"상세페이지 확인","link":"/bupyeong-gu/산곡동/shops/KoreaMiin테라피/"},{"name":"사랑","area":"인천","price":"상세페이지 확인","link":"/bupyeong-gu/삼산동/shops/사랑/"},{"name":"사랑테라피","area":"인천","price":"상세페이지 확인","link":"/bupyeong-gu/일신동/shops/사랑테라피/"}],"기타지역":[{"name":"문라이트","area":"아산","price":"상세페이지 확인","link":"/asan/shops/문라이트/"},{"name":"코리아골든퀸테라피","area":"아산","price":"상세페이지 확인","link":"/asan/도고면/shops/코리아골든퀸테라피/"},{"name":"오늘밤","area":"아산","price":"상세페이지 확인","link":"/asan/배방읍/shops/오늘밤/"},{"name":"한국미인스타","area":"아산","price":"상세페이지 확인","link":"/asan/선장면/shops/한국미인스타/"},{"name":"밤하늘","area":"아산","price":"상세페이지 확인","link":"/asan/온양동/shops/밤하늘/"}]};

function drawRegion(key){
  /* === CLEAN-MASSAGE REGION IMAGE START === */
  const regionImages = [
    "assets/images/shops/room-1.jpg",
    "assets/images/shops/room-2.jpg",
    "assets/images/shops/room-3.jpg",
    "assets/images/shops/room-4.jpg",
    "assets/images/shops/room-5.jpg",
    "assets/images/shops/room-6.jpg",
    "assets/images/shops/room-7.jpg",
    "assets/images/shops/room-8.jpg"
  ];
  const tabOffset = { "서울":0, "경기":2, "인천":4, "기타지역":6 };
  const offset = tabOffset[key] || 0;

  document.querySelector("#regionItems").innerHTML = regions[key].map((x,i)=>`
    <a class="region-row region-row-with-image" href="${x.link || '#'}" style="text-decoration:none;color:inherit">
      <span class="region-row-thumb">
        <img src="${regionImages[(i + offset) % regionImages.length]}" alt="${x.area} ${x.name}" loading="lazy">
        <b>${i+1}</b>
      </span>
      <div>
        <h3>${x.name}</h3>
        <p>${x.area} 등록 업체</p>
      </div>
      <strong>${x.price}</strong>
    </a>`).join("");
  /* === CLEAN-MASSAGE REGION IMAGE END === */
}
drawRegion("서울");

document.querySelectorAll(".tabs button").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".tabs button").forEach(x=>x.classList.remove("active"));
    btn.classList.add("active");
    drawRegion(btn.dataset.tab);
  });
});

const drawer = document.querySelector("#drawer");
const overlay = document.querySelector("#overlay");

function menu(open){
  drawer.classList.toggle("open",open);
  overlay.classList.toggle("show",open);
  drawer.setAttribute("aria-hidden",String(!open));
}
document.querySelector("#openMenu").addEventListener("click",()=>menu(true));
document.querySelector("#closeMenu").addEventListener("click",()=>menu(false));
overlay.addEventListener("click",()=>menu(false));

document.querySelector("#searchForm").addEventListener("submit",(e)=>{
  e.preventDefault();
  const q = document.querySelector("#q").value.trim().toLowerCase();
  if(!q) return;
  document.querySelectorAll(".card,.region-row").forEach(el=>{
    const hit = el.textContent.toLowerCase().includes(q);
    el.style.outline = hit ? "2px solid #d8aa4a" : "";
    el.style.outlineOffset = hit ? "2px" : "";
  });
  document.querySelector("#vipCards").scrollIntoView({behavior:"smooth",block:"center"});
});

/* ===== v26 badge dedupe ===== */
function normalizeCardBadges(){
  document.querySelectorAll(".thumb").forEach((thumb)=>{
    const badges = Array.from(thumb.children).filter((el)=>el.classList && el.classList.contains("badge"));
    badges.forEach((badge,index)=>{
      if(index>0) badge.remove();
    });
  });
}
normalizeCardBadges();
requestAnimationFrame(normalizeCardBadges);



