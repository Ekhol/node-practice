const fs = require('fs');
const process = require('process');
const axios = require('axios');

let path;
let out;

function cat(path, out) {
    fs.readFile(path, 'utf8', function (error, data) {
        if (error) {
            console.error(`Error reading ${path}: ${error}`);
            process.exit(1);
        }
        else {
            output(data, out)
        }
    });
}

async function webCat(url, out) {
    try {
        let res = await axios.get(url);
        output(res, out);
    }
    catch (error) {
        console.error(`Error fetching ${url}: ${error}`);
        process.exit(1);
    }
}

function output(text, out) {
    if (out) {
        fs.writeFile(out, text, 'utf8', function (error) {
            if (error) {
                console.error(`Couldn't write ${out}: ${error}`);
                process.exit(1);
            }
        });
    }
    else {
        console.log(text);
    }
}

if (process.argv[2] === '--out') {
    out = process.argv[3];
    path = process.argv[4];
}
else {
    path = process.argv[2];
}

if (path.slice(0, 4) === 'http') {
    webCat(path);
}

else {
    cat(path);
}
