const Category = (data, isTrain) => `
<div class="card__main ${isTrain ? 'train' : 'game'}">
<a href="#${data.hash}">
    <div class="card__main-item">
        <div class="card__main-image" 
            style="background:url(${data.image}) no-repeat -45px; background-size: 230px 160px;"></div>
        <a class="card__main-name" href="#${data.hash}">${data.name}</a>
    </div>
</a>
</div>
`;

export default Category;
