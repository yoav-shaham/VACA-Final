import { TestBed, inject } from '@angular/core/testing';

import { VoiceToTextService } from './voice-to-text.service';

describe('VoiceToTextService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VoiceToTextService]
    });
  });

  it('should be created', inject([VoiceToTextService], (service: VoiceToTextService) => {
    expect(service).toBeTruthy();
  }));
});
