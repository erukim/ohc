import { EventsRole, Server_Member_InfoSend_Set, Server_Member_InfoSend_Type } from ".";

export interface Example {
  serverid: string;
}

export interface Bot_User_Ticket {
  userid: string;
  channelid: string;
  webhook: string;
}

export interface Server_Embed {
  serverid: string;
  id: string;
  name: string;
  embeds: {
    color: string;
    title: string;
    url: string;
    author: {
      name: string;
      icon_url: string;
      url: string;
    };
    description: string;
    thumbnail: string;
    fields: Array;
    image: string;
    timestamp: boolean;
    footer: {
      text: string;
      icon_url: string;
    }
  }
}

export interface Server_Command {
  serverid: string;
  id: string;
  prefix: string;
  type: string;
  command: string;
  command_msg: string;
}

export interface LowFixMessage {
  serverid: string;
  channelid: string;
  msgid: string;
  msg_title: string;
  msg_description: string;
  id: string;
}

export interface SYConfig {
  status: string
}

export interface Music_Channel_Setup {
  guildid: string;
  channelid: string;
  messageid_list: string;
  messageid_banner: string;
}

export interface Music_Setting {
  serverid: string;
  Volume: string;
  Repeat: string;
  Shuffle: string;
  AutoMode: string;
  Filter: string;
}

export interface Music_PlayList_Guild {
  serverid: string;
  userid: string;
  id: string;
  name: string;
  description: string;
  list: Array;
}

export interface Music_PlayList {
  userid: string;
  id: string;
  name: string;
  description: string;
  list: Array;
}

export interface Server_Prefix {
  guildid: string;
  prefix: string;
}

export interface Mora_Chat {
  userid: string;
  id: string;
  단어: string;
  뜻: string;
  등록일: string;
}

export interface Server_Log {
  serverid: string;
  AllChannel: string;
  type: {
    Message: {
      Delete_Bulk: {
        active: boolean;
        send: string;
      },
      react_all_remove: {
        active: boolean;
        send: string;
      },
      react_remove: {
        active: boolean;
        send: string;
      },
      Add_Response: {
        active: boolean;
        send: string;
      },
      Delete: {
        active: boolean;
        send: string;
      },
      Edit: {
        active: boolean;
        send: string;
      },
    },
    Boost: {
      User_Server_Boost: {
        active: boolean;
        send: string;
      },
    },
    Server_Manager: {
      System_Channel: {
        active: boolean;
        send: string;
      },
      Banner: {
        active: boolean;
        send: string;
      },
      Boost_Edit: {
        active: boolean;
        send: string;
      },
      Owner_Edit: {
        active: boolean;
        send: string;
      },
      Name_Edit: {
        active: boolean;
        send: string;
      },
      Diving_Time_Edit: {
        active: boolean;
        send: string;
      },
      Diving_Channel_Edit: {
        active: boolean;
        send: string;
      },
      invite_Link_Edit: {
        active: boolean;
        send: string;
      },
    },
    Role: {
      Delete: {
        active: boolean;
        send: string;
      },
      Create: {
        active: boolean;
        send: string;
      },
      Remove: {
        active: boolean;
        send: string;
      },
      Add: {
        active: boolean;
        send: string;
      },
    },
    User: {
      Server_Out: {
        active: boolean;
        send: string;
      },
      NickName_Edit: {
        active: boolean;
        send: string;
      },
      Server_In: {
        active: boolean;
        send: string;
      },
      Ban: {
        active: boolean;
        send: string;
      },
      Kick: {
        active: boolean;
        send: string;
      },
      UnBan: {
        active: boolean;
        send: string;
      },
    },
    Voice: {
      In: {
        active: boolean;
        send: string;
      },
      Out: {
        active: boolean;
        send: string;
      },
    },
    Emoji: {
      Delete: {
        active: boolean;
        send: string;
      },
      Create: {
        active: boolean;
        send: string;
      },
      Edit: {
        active: boolean;
        send: string;
      },
    },
    Channel: {
      Pin: {
        active: boolean;
        send: string;
      },
      Delete: {
        active: boolean;
        send: string;
      },
      Create: {
        active: boolean;
        send: string;
      },
      Edit: {
        active: boolean;
        send: string;
      },
    },
    Invite: {
      Code_Usage_Log: {
        active: boolean;
        send: string;
      },
      Delete: {
        active: boolean;
        send: string;
      },
      Create: {
        active: boolean;
        send: string;
      },
    },
    Mora: {
      Word: {
        active: boolean;
        send: string;
      },
      Certified: {
        active: boolean;
        send: string;
      },
      Ticket: {
        active: boolean;
        send: string;
      },
      Warn: {
        active: boolean;
        send: string;
      },
    }
  }
}

export interface VetCount {
  userid: string;
  count: string;
}

export interface Attendance {
  count: number;
  guildid: string;
  userid: string;
  date: string;
}

export interface Money {
  serverid: string;
  servername: string;
  money: number
  userid: string;
  date: string;
}

export interface Server_User_Ticket {
  serverid: string;
  userid: string;
  channelid: string;
  boolean: boolean;
}

export interface Sy_Command {
  serverid: string;
  command: string;
  Activation: string;
}

export interface Authentication {
  guildId: string;
  channelId: string;
  roleId: string;
}

export interface Level_Send {
  boolean: boolean,
  serverid: string,
  send: boolean,
  type: string,
  channelid: string,
  content: string,
}

export interface Word {
  serverid: string;
  금지어: string;
  온오프: string;
}

export interface Event_Role {
  serverid: string;
  set: [
    {
      events: EventsRole;
      webhook: string;
      roleid: string;
      level?: number;
    }
  ]
}

export interface Link_Vet {
  boolean: boolean;
  serverid: string;
  userid: string;
  usertag: string;
  검열방식: string;
  삭제여부: string;
}

export interface Link_NotVet {
  userid: string;
  channelid: string;
}

export interface AUTO_Thread {
  serverid: string;
  channelid: string;
  chname: string;
  userid: string;
  usertag: string;
}

export interface Certified {
  guildId: string;
  channelId: string;
  roleId: string;
}

export interface Minimum_subscription_date {
  serverid: string;
  count: number;
}

export interface Mora_Member {
  user: string;
  date: string;
}

export interface Server_Vet {
  userid: string;
  guildid: string;
}

export interface AutoRole {
  serverid: string;
  roleid: string;
  buttonid: string;
  log: string;
}

export interface Server_User_Custom_Ticket {
  serverid: string;
  roleid: string[];
  channelid: string;
  name: string;
  description: string;
  ticketid: string;
}

export interface Server_Vet_Not {
  channelid: string;
}

export interface Server_Vet_Log {
  boolean: boolean;
  guildid: string;
  channelid: string;
}

export interface Server_Member_InfoSend {
  boolean: boolean;
  serverid: string;
  channelid: string;
  set: Server_Member_InfoSend_Set;
  message: {
    type: Server_Member_InfoSend_Type;
    content: string;
    embed: {
      author: string;
      author_url: string;
      title: string;
      title_url: string;
      description: string;
      footer: string;
    },
  },
  imgs: string;
}

export interface CreateAtUser {
  serverid: string;
  count: number;
}

export interface Mora_Chat_Not {
  userid: string;
  처리날자: string;
  단어: string;
  사유: string;
}

export interface Warn {
  GuildId: string;
  UserId: string;
  UserTag: string;
  Content: [{
    ExecuteId: string;
    ExecuterTag: string;
    ExecuterAvatar: string;
    Reason: string;
    Date: string;
  }];
}

export interface Voice_Channel_Create {
  serverid: string;
  channelid: string;
  msg: string;
}

export interface Server_Status {
  serverid: string;
  type: 'Voice' | 'Bot' | 'User' | 'All'
  channelid: string;
  name: string;
  count: number;
}