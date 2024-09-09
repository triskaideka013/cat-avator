// uncomment this line to reference LittleJS types -->
// import { Vector2 } from "littlejsengine"

/**
 * 
 * @param {number} deg 
 * @returns {number}
 */
function degreesToRadians(deg) {
  return deg * (Math.PI/180)
}

/**
 * 
 * @param {number} rad 
 * @param {boolean} clockwise 
 * @returns {Vector2}
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
 * @returns {Vector2}
 */
function degreesToVector2(deg) {
    return radiansToVector2( degreesToRadians(deg) ); 
}

/**
 * 
 * @param {Vector2} xPos 
 * @param {Vector2} yPos 
 * @param {boolean} degress
 * 
 * @returns {number}
 */
function pointsToAngle(p1, p2, degrees=true) {
    
    // angle in radians
    let rad = Math.atan2(p2.y - p1.y, p2.x - p1.x);

    if (!degrees) {
        return rad;
    } else {
        // angle in degrees
        return rad * 180 / Math.PI;
    }
}