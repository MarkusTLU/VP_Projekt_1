const http = require("http");
const fs = require("fs");
//lisame mooduli, et päringu URL-i mõista
const url = require("url");
//liidame mooduli, et lisada virtuaalsele failisüsteemile päris failitee osi
const path = require("path");
const dateEt = require("./src/dateTimeET");
const textRef = "txt/vanasonad.txt";
const pageStart = '<!DOCTYPE html>\n<html lang="et">\n<head>\n\t<meta charset="utf-8">\n\t<title>Markus P, veebiprogrammeerimine</title>\n</head>\n<body>';
const pageBody = '\n\t<h1>Markus P, veebiprogrammeerimine</h1>\n\t<h2>Markus P, kodut��</h2>\n\t<p>See leht on loodud <a href="https://www.tlu.ee">Tallinna �likoolis</a> veebiprogrammeerimise kursusel ega oma m�istlikku sisu</p>\n<hr>\n';
const pageBanner = '<img src="vp_banner_2025_AA.jpg" alt="Kursuse banner">';
const pageEnd = '\n</body>\n</html>';

http.createServer(function(req, res){
	//vaatan päringut (req), mida klient tahab
	console.log("Praegune URL: " + req.url);
	//eraldame (parse) puhta URL-i ilma parameetrite jms kraamita
	let currentUrl = url.parse(req.url, true);
	console.log("puhas URL: " + currentUrl.pathname);

	//loon marsruudid erinevate URL-ide jaoks

	//esimesena avaleht
	if(currentUrl.pathname === "/"){
		res.writeHead(200, {"Content-type": "text/html"});
		res.write(pageStart);
		res.write(pageBody);
		res.write(pageBanner);
		res.write("\n\t<p>Täna on " + dateEt.weekDay() + " " + dateEt.longDate() + ".</p>");
		res.write('\n\t<p>Vaata ka valikut <a href="/vanasonad">vanasõnu</a>.</p>');
		res.write(pageEnd);
		return res.end();

	}

	else if(currentUrl.pathname === "/vanasonad"){
			res.writeHead(200, {"Content-type": "text/html"});
		fs.readFile(textRef, "utf8", (err, data)=>{
			if(err){
				res.write(pageStart);
				res.write(pageBody);
				res.write(pageBanner);
				res.write("\n\t<p>Täna on " + dateEt.weekDay() + " " + dateEt.longDate() + ".</p><p>Kahjuks tänaseks ühtki vanasõna välja pakkuda pole!</p>");
				res.write(pageEnd);
				return res.end();
			} else {
				let oldWisdomList = data.split(";");
				let folkWisdomOutput = "\n\t<ol>";
				for (let i = 0; i < oldWisdomList.length; i ++){
					folkWisdomOutput += "\n\t\t<li>" + oldWisdomList[i] + "</li>";
				}
				folkWisdomOutput += "\n\t</ol>";
				res.write(pageStart);
				res.write(pageBody);
				res.write(pageBanner);
				res.write("\n\t<p>Täna on " + dateEt.weekDay() + " " + dateEt.longDate() + " " + dateEt.time() + ".</p>");
				res.write("\n\t<h2>Valik Eesti vanasõnu</h2>")
				res.write(folkWisdomOutput);
				res.write(pageEnd);
				return res.end();
			}
		});

	}

	else if(currentUrl.pathname === "/vp_banner_2025_AA.jpg"){
		//liidame veebilehe aadressile vajaliku päris kataloogi nime
		let bannerPath = path.join(__dirname, "images");
		fs.readFile(bannerPath + currentUrl.pathname, (err, data)=>{
			if(err){
				throw(err);
			}
			else {
				res.writeHead(200, {"content-type": "image/jpeg"});
				res.end(data);
			}
		});
	}

	else if(currentUrl.pathname === "/hobid"){
		res.writeHead(200, {"Content-type": "text/html"});
		res.write(pageStart);
		res.write(pageBody);
		res.write(pageBanner);
		res.write("\n\t<p>T�na on " + dateEt.weekDay() + " " + dateEt.longDate() + " " + dateEt.time() + ".</p>");
		res.write("\n\t<h2>Minu hobid</h2>");
		res.write(`
			<ul>
				<li>
					<a href="https://www.ironman.com/races/im-tallinn" target="_blank">Ironman</a><br>
					<img src="metsatriatlon.png" alt="Ironmani pilt"> 				
				</li>
				<li>
					<a href="https://www.sofascore.com/" target="_blank">Premier league</a><br>
					<img src="Arsenal.png" alt="Arsenal"> 
				</li>
				<li>
					<a href="https://www.jalgpall.ee/" target="_blank">Jalgpall</a><br>
					<img src="pelgu.jpg" alt="Pelgu"> 
				</li>
				<li>
					<a href="https://oldschool.runescape.com/" target="_blank">Oldschool Runescape</a><br>
					<img src="osrs.jpg" alt="Oldschool Runescape"> 
				</li>
			</ul>
		`);
		res.write(pageEnd);
		return res.end();
	}

	else {
		res.end("Viga 404, sellist lehte ei ole olemas!");
	}
}).listen(5306);