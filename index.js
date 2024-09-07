require('dotenv').config();
const { Client, GatewayIntentBits, Collection, REST, Routes } = require('discord.js');
const { connectDB } = require('./utils/db');
const fs = require('fs');
const path = require('path');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

client.commands = new Collection();
const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
  commands.push(command.data.toJSON());  // Registra los comandos para la API
}

client.once('ready', async () => {
  console.log('¡El bot está listo!');
  connectDB();

  // Registrar comandos
  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

  try {
    console.log('Empezando a registrar los comandos slash...');
    
    // Para comandos globales:
    await rest.put(Routes.applicationCommands(client.user.id), { body: commands });

    // Si prefieres registrar comandos solo en un servidor específico, usa este código:
    // const guildId = 'TU_GUILD_ID';  // Reemplaza con tu ID de servidor
    // await rest.put(Routes.applicationGuildCommands(client.user.id, guildId), { body: commands });

    console.log('Comandos registrados exitosamente.');
  } catch (error) {
    console.error(error);
  }
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'Hubo un error al ejecutar el comando.', ephemeral: true });
  }
});

require('./utils/ai')(client);

client.login(process.env.DISCORD_TOKEN);
