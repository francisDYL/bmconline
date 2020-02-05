import { Note } from './note';
import { User } from './user';

export interface Project {
	name?: string;
	owner?: string;
	keyPartners?: Note[];
	keyActivities?: Note[];
	keyRessources?: Note[];
	valueProposition?: Note[];
	customers?: Note[];
	channel?: Note[];
	customerSegment?: Note[];
	costStructure?: Note[];
	revenueStream?: Note[];
	users?: User[];
}
