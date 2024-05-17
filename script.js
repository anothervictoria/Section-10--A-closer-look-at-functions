'use strict';

// // Default parameters
// const bookings = [];
// const createBooking = function (
//   flightNum,
//   numPassengers = 1,
//   price = 199 * numPassengers
// ) {
//   // ES5 way of doing
//   // numPassengers = numPassengers || 1;
//   // price = price || 199;

//   const booking = {
//     flightNum,
//     numPassengers,
//     price,
//   };
//   console.log(booking);
//   bookings.push(booking);
// };

// createBooking('LH123');
// createBooking('BGJ345', 2, 800);
// createBooking('LH123', 2);
// createBooking('LH123', 5);

// createBooking('LH123', undefined, 10); // if we want to skip the second parameter

// // 130. How Passing Arguments Works: Value vs. Reference

// const flight = 'LH234';
// const jonas = {
//   name: 'Jonas Schmedtmann',
//   passport: 2347367346565,
// };

// const checkIn = function (flightNum, passenger) {
//   flightNum = 'LH999';
//   passenger.name = 'Mr.' + passenger.name;

//   if (passenger.passport === 2347367346565) {
//     alert('Check in');
//   } else {
//     alert('Wrong passport number!');
//   }
// };

// // checkIn(flight, jonas);
// // console.log(flight, jonas);

// // // Is the same as doing...
// // const flightNum = flight;
// // const passenger = jonas; // we copied the reference to the object

// const newPassport = function (person) {
//   person.passport = Math.trunc(Math.random() * 10000000000000);
//   console.log(person.passport);
// };

// newPassport(jonas);
// checkIn(flight, jonas);

// 132. Functions Accepting Callback Functions

const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

// Higher-order function
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformer string: ${fn(str)}`);

  console.log(`Transformed by: ${fn.name}`);
};

transformer('JavaScript is the best', upperFirstWord);

// JS uses callbacks all the time
const high5 = function () {
  console.log('👋');
};

document.body.addEventListener('click', high5);

['Jonas', 'Martha', 'Adam'].forEach(high5);

//

// const greet = function (greeting) {
//   return function (names) {
//     console.log(`${greeting} ${names}`);
//   };
// };

const greet = greeting => names => console.log(`${greeting} ${names}`);

const greeterHey = greet(`Hey`);
greeterHey('Jonas');
greeterHey('Steven');

greet('Hello')('Victoria');

// 134. The call and apply Methods

const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  // book: function() {}
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(239, 'Victoria Panidi');
lufthansa.book(645, 'John Smith');

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book;
// book(23, 'Sarah Williams'); // does NOT work

book.call(eurowings, 23, 'Sarah Williams');
console.log(eurowings);

book.call(lufthansa, 456, 'Mary Cooper');
console.log(lufthansa);

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 567, 'Ana Maria Smith');

// Apply method
const flightData = [567, 'George Black'];
book.apply(swiss, flightData);
console.log(swiss);

book.call(swiss, ...flightData);

//  The bind Method
// book.call(eurowings, 23, 'Sarah Williams');
const bookEw = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);
bookEw(23, 'Steven Williams');
bookLH(45, 'Ekaterina Panidi');

const bookEW23 = book.bind(eurowings, 23);
bookEW23('Bonya');

// With Event Listeners

lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};

document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// Partial application

const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23);
// addVat = value => value + value * 0.23;

console.log(addVAT(100));
console.log(addVAT(200));

const addTaxrate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};

const addVAT2 = addTaxrate(0.23);
console.log(addVAT2(100));
console.log(addVAT2(200));
