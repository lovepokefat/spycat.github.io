let started = false;
const audio = document.getElementById("bgm");

/* start card */
function startCard() {
  if (started) return;
  started = true;

  const card = document.querySelector(".card");
  const h1 = card.querySelector("h1");
  const textElement = document.getElementById("text");

  audio.play();

  // 1. เริ่มเอฟเฟกต์การสั่น (สั่นเร็วๆ เป็นเวลา 0.5 วินาที)
  card.style.animation = "shake 1.5s infinite"; 

  setTimeout(() => {
    // 2. หยุดสั่นและเริ่มทำให้การ์ดจางหายไป (ใช้เวลา 1.5 วินาทีตาม CSS)
    card.style.animation = "none"; 
    card.style.opacity = "0";
    card.style.transform = "scale(0.9) rotate(2deg)"; 

    // 3. รอจนการ์ดจางหายสนิท (1500ms) แล้วจึงเปลี่ยนเนื้อหาข้างใน
    setTimeout(() => {
      // สร้างหัวข้อ 🎄Merry Christmas🎄 ไว้บนสุด
      const title = document.createElement("div");
      title.innerHTML = "🎄Merry Christmas🎄";
      title.style.fontSize = "1.95rem";
      title.style.fontWeight = "bold";
      title.style.color = "#c62828";
      title.style.marginBottom = "5px";
      card.insertBefore(title, h1);

      // ปรับขนาดกระต่าย (อยู่ตรงกลาง)
      h1.style.fontSize = "10rem";
      h1.style.margin = "10px 0";

      // ปรับคำอวยพร (อยู่ล่างสุด)
      textElement.style.animation = "none";
      textElement.style.fontSize = "1.5rem";
      textElement.style.fontWeight = "normal";
      textElement.style.color = "#c62828";
      textElement.innerHTML = `"ให้ทุกเรื่องราวต่อจากนี้ใจดีกับเธอ เหมือนที่เธอใจดีกับทุกคนเสมอมา"`;

      // 4. แสดงการ์ดกลับคืนมาอย่างนุ่มนวล
      card.style.opacity = "1";
      card.style.transform = "scale(1) rotate(0deg)"; 
      
      startSnow();
    }, 1500); // ระยะเวลาจางหาย 1.5 วินาที
  }, 2500); // ระยะเวลาสั่นก่อนจาง 0.5 วินาที
}

/* snow effect */
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
