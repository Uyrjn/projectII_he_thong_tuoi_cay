const tempEl = document.getElementById('temperature');
const humidEl = document.getElementById('humidity');
const langSelect = document.getElementById('langSelect');

if (langSelect) {
  const savedLang = localStorage.getItem('lang') || 'vi';
  langSelect.value = savedLang;
  langSelect.addEventListener('change', () => {
    localStorage.setItem('lang', langSelect.value);
    location.reload();
  });
}

if (tempEl && humidEl) {
  // Giả lập dữ liệu cảm biến
  setInterval(() => {
    tempEl.textContent = (20 + Math.random() * 10).toFixed(1);
    humidEl.textContent = (50 + Math.random() * 20).toFixed(0);
  }, 2000);
}

const toggleBtn = document.getElementById('toggleBtn');
if (toggleBtn) {
  let on = false;
  toggleBtn.addEventListener('click', () => {
    on = !on;
    toggleBtn.textContent = on ? "Tắt hệ thống tưới" : "Bật hệ thống tưới";
    alert(on ? "Hệ thống đã bật" : "Hệ thống đã tắt");
  });
}
