import Menu from './Menu';
import Header from './Header';
import Footer from './Footer';
import Category from './Category';

const MainPage = (data) => `
    ${Menu({ open: data.menuOpen, items: [{ name: 'Main', ...data.categories }] })}
    ${Header({ menuOpen: data.menuOpen, isTrain: data.isTrain })}
    <main class="main">
        <div class="wrapper main-wrapper">
            ${data.categories.map((category) => Category({ ...category, isTrain: data.isTrain })).join('')}
        </div>
    </main>
    ${Footer()}
`;

export default MainPage;
