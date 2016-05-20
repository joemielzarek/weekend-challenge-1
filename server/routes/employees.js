var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/mu';

router.get('/', function (req, res) {

  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('SELECT * FROM employees', function(err, result) {
      done();

      console.log(result.rows);

      res.send(result.rows);

    });
  });
});

router.post('/', function(req, res) {
  var employee = req.body;

  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('INSERT INTO employees (first_name, last_name, emp_id, job_title, salary_per_year) ' +
                    'VALUES ($1, $2, $3, $4, $5)', [employee.firstName, employee.lastName, employee.empId, employee.jobTitle, employee.salaryPerYear],
                  function(err, result) {
                    done();

                    if (err) {
                      res.sendStatus(500);
                      return;
                    }
                    res.sendStatus(201);
                  }
    );
  });
});

router.put('/', function(req, res) {
  var employee = req.body;

  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('UPDATE employees ' +
                  'SET salary_per_year = $1, ' +
                  'WHERE id = $2', [employee.salaryPerYear, employee.employeeId],
                  function(err, result) {
                    done();

                    if (err) {
                      res.sendStatus(500);
                      return;
                    }
                    res.sendStatus(200);
                  }
    );
  });
});

router.delete('/:id', function(req, res) {
  var id = req.params.id;
 console.log(id);
  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('DELETE FROM employees ' +
                  'WHERE id = $1 ' ,
                  [id],
                  function(err, result) {
                    done();

                    if (err) {
                      res.sendStatus(500);
                      return;
                    }
                    res.sendStatus(200);
                  }
    );
  });
});

module.exports = router;
