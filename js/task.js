var task = function (
  // tham số truyền vào
  id,
  taskName,
  status
) {
  // thuộc tính
  this._id = id;
  this._taskName = taskName;
  this._status = status;
};
