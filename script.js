'use strict';

// Default parameters
const bookings = [];
const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  // ES5 way of doing
  // numPassengers = numPassengers || 1;
  // price = price || 199;

  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
createBooking('BGJ345', 2, 800);
createBooking('LH123', 2);
createBooking('LH123', 5);

createBooking('LH123', undefined, 10); // if we want to skip the second parameter

// 130. How Passing Arguments Works: Value vs. Reference

const flight = 'LH234';
const jonas = {
  name: 'Jonas Schmedtmann',
  passport: 2347367346565,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr.' + passenger.name;

  if (passenger.passport === 2347367346565) {
    alert('Check in');
  } else {
    alert('Wrong passport number!');
  }
};

// checkIn(flight, jonas);
// console.log(flight, jonas);

// // Is the same as doing...
// const flightNum = flight;
// const passenger = jonas; // we copied the reference to the object

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 10000000000000);
  console.log(person.passport);
};

newPassport(jonas);
checkIn(flight, jonas);
