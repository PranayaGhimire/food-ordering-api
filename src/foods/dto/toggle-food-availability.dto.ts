import { IsBoolean } from 'class-validator';

export class ToggleFoodAvailabilityDto {
  @IsBoolean()
  isAvailable: boolean;
}
