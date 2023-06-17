import {
  SlashCommandBuilder,
  ContextMenuCommandBuilder,
  Message,
  ClientEvents,
  Awaitable,
  ButtonInteraction as ButtonInteractionType,
  AutocompleteInteraction as AutoCompleteInteractionType,
  ContextMenuCommandInteraction as ContextInteractionType,
  ModalSubmitInteraction as ModalInteractionType,
  AnySelectMenuInteraction as SelectInteractionType,
  ChatInputCommandInteraction,
  RESTPostAPIApplicationCommandsJSONBody,
} from 'discord.js';
import BotClient from '../apps/code/base/BotClient';
import { PlayerEvents } from 'discord-player';

export interface MessageCommnad {
  data: MessageCommandOptions;
  run: MessageCommandFuntion;
}
export interface Command extends MessageCommnad {
  isSlash?: boolean;
  slash?: SlashCommand;
}

export interface SlashCommand {
  data: SlashCommandBuilder;
  run: SlashCommandFunction;
  options?: SlashCommandOptions;
  slash?: SlashCommand;
}

export interface MessageCommandOptions {
  name: string;
  description: string;
  aliases: string[];
  owner?: boolean;
  music?: boolean;
  stop?: boolean;
}

export interface ButtonInteractionOptions {
  customId: string | string[];
  owner?: boolean;
  music?: boolean;
  stop?: boolean;
}

export interface ButtonInteraction {
  data: SlashCommandBuilder;
  run: ButtonInteractionFunction;
  options?: ButtonInteractionOptions;
}

export type ButtonInteractionFunction = (
  client: BotClient,
  interaction: ButtonInteractionType,
) => Awaitable<void> | Promise<any>;

export interface AutoCompleteInteractionOptions {
  name: string | string[];
  owner?: boolean;
  music?: boolean;
  stop?: boolean;
}

export interface AutoCompleteInteraction {
  data: SlashCommandBuilder;
  run: AutoCompleteInteractionFunction;
  options?: AutoCompleteInteractionOptions;
}

export type AutoCompleteInteractionFunction = (
  client: BotClient,
  interaction: AutoCompleteInteractionType,
) => Awaitable<void> | Promise<any>;

export interface ContextInteractionOptions {
  customId: string | string[];
  owner?: boolean;
  music?: boolean;
  stop?: boolean;
}

export interface ContextInteraction {
  data: ContextMenuCommandBuilder;
  run: ContextInteractionFunction;
  options?: ContextInteractionOptions;
}

export type ContextInteractionFunction = (
  client: BotClient,
  interaction: ContextInteractionType,
) => Awaitable<void> | Promise<any>;

export interface ModalInteractionOptions {
  customId: string | string[];
  owner?: boolean;
  music?: boolean;
  stop?: boolean;
}

export interface ModalInteraction {
  data: SlashCommandBuilder;
  run: ModalInteractionFunction;
  options?: ModalInteractionOptions;
}

export type ModalInteractionFunction = (
  client: BotClient,
  interaction: ModalInteractionType,
) => Awaitable<void> | Promise<any>;

export interface SelectInteractionOptions {
  customId: string | string[];
  owner?: boolean;
  music?: boolean;
  stop?: boolean;
}

export interface SelectInteraction {
  data: SlashCommandBuilder;
  run: SelectInteractionFunction;
  options?: SelectInteractionOptions;
}

export type SelectInteractionFunction = (
  client: BotClient,
  interaction: SelectInteractionType,
) => Awaitable<void> | Promise<any>;

export type MessageCommandFuntion = (
  client: BotClient,
  message: Message,
  args: string[],
) => Awaitable<void> | Promise<any>;

export type SlashCommandFunction = (
  client: BotClient,
  interaction: ChatInputCommandInteraction<'cached'>,
) => Promise<any>;

export interface SlashCommandOptions {
  name: string;
  isSlash?: boolean;
  owner?: boolean;
  music?: boolean;
  stop?: boolean;
}

export interface Event {
  name: keyof ClientEvents;
  options?: EventOptions;
  run: (client: BotClient, ...args: ClientEvents[keyof ClientEvents]) => Awaitable<void>;
}

export interface MusicEvent {
  name: keyof PlayerEvents;
  run: (client: BotClient, ...args: PlayerEvents[keyof PlayerEvents]) => Awaitable<void>;
}

export interface Server_Ban {
  userid: string;
  reason?: string;
}

export interface Server_Kick {
  userid: string;
  reason?: string;
}

export type EventFunction<E extends keyof ClientEvents> = (
  client: BotClient,
  ...args: ClientEvents[E]
) => Promise<any>;

export interface EventOptions {
  once: boolean;
}

export interface Categorys {
  name: string;
  description: string;
  isSlash?: boolean;
}

export interface Data {
  type: '하단고정' | '공지';
  data: any;
}

export type BaseInteractionFunction<T = Interaction> = (
  client: BotClient,
  interaction: T
) => Promise<any>

export type BaseCommand = MessageCommnad | SlashCommand | Command;
export type BaseButton = ButtonInteraction;
export type BaseAutoComplete = AutoCompleteInteraction;
export type BaseContext = ContextInteraction;
export type BaseModal = ModalInteraction;
export type BaseSelect = SelectInteraction;
export type InteractionData = RESTPostAPIApplicationCommandsJSONBody
