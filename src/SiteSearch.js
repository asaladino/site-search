import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Excerpt from "./Excerpt";

const SiteSearch = (props) => {
    const {domain, baseUrl, limit, openInNewWindow} = props;
    const [search, setSearch] = useState('');
    const [results, setResults] = useState(null);
    const [page, setPage] = useState(0);

    const onSubmit = (e) => {
        e.preventDefault();
        fetchResults(search, page);
    };

    const fetchResults = (term, currentPage) => {
        axios.get(`${baseUrl}/?domain=${domain}&s=${term}&page=${currentPage}&limit=${limit}`)
            .then(results => {
                setResults(results.data);
                window.history.pushState({}, "", `/?s=${term.replace(new RegExp(' ', 'g'), '+')}`);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        let term = null;
        for (let p of searchParams) {
            if (p[0] === 's') {
                term = p[1];
                setSearch(term);
            }
        }
        if (term) {
            fetchResults(term, page);
        }
    }, []);

    const previous = () => {
        setPage(page - 1);
        fetchResults(search, page - 1);
    };

    const next = () => {
        setPage(page + 1);
        fetchResults(search, page + 1);
    };

    return <div className="site-search">
        <form onSubmit={onSubmit}>
            <div className="input-group">
                <span className="input-group-label"/>
                <input className="input-group-field" type="text" name="search" value={search}
                       onChange={e => setSearch(e.target.value)}/>
                <div className="input-group-button">
                    <input type="submit" className="button" value="Search"/>
                </div>
            </div>
        </form>

        <div className="site-search-results">
            {results && results.count > 0 ? <strong>Found {results.count} results.</strong> : null}
            {results && results.count > 0 ? results.rows.map(row => {
                return <div key={row.name}>
                    <h3 className='site-search-title'>
                        <a href={row.url}
                           target={openInNewWindow ? '_blank' : '_self'}
                           rel={openInNewWindow ? 'noopener noreferrer' : null}>
                            {row.title}
                        </a>
                    </h3>
                    <Excerpt text={row.contents} phrases={search.split(' ')} radius={200} ending={'...'}/>
                    <div className='site-search-url'>
                        <a href={row.url}
                           target={openInNewWindow ? '_blank' : '_self'}
                           rel={openInNewWindow ? 'noopener noreferrer' : null}>
                            {row.url}
                        </a>
                    </div>
                    <hr/>
                </div>
            }) : <strong>No results</strong>}
        </div>
        {results && results.count > 0 ? <div className="site-search-paging">
            <nav aria-label="Pagination">
                <ul className="pagination">
                    <li className={`pagination-previous ${page === 0 ? 'disabled' : null}`}>
                        {page > 0 ? <a aria-label="Previous page" onClick={previous}>
                            Previous <span className="show-for-sr">page</span>
                        </a> : <span>Previous <span className="show-for-sr">page</span></span>}
                    </li>
                    <li className="current">
                        <span className="show-for-sr">You're on page</span> {(() => page + 1)()}
                    </li>
                    <li className={`pagination-next ${(page + 1) * limit >= results.count ? 'disabled' : null}`}>
                        {(page + 1) * limit < results.count ? <a aria-label="Next page" onClick={next}>
                            Next <span className="show-for-sr">page</span>
                        </a> : <span>Next <span className="show-for-sr">page</span></span>}
                    </li>
                </ul>
            </nav>
        </div> : null}
    </div>;
};

export default SiteSearch;