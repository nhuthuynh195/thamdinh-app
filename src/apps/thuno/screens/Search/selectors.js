/**
 * Search selectors
 */

import { createSelector } from "reselect";

const selectLoans = state => state.loans;
const selectLocation = state => state.map;

// const makeSelectListLoans = () =>
//   createSelector(
//     selectLoans,
//     loansState => loansState.listLoans
//   );

// const makeListLoansUnCollected = () =>
//   createSelector(
//     selectLoans,
//     loansState => loansState.listLoansUnCollected
//   );

// const makeReadLimitList = () =>
//   createSelector(
//     selectLoans,
//     loansState => loansState.readLimitList
//   );

const makeGetLocation = () =>
  createSelector(
    selectLocation,
    locationState => locationState.yourLocation
  );

const makeSortListLoansSearch = () =>
  createSelector(
    selectLoans,
    selectLoans => selectLoans.sortListLoansSearch
  );

const makeSortListLoansCollectionSearch = () =>
  createSelector(
    selectLoans,
    selectLoans => selectLoans.sortListLoansCollectionSearch
  );

const makeListLoansUnCollectedSearch = () =>
  createSelector(
    selectLoans,
    selectLoans => selectLoans.listLoansUnCollectedSearch
  );

export {
  selectLoans,
  makeListLoansUnCollectedSearch,
  makeSortListLoansSearch,
  makeSortListLoansCollectionSearch,
  // makeSelectListLoans,
  // makeListLoansUnCollected,
  // makeReadLimitList,
  makeGetLocation
  // makeSortListLoans,
  // makeSortListLoansCollection
};
