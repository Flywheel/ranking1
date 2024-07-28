import { Component, computed, inject, input } from '@angular/core';
import { CommonModule, Location, NgOptimizedImage } from '@angular/common';
import { AssetView } from '../../ballot/models';
import { DomSanitizer } from '@angular/platform-browser';
import { MediaParserService } from '../../../core/media/media-parser.service';
@Component({
  selector: 'app-viewer',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './viewer.component.html',
  styleUrl: './viewer.component.scss',
})
export class ViewerComponent {
  id = input<string>();
  location = inject(Location); //  from '@angular/common' for back button
  sanitizer = inject(DomSanitizer);
  mediaService = inject(MediaParserService);

  // deserialize data from id into Asset object containing mediaType and location, then get url and paddingBottom
  assetData = computed<AssetView>(() => {
    const assetInput = this.id();
    // test console.log('ViewerComponent initialized with id:', this.id());
    if (assetInput) {
      const p1 = assetInput.indexOf('..i..');
      const mediaType = assetInput.substring(0, p1);
      const location = assetInput.substring(p1 + 5);
      const prepAssetView = this.mediaService.parseMedia({ mediaType, sourceId: location });

      // test console.log('assetData2', assetData, '; url', url, '; paddingBottom', paddingBottom);
      return prepAssetView;
    }
    // test console.log('assetData2', { mediaType: '', location: '', url: '', paddingBottom: '' });
    return { mediaType: '', sourceId: '', url: '', paddingBottom: '' };
  });

  sanitizedUrl = computed(() => this.sanitizer.bypassSecurityTrustResourceUrl(this.assetData().url));

  goBack() {
    this.location.back();
  }
  logGen() {
    console.log(this.assetData());
  }
}
