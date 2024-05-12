import { Schema, model } from 'mongoose'

const modelName = 'email'

const modelSchema = new Schema(
  {},
  {
    timestamps: true,
  }
)

// modelSchema.statics.create = async function(query) {
//   const backend = await this.model(modelName)(query)

//   return await backend.save()
// }

// modelSchema.statics.getByQuery = async function(query) {
//   const backends = await this.model(modelName).find(query)

//   return backends
// }

export default model(modelName, modelSchema)
