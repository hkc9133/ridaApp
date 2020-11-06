import React, {useEffect} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {
    Title,
    Paragraph,
    Card,
} from 'react-native-paper';

const CompanyListItem = ({item, handleSelectCompany}) => {
    useEffect(() => {
        console.log(item);

    }, []);
    return (
        <TouchableOpacity onPress={() => handleSelectCompany(item.companyId)}>
            <View style={{
                height: 100,
                borderWidth: 1,
                marginTop: 15,
                flex: 1,
                flexDirection: 'row',
                padding: 20,
                justifyContent: 'space-between',
                // shadowColor: '#000',
                // shadowOffset: {
                //     width: 3,
                //     height: 5,
                // },
                // shadowOpacity: 0.25,
                // shadowRadius: 3.84,
                // elevation: 5,
            }}>
                <View style={{justifyContent: 'flex-start', alignItems: 'baseline', alignSelf: 'center'}}>
                    <Text style={{fontSize: 17, marginBottom: 5}}>{item.companyName}({item.memberName})</Text>
                    <Text style={{color: '#919191'}}>{item.memberRole}</Text>
                </View>
                <View style={{justifyContent: 'flex-end', alignSelf: 'center'}}>
                    <Feather
                        name="arrow-right"
                        // color="grey"
                        size={25}
                        style={{textAlign: 'right'}}
                    />
                </View>

            </View>
        </TouchableOpacity>
    );
};

export default CompanyListItem;
