const SliderItem = ({Title, Year, Poster, imdbID, rating}) => `
<div class="card-image">${
    Poster !== 'N/A'
        ? `<img src="${Poster}">`
        : '<div class="card-image-unavailable">No Image<br> Available</div>'
}</div>  
<div class="card-content">
    <div class="year">${Year}</div>
    <div class="rate"><img src="/img/batman.png" alt="batman">${rating}</div>
</div> 
<div class="card-title"><a href="https://www.imdb.com/title/${imdbID}" target="_blank">${Title}</a></div>
`;

export default SliderItem;
