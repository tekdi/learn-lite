export class EnrollResponseDto {
    id: string;
    ver: string;
    ts: string;
    params: {
      resmsgid: string | null;
      msgid: string;
      err: string | null;
      status: string;
      errmsg: string | null;
    };
    responseCode: string;
    result: {
      response?: string;
    };
  }