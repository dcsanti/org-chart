import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import EmployeeView from './EmployeeView';
import TopLevels from './TopLevels';

const Tree = ({orgData}) => {
    const [selectedEmployee, setSelectedEmployee] = React.useState(null);
    const [topLevels, setTopLevels] = React.useState([]);
    const [selectedOrg, setSelectedOrg] = React.useState(null);
    const [viewState, setViewState] = React.useState('allCompanies'); // 'topLevels' or 'employeeDetails'

    const handleSelectEmployee = (employee) => {
        if (Object.keys(employee).includes('details')) {
            setSelectedEmployee(employee);
            setViewState('employeeDetails');

            return;
        }

        const data = {
            details: employee,
            managers: findSuperiors(employee, selectedOrg),
            directReports: findDirectReports(employee, selectedOrg),
            peers: findPeers(employee, selectedOrg),
        }

        setSelectedEmployee(data);
        setViewState('employeeDetails');
    };
    
    const findCompany = (companyName) => {
        return orgData.filter((org) => org.companyName === companyName);
    }
    
    const findDirectReports = (selected, orgData) => {
        return orgData.employees.filter((employee) => employee.reportsTo === selected.id);
    }
    
    const findSuperiors = (selected, orgData) => {
        const managers = [];
        let currentEmployee = selected;
    
        while (currentEmployee.reportsTo) {
            const manager = orgData.employees.find(employee => employee.id === currentEmployee.reportsTo);
            if (!manager) {
                break;
            }
    
            managers.push(manager);
            currentEmployee = manager;
        }
    
        return managers.reverse();
    }
    
    const findEmployee = (employeeId) => {
        return orgData.employees.find((employee) => employee.id === employeeId);
    }
    
    // optional
    const findPeers = (selected, orgData) => {
        return orgData.employees.filter((employee) => employee.reportsTo === selected.reportsTo && employee.id !== selected.id);
    }

    const findTopLevelEmployees = (orgData) => {
        const topLevels = orgData.employees.filter((employee) => employee.reportsTo === null);
        setTopLevels(topLevels);
        setViewState('topLevels');
        setSelectedOrg(orgData);
    }

    const isTopLevel = () => {
        return viewState === 'topLevels';
    }

    const isEmployeeDetails = () => {
        return viewState === 'employeeDetails';
    }

    const isViewAllCompanies = () => {
        return viewState === 'allCompanies';
    }

    return (
        <>
            {
                !isViewAllCompanies() && (
                    <TouchableOpacity onPress={() => setViewState('allCompanies')}>
                        <View style={{
                            display: 'flex',
                            alignItems: 'center',
                            width: '100%',
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
                                width: 350,
                            }}>
                                <Text>
                                    View All Companies
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )
            }
            {
                orgData && orgData.length > 0 && isViewAllCompanies() && (
                    <>
                        <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'left', marginLeft: 10, marginBottom: 10}}>
                            Companies
                        </Text>
                        {
                            orgData.map(org => (
                                <TouchableOpacity key={org.companyId} onPress={() => findTopLevelEmployees(org)}>
                                    <View style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        width: '100%',
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
                                            width: 350,
                                        }}>
                                            <Text>
                                                {org.company}
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))
                        }
                    </>
                )
            }
            {
                isTopLevel() && (
                    <>
                        <TouchableOpacity>
                            <View style={{
                                alignItems: 'center',
                                display: 'flex',
                            }}>
                                <View style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: 'white',
                                    borderColor: 'black',
                                    borderWidth: 1,
                                    padding: 20,
                                    marginHorizontal: 10,
                                    marginTop: 10,
                                    marginBottom: 0,
                                    borderRadius: 10,
                                    width: 350,
                                }}>
                                    <Text>
                                        {selectedOrg && selectedOrg?.company}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TopLevels data={topLevels} handleSelectEmployee={handleSelectEmployee}/>
                    </>
                )
            }

            {
                isEmployeeDetails() && (
                    <>
                        <TouchableOpacity>
                            <View style={{
                                alignItems: 'center',
                                display: 'flex',
                            }}>
                                <View style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: 'white',
                                    borderColor: 'black',
                                    borderWidth: 1,
                                    padding: 20,
                                    marginHorizontal: 10,
                                    marginTop: 10,
                                    marginBottom: 0,
                                    borderRadius: 10,
                                    width: 350,
                                }}>
                                    <Text>
                                        {selectedOrg && selectedOrg?.company}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={{
                            alignItems: 'center',
                            width: '100%'
                        }}>
                            <View style={{
                                width: 2,
                                height: 20,
                                backgroundColor: 'black',
                            }}/>
                        </View>
                        <EmployeeView selectedEmployee={selectedEmployee} handleSelectEmployee={handleSelectEmployee}/>
                    </>
                )
            }
        </>
    );
}

export default Tree;