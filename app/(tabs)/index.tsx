import Tree from "@/components/Tree";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import data from "../../data/data";

export default function HomeScreen() {
    const [orgData, setOrgData] = useState();

    const getFromAsyncStorage = async (key) => {
        try {
            const jsonValue = await AsyncStorage.getItem(key);
            
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            console.error("Error retrieving data from AsyncStorage", e);
            return null;
        }
    };

    const storeInAsyncStorage = async (key, value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);
        } catch (e) {
            console.error("Error saving data to AsyncStorage", e);
        }
    };

    // Fetch dummy data from local file so we can display some data in the tree view
    useEffect(() => {
        const fetchOrg = async (): Promise => {
            const orgData = await new Promise((resolve) =>
              setTimeout(() => resolve(data), 1000)
            );

            setOrgData(orgData);
          };

        fetchOrg();
    }, []);

    useEffect(() => {
        // every 5 seconds, query the async storage and post the data to an API endpoint
        const interval = setInterval(() => {
            const postCompaniesData = async () => {
                const companies = await getFromAsyncStorage("companies");
                if (!companies) {
                    console.warn("No companies data found in AsyncStorage");
                    return;
                }

                // get the first element of the companies array
                const firstCompany = companies.shift();

                // update the companies array in AsyncStorage
                await storeInAsyncStorage('companies', companies);

                try {
                    const response = await fetch("https://example.com/api/endpoint", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(firstCompany), // 
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    const data = await response.json();
                    console.log("Data posted successfully:", data);
                } catch (error) {
                    console.error("Error posting data:", error);
                }
            };

            const postEmployeesData = async () => {
                const employees = await getFromAsyncStorage("employees");
                if (!employees) {
                    console.warn("No employees data found in AsyncStorage");
                    return;
                }

                // get the first element of the employees array
                const firstEmployee = employees.shift();

                // update the employees array in AsyncStorage
                await storeInAsyncStorage('employees', employees);
                try {
                    const response = await fetch("https://example.com/api/endpoint", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(firstEmployee), //
                    });
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    console.log("Data posted successfully:", data);
                } catch (error) {
                    console.error("Error posting data:", error);
                }
            };

            postEmployeesData();
            postCompaniesData();
        }, 5 * 1000); // trigger call every 5 seconds
        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView>
                {
                    orgData && <Tree orgData={orgData} />
                }
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
});
