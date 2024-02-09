export function intersect<T>(arrayOne: Array<T>, arrayTwo: Array<T>) {
  var arrayLong = arrayOne;
  var arrayShort = arrayTwo;
  if (arrayTwo.length > arrayOne.length) {
    arrayLong = arrayTwo;
    arrayShort = arrayOne;
  }
  return arrayShort.filter((e) => {
      return arrayLong.indexOf(e) > -1;
  });
}

export function capitalizeFirstLetter(input: string) {
  return input.charAt(0).toUpperCase() + input.slice(1);
}

export function getFirstWord(input: string) {
  return input.split(" ")[0];
}