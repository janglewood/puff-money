import {createRealmContext} from '@realm/react';
import {Record} from './models/Record';

export const RecordRealmContext = createRealmContext({
  schema: [Record],
  schemaVersion: 16,
});
