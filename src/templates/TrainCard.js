const TrainCard = (data) => `
<div class="card__container-item train" data-word="${data.word}"  style="background: url(${data.image}) no-repeat; background-size: 312px 210px;">
    <div class="card__container-back hidden">
        <div class="card-header">
            <div class="text">${data.translation}</div>
        </div>
    </div>
    <div class="card__container-front"> 
    <audio class="${data.word}">  
    <source src="${data.audioSrc}" type="audio/mpeg">
    </audio>
        <div class="card-header">
            <div class="text">${data.word}</div>
            <div class="rotate"><img class="rotate-icon" src="img/rotate.png" alt="rotate" data-word="${data.word}"></div>
        </div>
    </div>
</div>
`;


export default TrainCard;
