import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatStepperModule} from '@angular/material/stepper';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatRippleModule} from '@angular/material/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import {MatTreeModule} from '@angular/material/tree';

//import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { getPtBrPaginatorIntl } from './pt-br-paginator-intl';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {MatTooltipModule} from '@angular/material/tooltip';
import { DragDropModule } from '@angular/cdk/drag-drop';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const MaterialComponents = [
  MatCardModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatSelectModule,
  MatSidenavModule,
  MatToolbarModule,
  MatStepperModule,
  MatAutocompleteModule,
  MatTabsModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatGridListModule,
  MatTableModule,
  MatProgressBarModule,
  MatCheckboxModule,
  MatRippleModule,
  MatExpansionModule,
  MatPaginatorModule,
  MatSortModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatSnackBarModule,
  MatTreeModule,
  MatTooltipModule,
  DragDropModule,
]
@NgModule({
  declarations: [],
  imports: [
    MaterialComponents,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: []
      }
    }),
  ],
  exports: [
    MaterialComponents
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getPtBrPaginatorIntl() }
  ]
})
export class MaterialModule { }
