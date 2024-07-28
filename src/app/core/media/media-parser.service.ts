import { Injectable } from '@angular/core';
import { Asset, AssetView } from '../../feature/ballot/models';

@Injectable({
  providedIn: 'root',
})
export class MediaParserService {
  public parseMedia(asset: Asset): AssetView {
    let paddingBottom = '0%';
    let url = '';
    switch (asset.mediaType) {
      case 'youtube':
        paddingBottom = '56.25%';
        url = 'https://www.youtube.com/embed/' + asset.sourceId;
        break;
      case 'twitter':
        paddingBottom = '140%';
        url = 'https://twitframe.com/show?url=https://twitter.com/twitter/status/' + asset.sourceId;
        break;
      case 'tiktok':
        paddingBottom = '120%';
        url = 'https://www.tiktok.com/embed/' + asset.sourceId;
        break;
      case 'instagram':
        paddingBottom = '120%';
        url = 'https://www.instagram.com/p/' + asset.sourceId + '/embed';
        break;
      case 'jpeg':
      case 'jpg-280':
        paddingBottom = '0%';
        url = asset.sourceId;
        break;

      default:
    }
    console.log('parseMedia', paddingBottom, '; sourceId', asset.sourceId, '; ', url);
    return { mediaType: asset.mediaType, sourceId: asset.sourceId, url, paddingBottom };
  }
}
