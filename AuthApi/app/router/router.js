const verifySignUp = require('./verifySignUp');
const authJwt = require('./verifyJwtToken');

module.exports = function (app) {

	const controller = require('../controller/controller.js');

	app.use(function (req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		next();
	});

	app.post('/api/auth/signup', [verifySignUp.checkDuplicateUserNameOrEmail, verifySignUp.checkRolesExisted], controller.signup);

	app.post('/api/auth/signin', controller.signin);

	app.get('/api/test/user', [authJwt.verifyToken], controller.userContent);

	app.get('/api/test/pm', [authJwt.verifyToken, authJwt.isPmOrAdmin], controller.managementBoard);

	app.get('/api/test/admin', [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);

	//observationslip
	// app.post('/api/auth/storeObservationslip', controller.storeObservationslip);
	//test
	// app.get('/api/test/getObservationslips', [authJwt.verifyToken], controller.getObservationslips);

	// observationslip
	app.post('/api/observationslip/create', controller.storeObservationslip)
    // select all
	app.get('/api/observationslip/getAll', controller.getObservationslips);
	// select one
	app.get('/api/observationslip/:id', controller.getAnObservationslip);
	// update slip
	app.put('/api/observationslip/updateObservationslip', controller.updateObservationslip);
	// count unsynced records
	app.get('/api/observationslip/count', controller.countUnsyncedObservationslips);
	app.get('/api/observationslip/countUnsynced', controller.findCountUnsynced);
	//users
	app.get('/api/users', controller.getAllUsers);
	// get user
	app.get('/api/users/:id', controller.getUser);
	// update user
	app.put('/api/users/update', controller.updateUser);
	// delete user -> will later change to deactivate
	app.delete('/api/users/delete/:id', controller.deleteUser);
}
