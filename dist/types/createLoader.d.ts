export declare const createLoader: (options: {
    start: () => void;
    end: () => void;
    inc?: () => void;
    slackTime?: number;
}) => {
    load: <T>(promise: Promise<T> | (() => Promise<T>)) => Promise<T>;
};
