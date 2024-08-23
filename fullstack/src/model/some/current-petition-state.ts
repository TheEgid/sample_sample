import { createEvent, createStore, createEffect, sample } from "effector";
import { ValueOf } from "next/dist/shared/lib/constants";

export interface IPetitionFormValues {
    petInsurerContactPhone: string,
    petRiskIsTerrorism: boolean,
    petRiskIsCat: boolean,
    petRiskIsDog: boolean,
    petSecurityIsProtectionOther: boolean
}

export const initialPetition: IPetitionFormValues = {
    petInsurerContactPhone: "",
    petRiskIsTerrorism: false,
    petRiskIsCat: false,
    petRiskIsDog: false,
    petSecurityIsProtectionOther: false,
};

export const $currentPetitionStore = createStore<IPetitionFormValues>(initialPetition, { skipVoid: false });

export const setPetitionFieldFx = createEvent<{ field: keyof IPetitionFormValues, value: boolean }>();
const updatePetitionEffect = createEffect<{ state: IPetitionFormValues, field: keyof IPetitionFormValues, value: ValueOf<IPetitionFormValues> }, IPetitionFormValues>({
    handler: ({ state, field, value }) => ({ ...state, [field]: value }),
});

sample({
    clock: setPetitionFieldFx,
    source: $currentPetitionStore,
    fn: (state, { field, value }) => ({ state, field, value }),
    target: updatePetitionEffect,
});

$currentPetitionStore.on(updatePetitionEffect.doneData, (_state, updatedPetition) => updatedPetition);

$currentPetitionStore.watch((el) => {
    console.log(el);
});
