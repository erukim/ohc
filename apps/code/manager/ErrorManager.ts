import Discord from 'discord.js';
import BaseManager from './BaseManager';
import Embed from '../../utils/Embed';
import Logger from '../../utils/Logger';
import { v4 as uuid } from 'uuid';
import { ErrorReportOptions } from '../../../typings';
import BotClient from '../base/BotClient';

import { config } from '../../../config';

/**
 * @extends BaseManager
 */
export default class ErrorManager extends BaseManager {
  private logger: Logger;

  public constructor(client: BotClient) {
    super(client);

    this.logger = new Logger('bot');
  }

  public report(error: Error, options: ErrorReportOptions) {
    this.logger.error(error.stack as string);

    const { isSend, executer, commands, type } = options;
    const date = new Date()
    const time = Math.round(date.getTime() / 1000)
    const errorCode = uuid();

    this.client.errors.set(errorCode, error.stack as string);

    const errorEmbed = new Embed(this.client, 'error')
      .setTitle("❗오류가 발생하였습니다!")
      .setDescription('명령어에서 오류가 발생하여 정상적으로 작동되지 않았습니다.\nDM문의로 아래 오류코드를 보내주시면 Mora에 도움이 됩니다.')
      .setFields(
        { name: `오류코드`, value: `\`${errorCode}\`` }
      )

    isSend ? executer?.reply({ embeds: [errorEmbed] }) : null;

    const webhook = new Discord.WebhookClient({ url: config.logger.command_log })
    webhook.send({
      username: `Command Error`,
      avatarURL: config.logger.img,
      embeds: [
        new Embed(this.client, 'default')
          .setTitle(`[<t:${time}:T> ERROR]`)
          .setDescription(`${error.stack}`)
          .addFields(
            { name: `에러코드`, value: `${errorCode}` },
            { name: `에러발생서버`, value: `${executer?.guild?.name} (\`${executer?.guild?.id}\`) ${executer?.guild?.preferredLocale}` },
            { name: `에러발생샤드`, value: `${executer?.guild?.shard?.id} (\`${executer?.guild?.shard?.lastPingTimestamp}ms\`) ${executer?.guild?.shard?.ping}ms ${executer?.guild?.shard?.status}` },
            { name: `에러발생유저`, value: `${executer?.member?.user} (\`${executer?.member?.user?.id} | ${executer?.member?.user?.username}#${executer?.member?.user?.discriminator}\`)` },
            { name: `커맨드 타입`, value: `${type}` },
            { name: `사용커맨드`, value: `${commands}` },
          )
      ]
    })
  }
}
