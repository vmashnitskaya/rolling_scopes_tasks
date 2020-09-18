const HackerSpaceRow = (data) => `
            <div class="statistics__category-item word">${data.word}</div>
            <div class="statistics__category-item translation">${data.translation}</div>
            <div class="statistics__category-item train">${data.trainClicks}</div>
            <div class="statistics__category-item game">${data.gameSuccessClicks}</div>
            <div class="statistics__category-item errors">${data.gameErrorClicks}</div>
            <div class="statistics__category-item errorPercent">${data.percent}</div>    
`;

export default HackerSpaceRow;
