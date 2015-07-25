// MW de autorizacion de accesos HTTP restringidos
exports.loginRequired = function(req, res, next) {
    if(req.session.user){
        next();
    } else {
        res.redirect('/login');
    }
};

// MW de auto-logout
exports.autoLogout = function(req, res, next) {
    if (!req.session.user){
	next();
	return;
    }

    if(!req.session.date){
        req.session.date = (new Date()).getTime();	
    } else {
	var _ms = (new Date()).getTime();
	var ms = _ms - req.session.date;
	if (ms > 120000) { //2 minutos (120 segundos)
		delete req.session.user;
		req.session.errors = [{"message": 'Se ha caducado la session (2 minutos)'}];
            	res.redirect("/login");
            	return;
	} else {
		req.session.date = (new Date()).getTime();
	}
    }
    next();
};

// Get /login   -- Formulario de login
exports.new = function(req, res) {
    var errors = req.session.errors || {};
    req.session.errors = {};

    res.render('sessions/new', {errors: errors});
};

// POST /login   -- Crear la sesion si usuario se autentica
exports.create = function(req, res) {

    var login     = req.body.login;
    var password  = req.body.password;

    var userController = require('./user_controller');
    userController.autenticar(login, password, function(error, user) {

        if (error) {  // si hay error retornamos mensajes de error de sesión
            req.session.errors = [{"message": 'Se ha producido un error: '+error}];
            res.redirect("/login");        
            return;
        }

        // Crear req.session.user y guardar campos   id  y  username
        // La sesión se define por la existencia de:    req.session.user
        req.session.user = {id:user.id, username:user.username};

        res.redirect(req.session.redir.toString());// redirección a path anterior a login
    });
};

// DELETE /logout   -- Destruir sesion 
exports.destroy = function(req, res) {
    delete req.session.user;
    res.redirect(req.session.redir.toString()); // redirect a path anterior a login
};
