/**
 * Home selectors
 */

import { createSelector } from "reselect";

const selectLoans = state => state.loans;

const makeReadLimitList = () =>
  createSelector(
    selectLoans,
    loansState => loansState.readLimitList
  );


export { selectLoans, makeReadLimitList };
