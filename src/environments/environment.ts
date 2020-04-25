// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  purchaseDataStoreURL:"https://localhost:8080/savePurchaseData",
  incomeDataStoreURL:"https://localhost:8080/saveIncomeData",
  insuranceDataStoreURL:"https://localhost:8080/saveInsuranceData",
  addNewLoansDataStoreURL:"https://localhost:8080/saveNewLoansData",
  incomeExpenseSummary:"http://localhost:8080/RetrieveBudgetTrackerData/retrieveIncomeExpenseSummary?username=vikas&fromDate=1992-01-01&toDate=1992-12-31",
  yearlyExpenseSummary:"http://localhost:8080/RetrieveBudgetTrackerData/retrieveYearlyExpenseSummary?username=vikas&fromDate=1992-01-01&toDate=1999-12-31",
  pendingLoansSummary:"http://localhost:8080/RetrieveBudgetTrackerData/retrievePendingLoansSummary?username=vikas",
  categoriesExpensesSummary:"http://localhost:8080/RetrieveBudgetTrackerData/retrieveCategoriesExpenseSummary?username=vikas&category=food&subCategory=grocery",
  yearByYearCategoryExpense:"http://localhost:8080/RetrieveBudgetTrackerData/retrieveYearByYearCategoryExpense?username=vikas",
  openClosedLoans:"http://localhost:8080/RetrieveBudgetTrackerData/retrieveOpenClosedLoans?username=vikas",
  getAllInvestments:"http://localhost:8080/RetrieveBudgetTrackerData/retrieveAllInvestments?username=vikas",
  getAllYearsForCustomers:"http://localhost:8080/RetrieveBudgetTrackerData/retrieveAllYearsForCustomer?username=vikas"
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