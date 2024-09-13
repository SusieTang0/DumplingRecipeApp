import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FDFFFC",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding:10
    },
    container2: {
        backgroundColor: "#FDFFFC",
        flex: 1,
        alignItems: "center"
    },
 
    view: {
        padding:10
    },
    btn_main: {
        margin: 10,
        backgroundColor: "#F59D56",
        width: 350,
        height: 55,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
    },
    btn_main_md: {
        margin: 10,
        backgroundColor: "#F59D56",
        width: 350,
        height: 55,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
    },
    btn_main_sm: {
        margin: 10,
        backgroundColor: "#F59D56",
        width: 60,
        height: 55,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        top:16,
    },
    btn_recipe_sm: {
      margin: 10,
      backgroundColor: "#F59D56",
      width: 30,
      height: 30,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 8,
  },
    btn_sec: {
        margin: 10,
        backgroundColor: "rgba(245, 157, 86, 0.2)",
        width: 350,
        height: 55,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        elevation: 3,
    },
    btn_sec_sm: {
        margin: 10,
        backgroundColor: "rgba(245, 157, 86, 0.2)",
        width: 175,
        height: 45,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        elevation: 3,
    },
    //Fonts
    whitefont: {
        color: "#fdfffc",
        fontSize: 20,
    },
    colorfont: {
        color: "#F59D56",
        fontSize: 20,
    },
    blacktext: {
        padding:5,
        color: "#25242A",
        fontSize: 20,
    },
    blacktextbold: {
        padding:5,
        color: "#25242A",
        fontSize: 20,
        fontWeight: "bold"
    },
    subtitle: {
        height:40,
        padding:5,
        backgroundColor:"#FDEADB",
        color: "#F59D56",
        fontSize: 25,
    },
    header: {
        paddingTop:10,
        fontSize: 36,
        margin: 5
    },
    //Forms
    form_group: {
        padding: 8,
        margin: 5,
    },
    label: {
        fontSize: 18,
        marginBottom: 5,

    },
    input: {
        width: 350,
        height: 55,
        borderColor: "rgba(245, 157, 86, 0.5)",
        borderWidth: 1,
        borderRadius: 8,
        fontSize: 18,
        padding: 5,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 1,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 50,
        width: 50,
        top: 35,
        left: '45%',
        position: 'absolute',
    },
    reactButton: {
      margin: 10,
      backgroundColor: "#F59D56",
      width: 30,
      height: 30,
      left: '85%',
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 8,
      position: 'absolute',
  },
    divider: {
        height: 1,
        backgroundColor: '#d3d3d3',
        marginVertical: 28,
    },
    divider2: {
      height: 1,
      backgroundColor: '#d3d3d3',
      marginVertical:15,
  },
    //Choices
    grid:{
        flexDirection: "row",
        flexWrap:"wrap",
        justifyContent:"space-between"
    },
    option: {
        width: 110,
        textAlign:"center",
        padding: 5,
        margin: 5,
        marginBottom:15,
        borderWidth: 1,
        borderBlockColor: "black",
        borderRadius:10,
    },
    selectedOption:{
        backgroundColor: "#F59D56",
        color: "#fdfffc",
        width: 110,
        textAlign:"center",
        padding: 5,
        margin: 5,
        borderRadius:10,
    },
    //Images
    mainLogo:{
        width:300,
        marginBottom:10
    },

});
export default styles;