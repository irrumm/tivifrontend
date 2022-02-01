import { ICandidate } from "./ICandidate";

export interface IDepartment {
    seatsInCouncil?: number;
    council: ICandidate[];
    qualifiedCandidates: ICandidate[];
    unqualifiedCandidates: ICandidate[];
}