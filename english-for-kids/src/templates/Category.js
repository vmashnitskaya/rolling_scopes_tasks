const Category = (data) => `
<div class="card__main ${data.isTrain ? 'train' : 'game'}">
<a href="#${data.hash}">
    <div class="card__main-item">
        <div class="card__main-image" 
            style="background-image:url(${data.image}); background-repeat: no-repeat;"></div>
        <a class="card__main-name" href="#${data.hash}">${data.name}</a>
    </div>
</a>
</div>
`;

export default Category;
