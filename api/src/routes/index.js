const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require ('axios')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async()=>{
     const request=await axios.get('"https://pokeapi.co/api/v2/pokemon?offset=0&limit=40"');

     const requesUrl= request.data.results.map((poke)=>axios.get(poke.url));

     const subRequest = await axios.all(requesUrl);
     const pokemon =subRequest.map((poke)=>poke.data);
     const info = pokemon.map((poke)=>{
          return{
               id:poke.id,
               name:poke.name,
               height:poke.height,
               weight:poke.weight,
               life:poke.stats[0].base_stats,
               attack: poke.stats[1].base_stats,
               defense: poke.stats[2].base_stats,
               speed: poke.stats[5].base_stats,
               image: poke.sprites.front_default,
               types: poke.types.map((poke)=>poke.type.name)
          }
     }) 

}

module.exports = router;
