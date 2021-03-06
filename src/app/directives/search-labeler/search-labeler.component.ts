import { Component, OnInit, Inject, Output, Input, EventEmitter } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';

@Component({
  selector: 'wm-search-labeler',
  templateUrl: './search-labeler.component.html',
  styleUrls: ['./search-labeler.component.css']
})
export class SearchLabelerComponent implements OnInit {
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>();
  @Output('onSelect') onSelect: EventEmitter<any> = new EventEmitter<any>();
  @Input() public labelerType: any;
  @Input() public disabled: boolean;

  token: any;
  query: any = null;
  searchUrl: any;

  constructor(
    @Inject('API_URL') private apiUrl: string) {
    this.token = sessionStorage.getItem('token');
    this.searchUrl = this.labelerType === 'V' ? `${this.apiUrl}/basic/search-vendor?token=${this.token}` :
      `${this.apiUrl}/basic/search-manufacture?token=${this.token}`;
  }

  ngOnInit() {

  }

  setDefault(value: string) {
    this.query = value;
  }

  onClearSelected(event: any) {
    if (event) {
      if (event.keyCode === 13 || event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 40) {
        this.onChange.emit(false);
      } else {
        this.query = null;
        this.onChange.emit(true);
      }
    } else {
      this.onChange.emit(false);
    }
  }

  handleResultSelected(event: any) {
    this.onSelect.emit(event);
    this.query = event.labeler_name;
  }

}
