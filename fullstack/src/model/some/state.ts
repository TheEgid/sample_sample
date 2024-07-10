import { combine, createEffect, createStore, restore } from "effector";
import { apiRoot } from "@/api";

export const addBlogItemFx = createEffect(async () => {
    const response = await apiRoot.get(`database`).json();

    return response;
});

export const $addBlogItemStore = createStore("")
    .on(addBlogItemFx.doneData, (_, result) => result as string)
    .reset();

const $error = restore<Error>(addBlogItemFx.failData, null);

export const $addBlogItemStatus = combine({
    loading: addBlogItemFx.pending,
    error: $error,
    data: $addBlogItemStore,
});
