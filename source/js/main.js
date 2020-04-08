import {activeForEeachNodeListForIE} from './utils';
import {activeSmoothScroll} from './smooth-scroll';
import PageHeader from './page-header';
import Country from './country';

activeForEeachNodeListForIE();
activeSmoothScroll();
const pageHeader = new PageHeader(document.querySelector(`.page-header`));
pageHeader.active();
const country = new Country(document.querySelector(`.country`));
country.active();
