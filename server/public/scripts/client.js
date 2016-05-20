$(document).ready(function () {

  $.get('/employees', getEmployees);
  getTotalSalary();

  //------- EVENT LISTENERS -------//
$('#employeeInfo').on('click','#submit', postEmployee);

 $('#employee-table').on('click', '.delete', deleteEmployees);

});
  //------- UTILITY FUNCTIONS -------//

  function deleteEmployeeResponse(res) {
    if (res == 'OK') {
      console.log('Employee deleted!');
    } else {
      console.log('Employee not deleted!!', res);
    }
  }

  function postEmployeeResponse(res) {
    if (res == 'Created') {
      getEmployees();
      console.log('Employee Info recieved!');
    } else {
      getEmployees();
      console.log('Employee Info rejected!!', res);
    }
  }

  //------- AJAX FUNCTIONS -------//

  //------- DELETE -------//
  function deleteEmployees(event) {
    //event.preventDefault();
    console.log(event);
    var deletedEmp = $(this).parent().parent().data('employeeID');

    $.ajax ({
      type: 'DELETE',
      url: '/employees/' + deletedEmp,
      success: function (data) {
        deleteEmployeeResponse();
        $.get('/employees', getEmployees);
      }
    });
  }

  //------- GET -------//

  function getTotalSalary() {

    $.ajax({
      type: 'GET',
      url: '/getmonthlysal',
      success: function(data){
        var answer = data[0];
        var finalAnswer = Math.round(parseInt(answer.totalsalary / 12));
        $('#monthly-container').text('Total Monthly Salary Cost: $' + finalAnswer);
      }
    })

  }


  function getEmployees(employees) {
    $.ajax({
      type: 'GET',
      url: '/employees',
      success: function(employees) {

    getTotalSalary();
  $('#employee-table').empty();
  $('#employee-table').append('<tr>' +
         '<th>Employee</th>' +
         '<th>ID Number</th>' +
         '<th>Title</th>' +
         '<th>Salary Per Year</th>' +
         '</tr>');

   employees.forEach(function(row) {
     var salary = row.salary_per_year;
     //monthSalCost = calcSalaries(row.salary_per_year);
    var $el = $('<tr>' +
         '<td>' + row.first_name + ' ' + row.last_name + '</td>' +
         '<td>' + row.emp_id + '</td>' +
         '<td>' + row.job_title + '</td>' +
         '<td>' + '$' + row.salary_per_year + '</td>' +
         '<td>' + '<button class="delete">Delete</button>' + '</td>' +
         '</tr>');
       $el.data('employeeID', row.id);
    $('#employee-table').append($el);
    });
    }
   });
  }

  //------- POST -------//
  function postEmployee(event) {
    event.preventDefault();

    var employee = {};
    $.each($('#employeeInfo').serializeArray(), function (i, field) {
      employee[field.name] = field.value;
    });

    console.log('postEmployee', employee);

    $('#employeeInfo').find('input[type=text]').val('');
    $.post('/employees', employee, postEmployeeResponse);

  }
