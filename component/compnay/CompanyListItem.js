import React, {useEffect} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {
    Title,
    Paragraph,
    Card,
} from 'react-native-paper';
import CustomText from '../common/CustomText';

const CompanyListItem = ({item, handleSelectCompany}) => {
    useEffect(() => {
    }, []);

    const setRoleText = (role) =>{
        switch (role) {
            case 'ROLE_SUPER':
                return "최고 관리자";
                break;
            case 'ROLE_TOTAL':
                return "총괄 관리자";
                break;
            case 'ROLE_BRANCH':
                return "조직 관리자";
                break;
            case 'ROLE_EMPLOYEE':
                return "사원";
                break;
        }
    }

    return (
        <TouchableOpacity onPress={() => handleSelectCompany(item.companyId)}>
            <View style={{
                height: 100,
                borderWidth:1.5,
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
                    <CustomText style={{fontSize: 17}}>{item.companyName}({item.memberName})</CustomText>
                    <CustomText style={{color: '#919191'}}>{setRoleText(item.memberRole)}</CustomText>
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
