//importing all components for routing----------------------------------------------------
import { HomeComponent } from './components/home/home.component';
import {CommandsComponent } from './components/commands/commands.component';
import {CodeEditorComponent} from './components/code-editor/code-editor.component'
//----------------------------------------------------------------------------------------
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'commands',
        component: CommandsComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
