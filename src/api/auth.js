import request from "@/utils/request.js";

export function login(username, password) {
    return username === "eustia" && password === "eustia";
}

export function login2(username, password) {
    return request({
        url: "/login/${username}",
        method: "GET",
    });
}

export function register(payload) {
    return request({
        url: "/auth/register",
        method: "POST",
        data: payload,
    });
}