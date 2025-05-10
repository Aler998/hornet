export type APIError = {
  status: number;
  data: {
    message: string;
    field?: string;
  };
};

export function isAPIError(error: unknown): error is APIError {
  return (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    typeof (error as Record<string, unknown>).status === "number" &&
    "data" in error &&
    typeof (error as Record<string, unknown>).data === "object" &&
    error.data !== null &&
    "message" in (error.data as Record<string, unknown>) &&
    typeof (error.data as Record<string, unknown>).message === "string"
  );
}
