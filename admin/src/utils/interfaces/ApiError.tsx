export type APIError = {
    status: number;
    data: {
      message: string;
      field?: string;
    };
  };
  