export interface IRegister {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  city: string;
  help_types: HelpTypes[];
  help_formats: HelpFormats[];
}

export enum HelpTypes {
  PSYCHO = 'PSYCHO',
  FINANCIAL = 'FINANCIAL',
  VOLUNTEER = 'VOLUNTEER'
}
export enum HelpFormats {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE'
}
