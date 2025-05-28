import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import EmployeeView from './EmployeeView';
import TopLevels from './TopLevels';

const Tree = ({orgData}) => {
    const [selectedEmployee, setSelectedEmployee] = React.useState(null);
    const [topLevels, setTopLevels] = React.useState([]);
    const [viewState, setViewState] = React.useState('topLevels'); // 'topLevels' or 'employeeDetails'

    const handleSelectEmployee = (employee) => {
        const data = {
            details: employee,
            managers: findSuperiors(employee),
            directReports: findDirectReports(employee),
            peers: findPeers(employee),
        }

        setSelectedEmployee(data);
        setViewState('employeeDetails');
    };
    
    const findCompany = (companyName) => {
        return orgData.filter((org) => org.companyName === companyName);
    }
    
    const findDirectReports = (selected) => {
        return orgData[0].employees.filter((employee) => employee.reportsTo === selected.id);
    }
    
    const findSuperiors = (selected) => {
        const managers = [];
        let currentEmployee = selected;
    
        while (currentEmployee.reportsTo) {
            const manager = orgData[0].employees.find(employee => employee.id === currentEmployee.reportsTo);
            if (!manager) {
                break;
            }
    
            managers.push(manager);
            currentEmployee = manager;
        }
    
        return managers;
    }
    
    const findEmployee = (employeeId) => {
        return orgData[0].employees.find((employee) => employee.id === employeeId);
    }
    
    // optional
    const findPeers = (selected) => {
        return orgData[0].employees.filter((employee) => employee.reportsTo === selected.reportsTo && employee.id !== selected.id);
    }

    const findTopLevelEmployees = () => {
        const topLevels = orgData[0].employees.filter((employee) => employee.reportsTo === null);
        setTopLevels(topLevels);
        setViewState('topLevels');
    }

    const isTopLevel = () => {
        return viewState === 'topLevels';
    }

    const isEmployeeDetails = () => {
        return viewState === 'employeeDetails';
    }

    return (
        <TouchableOpacity onPress={() => findTopLevelEmployees()}>
            <View style={{
                display: 'flex',
            }}>
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'white',
                    borderColor: 'black',
                    borderWidth: 1,
                    padding: 20,
                    margin: 10,
                    borderRadius: 10,
                    display: 'flex',
                }}>
                    <Text>
                        {orgData && orgData[0].company}
                    </Text>
                </View>

                {
                    isTopLevel() && <TopLevels data={topLevels} handleSelectEmployee={handleSelectEmployee} />
                }

                {
                    isEmployeeDetails() && <EmployeeView selectedEmployee={selectedEmployee} />
                }
            </View>
        </TouchableOpacity>
    );
}

export default Tree;