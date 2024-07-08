import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  GoogleSigninButtonModule,
  SocialLoginModule,
} from '@abacritt/angularx-social-login';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { FlexModule } from '@angular/flex-layout';
import { MatListModule } from '@angular/material/list';
import { SocialLoginService } from './core/services/social-login-service';
import { HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule } from "@angular/material/core";
import { ConfirmationDialogComponent } from './shared/comfirmation.dialog/confirmation-dialog.component';
import { MatDialogModule } from "@angular/material/dialog";

export function AppConfigServiceFactory(
  configService: SocialLoginService,
): () => void {
  return async () => await configService.load();
}

@NgModule({
  declarations: [AppComponent, ConfirmationDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocialLoginModule,
    GoogleSigninButtonModule,
    BrowserAnimationsModule,
    FlexModule,
    HttpClientModule,

    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatNativeDateModule,
    MatDialogModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: AppConfigServiceFactory,
      deps: [SocialLoginService],
      multi: true,
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: new Promise(async (resolve) => {
        const config = await SocialLoginService.fetchConfig();
        resolve(config);
      }),
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
