import Tree from "@/components/Tree";
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

export default function HomeScreen() {
    const [orgData, setOrgData] = useState();

    useEffect(() => {
        const data = [{
            companyId: 1,
            company: 'Your Company Name',
            employees: [{
                id: 1,
                firstName: 'John',
                lastName: 'Doe',
                role: 'CEO',
                reportsTo: null,
                address: {
                    streetNumber: '22',
                    address1: 'Fake St',
                    address2: 'Corner of Fake St and Real St',
                    city: 'Christchurch',
                    country: 'AU'
                }
            }, {
                id: 2,
                firstName: 'Loretta',
                lastName: 'Smith',
                role: 'CTO',
                reportsTo: null,
                address: {
                    streetNumber: '123',
                    address1: 'Main St',
                    address2: 'Suite 100',
                    city: 'Springfield',
                    country: 'NZ'
                }
            }, {
                id: 3,
                firstName: 'Charlie',
                lastName: 'Bean',
                role: 'VP of Engineering',
                reportsTo: 2,
                address: {
                    streetNumber: '32A',
                    address1: 'Central Ave',
                    address2: 'Room 5',
                    city: 'Auckland',
                    country: 'NZ'
                }
            }],
        }];
    
        const fetchOrg = async (): Promise => {
            const orgData = await new Promise((resolve) =>
              setTimeout(() => resolve(data), 1000)
            );

            setOrgData(orgData);
            console.log('here', orgData);
            return orgData;
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
