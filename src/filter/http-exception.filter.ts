import {
    Request, Response,
} from "express";
import {
    ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger,
} from "@nestjs/common";
import {
    ErrorObject,
} from "../exception/error/error-object";
import {
    ErrorData,
} from "../exception/error/error-data";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost): any {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();
      const status = exception.getStatus();

      let errorMessage: any = exception.getResponse();
      if (typeof errorMessage === "object") {
          errorMessage = errorMessage.message;
      }

      this.logger.error(
          `Error Occur ${request.url} ${request.method}, errorMessage: ${JSON.stringify(errorMessage, null, 2)}`,
      );

      const errorObject: ErrorObject = {
          timestamp: new Date().toISOString(),
          status: status,
          message: errorMessage,
          path: request.url,
          error: HttpStatus[status],
      };
      const errorData: ErrorData = {
          data: errorObject,
      };

      response.status(status).json(errorData);

  }

}