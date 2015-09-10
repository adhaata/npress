$.fn.exists = function(callback) {
  var args = [].slice.call(arguments, 1);

  if (this.length) {
    callback.call(this, args);
  }
  return this;
};


$('#postcode').exists(function() {
  $("#postcode").placecomplete();
});

$('.availableDate').exists(function() {
   $(".availableDate").datepicker();
});


$('#defaultFoWWrm').exists(function() {
 $('#defaultForm').bootstrapValidator({
        //container: 'tooltip',
//        trigger: 'blur',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            firstName: {
                validators: {
                    stringLength: {
                        enabled: false,
                        min: 4,
                        message: 'The first name must be more than 5 characters'
                    },
                    notEmpty: {
                        message: 'The first name is required'
                    },
                    regexp: {
                        enabled: true,
                        regexp: /^[a-z]+$/i,
                        message: 'The first name must consist of a-z, A-Z characters only'
                    }
                }
            },
            lastName: {
                validators: {
                    stringLength: {
                        min: 4,
                        message: 'The last name must be more than 5 characters'
                    },
                    notEmpty: {
                        message: 'The last name is required'
                    },
                    regexp: {
                        regexp: /^[a-z]+$/i,
                        message: 'The last name must consist of a-z, A-Z characters only'
                    }
                }
            }
        }
    });
});