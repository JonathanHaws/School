const distanceBetween = (x1, y1, x2, y2) => {
    let dx = x1 - x2
    let dy = y1 - y2
    return Math.sqrt(dx * dx + dy * dy)
}
module.exports = distanceBetween;
