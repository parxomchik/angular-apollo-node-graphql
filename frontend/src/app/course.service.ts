import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { IQuery, ICourse } from './types';
import { map } from 'rxjs/operators';

@Injectable()
export class CourseService {

  constructor(private apollo: Apollo) { }


  getAllCourses(searchTerm: string) {
    return this.apollo.watchQuery<IQuery>({
      pollInterval: 500,
      query: gql`
        query allCourses($searchTerm: String) {
          id
          title
          author
          description
          topic
          url
          voteCount
        }
      `,
      variables: {
        searchTerm: searchTerm
      }
    })
      .valueChanges
      .pipe(
        map(res => res.data.allCourses)
      );
  }

  upvoteCourse(id: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation upvote($id: string!) {
          upvote(id: $id) {
            id
            title
            voteCount
          }
        }
      `,
      variables: {
        id: id
      }
    });
  }
}
