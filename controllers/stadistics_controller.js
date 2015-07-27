var sequelize = require('sequelize');
var models = require('../models/models.js')

//GET /quizes/stadistics
exports.process = function(req, res){
	var quizNum, commentNum, avgCommnent, quizComment, quizNoComment;
	models.Quiz.count().then(function(quiz) {
		quizNum = quiz;
		console.log('1');
	models.Comment.count().then(function(comment) {		
		commentNum = comment;
		console.log('2');
//	models.Comment.aggregate('id', 'avg', {group: ["QuizId"]}).then(function(avg) {		
		//avgComment = avg;
		if (quizNum == 0)
			avgComment = 0;
		else
			avgComment = commentNum / quizNum;
		console.log('3');
	models.Quiz.count({
				include: [{model: models.Comment}],
				where: ["QuizId not null"],
				distinct: ["id"]
			}).then(function(count) {
		quizComment = count;
		console.log('4');
	models.Quiz.count({
                                include: [{model: models.Comment}],
                                where: ["QuizId is null"],
                                distinct: ["id"]
                        }).then(function(count) {
		quizNoComment = count;
		console.log('5');

		res.render('quizes/stadistics', {
			quiz: quizNum,
			comment: commentNum,
			avg: avgComment,
			quizcomment: quizComment,
			quiznocomment: quizNoComment,
			errors: []
		});

	})
	})
//	})
	})
    	})
};
