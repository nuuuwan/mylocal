export default class MathX {
  static sum(numArr) {
    return numArr.reduce(function(a,b){
      return a + b
    }, 0);
  }

  static randomInt(min, max) {
    return Math.random() * (max - min) + min;
  }
}
