import {activeForEeachNodeListForIE} from './utils';
import {activeSmoothScroll} from './smooth-scroll';
import PageHeader from './page-header';

activeForEeachNodeListForIE();
activeSmoothScroll();
const pageHeader = new PageHeader();
pageHeader.active();
