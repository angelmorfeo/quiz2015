var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');
var stadisticsController = require('../controllers/stadistics_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Bienvenido a Quiz', errors: [] });
});

//Autoload de comandos con :quizId
router.param('quizId', quizController.load); //autoload :quizId
router.param('commentId', commentController.load); //autoload :commentId

//Definición de rutas de sesión
router.get('/login', sessionController.new);	//formulario login
router.post('/login', sessionController.create); //crear session
router.get('/logout', sessionController.destroy); //Deberia ser .delete   

//Definicion de rutas de preguntas
router.get('/quizes', sessionController.autoLogout, quizController.index);
router.get('/quizes/:quizId(\\d+)', sessionController.autoLogout, quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', sessionController.autoLogout, quizController.answer);
router.get('/quizes/new', sessionController.loginRequired, sessionController.autoLogout, quizController.new);
router.post('/quizes/create', sessionController.loginRequired, sessionController.autoLogout, quizController.create);
router.get('/quizes/:quizId(\\d+)/edit', sessionController.loginRequired, sessionController.autoLogout, quizController.edit);
router.put('/quizes/:quizId(\\d+)', sessionController.loginRequired, sessionController.autoLogout, quizController.update);
router.delete('/quizes/:quizId(\\d+)', sessionController.loginRequired, sessionController.autoLogout, quizController.destroy);
router.get('/quizes/stadistics', sessionController.autoLogout, stadisticsController.process);

//Definicion de rutas de comentarios
router.get('/quizes/:quizId(\\d+)/comments/new', sessionController.autoLogout, commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', sessionController.autoLogout, commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', sessionController.loginRequired, sessionController.autoLogout, commentController.publish);//Deberia ser un put ya que es una actualizacion

router.get('/author', function(req, res){
	res.render('author', { errors: [] });
});

module.exports = router;
