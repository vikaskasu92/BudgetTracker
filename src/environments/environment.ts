// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  purchaseDataStoreURL:"http://localhost:5000/budgetTrackerDataStore/savePurchaseData",
  updatePurchaseDataStoreURL:"http://localhost:5000/budgetTrackerDataStore/updatePurchaseData",
  deletePurchaseDataStoreURL:"http://localhost:5000/budgetTrackerDataStore/deletePurchaseData",
  incomeDataStoreURL:"http://localhost:5000/budgetTrackerDataStore/saveIncomeData",
  updateIncomeDataStoreURL:"http://localhost:5000/budgetTrackerDataStore/updateIncomeData",
  deleteIncomeDataStoreURL:"http://localhost:5000/budgetTrackerDataStore/deleteIncomeData",
  insuranceDataStoreURL:"http://localhost:5000/budgetTrackerDataStore/saveInsuranceData",
  updateInsuranceDataStoreURL:"http://localhost:5000/budgetTrackerDataStore/updateInsuranceData",
  deleteInsuranceDataStoreURL:"http://localhost:5000/budgetTrackerDataStore/deleteInsuranceData",
  addNewLoansDataStoreURL:"http://localhost:5000/budgetTrackerDataStore/saveNewLoansData",
  updateLoanInDB:"http://localhost:5000/budgetTrackerDataStore/updateLoansData",
  closeLoanFromDB:"http://localhost:5000/budgetTrackerDataStore/closeLoan",
  reOpenLoanFromDB:"http://localhost:5000/budgetTrackerDataStore/reOpenLoan",
  deleteLoanFromDB:"http://localhost:5000/budgetTrackerDataStore/deleteLoanFromDB",
  createNewBudgetAlarmInDB:"http://localhost:5000/budgetTrackerDataStore/createNewBudgetAlarmInDB",
  deleteBudgetAlarmFromDB:"http://localhost:5000/budgetTrackerDataStore/deleteBudgetAlarmFromDB",
  incomeExpenseSummary:"http://localhost:5000/RetrieveBudgetTrackerData/retrieveIncomeExpenseSummary",
  yearlyExpenseSummary:"http://localhost:5000/RetrieveBudgetTrackerData/retrieveYearlyExpenseSummary",
  pendingLoansSummary:"http://localhost:5000/RetrieveBudgetTrackerData/retrievePendingLoansSummary",
  categoriesExpensesSummary:"http://localhost:5000/RetrieveBudgetTrackerData/retrieveCategoriesExpenseSummary",
  yearByYearCategoryExpense:"http://localhost:5000/RetrieveBudgetTrackerData/retrieveYearByYearCategoryExpense",
  openClosedLoans:"http://localhost:5000/RetrieveBudgetTrackerData/retrieveOpenClosedLoans",
  getAllInvestments:"http://localhost:5000/RetrieveBudgetTrackerData/retrieveAllInvestments",
  getAllYearsForCustomers:"http://localhost:5000/RetrieveBudgetTrackerData/retrieveAllYearsForCustomer",
  getRawDataByDate:"http://localhost:5000/RetrieveBudgetTrackerData/retrieveRawDataByDate",
  getRawDataByInputAndDate:"http://localhost:5000/RetrieveBudgetTrackerData/retrieveRawDataByInputAndDate",
  getAllAlarms:"http://localhost:5000/RetrieveBudgetTrackerData/retrieveAllAlarms",
  checkAndInitiateAlarms:"http://localhost:5000/RetrieveBudgetTrackerData/checkAndInitiateAlarm"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.