import { Component } from '@angular/core';
import {
  GoogleLoginProvider,
  SocialAuthService,
} from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../core/services/auth-service';
import { get } from 'lodash';

@Component({
  selector: 'app-my-drive',
  templateUrl: './my-drive.component.html',
  styleUrls: ['./my-drive.component.scss'],
})
export class MyDriveComponent {
  files: any[];
  nextPageToken = '';
  fileId: string;
  result = '';

  constructor(
    private socialAuthService: SocialAuthService,
    private httpClient: HttpClient,
    private authService: AuthService,
  ) {
    this.files = [];
    this.fileId = '';
  }

  refreshToken(): void {
    this.socialAuthService
      .refreshAuthToken(GoogleLoginProvider.PROVIDER_ID)
      .then(() => {});
  }

  getToken() {
    this.socialAuthService
      .getAccessToken(GoogleLoginProvider.PROVIDER_ID)
      .then((accessToken) => {
        this.authService.setLocalToken(accessToken);
      });
  }

  getGoogleDriveData(): void {
    this.httpClient
      .get(
        `https://www.googleapis.com/drive/v3/files?q=fullText contains '.txt'`,
        {
          headers: {
            Authorization: `Bearer ${this.authService.getLocalToken()}`,
          },
        },
      )
      .subscribe((events) => {
        this.files = get(events, 'files') || [];
        this.nextPageToken = get(events, 'nextPageToken') || '';
        console.log('events', events);
      });
  }

  loadNextPage() {
    this.httpClient
      .get(
        `https://www.googleapis.com/drive/v3/files?q=fullText contains '.txt'&nextPageToken=${this.nextPageToken}`,
        {
          headers: {
            Authorization: `Bearer ${this.authService.getLocalToken()}`,
          },
        },
      )
      .subscribe((events) => {
        const nextFiles = get(events, 'files') || [];
        this.files = [...this.files, ...nextFiles];
        this.nextPageToken = get(events, 'nextPageToken') || '';
        console.log('events', events);
      });
  }

  setFileId(id: string) {
    this.fileId = id;
  }

  getFileData(): void {
    this.httpClient
      .get(
        `https://www.googleapis.com/drive/v3/files/${this.fileId}?alt=media`,
        {
          headers: {
            Authorization: `Bearer ${this.authService.getLocalToken()}`,
          },
        },
      )
      .subscribe(
        (events) => {
          console.log('events', events);
        },
        (err) => {
          console.log('err', err);
          this.result = get(err, 'error.text') || 'no data';
        },
      );
  }

  updateFile() {
    this.httpClient.patch(
      `https://www.googleapis.com/upload/drive/v3/files/${this.fileId}`,
      {
        headers: {
          Authorization: `Bearer ${this.authService.getLocalToken()}`,
        },
        params: {
          uploadType: 'media',
        },
        body: this.result,
      },
    );
  }
}
