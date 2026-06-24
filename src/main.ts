// Code level SDK implementation for dd-trace
// import tracer from 'dd-trace';
// tracer.init({
//   service: "<app_name>",

//   // Send data to CubeAPM.
//   url: "http://host.docker.internal:3130",

//   // optional settings
//   // env: "myenv",
//   // version: "1.2.3",
//   // tags: {
//   //   mykey1: "myvalue1",
//   //   mykey2: "myvalue2"
//   // },
// });

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
