import Discord from 'discord.js';
import BaseManager from './BaseManager';
import Embed from '../../utils/Embed';
import Logger from '../../utils/Logger';
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

  public report(error: Error) {
    this.logger.error(error.stack as string);
    new Discord.WebhookClient({ url: config.logger.console_log }).send({
      username: `Console Error`,
      avatarURL: config.logger.img,
      embeds: [
        new Embed(this.client, 'default')
          .setTitle(`[<t:${Math.round(new Date().getTime() / 1000)}:T> ERROR]`)
          .setDescription(`${error.stack as string}`)
      ]
    })
  }
}
