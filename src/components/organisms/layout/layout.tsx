import { useState, useMemo, useEffect } from "react";
import Context from "../../../context/Context";
import "./layout.scss";
import ProfilePhoto from "../../../assest/imgs/profile.jpg";
import SlideSwiper from "../../molecules/slide/swiper/slideSwiper";
import InfoCard from "../../molecules/info-card/infoCard";
import { CharacterReference } from "../../../interfaces/CharacterReference";
import { getCharacters } from "../../../services/rickandMorty_api";
import { FilterOptions } from "../../../interfaces/FilterOptionsReference";
import Pagination from "../../atoms/pagination/pagination";

const Layout = () => {
    const [filterSelected, setFilterSelected] = useState("");
    const [characters, setCharacters] = useState<any>();
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [filterOptions, setFilterOptions] = useState<FilterOptions>({
        page: currentPage,
        gender: "",
        species: "",
        totalPages: 0
    });

    const doSetFilterSelected = (filter: string) => setFilterSelected(filter);

    const toggleFilter =async(actualFilter: string, species?: string, gender?: string) => {
        doSetFilterSelected(actualFilter)
        const result = await getCharacters({page : filterOptions.page, gender : gender, species: species});
                setCharacters(result.data.data.results);
                setFilterOptions({ ...filterOptions, totalPages: result.data.data.info.pages });
                setIsLoading(false);
       
    }

    const handlePageChange = async (pageNumber: number) => {
        setIsLoading(true);
        setCurrentPage(pageNumber);
        setFilterOptions({ ...filterOptions, page: pageNumber });
        const result = await getCharacters({page : pageNumber, gender : "", species: ""});
                setCharacters(result.data.data.results);
                setFilterOptions({ ...filterOptions, totalPages: result.data.data.info.pages });
                console.log(result.data.data.results);
                setIsLoading(false);
        // Perform actions when page changes, e.g., fetching data for the new page
    };

    const cardsInit = useMemo<any>(() => {
        setIsLoading(true);
        const listCharacters = characters;
        (async () => {
            try {
                const result = await getCharacters(filterOptions);
                setCharacters(result.data.data.results);
                setFilterOptions({ ...filterOptions, totalPages: result.data.data.info.pages });
                console.log(result.data.data.results);
            } catch (error) {
                console.log(error)
            }

        })();
        return listCharacters;
    }, []);

    useEffect(() => {
        setCharacters(cardsInit);
        console.log(cardsInit, "cards");
    }, [cardsInit]);

    const context = {
        filterSelected: { get: filterSelected, set: doSetFilterSelected },
    };

    return (
        <Context.Provider value={context}>
            <div className="header">
                <div className="logo">RickAndMorty</div>
                <nav className="nav-header open">
                    <ul>
                        <li>Home</li>
                        <li>About</li>
                        <li>Contact</li>
                    </ul>
                </nav>
                <div className="profile">
                    <img
                        src={ProfilePhoto}
                        alt="Profile"
                        className="profile-photo"
                    />
                    <button className="menu-toggle">
                        Menu
                    </button>
                </div>
            </div>
            <main>

                <SlideSwiper {...characters} />

                <section className="main_characters" style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 3fr",
                    gap: "1rem",
                    backgroundColor: "lightgray",
                    minHeight: "50rem"
                }}>
                    <div>
                        <h1>Main Characters</h1>
                        <article>
                            <p>Antenna Morty</p>
                            <p>Arntenna Rick</p>
                            <p>Ants in my Eyes Johnson</p>
                        </article>
                    </div>
                    <div>
                        <nav className="nav-gallery open">
                            <h1>Popular By</h1>
                            <ul>
                                <li id="specie" onClick={(e) => {
                                    e.preventDefault();
                                    console.log(e.currentTarget.innerHTML);
                                    toggleFilter(e.currentTarget.id,e.currentTarget.innerHTML,"")
                                }}>Human</li>
                                <li id="specie" onClick={(e) => {
                                    e.preventDefault();
                                    toggleFilter(e.currentTarget.id,e.currentTarget.innerHTML,"")
                                }}>Alien</li>
                                <li id="gender" onClick={(e) => {
                                    e.preventDefault();
                                    toggleFilter(e.currentTarget.id,"", e.currentTarget.innerHTML)
                                }}>Male</li>
                                <li id="gender" onClick={(e) => {
                                    e.preventDefault();
                                    toggleFilter(e.currentTarget.id,"", e.currentTarget.innerHTML)
                                }}>Female</li>
                                <li id="specie" onClick={(e) => {
                                    e.preventDefault();
                                    toggleFilter(e.currentTarget.id,e.currentTarget.innerHTML,"")
                                }}>Humanoid</li>
                            </ul>
                        </nav>
                        <section style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr 1fr",
                            gap: "1rem",
                        }}>
                            {characters && characters.length > 0 ?
                                characters.map((singleCharacter: any) => {
                                    return (

                                        <InfoCard {...singleCharacter} />
                                    )
                                }) : <h1>There is not images to show</h1>
                            }
                        </section>
                        <div className="pagination">
                            <Pagination currentPage={currentPage} totalPages={filterOptions.totalPages} onPageChange={handlePageChange} />
                        </div>
                    </div>
                </section>

            </main>

            <div className="footer">
                Powered By JARP
            </div>
        </Context.Provider>
    );
}

export default Layout;