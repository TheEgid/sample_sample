import { createEvent, createStore } from "effector";

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

export const submitSecurityIsProtectionOther = createEvent<{ bValue: boolean }>();

$currentPetitionStore.on(submitSecurityIsProtectionOther, (state, { bValue }) => ({ ...state, petIsSecurityIsProtectionOther: bValue }));

$currentPetitionStore.watch((el) => {
    console.log(el);
});
