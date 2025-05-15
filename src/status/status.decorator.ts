import { LocalError } from './errors';
import { StatusType } from './status.type';
import { Logger } from '@nestjs/common';

export async function safeRun<T>(promise: Promise<T>, resource?: string, successMessage?: (result: T) => string): Promise<StatusType<T>> {
    try {
        const result = await promise;

        if (successMessage) {
            Logger.log(successMessage(result), resource || "safeRun")
        }

        return {
            success: true,
            data: result,
        } as StatusType<T>;
    } catch (error) {
        const isErrorKnown = error instanceof LocalError;

        if (!isErrorKnown) {
            Logger.error(error, resource || 'safeRun');
            return {
                success: false,
            } as StatusType<T>;
        }

        return {
            success: false,
            error: {
                message: error?.message,
                name: error?.name,
                stack: error?.stack
            }
        } as StatusType<T>;
    }
}

export function StatusDecorator<T>(resource?: string, successMessage?: (result: T) => string) {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor,
    ): PropertyDescriptor {
        const originalMethod = descriptor.value;

        descriptor.value = async function (...args: any[]): Promise<StatusType<T>> {
            const promise = await originalMethod.apply(this, args);
            return await safeRun<T>(promise, resource, successMessage)
        };

        return descriptor;
    };
}

