// @ts-nocheck
/* eslint-disable no-unused-vars */

// Buttons command
import { SelectInteraction } from '../../../base/Command';
import { CommandInteraction, Message } from 'discord.js';
import BotClient from '../../../base/BotClient';
import Embed from '../../../../utils/Embed';

export default new SelectInteraction(
  {
    name: '',
  },
  async (client, interaction) => {
    const msg = await interaction.channel.messages.fetch(interaction.message.id, { cache: true });
  },
);
