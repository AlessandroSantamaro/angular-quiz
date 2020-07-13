import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgCircleProgressModule} from 'ng-circle-progress';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LoaderInterceptor} from './shared/interceptor/loader.interceptor';
import {ErrorHttpInterceptor} from './shared/interceptor/error-http.interceptor';
import {AppHttpInterceptor} from './shared/interceptor/app-http.interceptor';
import {MockHttpInterceptor} from './shared/interceptor/mock-http.interceptor';

import {AppComponent} from './app.component';
import {QuizComponent} from './quiz/quiz.component';
import {HomeComponent} from './home/home.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {ModalComponent} from './shared/components/modal/modal.component';
import {AboutComponent} from './about/about.component';
import {QuestionComponent} from './shared/components/question/question.component';
import {OutcomeComponent} from './outcome/outcome.component';

@NgModule({
  declarations: [
    QuizComponent,
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ModalComponent,
    AboutComponent,
    QuestionComponent,
    OutcomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    NgbModule,
    NgCircleProgressModule.forRoot({
      radius: 100,
      outerStrokeWidth: 8,
      innerStrokeWidth: 3,
      outerStrokeColor: '#78c000',
      innerStrokeColor: '#c7e596',
      animationDuration: 0,
      showSubtitle: false
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHttpInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MockHttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
