import Realm from 'realm';

export class Record extends Realm.Object<Record> {
  _id!: string;
  amount!: number;
  date: Date = new Date();
  note?: string;
  categoryId!: string;

  static schema = {
    name: 'Record',
    properties: {
      _id: 'string',
      amount: {type: 'int'},
      date: {type: 'date', indexed: true},
      note: {type: 'string', optional: true},
      categoryId: {type: 'string', indexed: true},
    },
    primaryKey: '_id',
  };
}

// Realm.open({}).then(realm => {
//   console.log('Realm is located at: ' + realm.path);
// });
