import AccountApi from "@/api/AccountApi";

export default {
    signin(data) {
        return AccountApi.signin(data);
    }
}