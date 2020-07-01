/*jshint esversion: 6 */

import { Application, Router } from "https://deno.land/x/oak/mod.ts"
import {getPublicacoes, createPublicacao, getSinglePublicacao, updatePublicacao, deletePublicacao} from './routes.ts'

import { config } from "https://deno.land/x/dotenv/mod.ts";

const env = config()

console.log(env.DB_HOST_URL)
console.log(env.DB_NAME)
console.log(env.PORT)

const router = new Router()

router
  .get('/', (ctx) => {
    ctx.response.body = 'Bem vindo a API do pesquisajus';
  })
  .get('/api/:id', getSinglePublicacao)
  //.get('/api', getPublicacoes)
  //.post('/api', createPublicacao)
  //.put('/api/:id', updatePublicacao)
  //.delete('/api/:id', deletePublicacao)
  
const app = new Application()
app.use(router.routes())
app.use(router.allowedMethods())

const port = env.PORT || 8000

//app.listen({port: port})
//console.log('O Servidor está ativo e rodando na porta : ${port}' )

console.log(`O Servidor está ativo e rodando na porta : ${port}`)
await app.listen({port: +port});