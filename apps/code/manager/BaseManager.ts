import BotClient from '../base/BotClient';

export default class BaseManager {
  public client: BotClient;

  constructor(client: BotClient) {
    this.client = client;
  }
}
