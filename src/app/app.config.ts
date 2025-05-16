import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import {environment} from '../environments/environment';
import {provideFirebaseApp} from '@angular/fire/app';
import initializeApp = firebase.initializeApp;
import {getAuth, provideAuth} from '@angular/fire/auth';
import firebase from 'firebase/compat/app';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
  ]
};
