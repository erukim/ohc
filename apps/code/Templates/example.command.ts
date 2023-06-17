// @ts-nocheck
/* eslint-disable no-unused-vars */

// Slash command and Message Command
import { SlashCommandBuilder, ContextMenuCommandBuilder, ApplicationCommandType } from 'discord.js';
import { CommandInteraction, Message } from 'discord.js';
import { BaseCommand } from '../../base/Command';
import BotClient from '../../base/BotClient';
import Embed from '../../../utils/Embed'

export default new BaseCommand(
  {
    name: '',
    description: '',
    aliases: [],
  },
  async (client, message, args) => { },
  {
    data: new SlashCommandBuilder()
      .setDMPermission(false)
      .setName('')
      .setDescription(''),
    options: {
      isSlash: true,
    },
    async run(client, interaction) {
    },
  },
);

// Message command

import { MessageCommand } from '../../base/Command';

export default new MessageCommand(
  {
    name: '',
    description: '',
    aliases: [],
  },
  async (client, message, args) => {
  },
);

// Slash command

import { SlashCommand } from '../../base/Command';

export default new SlashCommand(
  new SlashCommandBuilder()
    .setDMPermission(false)
    .setName('')
    .setDescription(''),
  async (client, interaction) => {
  },
  {
    isSlash: true,
  },
);