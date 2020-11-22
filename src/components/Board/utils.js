export function getAllIndexes(arr, val) {
    var indexes = [], i = -1;
    while ((i = arr.indexOf(val, i+1)) !== -1){
        indexes.push(i);
    }
    return indexes;
}

export function playBot(squares) {
    let opposition = "O"    
    let empptyIndexes = getAllIndexes(squares,null)    
    if(empptyIndexes.indexOf(4) !== -1) {        
        return 4;
    }
    const idxWin = winIfCan(squares,"X")
    if(idxWin!==null) {
        return idxWin
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
        // console.log("Doing the uniq play",uniq)        
        let play = oneWithMostWins(squares,empptyIndexes,"O")        
        return play;
    }
    return nextPlay(squares, "X")
    
}

function pickNonCorner(indexes) {
    const corners = [0,2,7,9];
    console.log("Indexes",indexes);
    if(indexes.length == 1) {
        return indexes[0]
    }
    const nonCorners = indexes.filter(e=>corners.indexOf(e)!=-1) 
    console.log("Non Corners", nonCorners);
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