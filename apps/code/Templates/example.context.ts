// @ts-nocheck
/* eslint-disable no-unused-vars */

// Buttons command
import { ContextInteraction } from '../../../base/Command';
import { ApplicationCommandType, ContextMenuCommandBuilder } from 'discord.js';
import BotClient from '../../../base/BotClient';
import Embed from '../../../../utils/Embed';

export default new ContextInteraction(
  new ContextMenuCommandBuilder()
    .setName(``)
    .setType(ApplicationCommandType),
  async (client, interaction) => {
  },
);
