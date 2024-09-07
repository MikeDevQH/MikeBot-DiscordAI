const { Schema, model } = require ('mongoose');

const geminiSchema = new Schema({
  GuildId: { type: String, required: true },
  ChannelId: { type: String, required: true },
});

module.exports = model('Gemini', geminiSchema);
