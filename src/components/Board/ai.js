import {getAllIndexes} from "./utils"

function getWinningLines(){
    return  [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
}

function winIfCan(squares, player="X") {
    const lines = getWinningLines();
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];        
        let count = 0;        
        if(squares[a] === player) {
            count++;
        }
        if(squares[b] === player) {
            count++;
        }
        if(squares[c] === player) {
            count++;
        }
        
        if (count > 1) {            
            if(squares[a] === null) {
                return a;
            }
            if(squares[b] === null) {
                return b;
            }
            if(squares[c] === null) {
                return c;
            }
        }
    }
    return null
}

function getCorners() {
    return [0, 2, 6, 8]
}

function getCrosses() {
    return [1,3,5,7]
}

function makeInitialPlayIfNeeded(squares) {    
    let empptyIndexes = getAllIndexes(squares,null)    
    if(empptyIndexes.indexOf(4) !== -1) {        
        return 4;
    }    
    if(empptyIndexes.length > 7 ){
        let corners = getCorners();
        return corners[0];
    }
    return null
}

function getPlayerCrosses(squares,player="O") {
    let crosses = getCrosses();
    let b =  crosses.map(e=>squares[e])    
    b = getAllIndexes(b,player)
    return b
}

function getCornerNearCross(crosses) {
    const corners = getCorners();   
    let dt = [];
    crosses.forEach(c => {
        if(c == 1) {
          dt.push(0)
          dt.push(2)
        } else if (c == 3) {
            dt.push(0)
            dt.push(6)
        } else if (c == 5) {
            dt.push(2)
            dt.push(8)
        } else if (c == 3) {
            dt.push(6)
            dt.push(8)
        }
    })
    return [...new Set(dt)];    
}

function playCorner(squares, opposition) {    
    const oppositionCrossess = getPlayerCrosses(squares,opposition)    
    let candidates = getCornerNearCross(oppositionCrossess);    
    candidates = candidates.filter(e=>squares[e]==null)            
    return candidates[0];
}

function playCross(squares) {
    const crosses = getCrosses();
    const candidates = crosses.filter(e=>squares[e]==null).map(e=>e);    
    return candidates[0];
}

function isCornerAvaliable(squares) {
    const corners = getCorners();
    if(corners.filter(e=>squares[e]!==null).length > 3) {
        return false;
    }
    return true;
}

function hasOppositionPlayedMoreCorner(squares, opposition="O") {
    const corners = getCorners();
    const crosses = getCrosses();    
    const xCorners = corners.map(e=>squares[e]).filter(e=>e===opposition);
    const xCrosses = crosses.map(e=>squares[e]).filter(e=>e===opposition);            
    return (xCrosses.length >= xCorners.length)
}

function shouldPlayCorner(squares, opposition) {
    if(!isCornerAvaliable(squares)) {
        return false;
    }    
        
    if (hasOppositionPlayedMoreCorner(squares, opposition)) {
        return true;
    } else {
        return false;
    }    
}

function blockUserIfNecessary(squares, opposition="O") {    
    const lines = getWinningLines();
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];        
        let count = 0;       
        if(squares[a] === opposition) {
            count++;
        }
        if(squares[b] === opposition) {
            count++;
        }
        if(squares[c] === opposition) {
            count++;
        }
                
        if (count > 1) {            
            if(squares[a] === null) {
                return a;                
            }
            if(squares[b] === null) {
                return b;                
            }
            if(squares[c] === null) {
                return c;                
            }
        }
    }    
    return null;
}

export function playBot2(squares, player="X") {    
    let opposition = player=="X"?"O":"X";
    // let player = "X";   

    let returnIdx = makeInitialPlayIfNeeded(squares);    
    if (returnIdx !== null) { return returnIdx; }

    returnIdx = winIfCan(squares,player)
    if(returnIdx !== null) { return returnIdx }

    returnIdx = blockUserIfNecessary(squares,opposition)
    if (returnIdx !== null) { return returnIdx}

    if (shouldPlayCorner(squares, opposition)) {        
        return playCorner(squares,opposition);
    } else {        
        return playCross(squares);
    }    
}