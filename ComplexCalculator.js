/*
Filename: ComplexCalculator.js

Description: This code implements a complex number calculator with various operations including addition, subtraction, multiplication, division, exponentiation, square root, conjugate, and absolute value. It also includes functions to convert complex numbers to polar form and vice versa.

Author: Your Name
Date: 2022-01-01
*/

class ComplexNumber {
  constructor(real, imaginary) {
    this.real = real || 0;
    this.imaginary = imaginary || 0;
  }

  // Addition of two complex numbers
  add(other) {
    const real = this.real + other.real;
    const imaginary = this.imaginary + other.imaginary;
    return new ComplexNumber(real, imaginary);
  }

  // Subtraction of two complex numbers
  subtract(other) {
    const real = this.real - other.real;
    const imaginary = this.imaginary - other.imaginary;
    return new ComplexNumber(real, imaginary);
  }

  // Multiplication of two complex numbers
  multiply(other) {
    const real = this.real * other.real - this.imaginary * other.imaginary;
    const imaginary = this.real * other.imaginary + this.imaginary * other.real;
    return new ComplexNumber(real, imaginary);
  }

  // Division of two complex numbers
  divide(other) {
    const denominator = other.real * other.real + other.imaginary * other.imaginary;
    const real = (this.real * other.real + this.imaginary * other.imaginary) / denominator;
    const imaginary = (this.imaginary * other.real - this.real * other.imaginary) / denominator;
    return new ComplexNumber(real, imaginary);
  }

  // Absolute value (magnitude) of a complex number
  abs() {
    return Math.sqrt(this.real * this.real + this.imaginary * this.imaginary);
  }

  // Square root of a complex number
  sqrt() {
    const magnitude = Math.sqrt(this.abs());
    const angle = this.argument() / 2;
    const real = magnitude * Math.cos(angle);
    const imaginary = magnitude * Math.sin(angle);
    return new ComplexNumber(real, imaginary);
  }

  // Conjugate of a complex number
  conjugate() {
    return new ComplexNumber(this.real, -this.imaginary);
  }

  // Exponentiation of a complex number
  pow(exponent) {
    const magnitude = this.abs()**exponent;
    const angle = this.argument() * exponent;
    const real = magnitude * Math.cos(angle);
    const imaginary = magnitude * Math.sin(angle);
    return new ComplexNumber(real, imaginary);
  }

  // Convert a complex number to polar form
  toPolar() {
    const magnitude = this.abs();
    const angle = this.argument();
    return { magnitude, angle };
  }

  // Convert a complex number from polar form to rectangular form
  static fromPolar(magnitude, angle) {
    const real = magnitude * Math.cos(angle);
    const imaginary = magnitude * Math.sin(angle);
    return new ComplexNumber(real, imaginary);
  }

  // Calculate the argument (angle) of a complex number in radians
  argument() {
    return Math.atan2(this.imaginary, this.real);
  }

  // Format a complex number for display
  toString() {
    const sign = this.imaginary >= 0 ? "+" : "-";
    return `${this.real} ${sign} ${Math.abs(this.imaginary)}i`;
  }
}

// Example usage
const complex1 = new ComplexNumber(3, 4);
const complex2 = new ComplexNumber(-2, 1);

const sum = complex1.add(complex2);
console.log("Sum:", sum.toString());

const difference = complex1.subtract(complex2);
console.log("Difference:", difference.toString());

const product = complex1.multiply(complex2);
console.log("Product:", product.toString());

const quotient = complex1.divide(complex2);
console.log("Quotient:", quotient.toString());

const absoluteValue = complex1.abs();
console.log("Absolute Value:", absoluteValue);

const squareRoot = complex1.sqrt();
console.log("Square Root:", squareRoot.toString());

const conjugate = complex1.conjugate();
console.log("Conjugate:", conjugate.toString());

const power = complex1.pow(3);
console.log("Power:", power.toString());

const polarForm = complex1.toPolar();
console.log("Polar Form:", polarForm);

const rectangularForm = ComplexNumber.fromPolar(5, Math.PI / 3);
console.log("Rectangular Form:", rectangularForm.toString());
```