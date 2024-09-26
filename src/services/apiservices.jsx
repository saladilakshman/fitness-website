import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { keys } from "../../keys";
export const fitApi = createApi({
  reducerPath: "gymFitness",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://exercisedb.p.rapidapi.com",
    prepareHeaders(headers) {
      headers.set("X-RapidAPI-Key", keys.exercise);
      headers.set("X-RapidAPI-Host", "exercisedb.p.rapidapi.com");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getGymType: builder.query({
      query: (type, limit = "100") =>
        type === "all"
          ? `/exercises?limit=1000`
          : `/exercises/bodyPart/${type}?limit=${limit}`,
    }),
    getSimilarEquipmentExercise: builder.query({
      query: (equipmenttype) => `exercises/equipment/${equipmenttype}`,
    }),
    getSimilarExercises: builder.query({
      query: (targetname) => `exercises/target/${targetname}`,
    }),
    getExerciseById: builder.query({
      query: (Id) => `exercises/exercise/${Id}`,
    }),
    getExerciseByName: builder.mutation({
      query: ({ searchtext, limit = "100" }) => ({
        url: `exercises/name/${searchtext}?limit=${limit}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetGymTypeQuery,
  useGetExerciseByNameMutation,
  useGetSimilarEquipmentExerciseQuery,
  useGetExerciseByIdQuery,
  useGetSimilarExercisesQuery,
} = fitApi;
