const { GoogleGenerativeAI } = require('@google/generative-ai');
const gemini = require('../models/gemini');
const fs = require('fs');
const path = require('path');
const util = require('util');

const readFileAsync = util.promisify(fs.readFile);
const messageHistory = new Map();

module.exports = client => {
  client.on('messageCreate', async message => {
    if (message.author.bot) return;

    try {
      const data = await gemini.findOne({ GuildId: message.guildId });
      if (!data || message.channel.id !== data.ChannelId) return;

      const API_KEY = process.env.GEMINI_API_KEY;
      const MODEL = 'gemini-pro';

      const ai = new GoogleGenerativeAI(API_KEY);
      const model = ai.getGenerativeModel({ model: MODEL });

      const botMentioned = message.mentions.has(client.user);
      const isReplyToBot = message.reference && (await message.fetchReference()).author.id === client.user.id;

      if (!botMentioned && !isReplyToBot) return;

      message.channel.sendTyping();

      const personalityFilePath = path.join(__dirname, '../personality.txt');
      const personalityContent = await readFileAsync(personalityFilePath, 'utf-8');
      const personalityLines = personalityContent.trim();

      let channelHistory = messageHistory.get(message.channel.id) || [];

      channelHistory.push({
        author: message.author.id,
        content: message.cleanContent,
      });

      channelHistory = channelHistory.slice(-10); 
      messageHistory.set(message.channel.id, channelHistory);

      const contextMessages = channelHistory
        .map(msg => `<@${msg.author}>: ${msg.content}`)
        .join('\n');

      let prompt = `
        ${personalityLines}
        
        Contexto de mensajes anteriores:
        ${contextMessages}
        
        Instrucciones:
        1. Saluda al usuario: <@${message.author.id}>
        2. Responde manteniendo la personalidad descrita.
        3. Responde con menos de 2000 caracteres.
        4. Usa emojis/kaomojis si es apropiado.
        
        Mensaje del usuario: ${message.cleanContent.replace(/<@!?\d+>/g, "").trim()}
        
        Respuesta:`;

      let generatedText = '';
      let attempts = 0;
      const maxAttempts = 3;

      while (attempts < maxAttempts) {
        try {
          const { response } = await model.generateContent(prompt);
          generatedText = response.text().trim();
          break;
        } catch (error) {
          if (error.message.includes('SAFETY')) {
            attempts++;
            prompt += '\n\nPor favor, genera una respuesta más apropiada y segura.';
          } else {
            throw error;
          }
        }
      }

      if (generatedText.length === 0) {
        generatedText = 'Lo siento, no pude generar una respuesta apropiada en este momento. ¿Puedes intentar reformular tu pregunta?';
      }

      const finalResponse = generatedText.length > 2000
        ? generatedText.substring(0, 1997) + '...'
        : generatedText;

      await message.reply({
        content: finalResponse,
        allowedMentions: { parse: ['everyone', 'roles', 'users'] },
      });
    } catch (error) {
      console.error('Error al procesar el mensaje:', error);
      await message.reply('Lo siento, algo salió mal al procesar tu mensaje. Inténtalo de nuevo más tarde.');
    }
  });
};
