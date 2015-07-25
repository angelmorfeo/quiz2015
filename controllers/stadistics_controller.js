var sequelize = require('sequelize');
var models = require('../models/models.js')

//GET /quizes/stadistics
exports.process = function(req, res){
	var quizNum, commentNum, avgCommnent, quizComment, quizNoComment;
	models.Quiz.count().then('success', function(quiz) {
		quizNum = quiz;
	models.Comment.count().then('success', function(comment) {		
		commentNum = comment;
	models.Comment.aggregate('Id', 'avg', {group: ["QuizId"]}).then('success', function(avg) {		
		//avgComment = avg;
		if (quizNum == 0)
			avgComment = 0;
		else
			avgComment = commentNum / quizNum;
	models.Quiz.count({
				include: [{model: models.Comment}],
				where: ["QuizId not null"],
				distinct: ["Id"]
			}).then('success', function(count) {
		quizComment = count;
	models.Quiz.count({
                                include: [{model: models.Comment}],
                                where: ["QuizId is null"],
                                distinct: ["Id"]
                        }).then('success', function(count) {
		quizNoComment = count;

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
	})
	})
    	})
};
