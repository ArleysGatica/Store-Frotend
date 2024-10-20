export const handleAsyncThunkError = (error: Error) => {
  console.error('Async Thunk Error:', error);
  throw error;
};
