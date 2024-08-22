import { createEvent, createStore, createEffect, sample } from "effector";

export interface IPetitionFormValues {
    petInsurerContactPhone: string,
    petInsurerContactEmail: string,
    petIsSecurityIsProtectionOther: boolean
}

export const initialPetition: IPetitionFormValues = {
    petInsurerContactPhone: "",
    petInsurerContactEmail: "",
    petIsSecurityIsProtectionOther: true,
};

export const $currentPetitionStore = createStore(initialPetition, { skipVoid: false });

//
export const fixSecurityIsProtectionOther = createEvent<{ bValue: boolean }>();

export const updatePetitionEffect = createEffect<{ bValue: boolean }, IPetitionFormValues>({
    handler: ({ bValue }) => ({ ...$currentPetitionStore.getState(), petIsSecurityIsProtectionOther: bValue }),
});

sample({
    clock: fixSecurityIsProtectionOther,
    source: fixSecurityIsProtectionOther,
    target: updatePetitionEffect,
});

$currentPetitionStore.on(updatePetitionEffect.doneData, (_state, updatedPetition) => updatedPetition);

$currentPetitionStore.watch((el) => {
    console.log(el);
});
