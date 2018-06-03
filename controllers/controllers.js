var mongoose = require('mongoose');

mongoose.connect('mongodb://mashtouly:mashtouly123@ds245150.mlab.com:45150/mashtouly_todo');
var mongSchema = new mongoose.Schema({
	item:String
});

var ToDo = mongoose.model('ToDo',mongSchema);

/*
var firstItem = ToDo({item:'Hello world'}).save(function(error){
	if(error) throw error;
	console.log('item saved');
});
*/

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app){
	app.get('/',function(req,res){
		ToDo.find({},function(err,data){
			if (err) throw err;
			res.render('todo',{todos:data});
		});
		
	});

	app.post('/',urlencodedParser,function(req,res){
		ToDo(req.body).save(function(err,data){
			if(err) throw err;
			res.json(data);
		})
		
	});

	app.delete('/:item',function(req,res){
		ToDo.find({item:req.params.item.replace(/\-/g," ")}).remove(function(err,data){
			if (err) throw err;
			res.json(data);
		});
		
	});
};
