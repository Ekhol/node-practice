let favNum = 28;
let apiURL = "http://numbersapi.com";

//1.

async function first() {
    let res = await $.getJSON(`${apiURL}/${favNum}?json`)
    console.log(res);
}

//2.
let numGroup = [7, 28, 357];
async function second() {
    let res = await $.getJSON(`${apiURL}/${numGroup}?json`);
    console.log(res);
}

//3.
async function third() {
    let factArr = await Promise.all(
        Array.from({ length: 4 }, () => $.getJSON(`${apiURL}/${favNum}?json`))
    );

    factArr.forEach(res => {
        $('body').append(`<p>${res.text}</p>`);
    });
}
third();