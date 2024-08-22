import { createEvent, createStore, createEffect, sample } from "effector";

export interface IPetitionFormValues {
    petInsurerContactPhone: string,
    petRiskIsTerrorism: boolean,
    petSecurityIsProtectionOther: boolean
}

export const initialPetition: IPetitionFormValues = {
    petInsurerContactPhone: "",
    petRiskIsTerrorism: false,
    petSecurityIsProtectionOther: false,
};

export const $currentPetitionStore = createStore(initialPetition, { skipVoid: false });

// Create events
export const setPetitionFieldFx = createEvent<{ field: keyof IPetitionFormValues, value: boolean }>();

// Create effect to handle updates
export const updatePetitionEffect = createEffect<{ field: keyof IPetitionFormValues, value: boolean }, IPetitionFormValues>({
    handler: ({ field, value }) => ({
        ...$currentPetitionStore.getState(),
        [field]: value,
    }),
});

// Sample events to trigger effect
sample({
    clock: setPetitionFieldFx,
    source: setPetitionFieldFx,
    target: updatePetitionEffect,
});

// Update store with new values
$currentPetitionStore.on(updatePetitionEffect.doneData, (_state, updatedPetition) => updatedPetition);

// Watch for changes in the store
$currentPetitionStore.watch((el) => {
    console.log(el);
});
