import Tree from "@/components/Tree";
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import data from "../../data/data";

export default function HomeScreen() {
    const [orgData, setOrgData] = useState();

    useEffect(() => {
        const fetchOrg = async (): Promise => {
            const orgData = await new Promise((resolve) =>
              setTimeout(() => resolve(data), 1000)
            );

            setOrgData(orgData);
          };

        fetchOrg();
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
