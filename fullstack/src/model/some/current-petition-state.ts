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

const calculateComputedFieldEffect = createEffect<{ state: IPetitionFormValues, field: keyof IPetitionFormValues, value: ValueOf<IPetitionFormValues> }, IPetitionFormValues>({
    handler: ({ state, field, value }) => {
        const updated = { ...state, [field]: value };

        // Update both computed fields
        updated.computedField = computeFields(updated);
        updated.computedFieldChecker = checkFields(updated);

        // console.log("Updated computedField:", updated.computedField);
        // console.log("Updated computedFieldChecker:", updated.computedFieldChecker);
        return updated;
    },
});

sample({
    clock: setPetitionFieldFx,
    source: $currentPetitionStore,
    fn: (state, { field, value }) => ({ state, field, value }),
    target: calculateComputedFieldEffect,
});

$currentPetitionStore.on(calculateComputedFieldEffect.doneData, (_state, updatedPetition) => updatedPetition);

// $currentPetitionStore.watch((el) => {
//     console.log(el);
// });
