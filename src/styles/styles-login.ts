import { StyleSheet } from "react-native";
import { colors } from "@/constants/colors"; 

export const styles = StyleSheet.create({
    logo: {
  width: 120,
  height: 120,
  alignSelf: 'center',
  marginBottom: 24,
},
  container: {
    flex: 1,
    backgroundColor: colors.gray[900],
    paddingBottom: 24,
    paddingHorizontal: 24,
    justifyContent: "center",
  },

  title: {
    color: colors.gray[100],
    fontSize: 28,
    fontWeight: "600",
    marginBottom: 40,
    alignSelf: "center",
  },

  input: {
    backgroundColor: colors.gray[800],
    color: colors.gray[100],
    padding: 14,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.gray[600],
    marginBottom: 16,
  },

  button: {
    backgroundColor: colors.green[300],
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  
  link: {
  marginTop: 16,
  color: colors.gray[100],
  textAlign: "center",
  fontSize: 14,
}
});