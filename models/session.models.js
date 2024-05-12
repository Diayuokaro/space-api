import { Schema, model } from 'mongoose'

const modelName = 'session'

const modelSchema = new Schema(
  {
    accessToken: {
      type: String,
      required: true,
      unique: true,
    },
    refreshToken: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    ip: {
      type: String,
      required: true,
    },
    timezone: {
      type: String,
    },
    language: {
      type: String,
    },
    geolocation: {
      type: String,
    },
    clientType: {
      type: String,
      map: [
        'desktop',
        'mobile',
        'console',
        'car',
        'tv',
        'wear',
        'spatial',
        'web',
        'unknown',
      ],
      default: 'unknown',
    },
    deviceName: {
      type: String,
    },
    deviceVendor: {
      type: String,
      map: [
        'apple',
        'google',
        'microsoft',
        'samsung',
        'xiaomi',
        'unknown',
      ],
      default: 'unknown',
    },
    operatingSystem: {
      type: String,
      map: [
        'macos',
        'windows',
        'linux',
        'ios',
        'android',
        'visionos',
        'unknown',
      ],
      default: 'unknown',
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

// modelSchema.statics.getByQuery = async function(query) {
//   const backends = await this.model(modelName).find(query)

//   return backends
// }

modelSchema.statics.getById = async function(_id) {
  const session = await this.model(modelName).findById(_id)

  return session
}

modelSchema.statics.updateById = async function(_id, query) {
  const session = await this.model(modelName).findByIdAndUpdate(_id, query)

  return session
}

modelSchema.statics.deleteById = async function(_id) {
  const session = await this.model(modelName).findByIdAndDelete(_id)

  return session
}

export default model(modelName, modelSchema)
