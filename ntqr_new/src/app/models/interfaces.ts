export interface TrunkGroup {
    trunkgroup_name: string;
    gateway: string;
    trunkgroup_description: string;
    service_type: string;
    circuits_available: number;
    utilisation: number;
    busiest_hours: string;
    io_call_attempts: {
        in: number,
        out: number
    };
    io_cps_processed: {
        in: number,
        out: number
    };
    io_cps_attempted: {
        in: number,
        out: number
    };
}

export interface HourReport {
    hours: string;    
    circuits_available: {
        current: number,
        total: number
    };
    utilisation: {
        current: number,
        total: number
    };
    io_call_attempts: {
        current: number,
        total: number
    };
    io_cps_processed: {
        current: number,
        total: number
    };
    io_cps_attempted: {
        current: number,
        total: number
    };
}

// customer-report
export interface Type {
    typeName: string;
  }
  
export interface Memory {
    countValue: number;
    cpuMemory: {
        current: number,
        total: number
    };
}
  
export interface CustomerReport {
    date: string;
    types: Array<Type>;
    memory: Array<Memory>;
}

// service key
export interface ServiceKey {
    type?: string;
    country?: string;
    name?: string;
    count?: number;
    children?: ServiceKey[];
}

export interface ServiceKeyFlatNode {
    expandable: boolean;
    country: string;
    name: string;
    count: number;
    level: number;
}

export interface WatchlistTrunkGroup {
    tgName: string;
    gateway: string;
    tgDescr: string;
    category: string;
    circuitsAvailable: number;
    totalMinutes: number;
    tgUtilisation: number;
    thresholdUtilisation: number;
    sendEmail: boolean;
}