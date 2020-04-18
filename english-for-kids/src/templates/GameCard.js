const GameCard = (data) => `
<div class="card__container-item game" data-word="${data.word}"  style="background: url(${data.image}) no-repeat 0 -15px; background-size: 101% 240px">
    <audio  data-word="audio" class="${data.word}" src="${data.audioSrc}" type="audio/mpeg"></audio>
    </div>
</div>
`;

export default GameCard;
