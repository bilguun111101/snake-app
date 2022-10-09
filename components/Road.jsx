import { Box } from "@mui/material"

const styles = {
    road: theme => ({
        width: "25px",
        height: "25px",
        backgroundColor: "#FFF",
        border: "0.4px solid silver",
    }),
    snake: theme => ({
        width: "25px",
        height: "25px",
        backgroundColor: "#FF33F0",
        border: "0.4px solid #FF33F0"
        // border: "0.4px solid silver",
    }),
    food: theme => ({
        width: "25px",
        height: "25px",
        backgroundColor: "#FF3333",
        // border: "0.4px solid silver",
    })
}

const Road = props => {
  return (
    <Box sx={props.food ? styles.food : props.snake ? styles.snake : styles.road} />
  )
}

export default Road