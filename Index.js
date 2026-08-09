const { Client, GatewayIntentBits, Partials, EmbedBuilder, REST, Routes } = require('discord.js');

// Bot setup
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ],
  partials: [Partials.Channel]
});

// Your bot token here - REPLACE THIS!
const TOKEN = 'YOUR_BOT_TOKEN_HERE';
const CLIENT_ID = '1527464567188361226';

// ============================================
// 1. SLASH COMMANDS (Register when bot starts)
// ============================================
client.once('ready', async () => {
  console.log(`👻 Ghost Hub is online as ${client.user.tag}`);
  client.user.setActivity('👻 Haunting servers', { type: 'WATCHING' });

  // Register slash commands
  const commands = [
    { name: 'ping', description: 'Check if Ghost Hub is online' },
    { name: 'haunt', description: '👻 Haunt someone or yourself' },
    { name: 'hello', description: '👋 Say hello to Ghost Hub' },
    { name: 'ghost-stats', description: '📊 Show Ghost Hub statistics' },
    { name: 'serverinfo', description: '🖤 Get server information' }
  ];

  const rest = new REST().setToken(TOKEN);
  try {
    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
    console.log('✅ Slash commands registered!');
  } catch (error) {
    console.error('❌ Failed to register commands:', error);
  }
});

// ============================================
// 2. SLASH COMMAND HANDLERS
// ============================================
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  // /ping
  if (commandName === 'ping') {
    await interaction.reply({
      embeds: [new EmbedBuilder()
        .setColor('#FFFFFF')
        .setTitle('🏓 Pong!')
        .setDescription(`Latency: ${client.ws.ping}ms`)
        .setFooter({ text: '👻 Ghost Hub' })]
    });
  }

  // /haunt
  if (commandName === 'haunt') {
    await interaction.reply({
      embeds: [new EmbedBuilder()
        .setColor('#000000')
        .setTitle('👻 BOO!')
        .setDescription(`${interaction.user} has been haunted by Ghost Hub!`)
        .setFooter({ text: '🖤 Black & White Haunting' })]
    });
  }

  // /hello
  if (commandName === 'hello') {
    await interaction.reply({
      embeds: [new EmbedBuilder()
        .setColor('#FFFFFF')
        .setTitle('👋 Hello!')
        .setDescription(`Nice to meet you ${interaction.user}! I'm Ghost Hub.`)
        .setFooter({ text: '👻 Ghost Hub' })]
    });
  }

  // /ghost-stats
  if (commandName === 'ghost-stats') {
    await interaction.reply({
      embeds: [new EmbedBuilder()
        .setColor('#FFFFFF')
        .setTitle('📊 Ghost Hub Stats')
        .addFields(
          { name: '🖤 Servers', value: `${client.guilds.cache.size}`, inline: true },
          { name: '⚪ Users', value: `${client.users.cache.size}`, inline: true },
          { name: '👻 Status', value: 'Haunting actively', inline: true }
        )
        .setFooter({ text: '👻 Ghost Hub' })]
    });
  }

  // /serverinfo
  if (commandName === 'serverinfo') {
    const guild = interaction.guild;
    await interaction.reply({
      embeds: [new EmbedBuilder()
        .setColor('#000000')
        .setTitle(`🖤 ${guild.name}`)
        .addFields(
          { name: '👑 Owner', value: `<@${guild.ownerId}>`, inline: true },
          { name: '👥 Members', value: `${guild.memberCount}`, inline: true },
          { name: '📅 Created', value: `<t:${Math.floor(guild.createdAt / 1000)}:D>`, inline: true }
        )
        .setFooter({ text: '👻 Ghost Hub' })]
    });
  }
});

// ============================================
// 3. PREFIX COMMANDS (!)
// ============================================
client.on('messageCreate', async message => {
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.content.startsWith('!')) return;

  const args = message.content.slice(1).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  // !ping
  if (command === 'ping') {
    await message.reply('🏓 Pong! Ghost Hub is alive!');
  }

  // !haunt
  if (command === 'haunt') {
    await message.reply({
      embeds: [new EmbedBuilder()
        .setColor('#000000')
        .setTitle('👻 BOO!')
        .setDescription(`${message.author} has been haunted!`)
        .setFooter({ text: '🖤 Black & White' })]
    });
  }

  // !hello
  if (command === 'hello') {
    await message.reply(`👋 Hello ${message.author.username}! I'm Ghost Hub.`);
  }

  // !serverinfo
  if (command === 'serverinfo') {
    const guild = message.guild;
    await message.reply({
      embeds: [new EmbedBuilder()
        .setColor('#FFFFFF')
        .setTitle(`🖤 ${guild.name}`)
        .addFields(
          { name: '👑 Owner', value: `<@${guild.ownerId}>`, inline: true },
          { name: '👥 Members', value: `${guild.memberCount}`, inline: true }
        )
        .setFooter({ text: '👻 Ghost Hub' })]
    });
  }
});

// ============================================
// 4. LOGIN
// ============================================
client.login(TOKEN);
