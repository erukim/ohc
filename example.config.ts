import { Partials } from 'discord.js';
import { IConfig, IEmoji, Working } from './typings';
import { execSync } from 'child_process';
export const mode: Working = 'Stable';
const token = ``

export const config: IConfig = {
  BUILD_NUMBER: execSync('git rev-parse --short HEAD').toString().trim(),
  BUILD_VERSION: '',
  bot: {
    sharding: false,
    shardingOptions: {
      totalShards: 'auto',
      token: `${token}`,
      respawn: true,
    },
    options: {
      intents: [130815],
      allowedMentions: { parse: ['users', 'roles'], repliedUser: false },
      partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.GuildScheduledEvent,
        Partials.Message,
        Partials.Reaction,
        Partials.ThreadMember,
        Partials.User
      ],
    },
    token: `${token}`,
    owners: [],
    prefix: '!',
    dok: `!`,
    aliases: ['dok'],
  },
  Github: {
    repository: ``,
    githubToken: ``,
  },
  logger: {
    img: "",
    level: 'chat',
    dev: false,
  },
  database: {
    /**
     * @type {'mongodb'|'mysql'}
     */
    type: 'mongodb',
    url: ``,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: ``,
    },
  },
  devGuild: ``,
};

export const emoji: IEmoji = {
  체크: "",
  엑스: "",
  로딩: ``
}

export default { mode, config, emoji }

