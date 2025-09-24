const http = require("http");
const dateEt = require("./src/dateTimeET");
const pageStart = '<!DOCTYPE html>\n<html lang="et">\n<head>\n\t<meta charset="utf-8">\n\t<title>Markus P, veebiprogrammeerimine</title>\n</head>\n<body>';
const pageBody = '\n\t<h1>Markus P, veebiprogrammeerimine</h1>\n\t<h2>Markus P, kodutöö</h2>\n\t<p>See leht on loodud <a href="https://www.tlu.ee">Tallinna Ülikoolis</a> veebiprogrammeerimise kursusel ega oma mõistlikku sisu</p>\n<hr>\n';
const pageEnd = '\n</body>\n</html>';

http.createServer(function(req, res){
	//console.log("Laadimine");
	res.writeHead(200, {"Content-type": "text/html"});
	//res.write("Juhhei! Läkski käima!");
	res.write(pageStart);
	res.write(pageBody);
	res.write("<p>Täna on " + dateEt.weekDay() + " " + dateEt.longDate()+ " " + dateEt.time()+ " " + "</p>");
	res.write(pageEnd);
	return res.end();
}).listen(5306);
