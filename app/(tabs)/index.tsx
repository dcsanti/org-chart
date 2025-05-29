import Tree from "@/components/Tree";
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import data from "../../data/data";
import { getFromAsyncStorage, storeInAsyncStorage } from '../../utils/storage';

export default function HomeScreen() {
    const [orgData, setOrgData] = useState();

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
            const postData = async (key) => {
                const data = await getFromAsyncStorage(key);
                if (!data) {
                    console.warn("No data data found in AsyncStorage");
                    return;
                }

                // get the first element of the data array
                const firstData = data.shift();

                // update the data array in AsyncStorage
                await storeInAsyncStorage(key, data);
                try {
                    const urlEndpoint = `https://example.com/api/${key}endpoint`;
                    const response = await fetch(urlEndpoint, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(firstData),
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    const data = await response.json();
                    console.log("Data posted successfully:", data);
                } catch (error) {
                    // console.error("Error posting data:", error);
                }
            };

            postData('companies');
            postData('employees');
        }, 5 * 1000); // trigger call every 5 seconds
        return () => clearInterval(interval); // cleanup on unmount
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
