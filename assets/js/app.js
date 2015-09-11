$.fn.exists = function(callback) {
  var args = [].slice.call(arguments, 1);

  if (this.length) {
    callback.call(this, args);
  }
  return this;
};


$('#DataTable').exists(function() {
    $('#DataTable').DataTable();
});
