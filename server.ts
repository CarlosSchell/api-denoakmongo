//
import { Application, Router } from "https://deno.land/x/oak/mod.ts"
import {getPublicacoes, createPublicacao, getSinglePublicacao, updatePublicacao, deletePublicacao} from './routes.ts'

const router = new Router()

router
  .get('/', (ctx) => {
    ctx.response.body = 'Bem vindo a API do pesquisajus';
  })
  .get('/api', getPublicacoes)
  .get('/api/:id', getSinglePublicacao)
  .post('/api', createPublicacao)
  .put('/api/:id', updatePublicacao)
  .delete('/api/:id', deletePublicacao)
  ;

const app = new Application()
app.use(router.routes())
app.use(router.allowedMethods())

app.listen({port: 8000})
console.log('O Servidor está ativo e rodando na porta : ${port}' )