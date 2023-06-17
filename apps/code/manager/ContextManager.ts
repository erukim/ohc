import { BaseContext } from '../../../typings/structures';
import Logger from '../../utils/Logger';
import BaseManager from './BaseManager';
import fs from 'fs';
import path from 'path';
import BotClient from '../base/BotClient';

export default class ContextManager extends BaseManager {
  private logger = new Logger('ContextManager');
  private contexts: BotClient['contexts'];

  public constructor(client: BotClient) {
    super(client);

    this.contexts = client.contexts;
  }

  public load(contextPath: string = path.join(__dirname, '../interactions/contexts')): void {
    this.logger.debug('Loading Context...');

    const contextFolder = fs.readdirSync(contextPath);

    try {
      contextFolder.forEach((folder) => {
        if (!fs.lstatSync(path.join(contextPath, folder)).isDirectory()) return;

        try {
          const contextFiles = fs.readdirSync(path.join(contextPath, folder));

          contextFiles.forEach((contextFile) => {
            try {
              const {
                default: context,
                // eslint-disable-next-line @typescript-eslint/no-var-requires
              } = require(`../interactions/contexts/${folder}/${contextFile}`);

              if (!context.data.name ?? !context.name)
                return this.logger.debug(`Context ${contextFile} has no name. Skipping.`);

              this.contexts.set(context.data.name ?? context.name, context);

              this.logger.debug(`Loaded Context ${context.data.name ?? context.name}`);
            } catch (error: any) {
              this.logger.error(`Error loading context '${contextFile}'.\n` + error.stack);
            } finally {
              this.logger.debug(`Succesfully loaded Context. count: ${this.contexts.size}`);
              // eslint-disable-next-line no-unsafe-finally
              return this.contexts;
            }
          });
        } catch (error: any) {
          this.logger.error(`Error loading context folder '${folder}'.\n` + error.stack);
        }
      });
    } catch (error: any) {
      this.logger.error('Error fetching folder list.\n' + error.stack);
    }
  }

  public get(commandName: string): BaseContext | undefined {
    if (this.client.contexts.has(commandName)) return this.client.contexts.get(commandName);
  }

  public reload(contextPath: string = path.join(__dirname, '../interactions/contexts')) {
    this.logger.debug('Reloading Context...');

    this.contexts.clear();
    try {
      this.load(contextPath);
    } finally {
      this.logger.debug('Succesfully reloaded Context.');
      // eslint-disable-next-line no-unsafe-finally
      return { message: '[200] Succesfully reloaded commands.' };
    }
  }
}
