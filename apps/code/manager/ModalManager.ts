import { BaseModal } from '../../../typings/structures';
import Logger from '../../utils/Logger';
import BaseManager from './BaseManager';
import fs from 'fs';
import path from 'path';
import BotClient from '../base/BotClient';

export default class ModalManager extends BaseManager {
  private logger = new Logger('ModalManager');
  private modals: BotClient['modals'];

  public constructor(client: BotClient) {
    super(client);

    this.modals = client.modals;
  }

  public load(modalPath: string = path.join(__dirname, '../interactions/modals')): void {
    this.logger.debug('Loading Modal...');

    const modalFolder = fs.readdirSync(modalPath);

    try {
      modalFolder.forEach((folder) => {
        if (!fs.lstatSync(path.join(modalPath, folder)).isDirectory()) return;

        try {
          const modalFiles = fs.readdirSync(path.join(modalPath, folder));

          modalFiles.forEach((modalFile) => {
            try {
              const {
                default: modal,
                // eslint-disable-next-line @typescript-eslint/no-var-requires
              } = require(`../interactions/modals/${folder}/${modalFile}`);

              if (!modal.data.customId ?? !modal.customId)
                return this.logger.debug(`Modal ${modalFile} has no name. Skipping.`);

              this.modals.set(modal.data.customId ?? modal.customId, modal);

              this.logger.debug(`Loaded Modal ${modal.data.customId ?? modal.customId}`);
            } catch (error: any) {
              this.logger.error(`Error loading modal '${modalFile}'.\n` + error.stack);
            } finally {
              this.logger.debug(`Succesfully loaded Modal. count: ${this.modals.size}`);
              // eslint-disable-next-line no-unsafe-finally
              return this.modals;
            }
          });
        } catch (error: any) {
          this.logger.error(`Error loading modal folder '${folder}'.\n` + error.stack);
        }
      });
    } catch (error: any) {
      this.logger.error('Error fetching folder list.\n' + error.stack);
    }
  }

  public get(commandName: string): BaseModal | undefined {
    if (this.client.modals.has(commandName)) return this.client.modals.get(commandName);
  }

  public reload(modalPath: string = path.join(__dirname, '../interactions/modals')) {
    this.logger.debug('Reloading Modal...');

    this.modals.clear();
    try {
      this.load(modalPath);
    } finally {
      this.logger.debug('Succesfully reloaded Modal.');
      // eslint-disable-next-line no-unsafe-finally
      return { message: '[200] Succesfully reloaded commands.' };
    }
  }
}
