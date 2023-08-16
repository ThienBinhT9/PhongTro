import Header from "../../components/Header";
import Navigation from "../../components/Navigation";
import Search from "../../components/Search";
import Intro from "../../components/Intro";
import Contact from "../../components/Contact";
import { Outlet } from "react-router-dom";

function Home() {
    return ( 
        <>
            <Header/>
            <Navigation />
            <Search />
            <div style={{width:'80%', margin:'0 auto', marginBottom:'24px'}}>
                <Outlet />
            </div>
            <Intro />
            <Contact />
        </>
     );
}

export default Home;