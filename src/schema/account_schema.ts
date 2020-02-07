import { schema } from 'normalizr';

export const accountSchema = new schema.Entity('account', {

}, {
  idAttribute: 'id',
});
