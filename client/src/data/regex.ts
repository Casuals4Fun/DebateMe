export const usernameRegex = /^[a-zA-Z0-9_-]+$/
export const specialCharRegex = /[@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/ // eslint-disable-line
export const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+(com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum|in|space)))$/