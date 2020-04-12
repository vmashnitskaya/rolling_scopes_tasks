const Category = (data) => `
<div class="card__main ${data.isTrain ? 'train' : 'game'}">
    <div class="card__main-item">
        <div class="card__main-image" 
            style="background:url(${data.image}) no-repeat -45px; background-size: 230px 160px;"></div>
        <div class="card__main-name">${data.name}</div>
    </div>
</div>
`;

export default Category;
