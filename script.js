let started = false;
let currentStep = 0;
const audio = document.getElementById("bgm");

function startCard() {
  if (started) return;
  started = true;
  audio.play();
  showNextPage();
}

function showNextPage() {
  currentStep++;
  const card = document.querySelector(".card");
  const h1 = card.querySelector("h1");
  const textElement = document.getElementById("text");

  // เริ่มเอฟเฟกต์การสั่น (ใช้จังหวะ 1.5 วินาทีตามโค้ดเดิมของคุณ)
  card.style.animation = "shake 1.5s infinite"; 

  setTimeout(() => {
    // เริ่มจางหายไปเพื่อเปลี่ยนเนื้อหา
    card.style.animation = "none"; 
    card.style.opacity = "0";
    card.style.transform = "scale(0.9) rotate(2deg)";

    setTimeout(() => {
      // ตรวจสอบลำดับหน้า
      if (currentStep === 5) {
        h1.innerHTML = "🎁";
        textElement.innerHTML = "พร้อมนะ!!";
        textElement.style.animation = "none";
      } 
      else if (currentStep === 6) {
        h1.innerHTML = "✨";
        textElement.innerHTML = "ขอให้คริสต์มาสปีนี้พิเศษกว่าปีไหนๆ";
      }
      else if (currentStep === 7) {
        // หน้าที่ 3: เรื่องถุงเท้า (เพิ่มใหม่ตามคำขอ)
        h1.innerHTML = "🧦"; 
        textElement.style.fontSize = "1.2rem"; 
        textElement.innerHTML = "อ้อ! แอบเห็นว่าถุงเท้าคู่เดิมเริ่มขาดแล้ว...<br>เลยซื้อคู่ใหม่มาให้ใส่ไปทำงานน่ะ 😁"; 
      }
      else if (currentStep === 1) {
        // หน้าที่ 4: หน้าสุดท้าย (ย้ายมาจากหน้าที่ 3 เดิม)
        const title = document.createElement("div");
        title.innerHTML = "🎄 Merry Christmas 🎄<br>And<br>🎉Happy New Year🎉";
        title.style.fontSize = "1.8rem";
        title.style.fontWeight = "bold";
        title.style.color = "#c62828";
        title.style.marginBottom = "10px";
        card.insertBefore(title, h1);
        
        h1.innerHTML = "🐰";
        h1.style.fontSize = "6rem";
        h1.style.margin = "10px 0";
        
        textElement.style.fontSize = "1.3rem";
        textElement.style.fontWeight = "normal";
        textElement.style.color = "#c62828";
        textElement.innerHTML = `"ให้ทุกเรื่องราวต่อจากนี้ใจดีกับเธอ เหมือนที่เธอใจดีกับทุกคนเสมอมา"`;
        textElement.style.animation = "none";
        startSnow(); // เริ่มหิมะตกในหน้าสุดท้าย
      }

      // แสดงการ์ดกลับคืนมา
      card.style.opacity = "1";
      card.style.transform = "scale(1) rotate(0deg)";

      // ถ้ายังไม่ถึงหน้าสุดท้าย ให้เปลี่ยนหน้าอัตโนมัติ (หน่วงเวลาอ่าน 3 วินาที)
      if (currentStep < 1) {
        setTimeout(showNextPage, 3000);
      }
    }, 1500); 
  }, 2500); // ระยะเวลาสั่นก่อนจางตามโค้ดเดิมของคุณ
}

/* --- ระบบหิมะตก (คงเดิม) --- */
const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");
let snowTop = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  snowTop = new Array(Math.ceil(canvas.width)).fill(0);
}
resize();
window.addEventListener("resize", resize);

let flakes = [];
for (let i = 0; i < 120; i++) {
  flakes.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 3 + 1,
    s: Math.random() * 1 + 0.5,
    a: Math.random() * Math.PI * 2,
    as: Math.random() * 0.02 + 0.01
  });
}

function startSnow() {
  setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.moveTo(0, canvas.height);
    for (let x = 0; x < canvas.width; x++) {
      ctx.lineTo(x, canvas.height - snowTop[x]);
    }
    ctx.lineTo(canvas.width, canvas.height);
    ctx.fill();

    flakes.forEach(f => {
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      ctx.fill();
      f.y += f.s;
      f.x += Math.sin(f.a) * 0.5;
      f.a += f.as;
      let currentX = Math.floor(f.x);
      if (currentX >= 0 && currentX < canvas.width) {
        if (f.y > canvas.height - snowTop[currentX]) {
          for (let i = -2; i <= 2; i++) {
            if (currentX + i >= 0 && currentX + i < canvas.width) {
              snowTop[currentX + i] += f.r * 0.7;
            }
          }
          f.y = -5;
          f.x = Math.random() * canvas.width;
        }
      }
    });
  }, 30);
}
