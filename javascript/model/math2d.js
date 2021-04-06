export const calcLength = (pos1, pos2) => {
    return Math.sqrt((pos1.x - pos2.x) ** 2 + (pos1.y - pos2.y) ** 2);
}

export const checkCollision = (rect1, rect2) => {
    if ((rect1.x + rect1.width) >= rect2.x && rect1.x <= (rect2.x + rect2.width) && (rect1.y + rect1.height) >= rect2.y && rect1.y <= (rect2.y + rect2.height)) {
        return true;
    }
    return false;
}