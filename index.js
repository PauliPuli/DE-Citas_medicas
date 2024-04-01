import express from "express";
import axios from "axios";
import chalk from "chalk";
import _ from "lodash";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

//constantes globales
//servidor
const app = express();
const PORT = 3001;
//array de pacientes
const pacientes = [];
const apiUrl = "https://randomuser.me/api/";
const fecha = "MMMM Do YYYY: hh:mm:ss a";

//Construcción servidor
app.listen(3001, () => {
  console.log(
    `El servidor está inicializando en el puerto http://localhost:${PORT}`
  );
});
app.get("/", (req, res) => {
  res.send("Bienvenido al servidor de  clínica DENDE Spa 🩺");
});

//Ruta usuario con f(x) asíncrona de api
app.get("/usuarios", async (req, res) => {
  try {
    const userApi = await axios.get(apiUrl);
    const datApi = userApi.data.results[0];
    // console.log(data)//---> API llamada correctamente ✅
    const nombre = datApi.name.first;
    const apellido = datApi.name.last;
    const genero = datApi.gender;
    const id = uuidv4().slice(0, 6);
    const tiempo = moment().format(fecha);
    pacientes.push({ nombre, apellido, genero, id, tiempo });
    // console.log(datApi.gender) //Llamada a objetos de APIs funcionando correctamente ✅
    // console.log(pacientes); --> Pusheado en array funcionando ✅

    const userXGender = _.partition(pacientes, (user) => {
      return user.genero == "female";
    });

    const template = `
   <h2>Agendamiento - Clínica DENDE Spa 🩺</h2>
   <h5>Mujeres</h5>
   <ol>
   ${userXGender[0].map((user) => {
     return `<li>Nombre: ${user.nombre} - Apellido: ${user.apellido} - Id: ${user.id} - Hora: ${user.tiempo}</li>`;
   })}
   </ol>
   <h5>Hombres</h5>
   <ol>
   ${userXGender[1].map((user) => {
     return `<li>Nombre: ${user.nombre} - Apellido: ${user.apellido} - Id: ${user.id} - Hora: ${user.tiempo}</li>`;
   })}
   </ol>
   `;
    console.log(
      chalk.blue.bgWhite(
        `Nombre: ${nombre} - Apellido: ${apellido} - Género: ${genero} - Id: ${id} - Hora: ${tiempo}`
      )
    );
    res.send(template);
  } catch (error) {
    console.log(chalk.red.bgYellow(`Lo sentimos, su petición no ha sido ejecutada <hr> ${error}`));
  }
});


