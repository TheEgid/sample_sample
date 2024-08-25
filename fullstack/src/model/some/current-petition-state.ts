import { createEvent, createStore, createEffect, sample } from "effector";
import { ValueOf } from "next/dist/shared/lib/constants";

export interface IPetitionFormValues {
    petRiskIsBeda: boolean,
    petRiskIsCat: boolean,
    petRiskIsDog: boolean,
    petSecurityIsProtectionOther: boolean,
    computedField: string,
    computedFieldChecker: string
}

export const initialPetition: IPetitionFormValues = {
    petRiskIsBeda: false,
    petRiskIsCat: false,
    petRiskIsDog: false,
    petSecurityIsProtectionOther: false,
    computedField: " ",
    computedFieldChecker: "INITIAL",
};

const initialAnotherStoreData = { info: "Initial Info" };
const $anotherStore = createStore<{ info: string }>(initialAnotherStoreData);
const setAnotherStoreData = createEvent<{ info: string }>();

$anotherStore.on(setAnotherStoreData, (state, payload) => ({ ...state, ...payload }));

export const $currentPetitionStore = createStore<IPetitionFormValues>(initialPetition, { skipVoid: false });

export const setPetitionFieldFx = createEvent<{ field: keyof IPetitionFormValues, value: ValueOf<IPetitionFormValues> }>();

const computeFields = (fields: IPetitionFormValues): string => {
    const keys: Array<keyof IPetitionFormValues> = [
        "petRiskIsBeda",
        "petRiskIsCat",
        "petRiskIsDog",
        "petSecurityIsProtectionOther",
    ];
    const foundKey = keys.find(key => fields[key]);

    return foundKey ?? "";
};
const checkFields = (fields: IPetitionFormValues): string =>
    (["petRiskIsBeda", "petRiskIsCat", "petRiskIsDog", "petSecurityIsProtectionOther"] as (keyof IPetitionFormValues)[])
        .every(key => fields[key])
        ? "Все заполнено"
        : "Ничего не заполнено";

const calculateComputedFieldEffect = createEffect<{ petitionState: IPetitionFormValues,
    anotherState: { info: string },
    field: keyof IPetitionFormValues,
    value: ValueOf<IPetitionFormValues>
}, IPetitionFormValues
>({
    handler: ({ petitionState, anotherState, field, value }) => {
        const updated = { ...petitionState, [field]: value };

        // Update both computed fields
        updated.computedField = computeFields(updated);
        updated.computedFieldChecker = checkFields(updated);

        // Log the data from another store
        console.log("Updated computedField:", updated.computedField);
        console.log("Updated computedFieldChecker:", updated.computedFieldChecker);
        console.log("Data from anotherStore:", anotherState);

        return updated;
    },
});

sample({
    clock: setPetitionFieldFx,
    source: {
        petitionState: $currentPetitionStore,
        anotherState: $anotherStore,
    },
    fn: (source, { field, value }) => ({
        petitionState: source.petitionState,
        anotherState: source.anotherState,
        field,
        value,
    }),
    target: calculateComputedFieldEffect,
});

$currentPetitionStore.on(calculateComputedFieldEffect.doneData, (_state, updatedPetition) => updatedPetition);

// $currentPetitionStore.watch((el) => {
//     console.log(el);
// });
