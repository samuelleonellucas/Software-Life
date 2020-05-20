import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { SidebarModule } from 'ng-sidebar';
import { HttpClientModule } from '@angular/common/http';
import { ProfessorComponent } from './professor/professor.component';
import { DisciplinaComponent } from './disciplina/disciplina.component';
import { AlunoComponent } from './aluno/aluno.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { AlunoEditComponent } from './aluno-edit/aluno-edit.component';
import { ToastrModule } from 'ngx-toastr';
import { LoaderComponent } from './loader/loader.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProfessorEditComponent } from './professor-edit/professor-edit.component';
import { DisciplinaEditComponent } from './disciplina-edit/disciplina-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    ProfessorComponent,
    DisciplinaComponent,
    AlunoComponent,
    NavbarComponent,
    HomeComponent,
    AlunoEditComponent,
    LoaderComponent,
    ProfessorEditComponent,
    DisciplinaEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgSelectModule,
    FormsModule,
    NgxPaginationModule,
    HttpClientModule,
    SidebarModule.forRoot(),
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
