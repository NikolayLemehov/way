import PageHeader from './page-header';
import VisitPlace from './visit-place';
import Country from './country';
import {activeForEeachNodeListForIE} from './utils';

activeForEeachNodeListForIE();

const moveTo = new window.MoveTo();
const triggerCollection = document.querySelectorAll(`.js-trigger`);
triggerCollection.forEach((it) => moveTo.registerTrigger(it));

const pageHeader = new PageHeader(document.querySelector(`.page-header`));
const visitPlace = new VisitPlace(document.querySelector(`.visit-place`));
const country = new Country(document.querySelector(`.country`));
pageHeader.active();
visitPlace.active(country);
country.active();
