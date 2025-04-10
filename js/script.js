const floatingButtons = document.getElementById("floatingButtons");
window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    floatingButtons.classList.add("visible");
  } else {
    floatingButtons.classList.remove("visible");
  }
});

function generateReview() {
  const checkboxPhrases = {
    "Lokasinya strategis": [
      "Lokasinya sangat strategis",
      "Tempatnya gampang ditemukan",
      "Letaknya mudah diakses",
    ],
    "Pelayanannya ramah": [
      "Stafnya ramah banget",
      "Pelayanannya menyenangkan",
      "Dipelayanan dengan baik",
    ],
    "Toko rapi dan bersih": [
      "Toko sangat bersih dan tertata",
      "Bersih dan nyaman untuk belanja",
      "Rapi dan enak dilihat",
    ],
    "Produk sangat lengkap": [
      "Barangnya lengkap banget",
      "Banyak pilihan produk",
      "Segala kebutuhan ada di sini",
    ],
    "Harganya sangat terjangkau": [
      "Harganya ramah di kantong",
      "Murah meriah",
      "Terjangkau untuk semua kalangan",
    ],
    "Tukang parkirnya ramah": [
      "Tukang parkirnya sopan",
      "Parkirnya dibantu dengan baik",
      "Parkir mudah dan ramah",
    ],
  };

  const checkboxes = document.querySelectorAll('input[name="review"]:checked');
  const customReview = document.getElementById("customReview").value.trim();
  const resultPhrases = [];

  checkboxes.forEach((cb) => {
    const phrases = checkboxPhrases[cb.value];
    if (phrases) {
      const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
      resultPhrases.push(randomPhrase);
    }
  });

  if (customReview) {
    resultPhrases.push(customReview);
  }

  const finalReview = resultPhrases.join(". ") + ".";
  const reviewOutput = document.getElementById("reviewOutput");
  reviewOutput.value = finalReview;

  navigator.clipboard.writeText(finalReview).then(() => {
    window.open("https://maps.app.goo.gl/CjMDLNDxJdJs32ep9", "_blank");
  });
}

function updateStatusToko() {
  const bukaJam = 10;
  const tutupJam = 22;
  const now = new Date();
  const jam = now.getHours();
  const menit = now.getMinutes().toString().padStart(2, "0");
  const statusEl = document.getElementById("statusToko");

  const waktu = `${jam}:${menit}`;

  if (jam >= bukaJam && jam < tutupJam) {
    statusEl.textContent = `🟢 Buka sekarang (${waktu})`;
    statusEl.className = "ml-2 font-semibold text-green-600 pulse-slow";
  } else {
    statusEl.textContent = `🔴 Tutup sekarang (${waktu})`;
    statusEl.className = "ml-2 font-semibold text-red-600 pulse-slow";
  }
}

// Jalankan saat halaman dimuat dan update tiap menit
updateStatusToko();
setInterval(updateStatusToko, 60000);

