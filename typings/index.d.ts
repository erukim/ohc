import {
  ClientOptions,
  Message,
  ShardingManagerOptions,
} from 'discord.js';
import { NodeOptions } from 'erela.js';

export type LevelType = 'fatal' | 'error' | 'warn' | 'info' | 'verbose' | 'debug' | 'chat';

export type EmbedType = 'default' | 'error' | 'success' | 'warn' | 'info';

export type Working = 'dev' | 'Stable'

export type EventsRole = 'GuildLevelRole' | 'GuildMemberAdd'
export type Server_Member_InfoSend_Set = 'GuildMemberAdd' | 'GuildMemberRemove'
export type Server_Member_InfoSend_Type = 'content' | 'embed'

export interface ErrorReportOptions {
  executer:
  | Message<true>
  | ChatInputCommandInteraction<'cached'>
  | ContextMenuCommandInteraction<'cached'>
  | AnySelectMenuInteraction<'cached'>
  | ButtonInteraction<'cached'>
  | ModalSubmitInteraction<'cached'>
  | undefined;
  isSend?: boolean;
  commands;
  type: '버튼' | '슬래시 커맨드' | '자동완성' | '앱커맨드' | '메시지 커맨드' | '모달' | '셀렉트 메뉴';
}

export interface EditReportOptions {
  executer:
  | Message<true>
  | ChatInputCommandInteraction<'cached'>
  | ContextMenuCommandInteraction<'cached'>
  | AnySelectMenuInteraction<'cached'>
  | ButtonInteraction<'cached'>
  | ModalSubmitInteraction<'cached'>
  | undefined;
  isSend?: boolean;
  commands;
  type: '커스텀 임베드' | '커스텀 임베드 수정' | '뮤직' | '음원차트' | '전적';
}

export interface IData {
  clientId: string;
  token: string;
  database: {
    id: string;
    password: string;
    folder: string;
    cluster: number;
    code: string;
  };
  prefix: string;
  Secret: string;
}

export interface IConfig {
  BUILD_VERSION: string;
  BUILD_NUMBER: string | null;
  bot: {
    sharding: boolean;
    shardingOptions?: ShardingManagerOptions;
    options: ClientOptions;
    token: string;
    owners: string[];
    prefix: string;
    dok: string;
    aliases: string[];
    cooldown?: number;
  };
  Github: {
    repository: string;
    githubToken: string;
  }
  logger: {
    img: string;
    level: LevelType;
    dev: boolean;
    console_log: string;
    command_log: string;
  };
  database: {
    type: 'mongodb';
    url: string;
    options: any;
  };
  devGuild: string,
  botsite?: {
    clientid: string;
    serverid: string;
    koreanbots: {
      bot: string;
      server?: string | null;
    };
    archive: {
      bot: string;
      server?: string | null;
    };
  };
}

export interface IEmoji {
  체크: string;
  엑스: string;
  로딩: string;
}

export interface AutoCompleteOutData {
  name: string;
  value: string;
}

export interface ShardData {
  id: number
  ping: number
  guilds: number
  users: number
  channels: number
  uptime: number
  status: string
}

export interface NpmModule {
  name: string;
  version: string;
  description: string;
}

export interface NpmSearchData {
  name: string;
  scope: string;
  version: string;
  description: string;
  keywords: string[],
  date: string;
  links: {
    npm: string;
  },
  author: {
    name: string;
  };
  publisher: {
    username: string;
    email: string;
  },
  maintainers: [[object]]
}

export interface NpmPackageData {
  downloads: number;
}

export interface NpmMaintainer {
  name: string;
  email: string;
}

export interface NpmVersion {
  name: string;
  version: string;
  description: string;
  main: string;
  scripts: {
    test: string;
  };
  repository: {
    type: string;
    url: string;
  };
  keywords: string[];
  author: {
    name: string;
    email: string;
  };
  license: string;
  bugs: {
    url: string;
  };
  homepage: string;
  dependencies: {
    [key: string]: string;
  };
  gitHead: string;
  _id: string;
  _shasum: string;
  _from: string;
  _npmVersion: string;
  _nodeVersion: string;
  _npmUser: {
    name: string;
    email: string;
  };
  dist: {
    shasum: string;
    tarball: string;
    integrity: string;
    signatures: {
      keyid: string;
      sig: string;
    }[];
  };
  maintainers: NpmMaintainer[];
  directories: Record<string, never>;
  deprecated: string;
}

export interface NpmModuleInfo {
  _id: string;
  _rev: string;
  name: string;
  time: {
    modified: string;
    created: string;
    [version: string]: string;
  };
  maintainers: NpmMaintainer[];
  "dist-tags": {
    latest: string;
    dev: string;
  };
  description: string;
  readme: string;
  versions: {
    [version: string]: NpmVersion;
  };
  homepage: string;
  keywords: string[];
  repository: {
    type: string;
    url: string;
    directory: string;
  };
  bugs: {
    url: string;
  };
  license: string;
  readmeFilename: string;
  users: Record<string, boolean>;
  contributors: string[];
}
