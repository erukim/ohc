import path from 'path';
import Logger from '../utils/Logger';
import { config } from '../../config';
import BotClient from './base/BotClient';
import CommandManager from './manager/CommandManager';
import EventManager from './manager/EventManager';
import DatabaseManager from './manager/DatabaseManager';
import ButtonManager from './manager/ButtonManager';
import AutoComplete from './manager/AutoCompleteManager';
import Context from './manager/ContextManager';
import Modal from './manager/ModalManager';
import Select from './manager/SelectManager';
import { RESTJSONErrorCodes } from 'discord.js';
import ConsoleErrorManager from './manager/ConsoleErrorManager'
export const client = new BotClient(config.bot.options);
const errorManager = new ConsoleErrorManager(client)

const logger = new Logger('main');

logger.log('Starting up...');

process.on("uncaughtException", (e: any) => {
  if (e?.code === RESTJSONErrorCodes.MissingPermissions) return;
  errorManager.report(e)
})
process.on('uncaughtExceptionMonitor', (e: any) => {
  if (e?.code === RESTJSONErrorCodes.MissingPermissions) return;
  errorManager.report(e)
});
process.on('unhandledRejection', (e: any) => {
  if (e == `Error: Cannot perform IP discovery - socket closed`) return
  if (e == `Error: Cannot perform IP discovery - socket closed`) return
  if (e == `Cannot perform IP discovery - socket closed`) return
  errorManager.report(e)
});

const database = new DatabaseManager(client);
const command = new CommandManager(client);
const event = new EventManager(client);
const button = new ButtonManager(client);
const autoComplete = new AutoComplete(client);
const context = new Context(client);
const modal = new Modal(client);
const select = new Select(client);

database.load();
command.load(path.join(__dirname, 'commands'));
event.load(path.join(__dirname, 'events'));
button.load(path.join(__dirname, 'interactions/buttons'));
autoComplete.load(path.join(__dirname, 'interactions/autoComplete'));
context.load(path.join(__dirname, 'interactions/contexts'));
modal.load(path.join(__dirname, 'interactions/modals'));
select.load(path.join(__dirname, 'interactions/selects'));

client.start(config.bot.token);
