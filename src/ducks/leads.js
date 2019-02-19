import * as leadsImport from '../services/leads-service';

const LEADS = 'LEADS';
const LEADS_PENDING = 'LEADS_PENDING';
const LEADS_FULFILLED = 'LEADS_FULFILLED';

const initialState = {
  leads: [],
  loading: false
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case LEADS_PENDING:
      return Object.assign({}, state, {loading: true})

    case LEADS_FULFILLED:
      return Object.assign({}, state, {loading: false, leads: action.payload})

    default:
      return state
  }
}

export function getLeads(user) {
  return {
    type: LEADS,
    payload: leadsImport.getLeads(user)
  }
}