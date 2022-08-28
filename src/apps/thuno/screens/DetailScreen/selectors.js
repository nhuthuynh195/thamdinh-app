/**
 * Detail selectors
 */

import { createSelector } from "reselect";

const selectLoans = state => state.loans;

const makeSelectDetailLoans = () =>
  createSelector(
    selectLoans,
    loansState => loansState.detailLoans
  );

const makeRepayment = () =>
  createSelector(
    selectLoans,
    loansState => loansState.makeRepayment
  );

const makeReadLimitList = () =>
  createSelector(
    selectLoans,
    loansState => loansState.readLimitList
  );

const makeCollectLoanFailed = () =>
  createSelector(
    selectLoans,
    loansState => loansState.collectLoanFailed
  );

const makeUploadAudio = () =>
  createSelector(
    selectLoans,
    loansState => loansState.uploadAudio
  );

export {
  selectLoans,
  makeReadLimitList,
  makeSelectDetailLoans,
  makeUploadAudio,
  makeRepayment,
  makeCollectLoanFailed
};
