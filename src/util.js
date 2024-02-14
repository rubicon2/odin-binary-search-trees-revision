export function getRangedRandom(min, max) {
  const range = max - min;
  return min + range * Math.random();
}

export function getRangedRandomInt(min, max) {
  // Due to math.floor, this is not max inclusive
  return Math.floor(getRangedRandom(min, max));
}

export function getRangedRandomIntArray(min, max, count) {
  const randomNumbers = [];
  for (let i = 0; i < count; i += 1) {
    randomNumbers.push(getRangedRandomInt(min, max));
  }
  return randomNumbers;
}
