import { Client, ClientOptions, Collection } from 'discord.js';
import Dokdo from 'dokdo';
import Logger from '../../utils/Logger';
import { BaseButton, BaseCommand, Categorys, Event, MusicEvent, BaseAutoComplete, BaseContext, BaseModal, BaseSelect, Data, Server_Kick, Server_Ban } from '../../../typings/structures';
import { config, emoji, mode } from '../../../config';
import CommandManager from '../manager/CommandManager';
import EventManager from '../manager/EventManager';
import ErrorManager from '../manager/ErrorManager';
import DatabaseManager from '../manager/DatabaseManager';
import { Model } from 'mongoose';
import { config as dotenvConfig } from 'dotenv';
import ButtonManager from '../manager/ButtonManager';
import AutoCompleteManager from '../manager/AutoCompleteManager';
import ContextManager from '../manager/ContextManager';
import ModalManager from '../manager/ModalManager';
import SelectManager from '../manager/SelectManager';
import { DiscordTogether } from 'discord-together'

const logger = new Logger('bot');

export default class BotClient extends Client {
  public readonly VERSION: string;
  public readonly BUILD_NUMBER: string | null;
  public readonly config = config;
  public readonly emoji = emoji;
  public readonly mode = mode;

  public commands: Collection<string, BaseCommand> = new Collection();
  public buttons: Collection<string, BaseButton> = new Collection();
  public autoCompletes: Collection<string, BaseAutoComplete> = new Collection();
  public contexts: Collection<string, BaseContext> = new Collection();
  public modals: Collection<string, BaseModal> = new Collection();
  public selects: Collection<string, BaseSelect> = new Collection();
  public categorys: Collection<string, Categorys[]> = new Collection();
  public datas: Collection<string, Data[]> = new Collection();
  public events: Collection<string, Event> = new Collection();
  public musicEvents: Collection<string, MusicEvent> = new Collection();
  public errors: Collection<string, string> = new Collection();
  public server_kick: Collection<string, Server_Kick> = new Collection();
  public server_ban: Collection<string, Server_Ban> = new Collection();
  public dokdo: Dokdo = new Dokdo(this, {
    prefix: this.config.bot.dok,
    owners: config.bot.owners,
    aliases: config.bot.aliases,
    noPerm: (message) => message.reply(`${message.author}님은 ${this.user}의 디버깅 툴을 사용할 권한이 없습니다.\n메인 개발자에게 문의해 주세요.`),
  });
  public db: any;
  public schemas: Collection<string, Model<any>> = new Collection();

  public command: CommandManager = new CommandManager(this);
  public button: ButtonManager = new ButtonManager(this);
  public autoComplete: AutoCompleteManager = new AutoCompleteManager(this);
  public context: ContextManager = new ContextManager(this);
  public modal: ModalManager = new ModalManager(this);
  public select: SelectManager = new SelectManager(this);
  public event: EventManager = new EventManager(this);
  public error: ErrorManager = new ErrorManager(this);
  public database: DatabaseManager = new DatabaseManager(this);
  public discordTogether = new DiscordTogether(this);
  public aki = new Set()
  public status: string | undefined;

  public constructor(options: ClientOptions) {
    super(options);
    dotenvConfig();

    logger.info('Loading config data...');

    this.VERSION = config.BUILD_VERSION;
    this.BUILD_NUMBER = config.BUILD_NUMBER;
  }

  public async start(token: string = config.bot.token): Promise<void> {
    logger.info('Logging in bot...');
    await this.login(token).then(() => {
      this.setStatus(this.config.logger.dev ? 'dev' : 'online')
    })
  }

  public async setStatus(status: 'dev' | 'online' = 'online', name = '점검중...') {
    if (status.includes('dev')) {
      logger.warn('Changed status to Developent mode')
      this.status = 'dev'
      return `Mora Bot의 상태를 \`점검\`상태로 설정하였습니다.`
    } else if (status.includes('online')) {
      logger.info('Changed status to Online mode')
      this.status = 'online'
      return `Mora Bot의 상태를 \`정상\`상태로 설정하였습니다.`
    } else if (status.includes('update')) {
      logger.info('Changed status to Update mode')
      this.status = 'update'
      return `Mora Bot의 상태를 \`업데이트\`상태로 설정하였습니다.`
    } else if (status.includes('reload')) {
      logger.info('Changed status to Reload mode')
      this.status = 'reload'
      return `Mora Bot의 상태를 \`리로드\`상태로 설정하였습니다.`
    } else if (!status) {
      return '알수없는 상태인거 같아요!\n상태는 아래와 같으니 확인후 사용해주세요.\n온라인 : online\n점검중 : dev'
    } else {
      return '옳바르지 않는 접근 상태입니다!'
    }
  }
}
