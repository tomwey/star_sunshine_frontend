import { NgModule } from '@angular/core';
import { MomentPipe } from './moment/moment';
import { TimeAgoPipe } from './time-ago/time-ago';
import { Num2strPipe } from './num2str/num2str';
@NgModule({
	declarations: [MomentPipe,
    TimeAgoPipe,
    Num2strPipe],
	imports: [],
	exports: [MomentPipe,
    TimeAgoPipe,
    Num2strPipe]
})
export class PipesModule {}
