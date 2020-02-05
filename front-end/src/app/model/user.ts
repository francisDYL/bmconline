import {Project} from './project';

export interface User {
	email?: string;
	lastName?: string;
	firstName?: string;
	password?: string;
	contacts?: string;
	projects?: Project[];
}
