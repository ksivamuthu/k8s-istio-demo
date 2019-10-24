import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/version')
  version(): string {
    return 'Threat service - v1';
  }
}