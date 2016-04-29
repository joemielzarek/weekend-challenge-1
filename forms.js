$(document).ready(function() {
    var array = [];
    $('#employeeinfo').on('submit', function(event) {
      event.preventDefault();

      var values = {};
      $.each($('#employeeinfo').serializeArray(), function(i, field) {
        values[field.name] = field.value;
      })

      console.log(values);

      appendDom(values);
    });

    function appendDom(empInfo) {
      $('#container').append('<div class="person"></div>');
      var $el = $('#container').children().last();

      $el.append('<p>' + empInfo.employeefirstname + '</p>');
    }


});
