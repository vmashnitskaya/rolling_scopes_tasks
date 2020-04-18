import Menu from './Menu';
import Header from './Header';
import Footer from './Footer';

const Page = () => `
    ${Menu()}
    ${Header()}
    <main class="main wrapper">
    </main>
    ${Footer()}
`;

export default Page;
