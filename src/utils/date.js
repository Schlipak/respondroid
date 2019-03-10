export const DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const DAYS_FR = [
  'Lundi',
  'Mardi',
  'Mercredi',
  'Jeudi',
  'Vendredi',
  'Samedi',
  'Dimanche',
];

export const MONTHS_FR = [
  'Janvier',
  'Fevrier',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Aout',
  'Septembre',
  'Octobre',
  'Novembre',
  'Decembre',
];


export function printDate(date, hoursPrefix) {
  try {
    const parse = Date.parse(date);
    const d = new Date(parse);
    let append = '';
    if (hoursPrefix) {
      append = `${d.getHours()}h${d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes()}`;
    }
    return `${d.getDate()} ${MONTHS[d.getMonth()]} ${hoursPrefix || ''} ${append}`;
  } catch (e) {
    return e.message;
  }
}

export function printDateFr(date, hoursPrefix, year = false) {
  try {
    const parse = Date.parse(date);
    const d = new Date(parse);
    let append = '';
    if (hoursPrefix) {
      append = `${d.getHours()}h${d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes()}`;
    }
    if (year) {
      append += ` ${d.getFullYear()}`;
    }
    return `${DAYS_FR[d.getDay()]} ${d.getDate()} ${MONTHS_FR[d.getMonth()]} ${hoursPrefix || ''} ${append}`;
  } catch (e) {
    return e.message;
  }
}

export function getDateDiffDays(a, b) {
  const dateA = new Date(Date.parse(a));
  const dateB = new Date(Date.parse(b));
  return Math.round((dateA.getTime() - dateB.getTime()) / (1000 * 60 * 60 * 24));
}
