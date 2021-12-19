import type {NextPage} from 'next'
import styles from '../styles/Home.module.css'
import Footer from "../components/Footer/Footer";
import Main from "../components/Main/Main";
import Head from "../components/HeadMeta/HeadMeta";

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head/>

            <Main i18n={{todo: 'toso'}}/>

            <Footer i18n={{powered: 'poweerf'}}/>
        </div>
    )
}

export default Home
