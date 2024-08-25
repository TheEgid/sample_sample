import { createEvent, createStore, createEffect, sample } from "effector";
import { ValueOf } from "next/dist/shared/lib/constants";

export interface IPetitionFormValues {
    petInsurerContactPhone: string,
    petRiskIsBeda: boolean,
    petRiskIsCat: boolean,
    petRiskIsDog: boolean,
    petSecurityIsProtectionOther: boolean,

    computedField: string
}

export const initialPetition: IPetitionFormValues = {
    petInsurerContactPhone: "",
    petRiskIsBeda: false,
    petRiskIsCat: false,
    petRiskIsDog: false,
    petSecurityIsProtectionOther: false,

    computedField: "",
};

export const $currentPetitionStore = createStore<IPetitionFormValues>(initialPetition, { skipVoid: false });

export const setPetitionFieldFx = createEvent<{ field: keyof IPetitionFormValues, value: ValueOf<IPetitionFormValues> }>();

const updatePetitionEffect = createEffect<{ state: IPetitionFormValues, field: keyof IPetitionFormValues, value: ValueOf<IPetitionFormValues> }, IPetitionFormValues>({
    handler: ({ state, field, value }) => {
        const updtd = { ...state, [field]: value };

        const computeField = (isBeda: boolean, isCat: boolean, isDog: boolean, isProtectionOther: boolean): string => {
            if (isBeda && isCat) { return "Beda и Cat активированы"; }
            if (isDog) { return "Dog активирован"; }
            if (isProtectionOther) { return "Прочая защита активирована"; }
            return "Ничего не активировано";
        };

        updtd.computedField = computeField(updtd.petRiskIsBeda, updtd.petRiskIsCat, updtd.petRiskIsDog, updtd.petSecurityIsProtectionOther);

        return updtd;
    },
});

sample({
    clock: setPetitionFieldFx,
    source: $currentPetitionStore,
    fn: (state, { field, value }) => ({ state, field, value }),
    target: updatePetitionEffect,
});

$currentPetitionStore.on(updatePetitionEffect.doneData, (_state, updatedPetition) => updatedPetition);

// $currentPetitionStore.watch((el) => {
//     console.log(el);
// });
