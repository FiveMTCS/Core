export default interface IDeferrals {
    defer: () => void;
    done: (failureReason?: string) => void;
    handover: (data: any) => void;
    presentCard: (
        card: string | object,
        cb?: (data: any, rawData: string) => void,
    ) => void;
    update: (message: string) => void;
}
