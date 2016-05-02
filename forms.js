
$(document).ready(function () {
  var staffMembers = [];

  $('#employeeinfo').on('submit', function (event) {
    event.preventDefault();

    var values = {};
    $.each($('#employeeinfo').serializeArray(), function (i, field) {
      values[field.name] = field.value;
    });

    $('#employeeinfo').find('input[type=text]').val('');

    //Pushes newly created employee objects from data inputs to array
    staffMembers.push(values);

    //Calls function that appends employee data inputs from user to DOM
    appendDom(values);

    //Calls functions that append and calculate salaries, respectively
    appendSalary(calcSalaries(staffMembers));

    //Event listener that removes appended div
    $('.person').on('click', 'button', function () {
      $(this).parent().remove();
    });

  });

  function appendSalary(monthlySalary) {
    $('#container').append('<div class="salaryCost"></div>');
    var salaryCost = $('#container').children().last();

    salaryCost.append('<p>Total Salary Cost per Month: ' + monthlySalary + '</p>');
  }

  //Calculate salaries for each set of employee inputs
  function calcSalaries(empArray) {
    var totalSalary = 0;
    var monthlySalary = 0;
    for (var i = 0; i < empArray.length; i++) {
      totalSalary += parseInt(empArray[i].employeesalary);
      monthlySalary = Math.round(totalSalary / 12);
    }

    return monthlySalary;
  }

  function appendDom(empInfo) {
    $('#container').append('<div class="person"></div>');
    var $el = $('#container').children().last();

    $el.append('<p>First Name: ' + empInfo.employeefirstname + '</p>');
    $el.append('<p>Last Name: ' + empInfo.employeelastname + '</p>');
    $el.append('<p>Employee ID: ' + empInfo.employeeID + '</p>');
    $el.append('<p>Job Title: ' + empInfo.employeejobtitle + '</p>');
    $el.append('<p>Annual Salary: ' + empInfo.employeesalary + '</p>');

    //Appends button to DOM to remove previous submission
    $el.append('<button>Remove Submission</button>');
  }

});
