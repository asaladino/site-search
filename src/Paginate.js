import React from "react";

const Paginate = (props) => {
    const {page, previous, changePage, next, limit, count} = props;
    return <div className="site-search-paging text-center">
        <nav aria-label="Pagination">
            <ul className="pagination">
                <li className={`pagination-previous ${page === 0 ? 'disabled' : null}`}>
                    {page > 0 ? <a aria-label="Previous page" onClick={previous}>
                        Prev <span className="show-for-sr">page</span>
                    </a> : <span>Prev <span className="show-for-sr">page</span></span>}
                </li>
                {page + 1 >= 3 ? <li><a ariaLabel={`Page 1`} onClick={() => changePage(0)}>1</a></li> : null}
                {page + 1 > 3 ? <li><a ariaLabel={`Page 2`} onClick={() => changePage(1)}>2</a></li> : null}

                {page + 1 >= 3 ? <li className="ellipsis" aria-hidden="true"></li> : null}

                {page + 1 >= 2 ? <li><a ariaLabel={`Page ${page}`} onClick={() => changePage(page - 1)}>
                    {page}</a></li> : null}
                <li className="current">
                    <span className="show-for-sr">You're on page</span> {(() => page + 1)()}
                </li>

                {(page + 1) * limit < count ?
                    <li><a ariaLabel={`Page ${page + 2}`} onClick={() => changePage(page + 1)}>
                        {page + 2}</a></li> : null}

                {(page + 2) * limit < count ? <li className="ellipsis" aria-hidden="true"></li> : null}

                {(page + 3) * limit < count ? <li>
                    <a ariaLabel={`Page ${(count / limit).toFixed()}`} onClick={() => changePage(Math.floor((count / limit) - 1))}>
                    {(count / limit).toFixed()}
                </a></li> : null}
                {(page + 2) * limit < count ? <li>
                    <a ariaLabel={`Page ${((count / limit) + 1).toFixed()}`} onClick={() => changePage(Math.floor(count / limit))}>
                    {((count / limit) + 1).toFixed()}
                </a></li> : null}

                <li className={`pagination-next ${(page + 1) * limit >= count ? 'disabled' : null}`}>
                    {(page + 1) * limit < count ? <a aria-label="Next page" onClick={next}>
                        Next <span className="show-for-sr">page</span>
                    </a> : <span>Next <span className="show-for-sr">page</span></span>}
                </li>
            </ul>
        </nav>
    </div>
};

export default Paginate;