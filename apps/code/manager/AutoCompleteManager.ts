import { BaseAutoComplete } from '../../../typings/structures';
import Logger from '../../utils/Logger';
import BaseManager from './BaseManager';
import fs from 'fs';
import path from 'path';
import BotClient from '../base/BotClient';

export default class AutoCompleteManager extends BaseManager {
  private logger = new Logger('AutoCompleteManager');
  private autoCompletes: BotClient['autoCompletes'];

  public constructor(client: BotClient) {
    super(client);

    this.autoCompletes = client.autoCompletes;
  }

  public load(autoCompletePath: string = path.join(__dirname, '../interactions/autoComplete')): void {
    this.logger.debug('Loading autoComplete...');

    const autoCompleteFolder = fs.readdirSync(autoCompletePath);

    try {
      autoCompleteFolder.forEach((folder) => {
        if (!fs.lstatSync(path.join(autoCompletePath, folder)).isDirectory()) return;

        try {
          const autoCompleteFiles = fs.readdirSync(path.join(autoCompletePath, folder));

          autoCompleteFiles.forEach((autoCompleteFile) => {
            try {
              const {
                default: autoComplete,
                // eslint-disable-next-line @typescript-eslint/no-var-requires
              } = require(`../interactions/autoComplete/${folder}/${autoCompleteFile}`);

              if (!autoComplete.data.name ?? !autoComplete.name)
                return this.logger.debug(`AutoComplete ${autoCompleteFile} has no name. Skipping.`);

              this.autoCompletes.set(autoComplete.data.name ?? autoComplete.name, autoComplete);

              this.logger.debug(`Loaded AutoComplete ${autoComplete.data.name ?? autoComplete.name}`);
            } catch (error: any) {
              this.logger.error(`Error loading autoComplete '${autoCompleteFile}'.\n` + error.stack);
            } finally {
              this.logger.debug(`Succesfully loaded autoComplete. count: ${this.autoCompletes.size}`);
              // eslint-disable-next-line no-unsafe-finally
              return this.autoCompletes;
            }
          });
        } catch (error: any) {
          this.logger.error(`Error loading autoComplete folder '${folder}'.\n` + error.stack);
        }
      });
    } catch (error: any) {
      this.logger.error('Error fetching folder list.\n' + error.stack);
    }
  }

  public get(commandName: string): BaseAutoComplete | undefined {
    if (this.client.autoCompletes.has(commandName)) return this.client.autoCompletes.get(commandName);
  }

  public reload(autoCompletePath: string = path.join(__dirname, '../interactions/autoComplete')) {
    this.logger.debug('Reloading autoComplete...');

    this.autoCompletes.clear();
    try {
      this.load(autoCompletePath);
    } finally {
      this.logger.debug('Succesfully reloaded autoComplete.');
      // eslint-disable-next-line no-unsafe-finally
      return { message: '[200] Succesfully reloaded commands.' };
    }
  }
}
