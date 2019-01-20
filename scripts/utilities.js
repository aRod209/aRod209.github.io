/* ***** Utility functions ***** */

// Returns Euclidean distance
export function distance(x1, y1, x2, y2) {
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

// Returns random int
export function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}