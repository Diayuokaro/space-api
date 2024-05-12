import { Schema, model } from 'mongoose'

const modelName = 'user'

const modelSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

// modelSchema.statics.create = async function(query) {
//   const backend = await this.model(modelName)(query)

//   return await backend.save()
// }

modelSchema.statics.getByUsername = async function(username) {
  const user = await this.model(modelName).findOne({ username })

  return user
}

export default model(modelName, modelSchema)
