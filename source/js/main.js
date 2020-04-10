import {activeForEeachNodeListForIE} from './utils';
import PageHeader from './page-header';
import Country from './country';

activeForEeachNodeListForIE();
const pageHeader = new PageHeader(document.querySelector(`.page-header`));
pageHeader.active();
const country = new Country(document.querySelector(`.country`));
country.active();

const moveTo = new window.MoveTo();
const triggerCollection = document.querySelectorAll(`.js-trigger`);
triggerCollection.forEach((it) => moveTo.registerTrigger(it));
