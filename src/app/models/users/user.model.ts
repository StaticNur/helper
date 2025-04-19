import {HelpFormats, HelpTypes} from '../auth/register.model';

export interface IUser {
  id: string;
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  city: string;
  help_types: HelpTypes[];
  help_formats: HelpFormats[];
}
