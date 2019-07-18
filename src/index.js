import React from 'react';
import ReactDOM from 'react-dom';
import SiteSearch from './SiteSearch';

const siteSearchElement = document.getElementById('site-search');
const baseUrl = siteSearchElement.getAttribute('data-base-url');
const domain = siteSearchElement.getAttribute('data-domain');
const limit = siteSearchElement.getAttribute('data-limit');
const openInNewWindow = siteSearchElement.getAttribute('data-open-in-new-window');

ReactDOM.render(<SiteSearch baseUrl={baseUrl}
                            domain={domain}
                            openInNewWindow={openInNewWindow === 'true'}
                            limit={limit}/>, siteSearchElement);
