import AccountApi from "@/api/AccountApi";

export default {
    signin(data) {
        return AccountApi.signin(data);
    },
    getUserInfo() {
        return AccountApi.getUserInfo();
    },
    signout() {
        return AccountApi.signout();
    },
    signup(data) {
        return AccountApi.signup(data);
    }
}