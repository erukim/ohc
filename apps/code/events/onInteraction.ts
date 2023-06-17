import ErrorManager from '../manager/ErrorManager'
import CommandManager from '../manager/CommandManager';
import ButtonManager from '../manager/ButtonManager';
import AutoCompleteManager from '../manager/AutoCompleteManager';
import ContextManager from '../manager/ContextManager';
import ModalManager from '../manager/ModalManager';
import SelectManager from '../manager/SelectManager';
import { Event } from '../base/Event'
import Embed from '../../utils/Embed';
import { ChatInputCommandInteraction, InteractionType as DInteractionType } from 'discord.js';
import BotClient from '../base/BotClient';

export default new Event('interactionCreate', async (client, interaction) => {
  const commandManager = new CommandManager(client);
  const errorManager = new ErrorManager(client);
  const buttonManager = new ButtonManager(client);
  const autoCompleteManager = new AutoCompleteManager(client);
  const contextManager = new ContextManager(client);
  const modalManager = new ModalManager(client);
  const selectManager = new SelectManager(client);

  if (!interaction.inCachedGuild() && !interaction.isAutocomplete()) return await interaction.reply({
    embeds: [
      new Embed(client, 'warn')
        .setDescription(`${client.emoji.엑스} | ${client.user}봇은 DM으로 명령어 사용이 불가능합니다.\n문의를 하실경우 문의 내용을 알려주세요! (DM문의)`)
    ]
  })
  if (interaction.user.bot) return;

  const stop_command = new Embed(client, 'warn')
    .setDescription(`${client.emoji.엑스} | 해당 명령어(버튼 / 메뉴)는 일시적인 점검으로 인해서 사용이 잠시 중단되었습니다.`)

  if (interaction.isChatInputCommand()) {
    const command = commandManager.get(interaction.commandName);
    if (!command) return
    try {
      if (commandManager.isSlash(command)) {
        if (command?.slash ? command?.slash?.options?.stop : command?.options?.stop) return await interaction.reply({ embeds: [stop_command] })
        if (command?.slash ? command?.slash?.options?.owner : command?.options?.owner == true) {
          if (!client.config.bot.owners.includes(interaction.user.id)) return await interaction.reply(
            {
              embeds: [
                new Embed(client, 'warn')
                  .setTitle(`${client.emoji.엑스} | System`)
                  .setDescription(`\`/${interaction.commandName}\` 명령어는 개발자 전용 명령어 입니다!\n\n\`/${interaction.commandName}\` This is a developer-only command!`)
              ], ephemeral: true
            }
          )
        }
        command.slash ? await command.slash.run(client, interaction) : await command.run(client, interaction);
      }
    } catch (error: any) {
      errorManager.report(error, { executer: interaction, isSend: true, commands: interaction.commandName, type: '슬래시 커맨드' });
    }
  } else if (interaction.isButton()) {
    const button = buttonManager.get(interaction.customId);
    if (!button) return;
    if (button?.options?.stop) return await interaction.reply({ embeds: [stop_command] })
    if (button?.options?.owner == true) {
      if (!client.config.bot.owners.includes(interaction.user.id)) return await interaction.reply(
        {
          embeds: [
            new Embed(client, 'warn')
              .setTitle(`${client.emoji.엑스} | System`)
              .setDescription(`관리자 전용 명령어에요!`)
          ], ephemeral: true
        }
      )
    }
    try {
      await button?.run(client, interaction);
    } catch (error: any) {
      errorManager.report(error, { executer: interaction, isSend: false, commands: interaction.customId, type: '버튼' });
    }
  } else if (interaction.type === DInteractionType.ApplicationCommandAutocomplete) {
    const focusedValue = interaction.options.getFocused(true);
    if (!focusedValue) return;
    const autoComplete = autoCompleteManager.get(focusedValue.name as string);
    if (!autoComplete) return;
    if (autoComplete?.options?.stop) return await interaction.respond([`${client.emoji.엑스} | 해당 자동완성기능은 일시적인 점검으로 인해서 사용이 잠시 중단되었습니다.`].map((choice) => ({ name: choice, value: choice }))
    );
    try {
      await autoComplete?.run(client, interaction);
    } catch (error: any) {
      errorManager.report(error, { executer: interaction, isSend: false, commands: interaction.commandName, type: '자동완성' });
    }
  } else if (interaction.isContextMenuCommand() || interaction.isUserContextMenuCommand() || interaction.isMessageContextMenuCommand()) {
    const context = contextManager.get(interaction.commandName);
    if (!context) return;
    if (context?.options?.stop) return await interaction.reply({ embeds: [stop_command] })
    try {
      await context?.run(client, interaction);
    } catch (error: any) {
      errorManager.report(error, { executer: interaction, isSend: true, commands: interaction.commandName, type: '앱커맨드' });
    }
  } else if (interaction.type === DInteractionType.ModalSubmit) {
    const modal = modalManager.get(interaction.customId);
    if (!modal) return;
    if (modal?.options?.stop) return await interaction.reply({ embeds: [stop_command] })
    try {
      await modal?.run(client, interaction);
    } catch (error: any) {
      errorManager.report(error, { executer: interaction, isSend: true, commands: interaction.customId, type: '모달' });
    }
  } else if (interaction.isAnySelectMenu()) {
    const select = selectManager.get(interaction.customId);
    if (!select) return;
    if (select?.options?.stop) return await interaction.reply({ embeds: [stop_command] })
    try {
      await select?.run(client, interaction);
    } catch (error: any) {
      errorManager.report(error, { executer: interaction, isSend: true, commands: interaction.customId, type: '셀렉트 메뉴' });
    }
  }
});

// eslint-disable-next-line @typescript-eslint/no-empty-function
async function name(client: BotClient, interaction: ChatInputCommandInteraction) {
}