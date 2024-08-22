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

export const setSecurityIsProtectionOtherFx = createEvent<{ bValue: boolean }>();

export const updateSecurityEffect = createEffect<{ bValue: boolean }, IPetitionFormValues>({
    handler: ({ bValue }) => ({ ...$currentPetitionStore.getState(), petSecurityIsProtectionOther: bValue }),
});

sample({
    clock: setSecurityIsProtectionOtherFx,
    source: setSecurityIsProtectionOtherFx,
    target: updateSecurityEffect,
});

export const setRiskIsTerrorismFx = createEvent<{ bValue: boolean }>();

export const updateRiskEffect = createEffect<{ bValue: boolean }, IPetitionFormValues>({
    handler: ({ bValue }) => ({ ...$currentPetitionStore.getState(), petRiskIsTerrorism: bValue }),
});

sample({
    clock: setRiskIsTerrorismFx,
    source: setRiskIsTerrorismFx,
    target: updateRiskEffect,
});

$currentPetitionStore.on(updateSecurityEffect.doneData, (_state, updatedPetition) => updatedPetition);
$currentPetitionStore.on(updateRiskEffect.doneData, (_state, updatedPetition) => updatedPetition);

$currentPetitionStore.watch((el) => {
    console.log(el);
});
