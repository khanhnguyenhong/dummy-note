import {
  GoogleLoginProvider,
  SocialAuthServiceConfig,
} from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { ApiService } from './api.services';

@Injectable({
  providedIn: 'root',
})
export class SocialLoginService {
  static config: any | null = null;

  constructor(private apiService: ApiService) {}

  static fetchConfig() {
    return new Promise<any>(async (resolve, reject) => {
      const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
      const waitFor = async function waitFor(f: any) {
        while (!f()) await sleep(500);
        return f();
      };
      await waitFor(() => {
        return SocialLoginService?.config;
      });

      resolve(SocialLoginService.config);
    });
  }

  async load(): Promise<any> {
    try {
      return new Promise<any>((resolve, reject) => {
        this.apiService.getClientId().subscribe({
          next: (res) => {
            const { clientId } = res;
            if (!clientId) {
              console.warn('ClientId not found in config.json');
            }
            const config = {
              autoLogin: false,
              providers: [
                {
                  id: GoogleLoginProvider.PROVIDER_ID,
                  provider: new GoogleLoginProvider(clientId, {
                    oneTapEnabled: false,
                    scopes: [
                      'https://www.googleapis.com/auth/drive',
                      'https://www.googleapis.com/auth/drive.activity',
                    ],
                  }),
                },
              ],
              onError: (err) => {
                console.error(err);
              },
            } as SocialAuthServiceConfig;

            SocialLoginService.config = config;
            resolve(config);
          },
          error: (err) => {
            console.error('Error fetching clientId', err);
            reject(err);
          }
        });
      });
    } catch (error) {
      console.log('Error loading SocialLoginService', error);
      throw error;
    }
  }
}
