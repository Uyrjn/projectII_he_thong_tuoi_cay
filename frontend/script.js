function login() {
// Chuyển sang trang đăng nhập hệ thống 
  window.location.href = 'system-login.html';
}
// Nut tắt bật vòi
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



// DANH SACH CAY
let plantsData = [];
let selectedPlantIndex = null;
// quản lý cây
function openPlantModal() {
  document.getElementById('plantManagement').style.display = 'block';
  document.getElementById('addPlantSection').style.display = 'block'; // Nếu muốn mở luôn phần thêm cây
  document.getElementById('editPlantSection').style.display = 'none';
}
function closePlantModal() {
  document.getElementById("plantManagement").style.display = "none";
}
// Cập nhật danh sách cây
function updatePlantList() {
  const plantList = document.getElementById('plantList');
  plantList.innerHTML = ''; // Xóa danh sách cũ

  plantsData.forEach((plant, index) => {
    const li = document.createElement('li');
    li.textContent = plant.name;
    li.onclick = () => {
      selectedPlantIndex = index;
      showEditPlantOptions(plant.name);
    };
    plantList.appendChild(li);
  });
}
// Lưu tên cây mới
function savePlantName() {
  const plantNameInput = document.getElementById('plantNameInputField');
  const name = plantNameInput.value.trim();

  if (name === '') {
    alert("Vui lòng nhập tên cây.");
    return;
  }
  plantsData.push({ name }); // Thêm cây mới vào danh sách
  plantNameInput.value = '';
  updatePlantList(); // Cập nhật giao diện danh sách
  showAddPlantSection() 
}
function showPlantList() {
  document.getElementById('plantManagement').style.display = 'block';
  document.getElementById('addPlantSection').style.display = 'none';
  document.getElementById('editPlantSection').style.display = 'none';
  updatePlantList(); 
  
}

// Hàm quay lại màn hình danh sách cây
function cancelAddPlant() {
  document.getElementById('plantNameInputField').value = ''; // Xoá ô nhập tên cây
  selectedPlantIndex = null; // Bỏ chọn cây
  document.getElementById('addPlantSection').style.display = 'block'; // Đảm bảo form thêm cây vẫn hiện nếu cần
  document.getElementById('editPlantSection').style.display = 'none'; // Ẩn khung sửa
  document.getElementById('plantManagement').style.display = 'none'; // Quay về màn hình chính
}


  // Hàm mở phần chỉnh sửa cây
  function showEditPlantOptions(plantName) {
    document.getElementById('editPlantSection').style.display = 'block';
    document.getElementById('selectedPlantName').textContent = "Cây đã chọn: " + plantName;
    document.getElementById('addPlantSection').style.display = 'none';
  
    let editButton = document.getElementById('editPlantButton');
    let editNameInput = document.querySelector('#editPlantSection input');

    // Nếu có ô chỉnh sửa cũ, xóa nó đi
    if (editButton) {
      editButton.remove();
    }

    if (editNameInput) {
      editNameInput.remove();
    }

    // Tạo ô nhập tên mới để chỉnh sửa
    const newNameInput = document.createElement('input');
    newNameInput.value = plantName;
    document.getElementById('editPlantSection').appendChild(newNameInput);

    // Tạo nút "Lưu chỉnh sửa"
    editButton = document.createElement('button');
    editButton.textContent = "Lưu chỉnh sửa";
    editButton.id = 'editPlantButton'; // Gán id để tránh tạo lại
    editButton.onclick = saveEditedPlant;
    document.getElementById('editPlantSection').appendChild(editButton);

  }

// Hàm lưu tên cây đã chỉnh sửa
function saveEditedPlant() {
  const newNameInput = document.querySelector('#editPlantSection input');
  const newName = newNameInput.value.trim();
  
  if (newName === '') {
    alert("Tên cây không thể để trống.");
    return;
  }

  // Cập nhật tên cây đã chọn
  plantsData[selectedPlantIndex].name = newName;
  updatePlantList();
  showPlantList() 
  // Xóa nút "Lưu chỉnh sửa" nếu đã lưu
  const editButton = document.getElementById('editPlantButton');
  if (editButton) {
    editButton.remove();
  }
}

// Xóa cây được chọn
function deleteSelectedPlant() {
  if (selectedPlantIndex !== null) {
    plantsData.splice(selectedPlantIndex, 1);
    selectedPlantIndex = null;
    document.getElementById('editPlantSection').style.display = 'none';
    document.getElementById('plantNameInputField').value = '';
    updatePlantList();
  }
}

///chu trinh tuoi cay
let cycleList = [];

function openCycleModal() {
  // Hiển thị modal để nhập chu kỳ
  document.getElementById("cycleModal").style.display = "block";
}

function closeCycleModal() {
  // Ẩn modal khi nhấn "Hủy"
  document.getElementById("cycleModal").style.display = "none";
}

function saveCycle() {
  // Lấy chu kỳ từ input
  const cycleInput = document.getElementById("cycleInput").value;

  if (cycleInput) {
    // Thêm chu kỳ vào danh sách
    cycleList.push(cycleInput);
    updateCycleList();

    // Đóng modal
    closeCycleModal();
  } else {
    alert("Vui lòng nhập chu kỳ!");
  }

  // Xóa dữ liệu trong input
  document.getElementById("cycleInput").value = "";
}

function updateCycleList() {
  const cycleListDiv = document.getElementById("cycleList");
  cycleListDiv.innerHTML = "";

  // Hiển thị danh sách chu kỳ
  cycleList.forEach((cycle, index) => {
    const cycleDiv = document.createElement("div");
    cycleDiv.innerHTML = `
      <span>${cycle}</span>
      <button onclick="deleteCycle(${index})">x</button>
    `;
    cycleListDiv.appendChild(cycleDiv);
  });
}

function deleteCycle(index) {
  // Xóa chu kỳ khỏi danh sách
  cycleList.splice(index, 1);
  updateCycleList();
}


//lich tuoi c

function openWateringScheduleModal() {
  document.getElementById("wateringScheduleModal").style.display = "block";
}

// Đóng modal lịch tưới
function cancelWateringSchedule() {
  document.getElementById("wateringScheduleModal").style.display = "none";
}

// Xử lý form lịch tưới khi bấm Lưu
document.getElementById("wateringScheduleForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Ngăn load lại trang

  const time = document.getElementById("wateringTime").value;
  const checkboxes = document.querySelectorAll("#wateringScheduleForm input[type=checkbox]:checked");
  const selectedDays = Array.from(checkboxes).map(cb => cb.value);

  if (time && selectedDays.length > 0) {
    const scheduleText = `⏰ ${time} vào ${selectedDays.join(", ")}`;

    const scheduleItem = document.createElement("div");
    scheduleItem.textContent = scheduleText;

    // Tạo nút xóa cho mỗi lịch
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "x";
    deleteButton.onclick = function () {
      scheduleItem.remove(); // Xóa lịch khi nhấn nút Xoá
    };

    scheduleItem.appendChild(deleteButton);
    document.getElementById("wateringScheduleList").appendChild(scheduleItem);

    cancelWateringSchedule(); // Ẩn modal sau khi lưu
    document.getElementById("wateringScheduleForm").reset(); // Reset form
  } else {
    alert("Vui lòng chọn giờ và ít nhất một ngày.");
  }
});
