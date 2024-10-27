import { Injectable } from '@nestjs/common';

@Injectable()
export class ResponseHelper {

  success(data, message="Success") {
    const responseData = {
        data,
        message,
    };
    return responseData;
  }

}
