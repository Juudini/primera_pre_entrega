export const errorFactory = function (name) {
    return class HandlerError extends Error {
        constructor(message) {
            super(message);
            this.name = name;
        }
    };
};
