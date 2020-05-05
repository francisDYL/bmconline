import { Note } from './note';

export interface Project {
	uid?: string;
	name?: string;
	owner?: string;
	state?: string;
	users?: string[]
}
