const fs = require('fs');
const path = require('path');
const express = require('express');

const getDirFiles = (dirAbsolutePath, dirPath, icons) => {

    const files = fs.readdirSync(dirAbsolutePath);
    for(const name of files){
        const fileAbsolutePath = dirAbsolutePath + '/' + name;
        const filePath = dirPath + '/' + name;

        if(path.extname(name) === '.svg'){
            icons.push(getIcon(fileAbsolutePath, filePath, name, dirPath));
        }else{
            getDirFiles(fileAbsolutePath, filePath, icons);
        }
    }
}

const getIcon = (iconAbsolutePath, iconPath, name, dirPath) => {
    if(!name) name = path.basename(iconAbsolutePath);
    if(!iconPath) iconPath = iconAbsolutePath;

    const svg = fs.readFileSync(iconAbsolutePath).toString();

    return {
        name: name,
		search: name.toLowerCase().replace(/[^0-9a-zа-яё]/gi, ''),
        iconPath: iconPath,
        svg: svg
    }
}

module.exports = (dirAbsolutePath, dirPath) => {
    let icons = [];

    getDirFiles(dirAbsolutePath, dirPath, icons);

	// icons.sort((a, b) => {
	// 	return a.name > b.name ? -1 : 1;
	// });

    const jsonIcons = JSON.stringify(icons);

    const app = express();
    app.get('/', function(request, response){
        fs.readFile('../dist/index.html', (error, data) => {
            let html = data.toString();
            html = html.replace('{{ replaceiconList }}', jsonIcons);
            response.send(html);
        });
    });

    app.use('/js', express.static(__dirname + '/dist/js'));

	app.use('/css', express.static(__dirname + '/dist/css'));

    const port = 8002;
    app.listen(port, 'icon-list.localhost', function () {
        console.log('|============================================|');
        console.log('| Icon list: http://icon-list.localhost:' + port + ' |');
        console.log('|============================================|');
    });
}

