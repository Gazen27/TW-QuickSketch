// reusable formatted response message
export const APIResponse = {
  success: <T>(message : string, data: T) => ({status: 'success', message, data}),
  error:      (message : string) => ({status: 'error', message})
} as const;