import { Location } from './Destinations';
import { OnfleetMetadata, MatchMetadata } from '../metadata';

declare class Worker {
    create(worker: Worker.CreateWorkerProps): Promise<Worker.OnfleetWorker>;
    deleteOne(id: string): Promise<void>;
    get(): Promise<Worker.OnfleetWorker[]>;
    get(id: string, query?: Worker.GetWorkerQueryProps): Promise<Worker.OnfleetWorker>;
    getByLocation(location: Worker.GetWorkerByLocationProps): Promise<{ workers: Worker.OnfleetWorker[] }>;
    getSchedule(id: string): Promise<{ entries: Worker.WorkerSchedule[] }>;
    insertTask(id: string, obj: { tasks: string[] }): Promise<Worker.OnfleetWorker>;
    matchMetadata: MatchMetadata<Worker.OnfleetWorker['metadata']>;
    setSchedule(id: string, schedule: Worker.WorkerSchedule): Promise<{ entries: Worker.WorkerSchedule[] }>;
    update(id: string, worker: Worker.UpdateWorkerProps): Promise<Worker.OnfleetWorker>;
}

declare namespace Worker {
    interface OnfleetWorker {
        id: string;
        timeCreated: number;
        timeLastModified: number;
        organization: string;
        name: string;
        displayName: string;
        phone: string;
        activeTask: string | null;
        tasks: string[];
        onDuty: boolean;
        timeLastSeen: number;
        capacity: number;
        userData: {
            appVersion: string;
            batteryLevel: number;
            deviceDescription: string;
            platform: string;
        };
        accountStatus: string;
        metadata: OnfleetMetadata[];
        imageUrl: string | null;
        teams: string[];
        delayTime: number | null;
        location: Location;
        vehicle: Vehicle | null;
    }

    interface Vehicle {
        type: 'BICYCLE' | 'CAR' | 'MOTORCYCLE' | 'TRUCK';
        color?: string | undefined;
        description?: string | undefined;
        licensePlate?: string | undefined;
    }

    /**
     * filter - Optional. A comma-separated list of fields to return, if all are not desired. For example, name, location
     * phones - Optional. A comma-separated list of workers' phone numbers.
     * states - Optional. A comma-separated list of worker states, where 0 is off-duty,
     * 1 is idle (on-duty, no active task) and 2 is active (on-duty, active task).
     * teams - Optional. A comma-separated list of the team IDs that workers must be part of.
     */
    interface GetWorkerQueryProps {
        filter?: string | undefined;
        phones?: string | undefined;
        states?: string | undefined;
        teams?: string | undefined;
    }

    interface GetWorkerByLocationProps extends Location {
        radius?: number | undefined;
    }

    /**
     * name - The worker’s complete name.
     * phone - A valid phone number as per the worker’s organization’s country.
     * teams - One or more team IDs of which the worker is a member.
     * vehicle - Optional. The worker’s vehicle; providing no vehicle details is equivalent to the worker being on foot.
     * capacity - Optional. The maximum number of units this worker can carry, for route optimization purposes.
     * displayName - Optional. This value is used in place of the worker's actual name within sms notifications,
     * delivery tracking pages, and across organization boundaries (connections).
     */
    interface CreateWorkerProps {
        name: string;
        phone: string;
        teams: string | string[];
        vehicle?: Vehicle | undefined;
        capacity?: number | undefined;
        displayName?: string | undefined;
    }

    interface UpdateWorkerProps {
        capacity?: number | undefined;
        displayName?: string | undefined;
        metadata?: OnfleetMetadata | undefined;
        name?: string | undefined;
        teams?: string | string[] | undefined;
        vehicle?: Vehicle | undefined;
    }

    interface WorkerSchedule {
        date: string;
        timezone: string;
        shifts: [[number, number]];
    }
}

export = Worker;
