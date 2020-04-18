const HackerSpaceRow = (data) => `
            <div class="statistics__category-item word">${data.word}</div>
            <div class="statistics__category-item translation">${data.translation}</div>
            <div class="statistics__category-item train"></div>
            <div class="statistics__category-item game"></div>
            <div class="statistics__category-item errors"></div>
            <div class="statistics__category-item errorPercent"></div>    
`;

export default HackerSpaceRow;
