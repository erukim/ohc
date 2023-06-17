import { EmbedField, Guild, InteractionReplyOptions, Status } from 'discord.js';
import BotClient from '../code/base/BotClient';
import Embed from './Embed';
import { readdirSync, statSync } from 'fs'
import { ProcessStatusString } from './Constants'
import { execSync } from 'child_process';
import { ProcessList } from '../../typings/pm2';
import { ShardData } from '../../typings';

export function RandCha(length: number) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// https://gist.github.com/kethinov/6658166
export const readAllFiles = (dirPath: string, fileList: string[] = []) => {
  const files = readdirSync(dirPath)
  for (const file of files) {
    const filePath = dirPath + '/' + file
    const stat = statSync(filePath)

    if (stat.isFile()) fileList.push(filePath)
    else fileList = readAllFiles(filePath, fileList)
  }

  return fileList
}

export const getPm2List = (client: BotClient): ProcessList[] | InteractionReplyOptions => {
  const lists = JSON.parse(execSync('pm2 jlist').toString()) as ProcessList[]
  if (lists.length == 0)
    return {
      embeds: [
        new Embed(client, 'warn')
          .setTitle(`PM2 Manager`)
          .setDescription(`${client.emoji.엑스} | 현재 pm2 내 프로세스가 없습니다.`)
      ],
      ephemeral: true
    }
  else {
    lists.map(
      (data) => (data.status = ProcessStatusString[data.pm2_env.status])
    )
    return lists
  }
}

export function msToString(ms: number) {
  const seconds = Math.floor(ms / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  const s = seconds % 60
  const m = minutes % 60
  const h = hours % 24
  const d = days

  let result = ''
  if (d !== 0) {
    result += `${d}일 `
  }
  if (h !== 0) {
    result += `${h}시간 `
  }
  result += `${m}분 ${s}초`
  return result.trim()
}

export const convertEmbed = (pm2Data: ProcessList[], client: BotClient) => {
  const field: EmbedField[] = []
  pm2Data.forEach((data) => {
    const value = [
      `**상태**: ${data.status}`,
      `**모드**: ${data.pm2_env.exec_mode}`,
      `**PID**: ${data.pid}`,
      `**업타임**: ${msToString(Date.now() - data.pm2_env.pm_uptime)}`,
      `**재시작 횟수**: ${data.pm2_env.restart_time}회`,
      `**CPU 사용량**: ${data.monit.cpu}%`,
      `**램 사용량**: ${(data.monit.memory / 1048576) | 0}MB`
    ].join('\n')
    field.push({
      name: `${data.name}(${data.pm_id})`,
      value,
      inline: true
    })
  })

  const embed = new Embed(client, 'default')
    .setTitle('프로세스 정보')
    .setFields(field)

  return embed
}

export const fetchShardData = async (client: BotClient) => {
  const shardData: ShardData[] = []
  if (client.shard) {
    const totalShard = client.shard?.count
    const wsping = (await client.shard?.fetchClientValues('ws.ping')) as number[]
    const guilds = (await client.shard?.fetchClientValues('guilds.cache.size')) as number[]
    const users = (await client.shard?.broadcastEval((client) =>
      client.guilds.cache.reduce((a, b) => a + b.memberCount, 0),
    )) as number[]
    const channels = (await client.shard?.fetchClientValues('channels.cache.size')) as number[]
    const uptime = (await client.shard?.fetchClientValues('uptime')) as number[]
    const status = (await client.shard?.fetchClientValues('ws.status')) as Status[]

    for (let i = 0; i < totalShard!; i++) {
      let statusStr

      switch (status[i]) {
        case 0:
          statusStr = '🟢 연결됨'
          break
        case 1:
          statusStr = '🔵 연결 중'
          break
        case 2:
          statusStr = '🔵 재연결 중'
          break
        case 3:
          statusStr = '🟣 대기 중'
          break
        case 5:
          statusStr = '🔴 연결 끊김'
          break
        case 6:
          statusStr = '🟡 서버 로드 중'
          break
        case 7:
          statusStr = '🟠 인증 중'
          break
        default:
          statusStr = '⚫ 알수없음'
          break
      }
      shardData.push({
        id: i,
        ping: wsping[i],
        guilds: guilds[i],
        users: users[i],
        channels: channels[i],
        uptime: uptime[i],
        status: statusStr,
      })
    }
    return shardData
  }
  const status = client.ws.status
  let statusStr: string

  switch (status) {
    case 0:
      statusStr = '🟢 연결됨'
      break
    case 1:
      statusStr = '🔵 연결 중'
      break
    case 2:
      statusStr = '🔵 재연결 중'
      break
    case 3:
      statusStr = '🟣 대기 중'
      break
    case 5:
      statusStr = '🔴 연결 끊김'
      break
    case 6:
      statusStr = '🟡 서버 로드 중'
      break
    case 7:
      statusStr = '🟠 인증 중'
      break
    default:
      statusStr = '⚫ 알수없음'
      break
  }

  shardData.push({
    id: 0,
    channels: client.channels.cache.size,
    ping: client.ws.ping,
    users: client.guilds.cache.reduce((a, b) => a + b.memberCount, 0),
    guilds: client.guilds.cache.size,
    uptime: client.uptime ?? 0,
    status: statusStr,
  })

  return shardData
}