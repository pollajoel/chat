import { start as Startserver } from './src/services/server.services';
import { dbConnect as dbservice}from './src/services/mongoose.services';

dbservice();
Startserver();