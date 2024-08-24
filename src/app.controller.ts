import { Controller, Get, Param, UseFilters } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): Promise<string> {
    return this.appService.getHello();
  }

  @Get('param/:param')
  getParam(@Param('param') param: string): Promise<string> {
    return this.appService.getParam(param);
  }

  @Get('exception')
  throwError(): Promise<void> {
    return this.appService.throwError();
  }

  @Get('/api')
  async handleApiCall(): Promise<string> {
    return this.appService.callApi();
  }

  @Get('mysql')
  queryMySQL(): Promise<string> {
    return this.appService.queryMySQL();
  }

  @Get('redis')
  callRedis(): Promise<string> {
    return this.appService.callRedis();
  }
}
