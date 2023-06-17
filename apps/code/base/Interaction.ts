import {
  AutocompleteInteraction,
  ButtonInteraction,
  ContextMenuCommandInteraction,
  ModalSubmitInteraction,
  AnySelectMenuInteraction
} from 'discord.js'
import { BaseInteractionFunction, InteractionData } from '../../../typings/structures'
import { InteractionType } from '../../utils/Constants'

export class Button {
  public type: InteractionType.Button = InteractionType.Button
  constructor(
    public customId: string | string[],
    public run: BaseInteractionFunction<ButtonInteraction<'cached'>>
  ) { }
}

export class SelectMenu {
  public type: InteractionType.Select = InteractionType.Select
  constructor(
    public customId: string | string[],
    public run: BaseInteractionFunction<AnySelectMenuInteraction<'cached'>>
  ) { }
}

export class ContextMenu {
  public type: InteractionType.ContextMenu = InteractionType.ContextMenu
  constructor(
    public customId: string | string[],
    public data: InteractionData,
    public run: BaseInteractionFunction<
      ContextMenuCommandInteraction<'cached'>
    >
  ) { }
}

export class Modal {
  public type: InteractionType.Modal = InteractionType.Modal
  constructor(
    public customId: string | string[],
    public run: BaseInteractionFunction<ModalSubmitInteraction<'cached'>>
  ) { }
}

export class AutoComplete {
  public type: InteractionType.AutoComplete = InteractionType.AutoComplete
  constructor(
    public customId: string | string[],
    public run: BaseInteractionFunction<AutocompleteInteraction<'cached'>>
  ) { }
}

export type BaseInteraction =
  | Button
  | SelectMenu
  | ContextMenu
  | Modal
  | AutoComplete
