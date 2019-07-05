var express = require('express');
var cors =  require('cors')
var app = express();
var bodyParser = require('body-parser');
app.use(cors())
app.use(bodyParser.json())

require('./app/router/router.js')(app);

const db = require('./app/config/db.config.js');

const Role = db.role;

// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync with { force: true }');
//   initial();
// });

// Create a Server
var server = app.listen(8081, function () {

	var host = server.address().address
	var port = server.address().port

	console.log("App listening at http://%s:%s", host, port)
})

function initial() {
	Role.create({
		id: 1,
		name: "OC"
	});
	Role.create({
		id: 2,
		name: "OBSERVER"
	});
	Role.create({
		id: 3,
		name: "MANAGERDATA"
	});
}
