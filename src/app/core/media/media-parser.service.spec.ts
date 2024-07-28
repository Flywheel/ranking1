import { TestBed } from '@angular/core/testing';

import { MediaParserService } from './media-parser.service';

describe('MediaParserService', () => {
  let service: MediaParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MediaParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
