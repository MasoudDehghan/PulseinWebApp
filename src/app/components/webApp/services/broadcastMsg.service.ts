import { Injectable } from '@angular/core';
import { Subject} from 'rxjs';

@Injectable()
export class BroadcastMessageService {

    private itemsSource = new Subject<string[]>();

    itemsHandler = this.itemsSource.asObservable();

    setItems(items: string[]) {
        this.itemsSource.next(items);
    }
}
