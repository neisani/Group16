const db = require('../config/db.config.js');
const config = require('../config/config.js');
const User = db.user;
const Role = db.role;
const Observationslip = db.observationslip;

const Op = db.Sequelize.Op;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

exports.signup = (req, res) => {
	// Save User to Database
	User.create({
		name: req.body.name,
		username: req.body.username,
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password, 8),
		role:req.body.roles

	}).then(user => {
		Role.findAll({
			where: {
				name: {
					[Op.or]: req.body.roles //op tries to match
				}
			}
		}).then(roles => {
			console
			user.setRoles(roles).then(() => {
				res.send({ message: 'Registered successfully!' });
			});
		}).catch(err => {
			res.status(500).send({ reason: err.message });
		});
	}).catch(err => {
		res.status(500).send({ reason: err.message });
	})
}

exports.signin = (req, res) => {
	User.findOne({
		where: {
			username: req.body.username
		}
	}).then(user => {
		if (!user) {
			return res.status(404).send({ reason: 'User Not Found.' });
		}

		var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
		if (!passwordIsValid) {
			return res.status(401).send({ auth: false, accessToken: null, reason: 'Invalid Password!' });
		}

		var token = jwt.sign({ id: user.id }, config.secret, {
			expiresIn: 86400 // expires in 24 hours
		});

		var authorities = [];
		user.getRoles().then(roles => {
			for (let i = 0; i < roles.length; i++) {
				authorities.push('ROLE_' + roles[i].name.toUpperCase());
			}
			res.status(200).send({
				auth: true,
				accessToken: token,
				username: user.username,
				authorities: authorities
			});
		})
	}).catch(err => {
		res.status(500).send({ reason: err.message });
	});
}

exports.userContent = (req, res) => {
	User.findOne({
		where: { id: req.userId },
		attributes: ['name', 'username', 'email'],
		include: [{
			model: Role,
			attributes: ['id', 'name'],
			through: {
				attributes: ['userId', 'roleId'],
			}
		}]
	}).then(user => {
		res.status(200).send({
			'description': '>>> User Contents!',
			'user': user
		});
	}).catch(err => {
		res.status(500).send({
			'description': 'Can not access User Page',
			'error': err
		});
	})
}

// get a  user
exports.getUser = (req, res) => {
	const Id = req.params.id;
	// console.log(Id);
	User.findOne({
		attributes: ['id','name', 'username', 'email', 'createdAt', 'updatedAt'],
		where: {
			id: Id
		}
	}).then( user => {
		// console.log(user);
		res.json(user)
	}).catch(err => {
		res.status(500).send({
			'description': 'Can not fetch user',
			'error': err
		});
	})
}

exports.deleteUser = (req, res) => {
	const id =  req.params.id;
	// console.log(id);
	User.destroy({
		where: {id: id}
	}).then(() => {
		res.status(200).json({ msg: 'Deleted successfully a user with id = ' + id });
	});
}

exports.updateUser = (req, res) => {
	let userInfo = req.body;
	// console.log(req.body);
	let id = req.body.id;

	User.update(userInfo,
				{ where: { id: id }}
			).then(() => {
				res.status(200).json({msg: 'Updated successfully a user  with id = ' + id});
			});
};


exports.getAllUsers = (req, res) => {
	User.findAll().then(users => {
		res.json(users);
	});
};

exports.adminBoard = (req, res) => {
	User.findOne({
		where: { id: req.userId },
		attributes: ['name', 'username', 'email'],
		include: [{
			model: Role,
			attributes: ['id', 'name'],
			through: {
				attributes: ['userId', 'roleId'],
			}
		}]
	}).then(user => {
		res.status(200).send({
			'description': '>>> Admin Contents',
			'user': user
		});
	}).catch(err => {
		res.status(500).send({
			'description': 'Can not access Admin Board',
			'error': err
		});
	})
}

exports.managementBoard = (req, res) => {
	User.findOne({
		where: { id: req.userId },
		attributes: ['name', 'username', 'email'],
		include: [{
			model: Role,
			attributes: ['id', 'name'],
			through: {
				attributes: ['userId', 'roleId'],
			}
		}]
	}).then(user => {
		res.status(200).send({
			'description': '>>> Project Management Board',
			'user': user
		});
	}).catch(err => {
		res.status(500).send({
			'description': 'Can not access Management Board',
			'error': err
		});
	})
}

//observationslip
exports.storeObservationslip = (req, res) => {
	// Save form data  to Database
	Observationslip.create({
		id: req.body.id,
		Time: req.body.TIME,
		Date: req.body.Date,
		Station: req.body.Station,
		stationName: req.body.stationName,
		TotalAmountOfAllClouds: req.body.TotalAmountOfAllClouds,
		TotalAmountOfLowClouds: req.body.TotalAmountOfLowClouds,
		TypeOfLowClouds1: req.body.TypeOfLowClouds1,
		OktasOfLowClouds1: req.body.OktasOfLowClouds1,
		HeightOfLowClouds1: req.body.HeightOfLowClouds1,
		CLCODEOfLowClouds1: req.body.CLCODEOfLowClouds1,
		TypeOfLowClouds2: req.body.TypeOfLowClouds2,
		OktasOfLowClouds2: req.body.OktasOfHighClouds2,
		HeightOfLowClouds2: req.body.HeightOfLowClouds2,
		CLCODEOfLowClouds2: req.body.CLCODEOfLowClouds2,
		TypeOfLowClouds3: req.body.TypeOfLowClouds3,
		OktasOfLowClouds3: req.body.OktasOfLowClouds3,
		HeightOfLowClouds3: req.body.HeightOfLowClouds3,
		CLCODEOfLowClouds3: req.body.CLCODEOfLowClouds3,
		TypeOfMediumClouds1: req.body.TypeOfMediumClouds1,
		OktasOfMediumClouds1: req.body.OktasOfMediumClouds1,
		HeightOfMediumClouds1: req.body.HeightOfMediumClouds1,
		CLCODEOfMediumClouds1: req.body.CLCODEOfMediumClouds1,
		TypeOfMediumClouds2: req.body.TypeOfMediumClouds2,
		OktasOfMediumClouds2: req.body.OktasOfMediumClouds2 ,
		HeightOfMediumClouds2: req.body.HeightOfMediumClouds2,
		CLCODEOfMediumClouds2: req.body.CLCODEOfMediumClouds2 ,
		TypeOfMediumClouds3: req.body.TypeOfMediumClouds3,
		OktasOfMediumClouds3: req.body.OktasOfMediumClouds3,
		HeightOfMediumClouds3: req.body.HeightOfMediumClouds3,
		CLCODEOfMediumClouds3: req.body.CLCODEOfMediumClouds3,
		TypeOfHighClouds1: req.body.TypeOfHighClouds1,
		OktasOfHighClouds1: req.body.OktasOfHighClouds1,
		HeightOfHighClouds1: req.body.HeightOfHighClouds1,
		CLCODEOfHighClouds1: req.body.CLCODEOfHighClouds1,
		TypeOfHighClouds2: req.body.TypeOfHighClouds2,
		OktasOfHighClouds2: req.body.OktasOfHighClouds2,
		HeightOfHighClouds2: req.body.HeightOfHighClouds2,
		CLCODEOfHighClouds2: req.body.CLCODEOfHighClouds2,
		TypeOfHighClouds3: req.body.TypeOfHighClouds3,
		OktasOfHighClouds3: req.body.OktasOfHighClouds3,
		HeightOfHighClouds3: req.body.HeightOfHighClouds3,
		CLCODEOfHighClouds3: req.body.CLCODEOfHighClouds3,
		CloudSearchLightReading: req.body.CloudSearchLightReading,
		Rainfall: req.body.Rainfall,
		Dry_Bulb: req.body.Dry_Bulb,
		Wet_Bulb: req.body.Wet_Bulb,
		Max_Read: req.body.Max_Read,
		Max_Reset: req.body.Max_Reset,
		Min_Read: req.body.Min_Read ,
		Min_Reset: req.body.Min_Reset,
		Piche_Read: req.body.Piche_Read,
		Piche_Reset: req.body.Piche_Reset,
		TimeMarksThermo: req.body.TimeMarksThermo,
		TimeMarksHygro: req.body.TimeMarksHygro,
		TimeMarksRainRec: req.body.TimeMarksRainRec,
		Present_Weather: req.body.Present_Weather,
		Present_WeatherCode: req.body.Present_WeatherCode,
		Past_Weather: req.body.Past_Weather,
		Past_WeatherCode: req.body.Past_WeatherCode,
		Visibility: req.body.Visibility,
		Wind_Direction: req.body.Wind_Direction,
		Wind_Speed: req.body.Wind_Speed,
		Gusting: req.body.Gusting,
		AttdThermo: req.body.AttdThermo,
		PrAsRead: req.body.PrAsRead,
		Correction: req.body.Correction,
		CLP: req.body.CLP,
		MSLPr: req.body.MSLPr,
		TimeMarksBarograph: req.body.TimeMarksBarograph,
		TimeMarksAnemograph: req.body.TimeMarksAnemograph,
		OtherTMarks: req.body.OtherTMarks,
		SoilMoisture: req.body.SoilMoisture,
		SoilTemperature: req.body.SoilTemperature,
		sunduration: req.body.sunduration,
		trend: req.body.trend,
		windrun: req.body.windrun,
		Max_temp: req.body.Max_temp,
		Min_temp:req.body.Min_temp,
		speciormetar: req.body.speciormetar,
		UnitOfWindSpeed: req.body.UnitOfWindSpeed,
		IndOrOmissionOfPrecipitation: req.body.IndOrOmissionOfPrecipitation,
		TypeOfStation_Present_Past_Weather: req.body.TypeOfStation_Present_Past_Weather,
		HeightOfLowestCloud: req.body.HeightOfLowestCloud,
		StandardIsobaricSurface: req.body.StandardIsobaricSurface,
		GPM: req.body.GPM,
		DurationOfPeriodOfPrecipitation: req.body.DurationOfPeriodOfPrecipitation,
		GrassMinTemp: req.body.GrassMinTemp ,
		CI_OfPrecipitation: req.body.CI_OfPrecipitation,
		BE_OfPrecipitation: req.body.BE_OfPrecipitation,
		IndicatorOfTypeOfIntrumentation: req.body.IndicatorOfTypeOfIntrumentation,
		SignOfPressureChange: req.body.SignOfPressureChange,
		Supp_Info: req.body.Supp_Info,
		VapourPressure: req.body.VapourPressure,
		T_H_Graph: req.body.T_H_Graph,
		DeviceType: req.body.DeviceType,
		O_SubmittedBy: req.body.O_SubmittedBy,
		Remarks: req.body.Remarks,
		Approved : req.body.Approved,
		ApprovedBy : req.body.ApprovedBy,
		SyncStatus: req.body.SyncStatus.toString(),
		Endorsed: req.body.Endorsed,
		EndorsedBy: req.body.EndorsedBy


	}).then(observationslip => {
		Observationslip.findAll({
			// where: {
			// 	TIME: {
			// 		[Op.or]: req.body.TIME
			// 	}
			// }

		}).then(

			observationslips => {
			console
			res.send({ message: 'Observationslip added successfully!' });
		}).catch(err => {
			res.status(500).send({ reason: err.message });
		});
	}).catch(err => {
		res.status(500).send({ reason: err.message });
	})
}

// get obsevrationslips
exports.getObservationslips = (req, res) => {
	Observationslip.findAll({
		// limit: 10
	}).then(observationslip => {
		res.json(observationslip)
	}).catch(err => {
		res.status(500).send({
			'description': 'Can not fetch obsevrationslips',
			'error': err
		});
	})
}
exports.getAnObservationslip = (req, res) => {
	const slipId =  req.params.id;
	// console.log(slipId);
	Observationslip.findOne({
		where: { id: slipId}
	}).then( oSlip => {
		// console.log(oSlip);
		res.json(oSlip)
	}).catch(err => {
		res.status(500).send({
			'description': 'Can not fetch observationslip form',
			'error': err
		});
	})
}

// count unsynced 
// exports.countUnsyncedObservationslips =  (req, res) => {
// 	console.log('herere')
// 	Observationslip.findAll({
// 	 where:{
// 		 id: [1]

// 	 }
	
// 	}).then(count => {
// 		console.log(count);
// 		res.json(count);
// 	}).catch(err => {
// 		res.status(500).send({
// 			'description':'Failed to count unsyced records',
// 			'error': err
// 		});
// 	});

// }

// exports.countUnsyncedObservationslips = (req, res) => {
	
// 	Observationslip.findAll({
// 		// where: { id: slipId}
// 	}).then( oSlip => {
// 		// console.log(oSlip);
// 		res.json(oSlip)
// 	}).catch(err => {
// 		res.status(500).send({
// 			'description': 'Can not fetch observationslip form',
// 			'error': err
// 		});
// 	})
// }

exports.countUnsyncedObservationslips = (req, res) => {
	Observationslip.findAll({
		// limit: 10
	}).then(observationslip => {
		res.json(observationslip)
	}).catch(err => {
		res.status(500).send({
			'description': 'Can not fetch obsevrationslips',
			'error': err
		});
	});
}

exports.findCountUnsynced = (req, res) => {
	console.log('here');
	Observationslip.count({
		where: { Station: 1 }
	}).then(observationslip => {
		res.json(observationslip)
	}).catch(err => {
		res.status(500).send({
			'description': 'Can not fetch obsevrationslips',
			'error': err
		});
	});

}

exports.updateObservationslip = (req, res) => {
	let slipData =  req.body;
	console.log(req.body);
	let slipId = req.body.id;
	console.log(slipId);

	// Observationslip.find({ where : { id: slipId}})
	// .on('success', function(observationslip) {
	// 	if(observationslip) {
	// 		console.log('yes exists');
	// 	}
	// })

	Observationslip.update(
		{slipData},
		{ where: { id: slipId}}
		).then(() => {
			res.status(200).json({ msg: 'Updated successfully observationslip  with id = ' + id});
		}).catch(err => {
			res.status(500).send({
				'description': 'Failed to update observationslip form',
				'error': err
			});
		});
}

