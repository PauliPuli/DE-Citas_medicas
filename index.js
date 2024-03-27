import express from "express";
import axios from "axios";
import chalk from "chalk";
import _ from "lodash";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

//constantes globales
//servidor
const app = express();
const PORT = 3000;
//array de pacientes
const pacientes = [];
const apiUrl = "https://randomuser.me/api/";
const fecha = "MMMM Do YYYY: hh:mm:ss a";

//Construcción servidor
app.listen(3000, () => {
  console.log(
    `El servidor está inicializando en el puerto http://localhost:${PORT}`
  );
});
app.get('/', (req, res)=>{
  res.send('Bienvenido al servidor de  clínica DENDE Spa 🩺')
});

//Ruta usuario con f(x) asíncrona de api
app.get('/usuarios', async (req,res)=>{
  try {
    const userApi = await axios.get(apiUrl);
    const datApi= userApi.data.results[0];
    // console.log(data)//---> API llamada correctamente ✅
    const id= uuidv4().slice(0, 6);
    const tiempo= moment().format(fecha);
    pacientes.push(datApi.name.first, datApi.name.last, datApi.gender, id, tiempo)
    // console.log(datApi.gender) //Llamada a objetos de APIs funcionando correctamente ✅
    // console.log(pacientes) --> Pusheado en array funcionando ✅

    const userXGender=

  } catch (error){
    console.log(chalk.red.bgYelow('Lo sentimos, su petición no ha sido ejecutada\n'+ error));
  }
});

//Ruta usuario con llamado a APIs
// app.get("/usuarios", async (req, res) => {
//   try {
//     const userApi = await axios.get(apiUrl);
//     const data = userApi.data.result[0];
//     const genero= userApi.data.result[0].gender;

//     const id = uuidv4().slice(0, 6);
//     const tiempo= moment().format(fecha);
//     const usuariosXGenero = _.partition(usuarios, (user) => {
//       return user.genero === "female";
//     });
//     console.log(usuariosXGenero[0])
// const template=`
// <h1>Agendamiento - Clínica DENDE Spa 🩺</h1>
// <h5>Mujeres</h5>
// <ol>
// ${usuariosXGenero[0].map((user)=>{
// return `<li>Nombre: ${user.data.name.first} - Apellido: ${user.data.name.last} - ID: ${user.id}- Fecha agendamiento: ${user.tiempo}`
// })}
// </ol>
// `

// res.send(template);
//   } catch (error) {
//     res.send('Lo sentimos, su petición no ha podido ser resuelta')
//     console.log(
//       chalk.red.bgYellow(
//         "Uh oh, something has gone wrong. Please tweet us @randomapi about the issue. Thank you." +
//           error
//       )
//     );
//   }
// });

// //
