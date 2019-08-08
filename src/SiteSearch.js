import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Excerpt from "./Excerpt";
import Paginate from "./Paginate";

const SiteSearch = (props) => {
    const {domain, baseUrl, limit, openInNewWindow, appUrl, siteName} = props;
    const [search, setSearch] = useState('');
    const [highlight, setHighlight] = useState('');
    const [results, setResults] = useState(null);
    const [page, setPage] = useState(0);

    const onSubmit = (e) => {
        e.preventDefault();
        setPage(0);
        fetchResults(search, page);
    };

    const fetchResults = (term, currentPage) => {
        axios.get(`${baseUrl}/?domain=${domain}&s=${term}&page=${currentPage}&limit=${limit}`)
            .then(results => {
                setResults(results.data);
                setHighlight(term);
                window.scrollTo(0, 0);
                window.history.pushState({}, "", `${appUrl}?s=${term.replace(new RegExp(' ', 'g'), '+')}`);
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

    const changePage = (updatedPage) => {
        setPage(updatedPage);
        fetchResults(search, updatedPage);
    };

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
                <span className="input-group-label">
                    {siteName}
                </span>
                <input className="input-group-field" type="text" name="search" value={search}
                       onChange={e => setSearch(e.target.value)}/>
                <div className="input-group-button">
                    <input type="submit" className="button" value="Search"/>
                </div>
            </div>
        </form>

        {results && results.count > 0 ?
            <Paginate page={page} previous={previous} next={next} changePage={changePage} limit={limit} count={results.count}/>
            : null}

        <div className="site-search-results">
            {results && results.count > 0 ? <strong>Found {results.count} results.</strong> : null}
            {results && results.count > 0 ? results.rows.map(row => {
                return <div key={row.name} className='site-search-result'>
                    <h3 className='site-search-title'>
                        <a href={row.url}
                           target={openInNewWindow ? '_blank' : '_self'}
                           rel={openInNewWindow ? 'noopener noreferrer' : null}>
                            {row.title}
                        </a>
                    </h3>
                    <p className='site-search-url'>
                        <a href={row.url}
                           target={openInNewWindow ? '_blank' : '_self'}
                           rel={openInNewWindow ? 'noopener noreferrer' : null}>
                            {row.url}
                        </a>
                    </p>
                    <Excerpt text={row.contents} phrases={highlight.split(' ')} radius={200} ending={'...'}/>
                </div>
            }) : <strong>No results</strong>}
        </div>
        {results && results.count > 0 ?
            <Paginate page={page} previous={previous} next={next} changePage={changePage} limit={limit} count={results.count}/>
            : null}
    </div>;
};

export default SiteSearch;