let apiURL = "https://deckofcardsapi.com/api/deck";

//Part 1.
async function first() {
    let res = await $.getJSON(`${apiURL}/new/draw/`);
    let { value, suit } = res.cards[0];
    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
}
first();

//Part 2.
async function second() {
    let firstCard = await $.getJSON(`${apiURL}/new/draw/`);
    let deck = firstCard.deck_id;
    let secondCard = await $.getJSON(`${apiURL}/${deck}/draw`);
    [firstCard, secondCard].forEach(card => {
        let { value, suit } = card.cards[0];
        console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
    });
}
second();

//Part 3.
$(function () {
    async function third() {
        let $button = $('button');
        let $cards = $('#cards');

        let deck = await $.getJSON(`${apiURL}/new/shuffle/`);
        $button.show().on('click', async function () {
            let card = await $.getJSON(`${apiURL}/${deck.deck_id}/draw/`);
            let cardImg = card.cards[0].image;
            $cards.append(
                $('<img>', { src: cardImg })
            );
            if (card.remaining === 0) $button.remove();
        });
    }
    third();
});
