// script.js

function login() {
  // Chuyển sang trang đăng nhập hệ thống sau khi đăng nhập
  window.location.href = 'system-login.html';
}

function renamePlant() {
  const newName = prompt('Nhập tên cây mới');
  if (newName) {
    document.getElementById('plantName').textContent = newName;
  }
}

function setCycle() {
  const newCycle = prompt('Nhập chu kỳ tưới');
  if (newCycle) {
    document.getElementById('cycle').textContent = newCycle;
  }
}

function setSchedule() {
  const newSchedule = prompt('Nhập lịch tưới');
  if (newSchedule) {
    document.getElementById('schedule').textContent = newSchedule;
    alert('Báo thức đã được cài cho: ' + newSchedule);
  }
}
function editField(id) {
  const span = document.getElementById(id);
  const currentValue = span.textContent;

  // Tạo ô input
  const input = document.createElement("input");
  input.type = "text";
  input.value = currentValue;
  input.style.width = "80%";

  // Khi ấn Enter hoặc mất focus thì lưu lại
  input.addEventListener("blur", () => {
    span.textContent = input.value || currentValue;
    span.style.display = "inline";
    span.parentNode.removeChild(input);
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      input.blur();
    }
  });

  // Ẩn span và thay bằng input
  span.style.display = "none";
  span.parentNode.appendChild(input);
  input.focus();
}
let isPumpOn = false;

function togglePump() {
  const button = document.getElementById("toggleButton");
  isPumpOn = !isPumpOn;

  if (isPumpOn) {
    button.textContent = "TẮT";
    button.style.backgroundColor = "#45b9c6"; 
  } else {
    button.textContent = "BẬT";
    button.style.backgroundColor = "#45b9c6";
  }
}
