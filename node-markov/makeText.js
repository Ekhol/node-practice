/** Command-line tool to generate Markov text. */

const fs = require("fs");
const axios = require("axios");
const process = require("process");
const markov = require("./markov");

function createText(text) {
    let mm = new markov.MarkovMachine(text);
    console.log(mm.makeText())
}

function readFile(path) {
    fs.readFile(path, "utf-8", function cb(error, data) {
        if (error) {
            console.error(`Cannot read file: ${path}: ${error}`);
            process.exit(1);
        }
        else {
            createText(data);
        }
    });
}

async function readURL(url) {
    let res;

    try {
        res = await axios.get(url);
    }
    catch (error) {
        console.error(`Cannot read URL: ${url}: ${error}`);
        process.exit(1);
    }
    createText(res.data)
}

let [type, path] = process.argv.slice(2);

if (type === "file") {
    readFile(path)
}

else if (type === "url") {
    readURL(path);
}

else {
    console.error(`Unable to process source type: ${type}`);
    process.exit(1);
}