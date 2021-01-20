// create task list

var tasklist = new TaskList();
getLocalStorage();
var isValid = new valid();

getEle("addItem").addEventListener("click", function () {
  // lấy input
  var id = Math.random();
  var taskName = getEle("newTask").value;
  var status = "toDo";

  var check = true;

  check &=
    isValid.checkBlank(taskName, "notiInput", "Vui lòng nhập task!") &&
    isValid.duplicated(taskName, "notiInput", "Task đã tồn tại!", tasklist.arr);

  if (!check) {
    return;
  }
  var newTask = new task(id, taskName, status);
  tasklist.addTask(newTask);
  taoBang(tasklist.arr);
  setLocalStorage();
  alert("Thêm thành công!");
});

// tạo bảng
function taoBang(arr) {
  var toDoContent = "";
  var completedContent = "";

  arr.forEach(function (item) {
    if (item._status == "toDo") {
      toDoContent += `
    <li>
    <span>${item._taskName}</span>
    <div class="buttons">
      <button class="remove" onclick="deleteToDo(${item._id})">
        <i class="fa fa-trash-alt"></i>
      </button>
      <button class="complete" onclick="changeStatus(${item._id})">
        <i class="far fa-check-circle"></i>
        <i class="fas fa-check-circle"></i>
      </button>
    </div>
    </li>
    `;
    } else
      completedContent += `
    <li>
    <span>${item._taskName}</span>
    <div class="buttons">
      <button class="remove" onclick="deleteToDo(${item._id})">
        <i class="fa fa-trash-alt"></i>
      </button>
      <button class="complete" onclick="changeStatus(${item._id})">
        <i class="far fa-check-circle"></i>
        <i class="fas fa-check-circle"></i>
      </button>
    </div>
    </li>
    `;
  });
  getEle("todo").innerHTML = toDoContent;
  getEle("completed").innerHTML = completedContent;
}
// setLocalStorage
function setLocalStorage() {
  // chuyển từ json qua string
  var arr = JSON.stringify(tasklist.arr);
  localStorage.setItem("task", arr);
}

// getLocalStorage
function getLocalStorage() {
  // string ==> json
  if (localStorage.getItem("task")) {
    tasklist.arr = JSON.parse(localStorage.getItem("task"));
    taoBang(tasklist.arr);
  }
}

// xóa vị trí

function deleteToDo(id) {
  tasklist.xoaTask(id);
  taoBang(tasklist.arr);
  setLocalStorage();
}

// Get elements
function getEle(id) {
  return document.getElementById(id);
}

function changeStatus(id) {
  var viTri = tasklist.timViTri(id);
  if (tasklist.arr[viTri]._status.valueOf() == "toDo") {
    tasklist.arr[viTri]._status = "complete";
  } else if (tasklist.arr[viTri]._status.valueOf() == "complete") {
    tasklist.arr[viTri]._status = "toDo";
  }
  taoBang(tasklist.arr);
  setLocalStorage();
}
