import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule} from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'

import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { AlarmDialogComponent } from './shared/dialogs/alarmDialog/alarmDialog.component'
import { AddNewLoansDialogComponent } from './shared/dialogs/addNewLoansDialog/addNewLoansDialog.component'
import { GraphDisplayComponent } from './shared/components/graphDisplay/graphDisplay.component';
import { ConfirmDialogComponent } from './shared/dialogs/confirmDialog/confirmDialog.component'
import { EditRawDataDialogComponent } from './shared/dialogs/editRawDataDialog/editRawDataDialog.component'

import { ExpensesByYearModule } from './expensesByYear/expensesByYear.module';
import { LoansModule } from './loans/loans.module';
import { NewInputModule } from './newInput/newInput.module';
import { RawDataModule } from './rawData/rawData.module';
import { SummaryModule } from './summary/summary.module';
import { SharedModule } from './shared/shared.module';
import { LoginDialogComponent } from './shared/dialogs/loginDialog/loginDialog.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';

import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { FacebookLoginProvider } from "angularx-social-login";
import { ErrorDialogComponent } from './shared/dialogs/errorDialog/errorDialog.component';

export function provideConfig() {
  let config = new AuthServiceConfig([
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider("579312869354727")
    }
  ]);
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ChartsModule,
    ExpensesByYearModule,
    LoansModule,
    NewInputModule,
    RawDataModule,
    SummaryModule,
    SharedModule,
    SocialLoginModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AddNewLoansDialogComponent,
    GraphDisplayComponent,
    ConfirmDialogComponent,
    EditRawDataDialogComponent,
    AlarmDialogComponent,
    LoginDialogComponent,
    ErrorDialogComponent
  ]
})
export class AppModule { }
