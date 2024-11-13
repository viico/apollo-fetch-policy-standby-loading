import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Apollo, QueryRef} from "apollo-angular";
import {ApolloQueryResult, gql} from "@apollo/client/core";
import {Observable} from "rxjs";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'fetch-policy-standby-loading';
  result$: Observable<ApolloQueryResult<any>>;
  private queryRef: QueryRef<any, any>;

  constructor(
    private readonly apollo: Apollo
  ) {

    this.queryRef = this.apollo.watchQuery<any, any>({
      query: gql`
        {
          my_query {
            id
          }
        }
      `,
      fetchPolicy: 'standby',
    });
    this.result$ = this.queryRef.valueChanges;

  }

  callApi() {
    this.queryRef.refetch();
  }

  protected readonly JSON = JSON;
}
