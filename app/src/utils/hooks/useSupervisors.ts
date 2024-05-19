import { useEffect, useState } from 'react';
import { NativeModules } from 'react-native';

const SupervisorModule = NativeModules.SupervisorModule;
// Assuming SupervisorModule is a custom module

interface SupervisorsHookReturnType {
    supervisors: string[];
}

const useSupervisors = (): SupervisorsHookReturnType => {
    const [supervisors, setSupervisors] = useState<string[]>([]);

    useEffect(() => {
        const fetchSupervisors = async () => {
            try {
                const supervisorsString = await SupervisorModule.getSupervisors();
                const supervisorsArray = JSON.parse(supervisorsString);
                setSupervisors(supervisorsArray);
            } catch (error) {
                console.error('Error fetching supervisors:', error);
            }
        };
        fetchSupervisors();
    }, []);

    return { supervisors };
};

export default useSupervisors;
