import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { parse } from 'query-string';
import './ChessBoard.css';

const useKeyPress = function(targetKey) {
    const [keyPressed, setKeyPressed] = useState(false);
  
    function downHandler({ key }) {
        if (key === targetKey) {
            setKeyPressed(true);
        }
    }
  
    const upHandler = ({ key }) => {
        if (key === targetKey) {
            setKeyPressed(false);
        }
    };
  
    useEffect(() => {
        window.addEventListener("keydown", downHandler);
        window.addEventListener("keyup", upHandler);

        return () => {
            window.removeEventListener("keydown", downHandler);
            window.removeEventListener("keyup", upHandler);
        };
    });
  
    return keyPressed;
};
 
export function ChessBoard() {
    const location = useLocation();
    const {size, steps:numSteps} = parse(location.search);
    const [activeCell, setActiveCell] = useState([
        Math.trunc(Math.random()*size) + 1,
        Math.trunc(Math.random()*size) + 1
    ]);
    const [activeCellHistory, setActiveCellHistory] = useState([activeCell]);
    const [stepsLeft, setStepsLeft] = useState(numSteps);
    const downPress = useKeyPress("ArrowDown");
    const upPress = useKeyPress("ArrowUp");
    const leftPress = useKeyPress("ArrowLeft");
    const rightPress = useKeyPress("ArrowRight");
    const navigate = useNavigate();

    useEffect(() => {
        if (downPress) {
            setActiveCell(prevState =>
                prevState[0] <  size ? [prevState[0]+1, prevState[1]] : prevState
          );
        }
        if (upPress) {
            setActiveCell(prevState =>
                prevState[0] >  1 ? [prevState[0]-1, prevState[1]] : prevState
          );
        }
        if (rightPress) {
            setActiveCell(prevState =>
                prevState[1] <  size ? [prevState[0], prevState[1]+1] : prevState
          );
        }
        if (leftPress) {
            setActiveCell(prevState =>
                prevState[1] >  1 ? [prevState[0], prevState[1]-1] : prevState
          );
        }
        if (downPress || upPress || rightPress || leftPress) {
            setStepsLeft(prevState => prevState-1);
        }
    }, [downPress, leftPress, rightPress, size, upPress]);

    useEffect(() => {
        let historyLength = activeCellHistory.length;
        console.log('activeCell')
        console.log(activeCell);
        if ((activeCell[0] !== activeCellHistory[historyLength-1][0] || 
            activeCell[1] !== activeCellHistory[historyLength-1][1]) && 
            stepsLeft >= 0) {
                setActiveCellHistory(prevState => [...prevState, activeCell]);
                console.log(activeCellHistory);
        }
    }, [activeCell])

    const generateChessBoard = () => {
        let chessTable = [];
        let colorRow = 'black';
        let colorColumn = 'black';

        for (let i=1; i<=size; i++) {
            let row = []
            for (let j=1; j<= size; j++) {
                if (activeCell[0] === i && activeCell[1] === j){
                    // cell id = a,b where: 
                    // a = row number (starting from the top)
                    // b = column number (starting from the left)
                    row.push(<div id={`${i},${j}`} className='active-cell'></div>)
                } else {
                    row.push(<div id={`${i},${j}`} className={`${colorRow}-cell`}></div>)
                }
                
                if (colorRow === 'black') {
                    colorRow = 'white';
                } else {
                    colorRow = 'black';
                }
            }
            chessTable.push(row);
            if (colorColumn === 'black') {
                colorRow = 'white';
                colorColumn = 'white';
            } else {
                colorRow = 'black';
                colorColumn = 'black';
            }
        }
        return chessTable;
    }

    const boardWidth = { width: 100 * size }

    const printHistory = () => {
        let result = '[';
        for (let elem of activeCellHistory) {
            result = result + `{${elem[0]},${elem[1]}}`;
        }
        result = result + ']';
        return result;
    }

    return(
        <>
            <div className={stepsLeft > 0 ? '' : 'display-none'}>
                <h1>Chessboard size = {size} | steps left: {stepsLeft}/{numSteps}</h1>
                    <div className='chess-board' style={boardWidth}>
                        {generateChessBoard()}
                </div>
            </div>
            <div className={stepsLeft > 0 ? 'display-none' : ''}>
                <h1>Thank you! Your steps:</h1>
                <p>{printHistory()}</p>
                <button className='initial-form-button' onClick={(e) => {
                    navigate('/')
                    e.preventDefault();
                }}>START OVER</button>
            </div>
            
            
        </>
    )
}