import request from "@/utils/request.js";

export function login( payload ) {
    return request( {
        url: "/auth/login",
        method: "POST",
        data: payload,
    } );
}

export function loginWithGithub() {
    return request( {
        url: "/oauth2/authorization/github",
        method: "GET",
    } );
}

export function register( payload ) {
    return request( {
        url: "/auth/register",
        method: "POST",
        data: payload,
    } );
}

export function getInfo() {
    return request( {
        url: "/auth/getInfo",
        method: "GET",
    } );
}