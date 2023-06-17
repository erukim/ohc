import { Event } from '../base/Event'
import CommandManager from '../manager/CommandManager'
import ErrorManager from '../manager/ErrorManager'
import type { MessageCommand } from '../base/Command'
import BotClient from '../base/BotClient'
import { Message } from 'discord.js'
import Embed from '../../utils/Embed'

export default new Event('messageCreate', async (client, message) => {
  const commandManager = new CommandManager(client)
  const errorManager = new ErrorManager(client)

  if (message.author.bot) return
  if (!message.inGuild()) return

  await client.dokdo.run(message)

  if (!message.content.startsWith(client.config.bot.prefix)) return

  const args = message.content.slice(client.config.bot.prefix.length).trim().split(/ +/g)
  const commandName = args.shift()?.toLowerCase()
  const command = commandManager.get(commandName as string) as MessageCommand

  const stop_command = new Embed(client, 'warn')
    .setDescription(`${client.emoji.엑스} | 해당 명령어(버튼 / 메뉴)는 일시적인 점검으로 인해서 사용이 잠시 중단되었습니다.`)
  if (command?.data?.stop) return await message.reply({ embeds: [stop_command] })

  if (command?.data.owner == true) {
    if (!client.config.bot.owners.includes(message.author.id)) return await message.reply(
      {
        embeds: [
          new Embed(client, 'warn')
            .setTitle(`${client.emoji.엑스} | System`)
            .setDescription(`관리자 전용 명령어에요!`)
        ]
      }
    )
  }
  try {
    await command?.run(client, message, args)
  } catch (error: any) {
    errorManager.report(error, { executer: message, isSend: true, commands: message.content, type: '메시지 커맨드' })
  }
})

// eslint-disable-next-line @typescript-eslint/no-empty-function
async function name(message: Message, client: BotClient) {
}