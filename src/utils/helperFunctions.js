function getRandomNumber() {
    const min = 3.8;
    const max = 4.8;
    const randomNum = Math.random() * (max - min) + min;
    return Math.round(randomNum * 10) / 10;
}

export { getRandomNumber };