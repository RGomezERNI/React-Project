import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const deleteQuiz = createAsyncThunk(
  "quiz/deleteQuiz",
  async (quizId) => {
    const response = await fetch(
      `https://localhost:7042/QuizApp/${quizId}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to delete quiz");
    }
    return quizId; // Return the quizId for further processing
  }
);

const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    quizzes: [],
    selectedQuizId: null,
    loading: false,
    error: null,
  },
  reducers: {
    selectQuiz: (state, action) => {
      state.selectedQuizId = action.payload;
    },
    clearQuiz: (state) => {
      state.selectedQuizId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteQuiz.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteQuiz.fulfilled, (state, action) => {
        state.loading = false;
        state.quizzes = state.quizzes.filter(
          (quiz) => quiz.quizId !== action.payload
        );
      })
      .addCase(deleteQuiz.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { selectQuiz, clearQuiz } = quizSlice.actions;
export default quizSlice.reducer;
