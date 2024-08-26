import { createEvent, createStore, createEffect, sample, EventCallable } from "effector";
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

export const setPetitionFieldFx = createEvent<{ field: keyof IPetitionFormValues, value: ValueOf<IPetitionFormValues> }>();

const updateFieldEffect = createEffect<{ petitionState: IPetitionFormValues,
    // anotherState: { info: string },
    field: keyof IPetitionFormValues,
    value: ValueOf<IPetitionFormValues>
}, IPetitionFormValues
>({
    handler: ({ petitionState, field, value }) => {
        const updated = { ...petitionState, [field]: value };

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
    target: updateFieldEffect,
});

$currentPetitionStore.on(updateFieldEffect.doneData, (_state, updatedPetition) => updatedPetition);

const checkFields = (fields: IPetitionFormValues): number => {
    const keys: Array<keyof IPetitionFormValues> = [
        "petRiskIsBeda",
        "petRiskIsCat",
        "petRiskIsDog",
        "petSecurityIsProtectionOther",
    ];
    const foundKey = keys.filter(key => fields[key])?.length;

    return foundKey ?? 0;
};

export const checkPetitionFieldFx: EventCallable<void> = createEvent();

const checkPetitionEffect = createEffect<{ petitionState: IPetitionFormValues }, IPetitionFormValues>({
    handler: ({ petitionState }) => {
        const updated = { ...petitionState };

        updated.computedField = checkFields(updated).toString();
        return updated;
    },
});

sample({
    clock: checkPetitionFieldFx,
    source: {
        petitionState: $currentPetitionStore,
    },
    fn: (source) => ({
        petitionState: source.petitionState,
    }),
    target: checkPetitionEffect,
});

$currentPetitionStore.on(checkPetitionEffect.doneData, (_state, updatedPetition) => updatedPetition);

// $currentPetitionStore.watch((el) => {
//     console.log(el);
// });
