import React from 'react';
import ReactDOM from 'react-dom';
import SiteSearch from './SiteSearch';

const siteSearchElement = document.getElementById('site-search');
const baseUrl = siteSearchElement.getAttribute('data-base-url');
const appUrl = siteSearchElement.getAttribute('data-app-url');
const domain = siteSearchElement.getAttribute('data-domain');
const siteName = siteSearchElement.getAttribute('data-site-name');
const limit = siteSearchElement.getAttribute('data-limit');
const openInNewWindow = siteSearchElement.getAttribute('data-open-in-new-window');

ReactDOM.render(<SiteSearch baseUrl={baseUrl}
                            domain={domain}
                            siteName={siteName}
                            appUrl={appUrl}
                            openInNewWindow={openInNewWindow === 'true'}
                            limit={limit}/>, siteSearchElement);
