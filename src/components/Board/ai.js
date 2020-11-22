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


export function playBot(squares) {
    let opposition = "O"    
    let empptyIndexes = getAllIndexes(squares,null)    

    let returnIdx = playMidIfCan(squares);
    if (returnIdx) { return returnIdx; }

    returnIdx = winIfCan(squares,"X")
    if(returnIdx) { return returnIdx }

    const lines = getWinningLines();
    let options = [];
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
                // options.push(a);
            }
            if(squares[b] === null) {
                return b;
                // options.push(b);
            }
            if(squares[c] === null) {
                return c;
                // options.push(c);
            }
        }
    }
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
        if (count > 0) {            
            if(squares[a] === null) {
                // return a;
                options.push(a);
            }
            if(squares[b] === null) {
                // return b;
                options.push(b);
            }
            if(squares[c] === null) {
                // return c;
                options.push(c);
            }
        }
    }
    
    let uniq = [...new Set(options)];    
    if(uniq.length > 0) {                
        let play = oneWithMostWins(squares,empptyIndexes,"O")        
        return play;
    }
    return nextPlay(squares, "X")
    
}

function pickNonCorner(indexes) {
    const corners = [0,2,7,9];    
    if(indexes.length == 1) {
        return indexes[0]
    }
    const nonCorners = indexes.filter(e=>corners.indexOf(e)!=-1) 
    
    if(nonCorners.length > 0) {
        return nonCorners[0]
    } else {
        return indexes[0]
    }
}

function oneWithMostWins(squares, emptySquares, player){
    let candidates = Array(emptySquares.length).fill(0);
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
    for(let k=0;k<emptySquares.length;k++) {
        let cand = emptySquares[k];
        const copySquares = [...squares];
        copySquares[cand] = player;
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];        
            let count = 0;            
            if(copySquares[a] === player) {
                count++;
            }
            if(copySquares[b] === player) {
                count++;
            }
            if(copySquares[c] === player) {
                count++;
            }
            if (count > 1) {            
                candidates[k]+=1
            }
        }        
    }
    
    const maximus = Math.max(...candidates);    

    let maximusIndexes = candidates.map((e,i)=>e==maximus?i:'').filter(String);
    
    let finalIdx = pickNonCorner(maximusIndexes.map(idx=>emptySquares[idx]));
    return emptySquares[finalIdx]
}

function winIfCan(squares, player) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
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

function nextPlay(squares, player) {    
    let allNull = getAllIndexes(squares,null)
    if (allNull.length === 8) {
        return Math.floor(Math.random() * 8)
    }
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      
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
        if (count > 0) {            
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
}