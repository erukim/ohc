import { BaseSelect } from '../../../typings/structures';
import Logger from '../../utils/Logger';
import BaseManager from './BaseManager';
import fs from 'fs';
import path from 'path';
import BotClient from '../base/BotClient';

export default class SelectManager extends BaseManager {
  private logger = new Logger('SelectManager');
  private selects: BotClient['selects'];

  public constructor(client: BotClient) {
    super(client);

    this.selects = client.selects;
  }

  public load(selectPath: string = path.join(__dirname, '../interactions/selects')): void {
    this.logger.debug('Loading Select...');

    const selectFolder = fs.readdirSync(selectPath);

    try {
      selectFolder.forEach((folder) => {
        if (!fs.lstatSync(path.join(selectPath, folder)).isDirectory()) return;

        try {
          const selectFiles = fs.readdirSync(path.join(selectPath, folder));

          selectFiles.forEach((selectFile) => {
            try {
              const {
                default: select,
                // eslint-disable-next-line @typescript-eslint/no-var-requires
              } = require(`../interactions/selects/${folder}/${selectFile}`);

              if (!select.data.name ?? !select.name)
                return this.logger.debug(`Select ${selectFile} has no name. Skipping.`);

              this.selects.set(select.data.name ?? select.name, select);

              this.logger.debug(`Loaded Select ${select.data.name ?? select.name}`);
            } catch (error: any) {
              this.logger.error(`Error loading select '${selectFile}'.\n` + error.stack);
            } finally {
              this.logger.debug(`Succesfully loaded Select. count: ${this.selects.size}`);
              // eslint-disable-next-line no-unsafe-finally
              return this.selects;
            }
          });
        } catch (error: any) {
          this.logger.error(`Error loading select folder '${folder}'.\n` + error.stack);
        }
      });
    } catch (error: any) {
      this.logger.error('Error fetching folder list.\n' + error.stack);
    }
  }

  public get(commandName: string): BaseSelect | undefined {
    if (this.client.selects.has(commandName)) return this.client.selects.get(commandName);
  }

  public reload(selectPath: string = path.join(__dirname, '../interactions/selects')) {
    this.logger.debug('Reloading Select...');

    this.selects.clear();
    try {
      this.load(selectPath);
    } finally {
      this.logger.debug('Succesfully reloaded Select.');
      // eslint-disable-next-line no-unsafe-finally
      return { message: '[200] Succesfully reloaded commands.' };
    }
  }
}
