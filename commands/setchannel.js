const { PermissionsBitField, SlashCommandBuilder, ChannelType } = require('discord.js');
const gemini = require('../models/gemini');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setchannel-ia')
    .setDescription('Permite configurar canales para que la IA responda.')
    .addChannelOption(option =>
      option
        .setName('canal')
        .setDescription('Canal del Chat IA')
        .setRequired(true)
        .addChannelTypes(ChannelType.GuildText)
    ),
  async execute(interaction) {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      return interaction.reply({ content: 'Solo los administradores pueden usar este comando.', ephemeral: true });
    }

    const channel = interaction.options.getChannel('canal');

    try {
      let data = await gemini.findOne({ GuildId: interaction.guild.id });
      if (!data) {
        data = await gemini.create({
          GuildId: interaction.guild.id,
          ChannelId: channel.id,
        });
        return interaction.reply({ content: `Canal ${channel} añadido como permitido para la IA.` });
      } else {
        data.ChannelId = channel.id;
        await data.save();
        return interaction.reply({ content: `Canal ${channel} actualizado como permitido para la IA.` });
      }
    } catch (error) {
      console.error(error);
      return interaction.reply({ content: 'Ocurrió un error al configurar el canal.', ephemeral: true });
    }
  },
};
