import { Injectable } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

@Injectable()
export class LogHelper {
  constructor(private readonly logger: Logger) {}

  logRequest(req: any) {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const data = {
      requestBody: req.body,
      requestHeaders: req.headers,
      requestIP: ip,
      requestId: req.requestId,
      requestMethod: req.method,
    };

    this.info(`Receive request at ${req.originalUrl}`, data);
  }

  info(text: string, data: any) {
    this.logger.log(text, { data });
  }

  warn(text: string, data: any) {
    this.logger.warn(text, { data });
  }

  error(text: string, data: any) {
      this.logger.error(text, data);
  }


}
