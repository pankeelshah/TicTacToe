    
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    tile: {
        borderWidth: 1,
        width: 100,
        height: 100,
        alignItems: "center",
        justifyContent: "center",
    },
    
    tileX: {
        color: "red",
        fontSize: 60,
    },
    
    tileO: {
        color: "blue",
        fontSize: 60,
    },

    titleText: {
        color: "dodgerblue",
        fontSize: 60,
        fontWeight: "bold",
    },

    button: {
        width: '40%',
        paddingTop: 10,
    }
});

