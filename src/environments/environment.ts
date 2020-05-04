// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  purchaseDataStoreURL:"http://localhost:8080/budgetTrackerDataStore/savePurchaseData",
  updatePurchaseDataStoreURL:"http://localhost:8080/budgetTrackerDataStore/updatePurchaseData",
  deletePurchaseDataStoreURL:"http://localhost:8080/budgetTrackerDataStore/deletePurchaseData",
  incomeDataStoreURL:"http://localhost:8080/budgetTrackerDataStore/saveIncomeData",
  insuranceDataStoreURL:"http://localhost:8080/budgetTrackerDataStore/saveInsuranceData",
  updateInsuranceDataStoreURL:"http://localhost:8080/budgetTrackerDataStore/updateInsuranceData",
  addNewLoansDataStoreURL:"http://localhost:8080/budgetTrackerDataStore/saveNewLoansData",
  closeLoanFromDB:"http://localhost:8080/budgetTrackerDataStore/closeLoan",
  deleteLoanFromDB:"http://localhost:8080/budgetTrackerDataStore/deleteLoanFromDB",
  incomeExpenseSummary:"http://localhost:8081/RetrieveBudgetTrackerData/retrieveIncomeExpenseSummary?username=vikas",
  yearlyExpenseSummary:"http://localhost:8081/RetrieveBudgetTrackerData/retrieveYearlyExpenseSummary?username=vikas",
  pendingLoansSummary:"http://localhost:8081/RetrieveBudgetTrackerData/retrievePendingLoansSummary?username=vikas",
  categoriesExpensesSummary:"http://localhost:8081/RetrieveBudgetTrackerData/retrieveCategoriesExpenseSummary?username=vikas",
  yearByYearCategoryExpense:"http://localhost:8081/RetrieveBudgetTrackerData/retrieveYearByYearCategoryExpense?username=vikas",
  openClosedLoans:"http://localhost:8081/RetrieveBudgetTrackerData/retrieveOpenClosedLoans?username=vikas",
  getAllInvestments:"http://localhost:8081/RetrieveBudgetTrackerData/retrieveAllInvestments?username=vikas",
  getAllYearsForCustomers:"http://localhost:8081/RetrieveBudgetTrackerData/retrieveAllYearsForCustomer?username=vikas",
  getRawDataByInput:"http://localhost:8081/RetrieveBudgetTrackerData/retrieveRawDataByInput?username=vikas",
  getRawDataByDate:"http://localhost:8081/RetrieveBudgetTrackerData/retrieveRawDataByDate?username=vikas",
  getRawDataByInputAndDate:"http://localhost:8081/RetrieveBudgetTrackerData/retrieveRawDataByInputAndDate?username=vikas"
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