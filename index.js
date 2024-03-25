import axios from "axios";
import chalk from "chalk";

const arr = [];
axios
  .get("https://randomuser.me/api/")
  .then((data) => {
    const name = data.data.name.first;
    arr.push(name);
    console.log(name);
  })
  .catch((error) =>
    console.log(
      chalk.red.bgYellow(
        "Uh oh, something has gone wrong. Please tweet us @randomapi about the issue. Thank you."
      )
    )
  );

//uuidv4().slice(0,6)
