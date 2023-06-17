import { SlashCommandBuilder, ContextMenuCommandBuilder } from 'discord.js';
import {
  MessageCommandFuntion,
  MessageCommandOptions,
  SlashCommandFunction,
  SlashCommandOptions,
  ButtonInteractionOptions,
  ButtonInteractionFunction,
  AutoCompleteInteractionOptions,
  AutoCompleteInteractionFunction,
  ContextInteractionOptions,
  ContextInteractionFunction,
  ModalInteractionOptions,
  ModalInteractionFunction,
  SelectInteractionOptions,
  SelectInteractionFunction,
} from '../../../typings/structures';

export class SlashCommand {
  constructor(
    public data: SlashCommandBuilder,
    public run: SlashCommandFunction,
    public options?: SlashCommandOptions,
  ) { }
}

export class AppCommand {
  constructor(
    public data: ContextMenuCommandBuilder,
    public run: SlashCommandFunction,
  ) { }
}

export class MessageCommand {
  constructor(public data: MessageCommandOptions, public run: MessageCommandFuntion) { }
}

export class BaseCommand extends MessageCommand {
  constructor(
    public data: MessageCommandOptions,
    public run: MessageCommandFuntion,
    public slash?: SlashCommand | undefined,
  ) {
    super(data, run);
  }
}

export class ButtonInteraction {
  constructor(public data: ButtonInteractionOptions, public run: ButtonInteractionFunction) { }
}

export class AutoCompletInteraction {
  constructor(public data: AutoCompleteInteractionOptions, public run: AutoCompleteInteractionFunction) { }
}

export class ContextInteraction {
  constructor(
    public data: ContextMenuCommandBuilder,
    public run: ContextInteractionFunction,
  ) { }
}

export class ModalInteraction {
  constructor(public data: ModalInteractionOptions, public run: ModalInteractionFunction) { }
}

export class SelectInteraction {
  constructor(public data: SelectInteractionOptions, public run: SelectInteractionFunction) { }
}
