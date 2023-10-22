import { combine, createEffect, createStore, restore } from "effector";
import { toast } from "react-toastify";
import { apiRoot } from "@/api";

export const addBlogItemFx = createEffect(async () => apiRoot.get(`database`).json());

export const $addBlogItemStore = createStore("")
    .on(addBlogItemFx.doneData, (_, result) => result as string)
    .reset();

const $error = restore<Error>(addBlogItemFx.failData, null);

export const $addBlogItemStatus = combine({
    loading: addBlogItemFx.pending,
    error: $error,
    data: $addBlogItemStore,
});

$addBlogItemStore.watch((res) => {
    // console.log(res);
    if (res.length > 1) {
        toast.success("Успешно добавлен новый блог", { autoClose: 2000 });
    } else {
        if (res !== $addBlogItemStore.defaultState) toast.error("Ошибка добавления", { autoClose: 2000 });
    }
});
