/*jshint esversion: 6 */

import { config } from "https://deno.land/x/dotenv/mod.ts"
import "https://deno.land/x/dotenv/load.ts";

import { Application, Router } from "https://deno.land/x/oak/mod.ts"
import {getPublicacoes, createPublicacao, getSinglePublicacao, updatePublicacao, deletePublicacao} from './routes.ts'

const env = config()
console.log(env)

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

const port = Deno.env.get('PORT') || 8000

//app.listen({port: port})
//console.log('O Servidor está ativo e rodando na porta : ${port}' )

console.log(`O Servidor está ativo e rodando na porta : ${port}`)
await app.listen({port: +port});