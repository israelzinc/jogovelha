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

function winIfCan(squares, player) {
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

function playMidIfCan(squares) {    
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

function playCorner(squares) {
    const corners = getCorners();    
    const candidates = corners.filter(e=>squares[e]==null)        
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

function shouldPlayCorner(squares) {
    if(!isCornerAvaliable(squares)) {
        return false;
    }    
    
    const corners = getCorners();
    const crosses = getCrosses();    
    const xCorners = corners.map(e=>squares[e]).filter(e=>e==="O");
    const xCrosses = crosses.map(e=>squares[e]).filter(e=>e==="O");            
    if(xCrosses.length >= xCorners.length) {
        return true;
    } else {
        return false;
    }    
}

function blockUserIfNecessary(squares, opposition) {    
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

export function playBot2(squares) {
    let opposition = "O"        

    let returnIdx = playMidIfCan(squares);
    
    if (returnIdx !== null) { return returnIdx; }

    returnIdx = winIfCan(squares,"X")
    if(returnIdx !== null) { return returnIdx }

    returnIdx = blockUserIfNecessary(squares,opposition)
    if (returnIdx !== null) { return returnIdx}

    if (shouldPlayCorner(squares)) {        
        return playCorner(squares);
    } else {        
        return playCross(squares);
    }    
}