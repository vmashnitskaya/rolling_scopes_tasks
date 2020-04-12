const TrainCard = (data) => `
<div class="card__container-item train" data-word="${data.word}">
    <div class="card__container-back hidden" style="background: url(${data.image})">
        <div class="card__container-header">
            <div class="text">${data.translation}</div>
        </div>
    </div>
    <div class="card__container-front" style="background: url(${data.image})">   
        <div class="card__container-header">
            <div class="text">${data.word}</div>
            <div class="rotate"><img class="rotate-icon" src="img/rotate.png" alt="rotate" data-word="${data.word}"></div>
        </div>
    </div>
</div>
`;

export default TrainCard;
