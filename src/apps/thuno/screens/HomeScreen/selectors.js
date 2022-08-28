/**
 * Home selectors
 */

import { createSelector } from "reselect";

const selectLoans = state => state.loans;
const selectLocation = state => state.map;
const selectApp = state => state.app;

const makeSelectListLoans = () =>
  createSelector(
    selectLoans,
    loansState => loansState.listLoans
  );

const makeListLoansUnCollected = () =>
  createSelector(
    selectLoans,
    loansState => loansState.listLoansUnCollected
  );

const makeReadLimitList = () =>
  createSelector(
    selectLoans,
    loansState => loansState.readLimitList
  );

const makeGetLocation = () =>
  createSelector(
    selectLocation,
    locationState => locationState.yourLocation
  );

const makeSortListLoans = () =>
  createSelector(
    selectLoans,
    selectLoans => selectLoans.sortListLoans
  );

const makeSortListLoansCollection = () =>
  createSelector(
    selectLoans,
    selectLoans => selectLoans.sortListLoansCollection
  );

const makeSelectStatusPrinter = () =>
  createSelector(
    selectApp,
    selectApp => selectApp.isConnectPrinter
  );

export {
  selectLoans,
  makeSelectListLoans,
  makeListLoansUnCollected,
  makeReadLimitList,
  makeGetLocation,
  makeSortListLoans,
  makeSortListLoansCollection,
  makeSelectStatusPrinter
};
