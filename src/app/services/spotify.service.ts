import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) {
    console.log('Spotify services on');
  }

  getQuery(query: string) {

    const url = `https://api.spotify.com/v1/${query}`;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQCHFTjaJ7lJMOuxCwaFQ1uw-8PmCgz1s7zq4hIXfUhVIaJ_7NZQRvG7ULIIeIde30FKO_2oM7HALs8ACNc'
    });

    return this.http.get(url, { headers });

  }

  getNewReleases() {

    return this.getQuery('browse/new-releases?limit=20')
      .pipe(map(data => data['albums'].items))

  }

  getArtistas(termino: string) {

    return this.getQuery(`search?q=${termino }&type=artist&limit=15`)
      .pipe(map(data => data['artists'].items));

  }

  getArtista(id: string) {

    return this.getQuery(`artists/${ id }`);

  }

  getTopTracks(id: string) {

    return this.getQuery(`artists/${id}/top-tracks?country=us`)
      .pipe(map(data => data['tracks']));

  }


}
