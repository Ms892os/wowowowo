const { Client, GatewayIntentBits, Events } = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions
  ],
});

client.on(Events.MessageReactionRemove, async (reaction, user) => {
  if (reaction.partial) {
    try {
      await reaction.fetch();
    } catch (error) {
      console.error('Error fetching reaction:', error);
      return;
    }
  }

  const logChannel = reaction.message.guild.channels.cache.find(
    (ch) => ch.name === 'reaction-logs'
  );

  if (!logChannel) {
    console.warn('Log channel not found. Create a channel named "reaction-logs".');
    return;
  }

  logChannel.send(
    `تم حذف الرياكشن **${reaction.emoji.name}** من الرسالة: ${reaction.message.url} بواسطة: ${user.tag}`
  );
});

client.once(Events.ClientReady, () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.login('YOUR_BOT_TOKEN');