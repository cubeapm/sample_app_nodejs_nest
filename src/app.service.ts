import { Injectable, Res } from '@nestjs/common';
import { createConnection } from 'mysql2/promise';
import { trace } from '@opentelemetry/api';
import axios from 'axios';

const redis = require("redis");


const redisClient = redis.createClient({
  url: "redis://redis:6379",
});
redisClient.connect().catch((err) => {
  if (err) {
    if (process.env.CUBE_DOCKER_COMPOSE) throw err;
  } else {
    console.log("redis connected!");
  }
});

@Injectable()
export class AppService {
  private readonly mysqlClient;
  cacheManager: any;

  constructor() {
    this.mysqlClient = createConnection({
      host: 'mysql',
      user: 'root',
      password: 'root',
      database: 'test',
    });

    this.mysqlClient.then(() => console.log('MySQL connected!')).catch((err) => {
      if (process.env.CUBE_DOCKER_COMPOSE) throw err;
    });
  }

  async getHello(): Promise<string> {
    return 'Hello';
  }

  async getParam(param: string): Promise<string> {
    return `Got param ${param}`;
  }

  async throwError(): Promise<void> {
    throw new Error('Sample exception');
  }

  async callApi(): Promise<string> {
    await axios.get('http://localhost:3000/');
    return 'API called';
  }

  async queryMySQL(): Promise<string> {
    const [rows] = await (await this.mysqlClient).execute('SELECT NOW()');
    return rows[0]['NOW()'];
  }

  async callRedis(): Promise<string> {
    await redisClient.set('foo', 'bar');
    return ('Redis called');
  }

  errorHandler(err ,req, res, next) {
    const span = trace.getActiveSpan();
    if (span) {
      span.recordException(err);
    }
    next (err); 
  }
}

