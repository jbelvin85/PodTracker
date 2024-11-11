document.getElementById('increase').addEventListener('click', function() {
    let lifeTotal = document.getElementById('lifeTotal');
    lifeTotal.textContent = parseInt(lifeTotal.textContent) + 1;
});

document.getElementById('decrease').addEventListener('click', function() {
    let lifeTotal = document.getElementById('lifeTotal');
    lifeTotal.textContent = parseInt(lifeTotal.textContent) - 1;
});
