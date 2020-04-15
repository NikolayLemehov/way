import PageHeader from './page-header';
import VisitPlace from './visit-place';
import Country from './country';
import Prices from './prices';
import Questions from './questions';
import PopupByTour from './popup-buy-tour';
import PopupSuccess from './popup-success';
import {activeForEeachNodeListForIE} from './utils';

activeForEeachNodeListForIE();

const moveTo = new window.MoveTo();
const triggerCollection = document.querySelectorAll(`.js-trigger`);
triggerCollection.forEach((it) => moveTo.registerTrigger(it));

const pageHeader = new PageHeader(document.querySelector(`.page-header`));
const visitPlace = new VisitPlace(document.querySelector(`.visit-place`));
const country = new Country(document.querySelector(`.country`));
const prices = new Prices(document.querySelector(`.prices`));
const questions = new Questions(`questions`);
const popupByTour = new PopupByTour(`buy-tour`);
const popupSuccess = new PopupSuccess(`form-success`);
pageHeader.active();
visitPlace.active(country);
country.active(popupByTour);
prices.active(popupByTour);
questions.active(popupSuccess);
popupByTour.active(popupSuccess);
popupSuccess.active();
