import { LocalError } from './errors';
import { StatusType } from './status.type';

export function CatchError<T>() {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor,
    ) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (...args: any[]) {
            try {
                const result = await originalMethod.apply(this, args);
                return {
                    success: true,
                    data: result,
                } as StatusType<T>;
            } catch (error) {
                const isErrorKnown = error instanceof LocalError

                if (!isErrorKnown) {
                    //TO-DO: log with nestJS
                    console.error(error)
                    return {
                        success: false,
                    } as StatusType<T>
                }

                return {
                    success: false,
                    error
                } as StatusType<T>;
            }
        };

        return descriptor;
    };
}
