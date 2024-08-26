import { createEvent, createStore, createEffect, sample } from "effector";
import { ValueOf } from "next/dist/shared/lib/constants";

export interface IPetitionFormValues {
    petRiskIsBeda: boolean,
    petRiskIsCat: boolean,
    petRiskIsDog: boolean,
    petSecurityIsProtectionOther: boolean,
    computedField: string,
    checkedFields: string
}

export const initialPetition: IPetitionFormValues = {
    petRiskIsBeda: false,
    petRiskIsCat: false,
    petRiskIsDog: false,
    petSecurityIsProtectionOther: false,
    computedField: " ",
    checkedFields: "INITIAL",
};

export const $currentPetitionStore = createStore<IPetitionFormValues>(initialPetition, { skipVoid: false });

const initialAnotherStoreData = { info: "Initial Info" };
const $anotherStore = createStore<{ info: string }>(initialAnotherStoreData);
const setAnotherStoreData = createEvent<{ info: string }>();

$anotherStore.on(setAnotherStoreData, (state, payload) => ({ ...state, ...payload }));

const computeMyGoodFields = (fields: IPetitionFormValues): string => {
    const keys: Array<keyof IPetitionFormValues> = [
        "petRiskIsBeda",
        "petRiskIsCat",
        "petRiskIsDog",
        "petSecurityIsProtectionOther",
    ];
    const foundKey = keys.find(key => fields[key]);

    return foundKey ?? "";
};

export const setPetitionFieldFx = createEvent<{ field: keyof IPetitionFormValues, value: ValueOf<IPetitionFormValues> }>();

const calculateComputedFieldEffect = createEffect<{ petitionState: IPetitionFormValues,
    // anotherState: { info: string },
    field: keyof IPetitionFormValues,
    value: ValueOf<IPetitionFormValues>
}, IPetitionFormValues
>({
    handler: ({ petitionState, field, value }) => {
        const updated = { ...petitionState, [field]: value };

        // updated.computedField = computeMyGoodFields(updated);
        // updated.checkedFields = checkFields(updated);

        // console.log("Updated computedField:", updated.computedField);
        // // console.log("Checker:", updated.checkedFields);
        // console.log("Data from anotherStore:", anotherState);

        return updated;
    },
});

sample({
    clock: setPetitionFieldFx,
    source: {
        petitionState: $currentPetitionStore,
        // anotherState: $anotherStore,
    },
    fn: (source, { field, value }) => ({
        petitionState: source.petitionState,
        // anotherState: source.anotherState,
        field,
        value,
    }),
    target: calculateComputedFieldEffect,
});

$currentPetitionStore.on(calculateComputedFieldEffect.doneData, (_state, updatedPetition) => updatedPetition);

$currentPetitionStore.watch((el) => {
    console.log(el);
});
