function TaskList() {
  // thuộc tính
  this.arr = [];

  // phương thức

  // thêm task
  this.addTask = function (newTask) {
    this.arr.push(newTask);
  };

  // tìm nhân viên

  this.timViTri = function (id) {
    return this.arr.findIndex(function (item) {
      return id === item._id;
    });
  };

  this.xoaTask = function (id) {
    var viTri = this.timViTri(id);
    if (viTri != -1) {
      this.arr.splice(viTri, 1);
    }
  };

  this.changeStatus = function (task) {
    var viTri = this.timViTri(task._id);
    if (viTri != -1) {
      this.arr[viTri] = task;
    }
  };
}
