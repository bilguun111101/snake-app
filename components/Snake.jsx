import { useState, useEffect } from "react";
import { ACTIONS_TYPE } from "./Action_Type";
import { styles } from "./ContainerStyle";
import useGameLoop from "./GameLoop";
import { Box } from "@mui/material"
import Road from "./Road";
import _ from "lodash";

const row = 20, column = 20;

const Snake = () => {
  // board Section *************************

  const YAxis = new Array(row).fill(0);
  const XAxis = new Array(column).fill(0);

  // ***********---*************

  // some states of snake *****-----+++++
  const [moveX, setMoveX] = useState(1);
  const [moveY, setMoveY] = useState(0);
  const [speed, setSpeed] = useState(100);
  const [snake, setSnake] = useState([[1, 1]]);
  // ************* () *************

  // food position
  const [food, setFood] = useState([[5, 5]])
  // ===================== food position =====================

  // direction Section

  const [direction, setDirection] = useState(ACTIONS_TYPE.right);

  const directionEvent = e => {
    let changeDirection = "", x = 0, y = 0;
    if(e.key === "ArrowUp"){
        changeDirection = ACTIONS_TYPE.top;
        y = -1; x = 0;
    }
    if(e.key === "ArrowLeft"){
        changeDirection = ACTIONS_TYPE.left;
        y = 0; x = -1;
    }
    if(e.key === "ArrowRight"){
        changeDirection = ACTIONS_TYPE.right;
        y = 0; x = 1;
    }
    if(e.key === "ArrowDown"){
        changeDirection = ACTIONS_TYPE.bottom;
        y = 1; x = 0;
    }
    setDirection(changeDirection);
    setMoveX(x);
    setMoveY(y);
  }

  // *************************************** */

  useEffect(() => {
    document.addEventListener("keydown", directionEvent);
    return () => document.removeEventListener("keydown", directionEvent);
  }, [])

  const gameOver = () => {
    setSpeed(null);
  }

  const eatFood = () => {
    setFood([[Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)]])
  }

  const gameLoop = () => {
    if(speed === null) return;
    const snakeCopy = JSON.parse(JSON.stringify(snake));
    const newSnakeHead = [snakeCopy[0][0] + moveX, snakeCopy[0][1] + moveY];
    snakeCopy.unshift(newSnakeHead);
    snakeCopy.pop();

    // penetrate the wall **************************
    if(snakeCopy[0][0] < 0) snakeCopy[0][0] = column - 1;
    else if(snakeCopy[0][0] > column - 1) snakeCopy[0][0] = 0;
    else if(snakeCopy[0][1] < 0) snakeCopy[0][1] = row - 1;
    else if(snakeCopy[0][1] > row - 1) snakeCopy[0][1] = 0;

    // *****************------ penetrate the wall ------*****************
    for(let i = 1; i < snakeCopy.lenght - 1; i++)
        if(snakeCopy[i][0] === snakeCopy[0][0] && snakeCopy[i][1] === snakeCopy[0][1]) gameOver();

    // To eat food **************************
    const ateFood = food[0][0] === snakeCopy[0][0] && food[0][1] === snakeCopy[0][1]
    let foodPosition;
    if(ateFood){
        snakeCopy.push(snake[snake.length - 1]);
        foodPosition = [[Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)]]
    } else foodPosition = food;
    setFood(foodPosition);

    // *****************------ To eat food ------*****************
    setSnake(snakeCopy);
  }

  useGameLoop(gameLoop, speed);

  return (
    <Box sx={styles.boardSection}>
        {_.map(YAxis, (y, yIdx) => {
            return(
                <Box key={yIdx} sx={styles.XSection}>
                    {_.map(XAxis, (x, xIdx) => {
                        const isSnake = _.some(snake, (el, idx) => (el[0] === xIdx && el[1] === yIdx));
                        const isFood = _.some(food, (el, idx) => (el[0] === xIdx && el[1] === yIdx));
                        return (
                            <Road key={xIdx} food={isFood} snake={isSnake} />
                        )
                    })}
                </Box>
            )
        } )}
    </Box>
  )
}

export default Snake