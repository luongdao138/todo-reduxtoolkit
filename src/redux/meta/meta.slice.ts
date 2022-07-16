import { AnyAction, createAction } from '@reduxjs/toolkit';
import _ from 'lodash';

export enum METADATA_ACTION_TYPE {
  CLEAR_METADATA = 'meta/metadata/clear'
}

export interface Meta {
  pending: boolean;
  loaded: boolean;
  error: boolean | Record<string, any>;
}

type MetaState = Record<string, Meta>;
const initialMetaState: MetaState = {};

const metaReducer = (state = initialMetaState, action: AnyAction): MetaState => {
  let updated = {};
  const actionType = action.type.split('/').slice(-1)[0]; // pending, fulfilled, rejected
  const actionName = action.type.replace(`/${actionType}`, '');

  switch (actionType) {
    case 'pending':
      updated = {
        pending: true,
        loaded: false,
        error: false
      };
      break;
    case 'fulfilled':
      updated = {
        loaded: true,
        pending: false,
        error: false
      };
      break;
    case 'rejected':
      updated = {
        loaded: false,
        pending: false,
        error: action.payload?.error || action.error
      };
      break;
    case 'clear':
      if (action.payload) {
        return _.omit(state, action.payload);
      }

      return {};
    default:
      return state;
  }

  return {
    ...state,
    [actionName]: updated
  };
};

export const clearMetaData = createAction<string | undefined>(METADATA_ACTION_TYPE.CLEAR_METADATA);
export default metaReducer;
