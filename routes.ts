import { RouterContext } from "https://deno.land/x/oak/mod.ts"
import db from "./mongodb.ts"

const publicacoesCollection = db.collection("publicacoes")

const getPublicacoes = async (ctx: RouterContext) => {
  // Get Publicacoes from MongoDB
  const publicacoes = await publicacoesCollection.find()

  // Return output
  ctx.response.body = publicacoes;
}

const getSinglePublicacao = async (ctx: RouterContext) => {
  const id = ctx.params.id;
  // Get single publicacao
  const publicacao = await publicacoesCollection.findOne({ _id: { $oid: id } })

  // Return output
  ctx.response.body = publicacao;
}

const createPublicacao = async (ctx: RouterContext) => {
  // Get processo e decisao from request
  const { value: {processo, decisao} } = await ctx.request.body()
  // Create Note object
  const publicacao: any = {
    processo,
    decisao,
  }
  // Insert Note in MongoDB
  const id = await publicacoesCollection.insertOne(publicacao);

  publicacao._id = id
  // Return with success response
  ctx.response.status = 201
  ctx.response.body = publicacao
};

const updatePublicacao = async (ctx: RouterContext) => {
  const id = ctx.params.id;
  // Get processo e decisao from request
  const { value: {processo, decisao} } = await ctx.request.body()

  const { modifiedCount } = await publicacoesCollection.updateOne(
    { _id: { $oid: id } },
    {
      $set: {
        processo,
        decisao,
      },
    },
  );

  if (!modifiedCount) {
    ctx.response.status = 404;
    ctx.response.body = { message: "A Publicacao não foi encontrada." }
    return;
  }

  ctx.response.body = await publicacoesCollection.findOne({ _id: { $oid: id } })
};

const deletePublicacao = async (ctx: RouterContext) => {
  const id = ctx.params.id
  const count = await publicacoesCollection.deleteOne({ _id: { $oid: id } })
  if (!count) {
    ctx.response.status = 404
    ctx.response.body = { message: "A Publicacao não foi encontrada." }
    return
  }

  ctx.response.status = 204
}

export { getPublicacoes, createPublicacao, getSinglePublicacao, updatePublicacao, deletePublicacao }