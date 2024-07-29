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
  mediaType = input<string>();
  sourceId = input<string>();
  mediaService = inject(MediaParserService);

  assetData = computed<AssetView>(() => {
    const mediaType = this.mediaType();
    const sourceId = this.sourceId();
    if (sourceId && mediaType) {
      const prepAssetView = this.mediaService.parseMedia({ mediaType, sourceId });
      return prepAssetView;
    }
    return { mediaType: this.mediaType() ?? 'ERROR', sourceId: this.sourceId() ?? 'ERROR', url: '', paddingBottom: '' };
  });

  sanitizer = inject(DomSanitizer);
  sanitizedUrl = computed(() => this.sanitizer.bypassSecurityTrustResourceUrl(this.assetData().url));

  location = inject(Location); //  from '@angular/common' for back button
  goBack() {
    this.location.back();
  }

  logToConsole() {
    console.log(this.assetData());
  }
}
