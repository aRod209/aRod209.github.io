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

// Return number of vertices to appear on screen based on width
// (which can be influenced by orientation) of the device
export function getNumVertices() {
    if (window.innerWidth <= 360 || window.innerHeight <= 360) { return 10; }
    else if (window.innerWidth <= 415 || window.innerHeight <= 415) { return 15; }
    else if (window.innerWidth <= 800 || window.innerHeight <= 800) { return 30; }
    return 41;
}