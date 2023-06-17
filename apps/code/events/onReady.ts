import { Event } from '../base/Event'
import Logger from '../../utils/Logger'
import CommandManager from '../manager/CommandManager'
const logger = new Logger('bot')
import BotClient from '../base/BotClient'
import axios from 'axios'

export default new Event('ready', async (client) => {
  logger.info(`Logged ${client.user?.username}`)
  const commandManager = new CommandManager(client);
  if (client.mode == 'Stable') {
    await commandManager.slashGlobalCommandSetup();
  } else if (client.mode == 'dev') {
    await commandManager.slashCommandSetup(client.config.devGuild);
  }
  Archive_Server_Update(client)
  Koreanbot_Server_Update(client)
},
)

async function Archive_Server_Update(client: BotClient) { // 아카이브 서버 업데이트
  if (client.mode !== 'Stable') return
  if (!client.config.botsite) return
  if (!client.config.botsite.archive) return
  const res = await client.shard?.fetchClientValues('guilds.cache.size');
  axios.post(`https://api.archiver.me/bots/${client.config.botsite.clientid}/server`, {
    servers: res?.reduce((acc, guilds) => Number(acc) + Number(guilds), 0),
  }, {
    headers: { Authorization: 'Bearer ' + client.config.botsite.archive.bot },
  }).then(() => {
    logger.info('아카이브: 서버 수 업데이트 완료');
  }).catch((e: any) => {
    logger.error(`아카이브: 서버 수 업데이트 오류: ${e.response?.data.message}`);
  });
}
async function Koreanbot_Server_Update(client: BotClient) { // 한디리 서버 업데이트
  if (client.mode !== 'Stable') return
  if (!client.config.botsite) return
  if (!client.config.botsite.koreanbots) return
  const res = await client.shard?.fetchClientValues('guilds.cache.size');
  axios.post(`https://koreanbots.dev/api/v2/bots/${client.config.botsite.clientid}/stats`, {
    servers: res?.reduce((acc, guilds) => Number(acc) + Number(guilds), 0),
    shards: client.shard?.count,
  }, {
    headers: { Authorization: client.config.botsite.koreanbots.bot },
  }).then(() => {
    logger.info('한디리: 서버 수 업데이트 완료');
  }).catch((e: any) => {
    logger.error(`한디리: 서버 수 업데이트 오류: ${e.response?.data.message}`);
  });
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
async function name(client: BotClient) {
}