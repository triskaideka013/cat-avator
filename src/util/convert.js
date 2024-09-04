
/**
 * 
 * @param {number} deg 
 * @returns
 */
function degreesToRadians(deg) {
  return deg * (Math.PI/180)
}

/**
 * 
 * @param {number} rad 
 * @param {boolean} clockwise 
 * @returns 
 */
function radiansToVector2(rad, clockwise=false) {
    
    if (!!clockwise) {
        // clockwise [0, -1] going to [1, 0]
        return new Vector2(Math.sin(rad), -Math.cos(rad)); 
    }

    // conter-clockwise [1, 0] going to [0, 1]
    return new Vector2(Math.cos(rad), Math.sin(rad));
}

/**
 * 
 * @param {number} deg 
 * @returns 
 */
function degreesToVector2(deg) {
    return radiansToVector2( degreesToRadians(deg) ); 
}