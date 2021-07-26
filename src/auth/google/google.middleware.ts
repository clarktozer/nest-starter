import { Injectable, NestMiddleware } from '@nestjs/common';
import * as Tokens from 'csrf';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction) {
    const tokens = new Tokens();
    const secret = tokens.secretSync();
    const token = tokens.create(secret);

    response.cookie('csrf', token);
    request.session['csrfSecret'] = secret;

    next();
  }
}
